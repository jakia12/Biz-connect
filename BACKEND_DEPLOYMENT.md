# Backend Deployment Guide for Vercel

This guide provides step-by-step instructions to deploy your BizConnect backend (API routes) separately on Vercel while keeping your frontend deployment independent.

## 🎯 Overview

Your Next.js app uses API routes located in the `app/api` directory. Since you've already deployed the frontend, we'll configure Vercel to deploy only the backend API routes as a separate project.

## 📋 Prerequisites

- ✅ Frontend already deployed on Vercel
- ✅ MongoDB Atlas account (for production database)
- ✅ Git repository with your code
- ✅ Vercel account

---

## 🚀 Step-by-Step Deployment

### Step 1: Set Up MongoDB Atlas (Production Database)

1. **Go to [MongoDB Atlas](https://www.mongodb.com/cloud/atlas)**
2. **Create a new cluster** (if you haven't already):
   - Click "Build a Database"
   - Choose FREE tier (M0)
   - Select a cloud provider and region (choose closest to your users)
   - Click "Create Cluster"

3. **Create Database User**:
   - Go to "Database Access" in left sidebar
   - Click "Add New Database User"
   - Choose "Password" authentication
   - Create username and strong password (SAVE THESE!)
   - Set user privileges to "Read and write to any database"
   - Click "Add User"

4. **Whitelist IP Addresses**:
   - Go to "Network Access" in left sidebar
   - Click "Add IP Address"
   - Click "Allow Access from Anywhere" (for Vercel)
   - Click "Confirm"

5. **Get Connection String**:
   - Go to "Database" in left sidebar
   - Click "Connect" on your cluster
   - Choose "Connect your application"
   - Copy the connection string (looks like: `mongodb+srv://username:<password>@cluster0.xxxxx.mongodb.net/?retryWrites=true&w=majority`)
   - Replace `<password>` with your actual database user password
   - Add your database name after `.net/`: `mongodb+srv://username:password@cluster0.xxxxx.mongodb.net/bizconnect?retryWrites=true&w=majority`

---

### Step 2: Create Vercel Configuration for Backend

Create a `vercel.json` file in your project root:

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
  ],
  "env": {
    "MONGODB_URI": "@mongodb-uri",
    "NEXTAUTH_SECRET": "@nextauth-secret",
    "NEXTAUTH_URL": "@nextauth-url"
  }
}
```

---

### Step 3: Prepare Your Project for Backend Deployment

1. **Update your `.gitignore`** (make sure these are included):
   ```
   .env
   .env.local
   node_modules/
   .next/
   ```

2. **Commit your changes**:
   ```bash
   git add .
   git commit -m "Add backend deployment configuration"
   git push origin main
   ```

---

### Step 4: Deploy Backend to Vercel

#### Option A: Deploy via Vercel Dashboard (Recommended)

1. **Go to [Vercel Dashboard](https://vercel.com/dashboard)**

2. **Click "Add New..." → "Project"**

3. **Import Your Repository**:
   - Select your Git provider (GitHub/GitLab/Bitbucket)
   - Find and select your `biz-connect` repository
   - Click "Import"

4. **Configure Project**:
   - **Project Name**: `biz-connect-backend` (or any name you prefer)
   - **Framework Preset**: Next.js (auto-detected)
   - **Root Directory**: `./` (keep as is)
   - **Build Command**: `next build` (default)
   - **Output Directory**: `.next` (default)

5. **Add Environment Variables** (CRITICAL STEP):
   Click "Environment Variables" and add these:

   | Name | Value |
   |------|-------|
   | `MONGODB_URI` | Your MongoDB Atlas connection string from Step 1 |
   | `NEXTAUTH_SECRET` | Generate a secure random string (see below) |
   | `NEXTAUTH_URL` | Your backend deployment URL (e.g., `https://biz-connect-backend.vercel.app`) |

   **To generate NEXTAUTH_SECRET**, run this in your terminal:
   ```bash
   node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"
   ```

6. **Click "Deploy"**

7. **Wait for deployment** (usually 2-3 minutes)

8. **Copy your backend URL** (e.g., `https://biz-connect-backend.vercel.app`)

#### Option B: Deploy via Vercel CLI

1. **Install Vercel CLI**:
   ```bash
   npm i -g vercel
   ```

2. **Login to Vercel**:
   ```bash
   vercel login
   ```

3. **Deploy**:
   ```bash
   vercel
   ```

4. **Follow the prompts**:
   - Set up and deploy? `Y`
   - Which scope? (Select your account)
   - Link to existing project? `N`
   - Project name? `biz-connect-backend`
   - In which directory is your code located? `./`

5. **Add environment variables**:
   ```bash
   vercel env add MONGODB_URI
   vercel env add NEXTAUTH_SECRET
   vercel env add NEXTAUTH_URL
   ```

6. **Deploy to production**:
   ```bash
   vercel --prod
   ```

---

### Step 5: Update Frontend to Use Backend API

Now that your backend is deployed, update your frontend to point to the backend API.

1. **Go to your frontend Vercel project settings**

2. **Add/Update Environment Variables**:
   - `NEXT_PUBLIC_API_URL`: Your backend URL (e.g., `https://biz-connect-backend.vercel.app`)
   - `NEXTAUTH_URL`: Your frontend URL (e.g., `https://biz-connect.vercel.app`)
   - `NEXTAUTH_SECRET`: Same secret as backend

3. **Redeploy your frontend**:
   - Go to Deployments tab
   - Click "..." on latest deployment
   - Click "Redeploy"

---

### Step 6: Configure CORS (If Needed)

If your frontend and backend are on different domains, you need to configure CORS.

Create `middleware.js` in your project root:

```javascript
import { NextResponse } from 'next/server';

export function middleware(request) {
  const response = NextResponse.next();

  // Get the origin from the request
  const origin = request.headers.get('origin');
  
  // List of allowed origins (your frontend URLs)
  const allowedOrigins = [
    'https://biz-connect.vercel.app', // Your production frontend
    'https://your-frontend-preview.vercel.app', // Preview deployments
    'http://localhost:3000' // Local development
  ];

  // Check if the origin is allowed
  if (origin && allowedOrigins.includes(origin)) {
    response.headers.set('Access-Control-Allow-Origin', origin);
  }

  response.headers.set('Access-Control-Allow-Credentials', 'true');
  response.headers.set('Access-Control-Allow-Methods', 'GET,DELETE,PATCH,POST,PUT');
  response.headers.set(
    'Access-Control-Allow-Headers',
    'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version'
  );

  return response;
}

// Apply middleware to API routes only
export const config = {
  matcher: '/api/:path*',
};
```

---

### Step 7: Test Your Deployment

1. **Test API endpoints**:
   ```bash
   curl https://your-backend-url.vercel.app/api/auth/register
   ```

2. **Test from frontend**:
   - Visit your frontend URL
   - Try registering a new user
   - Check if authentication works

3. **Check Vercel logs**:
   - Go to your backend project in Vercel
   - Click "Logs" tab
   - Monitor for any errors

---

## 🔧 Environment Variables Reference

### Backend Environment Variables

| Variable | Description | Example |
|----------|-------------|---------|
| `MONGODB_URI` | MongoDB connection string | `mongodb+srv://user:pass@cluster.mongodb.net/bizconnect` |
| `NEXTAUTH_SECRET` | Secret for NextAuth.js | `your-generated-secret-key` |
| `NEXTAUTH_URL` | Backend deployment URL | `https://biz-connect-backend.vercel.app` |

### Frontend Environment Variables

| Variable | Description | Example |
|----------|-------------|---------|
| `NEXT_PUBLIC_API_URL` | Backend API URL | `https://biz-connect-backend.vercel.app` |
| `NEXTAUTH_URL` | Frontend deployment URL | `https://biz-connect.vercel.app` |
| `NEXTAUTH_SECRET` | Same as backend secret | `your-generated-secret-key` |

---

## 🐛 Troubleshooting

### Issue: "Failed to connect to database"

**Solution**:
- Verify MongoDB Atlas IP whitelist includes `0.0.0.0/0`
- Check connection string is correct
- Ensure database user has correct permissions
- Check Vercel logs for specific error

### Issue: "CORS error when calling API"

**Solution**:
- Add `middleware.js` as shown in Step 6
- Verify frontend URL is in allowed origins
- Redeploy backend after adding middleware

### Issue: "NextAuth callback URL mismatch"

**Solution**:
- Ensure `NEXTAUTH_URL` matches your actual deployment URL
- Check both frontend and backend have correct `NEXTAUTH_URL`
- Clear browser cookies and try again

### Issue: "Environment variables not working"

**Solution**:
- Go to Vercel project settings → Environment Variables
- Ensure all variables are set for "Production"
- Redeploy after adding/updating variables

### Issue: "API routes return 404"

**Solution**:
- Verify `vercel.json` is in project root
- Check API routes are in `app/api` directory
- Ensure routes follow Next.js App Router conventions

---

## 📊 Monitoring Your Backend

1. **Vercel Analytics**:
   - Go to your project → Analytics tab
   - Monitor API response times and errors

2. **Vercel Logs**:
   - Go to your project → Logs tab
   - Filter by "Errors" to see issues
   - Use search to find specific requests

3. **MongoDB Atlas Monitoring**:
   - Go to your cluster → Metrics tab
   - Monitor database connections and queries
   - Set up alerts for high usage

---

## 🔄 Updating Your Backend

### For Code Changes:

1. Make changes locally
2. Test locally: `npm run dev`
3. Commit and push:
   ```bash
   git add .
   git commit -m "Update API routes"
   git push origin main
   ```
4. Vercel auto-deploys on push

### For Environment Variable Changes:

1. Go to Vercel project → Settings → Environment Variables
2. Update the variable
3. Redeploy from Deployments tab

---

## ✅ Post-Deployment Checklist

- [ ] MongoDB Atlas cluster is running
- [ ] Database user created with correct permissions
- [ ] IP whitelist configured (0.0.0.0/0 for Vercel)
- [ ] Backend deployed to Vercel
- [ ] All environment variables set correctly
- [ ] Frontend updated with backend URL
- [ ] CORS configured (if needed)
- [ ] Test registration endpoint
- [ ] Test authentication flow
- [ ] Monitor logs for errors
- [ ] Set up MongoDB Atlas alerts

---

## 🎉 Success!

Your backend should now be deployed and working! If you encounter any issues, check the troubleshooting section or Vercel logs for specific error messages.

**Important URLs to Save**:
- Frontend: `https://your-frontend.vercel.app`
- Backend: `https://your-backend.vercel.app`
- MongoDB Atlas: `https://cloud.mongodb.com`

---

## 📞 Need Help?

- [Vercel Documentation](https://vercel.com/docs)
- [Next.js API Routes](https://nextjs.org/docs/app/building-your-application/routing/route-handlers)
- [MongoDB Atlas Docs](https://docs.atlas.mongodb.com/)
- [NextAuth.js Docs](https://next-auth.js.org/)
