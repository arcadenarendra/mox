# Supabase Connection Checklist

Use this checklist to verify your MoX website is properly connected to your Supabase account.

## ✅ Pre-Connection Setup

### Step 1: Supabase Account Setup
- [ ] Created a Supabase account at https://supabase.com
- [ ] Created a new project in Supabase Dashboard
- [ ] Project is active (not paused)

### Step 2: Get Credentials
- [ ] Copied **Project URL** from Settings → API
- [ ] Extracted **Project ID** from the URL
- [ ] Copied **anon public** key from Settings → API
- [ ] Copied **service_role** key from Settings → API (for backend)

---

## 🗄️ Database Setup

### Step 3: Create Tables
- [ ] Opened Supabase Dashboard → SQL Editor
- [ ] Created a new query
- [ ] Pasted entire contents of `/sql/schema.sql`
- [ ] Clicked **Run** - no errors appeared
- [ ] Verified tables exist in Table Editor:
  - [ ] `events`
  - [ ] `committee_members`
  - [ ] `contact_submissions`
  - [ ] `membership_applications`

### Step 4: Add Sample Data (Optional)
- [ ] Opened SQL Editor → New query
- [ ] Pasted entire contents of `/sql/seed.sql`
- [ ] Clicked **Run** - no errors appeared
- [ ] Verified data exists in tables:
  - [ ] Events table has 8 sample events
  - [ ] Committee members table has 4-6 members
  - [ ] Contact submissions table has sample data
  - [ ] Membership applications table has sample data

---

## 🔐 Security Configuration

### Step 5: Verify Row Level Security (RLS)
Go to Supabase Dashboard → Authentication → Policies

#### Events Table
- [ ] RLS is **enabled**
- [ ] Policy: "Public read access to events" exists
- [ ] Policy: "Service role full access to events" exists

#### Committee Members Table
- [ ] RLS is **enabled**
- [ ] Policy: "Public read access to committee members" exists
- [ ] Policy: "Service role full access to committee members" exists

#### Contact Submissions Table
- [ ] RLS is **enabled**
- [ ] Policy: "Allow anon insert to contact submissions" exists
- [ ] Policy: "Service role full access to contact submissions" exists

#### Membership Applications Table
- [ ] RLS is **enabled**
- [ ] Policy: "Allow anon insert to membership applications" exists
- [ ] Policy: "Service role full access to membership applications" exists

---

## 🔌 Application Configuration

### Step 6: Update Connection Info

**Current Configuration:**
```
Project ID: kyweadzxsebauhobwsno
File: /utils/supabase/info.tsx
```

**Choose One:**

#### Option A: Using Existing Configured Project
If `kyweadzxsebauhobwsno` is your Supabase project:
- [ ] No changes needed - already configured!
- [ ] Just run the SQL schema in your Supabase Dashboard
- [ ] Skip to Step 7 (Testing)

#### Option B: Using Your Own Supabase Project
If you want to use a different Supabase project:
- [ ] Updated `projectId` in `/utils/supabase/info.tsx`
- [ ] Updated `publicAnonKey` in `/utils/supabase/info.tsx`
- [ ] Verified environment variables are set (if using Figma Make's environment)

---

## 🧪 Testing Connection

### Step 7: Test Frontend Pages

#### Test Events Page
- [ ] Opened the website
- [ ] Navigated to **Events** page
- [ ] Opened browser DevTools (F12) → Console tab
- [ ] No errors in console
- [ ] Events from database are displayed
- [ ] Can filter between "Upcoming" and "Past" events
- [ ] Can click on an event to see details

#### Test About Page
- [ ] Navigated to **About** page
- [ ] "Our Leadership Team" section displays committee members
- [ ] Team member images load correctly
- [ ] No errors in console
- [ ] Data matches what's in your Supabase database

#### Test Contact Form
- [ ] Navigated to **Contact** page
- [ ] Filled out the contact form with test data
- [ ] Clicked **Send Message**
- [ ] Saw success message
- [ ] Opened Supabase Dashboard → Table Editor → `contact_submissions`
- [ ] Test submission appears in the table
- [ ] All fields are correctly saved

#### Test Membership Form
- [ ] Navigated to **Membership** page
- [ ] Selected a membership type
- [ ] Filled out the form completely
- [ ] Submitted the form
- [ ] Payment flow worked (Razorpay integration)
- [ ] Opened Supabase Dashboard → Table Editor → `membership_applications`
- [ ] Application appears in the table
- [ ] Payment status is correctly recorded

---

## 🖥️ Backend Testing (If Using Server Functions)

### Step 8: Test Server Endpoints

#### Check Server is Running
- [ ] Backend server at `/supabase/functions/server/index.tsx` exists
- [ ] Server has access to `SUPABASE_URL` environment variable
- [ ] Server has access to `SUPABASE_SERVICE_ROLE_KEY` environment variable

#### Test Server Database Access
- [ ] Server can read from database
- [ ] Server can write to database
- [ ] No permission errors in server logs

---

## 🐛 Troubleshooting

### If you see errors, check:

#### "Failed to fetch" or Network Errors
- [ ] Verified project ID is correct
- [ ] Checked Supabase project is active (not paused)
- [ ] Confirmed internet connection is working
- [ ] Tried refreshing the browser

#### "Could not find table" Errors
- [ ] Confirmed tables were created in Supabase
- [ ] Checked table names match exactly (case-sensitive)
- [ ] Re-ran `/sql/schema.sql` if needed

#### "Invalid API key" Errors
- [ ] Verified anon key is correct
- [ ] Checked for extra spaces or line breaks in key
- [ ] Generated a new key in Supabase if needed

#### "Row Level Security policy violation"
- [ ] Confirmed RLS policies exist
- [ ] Checked policies match the schema.sql file
- [ ] Re-ran the RLS section of schema.sql

#### Data Not Saving
- [ ] Checked browser console for specific errors
- [ ] Verified insert policies exist for the table
- [ ] Tested insert directly in Supabase SQL Editor

---

## ✨ Final Verification

### Step 9: Complete System Check
- [ ] All pages load without errors
- [ ] Events display correctly from database
- [ ] Committee members display correctly from database
- [ ] Contact form saves to database
- [ ] Membership form saves to database
- [ ] No console errors anywhere on the site
- [ ] Images load properly
- [ ] Navigation works smoothly

---

## 🎉 Success!

If all checkboxes are marked, your MoX website is successfully connected to Supabase!

### Next Steps:
1. **Replace sample data** with your real organization data
2. **Upload real images** for events and team members
3. **Test payment integration** with Razorpay
4. **Monitor database** usage in Supabase Dashboard
5. **Set up backups** for your database

---

## 📚 Additional Resources

- **Database Setup Guide:** `/docs/DATABASE_SETUP_GUIDE.md`
- **Connection Guide:** `/docs/SUPABASE_CONNECTION_GUIDE.md`
- **Image Management:** `/docs/IMAGES.md`
- **Supabase Docs:** https://supabase.com/docs

---

## 🆘 Still Having Issues?

### Common Issues Quick Reference:

| Issue | Solution Location |
|-------|-------------------|
| Tables not created | `/docs/DATABASE_SETUP_GUIDE.md` |
| Connection errors | `/docs/SUPABASE_CONNECTION_GUIDE.md` |
| RLS policy errors | Run `/sql/schema.sql` Step 7-8 |
| Form not submitting | Check browser console + RLS policies |
| Images not loading | `/docs/IMAGES.md` |

### Error Log Checklist:
When asking for help, provide:
- [ ] Browser console errors (screenshot)
- [ ] Supabase Dashboard → Logs (screenshot)
- [ ] SQL query that's failing
- [ ] Which table/page has the issue
- [ ] Your Supabase project ID (for reference)

---

**Last Updated:** Check this list each time you deploy or make database changes!
