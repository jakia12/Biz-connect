# 🚀 Deploy Backend to Vercel - CLI Method

## Why Use CLI?

- ⚡ **Faster**: Deploy in seconds from your terminal
- 🔧 **More Control**: See exactly what's happening
- 🔄 **Easier Updates**: Redeploy with one command
- 💻 **Developer-Friendly**: No need to leave your code editor

---

## Prerequisites

- ✅ MongoDB Atlas setup complete (see DEPLOY_DASHBOARD.md Step 1)
- ✅ Your MongoDB connection string ready
- ✅ Code committed to Git

---

## Step 1: Install Vercel CLI

Open your terminal and run:

```bash
npm install -g vercel
```

Wait for installation to complete (takes ~30 seconds).

---

## Step 2: Login to Vercel

```bash
vercel login
```

You'll see options:
- **Email**: Enter your email and check inbox for verification
- **GitHub/GitLab/Bitbucket**: Opens browser to authenticate

Choose your preferred method and complete authentication.

---

## Step 3: Deploy Your Backend

### 3.1 Navigate to Your Project

```bash
cd d:\apte_code_portfolio\biz-connect
```

### 3.2 Start Deployment

```bash
vercel
```

You'll see a series of prompts:

#### Prompt 1: Set up and deploy?
```
? Set up and deploy "d:\apte_code_portfolio\biz-connect"?
```
**Answer**: `Y` (press Enter)

#### Prompt 2: Which scope?
```
? Which scope do you want to deploy to?
```
**Answer**: Select your account (use arrow keys, press Enter)

#### Prompt 3: Link to existing project?
```
? Link to existing project?
```
**Answer**: `N` (we're creating a new backend project)

#### Prompt 4: What's your project's name?
```
? What's your project's name?
```
**Answer**: `biz-connect-backend` (or any name you prefer)

#### Prompt 5: In which directory is your code located?
```
? In which directory is your code located?
```
**Answer**: `./` (press Enter for default)

The CLI will:
- ✅ Detect Next.js framework
- ✅ Upload your code
- ✅ Build your project
- ✅ Deploy to a preview URL

You'll see output like:
```
🔗 Preview: https://biz-connect-backend-xxxxx.vercel.app
```

**This is a preview deployment, not production yet!**

---

## Step 4: Add Environment Variables

Now add your environment variables using the CLI:

### 4.1 Add MONGODB_URI

```bash
vercel env add MONGODB_URI
```

Prompts:
1. **What's the value?**: Paste your MongoDB connection string
   ```
   mongodb+srv://username:password@cluster0.xxxxx.mongodb.net/bizconnect?retryWrites=true&w=majority
   ```
2. **Add to which environments?**: Select **all** (Production, Preview, Development)
   - Use spacebar to select, Enter to confirm

### 4.2 Add NEXTAUTH_SECRET

First, generate a secure secret:

```bash
node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"
```

Copy the output, then:

```bash
vercel env add NEXTAUTH_SECRET
```

Prompts:
1. **What's the value?**: Paste the generated secret
2. **Add to which environments?**: Select **all**

**⚠️ SAVE THIS SECRET!** You'll need it for your frontend.

### 4.3 Add NEXTAUTH_URL

```bash
vercel env add NEXTAUTH_URL
```

Prompts:
1. **What's the value?**: `https://biz-connect-backend.vercel.app` (use your project name)
2. **Add to which environments?**: Select **Production** only

---

## Step 5: Deploy to Production

Now deploy to production with environment variables:

```bash
vercel --prod
```

This will:
- ✅ Build with production environment variables
- ✅ Deploy to your production URL
- ✅ Show your live URL

You'll see:
```
✅ Production: https://biz-connect-backend.vercel.app
```

**🎉 Your backend is now live!**

---

## Step 6: Update Frontend Environment Variables

### Option A: Using Vercel CLI (Recommended)

Navigate to your frontend project (if separate) or use the same project:

```bash
# Add NEXTAUTH_URL for frontend
vercel env add NEXTAUTH_URL production
# Value: https://your-frontend-url.vercel.app

# Add NEXTAUTH_SECRET for frontend (use SAME value as backend)
vercel env add NEXTAUTH_SECRET production
# Value: (paste the same secret from Step 4.2)

# Add API URL
vercel env add NEXT_PUBLIC_API_URL production
# Value: https://biz-connect-backend.vercel.app
```

Then redeploy frontend:
```bash
vercel --prod
```

### Option B: Using Dashboard

1. Go to [Vercel Dashboard](https://vercel.com/dashboard)
2. Select your frontend project
3. Settings → Environment Variables
4. Add the variables as described in DEPLOY_DASHBOARD.md Step 4

---

## Step 7: Update CORS and Redeploy

Update `middleware.js` with your actual frontend URL:

```javascript
const allowedOrigins = [
  'https://your-actual-frontend.vercel.app', // Replace with real URL
  'http://localhost:3000',
];
```

Then commit and redeploy:

```bash
git add middleware.js
git commit -m "Update CORS allowed origins"
git push origin main
vercel --prod
```

---

## 🎯 Quick Reference Commands

### Deploy to Preview
```bash
vercel
```

### Deploy to Production
```bash
vercel --prod
```

### View Environment Variables
```bash
vercel env ls
```

### Remove Environment Variable
```bash
vercel env rm VARIABLE_NAME
```

### View Deployment Logs
```bash
vercel logs
```

### View Project Info
```bash
vercel inspect
```

### Pull Environment Variables Locally
```bash
vercel env pull
```

---

## 🔄 Future Deployments

After initial setup, deploying updates is super easy:

1. Make your code changes
2. Commit to Git:
   ```bash
   git add .
   git commit -m "Your changes"
   git push origin main
   ```
3. Deploy:
   ```bash
   vercel --prod
   ```

That's it! 🚀

---

## 🆘 Troubleshooting

### "Command not found: vercel"

**Fix**: Reinstall globally
```bash
npm install -g vercel
```

If still not working (Windows):
```bash
npm config get prefix
```
Add that path to your system PATH environment variable.

### "Error: No token found"

**Fix**: Login again
```bash
vercel logout
vercel login
```

### "Build failed"

**Fix**: Check logs
```bash
vercel logs
```

Look for specific error messages and fix them locally first.

### "Environment variables not working"

**Fix**: Verify they're set
```bash
vercel env ls
```

If missing, add them again with `vercel env add`.

---

## ✅ CLI Deployment Checklist

- [ ] Vercel CLI installed (`npm install -g vercel`)
- [ ] Logged in to Vercel (`vercel login`)
- [ ] Deployed to preview (`vercel`)
- [ ] Added MONGODB_URI (`vercel env add MONGODB_URI`)
- [ ] Added NEXTAUTH_SECRET (`vercel env add NEXTAUTH_SECRET`)
- [ ] Added NEXTAUTH_URL (`vercel env add NEXTAUTH_URL`)
- [ ] Deployed to production (`vercel --prod`)
- [ ] Production URL copied
- [ ] Frontend environment variables updated
- [ ] CORS middleware updated with real frontend URL
- [ ] Backend tested and working

---

## 🎉 Advantages of CLI

✅ **Speed**: Deploy in 30 seconds vs 5 minutes on dashboard  
✅ **Automation**: Can be scripted for CI/CD  
✅ **Logs**: Instant access to deployment logs  
✅ **Control**: See exactly what's being deployed  
✅ **Efficiency**: No context switching from terminal  

**You made the right choice!** 🚀
