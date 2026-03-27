# Razorpay Integration Guide

Complete guide to setting up and using Razorpay payments in the association website.

## Overview

The application uses Razorpay for processing:
- Membership payments
- Event registrations
- Donations

## Setup

### 1. Create Razorpay Account

1. Go to [razorpay.com](https://razorpay.com)
2. Sign up for an account
3. Complete KYC verification (for live mode)

### 2. Get API Keys

1. Log in to Razorpay Dashboard
2. Go to **Settings** → **API Keys**
3. Generate keys for Test Mode first
4. Save both:
   - **Key ID** (public, starts with `rzp_test_`)
   - **Key Secret** (private, keep secure)

### 3. Configure Environment Variables

Add to Supabase Edge Functions:

```
RAZORPAY_KEY_ID=rzp_test_xxxxxxxxxxxxx
RAZORPAY_KEY_SECRET=your_secret_key_here
```

See [ENVIRONMENT.md](./ENVIRONMENT.md) for detailed instructions.

## Payment Flow

### Client-Side Flow

1. User fills payment form
2. Client requests order creation from backend
3. Backend creates Razorpay order
4. Razorpay checkout modal opens
5. User completes payment
6. Razorpay sends payment details
7. Client sends payment details to backend for verification
8. Backend verifies signature and confirms payment

### Server-Side Security

The backend handles:
- **Order Creation**: Creates Razorpay orders with amount and details
- **Payment Verification**: Verifies payment signature using HMAC-SHA256
- **Webhook Handling**: Can be extended for webhook verification

**Important**: The Razorpay Key Secret is NEVER exposed to the client.

## Testing

### Test Mode

Razorpay provides test mode for development:

1. Use test API keys (start with `rzp_test_`)
2. No real money is charged
3. Use test card numbers provided by Razorpay

### Test Card Numbers

**Successful Payment:**
- Card: `4111 1111 1111 1111`
- CVV: Any 3 digits
- Expiry: Any future date

**Failed Payment:**
- Card: `4000 0000 0000 0002`
- CVV: Any 3 digits
- Expiry: Any future date

**More test cards**: [Razorpay Test Cards Documentation](https://razorpay.com/docs/payments/payments/test-card-details/)

### Testing Workflow

1. Navigate to Payment page
2. Fill in payment details
3. Use test card number
4. Complete payment
5. Verify success message
6. Check Razorpay Dashboard → Payments to see test transaction

## Going Live

### Prerequisites

1. Complete KYC verification in Razorpay
2. Add business details
3. Configure settlement account
4. Enable payment methods

### Steps to Go Live

1. Generate **Live API Keys** in Razorpay Dashboard
2. Update environment variables with live keys:
   ```
   RAZORPAY_KEY_ID=rzp_live_xxxxxxxxxxxxx
   RAZORPAY_KEY_SECRET=your_live_secret_key
   ```
3. Test thoroughly in production environment
4. Monitor first few transactions closely

## Payment Types Supported

### Membership Payments

- Individual: €100/year
- Student: €50/year
- Corporate: €500/year

### Event Payments

- Variable amounts based on event
- Free events are also supported (€0)

### Donations

- Custom amount entered by user
- Minimum: €1

## Currency

The application uses **EUR (Euro)** as the primary currency. All amounts are displayed with the € symbol.

## Webhooks (Optional)

For production systems, you can configure webhooks:

1. Go to Razorpay Dashboard → Settings → Webhooks
2. Add webhook URL: `https://your-project.supabase.co/functions/v1/make-server-d8ebeed1/webhook`
3. Select events to receive
4. Implement webhook handler in backend (extend `/supabase/functions/server/index.tsx`)

## Error Handling

Common errors and solutions:

### "Payment service not configured"
- Check environment variables are set
- Verify key format is correct

### "Payment verification failed"
- Signature mismatch - check secret key
- Contact Razorpay support if issue persists

### "Amount mismatch"
- Verify amount sent to create-order matches UI
- Check currency is set to EUR

## Security Best Practices

1. **Never expose Key Secret**
   - Only use in backend
   - Never log or display

2. **Verify all payments server-side**
   - Don't trust client-side confirmation
   - Always verify signature

3. **Use HTTPS**
   - Required for production
   - Razorpay enforces this

4. **Log all transactions**
   - Keep audit trail
   - Monitor for suspicious activity

5. **Set up alerts**
   - Configure Razorpay alerts for large amounts
   - Monitor for failed payments

## Troubleshooting

### Checkout modal doesn't open

Check browser console for:
- Razorpay script loading errors
- Order creation errors
- Network issues

### Payment succeeds but verification fails

Possible causes:
- Wrong secret key
- Signature calculation error
- Network timeout

Solution:
- Check server logs
- Verify secret key is correct
- Check Razorpay Dashboard for payment status

## Support Resources

- [Razorpay Documentation](https://razorpay.com/docs/)
- [Razorpay Support](https://razorpay.com/support/)
- [API Reference](https://razorpay.com/docs/api/)

## Contact

For integration support: info@association.eu
