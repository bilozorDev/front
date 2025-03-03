CREATE TABLE
    clients (
        id UUID PRIMARY KEY DEFAULT uuid_generate_v4 (),
        user_id UUID NOT NULL REFERENCES auth.users (id) ON DELETE CASCADE,
        name TEXT NOT NULL,
        email TEXT,
        phone TEXT,
        address TEXT,
        created_at TIMESTAMP
        WITH
            TIME ZONE DEFAULT now () NOT NULL
    );

-- Add RLS (Row Level Security) policies
ALTER TABLE clients ENABLE ROW LEVEL SECURITY;

-- Create policy for users to select their own clients
CREATE POLICY clients_select_policy ON clients FOR
SELECT
    USING (auth.uid () = user_id);

-- Create policy for users to insert their own clients
CREATE POLICY clients_insert_policy ON clients FOR INSERT
WITH
    CHECK (auth.uid () = user_id);

-- Create policy for users to update their own clients
CREATE POLICY clients_update_policy ON clients FOR
UPDATE USING (auth.uid () = user_id);

-- Create policy for users to delete their own clients
CREATE POLICY clients_delete_policy ON clients FOR DELETE USING (auth.uid () = user_id);