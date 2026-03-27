# Database Setup Guide for MoX Association Website

This guide provides step-by-step instructions for setting up the database tables in Supabase using SQL queries.

## Overview

The MoX association website requires 4 main tables:
1. **events** - Stores all event information (upcoming and past)
2. **committee_members** - Stores leadership team member information
3. **contact_submissions** - Stores contact form submissions
4. **membership_applications** - Stores membership application data

## Quick Setup (Recommended)

### Option 1: Run Complete Schema File

1. Go to your Supabase Dashboard
2. Navigate to **SQL Editor** (icon on the left sidebar)
3. Click **New Query**
4. Copy the entire contents of `/sql/schema.sql` from this project
5. Paste into the SQL Editor
6. Click **Run** or press `Ctrl/Cmd + Enter`
7. Wait for success confirmation

This will create all tables, indexes, triggers, and security policies in one go.

### Option 2: Add Sample Data

After running the schema, you can add sample data:

1. In SQL Editor, create another **New Query**
2. Copy the entire contents of `/sql/seed.sql` from this project
3. Paste into the SQL Editor
4. Click **Run**
5. Wait for success confirmation

This will populate your tables with sample events, committee members, and test data.

---

## Manual Setup (Step-by-Step)

If you prefer to understand each step or run queries individually, follow these instructions:

### Step 1: Enable UUID Extension

```sql
-- Enable UUID generation for primary keys
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
```

### Step 2: Create Events Table

```sql
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

-- Add indexes for better performance
CREATE INDEX IF NOT EXISTS idx_events_date ON events(date DESC);
CREATE INDEX IF NOT EXISTS idx_events_status ON events(status);
CREATE INDEX IF NOT EXISTS idx_events_category ON events(category);
CREATE INDEX IF NOT EXISTS idx_events_status_date ON events(status, date);
```

### Step 3: Create Committee Members Table

```sql
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
CREATE INDEX IF NOT EXISTS idx_committee_order ON committee_members("order");
```

### Step 4: Create Contact Submissions Table

```sql
CREATE TABLE IF NOT EXISTS contact_submissions (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name TEXT NOT NULL,
  email TEXT NOT NULL,
  subject TEXT NOT NULL,
  message TEXT NOT NULL,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Add indexes
CREATE INDEX IF NOT EXISTS idx_contact_submissions_created_at ON contact_submissions(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_contact_submissions_email ON contact_submissions(email);
```

### Step 5: Create Membership Applications Table

```sql
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

-- Add indexes
CREATE INDEX IF NOT EXISTS idx_membership_created_at ON membership_applications(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_membership_email ON membership_applications(email);
CREATE INDEX IF NOT EXISTS idx_membership_type ON membership_applications(membership_type);
CREATE INDEX IF NOT EXISTS idx_membership_status ON membership_applications(payment_status);
```

### Step 6: Create Update Triggers

```sql
-- Function to automatically update the updated_at timestamp
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Add trigger to events table
CREATE TRIGGER update_events_updated_at 
BEFORE UPDATE ON events
FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- Add trigger to committee_members table
CREATE TRIGGER update_committee_updated_at 
BEFORE UPDATE ON committee_members
FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
```

### Step 7: Enable Row Level Security (RLS)

```sql
-- Enable RLS on all tables
ALTER TABLE contact_submissions ENABLE ROW LEVEL SECURITY;
ALTER TABLE membership_applications ENABLE ROW LEVEL SECURITY;
ALTER TABLE events ENABLE ROW LEVEL SECURITY;
ALTER TABLE committee_members ENABLE ROW LEVEL SECURITY;
```

### Step 8: Create Security Policies

```sql
-- Allow public read access to events
CREATE POLICY "Public read access to events" 
ON events FOR SELECT 
USING (true);

-- Allow public read access to committee members
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

-- Allow anonymous users to insert (for forms)
CREATE POLICY "Allow anon insert to contact submissions" 
ON contact_submissions FOR INSERT 
WITH CHECK (true);

CREATE POLICY "Allow anon insert to membership applications" 
ON membership_applications FOR INSERT 
WITH CHECK (true);
```

---

## Adding Sample Data

### Insert Sample Committee Members

```sql
INSERT INTO committee_members (name, role, bio, image_url, "order") VALUES
('Dr. Sarah Johnson', 'President', 'Leading the association with over 20 years of industry experience.', '/images/team/member-1.jpg', 1),
('Michael Chen', 'Vice President', 'Passionate about innovation and member engagement.', '/images/team/member-2.jpg', 2),
('Emma Rodriguez', 'Treasurer', 'Ensuring financial sustainability and transparency.', '/images/team/member-3.jpg', 3),
('David Okonkwo', 'Secretary', 'Committed to clear communication and member support.', '/images/team/member-4.jpg', 4);
```

### Insert Sample Events

```sql
INSERT INTO events (title, description, date, time, location, image_url, category, status, price, max_attendees) VALUES
('Annual Business Summit 2026', 
 'Join industry leaders for our flagship annual event featuring keynote speakers, panel discussions, and networking opportunities.', 
 '2026-04-15', '09:00', 'Brussels Convention Center', 
 '/images/events/event-1.jpg', 
 'Conference', 'upcoming', 150.00, 500),
 
('Professional Development Workshop', 
 'Enhance your skills with expert-led training sessions covering the latest industry trends and best practices.', 
 '2026-04-22', '14:00', 'Association Headquarters', 
 '/images/events/event-2.jpg', 
 'Workshop', 'upcoming', 75.00, 50);
```

---

## Verification Queries

After running the setup, verify everything is working:

### Check All Tables Exist

```sql
SELECT table_name 
FROM information_schema.tables 
WHERE table_schema = 'public' 
ORDER BY table_name;
```

Expected output should include:
- committee_members
- contact_submissions
- events
- membership_applications

### Check Committee Members

```sql
SELECT name, role 
FROM committee_members 
ORDER BY "order";
```

### Check Events

```sql
SELECT title, date, status, price 
FROM events 
WHERE status = 'upcoming' 
ORDER BY date;
```

### Check Row Counts

```sql
SELECT 
  (SELECT COUNT(*) FROM events) as events_count,
  (SELECT COUNT(*) FROM committee_members) as members_count,
  (SELECT COUNT(*) FROM contact_submissions) as contacts_count,
  (SELECT COUNT(*) FROM membership_applications) as applications_count;
```

---

## Troubleshooting

### Error: "relation already exists"

If you see this error, the table already exists. You can either:
1. Drop the table first: `DROP TABLE IF EXISTS table_name CASCADE;`
2. Or skip creating that table

### Error: "permission denied"

Make sure you're running the queries in the Supabase SQL Editor, not in a local client. The SQL Editor uses the service role which has full permissions.

### Error: "policy already exists"

If policies already exist, you can drop them first:
```sql
DROP POLICY IF EXISTS "policy_name" ON table_name;
```

### Tables Not Showing in Supabase Table Editor

1. Check if RLS is enabled (it should be)
2. Make sure the policies are created correctly
3. Try refreshing the Supabase dashboard

---

## Next Steps

After successfully setting up the database:

1. ✅ Test the Events page - should display events from database
2. ✅ Test the About page - should display committee members
3. ✅ Test the Contact form - should save submissions
4. ✅ Test the Membership form - should save applications

## Maintenance Tips

### Add a New Event

```sql
INSERT INTO events (title, description, date, time, location, image_url, category, status, price, max_attendees) 
VALUES (
  'Your Event Title',
  'Your event description',
  '2026-07-15',
  '14:00',
  'Event Location',
  '/images/events/new-event.jpg',
  'Workshop',
  'upcoming',
  50.00,
  100
);
```

### Add a New Committee Member

```sql
INSERT INTO committee_members (name, role, bio, image_url, "order") 
VALUES (
  'Jane Doe',
  'Marketing Director',
  'Brief bio about the member.',
  '/images/team/new-member.jpg',
  7
);
```

### Update Event Status to Past

```sql
UPDATE events 
SET status = 'past' 
WHERE date < CURRENT_DATE 
AND status = 'upcoming';
```

### View Recent Contact Submissions

```sql
SELECT name, email, subject, created_at 
FROM contact_submissions 
ORDER BY created_at DESC 
LIMIT 10;
```

---

## Support

If you encounter any issues:
1. Check the Supabase logs in the Dashboard
2. Verify your SQL syntax
3. Ensure RLS policies are correctly configured
4. Review the `/sql/schema.sql` file for reference

For more information about Supabase SQL Editor, visit: https://supabase.com/docs/guides/database/overview
