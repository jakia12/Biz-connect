# 🚀 Deploy Full-Stack App to Vercel (Frontend + Backend Together)

## Overview

Since your Next.js app has both frontend pages AND backend API routes in the same codebase, you can deploy everything together as **ONE project**. This is actually **simpler and recommended** for Next.js apps!

**Your current structure**:
```
biz-connect/
├── app/
│   ├── page.js           ← Frontend pages
│   ├── register/         ← Frontend pages
│   └── api/              ← Backend API routes
│       └── auth/
│           ├── register/route.js
│           └── [...nextauth]/route.js
├── components/           ← Frontend components
├── backend/              ← Backend utilities
└── package.json
```

**Deployment**: Deploy as **ONE Vercel project** ✅

---

## Prerequisites

- ✅ Vercel account
- ✅ MongoDB Atlas account
- ✅ Code pushed to GitHub

---

## Method 1: Dashboard Deployment (Recommended for First Time)

### Step 1: Set Up MongoDB Atlas

Follow the same MongoDB setup from `DEPLOY_DASHBOARD.md` Step 1:
1. Create cluster (FREE tier)
2. Create database user
3. Allow access from anywhere (0.0.0.0/0)
4. Get connection string

**Save your connection string**:
```
mongodb+srv://username:password@cluster0.xxxxx.mongodb.net/bizconnect?retryWrites=true&w=majority
```

---

### Step 2: Push Code to GitHub

```bash
git add .
git commit -m "Prepare for deployment"
git push origin main
```

---

### Step 3: Deploy to Vercel

1. Go to [Vercel Dashboard](https://vercel.com/dashboard)
2. Click **"Add New..."** → **"Project"**
3. Select your Git provider and import **"biz-connect"** repository
4. Click **"Import"**

#### Configure Project:

**Project Name**: `biz-connect` (or any name)

**Framework Preset**: Next.js (auto-detected) ✅

**Root Directory**: `./` (default) ✅

**Build Settings**: Leave defaults ✅

#### Add Environment Variables:

Click **"Environment Variables"** and add:

| Name | Value | Environment |
|------|-------|-------------|
| `MONGODB_URI` | Your MongoDB connection string | All |
| `NEXTAUTH_SECRET` | Generate with command below | All |
| `NEXTAUTH_URL` | `https://biz-connect.vercel.app` | Production |

**Generate NEXTAUTH_SECRET**:
```bash
node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"
```

> **Important**: For `NEXTAUTH_URL`, use your actual deployment URL. If you chose a different project name, use that (e.g., `https://your-project-name.vercel.app`)

5. Click **"Deploy"**
6. Wait 2-3 minutes ⏳
7. Success! 🎉

---

### Step 4: Update NEXTAUTH_URL (After First Deployment)

After your first deployment, you'll get your actual URL. You need to update `NEXTAUTH_URL`:

1. Copy your deployment URL (e.g., `https://biz-connect-abc123.vercel.app`)
2. Go to **Settings** → **Environment Variables**
3. Edit `NEXTAUTH_URL` and update with your actual URL
4. Go to **Deployments** → Click **"..."** → **"Redeploy"**

---

### Step 5: Update CORS Middleware

Update `middleware.js` with your actual deployment URL:

```javascript
const allowedOrigins = [
  'https://biz-connect-abc123.vercel.app', // Your actual Vercel URL
  'http://localhost:3000', // Local development
];
```

Push changes:
```bash
git add middleware.js
git commit -m "Update CORS for production"
git push origin main
```

Vercel will auto-deploy! ✅

---

## Method 2: CLI Deployment (Faster)

### Step 1: Install Vercel CLI

```bash
npm install -g vercel
```

### Step 2: Login

```bash
vercel login
```

### Step 3: Deploy

```bash
cd d:\apte_code_portfolio\biz-connect
vercel
```

Answer prompts:
- Set up and deploy? **Y**
- Which scope? **Select your account**
- Link to existing project? **N**
- Project name? **biz-connect**
- In which directory? **./`** (press Enter)

### Step 4: Add Environment Variables

```bash
# Add MongoDB URI
vercel env add MONGODB_URI
# Paste your connection string when prompted
# Select: Production, Preview, Development

# Generate and add NEXTAUTH_SECRET
node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"
# Copy the output, then:
vercel env add NEXTAUTH_SECRET
# Paste the secret
# Select: Production, Preview, Development

# Add NEXTAUTH_URL
vercel env add NEXTAUTH_URL
# Enter: https://biz-connect.vercel.app (or your project name)
# Select: Production only
```

### Step 5: Deploy to Production

```bash
vercel --prod
```

Copy your production URL! 🎉

### Step 6: Update NEXTAUTH_URL

If your actual URL is different from what you entered:

```bash
vercel env rm NEXTAUTH_URL production
vercel env add NEXTAUTH_URL production
# Enter your actual production URL
vercel --prod
```

### Step 7: Update CORS

Update `middleware.js` with your production URL, then:

```bash
git add middleware.js
git commit -m "Update CORS for production"
git push origin main
vercel --prod
```

---

## Configuration Files Explained

### vercel.json (Already Created)

```json
{
  "version": 2,
  "builds": [
    {
      "src": "package.json",
      "use": "@vercel/next"
    }
  ],
  "routes": [
    {
      "src": "/api/(.*)",
      "dest": "/api/$1"
    }
  ]
}
```

This ensures API routes work correctly.

### middleware.js (Already Created)

Handles CORS for API requests. Update `allowedOrigins` with your production URL.

---

## Environment Variables Summary

For a **single deployment** (frontend + backend together):

| Variable | Value | Purpose |
|----------|-------|---------|
| `MONGODB_URI` | MongoDB connection string | Database connection |
| `NEXTAUTH_SECRET` | Random 32-byte hex string | Authentication security |
| `NEXTAUTH_URL` | Your Vercel deployment URL | NextAuth callbacks |

**That's it!** Only 3 environment variables needed.

---

## Testing Your Deployment

### Test Frontend:
Visit: `https://your-app.vercel.app`

### Test Backend API:
Visit: `https://your-app.vercel.app/api/auth/register`

Should see a response (not 404).

### Test Full Flow:
1. Go to your app
2. Click "Register"
3. Fill out the form
4. Submit
5. Should register successfully! ✅

---

## Advantages of Single Deployment

✅ **Simpler**: Only one project to manage  
✅ **Faster**: No CORS issues between domains  
✅ **Cheaper**: One deployment instead of two  
✅ **Easier**: Fewer environment variables  
✅ **Better DX**: Frontend and backend always in sync  

---

## When to Deploy Separately?

Only deploy separately if:
- ❌ You have a separate backend codebase (Express, FastAPI, etc.)
- ❌ You need different scaling for frontend vs backend
- ❌ You have multiple frontends using the same backend

**For Next.js with API routes (your case)**: Deploy together! ✅

---

## Updating Your Deployment

### For Code Changes:

```bash
git add .
git commit -m "Your changes"
git push origin main
```

Vercel auto-deploys on push! 🚀

### For Environment Variable Changes:

**Dashboard**:
1. Go to Settings → Environment Variables
2. Edit the variable
3. Redeploy from Deployments tab

**CLI**:
```bash
vercel env rm VARIABLE_NAME production
vercel env add VARIABLE_NAME production
vercel --prod
```

---

## Troubleshooting

### "Failed to connect to database"

**Fix**:
1. Check MongoDB Atlas is running
2. Verify `MONGODB_URI` in Vercel settings
3. Check IP whitelist (0.0.0.0/0)
4. Redeploy

### "NextAuth error"

**Fix**:
1. Verify `NEXTAUTH_URL` matches your actual deployment URL
2. Check `NEXTAUTH_SECRET` is set
3. Clear browser cookies
4. Try again

### "API returns 404"

**Fix**:
1. Check `vercel.json` exists in project root
2. Verify API routes are in `app/api/` directory
3. Check Vercel logs for errors

---

## 🎉 Success Checklist

- [ ] MongoDB Atlas cluster created
- [ ] Database user created
- [ ] IP whitelist configured (0.0.0.0/0)
- [ ] Code pushed to GitHub
- [ ] Deployed to Vercel (dashboard or CLI)
- [ ] All 3 environment variables added
- [ ] `NEXTAUTH_URL` updated with actual deployment URL
- [ ] CORS middleware updated with production URL
- [ ] Frontend loads successfully
- [ ] API routes respond (test /api/auth/register)
- [ ] Registration works end-to-end

---

## Quick Commands Reference

```bash
# Deploy to preview
vercel

# Deploy to production
vercel --prod

# View logs
vercel logs

# List environment variables
vercel env ls

# Pull env vars locally
vercel env pull

# View deployment info
vercel inspect
```

---

## 🎯 Recommended Workflow

1. **First deployment**: Use dashboard (visual, easier to understand)
2. **Future updates**: Use CLI or just push to Git (auto-deploys)
3. **Environment changes**: Use dashboard (easier to manage)

---

**That's it! Your full-stack Next.js app is now deployed on Vercel!** 🚀

No need for separate deployments. Everything works together seamlessly.
