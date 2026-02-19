# Automation Recipes -- Index

Automation recipes are executable guides for infrastructure, deployment, and tooling automation tasks. Each recipe covers a single automation domain with concrete setup steps, configuration, and verification procedures.

These recipes are the execution layer of the Engineering Brain's automation system. If an automation recipe exists for a task, it must be used instead of manual procedures.

---

## Recipe Index

| Recipe | File | Domain |
|--------|------|--------|
| CI/CD Pipelines | `CI-CD.md` | GitHub Actions, build pipelines, deployment automation, release workflows |
| Playwright Testing | `Playwright.md` | End-to-end test automation, browser test infrastructure, test runner config |
| Chromium Automation | `Chromium.md` | Headless browser automation, screenshot pipelines, web scraping setup |
| MCP Integration | `MCP.md` | Model Context Protocol server setup, tool registration, MCP workflows |
| n8n Workflows | `n8n.md` | Workflow automation, webhook triggers, node configuration, integrations |
| AWS SSM | `AWS-SSM.md` | AWS Systems Manager, Parameter Store, remote command execution |
| Cloudflare | `Cloudflare.md` | DNS automation, Workers deployment, tunnel configuration, caching rules |
| Supabase | `Supabase.md` | Database automation, migration scripts, edge function deployment |
| Supabase Backup | `SupabaseBackup.md` | Automated database backups, restore procedures, backup verification |

---

## How to Use Automation Recipes

1. **Check `Automations/AutomationIndex.md` first** to find the relevant automation for your task.
2. **Open the matching recipe** from the table above.
3. **Follow the steps exactly.** Manual shortcuts are forbidden when an automation recipe exists.
4. **If the automation fails**, follow the broken automation runbook at `Automations/Runbooks/BrokenAutomation.md`.
5. **If no recipe exists**, build the automation, then create a recipe immediately.

---

## How to Add a New Automation Recipe

1. Create a new `.md` file in this directory named after the automation domain.
2. Include: prerequisites, setup steps, configuration, execution commands, verification, and troubleshooting.
3. Add the recipe to the table in this README.
4. Add a corresponding entry to `Automations/AutomationIndex.md`.

---

## Cross-References

- **Automations/AutomationIndex.md** -- Master registry of all available automations
- **Automations/Runbooks/** -- Operational runbooks for automation failure recovery
- **Automations/scripts/** -- Executable scripts referenced by recipes
- **Automations/ToolingMatrix.md** -- Tool selection matrix for automation decisions
- **Solutions/Recipes/** -- Solution recipes for non-automation technical tasks

---

**If an automation exists, use it. Silent manual fallback is forbidden.**
