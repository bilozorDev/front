-- Enable Row Level Security on clients table
ALTER TABLE clients ENABLE ROW LEVEL SECURITY;

-- Create policy for users to select only their own clients
CREATE POLICY "Users can select their own clients" ON clients FOR
SELECT
    TO authenticated USING (requesting_user_id () = user_id);

-- Create policy for users to insert only their own clients
CREATE POLICY "Users can insert their own clients" ON clients FOR INSERT TO authenticated
WITH
    CHECK (requesting_user_id () = user_id);

-- Create policy for users to update only their own clients
CREATE POLICY "Users can update their own clients" ON clients FOR
UPDATE TO authenticated USING (requesting_user_id () = user_id)
WITH
    CHECK (requesting_user_id () = user_id);

-- Create policy for users to delete only their own clients
CREATE POLICY "Users can delete their own clients" ON clients FOR DELETE TO authenticated USING (requesting_user_id () = user_id);

-- Add comment to explain RLS setup
COMMENT ON TABLE clients IS 'Table for storing client information with RLS enabled to restrict access to owner';