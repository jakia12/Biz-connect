# 🚀 Deployment Configuration Checklist

Your app is deployed at: **https://biz-connect-2k5u.vercel.app**

## ✅ Current Status

- [x] Frontend deployed and working
- [x] CORS middleware updated with production URL
- [ ] Environment variables configured in Vercel
- [ ] MongoDB Atlas set up
- [ ] Backend API tested

---

## 🔧 Next Steps to Complete Setup

### Step 1: Configure Environment Variables in Vercel

You need to add these environment variables to your Vercel project:

1. **Go to Vercel Dashboard**:
   - Visit: https://vercel.com/dashboard
   - Find your project: `biz-connect-2k5u`
   - Click on it

2. **Add Environment Variables**:
   - Click **"Settings"** tab
   - Click **"Environment Variables"** in left sidebar
   - Add these 3 variables:

#### Variable 1: MONGODB_URI

- **Name**: `MONGODB_URI`
- **Value**: Your MongoDB Atlas connection string
  ```
  mongodb+srv://username:password@cluster0.xxxxx.mongodb.net/bizconnect?retryWrites=true&w=majority
  ```
- **Environment**: Production, Preview, Development (select all)
- Click **"Save"**

> **Don't have MongoDB Atlas yet?** See Step 2 below.

#### Variable 2: NEXTAUTH_SECRET

- **Name**: `NEXTAUTH_SECRET`
- **Value**: Generate a secure random string

**To generate**, run this in your terminal:
```bash
node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"
```

Copy the output and paste it as the value.

- **Environment**: Production, Preview, Development (select all)
- Click **"Save"**

> **⚠️ IMPORTANT**: Save this secret somewhere safe!

#### Variable 3: NEXTAUTH_URL

- **Name**: `NEXTAUTH_URL`
- **Value**: `https://biz-connect-2k5u.vercel.app`
- **Environment**: Production
- Click **"Save"**

3. **Redeploy**:
   - Go to **"Deployments"** tab
   - Click **"..."** on the latest deployment
   - Click **"Redeploy"**
   - Wait for redeployment to complete

---

### Step 2: Set Up MongoDB Atlas (If Not Done Yet)

If you haven't set up MongoDB Atlas yet:

1. **Create Account**: https://www.mongodb.com/cloud/atlas/register

2. **Create Cluster**:
   - Click "Build a Database"
   - Choose FREE tier (M0)
   - Select region closest to you
   - Click "Create Cluster"

3. **Create Database User**:
   - Go to "Database Access"
   - Click "Add New Database User"
   - Username: `bizconnect_admin`
   - Password: Auto-generate and **SAVE IT**
   - Privileges: "Read and write to any database"
   - Click "Add User"

4. **Allow Vercel Access**:
   - Go to "Network Access"
   - Click "Add IP Address"
   - Click "Allow Access from Anywhere" (0.0.0.0/0)
   - Click "Confirm"

5. **Get Connection String**:
   - Go to "Database"
   - Click "Connect" on your cluster
   - Choose "Connect your application"
   - Copy the connection string
   - Replace `<username>` with your username
   - Replace `<password>` with your password
   - Add `/bizconnect` after `.net/`
   
   Final format:
   ```
   mongodb+srv://bizconnect_admin:YOUR_PASSWORD@cluster0.xxxxx.mongodb.net/bizconnect?retryWrites=true&w=majority
   ```

6. **Add to Vercel**: Use this connection string for `MONGODB_URI` in Step 1 above.

---

### Step 3: Push Updated CORS Configuration

The `middleware.js` file has been updated with your production URL. Now push it:

```bash
git add middleware.js
git commit -m "Update CORS for production deployment"
git push origin main
```

Vercel will automatically redeploy with the updated CORS settings.

---

### Step 4: Test Your Deployment

After completing Steps 1-3:

#### Test 1: Homepage
Visit: https://biz-connect-2k5u.vercel.app
- Should load without errors ✅

#### Test 2: Registration
1. Go to: https://biz-connect-2k5u.vercel.app/register
2. Fill out the registration form
3. Submit
4. Should register successfully (check for success message)

#### Test 3: Check Logs (if issues)
1. Go to Vercel Dashboard → Your Project
2. Click "Logs" tab
3. Look for any error messages

---

## 📋 Environment Variables Summary

Here's what you need in Vercel:

| Variable | Value | Purpose |
|----------|-------|---------|
| `MONGODB_URI` | `mongodb+srv://...` | Database connection |
| `NEXTAUTH_SECRET` | Random 32-byte hex | Authentication security |
| `NEXTAUTH_URL` | `https://biz-connect-2k5u.vercel.app` | NextAuth callbacks |

---

## 🐛 Troubleshooting

### "Failed to connect to database"

**Cause**: MongoDB not configured or wrong connection string

**Fix**:
1. Verify MongoDB Atlas cluster is running
2. Check `MONGODB_URI` in Vercel settings
3. Verify IP whitelist includes 0.0.0.0/0
4. Redeploy after fixing

### "NextAuth error" or "Callback URL mismatch"

**Cause**: `NEXTAUTH_URL` not set or incorrect

**Fix**:
1. Go to Vercel → Settings → Environment Variables
2. Verify `NEXTAUTH_URL` is `https://biz-connect-2k5u.vercel.app`
3. Verify `NEXTAUTH_SECRET` is set
4. Redeploy

### "Registration not working"

**Cause**: Missing environment variables

**Fix**:
1. Check all 3 environment variables are set in Vercel
2. Check Vercel logs for specific errors
3. Redeploy after adding variables

---

## ✅ Final Checklist

- [ ] MongoDB Atlas cluster created
- [ ] Database user created with password saved
- [ ] IP whitelist configured (0.0.0.0/0)
- [ ] MongoDB connection string obtained
- [ ] `MONGODB_URI` added to Vercel
- [ ] `NEXTAUTH_SECRET` generated and added to Vercel
- [ ] `NEXTAUTH_URL` set to `https://biz-connect-2k5u.vercel.app`
- [ ] Redeployed after adding environment variables
- [ ] `middleware.js` updated with production URL
- [ ] Changes pushed to GitHub
- [ ] Homepage loads successfully
- [ ] Registration tested and working

---

## 🎉 Once Complete

Your full-stack app will be fully functional at:
**https://biz-connect-2k5u.vercel.app**

Both frontend and backend will work seamlessly together!

---

## 📞 Quick Links

- **Your App**: https://biz-connect-2k5u.vercel.app
- **Vercel Dashboard**: https://vercel.com/dashboard
- **MongoDB Atlas**: https://cloud.mongodb.com

---

## 🔄 Future Updates

To update your app:

1. Make changes locally
2. Test with `npm run dev`
3. Commit and push:
   ```bash
   git add .
   git commit -m "Your changes"
   git push origin main
   ```
4. Vercel auto-deploys! 🚀

No need to manually redeploy unless you change environment variables.
