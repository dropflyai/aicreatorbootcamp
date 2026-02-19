# Sandbox environment for running brain agents safely
# Pin to specific Python + Debian release for reproducibility
FROM python:3.11.11-slim-bookworm

LABEL maintainer="DropFly <dev@dropfly.io>"
LABEL description="Sandboxed environment for PX1000 brain agent execution"

# Security: run as non-root user
RUN groupadd -r sandbox && useradd -r -g sandbox -m -s /bin/bash sandbox

# Install system dependencies (pinned versions where possible)
RUN apt-get update && apt-get install -y --no-install-recommends \
    git \
    curl \
    ca-certificates \
    && rm -rf /var/lib/apt/lists/* \
    && apt-get purge -y --auto-remove

# Set up working directory
WORKDIR /app

# Copy dependency specification first (Docker layer caching)
COPY pyproject.toml README.md ./

# Install Python dependencies with hash checking where available
# --no-cache-dir reduces image size
# --no-compile prevents .pyc generation (smaller image)
RUN pip install --no-cache-dir --no-compile --upgrade pip setuptools \
    && pip install --no-cache-dir --no-compile -e "."

# Copy application code (separate layer for cache efficiency)
COPY core/ core/
COPY ceo/ ceo/
COPY specialists/ specialists/
COPY brain_builder/ brain_builder/
COPY memory/ memory/
COPY tools/ tools/
COPY cli/ cli/
COPY __init__.py .

# Remove pip cache and unnecessary files
RUN pip cache purge 2>/dev/null || true \
    && find /usr/local -name '*.pyc' -delete \
    && find /usr/local -name '__pycache__' -type d -exec rm -rf {} + 2>/dev/null || true

# Security: drop all capabilities, read-only filesystem support
# These are enforced by docker-compose but documented here
# --cap-drop=ALL --read-only --security-opt=no-new-privileges

# Switch to non-root user
USER sandbox

# Default work directory for agent output
RUN mkdir -p /home/sandbox/work
WORKDIR /home/sandbox/work

# Health check
HEALTHCHECK --interval=30s --timeout=5s --retries=3 \
    CMD python -c "import agents; print('ok')" || exit 1

ENTRYPOINT ["python", "-m"]
CMD ["cli.main", "--help"]
