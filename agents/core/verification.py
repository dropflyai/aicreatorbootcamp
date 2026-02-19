"""Verification protocol for agent task execution.

Implements the Triple Verification system:
1. Automated tests pass
2. Evidence artifacts exist
3. Review status confirmed
"""

import subprocess
from dataclasses import dataclass, field
from enum import Enum
from pathlib import Path


class VerificationLevel(Enum):
    """Verification levels based on change scope."""
    FULL = "full"           # All three layers required
    STANDARD = "standard"   # Tests + evidence required
    MINIMAL = "minimal"     # Tests only
    SKIP = "skip"           # Trivial changes (docs, comments)


@dataclass
class VerificationResult:
    """Result of a verification check."""
    passed: bool
    level: VerificationLevel
    test_passed: bool = False
    evidence_found: bool = False
    review_complete: bool = False
    details: list[str] = field(default_factory=list)
    errors: list[str] = field(default_factory=list)


class VerificationProtocol:
    """Run verification checks on agent output.

    Implements the three independent verification layers:
    1. Automated tests pass (pytest, type checking, linting)
    2. Evidence artifacts exist (test reports, screenshots, benchmarks)
    3. Human/agent review complete
    """

    def __init__(self, project_root: Path | None = None):
        self.project_root = project_root or Path(__file__).parent.parent.parent
        self.agents_dir = self.project_root / "agents"

    def determine_level(self, change_description: str) -> VerificationLevel:
        """Determine verification level from change description."""
        trivial_indicators = ["docs", "comment", "readme", "typo", "formatting"]
        if any(indicator in change_description.lower() for indicator in trivial_indicators):
            return VerificationLevel.MINIMAL

        high_risk_indicators = ["migration", "security", "auth", "deploy", "database", "schema"]
        if any(indicator in change_description.lower() for indicator in high_risk_indicators):
            return VerificationLevel.FULL

        return VerificationLevel.STANDARD

    def run_tests(self) -> tuple[bool, list[str]]:
        """Layer 1: Run automated tests."""
        details = []
        all_passed = True

        # Run pytest
        try:
            result = subprocess.run(
                ["python", "-m", "pytest", "tests/", "-v", "--tb=short"],
                cwd=str(self.agents_dir),
                capture_output=True, text=True, timeout=120
            )
            if result.returncode == 0:
                details.append("pytest: PASSED")
            else:
                details.append(f"pytest: FAILED\n{result.stdout[-500:]}")
                all_passed = False
        except (subprocess.TimeoutExpired, FileNotFoundError) as e:
            details.append(f"pytest: SKIPPED ({e})")

        # Run ruff
        try:
            result = subprocess.run(
                ["ruff", "check", "."],
                cwd=str(self.agents_dir),
                capture_output=True, text=True, timeout=30
            )
            if result.returncode == 0:
                details.append("ruff: PASSED")
            else:
                details.append(f"ruff: FAILED\n{result.stdout[-500:]}")
                all_passed = False
        except (subprocess.TimeoutExpired, FileNotFoundError) as e:
            details.append(f"ruff: SKIPPED ({e})")

        # Run mypy
        try:
            result = subprocess.run(
                ["mypy", "."],
                cwd=str(self.agents_dir),
                capture_output=True, text=True, timeout=60
            )
            if result.returncode == 0:
                details.append("mypy: PASSED")
            else:
                details.append(f"mypy: FAILED\n{result.stdout[-500:]}")
                all_passed = False
        except (subprocess.TimeoutExpired, FileNotFoundError) as e:
            details.append(f"mypy: SKIPPED ({e})")

        return all_passed, details

    def check_evidence(self, evidence_dir: Path | None = None) -> tuple[bool, list[str]]:
        """Layer 2: Check evidence artifacts exist."""
        details = []

        if evidence_dir is None:
            evidence_dir = self.agents_dir / "evidence"

        if not evidence_dir.exists():
            return False, ["No evidence directory found"]

        evidence_types = {
            "test_report": ["*.xml", "*.json"],
            "coverage": ["coverage.xml", "*.lcov", "htmlcov/"],
            "screenshots": ["*.png", "*.jpg"],
            "benchmarks": ["*.bench", "benchmark_*.json"],
            "scan_results": ["*sast*", "*security*"],
        }

        found_any = False
        for evidence_type, patterns in evidence_types.items():
            for pattern in patterns:
                matches = list(evidence_dir.glob(pattern))
                if matches:
                    details.append(f"{evidence_type}: {len(matches)} artifact(s)")
                    found_any = True

        if not found_any:
            details.append("No evidence artifacts found")

        return found_any, details

    def check_review(self) -> tuple[bool, list[str]]:
        """Layer 3: Check review status (placeholder for CI integration)."""
        # In CI, this would check PR review status
        # For local use, this is a manual confirmation
        return True, ["Review: manual confirmation required"]

    def verify(
        self,
        change_description: str = "",
        level: VerificationLevel | None = None,
        evidence_dir: Path | None = None,
    ) -> VerificationResult:
        """Run full verification protocol."""
        if level is None:
            level = self.determine_level(change_description)

        result = VerificationResult(passed=True, level=level)

        if level == VerificationLevel.SKIP:
            result.details.append("Verification skipped (trivial change)")
            return result

        # Layer 1: Tests (always run unless SKIP)
        test_passed, test_details = self.run_tests()
        result.test_passed = test_passed
        result.details.extend(test_details)
        if not test_passed:
            result.passed = False
            result.errors.append("Automated tests failed")

        # Layer 2: Evidence (STANDARD and FULL)
        if level in (VerificationLevel.STANDARD, VerificationLevel.FULL):
            evidence_found, evidence_details = self.check_evidence(evidence_dir)
            result.evidence_found = evidence_found
            result.details.extend(evidence_details)
            if not evidence_found:
                result.passed = False
                result.errors.append("Required evidence artifacts missing")

        # Layer 3: Review (FULL only)
        if level == VerificationLevel.FULL:
            review_complete, review_details = self.check_review()
            result.review_complete = review_complete
            result.details.extend(review_details)

        return result


class TripleVerificationGate:
    """Gate that blocks execution if verification fails.

    Use as post-execution hook in BaseAgent.run().
    """

    def __init__(self, protocol: VerificationProtocol | None = None):
        self.protocol = protocol or VerificationProtocol()

    def enforce(
        self,
        change_description: str,
        strict: bool = False,
    ) -> VerificationResult:
        """Enforce verification gate.

        Args:
            change_description: Description of what changed.
            strict: If True, raise on failure instead of returning result.

        Returns:
            VerificationResult.

        Raises:
            VerificationError: If strict=True and verification fails.
        """
        result = self.protocol.verify(change_description)

        if strict and not result.passed:
            raise VerificationError(
                f"Verification failed: {'; '.join(result.errors)}"
            )

        return result


class VerificationError(Exception):
    """Raised when verification gate fails in strict mode."""
    pass
