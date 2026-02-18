"""MCP Server for Prototype X1000 Brain System.

Provides tools for Claude Desktop and Claude Code to interact with
the brain agent system.

Setup in Claude Desktop:
    Add to claude_desktop_config.json:
    {
        "mcpServers": {
            "prototype-x1000": {
                "command": "python",
                "args": ["/path/to/brain_mcp_server.py"],
                "env": {
                    "ANTHROPIC_API_KEY": "your-key",
                    "SUPABASE_URL": "your-url",
                    "SUPABASE_SERVICE_KEY": "your-key"
                }
            }
        }
    }
"""

import os
import sys
import json
import asyncio
from pathlib import Path
from typing import Any, Optional

# Add parent paths for imports
sys.path.insert(0, str(Path(__file__).parent.parent))

try:
    from mcp.server import Server
    from mcp.server.stdio import stdio_server
    from mcp.types import (
        Tool,
        TextContent,
        Resource,
        ResourceTemplate,
    )
    MCP_AVAILABLE = True
except ImportError:
    MCP_AVAILABLE = False
    print("MCP package not installed. Run: pip install mcp", file=sys.stderr)


# Initialize server
if MCP_AVAILABLE:
    server = Server("prototype-x1000")


def get_memory_client():
    """Get memory client if available."""
    try:
        from agents.core import SupabaseMemoryClient
        return SupabaseMemoryClient()
    except Exception:
        return None


def get_specialist(brain_type: str):
    """Get a specialist agent."""
    from agents.specialists import SpecialistFactory
    return SpecialistFactory.create(brain_type, memory_client=get_memory_client())


def get_ceo_agent():
    """Get the CEO orchestrator agent."""
    from agents.ceo import CEOAgent
    return CEOAgent(memory_client=get_memory_client())


if MCP_AVAILABLE:

    @server.list_tools()
    async def list_tools() -> list[Tool]:
        """List available tools."""
        return [
            Tool(
                name="run_agent",
                description="Run a task (routes through CEO Brain for orchestration). Specify a brain_type hint to suggest which specialist should handle it.",
                inputSchema={
                    "type": "object",
                    "properties": {
                        "brain_type": {
                            "type": "string",
                            "description": "Brain type hint (optional). CEO will route appropriately. Options: engineering, design, mba, product, marketing, sales, finance, legal, security, cloud, mobile, qa, ai, data, analytics, content, etc.",
                        },
                        "task": {
                            "type": "string",
                            "description": "The task to execute",
                        },
                        "context": {
                            "type": "string",
                            "description": "Additional context (optional)",
                        },
                        "direct": {
                            "type": "boolean",
                            "description": "If true, bypass CEO and go directly to specialist (not recommended)",
                            "default": False,
                        },
                    },
                    "required": ["task"],
                },
            ),
            Tool(
                name="orchestrate",
                description="Orchestrate a complex task across multiple brain agents",
                inputSchema={
                    "type": "object",
                    "properties": {
                        "task": {
                            "type": "string",
                            "description": "The task to orchestrate",
                        },
                        "context": {
                            "type": "string",
                            "description": "Additional context (optional)",
                        },
                    },
                    "required": ["task"],
                },
            ),
            Tool(
                name="query_memory",
                description="Search past experiences and patterns",
                inputSchema={
                    "type": "object",
                    "properties": {
                        "query": {
                            "type": "string",
                            "description": "Search query",
                        },
                        "brain_type": {
                            "type": "string",
                            "enum": ["engineering", "design", "mba", "all"],
                            "description": "Filter by brain type",
                        },
                        "category": {
                            "type": "string",
                            "enum": ["success", "failure", "pattern", "all"],
                            "description": "Filter by category",
                        },
                    },
                    "required": ["query"],
                },
            ),
            Tool(
                name="get_patterns",
                description="Get established patterns for a brain type",
                inputSchema={
                    "type": "object",
                    "properties": {
                        "brain_type": {
                            "type": "string",
                            "enum": ["engineering", "design", "mba"],
                            "description": "Brain type to get patterns for",
                        },
                        "min_observations": {
                            "type": "integer",
                            "default": 3,
                            "description": "Minimum observation count",
                        },
                    },
                    "required": ["brain_type"],
                },
            ),
            Tool(
                name="build_brain",
                description="Generate a new specialist brain",
                inputSchema={
                    "type": "object",
                    "properties": {
                        "brain_name": {
                            "type": "string",
                            "description": "Name for the new brain (e.g., 'product')",
                        },
                        "domain": {
                            "type": "string",
                            "description": "Domain of expertise",
                        },
                        "capabilities": {
                            "type": "array",
                            "items": {"type": "string"},
                            "description": "List of capabilities",
                        },
                    },
                    "required": ["brain_name", "domain", "capabilities"],
                },
            ),
            Tool(
                name="list_brains",
                description="List all available brains and their status",
                inputSchema={
                    "type": "object",
                    "properties": {},
                },
            ),
        ]

    @server.call_tool()
    async def call_tool(name: str, arguments: dict[str, Any]) -> list[TextContent]:
        """Execute a tool."""
        try:
            if name == "run_agent":
                brain_hint = arguments.get("brain_type", "")
                task = arguments["task"]
                context = arguments.get("context", "")
                direct = arguments.get("direct", False)

                if direct and brain_hint:
                    # Direct mode: bypass CEO, go straight to specialist
                    agent = get_specialist(brain_hint)
                    result = agent.run(task, context)

                    return [TextContent(
                        type="text",
                        text=json.dumps({
                            "mode": "direct",
                            "brain_used": brain_hint,
                            "success": result.success,
                            "content": result.content,
                            "error": result.error,
                            "tokens_used": result.tokens_used,
                        }, indent=2),
                    )]
                else:
                    # Default: route through CEO Brain
                    ceo = get_ceo_agent()
                    enhanced_context = context or ""

                    if brain_hint and brain_hint != "ceo":
                        enhanced_context = f"User requested {brain_hint} brain for this task.\n{enhanced_context}"

                    result = ceo.orchestrate(task, enhanced_context if enhanced_context else None)

                    return [TextContent(
                        type="text",
                        text=json.dumps({
                            "mode": "ceo_orchestrated",
                            "success": result.success,
                            "final_synthesis": result.final_synthesis,
                            "brains_used": result.brains_used,
                            "subtask_count": len(result.subtask_results),
                        }, indent=2),
                    )]

            elif name == "orchestrate":
                task = arguments["task"]
                context = arguments.get("context")

                ceo = get_ceo_agent()
                result = ceo.orchestrate(task, context)

                return [TextContent(
                    type="text",
                    text=json.dumps({
                        "success": result.success,
                        "final_synthesis": result.final_synthesis,
                        "brains_used": result.brains_used,
                        "subtask_count": len(result.subtask_results),
                    }, indent=2),
                )]

            elif name == "query_memory":
                query = arguments["query"]
                brain_type = arguments.get("brain_type", "all")
                category = arguments.get("category", "all")

                memory = get_memory_client()
                if not memory:
                    return [TextContent(
                        type="text",
                        text="Memory client not available. Check Supabase configuration.",
                    )]

                results = memory.search_experiences(
                    brain_type=brain_type if brain_type != "all" else None,
                    category=category if category != "all" else None,
                    search_text=query,
                    limit=10,
                )

                return [TextContent(
                    type="text",
                    text=json.dumps(results, indent=2, default=str),
                )]

            elif name == "get_patterns":
                brain_type = arguments["brain_type"]
                min_obs = arguments.get("min_observations", 3)

                memory = get_memory_client()
                if not memory:
                    return [TextContent(
                        type="text",
                        text="Memory client not available.",
                    )]

                patterns = memory.get_established_patterns(
                    min_observations=min_obs,
                    brain_type=brain_type,
                )

                return [TextContent(
                    type="text",
                    text=json.dumps(patterns, indent=2, default=str),
                )]

            elif name == "build_brain":
                from agents.brain_builder import BrainBuilderAgent

                builder = BrainBuilderAgent(memory_client=get_memory_client())
                result = builder.build_brain(
                    brain_name=arguments["brain_name"],
                    domain=arguments["domain"],
                    capabilities=arguments["capabilities"],
                )

                return [TextContent(
                    type="text",
                    text=json.dumps(result, indent=2),
                )]

            elif name == "list_brains":
                from agents.core import BrainLoader
                from agents.specialists import SpecialistFactory

                loader = BrainLoader()
                available = loader.get_available_brains()

                # All 37 brains organized by tier
                all_brains = list(loader.BRAIN_PATHS.keys())

                brains_info = {
                    "total_brains": 37,
                    "orchestration": "All tasks route through CEO Brain",
                    "brains": []
                }

                for brain in all_brains:
                    brains_info["brains"].append({
                        "name": brain,
                        "status": "ready" if brain in available else "pending",
                        "description": SpecialistFactory.get_description(brain),
                    })

                return [TextContent(
                    type="text",
                    text=json.dumps(brains_info, indent=2),
                )]

            else:
                return [TextContent(
                    type="text",
                    text=f"Unknown tool: {name}",
                )]

        except Exception as e:
            return [TextContent(
                type="text",
                text=f"Error executing {name}: {str(e)}",
            )]

    @server.list_resources()
    async def list_resources() -> list[Resource]:
        """List available resources."""
        return [
            Resource(
                uri="brain://engineering/claude.md",
                name="Engineering Brain",
                description="Engineering brain guidance document",
                mimeType="text/markdown",
            ),
            Resource(
                uri="brain://design/claude.md",
                name="Design Brain",
                description="Design brain guidance document",
                mimeType="text/markdown",
            ),
            Resource(
                uri="brain://mba/claude.md",
                name="MBA Brain",
                description="MBA brain guidance document",
                mimeType="text/markdown",
            ),
        ]

    @server.read_resource()
    async def read_resource(uri: str) -> str:
        """Read a brain resource."""
        from agents.core import BrainLoader

        # Parse URI like "brain://engineering/claude.md"
        parts = uri.replace("brain://", "").split("/")
        if len(parts) < 2:
            return "Invalid resource URI"

        brain_name = parts[0]
        loader = BrainLoader()

        try:
            content = loader.load_brain(brain_name)
            return content
        except Exception as e:
            return f"Error loading brain: {str(e)}"


async def main():
    """Run the MCP server."""
    if not MCP_AVAILABLE:
        print("MCP package required. Install with: pip install mcp")
        sys.exit(1)

    async with stdio_server() as (read_stream, write_stream):
        await server.run(
            read_stream,
            write_stream,
            server.create_initialization_options(),
        )


if __name__ == "__main__":
    asyncio.run(main())
