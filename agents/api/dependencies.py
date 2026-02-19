"""Shared dependencies for API routes."""

from functools import lru_cache

from agents.core import BrainLoader
from agents.core.memory_client import SupabaseMemoryClient


@lru_cache
def get_brain_loader() -> BrainLoader:
    """Cached BrainLoader instance."""
    return BrainLoader()


def get_memory_client() -> SupabaseMemoryClient | None:
    """Get memory client if Supabase is configured."""
    try:
        return SupabaseMemoryClient()
    except ValueError:
        return None
