# Clerk Webhook Configuration Guide

## Overview

This guide explains how to configure Clerk webhooks to synchronize user data with Sanity.

## Prerequisites

- Clerk account with an application created
- `NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY` and `CLERK_SECRET_KEY` configured in `.env.local`
- Next.js application running (locally or deployed)

## Step 1: Expose Your Local Server (For Development)

If you're testing locally, you need to expose your local server to the internet so Clerk can send webhooks to it.

### Option A: Using ngrok (Recommended)

1. Install ngrok: https://ngrok.com/download
2. Start your Next.js dev server:
   ```bash
   npm run dev
   ```
3. In another terminal, expose port 3000:
   ```bash
   ngrok http 3000
   ```
4. Copy the HTTPS URL (e.g., `https://abc123.ngrok.io`)

### Option B: Using Cloudflare Tunnel

1. Install cloudflared: https://developers.cloudflare.com/cloudflare-one/connections/connect-apps/install-and-setup/installation/
2. Start tunnel:
   ```bash
   cloudflared tunnel --url http://localhost:3000
   ```
3. Copy the HTTPS URL provided

## Step 2: Configure Webhook in Clerk Dashboard

1. Go to [Clerk Dashboard](https://dashboard.clerk.com)
2. Select your application
3. Navigate to **Webhooks** in the left sidebar
4. Click **Add Endpoint**

### Webhook Configuration:

**Endpoint URL:**
- For local development: `https://your-ngrok-url.ngrok.io/api/webhooks/clerk`
- For production: `https://your-domain.com/api/webhooks/clerk`

**Events to Subscribe:**
Select the following events:
- ✅ `user.created` - When a new user signs up
- ✅ `user.updated` - When user profile is updated
- ✅ `user.deleted` - When a user is deleted

**Message Filtering (Optional):**
Leave empty to receive all events

## Step 3: Get Webhook Secret

After creating the webhook endpoint:

1. Click on your newly created endpoint
2. Find the **Signing Secret** section
3. Click **Reveal** to show the secret
4. Copy the secret (starts with `whsec_`)

## Step 4: Add Secret to Environment Variables

Add the webhook secret to your `.env.local` file:

```env
CLERK_WEBHOOK_SECRET=whsec_your_actual_secret_here
```

**Important:** Restart your Next.js dev server after adding the secret!

```bash
# Stop the server (Ctrl+C) and restart
npm run dev
```

## Step 5: Test the Webhook

### Method 1: Create a Test User in Clerk

1. Go to Clerk Dashboard > Users
2. Click **Create User**
3. Fill in user details and create
4. Check your Next.js console logs - you should see:
   ```
   Creating user in Sanity: user_xxxxx
   User created successfully in Sanity: user_xxxxx
   ```
5. Verify in Sanity Studio that the user was created

### Method 2: Use Clerk's Webhook Testing Tool

1. In Clerk Dashboard > Webhooks
2. Click on your endpoint
3. Go to **Testing** tab
4. Select `user.created` event
5. Click **Send Example**
6. Check the response and logs

## Step 6: Verify in Sanity

1. Open Sanity Studio: http://localhost:3333
2. Navigate to **User** documents
3. You should see the user created from Clerk
4. Verify all fields are populated correctly:
   - clerkId
   - email
   - firstName
   - lastName
   - profileImage
   - isActive (should be true)
   - createdAt
   - updatedAt

## Troubleshooting

### "Missing svix headers" Error

**Cause:** Webhook request doesn't have required Svix headers

**Solution:** Make sure you're using the correct webhook URL and that Clerk is sending the request

### "Invalid signature" Error

**Cause:** Webhook secret doesn't match or is missing

**Solutions:**
1. Verify `CLERK_WEBHOOK_SECRET` is set correctly in `.env.local`
2. Make sure you copied the complete secret (starts with `whsec_`)
3. Restart your Next.js server after adding the secret
4. Check that the secret matches the one in Clerk Dashboard

### "User not found in Sanity" Error (on update/delete)

**Cause:** Trying to update/delete a user that doesn't exist in Sanity

**Solution:** Make sure the user was created first via `user.created` webhook

### Webhook Not Receiving Events

**Causes:**
1. ngrok/tunnel not running
2. Incorrect webhook URL in Clerk
3. Events not selected in Clerk webhook configuration

**Solutions:**
1. Verify ngrok is running and URL is correct
2. Check webhook URL in Clerk Dashboard
3. Verify events are selected in webhook configuration
4. Check Clerk Dashboard > Webhooks > Attempts for error details

### "Configuration must contain `projectId`" Error

**Cause:** Sanity environment variables not loaded

**Solution:** Verify `.env.local` has:
```env
NEXT_PUBLIC_SANITY_PROJECT_ID=your_project_id
SANITY_API_TOKEN=your_token
```

## Production Deployment

When deploying to production:

1. Update webhook URL in Clerk Dashboard to your production domain
2. Make sure all environment variables are set in your hosting platform:
   - `NEXT_PUBLIC_SANITY_PROJECT_ID`
   - `NEXT_PUBLIC_SANITY_DATASET`
   - `SANITY_API_TOKEN`
   - `NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY`
   - `CLERK_SECRET_KEY`
   - `CLERK_WEBHOOK_SECRET`

3. Test the webhook in production by creating a test user

## Security Notes

- ✅ Webhook signature is verified using Svix
- ✅ Only requests from Clerk with valid signatures are processed
- ✅ Webhook secret should never be committed to version control
- ✅ Use environment variables for all secrets
- ✅ Soft delete preserves data integrity (users marked inactive, not deleted)

## Next Steps

After webhook is configured and working:
- Users will automatically sync from Clerk to Sanity
- You can proceed with implementing Events API (Task 7)
- Events will be linked to users via clerkId
