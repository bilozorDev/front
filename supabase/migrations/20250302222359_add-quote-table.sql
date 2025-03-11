CREATE TABLE
    quotes (
        id UUID PRIMARY KEY DEFAULT uuid_generate_v4 (),
        user_id UUID NOT NULL REFERENCES auth.users (id) ON DELETE CASCADE,
        due_date DATE,
        total_amount DECIMAL(12, 2) NOT NULL,
        notes TEXT,
        created_at TIMESTAMP
        WITH
            TIME ZONE DEFAULT now () NOT NULL
    );

-- Add RLS (Row Level Security) policies
ALTER TABLE quotes ENABLE ROW LEVEL SECURITY;

-- Create policy for users to select their own quotes
CREATE POLICY quotes_select_policy ON quotes FOR
SELECT
    USING (auth.uid () = user_id);

-- Create policy for users to insert their own quotes
CREATE POLICY quotes_insert_policy ON quotes FOR INSERT
WITH
    CHECK (auth.uid () = user_id);

-- Create policy for users to update their own quotes
CREATE POLICY quotes_update_policy ON quotes FOR
UPDATE USING (auth.uid () = user_id);

-- Create policy for users to delete their own quotes
CREATE POLICY quotes_delete_policy ON quotes FOR DELETE USING (auth.uid () = user_id);