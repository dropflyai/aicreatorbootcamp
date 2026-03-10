-- PX1000 Agent System -- Seed Data for Local Development
-- Run after migrations: psql $DATABASE_URL -f supabase/seed.sql

-- Sample agent_runs (3 runs)
INSERT INTO agent_runs (id, agent_type, task_input, task_output, success, tool_calls, tokens_used, model, created_at) VALUES
('a1000001-0001-4000-8000-000000000001', 'engineering',
 'Create a REST API for user authentication with JWT tokens',
 'Generated FastAPI auth module with JWT support. Files: auth/router.py, auth/models.py, tests/test_auth.py.',
 true,
 '[{"tool": "write_file", "path": "auth/router.py"}, {"tool": "run_tests", "result": "4/4 passed"}]'::jsonb,
 3420, 'claude-sonnet-4-20250514', '2025-01-15T10:30:00Z'),
('a1000001-0002-4000-8000-000000000002', 'design',
 'Design a dashboard layout for SaaS analytics product',
 'Created responsive dashboard with sidebar nav, KPI cards, and chart grid.',
 true,
 '[{"tool": "write_file", "path": "components/Dashboard.tsx"}]'::jsonb,
 2180, 'claude-sonnet-4-20250514', '2025-01-15T11:00:00Z'),
('a1000001-0003-4000-8000-000000000003', 'mba',
 'Analyze competitive landscape for AI code review tools',
 'Analysis incomplete. Insufficient market data for 3 of 5 competitors.',
 false,
 '[{"tool": "web_search", "error": "rate limited"}]'::jsonb,
 1850, 'claude-sonnet-4-20250514', '2025-01-15T12:00:00Z');

-- Sample shared_experiences (2 records)
INSERT INTO shared_experiences (id, brain_type, project_id, category, task_summary, problem, solution, outcome, lessons_learned, tags, created_at) VALUES
('b1000001-0001-4000-8000-000000000001', 'engineering', 'proj-saas-001', 'success',
 'Implemented API rate limiting with Redis sliding window',
 'No rate limiting caused overloads during peak traffic',
 'Sliding window rate limiter using Redis sorted sets with per-endpoint config via decorator.',
 'Deployed successfully. P99 latency added < 2ms.',
 'Redis sorted sets ideal for sliding window. Always add X-RateLimit-Remaining headers.',
 '["rate-limiting", "redis", "api"]'::jsonb, '2025-01-14T09:00:00Z'),
('b1000001-0002-4000-8000-000000000002', 'design', 'proj-saas-001', 'failure',
 'Dashboard color scheme failed WCAG 2.1 AA contrast',
 'Light gray text on white backgrounds; 12 contrast violations.',
 'Revised color system using APCA contrast calculations with AA-compliant design tokens.',
 'All violations resolved. New color system adopted as default.',
 'Run contrast checks BEFORE presenting designs. Build accessibility into tokens from day one.',
 '["accessibility", "wcag", "design-tokens"]'::jsonb, '2025-01-14T14:00:00Z');

-- Sample shared_pattern (1 record)
INSERT INTO shared_patterns (id, brain_type, pattern_name, description, trigger_conditions, solution_template, example_usages, observation_count, tags, created_at) VALUES
('c1000001-0001-4000-8000-000000000001', 'engineering', 'retry-with-exponential-backoff',
 'Wrap external API calls in retry loop with exponential backoff and jitter.',
 '["external API call", "network request", "third-party service"]'::jsonb,
 'async def retry(fn, retries=3, delay=1.0):
  for i in range(retries):
    try: return await fn()
    except: await sleep(delay * 2**i)',
 '["Supabase reconnection", "Anthropic API retry", "S3 upload retry"]'::jsonb,
 5, '["reliability", "api", "error-handling"]'::jsonb, '2025-01-10T08:00:00Z');

-- Sample brain_build (1 record)
INSERT INTO brain_builds (id, brain_name, validation_passed, files_created, validation_errors, created_at) VALUES
('d1000001-0001-4000-8000-000000000001', 'marketing_brain', true,
 '["marketing_brain/CLAUDE.md", "marketing_brain/agent.py", "marketing_brain/tools.py", "marketing_brain/tests/test_agent.py"]'::jsonb,
 '[]'::jsonb, '2025-01-13T16:00:00Z');

-- Seed complete: 3 agent_runs, 2 shared_experiences, 1 shared_pattern, 1 brain_build
