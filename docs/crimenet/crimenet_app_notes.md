# CRIMENET — app architecture & deploy

The front end is **fully static** — no database, no backend, no single-page app.
`build/build_static_pages.py` pre-renders the entire site from `crimenet.json`, and
deploying is just publishing the `app/` folder.

## What the site is

- **`browse.html`** — the home page: an **Explore the network visually** card row (links
  to the two visualizations), two panels (organizations ranked by linkages, and countries
  ranked by cross-border activity), and a **connection finder** below them.
- **`org/<slug>.html`** — one page per organization (profiled, or with ≥1 relationship):
  facts row (based-in · status · time · sources), description, documented relationships
  with **Source / Time / Quote** evidence, operational footprints, and a connection
  finder with side A locked to that org.
- **`country/<slug>.html`** — one page per country: orgs based there + foreign groups
  operating there.
- **`footprints.html`** — interactive world map of country→country footprints (D3 +
  world-atlas TopoJSON).
- **`knowledge_graph.html`** — the full org network as an interactive 3D force-directed
  graph (three.js).
- **`sitemap.xml`**, **`static_pages.css`** — sitemap for search engines, shared styles.

Pages cross-link densely (org ↔ neighbour orgs, org ↔ country) so the whole set is one
connected, crawlable web. Every org/country has its own linkable, indexable URL. The two
visualizations are reachable from `browse.html`'s explore cards and from every page footer;
each visualization carries a top-bar **Browse / Footprints / Graph** switcher back into
the rest of the site.

## Data the app loads (three static artifacts)

The article pages are self-contained HTML, but the **connection finder** loads two things
lazily, and the **visualizations** load the whole dataset:

1. **`crimenet_adj.json`** — graph topology only (who connects to whom + relationship
   types). The finder fetches it once and routes over it (BFS + depth-limited DFS).
2. **`evidence/NNN.json`** — sharded heavy payload. Each org's full edge evidence
   (descriptions, quotes, time periods, source URLs) **plus its long description** lives
   in one bucket file, keyed by a hash of the org name. Fetched only when the finder needs
   a hop's evidence, cached in memory; every other org in the same bucket is then free.
3. **`crimenet.json`** — the full dataset, copied into `app/` by `build_static_pages.py`.
   Both visualizations `fetch("crimenet.json")` from this same folder (~13 MB raw,
   ~1.6 MB gzipped). It is *only* used by the map/graph — the article pages never load it.

All three derive from the pipeline's `data/crimenet.json` at build time, so there's no drift
and nothing to operate.

## The connection finder

On every page, "Trace a connection" finds how two organizations link:

- **Direct linkages** — relationship groups (cooperation / conflict / other) with
  **Source / Time / Quote** pills on every statement.
- **Connection Pathways** — every route through **one shared organization** (2 hops),
  shortest first, capped at 150. BFS-from-target distances prune the path-enumerating DFS
  hard. Each route is collapsible; a hop's evidence loads from the shards on expand.
- On `browse.html` you pick both orgs; on an org page side A is locked and **Org B
  suggests that org's direct connections, ranked by linkage count** (falling back to a
  global search for any other org).

The routing + rendering are a faithful port of the retired SPA's pathfinder (same
`crimenet_adj.json`, same `evidence/` shards, same render functions and CSS), living in
`PATHFINDER_JS` inside `build/build_static_pages.py`.

## Build & deploy

From the repo root, after a pipeline rebuild. **Order matters** — the finder reads
`crimenet_adj.json` and the shards, so build those before the pages:

```bash
python build/build_adjacency.py        --input data/crimenet.json --output app/crimenet_adj.json
python build/build_evidence_shards.py  --input data/crimenet.json --output app/evidence
python build/build_static_pages.py     --input data/crimenet.json --output app \
    --base-url https://www.alvarofrancomartins.com/crimenet
```

Then publish **`app/`**. That's the whole deployable unit:

```
app/
├── browse.html              # home (explore cards + lists + finder)
├── org/<slug>.html          # one per org
├── country/<slug>.html      # one per country
├── footprints.html          # viz: country→country footprint map
├── knowledge_graph.html     # viz: 3D force-directed network
├── sitemap.xml
├── static_pages.css
├── crimenet_adj.json        # finder: routing
├── crimenet.json            # viz: full dataset (copied from data/crimenet.json)
└── evidence/000.json … 127.json   # finder: per-hop evidence
```

`footprints.html` / `knowledge_graph*.html` are **hand-authored** static pages that live in
`app/`; the build doesn't generate them, it just refreshes their `crimenet.json` data. So
keep them under version control — `build_static_pages.py` only clears stale `*.html` inside
`org/` and `country/`, never the `app/` root.

Netlify gzips automatically. Typical shard is tens of KB raw, ~15–50 KB gzipped; the shared
`crimenet.json` is ~1.6 MB gzipped. Regenerate everything whenever you rebuild
`crimenet.json`, so the assets stay in lockstep.

### The bucket hash must match on both sides

`build_evidence_shards.py` hashes each org name with **32-bit FNV-1a over its UTF-8 bytes,
mod N** (N = 128 by default). The finder JS in `build_static_pages.py` reproduces the
identical hash (`evidenceBucketId`, using `TextEncoder`), so the browser computes the same
filename with no manifest. **If you change `--buckets`, change `EVIDENCE_BUCKETS` in
`build_static_pages.py`'s `PATHFINDER_JS` to the same value** — the one coupling to remember.

### Graceful degradation

- Missing/failed `evidence/NNN.json` → that hop shows "Evidence unavailable"; nothing crashes.
- Missing `crimenet_adj.json` → the finder shows "Connection data unavailable"; the rest of
  the page (profile, relationships, footprints, cross-links) still works.

### Finder tuning knobs (in `PATHFINDER_JS`)

- `EVIDENCE_BUCKETS` — shard count; must equal the generator's `--buckets`.
- `PATH_MAX_HOPS` — fixed at `2` (routes through a single shared org).
- `PATH_CAP` — max routes per query (default 150).
