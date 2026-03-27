# Supabase Setup Guide

Complete guide for configuring Supabase database and storage for the association website.

## Overview

The application uses Supabase for:
- **Database**: PostgreSQL for storing data
- **Storage**: File storage for brochures and images
- **Edge Functions**: Backend API endpoints

## Database Schema

### Tables

The application uses the following tables:

#### 1. `contact_submissions`
Stores contact form submissions

```sql
CREATE TABLE contact_submissions (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name TEXT NOT NULL,
  email TEXT NOT NULL,
  subject TEXT NOT NULL,
  message TEXT NOT NULL,
  created_at TIMESTAMPTZ DEFAULT NOW()
);
```

#### 2. `membership_applications`
Stores membership applications

```sql
CREATE TABLE membership_applications (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  full_name TEXT NOT NULL,
  email TEXT NOT NULL,
  phone TEXT NOT NULL,
  address TEXT NOT NULL,
  city TEXT NOT NULL,
  postal_code TEXT NOT NULL,
  country TEXT NOT NULL,
  membership_type TEXT NOT NULL,
  payment_status TEXT DEFAULT 'pending',
  created_at TIMESTAMPTZ DEFAULT NOW()
);
```

#### 3. `events`
Stores event information

```sql
CREATE TABLE events (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  title TEXT NOT NULL,
  description TEXT NOT NULL,
  date DATE NOT NULL,
  time TEXT NOT NULL,
  location TEXT NOT NULL,
  image_url TEXT,
  category TEXT NOT NULL,
  status TEXT NOT NULL CHECK (status IN ('upcoming', 'past')),
  price DECIMAL(10,2) DEFAULT 0,
  max_attendees INTEGER DEFAULT 100,
  created_at TIMESTAMPTZ DEFAULT NOW()
);
```

#### 4. `committee_members`
Stores leadership team information

```sql
CREATE TABLE committee_members (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name TEXT NOT NULL,
  role TEXT NOT NULL,
  bio TEXT NOT NULL,
  image_url TEXT,
  "order" INTEGER DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT NOW()
);
```

## Setup Instructions

### 1. Create Database Tables

1. Go to your Supabase project dashboard
2. Navigate to **SQL Editor** in the left sidebar
3. Click **New Query**
4. Copy and paste the contents of `/sql/schema.sql`
5. Click **Run** to execute
6. Verify tables are created in **Table Editor**

### 2. Load Sample Data (Optional)

To populate with sample data:

1. In SQL Editor, create a new query
2. Copy and paste contents of `/sql/seed.sql`
3. Click **Run**
4. Check **Table Editor** to see sample data

### 3. Configure Row Level Security (RLS)

For production, enable RLS:

```sql
-- Enable RLS on all tables
ALTER TABLE contact_submissions ENABLE ROW LEVEL SECURITY;
ALTER TABLE membership_applications ENABLE ROW LEVEL SECURITY;
ALTER TABLE events ENABLE ROW LEVEL SECURITY;
ALTER TABLE committee_members ENABLE ROW LEVEL SECURITY;

-- Allow public read access to events and committee members
CREATE POLICY "Public read access" ON events FOR SELECT USING (true);
CREATE POLICY "Public read access" ON committee_members FOR SELECT USING (true);

-- Allow service role full access
CREATE POLICY "Service role full access" ON contact_submissions 
  FOR ALL USING (auth.jwt()->>'role' = 'service_role');
CREATE POLICY "Service role full access" ON membership_applications 
  FOR ALL USING (auth.jwt()->>'role' = 'service_role');
```

### 4. Storage Configuration

The application automatically creates storage buckets when needed:
- `make-d8ebeed1-brochures` - For partnership brochures

No manual setup required, but you can pre-create:

1. Go to **Storage** in Supabase dashboard
2. Click **New bucket**
3. Name: `make-d8ebeed1-brochures`
4. Set as **Private** (files accessed via signed URLs)
5. Click **Save**

## Database Access

### From Frontend

The frontend uses Supabase client for reading data:

```typescript
import { supabase } from '../../lib/supabase';

// Fetch events
const { data, error } = await supabase
  .from('events')
  .select('*')
  .order('date', { ascending: true });
```

### From Backend (Edge Functions)

Backend uses service role for full access:

```typescript
import { createClient } from 'npm:@supabase/supabase-js';

const supabase = createClient(
  Deno.env.get('SUPABASE_URL'),
  Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')
);

// Insert data
const { data, error } = await supabase
  .from('contact_submissions')
  .insert([{ name, email, subject, message }]);
```

## Data Management

### Viewing Data

1. Go to **Table Editor** in Supabase dashboard
2. Select table from left sidebar
3. View, filter, and edit data

### Exporting Data

1. Go to **Table Editor**
2. Select table
3. Click **Export** (CSV format)

### Importing Data

1. Prepare CSV file with correct columns
2. Go to **Table Editor**
3. Select table
4. Click **Import data**
5. Upload CSV file

## Storage Management

### Uploading Files

Done through the Partnership page admin section:
1. Navigate to /partnership
2. Scroll to "Upload Partnership Brochure"
3. Select PDF file (max 10MB)
4. Click Upload

### Accessing Files

Files are accessed via signed URLs (temporary, secure links):
- Valid for 1 hour
- Private files not publicly accessible
- Generated on-demand

### Managing Storage

1. Go to **Storage** in Supabase dashboard
2. Select bucket
3. View, download, or delete files

## Monitoring

### Database Usage

1. Go to **Database** → **Usage** in dashboard
2. Monitor:
   - Database size
   - Number of rows
   - Query performance

### API Usage

1. Go to **Settings** → **Usage** in dashboard
2. Monitor:
   - API requests
   - Storage usage
   - Edge Function invocations

## Backup & Recovery

### Automatic Backups

Supabase provides automatic backups:
- Free tier: Daily backups (7 days retention)
- Pro tier: Point-in-time recovery

### Manual Backup

1. Export all tables as CSV
2. Download storage bucket contents
3. Save SQL schema file
4. Store securely off-site

## Troubleshooting

### Connection Errors

**Problem**: Cannot connect to database
**Solution**:
- Verify SUPABASE_URL is correct
- Check API keys are valid
- Review Supabase status page

### RLS Blocking Queries

**Problem**: Queries return empty even with data
**Solution**:
- Check RLS policies
- Verify service role key is used in backend
- Review policy conditions

### Storage Upload Fails

**Problem**: File upload returns error
**Solution**:
- Check file size (<10MB)
- Verify bucket exists
- Check service role permissions

## Best Practices

1. **Use RLS**: Enable Row Level Security for all tables
2. **Limit exposure**: Only expose necessary data to frontend
3. **Use service role carefully**: Only in backend, never in client
4. **Monitor usage**: Set up alerts for high usage
5. **Regular backups**: Export important data regularly

## Performance Optimization

### Indexes

Add indexes for frequently queried columns:

```sql
-- Index for events by date
CREATE INDEX idx_events_date ON events(date);

-- Index for events by status
CREATE INDEX idx_events_status ON events(status);

-- Index for committee members by order
CREATE INDEX idx_committee_order ON committee_members("order");
```

### Query Optimization

- Use `.select()` to specify only needed columns
- Use `.limit()` for pagination
- Add `.order()` for consistent sorting
- Use `.eq()`, `.gt()`, `.lt()` for filtering

## Resources

- [Supabase Documentation](https://supabase.com/docs)
- [PostgreSQL Documentation](https://www.postgresql.org/docs/)
- [Supabase Storage Guide](https://supabase.com/docs/guides/storage)

## Support

For Supabase support: info@association.eu
