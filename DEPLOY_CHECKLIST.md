# Deployment Checklist ✅

## Pre-Deployment
- [x] Build passes locally (`npm run build`)
- [x] Code pushed to GitHub
- [x] Environment variables documented
- [x] Deployment guide created

## Deploy to Vercel

### Step 1: Import Project
1. Go to https://vercel.com/new
2. Click "Import Git Repository"
3. Select `GamalielCruz/MandaUbi-MandaUbi`
4. Click "Import"

### Step 2: Configure Project
- **Framework Preset**: Next.js (auto-detected)
- **Root Directory**: `./` (default)
- **Build Command**: `npm run build` (default)
- **Output Directory**: `.next` (default)

### Step 3: Add Environment Variables
Copy these from your `.env.local`:

```
NEXT_PUBLIC_SANITY_PROJECT_ID=b0omcq87
NEXT_PUBLIC_SANITY_DATASET=production
SANITY_API_TOKEN=skgYGAITy4zgA04C9xs4cXtbSNmE3esWsRS0B1oOVIWnPUdJHb9jEfxF3bkHS7OcML2SXkuYIYL4yxIq66tVsRl9HC3GimQUrxw6SKl1f94ep0wPyYEbvhEf91So7sFdNzsTNp08XoOgLy293ysAES0MHqvxcXtcu8Da44XPitDCGb1W5f7M
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=pk_test_ZGFybGluZy1kb2xwaGluLTE0LmNsZXJrLmFjY291bnRzLmRldiQ
CLERK_SECRET_KEY=sk_test_O6l6CFElIdnyJKWHNufNfP0ZXrbIEPfs4g24bNm2q1
CLERK_WEBHOOK_SECRET=whsec_C96V5oG7MJnny3g02+klUkj+RpUimlHj
```

### Step 4: Deploy
1. Click "Deploy"
2. Wait 2-3 minutes for build to complete
3. Your site will be live at `https://your-project-name.vercel.app`

## Post-Deployment

### Test Your Invitation
Visit: `https://your-domain.vercel.app/invitation/bbb42af25697c0de03d7d34cf4825e09851c419335e21e633489bd15fcf97849`

Expected result: Diego's birthday invitation should load with:
- ✅ Countdown timer
- ✅ Event details
- ✅ Location with Google Maps button
- ✅ Gallery
- ✅ RSVP form
- ✅ Background music player
- ✅ Confetti effects

### Update Clerk Webhook (if using auth features)
1. Go to https://dashboard.clerk.com
2. Navigate to Webhooks
3. Update endpoint URL to: `https://your-domain.vercel.app/api/webhooks/clerk`

### Access Sanity Studio
- Local: `http://localhost:3333`
- Or deploy separately: `npm run sanity:deploy`

## Troubleshooting

### Build Fails
- Check Vercel build logs
- Verify all environment variables are set
- Ensure Node.js version is 18.x or higher

### Images Not Loading
- Verify Sanity images are published
- Check `next.config.js` has `cdn.sanity.io` in remotePatterns

### RSVP Not Working
- Verify Sanity API token has write permissions
- Check API route logs in Vercel dashboard

## Automatic Deployments
Every push to `main` branch will automatically trigger a new deployment.

## Custom Domain (Optional)
1. Go to Vercel project settings
2. Navigate to "Domains"
3. Add your custom domain
4. Follow DNS configuration instructions

## Monitoring
- **Vercel Dashboard**: https://vercel.com/dashboard
- **Sanity Studio**: http://localhost:3333 or your deployed URL
- **GitHub Repo**: https://github.com/GamalielCruz/MandaUbi-MandaUbi

## Support
- Vercel Docs: https://vercel.com/docs
- Next.js Docs: https://nextjs.org/docs
- Sanity Docs: https://www.sanity.io/docs

---

**Ready to deploy!** 🚀
