"""Automated brain evaluation tool.

Evaluates each brain against the universal rubric and produces a score report.

Usage:
    python -m agents.tools.brain_evaluator [brain_name]
    python -m agents.tools.brain_evaluator --all
"""

import sys
from pathlib import Path

BASE = Path(__file__).parent.parent.parent


def evaluate_brain(brain_name):
    brain_dir = BASE / f"{brain_name}_brain"
    if not brain_dir.exists():
        return {"error": f"Brain directory not found: {brain_dir}"}
    scores = {}
    details = {}
    claude_md = brain_dir / "CLAUDE.md"
    if claude_md.exists():
        content = claude_md.read_text()
        line_count = len(content.splitlines())
        has_commit_rule = "COMMIT RULE" in content.upper()
        has_authority = "authority" in content.lower() or "hierarchy" in content.lower()
        has_conflict = "conflict" in content.lower()
        has_stop = "stop" in content.lower()
        has_preflight = (
            "preflight" in content.lower() or "before any" in content.lower()
        )
        gov_score = 1
        if line_count >= 50:
            gov_score = 2
        if line_count >= 100 and has_commit_rule:
            gov_score = 3
        if line_count >= 150 and has_authority and has_conflict:
            gov_score = 4
        if (
            line_count >= 150
            and has_authority
            and has_conflict
            and has_stop
            and has_preflight
        ):
            gov_score = 5
        scores["governance"] = gov_score
        details["governance"] = {
            "claude_md_lines": line_count,
            "has_commit_rule": has_commit_rule,
            "has_authority_hierarchy": has_authority,
            "has_conflict_resolution": has_conflict,
            "has_stop_conditions": has_stop,
            "has_preflight": has_preflight,
        }
    else:
        scores["governance"] = 0
        details["governance"] = {"error": "No CLAUDE.md found"}
    md_files = list(brain_dir.rglob("*.md"))
    total_lines = 0
    for f2 in md_files:
        try:
            total_lines += len(f2.read_text().splitlines())
        except Exception:
            pass
    dk_score = 1
    if len(md_files) >= 10 and total_lines >= 500:
        dk_score = 2
    if len(md_files) >= 20 and total_lines >= 2000:
        dk_score = 3
    if len(md_files) >= 30 and total_lines >= 5000:
        dk_score = 4
    if len(md_files) >= 35 and total_lines >= 8000:
        dk_score = 5
    scores["domain_knowledge"] = dk_score
    details["domain_knowledge"] = {
        "md_file_count": len(md_files),
        "total_lines": total_lines,
    }
    subdirs = [d for d in brain_dir.iterdir() if d.is_dir()]
    numbered_dirs = [d for d in subdirs if len(d.name) >= 2 and d.name[:2].isdigit()]
    readmes = list(brain_dir.rglob("README.md"))
    struct_score = 1
    if len(subdirs) >= 3:
        struct_score = 2
    if len(numbered_dirs) >= 3:
        struct_score = 3
    if len(numbered_dirs) >= 5 and len(readmes) >= 1:
        struct_score = 4
    if len(numbered_dirs) >= 8 and len(readmes) >= 2:
        struct_score = 5
    scores["structure"] = struct_score
    details["structure"] = {
        "subdirectory_count": len(subdirs),
        "numbered_directories": len(numbered_dirs),
        "readme_count": len(readmes),
    }
    ct = ""
    for f2 in md_files[:50]:
        try:
            ct += f2.read_text().lower()
        except Exception:
            pass
    ht = "template" in ct
    hc = "checklist" in ct
    hr = "recipe" in ct or "runbook" in ct
    hd = "decision" in ct and "framework" in ct
    act_score = 1
    ind = sum([ht, hc, hr, hd])
    if ind >= 1:
        act_score = 2
    if ind >= 2:
        act_score = 3
    if ind >= 3:
        act_score = 4
    if ind >= 4:
        act_score = 5
    scores["actionability"] = act_score
    details["actionability"] = {
        "has_templates": ht,
        "has_checklists": hc,
        "has_recipes": hr,
        "has_decision_frameworks": hd,
    }
    memory_dir = brain_dir / "Memory"
    has_memory = memory_dir.exists()
    has_exp = (memory_dir / "ExperienceLog.md").exists() if has_memory else False
    has_pat = (memory_dir / "Patterns.md").exists() if has_memory else False
    mem_score = 1
    if has_memory:
        mem_score = 2
    if has_exp:
        mem_score = 3
    if has_exp and has_pat:
        mem_score = 4
    if has_exp and has_pat:
        mc = ""
        for f2 in memory_dir.rglob("*.md"):
            try:
                mc += f2.read_text().lower()
            except Exception:
                pass
        if "cross-brain" in mc or "other brain" in mc or "handoff" in mc:
            mem_score = 5
    scores["memory_learning"] = mem_score
    details["memory_learning"] = {
        "has_memory_dir": has_memory,
        "has_experience_log": has_exp,
        "has_patterns": has_pat,
    }
    cc = claude_md.read_text().lower() if claude_md.exists() else ""
    has_del = "call" in cc and "brain" in cc
    has_ho = "handoff" in cc or "delegate" in cc
    has_ob = cc.count("_brain") >= 2
    cross_score = 1
    if has_ob:
        cross_score = 2
    if has_del:
        cross_score = 3
    if has_del and has_ho:
        cross_score = 4
    if has_del and has_ho and has_ob:
        cross_score = 5
    scores["cross_brain"] = cross_score
    details["cross_brain"] = {
        "has_delegation_rules": has_del,
        "has_handoff_protocol": has_ho,
        "references_other_brains": has_ob,
    }
    eval_dir = brain_dir / "eval"
    has_eval = eval_dir.exists()
    has_sr = bool(list(brain_dir.rglob("*Score*"))) or bool(
        list(brain_dir.rglob("*eval*"))
    )
    eval_score = 1
    if has_sr:
        eval_score = 3
    if has_eval:
        eval_score = 5
    scores["self_evaluation"] = eval_score
    details["self_evaluation"] = {
        "has_eval_directory": has_eval,
        "has_score_rubric": has_sr,
    }
    stubs = []
    smalls = []
    for f2 in md_files:
        try:
            sz = f2.stat().st_size
            if sz < 10:
                stubs.append(str(f2.relative_to(brain_dir)))
            elif sz < 100:
                smalls.append(str(f2.relative_to(brain_dir)))
        except Exception:
            pass
    comp_score = 1
    sp = len(stubs) / max(len(md_files), 1)
    if sp < 0.5:
        comp_score = 2
    if sp < 0.2:
        comp_score = 3
    if sp == 0 and len(smalls) < 5:
        comp_score = 4
    if sp == 0 and len(smalls) == 0:
        comp_score = 5
    scores["completeness"] = comp_score
    details["completeness"] = {
        "total_md_files": len(md_files),
        "stub_files": len(stubs),
        "small_files_under_100b": len(smalls),
    }
    weights = {
        "governance": 0.15,
        "domain_knowledge": 0.20,
        "structure": 0.15,
        "actionability": 0.15,
        "memory_learning": 0.10,
        "cross_brain": 0.10,
        "self_evaluation": 0.05,
        "completeness": 0.10,
    }
    overall = sum(scores[d] * weights[d] for d in weights)
    return {
        "brain": brain_name,
        "scores": scores,
        "overall": round(overall, 2),
        "details": details,
    }


def print_report(result):
    if "error" in result:
        print("ERROR: " + str(result["error"]))
        return
    print()
    print("=" * 60)
    print("  Brain: " + result["brain"])
    print("  Overall Score: " + str(result["overall"]) + "/5.0")
    print("=" * 60)
    dim_names = {
        "governance": "Governance (15%)",
        "domain_knowledge": "Domain Knowledge (20%)",
        "structure": "Structure (15%)",
        "actionability": "Actionability (15%)",
        "memory_learning": "Memory & Learning (10%)",
        "cross_brain": "Cross-Brain Integration (10%)",
        "self_evaluation": "Self-Evaluation (5%)",
        "completeness": "Completeness (10%)",
    }
    for dim, name in dim_names.items():
        score = result["scores"][dim]
        bar = "#" * score + "." * (5 - score)
        print("  " + name.ljust(30) + " [" + bar + "] " + str(score) + "/5")
    print()
    print("  Details:")
    for dim, detail in result["details"].items():
        print("    " + dim + ":")
        for k, v in detail.items():
            print("      " + k + ": " + str(v))
    print()


def main():
    if len(sys.argv) < 2:
        print("Usage: brain_evaluator <name> or --all")
        sys.exit(1)
    if sys.argv[1] == "--all":
        bds = sorted(BASE.glob("*_brain"))
        res = []
        for bd in bds:
            bn = bd.name.replace("_brain", "")
            r = evaluate_brain(bn)
            res.append(r)
            print_report(r)
        print()
        print("=" * 60)
        n = len(res)
        print("  SUMMARY --", n, "Brains")
        print("=" * 60)
        print("  Brain".ljust(27) + "Score".rjust(6) + "  Rating")
        print("  " + "-" * 25 + " " + "-" * 6 + "  " + "-" * 20)
        for r in sorted(res, key=lambda x: x.get("overall", 0), reverse=True):
            sc = r.get("overall", 0)
            if sc >= 4.5:
                rt = "Exceptional"
            elif sc >= 3.5:
                rt = "Strong"
            elif sc >= 2.5:
                rt = "Competent"
            elif sc >= 1.5:
                rt = "Below Standard"
            else:
                rt = "Inadequate"
            nm = r["brain"].ljust(25)
            sv = str(round(sc, 2)).rjust(6)
            print("  " + nm + sv + "  " + rt)
        avg = sum(r.get("overall", 0) for r in res) / max(len(res), 1)
        print()
        print("  Average:", round(avg, 2), "/5.0")
    else:
        bn = sys.argv[1]
        r = evaluate_brain(bn)
        print_report(r)


if __name__ == "__main__":
    main()
