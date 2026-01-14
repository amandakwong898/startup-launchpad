# Deployment Guide 🚀

## Deploying to Vercel (Recommended)

### Step 1: Prepare Your Repository

1. Initialize git (if not already done):
```bash
git init
git add .
git commit -m "Initial commit: Startup Launchpad"
```

2. Create a GitHub repository and push:
```bash
git remote add origin https://github.com/yourusername/startup-launchpad.git
git branch -M main
git push -u origin main
```

### Step 2: Deploy to Vercel

#### Option A: Vercel CLI (Fastest)

1. Install Vercel CLI:
```bash
npm i -g vercel
```

2. Deploy:
```bash
vercel
```

3. Follow the prompts and add your environment variable when asked:
```
OPENAI_API_KEY=your_actual_key_here
```

#### Option B: Vercel Dashboard (Most Visual)

1. Go to [vercel.com](https://vercel.com) and sign in with GitHub
2. Click "New Project"
3. Import your GitHub repository
4. Configure:
   - Framework Preset: **Next.js** (auto-detected)
   - Root Directory: `./`
   - Build Command: `npm run build` (auto-detected)
   - Output Directory: `.next` (auto-detected)

5. Add Environment Variables:
   - Click "Environment Variables"
   - Add: `OPENAI_API_KEY` = `your_actual_key_here`
   - Apply to: Production, Preview, Development

6. Click "Deploy"
7. Wait 1-2 minutes for deployment to complete
8. Visit your live site! 🎉

### Step 3: Get Your OpenAI API Key

1. Go to [platform.openai.com](https://platform.openai.com)
2. Sign up or log in
3. Go to API Keys section
4. Click "Create new secret key"
5. Copy the key (you won't see it again!)
6. Add it to your Vercel environment variables

### Step 4: Test Your Deployment

1. Visit your deployed URL (e.g., `your-app.vercel.app`)
2. Navigate to `/generator`
3. Try the AI copy generation feature
4. Test the email signup on `/generator` preview
5. Check the `/dashboard` to see analytics

## Post-Deployment

### Custom Domain (Optional)

1. In Vercel dashboard, go to your project
2. Click "Settings" → "Domains"
3. Add your custom domain
4. Follow DNS configuration instructions
5. Wait for SSL certificate (automatic, ~1 minute)

### Monitoring

- **Analytics:** Enable Vercel Analytics in project settings
- **Logs:** View real-time logs in Vercel dashboard under "Deployments"
- **Performance:** Check Web Vitals in Vercel Analytics

### Continuous Deployment

Every push to your main branch will automatically deploy to production!

```bash
git add .
git commit -m "Update feature"
git push
```

Vercel will:
- Build your app
- Run tests
- Deploy to production
- Update your live site

## Troubleshooting

### Build Failures

If build fails, check:
1. All dependencies are in `package.json`
2. TypeScript errors are resolved locally
3. Environment variables are set correctly

### API Routes Not Working

1. Ensure environment variables are set in Vercel
2. Check function logs in Vercel dashboard
3. Verify OpenAI API key is valid and has credits

### Data Not Persisting

File-based storage (JSON) works on Vercel but resets on each deployment.
For production, consider upgrading to a database:
- Vercel Postgres
- Supabase
- MongoDB Atlas
- PlanetScale

## Upgrading

### Add a Database

When you outgrow file storage:

1. Choose a provider (Vercel Postgres is easiest)
2. Update `/app/api/signup/route.ts` to use database
3. Add database connection string to env vars
4. Redeploy

### Add Authentication

Protect your dashboard:

1. Install NextAuth.js:
```bash
npm install next-auth
```

2. Add authentication to `/app/dashboard`
3. Configure providers (GitHub, Google, etc.)

## Support

- **Next.js Docs:** [nextjs.org/docs](https://nextjs.org/docs)
- **Vercel Docs:** [vercel.com/docs](https://vercel.com/docs)
- **Vercel Support:** [vercel.com/support](https://vercel.com/support)

---

Happy launching! 🚀
