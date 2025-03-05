INSERT INTO
    auth.users (
        instance_id,
        id,
        aud,
        role,
        email,
        encrypted_password,
        email_confirmed_at,
        invited_at,
        confirmation_token,
        confirmation_sent_at,
        recovery_token,
        recovery_sent_at,
        email_change_token_new,
        email_change,
        email_change_sent_at,
        last_sign_in_at,
        raw_app_meta_data,
        raw_user_meta_data,
        is_super_admin,
        created_at,
        updated_at,
        phone,
        phone_confirmed_at,
        phone_change,
        phone_change_token,
        phone_change_sent_at,
        email_change_token_current,
        email_change_confirm_status,
        banned_until,
        reauthentication_token,
        reauthentication_sent_at,
        is_sso_user,
        deleted_at,
        is_anonymous
    )
VALUES
    (
        '00000000-0000-0000-0000-000000000000',
        'a1b2c3d4-e5f6-47a7-b8c9-1a2b3c4d5e6f',
        'authenticated',
        'authenticated',
        'john@example.com',
        '$2a$10$yip8b40IcUXNgU/Kf5GbYuWZxgDhw.x.by29lWQzIj0Ir6ljg6O/C',
        '2025-03-03 05:15:14.005697+00',
        NULL,
        '',
        NULL,
        '',
        NULL,
        '',
        '',
        NULL,
        '2025-03-03 05:15:14.007722+00',
        '{"provider": "email", "providers": ["email"]}',
        '{"sub": "a1b2c3d4-e5f6-47a7-b8c9-1a2b3c4d5e6f", "email": "john@example.com", "email_verified": true, "phone_verified": false}',
        NULL,
        '2025-03-03 05:15:13.998537+00',
        '2025-03-03 05:15:14.012299+00',
        NULL,
        NULL,
        '',
        '',
        NULL,
        '',
        0,
        NULL,
        '',
        NULL,
        false,
        NULL,
        false
    ),
    (
        '00000000-0000-0000-0000-000000000000',
        'b2c3d4e5-f6a7-48b8-c9d0-2a3b4c5d6e7f',
        'authenticated',
        'authenticated',
        'lisa@example.com',
        '$2a$10$yip8b40IcUXNgU/Kf5GbYuWZxgDhw.x.by29lWQzIj0Ir6ljg6O/C',
        '2025-03-03 05:25:14.005697+00',
        NULL,
        '',
        NULL,
        '',
        NULL,
        '',
        '',
        NULL,
        '2025-03-03 05:25:14.007722+00',
        '{"provider": "email", "providers": ["email"]}',
        '{"sub": "b2c3d4e5-f6a7-48b8-c9d0-2a3b4c5d6e7f", "email": "lisa@example.com", "email_verified": true, "phone_verified": false}',
        NULL,
        '2025-03-03 05:25:13.998537+00',
        '2025-03-03 05:25:14.012299+00',
        NULL,
        NULL,
        '',
        '',
        NULL,
        '',
        0,
        NULL,
        '',
        NULL,
        false,
        NULL,
        false
    ),
    (
        '00000000-0000-0000-0000-000000000000',
        'c3d4e5f6-a7b8-49c9-d0e1-3a4b5c6d7e8f',
        'authenticated',
        'authenticated',
        'mark@example.com',
        '$2a$10$yip8b40IcUXNgU/Kf5GbYuWZxgDhw.x.by29lWQzIj0Ir6ljg6O/C',
        '2025-03-03 05:35:14.005697+00',
        NULL,
        '',
        NULL,
        '',
        NULL,
        '',
        '',
        NULL,
        '2025-03-03 05:35:14.007722+00',
        '{"provider": "email", "providers": ["email"]}',
        '{"sub": "c3d4e5f6-a7b8-49c9-d0e1-3a4b5c6d7e8f", "email": "mark@example.com", "email_verified": true, "phone_verified": false}',
        NULL,
        '2025-03-03 05:35:13.998537+00',
        '2025-03-03 05:35:14.012299+00',
        NULL,
        NULL,
        '',
        '',
        NULL,
        '',
        0,
        NULL,
        '',
        NULL,
        false,
        NULL,
        false
    );

-- Add identities for new users
INSERT INTO
    auth.identities (
        provider_id,
        user_id,
        identity_data,
        provider,
        last_sign_in_at,
        created_at,
        updated_at,
        id
    )
VALUES
    (
        'a1b2c3d4-e5f6-47a7-b8c9-1a2b3c4d5e6f',
        'a1b2c3d4-e5f6-47a7-b8c9-1a2b3c4d5e6f',
        '{"sub": "a1b2c3d4-e5f6-47a7-b8c9-1a2b3c4d5e6f", "email": "john@example.com", "email_verified": false, "phone_verified": false}',
        'email',
        '2025-03-03 05:15:14.003966+00',
        '2025-03-03 05:15:14.003985+00',
        '2025-03-03 05:15:14.003985+00',
        'd4e5f6a7-b8c9-4d0e-1f2a-3b4c5d6e7f8a'
    ),
    (
        'b2c3d4e5-f6a7-48b8-c9d0-2a3b4c5d6e7f',
        'b2c3d4e5-f6a7-48b8-c9d0-2a3b4c5d6e7f',
        '{"sub": "b2c3d4e5-f6a7-48b8-c9d0-2a3b4c5d6e7f", "email": "lisa@example.com", "email_verified": false, "phone_verified": false}',
        'email',
        '2025-03-03 05:25:14.003966+00',
        '2025-03-03 05:25:14.003985+00',
        '2025-03-03 05:25:14.003985+00',
        'e5f6a7b8-c9d0-4e1f-2a3b-4c5d6e7f8a9b'
    ),
    (
        'c3d4e5f6-a7b8-49c9-d0e1-3a4b5c6d7e8f',
        'c3d4e5f6-a7b8-49c9-d0e1-3a4b5c6d7e8f',
        '{"sub": "c3d4e5f6-a7b8-49c9-d0e1-3a4b5c6d7e8f", "email": "mark@example.com", "email_verified": false, "phone_verified": false}',
        'email',
        '2025-03-03 05:35:14.003966+00',
        '2025-03-03 05:35:14.003985+00',
        '2025-03-03 05:35:14.003985+00',
        'f6a7b8c9-d0e1-4f2a-3b4c-5d6e7f8a9b0c'
    );

-- Add clients for John (with distinguished naming)
INSERT INTO
    clients (
        id,
        user_id,
        name,
        email,
        phone,
        address,
        created_at
    )
VALUES
    (
        uuid_generate_v4 (),
        'a1b2c3d4-e5f6-47a7-b8c9-1a2b3c4d5e6f',
        'John_Client1',
        'contact@johnclient1.com',
        '555-111-1001',
        '101 First Street, Atlanta, GA 30301',
        now () - interval '28 days'
    ),
    (
        uuid_generate_v4 (),
        'a1b2c3d4-e5f6-47a7-b8c9-1a2b3c4d5e6f',
        'John_Client2',
        'info@johnclient2.com',
        '555-111-1002',
        '102 Second Avenue, Miami, FL 33101',
        now () - interval '21 days'
    ),
    (
        uuid_generate_v4 (),
        'a1b2c3d4-e5f6-47a7-b8c9-1a2b3c4d5e6f',
        'John_Client3',
        'support@johnclient3.com',
        '555-111-1003',
        '103 Third Boulevard, Dallas, TX 75201',
        now () - interval '14 days'
    );

-- Add clients for Lisa
INSERT INTO
    clients (
        id,
        user_id,
        name,
        email,
        phone,
        address,
        created_at
    )
VALUES
    (
        uuid_generate_v4 (),
        'b2c3d4e5-f6a7-48b8-c9d0-2a3b4c5d6e7f',
        'Lisa_Client1',
        'contact@lisaclient1.com',
        '555-222-2001',
        '201 First Plaza, Portland, OR 97201',
        now () - interval '30 days'
    ),
    (
        uuid_generate_v4 (),
        'b2c3d4e5-f6a7-48b8-c9d0-2a3b4c5d6e7f',
        'Lisa_Client2',
        'info@lisaclient2.com',
        '555-222-2002',
        '202 Second Lane, Las Vegas, NV 89101',
        now () - interval '25 days'
    ),
    (
        uuid_generate_v4 (),
        'b2c3d4e5-f6a7-48b8-c9d0-2a3b4c5d6e7f',
        'Lisa_Client3',
        'support@lisaclient3.com',
        '555-222-2003',
        '203 Third Court, Nashville, TN 37201',
        now () - interval '18 days'
    ),
    (
        uuid_generate_v4 (),
        'b2c3d4e5-f6a7-48b8-c9d0-2a3b4c5d6e7f',
        'Lisa_Client4',
        'hello@lisaclient4.com',
        '555-222-2004',
        '204 Fourth Path, Philadelphia, PA 19101',
        now () - interval '12 days'
    );

-- Add clients for Mark
INSERT INTO
    clients (
        id,
        user_id,
        name,
        email,
        phone,
        address,
        created_at
    )
VALUES
    (
        uuid_generate_v4 (),
        'c3d4e5f6-a7b8-49c9-d0e1-3a4b5c6d7e8f',
        'Mark_Client1',
        'contact@markclient1.com',
        '555-333-3001',
        '301 First View, Indianapolis, IN 46201',
        now () - interval '29 days'
    ),
    (
        uuid_generate_v4 (),
        'c3d4e5f6-a7b8-49c9-d0e1-3a4b5c6d7e8f',
        'Mark_Client2',
        'info@markclient2.com',
        '555-333-3002',
        '302 Second Way, Columbus, OH 43201',
        now () - interval '22 days'
    ),
    (
        uuid_generate_v4 (),
        'c3d4e5f6-a7b8-49c9-d0e1-3a4b5c6d7e8f',
        'Mark_Client3',
        'support@markclient3.com',
        '555-333-3003',
        '303 Third Pass, Detroit, MI 48201',
        now () - interval '17 days'
    ),
    (
        uuid_generate_v4 (),
        'c3d4e5f6-a7b8-49c9-d0e1-3a4b5c6d7e8f',
        'Mark_Client4',
        'info@markclient4.com',
        '555-333-3004',
        '304 Fourth Lane, Boston, MA 02108',
        now () - interval '10 days'
    ),
    (
        uuid_generate_v4 (),
        'c3d4e5f6-a7b8-49c9-d0e1-3a4b5c6d7e8f',
        'Mark_Client5',
        'contact@markclient5.com',
        '555-333-3005',
        '305 Fifth Street, San Francisco, CA 94105',
        now () - interval '5 days'
    );

-- Add quotes for new users
INSERT INTO
    quotes (
        id,
        user_id,
        due_date,
        total_amount,
        notes,
        created_at
    )
VALUES
    -- Quotes for John
    (
        uuid_generate_v4 (),
        'a1b2c3d4-e5f6-47a7-b8c9-1a2b3c4d5e6f',
        now () + interval '25 days',
        4200.50,
        'Social media marketing campaign for John_Client1',
        now () - interval '22 days'
    ),
    (
        uuid_generate_v4 (),
        'a1b2c3d4-e5f6-47a7-b8c9-1a2b3c4d5e6f',
        now () + interval '40 days',
        7800.25,
        'Web development for John_Client2 e-commerce site',
        now () - interval '18 days'
    ),
    -- Quotes for Lisa
    (
        uuid_generate_v4 (),
        'b2c3d4e5-f6a7-48b8-c9d0-2a3b4c5d6e7f',
        now () + interval '15 days',
        3150.75,
        'SEO optimization package for Lisa_Client1',
        now () - interval '24 days'
    ),
    (
        uuid_generate_v4 (),
        'b2c3d4e5-f6a7-48b8-c9d0-2a3b4c5d6e7f',
        now () + interval '35 days',
        6500.00,
        'Custom software development for Lisa_Client3',
        now () - interval '16 days'
    ),
    -- Quotes for Mark
    (
        uuid_generate_v4 (),
        'c3d4e5f6-a7b8-49c9-d0e1-3a4b5c6d7e8f',
        now () + interval '20 days',
        2850.25,
        'Content creation for Mark_Client2 blog series',
        now () - interval '20 days'
    ),
    (
        uuid_generate_v4 (),
        'c3d4e5f6-a7b8-49c9-d0e1-3a4b5c6d7e8f',
        now () + interval '50 days',
        9300.00,
        'Mobile app development for Mark_Client1',
        now () - interval '15 days'
    ),
    (
        uuid_generate_v4 (),
        'c3d4e5f6-a7b8-49c9-d0e1-3a4b5c6d7e8f',
        now () + interval '30 days',
        5250.75,
        'Brand identity redesign for Mark_Client4',
        now () - interval '8 days'
    );