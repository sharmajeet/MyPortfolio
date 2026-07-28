# Quick Start: Deploy to Vercel in 5 Minutes

Your project is ready for Vercel deployment! Here's exactly what to do:

## Step 1: Generate Required Values

Open a terminal and run:

```bash
# Generate a secure JWT_SECRET (32 characters)
openssl rand -hex 16
```

Save the output - you'll need it in Step 3.

## Step 2: Set Up MongoDB Atlas (Free)

1. Go to https://www.mongodb.com/cloud/atlas
2. Sign up for free
3. Create a new project
4. Create a free M0 cluster
5. Create a database user:
   - Username: `portfolio`
   - Password: `<create a strong password>`
6. Get your connection string:
   - Click "Connect" on your cluster
   - Choose "Drivers"
   - Copy the connection string, it looks like:
   ```
   mongodb+srv://portfolio:<password>@cluster0.xxxxx.mongodb.net/?retryWrites=true&w=majority
   ```
   - Replace `<password>` with your actual password
   - Replace `/?` with `/portfolio?` (add database name)
   - **Final string should look like:**
   ```
   mongodb+srv://portfolio:mypassword@cluster0.xxxxx.mongodb.net/portfolio?retryWrites=true&w=majority
   ```

## Step 3: Deploy to Vercel

1. Go to https://vercel.com/new
2. Click **"Import Git Repository"**
3. Search for and select **`MyPortfolio`** (or your repo name)
4. Click **"Import"**

5. In the "Configure Project" page:
   - Build Command: `npm run build` (should be auto-filled)
   - Output Directory: `dist` (should be auto-filled)
   - Install Command: `npm install && cd server && npm install` (should be auto-filled)

6. Click **"Environment Variables"** and add these 7 variables:

   ```
   MONGODB_URI: mongodb+srv://portfolio:mypassword@cluster0.xxxxx.mongodb.net/portfolio?retryWrites=true&w=majority
   
   CORS_ORIGIN: https://your-project.vercel.app
   
   JWT_SECRET: (paste the value from Step 1 - the 32 char string)
   
   ADMIN_EMAIL: your-email@gmail.com
   
   ADMIN_PASSWORD: MySecurePassword123
   
   RESUME_PATH: /public/Jeet_Sharma_Resume.pdf
   
   NODE_ENV: production
   ```

7. Click **"Deploy"**

8. Wait for deployment to complete (3-5 minutes)

## Step 4: Get Your Vercel URL

Once deployment completes, Vercel will show you your URL like:
```
https://my-portfolio-abc123.vercel.app
```

Update the `CORS_ORIGIN` variable:
1. Go to your Vercel project dashboard
2. Click **"Settings"** → **"Environment Variables"**
3. Edit `CORS_ORIGIN` to your actual URL (replace the placeholder)
4. Click **"Redeploy"** from the Deployments tab

## Step 5: Test It!

1. Visit `https://your-project.vercel.app` in your browser
2. Check that:
   - ✅ Home page loads with animations
   - ✅ Navigation works
   - ✅ Projects page shows your projects
   - ✅ Try downloading resume (fills out form)
   - ✅ Try submitting a comment
   - ✅ Visit `/admin` and login with your email/password

## That's It! 🎉

Your portfolio is now live on the internet with:
- ✅ Frontend (React + Vite) - hosted on Vercel
- ✅ Backend API (Express + MongoDB) - hosted on Vercel serverless functions
- ✅ Database (MongoDB Atlas) - cloud-hosted MongoDB
- ✅ Auto-deploy on every git push to master

## Troubleshooting Quick Tips

| Problem | Solution |
|---------|----------|
| API returning 404 | Check `CORS_ORIGIN` env var matches your Vercel URL |
| Resume download fails | Make sure PDF exists at `public/Jeet_Sharma_Resume.pdf` |
| Admin login not working | Verify `ADMIN_EMAIL` and `ADMIN_PASSWORD` env vars |
| Build failed | Check Vercel logs, or run `npm run build` locally |
| MongoDB connection timeout | Go to MongoDB Atlas → Network Access → Allow 0.0.0.0/0 |

## Environment Variables Explained

- **MONGODB_URI**: Connection to your database (from MongoDB Atlas)
- **CORS_ORIGIN**: Which domain can call your API (your Vercel domain)
- **JWT_SECRET**: Secret key for authentication (keep it random and long)
- **ADMIN_EMAIL / ADMIN_PASSWORD**: Your login credentials for the admin panel
- **RESUME_PATH**: Where your resume PDF is located
- **NODE_ENV**: Set to `production` for Vercel

## Next Steps

Once deployed:
- Custom domain? Add it in Vercel → Settings → Domains
- More help? Read `VERCEL_DEPLOYMENT.md` for detailed guide
- Issues? Check `DEPLOYMENT_CHECKLIST.md` for full troubleshooting

---

**Your deployment is ready!** Head to https://vercel.com/new and import your GitHub repo. 🚀
