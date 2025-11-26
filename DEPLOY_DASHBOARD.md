# 🚀 Deploy Backend to Vercel - Dashboard Method

## Prerequisites Checklist

Before you start, make sure you have:
- ✅ A Vercel account ([sign up here](https://vercel.com/signup))
- ✅ Your code pushed to GitHub/GitLab/Bitbucket
- ✅ MongoDB Atlas account ([sign up here](https://www.mongodb.com/cloud/atlas/register))

---

## Step 1: Set Up MongoDB Atlas (Your Production Database)

### 1.1 Create a Cluster

1. Go to [MongoDB Atlas](https://cloud.mongodb.com)
2. Click **"Build a Database"**
3. Choose **FREE** tier (M0 Sandbox)
4. Select **Cloud Provider**: AWS (recommended)
5. Select **Region**: Choose closest to your users (e.g., Singapore for Asia)
6. Click **"Create Cluster"** (takes 3-5 minutes)

### 1.2 Create Database User

1. In left sidebar, click **"Database Access"**
2. Click **"Add New Database User"**
3. Choose **"Password"** authentication method
4. Enter:
   - **Username**: `bizconnect_admin` (or any name you prefer)
   - **Password**: Click "Autogenerate Secure Password" and **COPY IT IMMEDIATELY**
5. Under "Database User Privileges", select **"Read and write to any database"**
6. Click **"Add User"**

> **⚠️ IMPORTANT**: Save your username and password somewhere safe! You'll need them in Step 3.

### 1.3 Allow Vercel to Connect

1. In left sidebar, click **"Network Access"**
2. Click **"Add IP Address"**
3. Click **"Allow Access from Anywhere"** (this allows Vercel to connect)
4. Click **"Confirm"**

### 1.4 Get Your Connection String

1. In left sidebar, click **"Database"**
2. Click **"Connect"** button on your cluster
3. Choose **"Connect your application"**
4. **Driver**: Node.js
5. **Version**: 5.5 or later
6. **Copy the connection string** - it looks like:
   ```
   mongodb+srv://<username>:<password>@cluster0.xxxxx.mongodb.net/?retryWrites=true&w=majority
   ```
7. **Modify the connection string**:
   - Replace `<username>` with your database username
   - Replace `<password>` with your database password
   - Add `/bizconnect` after `.net/` (this is your database name)
   
   **Final format**:
   ```
   mongodb+srv://bizconnect_admin:YOUR_PASSWORD@cluster0.xxxxx.mongodb.net/bizconnect?retryWrites=true&w=majority
   ```

8. **Save this connection string** - you'll need it in Step 3!

---

## Step 2: Push Your Code to Git

Make sure your latest code (including `vercel.json` and `middleware.js`) is pushed to GitHub:

```bash
git add .
git commit -m "Add backend deployment configuration"
git push origin main
```

---

## Step 3: Deploy to Vercel Dashboard

### 3.1 Create New Project

1. Go to [Vercel Dashboard](https://vercel.com/dashboard)
2. Click **"Add New..."** button (top right)
3. Select **"Project"**

### 3.2 Import Repository

1. **Select your Git provider** (GitHub/GitLab/Bitbucket)
2. If first time, click **"Install Vercel"** and authorize access
3. Find your **"biz-connect"** repository
4. Click **"Import"**

### 3.3 Configure Project Settings

You'll see a configuration screen:

**Project Name**:
- Enter: `biz-connect-backend` (or any name you prefer)
- This will be part of your URL: `biz-connect-backend.vercel.app`

**Framework Preset**:
- Should auto-detect as **"Next.js"** ✅
- If not, select "Next.js" from dropdown

**Root Directory**:
- Leave as **"./"** (default) ✅

**Build and Output Settings**:
- Leave all defaults ✅
- Build Command: `next build`
- Output Directory: `.next`
- Install Command: `npm install`

### 3.4 Add Environment Variables (CRITICAL!)

This is the most important step! Click **"Environment Variables"** section to expand it.

Add these **3 environment variables**:

#### Variable 1: MONGODB_URI

- **Name**: `MONGODB_URI`
- **Value**: Your MongoDB connection string from Step 1.4
  ```
  mongodb+srv://bizconnect_admin:YOUR_PASSWORD@cluster0.xxxxx.mongodb.net/bizconnect?retryWrites=true&w=majority
  ```
- **Environment**: Select all (Production, Preview, Development)
- Click **"Add"**

#### Variable 2: NEXTAUTH_SECRET

- **Name**: `NEXTAUTH_SECRET`
- **Value**: Generate a secure random string

**To generate the secret**, open a new terminal and run:
```bash
node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"
```

Copy the output (a long random string like `a1b2c3d4e5f6...`) and paste it as the value.

- **Environment**: Select all (Production, Preview, Development)
- Click **"Add"**

> **⚠️ SAVE THIS SECRET!** You'll need the exact same value for your frontend later.

#### Variable 3: NEXTAUTH_URL

- **Name**: `NEXTAUTH_URL`
- **Value**: `https://biz-connect-backend.vercel.app` (use your project name from 3.3)
- **Environment**: Production only
- Click **"Add"**

> **Note**: If you chose a different project name, use that instead. The format is: `https://YOUR-PROJECT-NAME.vercel.app`

### 3.5 Deploy!

1. Double-check all 3 environment variables are added
2. Click **"Deploy"** button
3. Wait 2-3 minutes for deployment to complete
4. You'll see a success screen with confetti 🎉

### 3.6 Copy Your Backend URL

1. On the success screen, you'll see your deployment URL
2. Click **"Visit"** or copy the URL (e.g., `https://biz-connect-backend.vercel.app`)
3. **Save this URL** - you'll need it for Step 4!

---

## Step 4: Update Frontend Configuration

Now you need to tell your frontend where the backend is.

### 4.1 Go to Your Frontend Project

1. In Vercel Dashboard, go to your **frontend project** (the one you deployed earlier)
2. Click on the project name

### 4.2 Add/Update Environment Variables

1. Click **"Settings"** tab
2. Click **"Environment Variables"** in left sidebar
3. Add or update these variables:

#### Update NEXTAUTH_URL (Frontend)

- **Name**: `NEXTAUTH_URL`
- **Value**: Your frontend URL (e.g., `https://biz-connect.vercel.app`)
- **Environment**: Production

#### Add NEXTAUTH_SECRET (Frontend)

- **Name**: `NEXTAUTH_SECRET`
- **Value**: **Use the EXACT SAME value** you used for the backend in Step 3.4
- **Environment**: Production, Preview, Development

#### Add API URL (if needed)

- **Name**: `NEXT_PUBLIC_API_URL`
- **Value**: Your backend URL (e.g., `https://biz-connect-backend.vercel.app`)
- **Environment**: Production, Preview, Development

### 4.3 Redeploy Frontend

1. Click **"Deployments"** tab
2. Find the latest deployment
3. Click the **"..."** menu (three dots)
4. Click **"Redeploy"**
5. Click **"Redeploy"** again to confirm
6. Wait for redeployment to complete

---

## Step 5: Update CORS Configuration

You need to update the `middleware.js` file with your actual frontend URL.

### 5.1 Update middleware.js locally

Open `middleware.js` and update the `allowedOrigins` array:

```javascript
const allowedOrigins = [
  'https://YOUR-ACTUAL-FRONTEND-URL.vercel.app', // Replace with your real frontend URL
  'http://localhost:3000', // Local development
];
```

### 5.2 Push and Redeploy

```bash
git add middleware.js
git commit -m "Update CORS allowed origins"
git push origin main
```

Vercel will automatically redeploy your backend.

---

## Step 6: Test Your Deployment

### 6.1 Test Backend API

Open your browser and go to:
```
https://your-backend-url.vercel.app/api/auth/register
```

You should see a response (not a 404 error).

### 6.2 Test Frontend

1. Go to your frontend URL
2. Try to register a new user
3. Check if it works without errors

### 6.3 Check Logs (if issues)

1. Go to your backend project in Vercel
2. Click **"Logs"** tab
3. Look for any error messages

---

## 🎉 Success Checklist

- [ ] MongoDB Atlas cluster created and running
- [ ] Database user created with password saved
- [ ] IP whitelist set to "Allow Access from Anywhere"
- [ ] MongoDB connection string saved
- [ ] Backend deployed to Vercel
- [ ] All 3 environment variables added to backend
- [ ] Backend deployment URL copied
- [ ] Frontend environment variables updated
- [ ] Frontend redeployed
- [ ] CORS middleware updated with real frontend URL
- [ ] Backend API responding (tested in browser)
- [ ] Registration works from frontend

---

## 🐛 Common Issues

### "Failed to connect to database"

**Check**:
1. MongoDB Atlas cluster is running (green status)
2. Connection string is correct (username, password, database name)
3. IP whitelist includes `0.0.0.0/0`
4. Environment variable `MONGODB_URI` is set in Vercel

**Fix**: Go to Vercel → Settings → Environment Variables → Edit `MONGODB_URI` → Redeploy

### "CORS error"

**Check**:
1. `middleware.js` has your actual frontend URL in `allowedOrigins`
2. Frontend URL doesn't have trailing slash

**Fix**: Update `middleware.js` → Push to Git → Vercel auto-redeploys

### "NextAuth callback URL mismatch"

**Check**:
1. Backend `NEXTAUTH_URL` = backend deployment URL
2. Frontend `NEXTAUTH_URL` = frontend deployment URL
3. Both have same `NEXTAUTH_SECRET`

**Fix**: Go to Vercel → Settings → Environment Variables → Verify all values → Redeploy

---

## 📝 Your Deployment Info (Fill This Out)

**MongoDB Atlas**:
- Cluster Name: `_________________`
- Database Name: `bizconnect`
- Username: `_________________`
- Password: `_________________` (keep secret!)
- Connection String: `_________________`

**Vercel Backend**:
- Project Name: `_________________`
- Deployment URL: `_________________`
- NEXTAUTH_SECRET: `_________________` (keep secret!)

**Vercel Frontend**:
- Project Name: `_________________`
- Deployment URL: `_________________`

---

## 🆘 Need Help?

If you get stuck:
1. Check the **Logs** tab in Vercel for error messages
2. Verify all environment variables are set correctly
3. Make sure MongoDB Atlas cluster is running
4. Check that CORS middleware has correct frontend URL

**Everything should work after following these steps!** 🚀
