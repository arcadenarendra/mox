# Setup Guide

Complete setup instructions for the Professional Association Website.

## Prerequisites

- Supabase account
- Razorpay account
- Basic understanding of React and TypeScript

## Installation Steps

### 1. Environment Configuration

Create environment variables in the Supabase Edge Functions dashboard:

**Required Variables:**
- `SUPABASE_URL` - Your Supabase project URL
- `SUPABASE_SERVICE_ROLE_KEY` - Supabase service role key (keep secret!)
- `RAZORPAY_KEY_ID` - Razorpay API key ID
- `RAZORPAY_KEY_SECRET` - Razorpay API key secret (keep secret!)

See [ENVIRONMENT.md](./ENVIRONMENT.md) for detailed information.

### 2. Database Setup

1. Go to your Supabase project dashboard
2. Navigate to the SQL Editor
3. Run the schema from `/sql/schema.sql`
4. Optionally, run seed data from `/sql/seed.sql`

See [SUPABASE.md](./SUPABASE.md) for detailed instructions.

### 3. Storage Setup

The application will automatically create the required storage bucket (`make-d8ebeed1-brochures`) when you first upload a brochure. No manual setup required.

### 4. Razorpay Configuration

1. Sign up for Razorpay account
2. Get your API keys from the Razorpay dashboard
3. Add keys to Supabase environment variables
4. Test with Razorpay test mode first

See [RAZORPAY.md](./RAZORPAY.md) for detailed instructions.

### 5. Verification

After setup, verify everything works:

1. **Database**: Check that tables are created in Supabase
2. **Forms**: Submit a contact form and verify it appears in the database
3. **Payment**: Test a payment in Razorpay test mode
4. **Storage**: Upload a brochure PDF and verify it can be downloaded

## Common Issues

### Database Connection Errors

**Problem**: Forms don't save data
**Solution**: 
- Verify SUPABASE_URL and SUPABASE_SERVICE_ROLE_KEY are set correctly
- Check that tables exist in Supabase database
- Review browser console for detailed error messages

### Payment Not Working

**Problem**: Payment gateway doesn't open
**Solution**:
- Verify RAZORPAY_KEY_ID and RAZORPAY_KEY_SECRET are set
- Check that you're using the correct test/live keys
- Ensure Razorpay script is loaded (check browser console)

### Storage Upload Fails

**Problem**: Brochure upload fails
**Solution**:
- Verify file is PDF and under 10MB
- Check SUPABASE_SERVICE_ROLE_KEY is set correctly
- Ensure storage buckets have correct permissions

## Next Steps

After setup:
1. Review [CONTENT.md](./CONTENT.md) to learn how to update content
2. Add your own events, committee members, and content
3. Upload your association brochure
4. Configure your custom domain (see [DEPLOYMENT.md](./DEPLOYMENT.md))
5. Test all forms and payment flows
6. Go live!

## Support

If you encounter issues:
1. Check the browser console for errors
2. Review Supabase logs in the dashboard
3. Verify all environment variables are set
4. Contact info@association.eu for assistance
