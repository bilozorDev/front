CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

CREATE TABLE
    quotes (
        id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
        quote_number VARCHAR(20) UNIQUE NOT NULL DEFAULT 'QT-' || substring(md5(random()::text) from 1 for 10),
        user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
        status VARCHAR(20) NOT NULL DEFAULT 'draft',
        issue_date DATE DEFAULT CURRENT_DATE NOT NULL,
        expiry_date DATE,
        due_date DATE,
        total_amount DECIMAL(12, 2) NOT NULL,
        notes TEXT,
        created_at TIMESTAMP WITH TIME ZONE DEFAULT now() NOT NULL,
        updated_at TIMESTAMP WITH TIME ZONE DEFAULT now() NOT NULL
    );

-- Add trigger to automatically update the updated_at column
CREATE OR REPLACE FUNCTION update_modified_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = now();
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER update_quotes_modtime
BEFORE UPDATE ON quotes
FOR EACH ROW
EXECUTE FUNCTION update_modified_column();

-- Add RLS (Row Level Security) policies
ALTER TABLE quotes ENABLE ROW LEVEL SECURITY;

-- Create policy for users to select their own quotes
CREATE POLICY quotes_select_policy ON quotes FOR
SELECT
    USING (auth.uid() = user_id);

-- Create policy for users to insert their own quotes
CREATE POLICY quotes_insert_policy ON quotes FOR INSERT
WITH
    CHECK (auth.uid() = user_id);

-- Create policy for users to update their own quotes
CREATE POLICY quotes_update_policy ON quotes FOR
UPDATE USING (auth.uid() = user_id);

-- Create policy for users to delete their own quotes
CREATE POLICY quotes_delete_policy ON quotes FOR DELETE USING (auth.uid() = user_id);