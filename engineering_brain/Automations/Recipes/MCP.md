# MCP Recipe -- Model Context Protocol

> Practical recipes for building MCP servers, defining tools and resources,
> and integrating with Claude Desktop and PX1000 brains.
> Copy, adapt, ship.

---

## Table of Contents

1. [MCP Architecture Overview](#mcp-architecture-overview)
2. [Tool Definitions](#tool-definitions)
3. [Resource Definitions](#resource-definitions)
4. [Setting Up a Python MCP Server](#python-mcp-server)
5. [Claude Desktop Configuration](#claude-desktop-configuration)
6. [Testing MCP Tools Locally](#testing-locally)
7. [Debugging MCP Connections](#debugging)
8. [PX1000 Brain MCP Integration](#px1000-integration)

---

## MCP Architecture Overview

MCP (Model Context Protocol) connects AI models to external tools and data
through a standardized client-server protocol.

```
┌──────────────────┐       stdio / SSE        ┌──────────────────┐
│   MCP Client     │ ◄──────────────────────► │   MCP Server     │
│  (Claude Desktop │                           │  (your code)     │
│   or SDK app)    │                           │                  │
└──────────────────┘                           └────────┬─────────┘
                                                        │
                                               ┌────────┴─────────┐
                                               │  External APIs   │
                                               │  Databases       │
                                               │  File Systems    │
                                               │  Services        │
                                               └──────────────────┘
```

### Core concepts

| Concept    | Description                                                |
|------------|------------------------------------------------------------|
| Server     | Exposes tools, resources, and prompts to the client.       |
| Client     | The host application (e.g., Claude Desktop) that calls the server. |
| Transport  | Communication channel: `stdio` (local) or `SSE` (remote). |
| Tool       | A callable function the model can invoke (like an API endpoint). |
| Resource   | Read-only data the model can access (like a GET endpoint). |
| Prompt     | Pre-defined prompt templates the server can provide.       |

### Transport comparison

| Transport | Use Case                     | Pros                    | Cons                  |
|-----------|------------------------------|-------------------------|-----------------------|
| `stdio`   | Local MCP servers            | Simple, fast, secure    | Local only            |
| `SSE`     | Remote / shared MCP servers  | Network accessible      | Needs auth, slower    |

---

## Tool Definitions

Tools are the primary way an MCP server exposes functionality. Each tool has
a name, description, and JSON Schema for its input.

### Tool definition structure

```python
{
    "name": "get_weather",
    "description": "Get current weather for a city. Returns temperature, conditions, and humidity.",
    "inputSchema": {
        "type": "object",
        "properties": {
            "city": {
                "type": "string",
                "description": "City name (e.g., 'San Francisco')"
            },
            "units": {
                "type": "string",
                "enum": ["celsius", "fahrenheit"],
                "description": "Temperature units",
                "default": "fahrenheit"
            }
        },
        "required": ["city"]
    }
}
```

### Best practices for tool definitions

- **Descriptions matter.** The model decides whether to call a tool based on its
  description. Be specific about what the tool does and returns.
- **Use required fields.** Mark essential parameters as required.
- **Provide defaults.** Use `default` for optional parameters.
- **Constrain inputs.** Use `enum`, `minimum`, `maximum`, `pattern` to reduce errors.
- **Name clearly.** Use `verb_noun` format: `get_weather`, `create_issue`, `search_docs`.

---

## Resource Definitions

Resources expose read-only data to the model. They are identified by URIs.

### Static resource

```python
@server.resource("config://app/settings")
async def get_settings() -> str:
    """Application configuration settings."""
    return json.dumps({"theme": "dark", "language": "en"})
```

### Dynamic resource with URI template

```python
@server.resource("docs://articles/{slug}")
async def get_article(slug: str) -> str:
    """Retrieve a documentation article by its URL slug."""
    article = await db.get_article(slug)
    return article.content
```

### When to use resources vs tools

| Use a Resource when...               | Use a Tool when...                    |
|---------------------------------------|---------------------------------------|
| Data is read-only                     | Action has side effects               |
| Content can be pre-fetched/cached     | Input is dynamic/complex              |
| URI-addressable data (docs, configs)  | Computation or external API calls     |

---

## Python MCP Server

### Installation

```bash
pip install mcp
```

### Minimal server

```python
# server.py
from mcp.server import Server
from mcp.server.stdio import stdio_server
from mcp.types import TextContent, Tool
import json

server = Server("my-mcp-server")


@server.list_tools()
async def list_tools() -> list[Tool]:
    return [
        Tool(
            name="add_numbers",
            description="Add two numbers together and return the result.",
            inputSchema={
                "type": "object",
                "properties": {
                    "a": {"type": "number", "description": "First number"},
                    "b": {"type": "number", "description": "Second number"},
                },
                "required": ["a", "b"],
            },
        )
    ]


@server.call_tool()
async def call_tool(name: str, arguments: dict) -> list[TextContent]:
    if name == "add_numbers":
        result = arguments["a"] + arguments["b"]
        return [TextContent(type="text", text=str(result))]
    raise ValueError(f"Unknown tool: {name}")


async def main():
    async with stdio_server() as (read_stream, write_stream):
        await server.run(read_stream, write_stream, server.create_initialization_options())


if __name__ == "__main__":
    import asyncio
    asyncio.run(main())
```

### Server with resources and tools

```python
# enhanced_server.py
from mcp.server import Server
from mcp.server.stdio import stdio_server
from mcp.types import TextContent, Tool, Resource
import json
import httpx

server = Server("enhanced-server")

# --- Tools ---

@server.list_tools()
async def list_tools() -> list[Tool]:
    return [
        Tool(
            name="search_issues",
            description="Search GitHub issues by query string.",
            inputSchema={
                "type": "object",
                "properties": {
                    "repo": {"type": "string", "description": "owner/repo"},
                    "query": {"type": "string", "description": "Search query"},
                },
                "required": ["repo", "query"],
            },
        ),
        Tool(
            name="create_issue",
            description="Create a new GitHub issue.",
            inputSchema={
                "type": "object",
                "properties": {
                    "repo": {"type": "string"},
                    "title": {"type": "string"},
                    "body": {"type": "string"},
                    "labels": {
                        "type": "array",
                        "items": {"type": "string"},
                        "default": [],
                    },
                },
                "required": ["repo", "title"],
            },
        ),
    ]


@server.call_tool()
async def call_tool(name: str, arguments: dict) -> list[TextContent]:
    if name == "search_issues":
        async with httpx.AsyncClient() as client:
            resp = await client.get(
                f"https://api.github.com/search/issues",
                params={"q": f"repo:{arguments['repo']} {arguments['query']}"},
            )
            return [TextContent(type="text", text=resp.text)]

    if name == "create_issue":
        # Implementation here
        return [TextContent(type="text", text="Issue created")]

    raise ValueError(f"Unknown tool: {name}")


# --- Resources ---

@server.list_resources()
async def list_resources() -> list[Resource]:
    return [
        Resource(
            uri="config://server/status",
            name="Server Status",
            description="Current server health and version info.",
        )
    ]


@server.read_resource()
async def read_resource(uri: str) -> str:
    if uri == "config://server/status":
        return json.dumps({"status": "healthy", "version": "1.0.0"})
    raise ValueError(f"Unknown resource: {uri}")


async def main():
    async with stdio_server() as (read_stream, write_stream):
        await server.run(read_stream, write_stream, server.create_initialization_options())

if __name__ == "__main__":
    import asyncio
    asyncio.run(main())
```

---

## Claude Desktop Configuration

### Config file location

| OS      | Path                                                              |
|---------|-------------------------------------------------------------------|
| macOS   | `~/Library/Application Support/Claude/claude_desktop_config.json` |
| Windows | `%APPDATA%\Claude\claude_desktop_config.json`                     |
| Linux   | `~/.config/claude/claude_desktop_config.json`                     |

### Configuration format

```json
{
  "mcpServers": {
    "my-server": {
      "command": "python",
      "args": ["/absolute/path/to/server.py"],
      "env": {
        "GITHUB_TOKEN": "ghp_xxxx",
        "API_KEY": "sk-xxxx"
      }
    },
    "another-server": {
      "command": "npx",
      "args": ["-y", "@modelcontextprotocol/server-filesystem", "/Users/me/projects"]
    }
  }
}
```

Key points:
- Use **absolute paths** for the server script.
- `command` is the executable (python, node, npx, etc.).
- `args` are passed to the command.
- `env` sets environment variables available to the server process.
- Restart Claude Desktop after editing the config.

---

## Testing MCP Tools Locally

### Using the MCP Inspector

```bash
# Install and run the MCP Inspector (web UI for testing)
npx @modelcontextprotocol/inspector python server.py
```

The Inspector opens a browser UI where you can:
- See all registered tools and resources.
- Call tools with test inputs.
- View raw JSON-RPC messages.
- Inspect responses and errors.

### Manual testing with stdio

```bash
# Send a JSON-RPC request directly via stdin
echo '{"jsonrpc":"2.0","id":1,"method":"tools/list"}' | python server.py
```

### Unit testing tools

```python
# test_server.py
import pytest
from server import call_tool

@pytest.mark.asyncio
async def test_add_numbers():
    result = await call_tool("add_numbers", {"a": 2, "b": 3})
    assert result[0].text == "5"

@pytest.mark.asyncio
async def test_unknown_tool():
    with pytest.raises(ValueError, match="Unknown tool"):
        await call_tool("nonexistent", {})
```

---

## Debugging MCP Connections

### Common issues and fixes

| Problem                          | Cause                         | Fix                                           |
|----------------------------------|-------------------------------|-----------------------------------------------|
| Server not showing in Claude     | Bad config path               | Check absolute path in config JSON            |
| "spawn ENOENT" error            | Command not found             | Use full path to python/node                  |
| Tools not appearing              | Server crashes on startup     | Run server manually to see error output       |
| Timeout on tool call             | Server hangs                  | Add timeout handling, check async/await        |
| "Connection refused"             | Server not running (SSE)      | Verify server is started and port is correct  |

### Enable debug logging

```python
import logging
logging.basicConfig(level=logging.DEBUG)

# In your server, log tool calls
@server.call_tool()
async def call_tool(name: str, arguments: dict):
    logging.debug(f"Tool called: {name} with args: {arguments}")
    # ...
```

### Check Claude Desktop logs

```bash
# macOS -- Claude Desktop logs
tail -f ~/Library/Logs/Claude/mcp*.log
```

---

## PX1000 Brain MCP Integration

Each PX1000 brain can expose its capabilities as MCP tools, enabling Claude
to orchestrate brains through the MCP protocol.

### Reference implementation

See `mcp/brain_mcp_server.py` for the canonical brain MCP server pattern.

### Brain MCP server pattern

```python
# mcp/brain_mcp_server.py (conceptual)
from mcp.server import Server
from mcp.server.stdio import stdio_server
from mcp.types import TextContent, Tool

server = Server("px1000-engineering-brain")


@server.list_tools()
async def list_tools() -> list[Tool]:
    return [
        Tool(
            name="run_migration",
            description="Run a database migration using Supabase CLI.",
            inputSchema={
                "type": "object",
                "properties": {
                    "migration_name": {"type": "string"},
                    "direction": {"type": "string", "enum": ["up", "down"]},
                },
                "required": ["migration_name"],
            },
        ),
        Tool(
            name="run_tests",
            description="Run the test suite with Playwright.",
            inputSchema={
                "type": "object",
                "properties": {
                    "test_pattern": {"type": "string", "default": ""},
                    "headed": {"type": "boolean", "default": False},
                },
            },
        ),
        Tool(
            name="deploy",
            description="Deploy the application to the specified environment.",
            inputSchema={
                "type": "object",
                "properties": {
                    "environment": {
                        "type": "string",
                        "enum": ["preview", "staging", "production"],
                    },
                    "platform": {
                        "type": "string",
                        "enum": ["vercel", "fly", "railway"],
                    },
                },
                "required": ["environment", "platform"],
            },
        ),
    ]
```

### Claude Desktop config for PX1000 brains

```json
{
  "mcpServers": {
    "px1000-engineering": {
      "command": "python",
      "args": ["/path/to/prototype_x1000/engineering_brain/mcp/brain_mcp_server.py"],
      "env": {
        "SUPABASE_URL": "https://xxx.supabase.co",
        "SUPABASE_KEY": "eyJ..."
      }
    },
    "px1000-design": {
      "command": "python",
      "args": ["/path/to/prototype_x1000/design_brain/mcp/brain_mcp_server.py"]
    }
  }
}
```

### Integration pattern

```
CEO Brain
  │
  ├── MCP Client ──► Engineering Brain MCP Server
  │                    ├── run_migration
  │                    ├── run_tests
  │                    └── deploy
  │
  ├── MCP Client ──► Design Brain MCP Server
  │                    ├── generate_tokens
  │                    └── audit_accessibility
  │
  └── MCP Client ──► Data Brain MCP Server
                       ├── run_query
                       └── generate_report
```

Each brain server is independent. The CEO brain (or any orchestrator) connects
to multiple brain MCP servers simultaneously, delegating tasks through tool
calls.

---

*Engineering Brain -- Automations/Recipes/MCP.md*
