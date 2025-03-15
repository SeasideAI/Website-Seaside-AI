/*
  # Create contact submissions table

  1. New Tables
    - `contact_submissions`
      - `id` (uuid, primary key)
      - `created_at` (timestamp with timezone)
      - `name` (text)
      - `email` (text)
      - `service` (text)
      - `company_name` (text)
      - `problems` (text)
      - `additional_info` (text, nullable)

  2. Security
    - Enable RLS on `contact_submissions` table
    - Add policy for inserting new submissions
    - Add policy for admins to read all submissions
*/

CREATE TABLE IF NOT EXISTS contact_submissions (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  created_at timestamptz DEFAULT now(),
  name text NOT NULL,
  email text NOT NULL,
  service text NOT NULL,
  company_name text NOT NULL,
  problems text NOT NULL,
  additional_info text,
  
  -- Add constraint to validate service type
  CONSTRAINT valid_service CHECK (
    service IN ('AI Chat Agent', 'AI Phone Agent', 'AI Strategic Consultancy', 'Workflow Automation')
  )
);

-- Enable RLS
ALTER TABLE contact_submissions ENABLE ROW LEVEL SECURITY;

-- Allow anyone to insert (but they can't read their own submissions)
CREATE POLICY "Allow public form submissions" 
  ON contact_submissions
  FOR INSERT
  TO public
  WITH CHECK (true);

-- Only allow authenticated users with admin role to read submissions
CREATE POLICY "Allow admins to read submissions"
  ON contact_submissions
  FOR SELECT
  TO authenticated
  USING (auth.jwt() ->> 'role' = 'admin');