#!/usr/bin/env python3
"""
Build triadic_signals.json: one unified table of candidate undocumented allies
from the three triadic-closure signals (common cooperation partners, common
adversaries, combined signal).  Each row tracks which signal(s) found it, plus
raw counts and weighted scores.

Output: app/data/triadic_signals.json — flat array of rows.
"""

import argparse
import ast
import csv
import json
from collections import defaultdict
from pathlib import Path

ROOT = Path(__file__).resolve().parent.parent
DATA = ROOT / "notebooks" / "v2" / "data"


def _parse_list(val):
    if not val or val.strip() in ("", "[]"):
        return []
    try:
        return ast.literal_eval(val)
    except (ValueError, SyntaxError):
        return json.loads(val)


def main():
    ap = argparse.ArgumentParser(description=__doc__, formatter_class=argparse.RawDescriptionHelpFormatter)
    ap.add_argument("--output", default=ROOT / "app" / "data" / "triadic_signals.json", type=Path,
                    help="Output JSON path (default: app/data/triadic_signals.json)")
    args = ap.parse_args()
    out = args.output

    out.parent.mkdir(parents=True, exist_ok=True)

    # -- Load every CSV into keyed dicts -------------------------------------
    s1 = {}
    with open(DATA / "signal1_common_coop_partners.csv", newline="", encoding="utf-8") as f:
        for r in csv.DictReader(f):
            s1[(r["a"], r["b"])] = r

    s2 = {}
    with open(DATA / "signal2_common_adversaries.csv", newline="", encoding="utf-8") as f:
        for r in csv.DictReader(f):
            s2[(r["a"], r["b"])] = r

    s3 = {}
    with open(DATA / "signal3_combined.csv", newline="", encoding="utf-8") as f:
        for r in csv.DictReader(f):
            s3[(r["a"], r["b"])] = r

    w1 = {}
    with open(DATA / "weighted_signal1_coop_partners.csv", newline="", encoding="utf-8") as f:
        for r in csv.DictReader(f):
            w1[(r["a"], r["b"])] = r

    w2 = {}
    with open(DATA / "weighted_signal2_common_adversaries.csv", newline="", encoding="utf-8") as f:
        for r in csv.DictReader(f):
            w2[(r["a"], r["b"])] = r

    w3 = {}
    with open(DATA / "weighted_signal3_combined.csv", newline="", encoding="utf-8") as f:
        for r in csv.DictReader(f):
            w3[(r["a"], r["b"])] = r

    # -- Merge every unique pair into one row --------------------------------
    all_keys = set(s1.keys()) | set(s2.keys()) | set(s3.keys())
    merged = defaultdict(dict)

    for key in all_keys:
        a, b = key
        row = {"a": a, "b": b}

        # Signal 1 (coop partners, threshold >=3)
        r1 = s1.get(key)
        w1r = w1.get(key)
        if r1:
            row["cp_count"] = int(r1["n_items"])
            row["cp_items"] = _parse_list(r1["items"])
            row["cp_score"] = int(w1r["score"]) if w1r else 0
            row["country_a"] = r1["country_a"]
            row["country_b"] = r1["country_b"]
            row["same_country"] = r1["same_country"] == "True"
        else:
            row["cp_count"] = 0
            row["cp_items"] = []
            row["cp_score"] = 0

        # Signal 2 (common adversaries, threshold >=2)
        r2 = s2.get(key)
        w2r = w2.get(key)
        if r2:
            row["adv_count"] = int(r2["n_items"])
            row["adv_items"] = _parse_list(r2["items"])
            row["adv_score"] = int(w2r["score"]) if w2r else 0
            if "country_a" not in row:
                row["country_a"] = r2["country_a"]
                row["country_b"] = r2["country_b"]
                row["same_country"] = r2["same_country"] == "True"
        else:
            row["adv_count"] = 0
            row["adv_items"] = []
            row["adv_score"] = 0

        # Signal 3 (combined: >=1 cooperation partner AND >=1 common adversary)
        r3 = s3.get(key)
        w3r = w3.get(key)
        if r3:
            # Only use s3 data for cp/adv if s1/s2 didn't already provide them
            if not r1:
                row["cp_count"] = int(r3["n_coop_partners"])
                row["cp_items"] = _parse_list(r3.get("coop_partners", ""))
                row["cp_score"] = int(w3r["score_coop_partners"]) if w3r else 0
            if not r2:
                row["adv_count"] = int(r3["n_adversaries"])
                row["adv_items"] = _parse_list(r3.get("adversaries", ""))
                row["adv_score"] = int(w3r["score_adversaries"]) if w3r else 0
            if "country_a" not in row:
                row["country_a"] = r3["country_a"]
                row["country_b"] = r3["country_b"]
                row["same_country"] = r3["same_country"] == "True"

        # Country fallback
        if "country_a" not in row:
            row["country_a"] = ""
            row["country_b"] = ""
            row["same_country"] = False

        # Which signals detected this pair?
        has_cp = row["cp_count"] > 0
        has_sa = row["adv_count"] > 0
        row["is_cp"] = has_cp
        row["is_sa"] = has_sa

        if has_cp and has_sa:
            row["signal"] = "Both"
        elif has_cp:
            row["signal"] = "Only Common Partners"
        elif has_sa:
            row["signal"] = "Only Common Adversaries"
        else:
            row["signal"] = ""

        # Totals
        row["total_weighted"] = row["cp_score"] + row["adv_score"]

        merged[key] = row

    # -- Sort by weighted score descending -----------------------------------
    result = list(merged.values())
    result.sort(key=lambda r: r["total_weighted"], reverse=True)
    for i, r in enumerate(result):
        r["rank"] = i + 1

    with open(out, "w", encoding="utf-8") as f:
        json.dump(result, f, ensure_ascii=False, separators=(",", ":"))

    size = out.stat().st_size
    cp_only = sum(1 for r in result if r["is_cp"] and not r["is_sa"])
    sa_only = sum(1 for r in result if r["is_sa"] and not r["is_cp"])
    both = sum(1 for r in result if r["is_cp"] and r["is_sa"])
    print(f"Wrote {out} ({size:,} bytes)")
    print(f"  {len(result)} total unique pairs")
    print(f"  Common Partners only: {cp_only}   Common Adversaries only: {sa_only}   Both: {both}")


if __name__ == "__main__":
    main()

