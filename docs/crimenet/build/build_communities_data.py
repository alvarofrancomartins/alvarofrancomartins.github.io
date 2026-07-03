#!/usr/bin/env python3
"""Build a compact communities data file for the browse page's Communities tab.

Reads the LLM-characterized communities from notebooks/v2/data/ and produces a
minified app/data/communities.json.  Each community carries its title, summary, top
orgs (for the collapsed card view), and the full org list (for the expanded view).

Usage:
    python build_communities_data.py \
        --input notebooks/v2/data/communities_cooperation.json \
        --output app/data/communities.json
"""

import argparse
import json
from pathlib import Path


def main() -> None:
    ap = argparse.ArgumentParser(description=__doc__)
    ap.add_argument(
        "--input",
        default="notebooks/v2/data/communities_cooperation.json",
        type=Path,
    )
    ap.add_argument("--output", default="app/data/communities.json", type=Path)
    args = ap.parse_args()

    src = json.loads(args.input.read_text(encoding="utf-8"))

    communities = []
    for cid, info in (src.get("communities") or {}).items():
        communities.append({
            "i": int(cid),
            "s": info["size"],
            "t": info.get("title") or "?",
            "m": info.get("summary") or "",
            "k": info.get("top_orgs", [])[:10],
            "o": info.get("orgs", []),
        })

    # Sort by size descending (match the source order)
    communities.sort(key=lambda c: (-c["s"], c["t"].casefold()))

    out = {
        "network_type": src.get("network_type", "cooperation"),
        "communities": communities,
    }

    args.output.parent.mkdir(parents=True, exist_ok=True)
    args.output.write_text(
        json.dumps(out, ensure_ascii=False, separators=(",", ":")),
        encoding="utf-8",
    )

    total_orgs = sum(len(c["o"]) for c in communities)
    print(
        f"Wrote {len(communities)} communities, {total_orgs} org assignments "
        f"({args.output.stat().st_size:,} bytes) → {args.output}"
    )


if __name__ == "__main__":
    main()
