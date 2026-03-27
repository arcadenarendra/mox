# Environment Variables

This document describes all environment variables required for the application.

## Overview

All sensitive credentials are stored as environment variables in Supabase Edge Functions. **Never commit these values to version control.**

## Required Variables

### Supabase Configuration

#### `SUPABASE_URL`
- **Description**: Your Supabase project URL
- **Format**: `https://xxxxx.supabase.co`
- **Where to find**: Supabase Dashboard → Settings → API
- **Example**: `https://abcdefghij.supabase.co`

#### `SUPABASE_SERVICE_ROLE_KEY`
- **Description**: Supabase service role key for server-side operations
- **Format**: Long alphanumeric string starting with `eyJ`
- **Where to find**: Supabase Dashboard → Settings → API → service_role key
- **Security**: ⚠️ **CRITICAL** - Never expose this to the client! Only use in Edge Functions
- **Example**: `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...`

### Razorpay Configuration

#### `RAZORPAY_KEY_ID`
- **Description**: Razorpay API Key ID for payment processing
- **Format**: String starting with `rzp_test_` (test) or `rzp_live_` (production)
- **Where to find**: Razorpay Dashboard → Settings → API Keys
- **Example**: `rzp_test_ABC123def456`

#### `RAZORPAY_KEY_SECRET`
- **Description**: Razorpay API Key Secret
- **Format**: Alphanumeric string
- **Where to find**: Razorpay Dashboard → Settings → API Keys
- **Security**: ⚠️ **CRITICAL** - Never expose this to the client! Only use in Edge Functions
- **Example**: `XYZ789abc123def456`

## How to Set Environment Variables

### In Supabase Edge Functions

1. Go to your Supabase project dashboard
2. Navigate to **Edge Functions** in the left sidebar
3. Click on **Manage secrets**
4. Add each variable:
   - Click **Add secret**
   - Enter the name (e.g., `RAZORPAY_KEY_ID`)
   - Enter the value
   - Click **Save**

### Accessing in Code

Environment variables are accessed using `Deno.env.get()` in Edge Functions:

```typescript
const razorpayKeyId = Deno.env.get('RAZORPAY_KEY_ID');
const supabaseUrl = Deno.env.get('SUPABASE_URL');
```

## Environment-Specific Configuration

### Development/Test Mode

Use Razorpay **test keys** for development:
- Key ID starts with `rzp_test_`
- Secret is the test secret
- No real money is charged
- Use test card numbers from Razorpay docs

### Production Mode

Use Razorpay **live keys** for production:
- Key ID starts with `rzp_live_`
- Secret is the live secret
- Real payments are processed
- Ensure proper compliance and security

## Security Best Practices

1. **Never commit secrets to Git**
   - Use `.gitignore` for local config files
   - Use environment variables only

2. **Rotate keys regularly**
   - Change keys every 90 days
   - Immediately rotate if compromised

3. **Use test mode first**
   - Always test with test keys before going live
   - Verify all flows work correctly

4. **Limit access**
   - Only authorized team members should have access
   - Use role-based access control in Supabase

5. **Monitor usage**
   - Review Razorpay transaction logs
   - Monitor Supabase usage and logs

## Verification

To verify environment variables are set correctly:

1. Check Supabase Edge Functions secrets in dashboard
2. Test the health endpoint: `GET /make-server-d8ebeed1/health`
3. Try creating a test payment order
4. Review console logs for any missing variable errors

## Troubleshooting

### "Payment service not configured" error
- Verify `RAZORPAY_KEY_ID` and `RAZORPAY_KEY_SECRET` are set
- Check for typos in variable names
- Ensure values don't have extra spaces

### "Storage service not configured" error
- Verify `SUPABASE_URL` is set correctly
- Check `SUPABASE_SERVICE_ROLE_KEY` is the service role key (not anon key)

### Variables not loading
- Restart the Edge Function after adding new variables
- Check Supabase logs for startup errors
- Verify variable names match exactly (case-sensitive)
