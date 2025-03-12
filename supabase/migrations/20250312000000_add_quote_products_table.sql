-- Create a table to track products in quotes
CREATE TABLE
    quote_products (
        id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
        quote_id UUID REFERENCES quotes(id) ON DELETE CASCADE NOT NULL,
        product_id UUID REFERENCES products(id) ON DELETE CASCADE NOT NULL,
        quantity INTEGER NOT NULL DEFAULT 1,
        price DECIMAL(12, 2) NOT NULL,
        created_at TIMESTAMP WITH TIME ZONE DEFAULT now() NOT NULL,
        updated_at TIMESTAMP WITH TIME ZONE DEFAULT now() NOT NULL,
        UNIQUE(quote_id, product_id)
    );

-- Add RLS (Row Level Security) policies for the quote_products table
ALTER TABLE quote_products ENABLE ROW LEVEL SECURITY;

-- Add a trigger to auto-update the updated_at column
CREATE TRIGGER update_quote_products_modtime
BEFORE UPDATE ON quote_products
FOR EACH ROW
EXECUTE FUNCTION update_modified_column();

-- Create policy for users to select their own quote products
CREATE POLICY quote_products_select_policy ON quote_products 
FOR SELECT
USING (
  EXISTS (
    SELECT 1 FROM quotes WHERE quotes.id = quote_products.quote_id AND quotes.user_id = auth.uid()
  )
);

-- Create policy for users to insert quote products for their own quotes
CREATE POLICY quote_products_insert_policy ON quote_products 
FOR INSERT
WITH CHECK (
  EXISTS (
    SELECT 1 FROM quotes WHERE quotes.id = quote_products.quote_id AND quotes.user_id = auth.uid()
  )
);

-- Create policy for users to update quote products for their own quotes
CREATE POLICY quote_products_update_policy ON quote_products 
FOR UPDATE
USING (
  EXISTS (
    SELECT 1 FROM quotes WHERE quotes.id = quote_products.quote_id AND quotes.user_id = auth.uid()
  )
);

-- Create policy for users to delete quote products for their own quotes
CREATE POLICY quote_products_delete_policy ON quote_products
FOR DELETE
USING (
  EXISTS (
    SELECT 1 FROM quotes WHERE quotes.id = quote_products.quote_id AND quotes.user_id = auth.uid()
  )
);

-- Create special policy for public access to quote products
-- This allows anyone to view quote products for a specific quote without authentication
CREATE POLICY quote_products_public_select_policy ON quote_products
FOR SELECT
USING (true);