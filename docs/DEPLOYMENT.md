# Deployment Guide

Guide for deploying the Professional Association Website to production.

## Overview

The application consists of:
- **Frontend**: React application (hosted on Figma Make / Vercel / Netlify)
- **Backend**: Supabase Edge Functions (hosted by Supabase)
- **Database**: Supabase PostgreSQL (hosted by Supabase)
- **Storage**: Supabase Storage (hosted by Supabase)

## Prerequisites

- Completed setup (see [SETUP.md](./SETUP.md))
- All environment variables configured
- Database schema deployed
- Test mode working correctly

## Pre-Deployment Checklist

### 1. Content Review

- [ ] All text content is finalized
- [ ] Images are optimized and uploaded
- [ ] Events are up to date
- [ ] Committee members are current
- [ ] Contact information is correct
- [ ] Brochure is uploaded

### 2. Testing

- [ ] Contact form submits successfully
- [ ] Membership application works
- [ ] Payment flow works in test mode
- [ ] All pages load correctly
- [ ] Mobile responsive design works
- [ ] Links work (no 404 errors)
- [ ] Forms validate properly

### 3. Security

- [ ] Environment variables are set (not in code)
- [ ] Razorpay Key Secret is not exposed
- [ ] Service Role Key is not exposed
- [ ] RLS policies are enabled
- [ ] HTTPS is enabled
- [ ] CORS is configured correctly

### 4. Performance

- [ ] Images are optimized
- [ ] No console errors
- [ ] Page load times are acceptable
- [ ] Database queries are optimized

## Deployment Steps

### 1. Deploy Backend (Supabase)

Backend (Edge Functions) is automatically deployed on Supabase:

1. Verify Edge Function is running:
   - Go to Supabase Dashboard → Edge Functions
   - Check status is "Deployed"
   - Test health endpoint: `https://[project].supabase.co/functions/v1/make-server-d8ebeed1/health`

2. If not deployed:
   - Edge Functions deploy automatically from your Figma Make environment
   - Or use Supabase CLI: `supabase functions deploy`

### 2. Configure Production Environment

#### Update Razorpay to Live Mode

1. Get live API keys from Razorpay:
   - Go to Razorpay Dashboard → Settings → API Keys
   - Generate live keys (start with `rzp_live_`)
   - Note both Key ID and Secret

2. Update environment variables:
   - Go to Supabase → Edge Functions → Secrets
   - Update `RAZORPAY_KEY_ID` with live key
   - Update `RAZORPAY_KEY_SECRET` with live secret

3. Test live payment:
   - Use small amount first (€1)
   - Use real card
   - Verify payment appears in Razorpay dashboard

#### Review Database Policies

Ensure RLS is properly configured:

```sql
-- Verify RLS is enabled
SELECT tablename, rowsecurity 
FROM pg_tables 
WHERE schemaname = 'public';

-- Should show rowsecurity = true for all tables
```

### 3. Deploy Frontend

The frontend is already deployed through Figma Make. For custom deployment:

#### Option A: Vercel

1. Connect Git repository
2. Configure build settings:
   - Framework: Vite
   - Build command: `npm run build`
   - Output directory: `dist`
3. Add environment variables (if needed)
4. Deploy

#### Option B: Netlify

1. Connect Git repository
2. Configure build settings:
   - Build command: `npm run build`
   - Publish directory: `dist`
3. Add environment variables (if needed)
4. Deploy

#### Option C: Custom Server

1. Build the application:
   ```bash
   npm run build
   ```

2. The `dist` folder contains production files
3. Serve with any static file server:
   ```bash
   npx serve dist
   ```

### 4. Custom Domain (Optional)

#### For Figma Make Deployment

1. Go to project settings
2. Add custom domain
3. Update DNS records:
   - Add CNAME record
   - Point to provided URL
4. Wait for DNS propagation (up to 48 hours)

#### For Supabase Custom Domain

1. Go to Supabase → Settings → Custom Domains
2. Add your domain
3. Update DNS with provided records
4. Verify ownership

### 5. SSL Certificate

- Figma Make, Vercel, and Netlify provide automatic SSL
- For custom hosting, use Let's Encrypt or similar

## Post-Deployment

### 1. Verification

Test all critical flows:

- [ ] Homepage loads
- [ ] Navigation works
- [ ] Contact form submits
- [ ] Membership application works
- [ ] **Payment with real card** (small amount)
- [ ] Event registration
- [ ] Brochure download
- [ ] Mobile view

### 2. Monitoring Setup

#### Supabase Monitoring

1. Go to Supabase Dashboard → Reports
2. Monitor:
   - API requests
   - Database usage
   - Storage usage
   - Edge Function invocations

#### Razorpay Monitoring

1. Set up email alerts for payments
2. Enable SMS notifications for large amounts
3. Review settlement reports

#### Error Monitoring (Optional)

Consider integrating:
- Sentry for error tracking
- Google Analytics for usage analytics
- Hotjar for user behavior

### 3. Backup Strategy

#### Regular Backups

Schedule:
- **Daily**: Automatic Supabase backups (included)
- **Weekly**: Manual database export
- **Monthly**: Full data export + code backup

#### Backup Process

1. Database:
   ```sql
   -- Export all tables
   -- Use Supabase dashboard or pg_dump
   ```

2. Storage:
   - Download all brochures
   - Save locally or cloud backup

3. Code:
   - Commit to Git
   - Tag releases
   - Keep latest working version

### 4. Security Hardening

#### Rate Limiting

Consider adding rate limiting to Edge Functions:

```typescript
// In Edge Functions
const rateLimit = new Map();

// Implement rate limiting logic
```

#### Input Validation

Ensure all forms validate input:
- Email format
- Phone number format
- Required fields
- XSS prevention

#### HTTPS Only

Force HTTPS in production:
- Configure in hosting platform
- Add HSTS headers

## Maintenance

### Regular Tasks

#### Daily
- Monitor payment transactions
- Check for error logs
- Review contact form submissions

#### Weekly
- Update events
- Review membership applications
- Check website performance

#### Monthly
- Review analytics
- Update content
- Security patch check
- Database cleanup

#### Quarterly
- Review pricing
- Update policies
- Refresh content
- Performance optimization

### Updates

#### Application Updates

1. Test in development
2. Create backup
3. Deploy to production
4. Verify functionality
5. Monitor for issues

#### Database Updates

1. Create migration script
2. Test on copy of production data
3. Schedule maintenance window
4. Apply migration
5. Verify data integrity

## Rollback Plan

If something goes wrong:

### Frontend Rollback

1. Revert to previous Git commit
2. Redeploy previous version
3. Verify it works

### Backend Rollback

1. Restore previous Edge Function version
2. Or revert environment variables
3. Test critical paths

### Database Rollback

1. Restore from Supabase backup
2. Or use point-in-time recovery (Pro tier)
3. Verify data

## Performance Optimization

### Frontend

- Enable Gzip compression
- Minify assets
- Use CDN for static files
- Lazy load images
- Code splitting

### Backend

- Add database indexes
- Optimize queries
- Cache frequent requests
- Use connection pooling

### Database

```sql
-- Add indexes for frequently queried columns
CREATE INDEX idx_events_status_date ON events(status, date);
CREATE INDEX idx_members_email ON membership_applications(email);
```

## Scaling Considerations

### Expected Load

Estimate:
- Concurrent users
- Monthly page views
- Payment volume
- Storage needs

### Supabase Limits

Free tier:
- 50,000 monthly active users
- 500MB database space
- 1GB file storage
- 500,000 Edge Function invocations

Upgrade to Pro if needed.

### Cost Estimation

Monthly costs:
- Supabase: $0-$25+ (based on usage)
- Razorpay: 2% transaction fee
- Hosting: $0-$20 (if using Vercel/Netlify)

## Troubleshooting

### Common Issues

**Payments not working**
- Check Razorpay keys are live keys
- Verify CORS settings
- Check webhook configuration

**Forms not saving**
- Verify database connection
- Check RLS policies
- Review service role key

**Images not loading**
- Check image URLs
- Verify storage bucket permissions
- Test with different browsers

## Support & Resources

- [Supabase Status](https://status.supabase.com)
- [Razorpay Status](https://status.razorpay.com)
-- Support email: mox@polytechnique.fr

## Disaster Recovery

Keep documented:
- [ ] Database backup location
- [ ] Code repository
- [ ] Environment variables (securely)
- [ ] DNS configuration
- [ ] API credentials (securely)
- [ ] Contact information for all services

## Launch Checklist

Final steps before going live:

- [ ] All tests passing
- [ ] Production environment variables set
- [ ] Razorpay in live mode
- [ ] SSL certificate active
- [ ] Custom domain configured (if applicable)
- [ ] Analytics tracking enabled
- [ ] Error monitoring active
- [ ] Backup strategy in place
- [ ] Team trained on admin functions
- [ ] Support email configured
- [ ] Privacy policy and terms published
- [ ] Announcement email ready

---

**Congratulations on your deployment!** 🎉

Monitor closely for the first few days and be ready to respond to any issues quickly.
