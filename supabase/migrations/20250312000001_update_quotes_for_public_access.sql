-- Add columns to quotes table for public sharing
ALTER TABLE quotes ADD COLUMN public_access BOOLEAN DEFAULT false;
ALTER TABLE quotes ADD COLUMN public_token UUID DEFAULT uuid_generate_v4();
ALTER TABLE quotes ADD COLUMN client_id UUID REFERENCES clients(id);

-- Create policy to allow public access to shared quotes
CREATE POLICY quotes_public_policy ON quotes 
FOR SELECT
USING (public_access = true);

-- Add a function to mark a quote as public or private
CREATE OR REPLACE FUNCTION toggle_quote_public_access(quote_id UUID, make_public BOOLEAN)
RETURNS UUID
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
DECLARE
  token UUID;
BEGIN
  -- Check if user owns this quote
  IF NOT EXISTS (SELECT 1 FROM quotes WHERE id = quote_id AND user_id = auth.uid()) THEN
    RAISE EXCEPTION 'Not authorized to modify this quote';
  END IF;

  -- Generate a new token if making public, otherwise keep existing
  IF make_public THEN
    token := uuid_generate_v4();
    UPDATE quotes SET public_access = true, public_token = token WHERE id = quote_id;
  ELSE
    UPDATE quotes SET public_access = false WHERE id = quote_id;
    SELECT public_token INTO token FROM quotes WHERE id = quote_id;
  END IF;

  RETURN token;
END;
$$;