"""Specialist brain agents for Prototype X1000."""

from .engineering_agent import EngineeringAgent
from .design_agent import DesignAgent
from .mba_agent import MBAAgent
from .generic_agent import GenericSpecialistAgent
from .specialist_factory import SpecialistFactory

__all__ = [
    "EngineeringAgent",
    "DesignAgent",
    "MBAAgent",
    "GenericSpecialistAgent",
    "SpecialistFactory",
]
