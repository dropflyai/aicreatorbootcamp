"""Sandbox runner for executing brain agents in isolated Docker containers.

Provides resource-limited, network-isolated execution of brain agents
with read-only brain mounts and controlled output.
"""

import os
import subprocess
from dataclasses import dataclass
from pathlib import Path


@dataclass
class SandboxResult:
    """Result from a sandboxed agent execution."""
    output: str
    exit_code: int
    success: bool
    timeout: bool = False
    error: str | None = None


class SandboxRunner:
    """Run brain agents in isolated Docker containers.

    Features:
    - Resource limits (512MB RAM, 1 CPU)
    - Read-only brain mounts
    - Optional network isolation
    - Configurable timeout
    - Non-root execution
    """

    IMAGE_NAME = "px1000-sandbox"

    def __init__(
        self,
        project_root: Path | None = None,
        image_name: str | None = None,
    ):
        """Initialize the sandbox runner.

        Args:
            project_root: Root of the prototype_x1000 directory.
            image_name: Docker image name. Defaults to px1000-sandbox.
        """
        self.project_root = project_root or Path(__file__).parent.parent.parent
        self.image_name = image_name or self.IMAGE_NAME
        self.agents_dir = self.project_root / "agents"
        self.sandbox_dir = self.agents_dir / "sandbox"

    def build_image(self, force: bool = False) -> bool:
        """Build the sandbox Docker image.

        Args:
            force: Force rebuild even if image exists.

        Returns:
            True if build succeeded.
        """
        if not force:
            # Check if image already exists
            result = subprocess.run(
                ["docker", "image", "inspect", self.image_name],
                capture_output=True, text=True,
            )
            if result.returncode == 0:
                return True

        result = subprocess.run(
            [
                "docker", "build",
                "-t", self.image_name,
                "-f", str(self.sandbox_dir / "Dockerfile"),
                str(self.agents_dir),
            ],
            capture_output=True, text=True,
        )

        return result.returncode == 0

    def run_in_sandbox(
        self,
        brain_type: str,
        task: str,
        allow_network: bool = False,
        timeout: int = 300,
        memory_limit: str = "512m",
        cpu_limit: str = "1.0",
    ) -> SandboxResult:
        """Run a brain agent task in a sandboxed container.

        Args:
            brain_type: Brain type to use (engineering, design, etc.).
            task: Task description.
            allow_network: Allow network access (default: False).
            timeout: Timeout in seconds (default: 300).
            memory_limit: Memory limit (default: 512m).
            cpu_limit: CPU limit (default: 1.0).

        Returns:
            SandboxResult with output and status.
        """
        # Ensure image exists
        if not self.build_image():
            return SandboxResult(
                output="",
                exit_code=1,
                success=False,
                error="Failed to build sandbox image",
            )

        # Build docker run command
        cmd = [
            "docker", "run",
            "--rm",
            "--memory", memory_limit,
            "--cpus", cpu_limit,
            "--security-opt", "no-new-privileges:true",
            "--read-only",
            "--tmpfs", "/tmp:size=100M",
        ]

        # Network isolation
        if not allow_network:
            cmd.extend(["--network", "none"])

        # Mount brains as read-only
        brain_dir = self.project_root / f"{brain_type}_brain"
        if brain_dir.exists():
            cmd.extend([
                "-v", f"{brain_dir}:/brains/{brain_type}_brain:ro",
            ])

        # Environment variables
        api_key = os.environ.get("ANTHROPIC_API_KEY", "")
        if api_key:
            cmd.extend(["-e", f"ANTHROPIC_API_KEY={api_key}"])

        cmd.extend(["-e", "BRAINS_ROOT=/brains"])

        # Image and command
        cmd.extend([
            self.image_name,
            "cli.main", "run", brain_type, task, "--direct",
        ])

        try:
            result = subprocess.run(
                cmd,
                capture_output=True,
                text=True,
                timeout=timeout,
            )

            return SandboxResult(
                output=result.stdout,
                exit_code=result.returncode,
                success=result.returncode == 0,
                error=result.stderr if result.returncode != 0 else None,
            )

        except subprocess.TimeoutExpired:
            return SandboxResult(
                output="",
                exit_code=124,
                success=False,
                timeout=True,
                error=f"Sandbox execution timed out after {timeout}s",
            )
        except FileNotFoundError:
            return SandboxResult(
                output="",
                exit_code=1,
                success=False,
                error="Docker not found. Install Docker to use sandbox mode.",
            )

    def cleanup(self) -> None:
        """Remove sandbox image and volumes."""
        subprocess.run(
            ["docker", "rmi", self.image_name],
            capture_output=True, text=True,
        )
        subprocess.run(
            ["docker", "volume", "rm", "sandbox-work"],
            capture_output=True, text=True,
        )
