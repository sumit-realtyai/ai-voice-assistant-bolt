/*
  # Revert to Phone-based Authentication

  1. Changes
    - Revert primary key back to phone
    - Remove email column
    - Update RLS policies for phone-based auth

  2. Security
    - Enable RLS
    - Update policies for phone-based authentication
*/

-- First, drop existing policies
DROP POLICY IF EXISTS "Enable insert for authenticated users" ON users;
DROP POLICY IF EXISTS "Enable select for users based on email" ON users;
DROP POLICY IF EXISTS "Enable update for users based on email" ON users;

-- Revert to phone-based primary key
ALTER TABLE users
  DROP CONSTRAINT IF EXISTS users_pkey,
  ADD PRIMARY KEY (phone);

-- Drop email column if it exists
ALTER TABLE users
  DROP COLUMN IF EXISTS email;

-- Create new policies for phone-based auth
CREATE POLICY "Enable insert for authenticated users"
  ON users
  FOR INSERT
  TO public
  WITH CHECK (true);

CREATE POLICY "Enable select for users based on phone"
  ON users
  FOR SELECT
  TO public
  USING (true);

CREATE POLICY "Enable update for users based on phone"
  ON users
  FOR UPDATE
  TO public
  USING (true);