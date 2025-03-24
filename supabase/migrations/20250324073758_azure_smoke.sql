/*
  # Create users table for storing user profiles

  1. New Tables
    - `users`
      - `phone` (text, primary key) - User's phone number
      - `name` (text) - User's name
      - `forwarded_to` (text) - Number to forward calls to
      - `forwarding_status` (boolean) - Whether call forwarding is active
      - `assistant_prompt` (text) - AI assistant configuration
      - `sim_provider` (text) - User's SIM provider
      - `created_at` (timestamptz) - When the user was created
      - `updated_at` (timestamptz) - When the user was last updated

  2. Security
    - Enable RLS on users table
    - Add policies for authenticated users to read and update their own data
*/

CREATE TABLE IF NOT EXISTS users (
  phone text PRIMARY KEY,
  name text,
  forwarded_to text,
  forwarding_status boolean DEFAULT false,
  assistant_prompt text,
  sim_provider text,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

ALTER TABLE users ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can read own data"
  ON users
  FOR SELECT
  USING (auth.jwt() ->> 'phone' = phone);

CREATE POLICY "Users can update own data"
  ON users
  FOR UPDATE
  USING (auth.jwt() ->> 'phone' = phone);