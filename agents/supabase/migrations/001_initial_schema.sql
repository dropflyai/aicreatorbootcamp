-- =============================================================================
-- PX1000 Agent System -- Initial Database Schema
-- =============================================================================
-- Migration: 001_initial_schema.sql
-- Description: Creates all tables used by SupabaseMemoryClient for agent
--   run logging, experience sharing, pattern recognition, brain builds,
--   and CEO task delegation.
--
-- Usage:
--   supabase db push
--   psql $DATABASE_URL -f supabase/migrations/001_initial_schema.sql
-- =============================================================================

CREATE EXTENSION IF NOT EXISTS "pgcrypto";

-- =============================================================================
-- agent_runs
-- =============================================================================
CREATE TABLE IF NOT EXISTS agent_runs (
    id                   uuid PRIMARY KEY DEFAULT gen_random_uuid(),
    agent_type           text NOT NULL,
    task_input           text NOT NULL,
    task_output          text,
    success              boolean DEFAULT false,
    tool_calls           jsonb DEFAULT '[]'::jsonb,
    tokens_used          integer,
    model                text,
    created_at           timestamptz DEFAULT now()
);

-- =============================================================================
-- shared_experiences
-- =============================================================================
CREATE TABLE IF NOT EXISTS shared_experiences (
    id                   uuid PRIMARY KEY DEFAULT gen_random_uuid(),
    brain_type           text NOT NULL,
    project_id           text,
    category             text NOT NULL CHECK (category IN ('success','failure','pattern','learning')),
    task_summary         text NOT NULL,
    problem              text,
    solution             text,
    outcome              text,
    lessons_learned      text,
    tags                 jsonb DEFAULT '[]'::jsonb,
    created_at           timestamptz DEFAULT now()
);

-- =============================================================================
-- shared_patterns
-- =============================================================================
CREATE TABLE IF NOT EXISTS shared_patterns (
    id                   uuid PRIMARY KEY DEFAULT gen_random_uuid(),
    brain_type           text NOT NULL,
    pattern_name         text NOT NULL,
    description          text NOT NULL,
    trigger_conditions   jsonb DEFAULT '[]'::jsonb,
    solution_template    text,
    example_usages       jsonb DEFAULT '[]'::jsonb,
    observation_count    integer DEFAULT 1,
    tags                 jsonb DEFAULT '[]'::jsonb,
    created_at           timestamptz DEFAULT now()
);

-- =============================================================================
-- brain_builds
-- =============================================================================
CREATE TABLE IF NOT EXISTS brain_builds (
    id                   uuid PRIMARY KEY DEFAULT gen_random_uuid(),
    brain_name           text NOT NULL,
    validation_passed    boolean DEFAULT false,
    files_created        jsonb DEFAULT '[]'::jsonb,
    validation_errors    jsonb DEFAULT '[]'::jsonb,
    created_at           timestamptz DEFAULT now()
);

-- =============================================================================
-- ceo_task_delegations
-- =============================================================================
CREATE TABLE IF NOT EXISTS ceo_task_delegations (
    id                   uuid PRIMARY KEY DEFAULT gen_random_uuid(),
    task_input           text NOT NULL,
    decomposed_tasks     jsonb DEFAULT '[]'::jsonb,
    delegated_to         jsonb DEFAULT '[]'::jsonb,
    routing_reasoning    text,
    success              boolean,
    completion_summary   text,
    created_at           timestamptz DEFAULT now()
);

-- =============================================================================
-- ceo_brain_collaborations
-- =============================================================================
CREATE TABLE IF NOT EXISTS ceo_brain_collaborations (
    id                   uuid PRIMARY KEY DEFAULT gen_random_uuid(),
    parent_agent         text NOT NULL,
    child_agent          text NOT NULL,
    task_description     text,
    result_summary       text,
    success              boolean,
    created_at           timestamptz DEFAULT now()
);

-- =============================================================================
-- Indexes
-- =============================================================================
CREATE INDEX idx_agent_runs_type_created ON agent_runs (agent_type, created_at DESC);
CREATE INDEX idx_shared_exp_brain_cat ON shared_experiences (brain_type, category, created_at DESC);
CREATE INDEX idx_shared_pat_brain_name ON shared_patterns (brain_type, pattern_name);
CREATE INDEX idx_brain_builds_name ON brain_builds (brain_name);
CREATE INDEX idx_ceo_deleg_created ON ceo_task_delegations (created_at DESC);
CREATE INDEX idx_ceo_collab_agents ON ceo_brain_collaborations (parent_agent, child_agent);

-- =============================================================================
-- Row-Level Security
-- =============================================================================
ALTER TABLE agent_runs ENABLE ROW LEVEL SECURITY;
ALTER TABLE shared_experiences ENABLE ROW LEVEL SECURITY;
ALTER TABLE shared_patterns ENABLE ROW LEVEL SECURITY;
ALTER TABLE brain_builds ENABLE ROW LEVEL SECURITY;
ALTER TABLE ceo_task_delegations ENABLE ROW LEVEL SECURITY;
ALTER TABLE ceo_brain_collaborations ENABLE ROW LEVEL SECURITY;

CREATE POLICY "service_role_all_agent_runs"
    ON agent_runs FOR ALL
    USING (auth.role() = 'service_role')
    WITH CHECK (auth.role() = 'service_role');

CREATE POLICY "service_role_all_shared_experiences"
    ON shared_experiences FOR ALL
    USING (auth.role() = 'service_role')
    WITH CHECK (auth.role() = 'service_role');

CREATE POLICY "service_role_all_shared_patterns"
    ON shared_patterns FOR ALL
    USING (auth.role() = 'service_role')
    WITH CHECK (auth.role() = 'service_role');

CREATE POLICY "service_role_all_brain_builds"
    ON brain_builds FOR ALL
    USING (auth.role() = 'service_role')
    WITH CHECK (auth.role() = 'service_role');

CREATE POLICY "service_role_all_ceo_task_delegations"
    ON ceo_task_delegations FOR ALL
    USING (auth.role() = 'service_role')
    WITH CHECK (auth.role() = 'service_role');

CREATE POLICY "service_role_all_ceo_brain_collaborations"
    ON ceo_brain_collaborations FOR ALL
    USING (auth.role() = 'service_role')
    WITH CHECK (auth.role() = 'service_role');

-- Done.
