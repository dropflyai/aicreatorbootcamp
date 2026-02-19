"""Specialist brain agents for Prototype X1000."""

from .design_agent import DesignAgent
from .engineering_agent import EngineeringAgent
from .generic_agent import GenericSpecialistAgent
from .mba_agent import MBAAgent
from .specialist_factory import SpecialistFactory

__all__ = [
    "EngineeringAgent",
    "DesignAgent",
    "MBAAgent",
    "GenericSpecialistAgent",
    "SpecialistFactory",
]
