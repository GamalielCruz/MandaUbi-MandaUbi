# MandaUbi Deployment Guide

## Prerequisites
- GitHub account (already set up ✓)
- Vercel account (free tier works perfectly)
- Sanity project (already configured ✓)

## Quick Deploy to Vercel

### Option 1: Deploy via Vercel Dashboard (Recommended)

1. **Go to Vercel**
   - Visit https://vercel.com
   - Sign in with your GitHub account

2. **Import Project**
   - Click "Add New..." → "Project"
   - Select your GitHub repository: `GamalielCruz/MandaUbi-MandaUbi`
   - Click "Import"

3. **Configure Environment Variables**
   Add these environment variables in Vercel:
   
   ```
   NEXT_PUBLIC_SANITY_PROJECT_ID=b0omcq87
   NEXT_PUBLIC_SANITY_DATASET=production
   SANITY_API_TOKEN=skgYGAITy4zgA04C9xs4cXtbSNmE3esWsRS0B1oOVIWnPUdJHb9jEfxF3bkHS7OcML2SXkuYIYL4yxIq66tVsRl9HC3GimQUrxw6SKl1f94ep0wPyYEbvhEf91So7sFdNzsTNp08XoOgLy293ysAES0MHqvxcXtcu8Da44XPitDCGb1W5f7M
   NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=pk_test_ZGFybGluZy1kb2xwaGluLTE0LmNsZXJrLmFjY291bnRzLmRldiQ
   CLERK_SECRET_KEY=sk_test_O6l6CFElIdnyJKWHNufNfP0ZXrbIEPfs4g24bNm2q1
   CLERK_WEBHOOK_SECRET=whsec_C96V5oG7MJnny3g02+klUkj+RpUimlHj
   ```

4. **Deploy**
   - Click "Deploy"
   - Wait 2-3 minutes for the build to complete
   - Your site will be live at `https://your-project.vercel.app`

### Option 2: Deploy via Vercel CLI

```bash
# Install Vercel CLI
npm i -g vercel

# Login to Vercel
vercel login

# Deploy
vercel

# Follow the prompts and add environment variables when asked
```

## Post-Deployment Steps

### 1. Update Clerk Webhook URL
After deployment, update your Clerk webhook:
- Go to https://dashboard.clerk.com
- Navigate to Webhooks
- Update the endpoint URL to: `https://your-vercel-domain.vercel.app/api/webhooks/clerk`

### 2. Test Your Invitation
Visit your invitation URL:
```
https://your-vercel-domain.vercel.app/invitation/bbb42af25697c0de03d7d34cf4825e09851c419335e21e633489bd15fcf97849
```

### 3. Deploy Sanity Studio (Optional)
If you want to host Sanity Studio separately:
```bash
npm run sanity:deploy
```
This will deploy your studio to: `https://your-project.sanity.studio`

## Custom Domain (Optional)

1. Go to your Vercel project settings
2. Navigate to "Domains"
3. Add your custom domain (e.g., `mandaubi.com`)
4. Follow DNS configuration instructions

## Environment Variables Reference

| Variable | Description | Required |
|----------|-------------|----------|
| `NEXT_PUBLIC_SANITY_PROJECT_ID` | Sanity project ID | Yes |
| `NEXT_PUBLIC_SANITY_DATASET` | Sanity dataset name | Yes |
| `SANITY_API_TOKEN` | Sanity API token with read/write access | Yes |
| `NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY` | Clerk publishable key | Yes |
| `CLERK_SECRET_KEY` | Clerk secret key | Yes |
| `CLERK_WEBHOOK_SECRET` | Clerk webhook secret | Yes |

## Troubleshooting

### Build Fails
- Check that all environment variables are set correctly
- Ensure Node.js version is 18.x or higher (Vercel uses 18.x by default)

### Images Not Loading
- Verify Sanity images are published
- Check that `cdn.sanity.io` is in `next.config.js` remotePatterns

### RSVP Not Working
- Verify Sanity API token has write permissions
- Check API route logs in Vercel dashboard

## Monitoring

- **Vercel Dashboard**: Monitor deployments, logs, and analytics
- **Sanity Studio**: Manage content at `http://localhost:3333` or your deployed studio URL

## Automatic Deployments

Every push to the `main` branch will automatically trigger a new deployment on Vercel.

## Support

For issues:
- Vercel: https://vercel.com/docs
- Sanity: https://www.sanity.io/docs
- Next.js: https://nextjs.org/docs
