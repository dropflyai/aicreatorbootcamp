-- PX1000 RPC Functions

CREATE OR REPLACE FUNCTION get_brain_stats(p_brain_type text)
RETURNS TABLE (total_runs bigint, successful_runs bigint, success_rate numeric, avg_tokens numeric, pattern_count bigint)
LANGUAGE plpgsql SECURITY DEFINER
AS $$
BEGIN
    RETURN QUERY SELECT
        (SELECT count(*) FROM agent_runs WHERE agent_type=p_brain_type),
        (SELECT count(*) FROM agent_runs WHERE agent_type=p_brain_type AND success=true),
        (SELECT CASE WHEN count(*)=0 THEN 0.0
            ELSE round(count(*) FILTER (WHERE success=true)::numeric/count(*)::numeric*100,2)
            END FROM agent_runs WHERE agent_type=p_brain_type),
        (SELECT coalesce(round(avg(tokens_used)::numeric,0),0)
         FROM agent_runs WHERE agent_type=p_brain_type AND tokens_used IS NOT NULL),
        (SELECT count(*) FROM shared_patterns WHERE brain_type=p_brain_type);
END;
$$;

GRANT EXECUTE ON FUNCTION get_brain_stats(text) TO service_role;

-- Full-text search on task_summary + solution
CREATE OR REPLACE FUNCTION search_experiences_fts(p_query text)
RETURNS SETOF shared_experiences
LANGUAGE plpgsql SECURITY DEFINER
AS $$
DECLARE
    tsquery_val tsquery;
BEGIN
    tsquery_val := plainto_tsquery('english', p_query);
    RETURN QUERY
    SELECT se.* FROM shared_experiences se
    WHERE to_tsvector('english',
        coalesce(se.task_summary,'') || ' ' || coalesce(se.solution,''))
        @@ tsquery_val
    ORDER BY ts_rank(
        to_tsvector('english',
            coalesce(se.task_summary,'') || ' ' || coalesce(se.solution,'')),
        tsquery_val) DESC
    LIMIT 20;
END;
$$;

GRANT EXECUTE ON FUNCTION search_experiences_fts(text) TO service_role;

-- GIN index for FTS performance
CREATE INDEX IF NOT EXISTS idx_shared_experiences_fts
    ON shared_experiences USING GIN (
        to_tsvector('english', coalesce(task_summary,'') || ' ' || coalesce(solution,''))
    );
