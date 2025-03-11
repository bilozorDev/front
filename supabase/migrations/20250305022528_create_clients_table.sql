-- Create the clients table with user_id included from the start
CREATE TABLE clients (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    name TEXT NOT NULL,
    email TEXT,
    phone TEXT,
    address TEXT,
    user_id UUID NOT NULL DEFAULT auth.uid(),
    created_at TIMESTAMPTZ DEFAULT now()
);

-- Create index on user_id for better query performance
CREATE INDEX idx_clients_user_id ON clients(user_id);

-- Add comment to the column
COMMENT ON COLUMN clients.user_id IS 'The UUID of the user who owns this client';

-- Enable Row Level Security on the clients table
ALTER TABLE clients ENABLE ROW LEVEL SECURITY;

-- Create a policy that allows users to select only their own clients
CREATE POLICY "Users can view their own clients" 
ON clients FOR SELECT 
USING (auth.uid() = user_id);

-- Create a policy that allows users to insert their own clients
CREATE POLICY "Users can insert their own clients" 
ON clients FOR INSERT 
WITH CHECK (auth.uid() = user_id);

-- Create a policy that allows users to update only their own clients
CREATE POLICY "Users can update their own clients" 
ON clients FOR UPDATE 
USING (auth.uid() = user_id);

-- Create a policy that allows users to delete only their own clients
CREATE POLICY "Users can delete their own clients" 
ON clients FOR DELETE 
USING (auth.uid() = user_id);