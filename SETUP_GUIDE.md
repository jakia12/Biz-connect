# BizConnect Setup Guide

This guide will help you fix the `CLIENT_FETCH_ERROR` and other common errors in your BizConnect application.

## 🔴 Common Error: CLIENT_FETCH_ERROR

This error occurs when NextAuth cannot connect to its API endpoint. This is typically caused by:

1. Missing or incorrect environment variables
2. Database connection issues
3. Incorrect NextAuth configuration

## ✅ Step-by-Step Fix

### Step 1: Create Your `.env` File

1. Copy the `.env.example` file to create a new `.env` file:
   ```bash
   cp .env.example .env
   ```

2. Or create it manually in the root directory with the following content:

```env
# MongoDB Connection
MONGODB_URI=mongodb://localhost:27017/bizconnect

# NextAuth Configuration
NEXTAUTH_URL=http://localhost:3000
NEXTAUTH_SECRET=your-secret-key-here
```

### Step 2: Generate a Secure NEXTAUTH_SECRET

You need a secure random string for `NEXTAUTH_SECRET`. Choose one method:

**Option A: Using Node.js (Recommended)**
```bash
node -e "console.log(require('crypto').randomBytes(32).toString('base64'))"
```

**Option B: Using PowerShell (Windows)**
```powershell
node scripts/generate-secret.js
```

**Option C: Using OpenSSL (Mac/Linux)**
```bash
openssl rand -base64 32
```

Copy the generated string and replace `your-secret-key-here` in your `.env` file.

### Step 3: Set Up MongoDB

You have two options:

**Option A: Local MongoDB**
1. Install MongoDB locally: https://www.mongodb.com/try/download/community
2. Start MongoDB service
3. Use this connection string in `.env`:
   ```
   MONGODB_URI=mongodb://localhost:27017/bizconnect
   ```

**Option B: MongoDB Atlas (Cloud - Recommended)**
1. Create a free account at https://www.mongodb.com/cloud/atlas
2. Create a new cluster
3. Get your connection string
4. Update `.env` with your connection string:
   ```
   MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/bizconnect?retryWrites=true&w=majority
   ```

### Step 4: Verify Your `.env` File

Your `.env` file should look like this (with your actual values):

```env
# MongoDB Connection
MONGODB_URI=mongodb://localhost:27017/bizconnect

# NextAuth Configuration
NEXTAUTH_URL=http://localhost:3000
NEXTAUTH_SECRET=Xy9kP2mN8vQ5rT1wE4uI7oA3sD6fG9hJ2kL5nM8pR1tY4wE7qA0sD3fG6hJ9k
```

### Step 5: Restart Your Development Server

1. Stop the current dev server (Ctrl+C in terminal)
2. Clear Next.js cache:
   ```bash
   rm -rf .next
   ```
   Or on Windows PowerShell:
   ```powershell
   Remove-Item -Recurse -Force .next
   ```
3. Start the dev server again:
   ```bash
   npm run dev
   ```

## 🔍 Troubleshooting

### Error: "MONGODB_URI is not defined"
- Make sure your `.env` file is in the root directory (same level as `package.json`)
- Restart your dev server after creating/editing `.env`

### Error: "MongoServerError: Authentication failed"
- Check your MongoDB connection string
- Verify username and password are correct
- Make sure your IP is whitelisted in MongoDB Atlas

### Error: "CLIENT_FETCH_ERROR" persists
1. Clear browser cache and cookies
2. Check browser console for more details
3. Verify `NEXTAUTH_URL` matches your current URL
4. Make sure `NEXTAUTH_SECRET` is set and not empty

### Error: "Session is null" or "User not authenticated"
- Make sure you've registered a user account
- Try logging out and logging in again
- Check if cookies are enabled in your browser

## 📝 Additional Configuration

### For Production (Vercel/Netlify)

Add these environment variables in your hosting platform:

```env
MONGODB_URI=your-mongodb-atlas-connection-string
NEXTAUTH_URL=https://your-domain.com
NEXTAUTH_SECRET=your-production-secret-key
```

### For Development with HTTPS

If you need HTTPS in development:

```env
NEXTAUTH_URL=https://localhost:3000
```

## 🚀 Next Steps

After fixing the errors:

1. Create a test user account at `/register`
2. Log in at `/login`
3. Access the dashboard at `/dashboard`

## 📚 Additional Resources

- [NextAuth.js Documentation](https://next-auth.js.org/)
- [MongoDB Atlas Setup](https://www.mongodb.com/docs/atlas/getting-started/)
- [Next.js Environment Variables](https://nextjs.org/docs/basic-features/environment-variables)

## ❓ Still Having Issues?

If you're still experiencing errors:

1. Check the terminal output for specific error messages
2. Check the browser console (F12) for client-side errors
3. Verify all dependencies are installed: `npm install`
4. Try deleting `node_modules` and reinstalling: 
   ```bash
   rm -rf node_modules package-lock.json
   npm install
   ```
