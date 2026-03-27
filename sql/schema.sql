-- Professional Association Website Database Schema
-- This schema creates all required tables for the association website

-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- =====================================================
-- CONTACT SUBMISSIONS TABLE
-- Stores all contact form submissions
-- =====================================================
CREATE TABLE IF NOT EXISTS contact_submissions (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name TEXT NOT NULL,
  email TEXT NOT NULL,
  subject TEXT NOT NULL,
  message TEXT NOT NULL,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Add index for faster queries
CREATE INDEX IF NOT EXISTS idx_contact_submissions_created_at 
ON contact_submissions(created_at DESC);

-- Add index for email lookups
CREATE INDEX IF NOT EXISTS idx_contact_submissions_email 
ON contact_submissions(email);

-- =====================================================
-- MEMBERSHIP APPLICATIONS TABLE
-- Stores membership application data
-- =====================================================
CREATE TABLE IF NOT EXISTS membership_applications (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  full_name TEXT NOT NULL,
  email TEXT NOT NULL,
  phone TEXT NOT NULL,
  address TEXT NOT NULL,
  city TEXT NOT NULL,
  postal_code TEXT NOT NULL,
  country TEXT NOT NULL,
  membership_type TEXT NOT NULL CHECK (membership_type IN ('individual', 'student', 'corporate')),
  payment_status TEXT DEFAULT 'pending' CHECK (payment_status IN ('pending', 'completed', 'failed')),
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Add indexes for faster queries
CREATE INDEX IF NOT EXISTS idx_membership_created_at 
ON membership_applications(created_at DESC);

CREATE INDEX IF NOT EXISTS idx_membership_email 
ON membership_applications(email);

CREATE INDEX IF NOT EXISTS idx_membership_type 
ON membership_applications(membership_type);

CREATE INDEX IF NOT EXISTS idx_membership_status 
ON membership_applications(payment_status);

-- =====================================================
-- EVENTS TABLE
-- Stores all event information
-- =====================================================
CREATE TABLE IF NOT EXISTS events (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  title TEXT NOT NULL,
  description TEXT NOT NULL,
  date DATE NOT NULL,
  time TEXT NOT NULL,
  location TEXT NOT NULL,
  image_url TEXT,
  category TEXT NOT NULL CHECK (category IN ('Conference', 'Workshop', 'Networking', 'Social', 'Training', 'Seminar')),
  status TEXT NOT NULL CHECK (status IN ('upcoming', 'past')),
  price DECIMAL(10,2) DEFAULT 0 CHECK (price >= 0),
  max_attendees INTEGER DEFAULT 100 CHECK (max_attendees > 0),
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Add indexes for faster queries
CREATE INDEX IF NOT EXISTS idx_events_date 
ON events(date DESC);

CREATE INDEX IF NOT EXISTS idx_events_status 
ON events(status);

CREATE INDEX IF NOT EXISTS idx_events_category 
ON events(category);

CREATE INDEX IF NOT EXISTS idx_events_status_date 
ON events(status, date);

-- =====================================================
-- COMMITTEE MEMBERS TABLE
-- Stores leadership team information
-- =====================================================
CREATE TABLE IF NOT EXISTS committee_members (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name TEXT NOT NULL,
  role TEXT NOT NULL,
  bio TEXT NOT NULL,
  image_url TEXT,
  "order" INTEGER DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Add index for ordering
CREATE INDEX IF NOT EXISTS idx_committee_order 
ON committee_members("order");

-- =====================================================
-- UPDATE TRIGGERS
-- Automatically update updated_at timestamps
-- =====================================================

-- Create function to update timestamp
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Add triggers
CREATE TRIGGER update_events_updated_at 
BEFORE UPDATE ON events
FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_committee_updated_at 
BEFORE UPDATE ON committee_members
FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- =====================================================
-- ROW LEVEL SECURITY (RLS) POLICIES
-- Enable security policies for production
-- =====================================================

-- Enable RLS on all tables
ALTER TABLE contact_submissions ENABLE ROW LEVEL SECURITY;
ALTER TABLE membership_applications ENABLE ROW LEVEL SECURITY;
ALTER TABLE events ENABLE ROW LEVEL SECURITY;
ALTER TABLE committee_members ENABLE ROW LEVEL SECURITY;

-- Allow public read access to events and committee members
CREATE POLICY "Public read access to events" 
ON events FOR SELECT 
USING (true);

CREATE POLICY "Public read access to committee members" 
ON committee_members FOR SELECT 
USING (true);

-- Allow service role full access to all tables
CREATE POLICY "Service role full access to contact submissions" 
ON contact_submissions FOR ALL 
USING (auth.jwt()->>'role' = 'service_role');

CREATE POLICY "Service role full access to membership applications" 
ON membership_applications FOR ALL 
USING (auth.jwt()->>'role' = 'service_role');

CREATE POLICY "Service role full access to events" 
ON events FOR ALL 
USING (auth.jwt()->>'role' = 'service_role');

CREATE POLICY "Service role full access to committee members" 
ON committee_members FOR ALL 
USING (auth.jwt()->>'role' = 'service_role');

-- Allow inserts from anon users (for forms)
CREATE POLICY "Allow anon insert to contact submissions" 
ON contact_submissions FOR INSERT 
WITH CHECK (true);

CREATE POLICY "Allow anon insert to membership applications" 
ON membership_applications FOR INSERT 
WITH CHECK (true);

-- =====================================================
-- COMMENTS
-- Add helpful descriptions to tables and columns
-- =====================================================

COMMENT ON TABLE contact_submissions IS 'Stores contact form submissions from website visitors';
COMMENT ON TABLE membership_applications IS 'Stores membership application data from prospective members';
COMMENT ON TABLE events IS 'Stores all association events (upcoming and past)';
COMMENT ON TABLE committee_members IS 'Stores leadership team member information';

COMMENT ON COLUMN events.status IS 'Event status: upcoming or past';
COMMENT ON COLUMN events.price IS 'Event price in euros (0 for free events)';
COMMENT ON COLUMN membership_applications.payment_status IS 'Payment status: pending, completed, or failed';
COMMENT ON COLUMN committee_members."order" IS 'Display order (lower numbers appear first)';

-- =====================================================
-- VERIFICATION
-- Quick query to verify all tables were created
-- =====================================================

-- Run this to see all tables:
-- SELECT table_name FROM information_schema.tables WHERE table_schema = 'public' ORDER BY table_name;

-- Run this to see all indexes:
-- SELECT indexname, tablename FROM pg_indexes WHERE schemaname = 'public' ORDER BY tablename, indexname;
