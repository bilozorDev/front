-- Add user_id column to clients table
ALTER TABLE clients
ADD COLUMN user_id TEXT NOT NULL DEFAULT requesting_user_id();

-- Create index on user_id for better query performance
CREATE INDEX idx_clients_user_id ON clients(user_id);

-- Add comment to the column
COMMENT ON COLUMN clients.user_id IS 'The ID of the user who owns this client';
