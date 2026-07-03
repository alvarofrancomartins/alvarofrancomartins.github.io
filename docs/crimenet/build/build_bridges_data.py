#!/usr/bin/env python3
"""Build a compact bridges data file for the browse page's Bridges tab.

Reads the cross-community analysis CSVs from notebooks/v2/data/ and the
communities file (for title/size lookup) and produces a minified
app/data/bridges.json.

Usage:
    python build/build_bridges_data.py \
        --communities notebooks/v2/data/communities_cooperation.json \
        --input-dir notebooks/v2/data \
        --output app/data/bridges.json
"""

import argparse
import csv
import json
from pathlib import Path


def _read_csv(path):
    with open(path, newline="", encoding="utf-8") as f:
        return list(csv.DictReader(f))


def main() -> None:
    ap = argparse.ArgumentParser(description=__doc__)
    ap.add_argument(
        "--communities",
        default="notebooks/v2/data/communities_cooperation.json",
        type=Path,
    )
    ap.add_argument(
        "--input-dir",
        default="notebooks/v2/data",
        type=Path,
    )
    ap.add_argument("--output", default="app/data/bridges.json", type=Path)
    args = ap.parse_args()

    # ── Load community titles ────────────────────────────────────────────────
    comm = json.loads(args.communities.read_text(encoding="utf-8"))
    cid_title = {}
    cid_size = {}
    for cid, info in (comm.get("communities") or {}).items():
        cid_int = int(cid)
        cid_title[cid_int] = info.get("title", f"Community {cid_int}")
        cid_size[cid_int] = info["size"]

    network_type = comm.get("network_type", "cooperation")

    # ── Bridge nodes (top 50) ───────────────────────────────────────────────
    bridge_nodes = []
    bn_path = args.input_dir / f"bridge_nodes_{network_type}.csv"
    for row in _read_csv(bn_path):
        bridge_nodes.append({
            "r": int(row["rank"]),
            "n": row["organization"],
            "c": row["country"],
            "x": int(row["cross_edges"]),
            "b": int(row["communities_bridged"]),
            "s": int(row["own_community_size"]),
            "d": [
                s.strip()
                for s in (row.get("communities_reached") or "").split(";")
                if s.strip()
            ],
        })

    # ── Output ───────────────────────────────────────────────────────────────
    out = {
        "network_type": network_type,
        "bridge_nodes": bridge_nodes,
    }

    args.output.parent.mkdir(parents=True, exist_ok=True)
    args.output.write_text(
        json.dumps(out, ensure_ascii=False, separators=(",", ":")),
        encoding="utf-8",
    )

    print(
        f"Wrote {len(bridge_nodes)} bridge nodes "
        f"({args.output.stat().st_size:,} bytes) → {args.output}"
    )


if __name__ == "__main__":
    main()
