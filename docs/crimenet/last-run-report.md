CRIMENET main pipeline — full rebuild report
Date: 2026-06-16 · Outcome: all 5 steps exit 0, every integrity check passes · Final output: data/crimenet_raw.json (5,568 orgs, 13,820 edges, 13.6 MB)

Step-by-step results
Step 0 — 0_urls_to_articles.py → articles.csv ✅

1673 input URLs → deduped to 1492 (181 same lang+title / redirect collisions removed) → 1491 rows resolved, 0 failures
Verified: 0 missing oldid, 0 duplicate folder names, 0 empty fields. Languages: en 1133, it 221, es 112, pt 25 = 1491. Matches the README's documented "1,491 articles" exactly.
~45 min (sequential, 1.5s/call).
Step 1 — 1_fetch_wikipedia.py → txts/<folder>/{content.txt,url.txt} ✅

1491 fetched, 0 skipped, 0 failed. All 1491 folders have both files.
Content quality: 0 empty, 0 tiny files; ~2.93M words (median 886, max 23,391); 69% (1030) carry an infobox; 0 leftover [NN] citation markers corpus-wide (cleaning works).
~56 min (sequential).
Step 2 — 2_extract_network.py → article_graph.json ✅

1491 extracted, 0 partial, 0 failed, no chunk failures or sub-splits needed.
16,788 raw nodes / 14,201 raw edges. 65 empty graphs (non-org/no-relationship articles — expected). 0 nodes/edges missing source_url; only 1 of 14,201 edges had a null evidence_quote (the "null rather than fabricate" rule).
~10 min (50 workers).
Step 3 — 3_enrich_nodes.py → org_profile.json ✅

1273 org profiles, 218 non-org declines, 0 failed, 0 country-chunk failures.
All required fields present; is_defunct three-state = 890 active / 350 defunct / 33 unknown. 3,135 country_link records across 613 orgs, 0 malformed (every one has country + evidence_quote).
Fast (50 workers, 2 passes).
Step 4 — 4_merge.py → crimenet_raw.json ✅

12 cross-language orgs unified via mutual canonical reference (e.g. Cosa Nostra↔Sicilian Mafia, MS-13↔Mara Salvatrucha). Dedup map: 3227 exact + 2656 core. 142 dangling/self-loop edges dropped.
Final: 5,568 nodes (1,159 profiled, 4,409 unprofiled, 334 defunct), 13,820 edges.
Output validation, all clean: metadata matches actuals, 0 duplicate node names, 0 edges with missing endpoints, 0 self-loops, 0 non-canonical countries (origin or footprint), 0 profiled nodes missing sources, 0 unprofiled nodes carrying a fabricated description.
Does it reproduce the known-good dataset?
Yes. The README's "Why each step exists" documents the raw pipeline as extracting "~5,500 orgs and ~13,700 edges" — this run produced 5,568 orgs and 13,820 edges, essentially exact. (The audit phase later trims this raw set to the ~4,520-org / ~10,954-edge final crimenet.json.)

Notes / caveats (none are bugs)
142 cross-name merges flagged "audit these" in Step 4, including expected fuzzy-core collisions like 'Ndrina Bruno → Philadelphia crime family (boss-name token clash) and 103 alias conflicts left un-merged. These are exactly what the audit pipeline (steps 0–1 → BLOCKLIST/KNOWN_DUPLICATES) exists to resolve, not main-pipeline errors.
No cost figure available: the pipeline scripts (unlike the audit scripts) don't emit DeepSeek token/cost accounting, so I can't give an exact spend for Steps 2–3.
Minor cosmetic spacing artifacts in body text (e.g. mafia -type, spaces before punctuation) come from rendering inline HTML to plain text; consistent with how the existing dataset was built and handled fine by the LLM.
Bottom line: the main pipeline is working correctly end to end. data/crimenet_raw.json is ready for the audit phase whenever you want to proceed (I held off on it per your instruction to focus on the main pipeline only).


CRIMENET audit pipeline — full run report
Date: 2026-06-16 · Input: data/crimenet_raw.json (5,568 orgs / 13,820 edges) · Output: data/crimenet.json (4,505 orgs / 10,935 edges) · Outcome: all 8 steps exit 0, every integrity check passes · API cost: ~$12 total

Step-by-step results
Audit 0 — wrong merges → 0_node_blocklist.py ✅

Rebuilt step 4's merge map (1273 profiles / 16,788 raw nodes), judged 900 suspect alias/core merges → 105 wrong merges across 87 canonicals, 0 left for review.
Catches are correct: "Taliban (Kenyan gang)" vs "Taliban", "Imperial Japanese Army"→"Yakuza", "Islamic State in Somalia" vs global "Islamic State", "Tambov gang" vs "Tambovskaya Bratva". File importable.
Audit 1 — missed merges → 1_known_duplicates.py ✅

3 blockers (fuzzy 284 + reorder 221 + alias-xref 411) → 792 pairs judged → 546 confident duplicates / 455 canonicals + 63 low-confidence. Mention context attached to 889 description-less nodes. File importable.
Audit 2 — spurious edges → 2_edge_blocklist.py ✅

3,248 infobox Allies/Rivals edges auto-kept (never judged), 10,572 edges judged (article context attached to 98.6%) → 1,452 no-relationship / 9,120 real / 0 errors → 1,036 confident blocked pairs + 1 low. Cost ~$5.82.
Audit 3 — country links → 3_country_link_blocklist.py ✅

2,756 links judged → 652 unsupported / 2,104 supported / 0 errors → 604 confident + 48 low (228 orgs). Cost ~$0.87.
Audit 4 — umbrella orgs → 4_umbrella_orgs.py ✅

5,568 nodes judged → 365 umbrella terms / 5,203 real / 0 errors. Correct flags ("Albanian mafia", "African-American mob", generic "'Ndrina"). Cost ~$1.51.
Audit 5 — non-criminal orgs → 5_non_criminal_orgs.py ✅

5,568 nodes judged → 311 non-criminal / 5,257 criminal / 0 errors. Correct flags (AKP, Anti-Defamation League, Al-Manar). Cost ~$1.94.
Audit 6 — second opinion → 6_llm_verdicts.json ✅

Re-judged 3,111 suggestions → 2,840 approved. Per-audit approve rates: blocklist 94/105, duplicates 573/609, edges 959/1069, countries 574/652, umbrella 348/365, noncriminal 292/311. High-confidence identity rejections (the only enforced ones): 8 blocklist + 5 duplicates. Cost ~$1.12.
Audit 7 — apply corrections → data/crimenet.json ✅ (no API)

Loaded auto-suggestions, suppressed 11 via audit-6 veto (BLOCKLIST=8, KNOWN_DUPLICATES=3), layered curated_corrections.py on top.
Applied: dropped 630 nodes (+1,794 edges), merged 433 duplicates, split 18 wrong merges, dropped 1,018 edges + 520 country links + 1 home-country leak + 4 dup edges.
Final: 4,505 nodes (1,032 profiled, 3,473 unprofiled, 316 defunct), 10,935 edges. README auto-synced.
Final dataset validation (all pass)
metadata matches actuals; 0 duplicate node names, 0 dangling edges, 0 self-loops, 0 non-canonical countries
profiled invariant exact: 0 profiled-without-sources, 0 unprofiled-with-sources
exclusions verified: all 365 umbrella + 311 non-criminal orgs gone; wrong-merge split confirmed (Arakan Army and Artistas Asesinos now separate nodes)
edge mix: cooperation 4,907 / conflict 3,731 / other 2,297. File 10.9 MB.
Raw → final

field          raw     final    delta
n_nodes       5568      4505    -1063
n_edges      13820     10935    -2885
n_profiled    1159      1032     -127
n_unprofiled  4409      3473     -936
n_defunct      334       316      -18
Does it reproduce the known-good dataset?
Yes, within ~0.3%. README baseline was 4,520 orgs / 10,954 edges / 1,028 profiled / 3,492 mentions / 317 defunct; this run produced 4,505 / 10,935 / 1,032 / 3,473 / 316. The small deltas come from Wikipedia revision drift since the original build (fresh oldids → slightly different text) plus LLM non-determinism. The README headline was auto-updated to the new figures (shows as a git modification).

Notes / caveats (none are pipeline bugs)
app/about.html is absent in this checkout, so update_readme_stats.py skipped it (best-effort by design). Only README was synced. Regenerate about.html via the build if you want it back; it's outside the audit pipeline.
BLOCKLIST "kept as alias" edge case: a few wrong merges where the bad name has no own article and no edges (e.g. "Imperial Japanese Army"→"Yakuza") can't be split into a separate node, so they remain as an alias rather than a distinct node. This is the documented empty-husk avoidance, not a failure.
Cost: audits 2–6 printed ~$11.26 for 27,575 calls; audits 0–1 (1,692 calls) don't emit cost accounting, estimated ~$0.6. Total ≈ $12 for the full audit pass.
The audits emit suggestions; a handful are genuinely debatable (e.g. "Black Gangster Disciples"→"Gangster Disciples"), which is exactly what the audit-6 veto and your curated_corrections.py review loop are for.