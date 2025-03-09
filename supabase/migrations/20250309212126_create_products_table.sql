-- Create the products table
CREATE TABLE
    products (
        id UUID PRIMARY KEY DEFAULT uuid_generate_v4 (),
        name TEXT NOT NULL,
        category TEXT,
        cost DECIMAL(10, 2),
        purchase_date DATE,
        vendor TEXT,
        price_to_client DECIMAL(10, 2),
        qty INTEGER DEFAULT 0,
        notes TEXT,
        sku TEXT,
        description TEXT,
        image_url TEXT,
        status TEXT DEFAULT 'active',
        min_stock_level INTEGER DEFAULT 0,
        unit_of_measure TEXT DEFAULT 'each',
        tax_rate DECIMAL(5, 2) DEFAULT 0,
        last_updated TIMESTAMPTZ,
        user_id UUID NOT NULL DEFAULT auth.uid (),
        created_at TIMESTAMPTZ DEFAULT now ()
    );

-- Create index on user_id for better query performance
CREATE INDEX idx_products_user_id ON products (user_id);

-- Create index on category for better filtering performance
CREATE INDEX idx_products_category ON products (category);

-- Create index on name for search performance
CREATE INDEX idx_products_name ON products (name);

-- Add comments to columns
COMMENT ON COLUMN products.user_id IS 'The UUID of the user who owns this product';

COMMENT ON COLUMN products.name IS 'Product name';

COMMENT ON COLUMN products.category IS 'Product category for organization';

COMMENT ON COLUMN products.cost IS 'Purchase cost of the product';

COMMENT ON COLUMN products.purchase_date IS 'Date when the product was purchased';

COMMENT ON COLUMN products.vendor IS 'Vendor/supplier of the product';

COMMENT ON COLUMN products.price_to_client IS 'Selling price to client';

COMMENT ON COLUMN products.qty IS 'Current inventory quantity';

COMMENT ON COLUMN products.notes IS 'Additional notes about the product';

COMMENT ON COLUMN products.sku IS 'Stock Keeping Unit - unique product identifier';

COMMENT ON COLUMN products.description IS 'Detailed product description';

COMMENT ON COLUMN products.image_url IS 'URL to product image';

COMMENT ON COLUMN products.status IS 'Product status (active, discontinued, out-of-stock)';

COMMENT ON COLUMN products.min_stock_level IS 'Minimum stock level before reorder';

COMMENT ON COLUMN products.unit_of_measure IS 'Unit of measurement (each, kg, liter, etc.)';

COMMENT ON COLUMN products.tax_rate IS 'Tax rate applicable to this product';

COMMENT ON COLUMN products.last_updated IS 'Timestamp of last product update';

-- Enable Row Level Security on the products table
ALTER TABLE products ENABLE ROW LEVEL SECURITY;

-- Create a policy that allows users to select only their own products
CREATE POLICY "Users can view their own products" ON products FOR
SELECT
    USING (auth.uid () = user_id);

-- Create a policy that allows users to insert their own products
CREATE POLICY "Users can insert their own products" ON products FOR INSERT
WITH
    CHECK (auth.uid () = user_id);

-- Create a policy that allows users to update only their own products
CREATE POLICY "Users can update their own products" ON products FOR
UPDATE USING (auth.uid () = user_id);

-- Create a policy that allows users to delete only their own products
CREATE POLICY "Users can delete their own products" ON products FOR DELETE USING (auth.uid () = user_id);