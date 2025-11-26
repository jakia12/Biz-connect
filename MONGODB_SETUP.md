# Quick MongoDB Atlas Setup

## Step 1: Create MongoDB Atlas Account

1. Go to: https://www.mongodb.com/cloud/atlas/register
2. Sign up with email or Google
3. Complete verification

## Step 2: Create FREE Cluster

1. Click **"Build a Database"**
2. Choose **FREE** tier (M0 Sandbox) - $0/month
3. Cloud Provider: **AWS** (recommended)
4. Region: Choose closest to you (e.g., Singapore for Asia, Mumbai for India)
5. Cluster Name: Leave default or name it `bizconnect`
6. Click **"Create Cluster"** (takes 3-5 minutes)

## Step 3: Create Database User

1. You'll see a "Security Quickstart" popup
2. **Authentication Method**: Username and Password
3. **Username**: `bizconnect_admin` (or any name)
4. **Password**: Click "Autogenerate Secure Password" 
5. **COPY THE PASSWORD IMMEDIATELY** and save it somewhere safe!
6. Click **"Create User"**

## Step 4: Add IP Whitelist

1. Still in the popup, or go to **"Network Access"** in left sidebar
2. Click **"Add IP Address"**
3. Click **"Allow Access from Anywhere"**
   - This adds `0.0.0.0/0` (required for Vercel)
4. Click **"Confirm"**

## Step 5: Get Connection String

1. Go to **"Database"** in left sidebar
2. Click **"Connect"** button on your cluster
3. Choose **"Connect your application"**
4. **Driver**: Node.js
5. **Version**: 5.5 or later
6. **Copy the connection string** - looks like:
   ```
   mongodb+srv://<username>:<password>@cluster0.xxxxx.mongodb.net/?retryWrites=true&w=majority
   ```

## Step 6: Modify Connection String

Replace the placeholders:

**Original**:
```
mongodb+srv://<username>:<password>@cluster0.xxxxx.mongodb.net/?retryWrites=true&w=majority
```

**Modified** (example):
```
mongodb+srv://bizconnect_admin:YourPassword123@cluster0.abc123.mongodb.net/bizconnect?retryWrites=true&w=majority
```

Changes:
- Replace `<username>` with your actual username (e.g., `bizconnect_admin`)
- Replace `<password>` with your actual password
- Add `/bizconnect` after `.mongodb.net/` (this is your database name)

**Important**: 
- Remove the `<` and `>` brackets
- Keep the password exactly as generated (no spaces)
- If password has special characters like `@` or `/`, you may need to URL encode them

## Step 7: Test Connection (Optional)

Test locally first:

```bash
node -e "const mongoose = require('mongoose'); mongoose.connect('YOUR_CONNECTION_STRING_HERE').then(() => console.log('✅ Connected!')).catch(err => console.error('❌ Error:', err.message));"
```

Replace `YOUR_CONNECTION_STRING_HERE` with your actual connection string.

If you see `✅ Connected!`, it works!

## Step 8: Add to Vercel

1. Copy your final connection string
2. Go to Vercel Dashboard → Your Project
3. Settings → Environment Variables
4. Add `MONGODB_URI` with your connection string
5. Select all environments (Production, Preview, Development)
6. Save and redeploy

---

## Your Connection String Template

Fill this out:

```
mongodb+srv://[USERNAME]:[PASSWORD]@[CLUSTER-URL]/bizconnect?retryWrites=true&w=majority
```

Example:
```
mongodb+srv://bizconnect_admin:Xy9$mK2pQ@cluster0.abc123.mongodb.net/bizconnect?retryWrites=true&w=majority
```

**Save this connection string** - you'll need it for Vercel!

---

## Troubleshooting

### "Authentication failed"
- Wrong username or password
- Check if you copied the password correctly
- Try resetting the password in MongoDB Atlas

### "IP not whitelisted"
- Go to Network Access
- Make sure `0.0.0.0/0` is in the list
- Wait 1-2 minutes for changes to take effect

### "Cannot connect"
- Check your internet connection
- Verify the cluster is running (green status)
- Make sure connection string format is correct

---

## Quick Checklist

- [ ] MongoDB Atlas account created
- [ ] FREE cluster created (M0)
- [ ] Database user created
- [ ] Password saved securely
- [ ] IP whitelist set to 0.0.0.0/0
- [ ] Connection string copied
- [ ] Connection string modified (username, password, database name)
- [ ] Connection tested (optional)
- [ ] Added to Vercel as MONGODB_URI
- [ ] Redeployed Vercel app

Done! 🎉
