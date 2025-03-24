/*
  # Update Users Table for Email Authentication

  1. Changes
    - Change primary key from phone to email
    - Add email column
    - Update RLS policies to use email

  2. Security
    - Enable RLS
    - Update policies for email-based authentication
*/

-- First, drop existing policies
DROP POLICY IF EXISTS "Enable insert for authenticated users" ON users;
DROP POLICY IF EXISTS "Enable select for users based on phone" ON users;
DROP POLICY IF EXISTS "Enable update for users based on phone" ON users;

-- Add email column and make it the primary key
ALTER TABLE users
  ADD COLUMN IF NOT EXISTS email text,
  DROP CONSTRAINT IF EXISTS users_pkey,
  ADD PRIMARY KEY (email);

-- Update policies for email-based authentication
CREATE POLICY "Enable insert for authenticated users"
  ON users
  FOR INSERT
  TO public
  WITH CHECK (auth.jwt() ->> 'email' = email);

CREATE POLICY "Enable select for users based on email"
  ON users
  FOR SELECT
  TO public
  USING (auth.jwt() ->> 'email' = email);

CREATE POLICY "Enable update for users based on email"
  ON users
  FOR UPDATE
  TO public
  USING (auth.jwt() ->> 'email' = email)
  WITH CHECK (auth.jwt() ->> 'email' = email);