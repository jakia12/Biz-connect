# BizConnect Deployment Guide

This guide will help you deploy your BizConnect application to Vercel with MongoDB Atlas.

## Prerequisites

- Vercel account (free tier works fine)
- MongoDB Atlas account (free tier works fine)
- Your code pushed to GitHub

## Step 1: Set Up MongoDB Atlas

1. **Create a MongoDB Atlas Account**
   - Go to [https://www.mongodb.com/cloud/atlas](https://www.mongodb.com/cloud/atlas)
   - Sign up for a free account

2. **Create a New Cluster**
   - Click "Build a Database"
   - Choose the FREE tier (M0)
   - Select a cloud provider and region (choose one closest to your users)
   - Click "Create Cluster"

3. **Create a Database User**
   - Go to "Database Access" in the left sidebar
   - Click "Add New Database User"
   - Choose "Password" authentication
   - Enter a username and generate a secure password
   - **IMPORTANT**: Save this password - you'll need it for the connection string
   - Set user privileges to "Read and write to any database"
   - Click "Add User"

4. **Whitelist IP Addresses**
   - Go to "Network Access" in the left sidebar
   - Click "Add IP Address"
   - Click "Allow Access from Anywhere" (or add specific IPs)
   - Click "Confirm"

5. **Get Your Connection String**
   - Go to "Database" in the left sidebar
   - Click "Connect" on your cluster
   - Choose "Connect your application"
   - Copy the connection string
   - It will look like: `mongodb+srv://<username>:<password>@cluster0.xxxxx.mongodb.net/?retryWrites=true&w=majority`
   - Replace `<password>` with your actual database user password
   - Add your database name after `.net/`: `mongodb+srv://<username>:<password>@cluster0.xxxxx.mongodb.net/bizconnect?retryWrites=true&w=majority`

## Step 2: Deploy to Vercel

1. **Push Your Code to GitHub**
   ```bash
   git add .
   git commit -m "Add authentication system"
   git push origin main
   ```

2. **Import Project to Vercel**
   - Go to [https://vercel.com](https://vercel.com)
   - Click "Add New Project"
   - Import your GitHub repository
   - Vercel will auto-detect it's a Next.js app

3. **Configure Environment Variables**
   Before deploying, add these environment variables in Vercel:
   
   - `MONGODB_URI`: Your MongoDB Atlas connection string from Step 1
   - `NEXTAUTH_URL`: Your Vercel deployment URL (e.g., `https://your-app.vercel.app`)
   - `NEXTAUTH_SECRET`: Generate a secure random string (see below)

   **To generate NEXTAUTH_SECRET:**
   ```bash
   # On your local machine, run:
   openssl rand -base64 32
   ```
   Or use an online generator: https://generate-secret.vercel.app/32

4. **Deploy**
   - Click "Deploy"
   - Wait for the deployment to complete
   - Your app will be live at `https://your-app.vercel.app`

## Step 3: Update NEXTAUTH_URL

After your first deployment:

1. Copy your Vercel deployment URL
2. Go to Vercel Dashboard → Your Project → Settings → Environment Variables
3. Update `NEXTAUTH_URL` with your actual Vercel URL
4. Redeploy the application

## Step 4: Test Your Deployment

1. **Test Registration**
   - Go to `https://your-app.vercel.app/register`
   - Register as a buyer
   - Check MongoDB Atlas to verify the user was created

2. **Test Login**
   - Go to `https://your-app.vercel.app/login`
   - Login with your credentials
   - Verify you're redirected to the dashboard

3. **Test Seller Registration**
   - Register as a seller
   - Complete all 3 steps
   - Verify seller profile is created in MongoDB

## Troubleshooting

### "Invalid email or password" on login
- Check MongoDB Atlas connection string is correct
- Verify database user credentials
- Check Network Access allows connections from anywhere

### "Internal Server Error"
- Check Vercel logs: Dashboard → Your Project → Deployments → Click on deployment → View Function Logs
- Verify all environment variables are set correctly
- Ensure NEXTAUTH_SECRET is set

### Session not persisting
- Verify NEXTAUTH_URL matches your actual deployment URL
- Check that cookies are enabled in your browser
- Ensure NEXTAUTH_SECRET is the same across all deployments

### MongoDB connection issues
- Verify your IP is whitelisted in MongoDB Atlas
- Check connection string format is correct
- Ensure database user has proper permissions

## Environment Variables Summary

### Local Development (.env)
```
MONGODB_URI=mongodb://localhost:27017/bizconnect
NEXTAUTH_URL=http://localhost:3000
NEXTAUTH_SECRET=your-local-secret
```

### Production (Vercel)
```
MONGODB_URI=mongodb+srv://username:password@cluster.xxxxx.mongodb.net/bizconnect?retryWrites=true&w=majority
NEXTAUTH_URL=https://your-app.vercel.app
NEXTAUTH_SECRET=your-production-secret-from-openssl
```

## Next Steps

After successful deployment:

1. **Add Custom Domain** (Optional)
   - Go to Vercel Dashboard → Your Project → Settings → Domains
   - Add your custom domain
   - Update `NEXTAUTH_URL` to your custom domain

2. **Enable Email Verification** (Future enhancement)
   - Add email service (SendGrid, Resend, etc.)
   - Implement email verification flow

3. **Add Social Authentication** (Future enhancement)
   - Set up Google OAuth
   - Set up Facebook OAuth
   - Update NextAuth configuration

4. **Monitor Your Application**
   - Use Vercel Analytics
   - Set up error tracking (Sentry, etc.)
   - Monitor MongoDB Atlas metrics

## Support

If you encounter any issues:
- Check Vercel deployment logs
- Check MongoDB Atlas logs
- Review NextAuth documentation: https://next-auth.js.org
- Check MongoDB connection: https://www.mongodb.com/docs/atlas/

---

**Congratulations!** Your BizConnect application is now live with full authentication! 🎉
