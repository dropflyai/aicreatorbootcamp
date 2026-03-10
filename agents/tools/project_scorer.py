"""Automated project-level scoring for PX1000.

Evaluates the entire system against PROJECT_SCORE.md criteria.

Usage:
    python -m agents.tools.project_scorer
"""

from __future__ import annotations

import re
import subprocess
import sys
from pathlib import Path

BASE = Path(__file__).resolve().parent.parent.parent
AGENTS = BASE / "agents"


def check_brain_coverage():
    brain_dirs = sorted(BASE.glob("*_brain"))
    total = len(brain_dirs)
    with_claude = 0
    with_20_files = 0
    stubs = 0
    for bd in brain_dirs:
        claude = bd / "CLAUDE.md"
        if claude.exists() and claude.stat().st_size > 100:
            with_claude += 1
        md_files = list(bd.rglob("*.md"))
        if len(md_files) >= 20:
            with_20_files += 1
        for f2 in md_files:
            if f2.stat().st_size < 10:
                stubs += 1
    score = 1
    if total >= 37:
        score = 4
    if total >= 37 and with_claude >= 37:
        score = 6
    if total >= 37 and with_claude >= 37 and with_20_files >= 30:
        score = 8
    if total >= 37 and with_claude >= 37 and with_20_files >= 35 and stubs == 0:
        score = 10
    return score, {
        "brain_count": total,
        "with_claude_md": with_claude,
        "with_20_plus_files": with_20_files,
        "stub_files": stubs,
    }


def check_agent_framework():
    py_files = [
        p
        for p in AGENTS.rglob("*.py")
        if "test" not in str(p) and "__pycache__" not in str(p)
    ]
    total_lines = sum(len(p.read_text(errors="replace").splitlines()) for p in py_files)
    has_result_type = (AGENTS / "core" / "result.py").exists()
    has_verification = (AGENTS / "core" / "verification.py").exists()
    has_factory = (AGENTS / "specialists" / "specialist_factory.py").exists()
    ruff_clean = False
    score = 1
    if total_lines >= 2000:
        score = 3
    if total_lines >= 5000 and has_factory:
        score = 5
    if total_lines >= 7000 and has_result_type and has_verification:
        score = 7
    if total_lines >= 8000 and has_result_type and has_verification and has_factory:
        score = 9
    try:
        result = subprocess.run(
            ["ruff", "check", "."],
            cwd=str(AGENTS),
            capture_output=True,
            text=True,
            timeout=30,
        )
        if result.returncode == 0:
            ruff_clean = True
            score = min(score + 1, 10)
    except (FileNotFoundError, subprocess.TimeoutExpired):
        pass
    return score, {
        "python_files": len(py_files),
        "total_lines": total_lines,
        "has_result_type": has_result_type,
        "has_verification": has_verification,
        "has_factory": has_factory,
        "ruff_clean": ruff_clean,
    }


def check_orchestration():
    ceo_dir = AGENTS / "ceo"
    has_ceo_agent = (ceo_dir / "ceo_agent.py").exists()
    has_selector = (ceo_dir / "brain_selector.py").exists()
    has_decomposer = (ceo_dir / "task_decomposer.py").exists()
    selector_lines = 0
    brain_type_count = 0
    if has_selector:
        content = (ceo_dir / "brain_selector.py").read_text(errors="replace")
        selector_lines = len(content.splitlines())
        brain_type_count = content.count("BrainType.")
    score = 1
    if has_ceo_agent:
        score = 3
    if has_ceo_agent and has_selector and has_decomposer:
        score = 5
    if has_ceo_agent and has_selector and has_decomposer and selector_lines > 500:
        score = 7
    if selector_lines > 1000:
        score = 9
    if brain_type_count >= 37:
        score = 10
    return score, {
        "has_ceo_agent": has_ceo_agent,
        "has_selector": has_selector,
        "has_decomposer": has_decomposer,
        "selector_lines": selector_lines,
        "brain_type_refs": brain_type_count,
    }


def check_testing():
    test_dir = AGENTS / "tests"
    if not test_dir.exists():
        return 1, {"test_files": 0}
    tf = list(test_dir.glob("test_*.py"))
    hp = (test_dir / "test_properties.py").exists()
    hc = (test_dir / "test_contracts.py").exists()
    hb = (test_dir / "test_benchmarks.py").exists()
    he = (test_dir / "test_e2e_orchestration.py").exists()
    ha = (test_dir / "test_api.py").exists()
    tc = 0
    try:
        r = subprocess.run(
            [sys.executable, "-m", "pytest", "tests/", "--collect-only", "-q"],
            cwd=str(AGENTS),
            capture_output=True,
            text=True,
            timeout=30,
        )
        for ln in r.stdout.splitlines():
            if "::" in ln:
                tc += 1
    except Exception:
        tc = len(tf) * 8
    score = 1
    if len(tf) >= 5:
        score = 3
    if len(tf) >= 8 and hp:
        score = 5
    if hp and hc and hb:
        score = 7
    if he:
        score = 8
    if he and ha:
        score = 9
    ap = False
    try:
        r = subprocess.run(
            [sys.executable, "-m", "pytest", "tests/", "-q", "--tb=no"],
            cwd=str(AGENTS),
            capture_output=True,
            text=True,
            timeout=120,
        )
        if "failed" not in r.stdout and "error" not in r.stdout.lower():
            ap = True
            score = min(score + 1, 10)
    except Exception:
        pass
    return score, {
        "test_files": len(tf),
        "test_count": tc,
        "has_property_tests": hp,
        "has_contract_tests": hc,
        "has_benchmark_tests": hb,
        "has_e2e_tests": he,
        "has_api_tests": ha,
        "all_pass": ap,
    }


def check_cicd():
    ci_file = None
    for c in [
        BASE / ".github" / "workflows" / "ci.yml",
        BASE.parent / ".github" / "workflows" / "ci.yml",
        AGENTS / ".github" / "workflows" / "ci.yml",
    ]:
        if c.exists():
            ci_file = c
            break
    has_ci = ci_file is not None
    has_makefile = (AGENTS / "Makefile").exists()
    cc = ""
    if has_ci and ci_file:
        cc = ci_file.read_text(errors="replace").lower()
    hl = "ruff" in cc
    ht = "mypy" in cc
    hte = "pytest" in cc
    hs = "bandit" in cc
    hb = "cyclonedx" in cc or "sbom" in cc
    hx = "radon" in cc
    hm = "matrix" in cc
    hcov = "cov" in cc
    score = 1
    if has_ci:
        score = 3
    if hl and hte:
        score = 5
    if hl and ht and hte and hcov:
        score = 7
    if hs and hb:
        score = 8
    if hx and hm:
        score = 9
    if hl and ht and hte and hs and hb and hx and hm and hcov:
        score = 10
    return score, {
        "has_ci_file": has_ci,
        "ci_file_path": str(ci_file) if ci_file else "not found",
        "has_makefile": has_makefile,
        "has_lint": hl,
        "has_typecheck": ht,
        "has_test": hte,
        "has_sast": hs,
        "has_sbom": hb,
        "has_complexity": hx,
        "has_matrix": hm,
        "has_coverage": hcov,
    }


def check_security():
    hd = (AGENTS / "sandbox" / "Dockerfile").exists()
    hdcs = (AGENTS / "sandbox" / "docker-compose.sandbox.yml").exists()
    hi = (AGENTS / "docs" / "incident-response.md").exists()
    hf = (AGENTS / "docs" / "FMEA.md").exists()
    he = (AGENTS / ".env.example").exists()
    ds = False
    if hd:
        content = (AGENTS / "sandbox" / "Dockerfile").read_text(errors="replace")
        parts = content.split("USER")
        nr = len(parts) > 1 and "root" not in parts[-1][:30].lower()
        hc = "HEALTHCHECK" in content
        ds = nr and hc
    score = 1
    if hd:
        score = 3
    if hd and ds:
        score = 5
    if hf and hi:
        score = 7
    if he:
        score = 8
    if hd and ds and hf and hi and he:
        score = 10
    return score, {
        "has_dockerfile": hd,
        "has_docker_compose_sandbox": hdcs,
        "dockerfile_secure": ds,
        "has_fmea": hf,
        "has_incident_response": hi,
        "has_env_example": he,
    }


def check_deployment():
    hdc = (AGENTS / "docker-compose.yml").exists()
    hm = (AGENTS / "supabase" / "migrations").is_dir()
    he = (AGENTS / ".env.example").exists()
    ha = (AGENTS / "api" / "server.py").exists()
    hs = (AGENTS / "supabase" / "seed.sql").exists()
    mc = 0
    if hm:
        mc = len(list((AGENTS / "supabase" / "migrations").glob("*.sql")))
    score = 1
    if he:
        score = 3
    if hm and mc > 0:
        score = 5
    if hdc:
        score = 7
    if ha:
        score = 8
    if hdc and hm and he and ha and hs:
        score = 10
    return score, {
        "has_docker_compose": hdc,
        "has_migrations": hm,
        "migration_count": mc,
        "has_env_example": he,
        "has_api_server": ha,
        "has_seed_data": hs,
    }


def check_documentation():
    ha = (BASE / "BRAIN-ARCHITECTURE.md").exists()
    hr = (BASE / "BRAIN_ROADMAP.md").exists()
    hf = (AGENTS / "docs" / "FMEA.md").exists()
    hs = (AGENTS / "docs" / "SLOs.md").exists()
    hi = (AGENTS / "docs" / "incident-response.md").exists()
    hp = (BASE / "PROJECT_SCORE.md").exists()
    hb = (BASE / "BRAIN_EVAL_RUBRIC.md").exists()
    score = 1
    if ha and hr:
        score = 4
    if hf and hs:
        score = 6
    if hi:
        score = 7
    if hp and hb:
        score = 9
    if ha and hr and hf and hs and hi and hp and hb:
        score = 10
    return score, {
        "has_architecture": ha,
        "has_roadmap": hr,
        "has_fmea": hf,
        "has_slos": hs,
        "has_incident_response": hi,
        "has_project_score": hp,
        "has_brain_eval_rubric": hb,
    }


def check_memory():
    hmc = (AGENTS / "core" / "memory_client.py").exists()
    hpe = (AGENTS / "memory" / "pattern_extractor.py").exists()
    hal = (AGENTS / "memory" / "auto_logger.py").exists()
    hm = (AGENTS / "supabase" / "migrations").is_dir()
    hs = (AGENTS / "supabase" / "seed.sql").exists()
    cl = 0
    if hmc:
        cl = len(
            (AGENTS / "core" / "memory_client.py")
            .read_text(errors="replace")
            .splitlines()
        )
    score = 1
    if hmc:
        score = 3
    if hmc and hpe:
        score = 5
    if hal:
        score = 7
    if hm and cl > 300:
        score = 9
    if hm and hs and cl > 300:
        score = 10
    return score, {
        "has_memory_client": hmc,
        "memory_client_lines": cl,
        "has_pattern_extractor": hpe,
        "has_auto_logger": hal,
        "has_migrations": hm,
        "has_seed_data": hs,
    }


def check_battle_tested():
    td = AGENTS / "tests"
    he = (td / "test_e2e_orchestration.py").exists()
    hs = (td / "test_e2e_specialist_smoke.py").exists()
    ha = (td / "test_api.py").exists()
    ap = False
    tt = 0
    try:
        r = subprocess.run(
            [sys.executable, "-m", "pytest", "tests/", "-q", "--tb=no"],
            cwd=str(AGENTS),
            capture_output=True,
            text=True,
            timeout=120,
        )
        o = r.stdout
        if "passed" in o:
            m = re.search(r"(\d+) passed", o)
            if m:
                tt = int(m.group(1))
            if "failed" not in o and "error" not in o.lower():
                ap = True
    except Exception:
        pass
    score = 1
    if tt >= 50:
        score = 3
    if tt >= 100 and ap:
        score = 5
    if he:
        score = 7
    if he and hs:
        score = 8
    if he and hs and ha:
        score = 9
    if he and hs and ha and ap and tt >= 130:
        score = 10
    return score, {
        "has_e2e_tests": he,
        "has_smoke_tests": hs,
        "has_api_tests": ha,
        "total_tests_passed": tt,
        "all_pass": ap,
    }


DIMENSIONS = [
    ("Brain Coverage", 0.10, check_brain_coverage),
    ("Agent Framework", 0.10, check_agent_framework),
    ("Orchestration", 0.10, check_orchestration),
    ("Testing", 0.15, check_testing),
    ("CI/CD", 0.10, check_cicd),
    ("Security", 0.10, check_security),
    ("Deployment", 0.10, check_deployment),
    ("Documentation", 0.10, check_documentation),
    ("Memory & Observability", 0.05, check_memory),
    ("Battle-Tested", 0.10, check_battle_tested),
]


def main():
    print("=" * 60)
    print("  PX1000 PROJECT SCORE")
    print("=" * 60)
    print(f"  Base: {BASE}")
    print(f"  Agents: {AGENTS}")
    total = 0.0
    for name, weight, checker in DIMENSIONS:
        score, details = checker()
        weighted = score * weight
        total += weighted
        bar = chr(9608) * score + chr(9617) * (10 - score)
        print()
        print(f"  {name} ({int(weight * 100)}%)")
        print(f"    Score: {bar} {score}/10  (weighted: {weighted:.2f})")
        for k, v in details.items():
            print(f"    {k}: {v}")
    print()
    print("=" * 60)
    print(f"  OVERALL: {total:.1f} / 10.0")
    if total >= 9.0:
        rating = "Production-Grade System"
    elif total >= 7.0:
        rating = "Release Candidate"
    elif total >= 5.0:
        rating = "Beta Quality"
    elif total >= 3.0:
        rating = "Alpha / Prototype"
    else:
        rating = "Proof of Concept"
    print(f"  Rating:  {rating}")
    print("=" * 60)


if __name__ == "__main__":
    main()
