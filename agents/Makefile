.PHONY: lint format type-check test test-cov all clean

lint:
	ruff check .

format:
	ruff format .

type-check:
	mypy .

test:
	pytest tests/ -v

test-cov:
	pytest tests/ -v --cov=. --cov-report=term-missing --cov-report=html

all: lint format type-check test

clean:
	find . -type d -name __pycache__ -exec rm -rf {} +
	find . -type d -name .mypy_cache -exec rm -rf {} +
	find . -type d -name .pytest_cache -exec rm -rf {} +
	rm -rf htmlcov .coverage coverage.xml
