# Vercel Deployment Checklist

## Before Deploying

- [ ] You have a Vercel account (sign up at vercel.com)
- [ ] You have a MongoDB Atlas account and cluster created
- [ ] Your code is pushed to GitHub
- [ ] All files are committed (vercel.json, api/index.ts, etc.)

## Environment Variables You'll Need

Generate these values:

```bash
# Generate JWT_SECRET (copy the output)
openssl rand -hex 16

# Or on Windows PowerShell:
[Convert]::ToBase64String([System.Text.Encoding]::UTF8.GetBytes((1..32 | ForEach-Object {[char][int](Get-Random -Minimum 33 -Maximum 127)}) -join ''))
```

## Deployment Steps

1. **Create MongoDB Atlas Cluster**
   - [ ] Create M0 (free) cluster
   - [ ] Create database user with password
   - [ ] Get connection string: `mongodb+srv://user:pass@cluster...`
   - [ ] Make sure to replace `<password>` with actual password

2. **Push Code to GitHub**
   ```bash
   git add .
   git commit -m "chore: add Vercel deployment configuration"
   git push origin master
   ```
   - [ ] Verify files are on GitHub

3. **Deploy on Vercel**
   - [ ] Go to https://vercel.com/new
   - [ ] Connect GitHub repository
   - [ ] Vercel should auto-detect the configuration from vercel.json

4. **Add Environment Variables in Vercel**
   - [ ] Go to Project Settings → Environment Variables
   - [ ] Add these variables:

   | Name | Value |
   |------|-------|
   | `MONGODB_URI` | Your MongoDB connection string |
   | `CORS_ORIGIN` | `https://your-project.vercel.app` |
   | `JWT_SECRET` | Generated 32-char random string |
   | `ADMIN_EMAIL` | Your email address |
   | `ADMIN_PASSWORD` | Your secure password (8+ chars) |
   | `RESUME_PATH` | `/public/Jeet_Sharma_Resume.pdf` |
   | `NODE_ENV` | `production` |

   - [ ] All variables added and saved

5. **Redeploy After Adding Environment Variables**
   - [ ] Go to Deployments
   - [ ] Click latest deployment
   - [ ] Click "Redeploy"
   - [ ] Wait for build to complete ✅

6. **Test Your Deployment**
   - [ ] Visit https://your-project.vercel.app
   - [ ] Frontend loads correctly
   - [ ] Navigation works
   - [ ] Smooth scroll animations work
   - [ ] Try downloading resume (should capture lead)
   - [ ] Try submitting comment form
   - [ ] Try contacting form
   - [ ] Visit /admin and login with your credentials
   - [ ] Verify leads are captured
   - [ ] Verify events are tracked

## Your Deployment URL

Once deployed, your site will be at: **`https://your-project.vercel.app`**

- Frontend: `https://your-project.vercel.app`
- API: `https://your-project.vercel.app/api`
- Admin: `https://your-project.vercel.app/admin`

## Troubleshooting

**API returning 404?**
- Check `CORS_ORIGIN` env var matches your Vercel domain
- Verify MongoDB connection string is correct
- Check deployment logs in Vercel dashboard

**Resume download failing?**
- Verify file exists at `public/Jeet_Sharma_Resume.pdf`
- Check `RESUME_PATH` env var

**Admin login not working?**
- Check `ADMIN_EMAIL` and `ADMIN_PASSWORD` are set correctly
- Try logging out and back in
- Clear browser localStorage if stuck

**Build failing?**
- Check Vercel build logs for specific error
- Run `npm run build && cd server && npm run build` locally to test
- Ensure all dependencies are in package.json

## Files Modified for Deployment

- ✅ `vercel.json` - Deployment configuration
- ✅ `api/index.ts` - Serverless function entry point
- ✅ `server/package.json` - Added build script
- ✅ `vite.config.ts` - Updated for production
- ✅ `.env.example` - Added Vercel docs

## Next Steps After Deployment

1. **Add Custom Domain** (optional)
   - In Vercel Settings → Domains
   - Point your domain to Vercel
   - Update `CORS_ORIGIN` env var

2. **Enable GitHub Integration**
   - Automatic deployments on push
   - Preview deployments for PRs
   - Already configured by default

3. **Monitor Performance**
   - Use Vercel Analytics
   - Check deployment logs
   - Monitor MongoDB usage on Atlas

4. **Set Up Continuous Deployment**
   - Every push to `master` auto-deploys
   - No additional setup needed
