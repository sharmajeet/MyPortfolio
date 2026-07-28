# Vercel Deployment Guide

This document explains how to deploy both the frontend and backend to Vercel.

## Architecture

- **Frontend**: React + Vite → Deployed as static site
- **Backend**: Express.js + MongoDB → Deployed as Vercel Serverless Functions at `/api`
- **Database**: MongoDB Atlas (cloud-hosted MongoDB)

## Prerequisites

1. **Vercel Account**: Sign up at https://vercel.com
2. **MongoDB Atlas Account**: Sign up at https://www.mongodb.com/cloud/atlas
3. **Git Repository**: Push your code to GitHub (Vercel integrates with GitHub)

## Step 1: Set Up MongoDB Atlas

1. Go to https://www.mongodb.com/cloud/atlas
2. Create a free cluster (M0 tier is free)
3. Create a database user and password
4. Get the connection string (looks like: `mongodb+srv://username:password@cluster.mongodb.net/portfolio?retryWrites=true&w=majority`)
5. **Note**: Replace `<password>` in the connection string with your database password

## Step 2: Prepare Your GitHub Repository

```bash
# Make sure you're on master branch
git checkout master

# Add and commit the new Vercel files
git add vercel.json api/index.ts server/package.json .env.example
git commit -m "chore: add Vercel deployment configuration"

# Push to GitHub
git push origin master
```

## Step 3: Deploy to Vercel

### Option A: Using Vercel Dashboard (Recommended)

1. Go to https://vercel.com/new
2. Click "Import Git Repository"
3. Select your GitHub repository
4. In the "Configure Project" section:
   - **Build Command**: Keep default (uses `vercel.json`)
   - **Output Directory**: Keep default (`dist`)
   - **Install Command**: Keep default
5. Click "Environment Variables" and add these variables:
   ```
   MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/portfolio?retryWrites=true&w=majority
   CORS_ORIGIN=https://your-project.vercel.app
   JWT_SECRET=<generate-a-random-32-character-string>
   ADMIN_EMAIL=your-email@example.com
   ADMIN_PASSWORD=<create-a-secure-password-8+ characters>
   RESUME_PATH=/public/Jeet_Sharma_Resume.pdf
   ```
6. Click "Deploy"

### Option B: Using Vercel CLI

```bash
# Install Vercel CLI globally
npm i -g vercel

# Deploy
vercel
# Follow the prompts, then add environment variables:
vercel env add MONGODB_URI
vercel env add CORS_ORIGIN
vercel env add JWT_SECRET
# ... add all env vars from Step 3 above
```

## Step 4: Configure Environment Variables in Vercel

After deployment, go to your Vercel project dashboard:

1. Click "Settings" → "Environment Variables"
2. Add all required variables for production:

| Variable | Value | Notes |
|----------|-------|-------|
| `MONGODB_URI` | Your MongoDB connection string | From MongoDB Atlas |
| `CORS_ORIGIN` | `https://your-project.vercel.app` | Get the URL from Vercel |
| `JWT_SECRET` | Random 32+ character string | Generate one: `openssl rand -hex 16` |
| `ADMIN_EMAIL` | Your email | For admin login |
| `ADMIN_PASSWORD` | Strong password (8+ chars) | For admin login |
| `RESUME_PATH` | `/public/Jeet_Sharma_Resume.pdf` | Path to your resume PDF |
| `NODE_ENV` | `production` | Set this to production |

3. After adding environment variables, redeploy:
   - Go to "Deployments"
   - Click the latest deployment
   - Click "Redeploy"

## Step 5: Update Frontend API URL (if needed)

If your backend is on a different domain:

1. Go to Vercel project settings
2. Click "Environment Variables"
3. Add frontend env var:
   ```
   VITE_API_URL=https://your-project.vercel.app
   ```
4. Redeploy

## Step 6: Test Your Deployment

1. Visit `https://your-project.vercel.app` in your browser
2. Test the frontend features:
   - Navigation works
   - Smooth scrolling works
   - Projects page loads
3. Test the backend:
   - Try downloading resume (requires leading to be captured)
   - Try submitting a comment
   - Try the contact form
4. Check admin panel at `/admin`:
   - Login with credentials set in env vars
   - Verify you can see leads/comments/events

## Step 7: Troubleshooting

### API calls returning 404
- Check that `CORS_ORIGIN` matches your Vercel domain
- Verify MongoDB connection string is correct
- Check `JWT_SECRET` is at least 16 characters

### Resume download not working
- Ensure `RESUME_PATH` points to correct file
- Check that PDF exists at `public/Jeet_Sharma_Resume.pdf`

### Admin login failing
- Verify `ADMIN_EMAIL` and `ADMIN_PASSWORD` are set
- Try resetting them in Vercel env vars and redeploying

### MongoDB connection timeout
- Check MongoDB Atlas firewall rules allow Vercel IPs (or allow all: 0.0.0.0/0)
- Verify connection string includes correct credentials

### Build failures
- Check Vercel deployment logs for specific errors
- Ensure all dependencies are installed locally and committed
- Run `npm run build` locally to test the build

## Continuous Deployment

Once configured, Vercel will automatically:
- Redeploy on every push to `master` branch
- Create preview deployments for pull requests
- Run build and test commands automatically

## Environment Variables Reference

**Frontend (.env or Vercel env vars prefixed with `VITE_`):**
- `VITE_API_URL`: Base URL for API calls (e.g., `https://your-project.vercel.app`)

**Backend (Vercel env vars):**
- `MONGODB_URI`: MongoDB connection string (required)
- `CORS_ORIGIN`: Comma-separated list of allowed origins (required)
- `JWT_SECRET`: Secret key for JWT signing, min 16 chars (required)
- `JWT_EXPIRES_IN`: JWT token expiry in seconds (default: 604800 = 7 days)
- `ADMIN_EMAIL`: Email for admin login (optional)
- `ADMIN_PASSWORD`: Password for admin login, min 8 chars (optional)
- `RESUME_PATH`: Path to resume PDF (required)
- `TRUST_PROXY`: Proxy trust level (default: 1)
- `NODE_ENV`: Environment (set to `production`)

## Useful Links

- [Vercel Documentation](https://vercel.com/docs)
- [MongoDB Atlas](https://www.mongodb.com/cloud/atlas)
- [Vercel Environment Variables](https://vercel.com/docs/projects/environment-variables)
