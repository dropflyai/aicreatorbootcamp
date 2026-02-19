# Sandbox environment for running brain agents safely
FROM python:3.11-slim

# Security: run as non-root user
RUN groupadd -r sandbox && useradd -r -g sandbox -m -s /bin/bash sandbox

# Install system dependencies
RUN apt-get update && apt-get install -y --no-install-recommends \
    git \
    curl \
    && rm -rf /var/lib/apt/lists/*

# Set up working directory
WORKDIR /app

# Copy and install agents package
COPY pyproject.toml README.md ./
COPY core/ core/
COPY ceo/ ceo/
COPY specialists/ specialists/
COPY brain_builder/ brain_builder/
COPY memory/ memory/
COPY tools/ tools/
COPY cli/ cli/
COPY __init__.py .

RUN pip install --no-cache-dir -e ".[dev]"

# Switch to non-root user
USER sandbox

# Default work directory for agent output
RUN mkdir -p /home/sandbox/work
WORKDIR /home/sandbox/work

ENTRYPOINT ["python", "-m"]
CMD ["cli.main", "--help"]
