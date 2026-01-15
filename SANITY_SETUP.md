# Sanity Backend Setup Guide

## Prerequisites

- Node.js 18+ installed
- npm or yarn package manager
- A Sanity.io account (free tier available)
- A Clerk account (free tier available)

## Step 1: Create Sanity Project

1. Go to [https://www.sanity.io/manage](https://www.sanity.io/manage)
2. Click "Create new project"
3. Choose a project name (e.g., "invitaciones-digitales")
4. Select a dataset name (use "production" for main dataset)
5. Copy your **Project ID** - you'll need this later

## Step 2: Get Sanity API Token

1. In your Sanity project dashboard, go to **API** section
2. Click on **Tokens** tab
3. Click "Add API token"
4. Give it a name (e.g., "Next.js App")
5. Select permissions: **Editor** (for read/write access)
6. Copy the generated token - you'll need this later

## Step 3: Configure Environment Variables

1. Copy `.env.example` to `.env.local`:
   ```bash
   copy .env.example .env.local
   ```

2. Fill in your Sanity credentials in `.env.local`:
   ```env
   NEXT_PUBLIC_SANITY_PROJECT_ID=your_project_id_here
   NEXT_PUBLIC_SANITY_DATASET=production
   SANITY_API_TOKEN=your_api_token_here
   ```

## Step 4: Deploy Sanity Schemas

Once you've created the schemas (Tasks 2.1-2.4), deploy them to Sanity:

```bash
npm run sanity:deploy
```

This will make your schemas available in Sanity Studio.

## Step 5: Run Sanity Studio (Optional)

To manage your data through Sanity Studio:

```bash
npm run sanity
```

This will start Sanity Studio at `http://localhost:3333`

## Step 6: Setup Clerk (for authentication)

1. Go to [https://dashboard.clerk.com](https://dashboard.clerk.com)
2. Create a new application
3. Copy your **Publishable Key** and **Secret Key**
4. Add them to `.env.local`:
   ```env
   NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=your_publishable_key_here
   CLERK_SECRET_KEY=your_secret_key_here
   ```

## Step 7: Configure Clerk Webhooks

1. In Clerk Dashboard, go to **Webhooks**
2. Click "Add Endpoint"
3. Enter your webhook URL: `https://your-domain.com/api/webhooks/clerk`
   - For local development, use a tool like [ngrok](https://ngrok.com/) to expose your local server
4. Select events to listen to:
   - `user.created`
   - `user.updated`
   - `user.deleted`
5. Copy the **Signing Secret** and add to `.env.local`:
   ```env
   CLERK_WEBHOOK_SECRET=your_webhook_secret_here
   ```

## Verification

To verify your setup is working:

1. Start the development server:
   ```bash
   npm run dev
   ```

2. Check that environment variables are loaded correctly
3. Try creating a test user in Clerk
4. Verify the webhook creates a user document in Sanity

## Troubleshooting

### "Project ID not found"
- Make sure `NEXT_PUBLIC_SANITY_PROJECT_ID` is set correctly in `.env.local`
- Restart your development server after changing environment variables

### "Unauthorized" errors
- Verify your `SANITY_API_TOKEN` has Editor permissions
- Check that the token hasn't expired

### Webhooks not working
- Ensure your webhook URL is publicly accessible
- Verify the `CLERK_WEBHOOK_SECRET` matches the one in Clerk Dashboard
- Check webhook logs in Clerk Dashboard for error details

## Next Steps

After completing the setup:
1. Continue with Task 2: Define Sanity Schemas
2. Implement the API routes
3. Test the integration end-to-end
