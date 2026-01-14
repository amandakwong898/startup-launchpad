# Quick Reference Card 📋

## 🚀 Getting Started (5 Minutes)

```bash
# 1. Install dependencies
npm install

# 2. Create environment file
echo "OPENAI_API_KEY=your_key_here" > .env.local

# 3. Start development server
npm run dev

# 4. Open browser
# Visit: http://localhost:3000
```

---

## 📁 File Structure

```
app/
├── page.tsx                    # Home page
├── generator/page.tsx          # Landing page creator
├── dashboard/page.tsx          # Analytics
└── api/
    ├── signup/route.ts        # Email API
    └── generate-copy/route.ts # AI API
```

---

## 🔗 Routes

| Page | URL | Purpose |
|------|-----|---------|
| Home | `/` | Marketing & navigation |
| Generator | `/generator` | Create landing pages |
| Dashboard | `/dashboard` | View analytics |
| Signup API | `/api/signup` | POST/GET email signups |
| AI API | `/api/generate-copy` | POST for AI copy |

---

## 🛠️ Key Technologies

- **Framework**: Next.js 14 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **Icons**: Lucide React
- **AI**: OpenAI GPT-3.5-turbo
- **Deployment**: Vercel
- **Storage**: JSON files (upgradable to DB)

---

## 🔑 Environment Variables

```bash
# .env.local (development)
OPENAI_API_KEY=sk-...

# Vercel (production)
# Add via: Settings → Environment Variables
OPENAI_API_KEY=sk-...
```

---

## 📝 Common Commands

```bash
npm run dev          # Start dev server (localhost:3000)
npm run build        # Build for production
npm run start        # Run production build
npm run lint         # Check for errors
```

---

## 🌐 Deploy to Vercel

```bash
# Option 1: CLI
npm i -g vercel
vercel

# Option 2: GitHub
# 1. Push to GitHub
# 2. Import to Vercel
# 3. Add OPENAI_API_KEY env var
# 4. Deploy!
```

---

## 🎨 Color Palette

```css
Primary: #6366f1 (Indigo)
Secondary: #a855f7 (Purple)
Success: #10b981 (Green)
Accent: #ec4899 (Pink)
Background: #f8fafc (Light) / #0a0a0a (Dark)
```

---

## 📊 API Endpoints

### Signup
```typescript
// POST /api/signup
{
  email: string;
  source: string;
}

// GET /api/signup
{
  signups: Signup[];
}
```

### Generate Copy
```typescript
// POST /api/generate-copy
{
  companyName: string;
  field: 'headline' | 'description';
}

// Response
{
  text: string;
}
```

---

## 🐛 Debugging

```bash
# Check build locally
npm run build

# View API logs (Vercel)
# Dashboard → Deployments → Function Logs

# Check file storage
cat data/signups.json
```

---

## 📈 Upgrade Paths

1. **Add Database**: Vercel Postgres, Supabase
2. **Add Auth**: NextAuth.js
3. **Add Email**: Resend, SendGrid
4. **Add Analytics**: Vercel Analytics, PostHog
5. **Add Payments**: Stripe

---

## 💡 Pro Tips

✅ Use `git push` to auto-deploy  
✅ Test locally before deploying  
✅ Keep dependencies updated  
✅ Monitor OpenAI API costs  
✅ Add rate limiting before scaling  
✅ Back up signups regularly  

---

## 📚 Documentation

- **Architecture**: `ARCHITECTURE.md`
- **Deployment**: `DEPLOYMENT.md`
- **Checklist**: `CHECKLIST.md`
- **Main README**: `README.md`

---

## 🆘 Troubleshooting

| Issue | Solution |
|-------|----------|
| Build fails | Check `npm run build` locally |
| AI not working | Verify OPENAI_API_KEY is set |
| Data resets | Normal with file storage, use DB |
| Slow page load | Check Vercel Analytics |

---

## 🎯 Key Features

✨ AI-powered copy generation  
📧 Email signup collection  
📊 Real-time analytics  
🎨 Dark mode support  
📱 Fully responsive  
⚡ Blazing fast performance  

---

**Need more info?** Read the full documentation in the project root! 🚀
