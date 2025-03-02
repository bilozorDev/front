create table
    clients (
        id uuid primary key default uuid_generate_v4 (),
        name text not null,
        email text,
        phone text,
        address text,
        created_at timestamptz default now ()
    );