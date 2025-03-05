-- Seed file for creating a test user and sample data under the user
-- alex@alex.com 
-- password: password123
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
    '45b57e11-89dc-49c6-a794-e83ea5d1e7d1',
    'authenticated',
    'authenticated',
    'alex@alex.com',
    '$2a$10$yip8b40IcUXNgU/Kf5GbYuWZxgDhw.x.by29lWQzIj0Ir6ljg6O/C',
    '2025-03-03 03:57:14.005697+00',
    NULL,
    '',
    NULL,
    '',
    NULL,
    '',
    '',
    NULL,
    '2025-03-03 03:57:14.007722+00',
    '{"provider": "email", "providers": ["email"]}',
    '{"sub": "45b57e11-89dc-49c6-a794-e83ea5d1e7d1", "email": "alex@alex.com", "email_verified": true, "phone_verified": false}',
    NULL,
    '2025-03-03 03:57:13.998537+00',
    '2025-03-03 03:57:14.012299+00',
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

--
-- Data for Name: identities; Type: TABLE DATA; Schema: auth; Owner: supabase_auth_admin
--
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
    '45b57e11-89dc-49c6-a794-e83ea5d1e7d1',
    '45b57e11-89dc-49c6-a794-e83ea5d1e7d1',
    '{"sub": "45b57e11-89dc-49c6-a794-e83ea5d1e7d1", "email": "alex@alex.com", "email_verified": false, "phone_verified": false}',
    'email',
    '2025-03-03 03:57:14.003966+00',
    '2025-03-03 03:57:14.003985+00',
    '2025-03-03 03:57:14.003985+00',
    '69718cef-dbf1-4bd2-a7c2-98e8c12f4dbe'
  );

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
    '45b57e11-89dc-49c6-a794-e83ea5d1e7d1',
    'Acme Corporation',
    'contact@acme.com',
    '555-123-4567',
    '123 Business Ave, Suite 100, New York, NY 10001',
    now () - interval '30 days'
  ),
  (
    uuid_generate_v4 (),
    '45b57e11-89dc-49c6-a794-e83ea5d1e7d1',
    'Tech Innovations',
    'info@techinnovations.com',
    '555-987-6543',
    '456 Technology Blvd, San Francisco, CA 94105',
    now () - interval '25 days'
  ),
  (
    uuid_generate_v4 (),
    '45b57e11-89dc-49c6-a794-e83ea5d1e7d1',
    'Global Solutions',
    'support@globalsolutions.com',
    '555-456-7890',
    '789 Enterprise St, Chicago, IL 60601',
    now () - interval '20 days'
  ),
  (
    uuid_generate_v4 (),
    '45b57e11-89dc-49c6-a794-e83ea5d1e7d1',
    'Digital Dynamics',
    'hello@digitaldynamics.com',
    '555-789-0123',
    '321 Digital Drive, Austin, TX 78701',
    now () - interval '15 days'
  ),
  (
    uuid_generate_v4 (),
    '45b57e11-89dc-49c6-a794-e83ea5d1e7d1',
    'Future Systems',
    'info@futuresystems.com',
    '555-321-6547',
    '555 Innovation Way, Seattle, WA 98101',
    now () - interval '10 days'
  ),
  (
    uuid_generate_v4 (),
    '45b57e11-89dc-49c6-a794-e83ea5d1e7d1',
    'Bright Ideas',
    'sales@brightideas.net',
    '555-234-5678',
    '678 Creative Lane, Boston, MA 02110',
    now () - interval '8 days'
  ),
  (
    uuid_generate_v4 (),
    '45b57e11-89dc-49c6-a794-e83ea5d1e7d1',
    'Summit Enterprises',
    'info@summitenterprises.org',
    '555-876-5432',
    '890 Summit Boulevard, Denver, CO 80202',
    now () - interval '5 days'
  );

-- Generate random quote data for the user
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
  (
    uuid_generate_v4 (),
    '45b57e11-89dc-49c6-a794-e83ea5d1e7d1',
    now () + interval '30 days',
    5000.00,
    'Website redesign project with SEO optimization',
    now () - interval '25 days'
  ),
  (
    uuid_generate_v4 (),
    '45b57e11-89dc-49c6-a794-e83ea5d1e7d1',
    now () + interval '45 days',
    8500.75,
    'Mobile app development for Android and iOS',
    now () - interval '20 days'
  ),
  (
    uuid_generate_v4 (),
    '45b57e11-89dc-49c6-a794-e83ea5d1e7d1',
    now () + interval '15 days',
    1200.50,
    'Monthly maintenance package with 24/7 support',
    now () - interval '15 days'
  ),
  (
    uuid_generate_v4 (),
    '45b57e11-89dc-49c6-a794-e83ea5d1e7d1',
    now () + interval '60 days',
    12750.25,
    'E-commerce platform with payment gateway integration',
    now () - interval '10 days'
  ),
  (
    uuid_generate_v4 (),
    '45b57e11-89dc-49c6-a794-e83ea5d1e7d1',
    now () + interval '20 days',
    3600.00,
    'Digital marketing campaign for Q3',
    now () - interval '5 days'
  ),
  (
    uuid_generate_v4 (),
    '45b57e11-89dc-49c6-a794-e83ea5d1e7d1',
    now () + interval '7 days',
    950.00,
    'Logo design and brand identity package',
    now () - interval '2 days'
  ),
  (
    uuid_generate_v4 (),
    '45b57e11-89dc-49c6-a794-e83ea5d1e7d1',
    now () + interval '90 days',
    22500.00,
    'Enterprise CRM integration project',
    now () - interval '1 day'
  ),
  (
    uuid_generate_v4 (),
    '45b57e11-89dc-49c6-a794-e83ea5d1e7d1',
    now () + interval '10 days',
    750.00,
    'Content creation for blog series (5 articles)',
    now ()
  );