# GitHub Setup & Version Control Guide

## Initial GitHub Setup (One Time)

### Step 1: Initialize Git (if not already done)
```bash
cd /Users/akwong/Git/startup-launchpad
git init
```

### Step 2: Create .gitignore (Already Done ✓)
Your project already has a `.gitignore` that prevents committing:
- node_modules/
- .env.local (your API keys - IMPORTANT!)
- .next/ build files
- data/ directory (signups)

### Step 3: Make Your First Commit
```bash
# Stage all files
git add .

# Commit
git commit -m "Initial commit: Startup Launchpad app"
```

### Step 4: Create GitHub Repository
1. Go to https://github.com/new
2. Repository name: `startup-launchpad`
3. Description: "Pre-seed founder toolkit with AI-powered landing page generator"
4. Keep it **Public** (for portfolio) or **Private**
5. **DO NOT** initialize with README (we already have one)
6. Click "Create repository"

### Step 5: Connect to GitHub
GitHub will show you commands. Use these:

```bash
# Add remote
git remote add origin https://github.com/YOUR-USERNAME/startup-launchpad.git

# Rename branch to main (if needed)
git branch -M main

# Push to GitHub
git push -u origin main
```

Replace `YOUR-USERNAME` with your actual GitHub username.

---

## Daily Workflow (After Initial Setup)

### Making Changes
```bash
# 1. Make your code changes
# 2. Test locally
npm run dev

# 3. Stage changes
git add .

# 4. Commit with descriptive message
git commit -m "Add feature: improved dashboard styling"

# 5. Push to GitHub
git push
```

### Checking Status
```bash
# See what files changed
git status

# See what changed in files
git diff

# See commit history
git log --oneline
```

---

## Vercel Auto-Deployment Setup

### Option 1: Connect via Vercel Dashboard
1. Go to https://vercel.com/new
2. Click "Import Project"
3. Select your GitHub repository
4. Vercel will ask for permission to access your repo
5. Add environment variable: `OPENAI_API_KEY`
6. Click "Deploy"

### Option 2: Use Vercel CLI
```bash
# Install Vercel CLI
npm i -g vercel

# Deploy (will prompt to connect to GitHub)
vercel

# Link to GitHub when asked
# Add OPENAI_API_KEY when prompted
```

### After Setup
Every `git push` to main branch will:
1. Trigger Vercel build
2. Run `npm run build`
3. Deploy to production
4. Update your live site

**Preview Deployments:**
- Pushes to other branches create preview URLs
- Perfect for testing before merging to main

---

## Important: Protecting Your API Key

### ✅ NEVER commit .env.local
Your `.gitignore` already prevents this, but double-check:

```bash
# This should show nothing (means it's ignored)
git status | grep .env.local
```

### ✅ Add API key to Vercel separately
1. Go to Vercel Dashboard
2. Your Project → Settings → Environment Variables
3. Add: `OPENAI_API_KEY` = `your_key`
4. Apply to: Production, Preview, Development

---

## Common Git Commands

```bash
# Create a new branch for a feature
git checkout -b feature/new-dashboard

# Switch back to main
git checkout main

# See all branches
git branch

# Pull latest changes (if working with others)
git pull

# Undo last commit (keep changes)
git reset --soft HEAD~1

# Discard all local changes (CAREFUL!)
git reset --hard HEAD
```

---

## Example Workflow

```bash
# Morning: Start new feature
git checkout -b feature/add-export

# Work on feature, test locally
npm run dev

# Afternoon: Commit progress
git add .
git commit -m "WIP: Add CSV export button"

# Evening: Finish feature
git add .
git commit -m "Complete CSV export feature"

# Push to GitHub
git push -u origin feature/add-export

# This creates a preview deployment on Vercel!

# When ready, merge to main:
git checkout main
git merge feature/add-export
git push

# This deploys to production!
```

---

## Vercel + GitHub Benefits

✅ **Automatic deployments** - No manual deployment needed  
✅ **Preview URLs** - Every branch gets a unique URL  
✅ **Instant rollbacks** - Revert to any previous deployment  
✅ **Zero downtime** - New version goes live seamlessly  
✅ **Environment variables** - Managed separately from code  

---

## Quick Reference

| Task | Command |
|------|---------|
| Check status | `git status` |
| Stage all changes | `git add .` |
| Commit | `git commit -m "message"` |
| Push to GitHub | `git push` |
| Create branch | `git checkout -b branch-name` |
| Switch branch | `git checkout branch-name` |
| See history | `git log --oneline` |

---

## Next Steps

1. **Now:** Push to GitHub (see Step 4-5 above)
2. **Then:** Connect Vercel to your GitHub repo
3. **Enjoy:** Automatic deployments on every push!

---

**Questions?** Check the main DEPLOYMENT.md guide!
