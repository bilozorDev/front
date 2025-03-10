-- Create the product_category table
CREATE TABLE
    IF NOT EXISTS "public"."product_category" (
        "id" UUID PRIMARY KEY,
        "created_at" TIMESTAMP
        WITH
            TIME ZONE DEFAULT NOW (),
            "name" VARCHAR(255) NOT NULL UNIQUE,
            "slug" VARCHAR(255) NOT NULL UNIQUE
    );

-- Insert the product categories with specific UUIDs
INSERT INTO
    "public"."product_category" ("id", "created_at", "name", "slug")
VALUES
    (
        '426e7704-cf2d-4321-b49a-5bd154411f3e',
        NOW (),
        'computers and laptops',
        'computers-and-laptops'
    ),
    (
        '11974528-03d1-4040-ac95-d2c134622334',
        NOW (),
        'peripherals',
        'peripherals'
    ),
    (
        '69f0b99f-fde4-486f-8d4a-be816dd02621',
        NOW (),
        'networking',
        'networking'
    ),
    (
        'b734813a-af22-47e6-b105-8fdf1b4d1f80',
        NOW (),
        'services',
        'services'
    ),
    (
        '362c12ad-fe97-42cc-8bb0-89fe80311c73',
        NOW (),
        'other',
        'other'
    );

-- Create or modify the products table with the category_id column
CREATE TABLE
    IF NOT EXISTS products (
        id UUID PRIMARY KEY DEFAULT uuid_generate_v4 (),
        name TEXT NOT NULL,
        category_id UUID NOT NULL REFERENCES "public"."product_category" ("id"),
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

-- Create indexes for better performance
CREATE INDEX IF NOT EXISTS idx_products_user_id ON products (user_id);

CREATE INDEX IF NOT EXISTS idx_products_category_id ON products (category_id);

CREATE INDEX IF NOT EXISTS idx_products_name ON products (name);

-- Enable Row Level Security on the products table
ALTER TABLE products ENABLE ROW LEVEL SECURITY;

-- Create RLS policies
CREATE POLICY "Users can view their own products" ON products FOR
SELECT
    USING (auth.uid () = user_id);

CREATE POLICY "Users can insert their own products" ON products FOR INSERT
WITH
    CHECK (auth.uid () = user_id);

CREATE POLICY "Users can update their own products" ON products FOR
UPDATE USING (auth.uid () = user_id);

CREATE POLICY "Users can delete their own products" ON products FOR DELETE USING (auth.uid () = user_id);