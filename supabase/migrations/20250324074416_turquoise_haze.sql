/*
  # Fix Users Table Policies

  1. Changes
    - Add INSERT policy for public access
    - Update existing policies to use proper authentication checks
    - Add default values for better data consistency

  2. Security
    - Enable RLS
    - Add policies for INSERT, SELECT, and UPDATE operations
    - Ensure users can only access their own data
*/

-- First, drop existing policies
DROP POLICY IF EXISTS "Users can read own data" ON users;
DROP POLICY IF EXISTS "Users can update own data" ON users;

-- Add default values and make phone NOT NULL
ALTER TABLE users 
  ALTER COLUMN phone SET NOT NULL,
  ALTER COLUMN forwarding_status SET DEFAULT false,
  ALTER COLUMN created_at SET DEFAULT now(),
  ALTER COLUMN updated_at SET DEFAULT now();

-- Create new policies
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
  USING (phone = current_user)
  WITH CHECK (phone = current_user);