-- Create a function to extract the Clerk user ID from JWT claims
CREATE OR REPLACE FUNCTION requesting_user_id()
RETURNS text
LANGUAGE sql
STABLE
AS $$
  SELECT NULLIF(
    current_setting('request.jwt.claims', true)::json->>'sub',
    ''
  )::text;
$$;

-- Add a comment to the function
COMMENT ON FUNCTION requesting_user_id() IS 'Gets the Clerk user ID from the JWT claims in the request';
