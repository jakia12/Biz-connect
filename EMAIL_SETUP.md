# Email Setup Guide

## Email System Status: ✅ Templates Ready

The email infrastructure is built and ready. Email templates are created for:
- Order confirmations (buyers)
- New order alerts (sellers)
- Order status updates (buyers)

## Current State

**Templates:** ✅ Professional HTML email templates created
**Helpers:** ✅ Email functions ready in `lib/emails.js`
**Integration:** ✅ Ready to connect to SMTP/Resend
**Logs:** ✅ Currently logging to console

## To Enable Live Emails (Optional)

### Option 1: Resend (Recommended)

1. **Install Resend**
   ```bash
   npm install resend
   ```

2. **Get API Key**
   - Sign up at [resend.com](https://resend.com)
   - Get your API key

3. **Add to `.env.local`**
   ```
   RESEND_API_KEY=re_your_api_key_here
   ```

4. **Uncomment in `lib/emails.js`**
   - Lines with Resend import and initialization
   - Lines with `resend.emails.send()`

### Option 2: NodeMailer (SMTP)

1. **Install**
   ```bash
   npm install nodemailer
   ```

2. **Configure SMTP**
   ```
   SMTP_HOST=smtp.gmail.com
   SMTP_PORT=587
   SMTP_USER=your@email.com
   SMTP_PASS=your_app_password
   ```

## What's Working Now

Even without live email delivery, the system:
- ✅ Creates in-app notifications
- ✅ Logs email content to console
- ✅ Has professional HTML templates ready
- ✅ Triggers on correct events

## Next Steps (When Ready)

1. Choose email provider (Resend recommended)
2. Follow setup steps above
3. Test with real orders
4. Monitor email delivery rates

**Note:** Email is optional. The marketplace works perfectly with in-app notifications!
