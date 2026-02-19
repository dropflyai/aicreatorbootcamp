.PHONY: lint format type-check test test-cov security complexity mutation sbom benchmark all clean

lint:
	ruff check .

format:
	ruff format .

type-check:
	mypy .

test:
	pytest tests/ -v

test-cov:
	pytest tests/ -v --cov=. --cov-report=term-missing --cov-report=html --cov-fail-under=60

security:
	bandit -r core/ ceo/ specialists/ cli/ memory/ -ll

complexity:
	radon cc core/ ceo/ specialists/ -a -nc
	radon mi core/ ceo/ specialists/ -nc

mutation:
	mutmut run --paths-to-mutate core/

sbom:
	cyclonedx-py environment -o sbom.json --output-format json

benchmark:
	pytest tests/test_benchmarks.py -v --benchmark-only

all: lint format type-check test security complexity

clean:
	find . -type d -name __pycache__ -exec rm -rf {} +
	find . -type d -name .mypy_cache -exec rm -rf {} +
	find . -type d -name .pytest_cache -exec rm -rf {} +
	rm -rf htmlcov .coverage coverage.xml sbom.json bandit-report.json
	rm -rf .mutmut-cache
