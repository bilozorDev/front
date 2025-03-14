-- Product categories reference:
-- 'computers and laptops' = '426e7704-cf2d-4321-b49a-5bd154411f3e'
-- 'peripherals' = '11974528-03d1-4040-ac95-d2c134622334'
-- 'networking' = '69f0b99f-fde4-486f-8d4a-be816dd02621'
-- 'services' = 'b734813a-af22-47e6-b105-8fdf1b4d1f80'
-- 'other' = '362c12ad-fe97-42cc-8bb0-89fe80311c73'
-- Add IT products for John
INSERT INTO
    products (
        id,
        user_id,
        name,
        category_id,
        cost,
        purchase_date,
        vendor,
        price_to_client,
        qty,
        notes,
        sku,
        description,
        status,
        created_at
    )
VALUES
    (
        uuid_generate_v4 (),
        'a1b2c3d4-e5f6-47a7-b8c9-1a2b3c4d5e6f',
        'Lenovo ThinkPad X1 Carbon',
        '426e7704-cf2d-4321-b49a-5bd154411f3e', -- Computers and laptops
        999.00,
        now () - interval '60 days',
        'Lenovo Group Ltd.',
        1499.99,
        15,
        'Popular business laptop model',
        'JHN-LAP-001',
        'Intel Core i7, 16GB RAM, 512GB SSD, 14" FHD display, Windows 11 Pro',
        'active',
        now () - interval '59 days'
    ),
    (
        uuid_generate_v4 (),
        'a1b2c3d4-e5f6-47a7-b8c9-1a2b3c4d5e6f',
        'Microsoft 365 Business Premium',
        '362c12ad-fe97-42cc-8bb0-89fe80311c73', -- Other
        16.50,
        now () - interval '45 days',
        'Microsoft Corporation',
        24.99,
        50,
        'Annual subscription per user',
        'JHN-SOFT-002',
        'Microsoft 365 apps with advanced security and device management',
        'active',
        now () - interval '44 days'
    ),
    (
        uuid_generate_v4 (),
        'a1b2c3d4-e5f6-47a7-b8c9-1a2b3c4d5e6f',
        'Logitech MX Master 3 Mouse',
        '11974528-03d1-4040-ac95-d2c134622334', -- Peripherals
        69.99,
        now () - interval '30 days',
        'Logitech',
        99.99,
        100,
        'Highly requested accessory',
        'JHN-PER-003',
        'Wireless performance mouse with customizable buttons and advanced scrolling',
        'active',
        now () - interval '29 days'
    );

-- Add IT products for Lisa
INSERT INTO
    products (
        id,
        user_id,
        name,
        category_id,
        cost,
        purchase_date,
        vendor,
        price_to_client,
        qty,
        notes,
        sku,
        description,
        status,
        min_stock_level,
        created_at
    )
VALUES
    (
        uuid_generate_v4 (),
        'b2c3d4e5-f6a7-48b8-c9d0-2a3b4c5d6e7f',
        'Dell XPS 15 Workstation',
        '426e7704-cf2d-4321-b49a-5bd154411f3e', -- Computers and laptops
        1350.00,
        now () - interval '90 days',
        'Dell Inc.',
        1899.99,
        5,
        'Premium performance laptop',
        'LSA-LAP-001',
        'Intel Core i9, 32GB RAM, 1TB SSD, NVIDIA RTX 3050, 15.6" 4K touch display',
        'active',
        2,
        now () - interval '89 days'
    ),
    (
        uuid_generate_v4 (),
        'b2c3d4e5-f6a7-48b8-c9d0-2a3b4c5d6e7f',
        'HP EliteDesk 800 G6',
        '426e7704-cf2d-4321-b49a-5bd154411f3e', -- Computers and laptops
        650.00,
        now () - interval '85 days',
        'HP Inc.',
        999.99,
        3,
        'Small form factor desktop',
        'LSA-DSK-002',
        'Intel Core i5, 16GB RAM, 512GB SSD, Windows 11 Pro, small form factor',
        'active',
        1,
        now () - interval '84 days'
    ),
    (
        uuid_generate_v4 (),
        'b2c3d4e5-f6a7-48b8-c9d0-2a3b4c5d6e7f',
        'LG 27" UltraFine 4K Monitor',
        '11974528-03d1-4040-ac95-d2c134622334', -- Peripherals
        399.00,
        now () - interval '70 days',
        'LG Electronics',
        549.99,
        25,
        'High-resolution displays',
        'LSA-MON-003',
        '27-inch 4K UHD IPS monitor with USB-C connectivity and HDR10',
        'active',
        5,
        now () - interval '69 days'
    ),
    (
        uuid_generate_v4 (),
        'b2c3d4e5-f6a7-48b8-c9d0-2a3b4c5d6e7f',
        'Jabra Evolve 75 Headset',
        '11974528-03d1-4040-ac95-d2c134622334', -- Peripherals
        179.00,
        now () - interval '60 days',
        'Jabra',
        249.99,
        12,
        'Popular for remote workers',
        'LSA-PER-004',
        'Wireless noise-canceling headset with microphone, UC certified',
        'active',
        3,
        now () - interval '59 days'
    ),
    (
        uuid_generate_v4 (),
        'b2c3d4e5-f6a7-48b8-c9d0-2a3b4c5d6e7f',
        'NetApp FAS2750 Storage Array',
        '362c12ad-fe97-42cc-8bb0-89fe80311c73', -- Other
        7500.00,
        now () - interval '40 days',
        'NetApp Inc.',
        11999.99,
        2,
        'Enterprise storage solution',
        'LSA-STR-005',
        'Hybrid flash storage array, 24 drive bays, 10GbE networking',
        'low stock',
        2,
        now () - interval '39 days'
    );

-- Add IT products for Mark
INSERT INTO
    products (
        id,
        user_id,
        name,
        category_id,
        cost,
        purchase_date,
        vendor,
        price_to_client,
        qty,
        notes,
        sku,
        description,
        status,
        tax_rate,
        created_at
    )
VALUES
    (
        uuid_generate_v4 (),
        'c3d4e5f6-a7b8-49c9-d0e1-3a4b5c6d7e8f',
        'Managed IT Support - Standard',
        'b734813a-af22-47e6-b105-8fdf1b4d1f80', -- Services
        0.00,
        now () - interval '30 days',
        'Internal',
        799.99,
        999,
        'Monthly service contract',
        'MRK-ITSV-001',
        'Remote monitoring, helpdesk support, patch management for up to 20 devices',
        'active',
        8.25,
        now () - interval '29 days'
    ),
    (
        uuid_generate_v4 (),
        'c3d4e5f6-a7b8-49c9-d0e1-3a4b5c6d7e8f',
        'Security Audit & Assessment',
        'b734813a-af22-47e6-b105-8fdf1b4d1f80', -- Services
        0.00,
        now () - interval '30 days',
        'Internal',
        2500.00,
        999,
        'One-time service',
        'MRK-ITSV-002',
        'Comprehensive security audit with vulnerability assessment and remediation plan',
        'active',
        8.25,
        now () - interval '29 days'
    ),
    (
        uuid_generate_v4 (),
        'c3d4e5f6-a7b8-49c9-d0e1-3a4b5c6d7e8f',
        'Cisco Meraki MX68 Firewall',
        '69f0b99f-fde4-486f-8d4a-be816dd02621', -- Networking
        550.00,
        now () - interval '45 days',
        'Cisco Systems',
        899.99,
        8,
        'Requires license subscription',
        'MRK-SEC-003',
        'Cloud-managed security appliance with advanced security, SD-WAN capabilities',
        'active',
        8.25,
        now () - interval '44 days'
    ),
    (
        uuid_generate_v4 (),
        'c3d4e5f6-a7b8-49c9-d0e1-3a4b5c6d7e8f',
        'Dell UltraSharp 32" 4K Monitor',
        '11974528-03d1-4040-ac95-d2c134622334', -- Peripherals
        649.00,
        now () - interval '40 days',
        'Dell Inc.',
        899.99,
        15,
        'Premium display for professionals',
        'MRK-MON-004',
        '32-inch 4K UHD monitor with wide color gamut, USB-C hub, and KVM switch',
        'active',
        8.25,
        now () - interval '39 days'
    ),
    (
        uuid_generate_v4 (),
        'c3d4e5f6-a7b8-49c9-d0e1-3a4b5c6d7e8f',
        'Acronis Cyber Protect Cloud',
        '362c12ad-fe97-42cc-8bb0-89fe80311c73', -- Other
        10.99,
        now () - interval '25 days',
        'Acronis International',
        19.99,
        30,
        'Per workload monthly subscription',
        'MRK-SOFT-005',
        'Integrated backup, anti-malware, and protection management solution',
        'active',
        8.25,
        now () - interval '24 days'
    ),
    (
        uuid_generate_v4 (),
        'c3d4e5f6-a7b8-49c9-d0e1-3a4b5c6d7e8f',
        'HP Z4 G4 Workstation',
        '426e7704-cf2d-4321-b49a-5bd154411f3e', -- Computers and laptops
        1899.00,
        now () - interval '20 days',
        'HP Inc.',
        2799.99,
        5,
        'High-performance workstation',
        'MRK-WKS-006',
        'Intel Xeon W processor, 64GB RAM, 1TB SSD + 2TB HDD, NVIDIA Quadro RTX 4000',
        'active',
        8.25,
        now () - interval '19 days'
    ),
    (
        uuid_generate_v4 (),
        'c3d4e5f6-a7b8-49c9-d0e1-3a4b5c6d7e8f',
        'Ubiquiti UniFi Switch Pro 24 PoE',
        '69f0b99f-fde4-486f-8d4a-be816dd02621', -- Networking
        699.00,
        now () - interval '15 days',
        'Ubiquiti Inc.',
        999.99,
        4,
        'Enterprise-grade network switch',
        'MRK-NET-007',
        '24-port Gigabit PoE+ managed switch with SFP+ ports, Layer 3 features',
        'active',
        8.25,
        now () - interval '14 days'
    );