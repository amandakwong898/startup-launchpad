# Startup Launchpad 🚀

A beautiful, minimalist toolkit for pre-seed founders to launch their startup ideas quickly and elegantly.

## Features

✨ **AI-Powered Landing Page Generator** - Create compelling copy with OpenAI assistance  
📧 **Email Signup Collection** - Capture early signups with a simple, conversion-optimized form  
📊 **Analytics Dashboard** - Track signups, sources, and growth metrics at a glance  
🎨 **Elegant Design** - Modern, minimalist UI with smooth animations and dark mode support  
⚡ **Built for Speed** - Next.js 14 with App Router for optimal performance  
🌐 **Deploy to Vercel** - One-click deployment with zero configuration

## Getting Started

### Prerequisites

- Node.js 18+ installed
- An OpenAI API key (for AI copy generation)

### Installation

1. Clone the repository:
```bash
git clone https://github.com/yourusername/startup-launchpad.git
cd startup-launchpad
```

2. Install dependencies:
```bash
npm install
```

3. Set up environment variables:
```bash
cp .env.local.example .env.local
```

Edit `.env.local` and add your OpenAI API key:
```
OPENAI_API_KEY=your_openai_api_key_here
```

4. Run the development server:
```bash
npm run dev
```

5. Open [http://localhost:3000](http://localhost:3000) in your browser.

## Deployment to Vercel

### Quick Deploy

1. Push your code to GitHub
2. Go to [Vercel](https://vercel.com) and sign in
3. Click "New Project" and import your repository
4. Add your environment variables:
   - `OPENAI_API_KEY`: Your OpenAI API key
5. Click "Deploy"

That's it! Your app will be live in seconds.

### Environment Variables

Make sure to add these in your Vercel project settings:

- `OPENAI_API_KEY` - Your OpenAI API key for generating copy suggestions

## Project Structure

```
startup-launchpad/
├── app/
│   ├── api/
│   │   ├── generate-copy/     # OpenAI integration for copy generation
│   │   └── signup/             # Email signup API with file storage
│   ├── dashboard/              # Analytics dashboard page
│   ├── generator/              # Landing page generator page
│   ├── globals.css             # Global styles
│   ├── layout.tsx              # Root layout component
│   └── page.tsx                # Home page
├── data/                       # JSON file storage for signups
├── public/                     # Static assets
├── .env.local                  # Environment variables (not in git)
├── next.config.mjs             # Next.js configuration
├── tailwind.config.ts          # Tailwind CSS configuration
├── tsconfig.json               # TypeScript configuration
└── vercel.json                 # Vercel deployment configuration
```

## Tech Stack

- **Framework:** Next.js 14 (App Router)
- **Language:** TypeScript
- **Styling:** Tailwind CSS
- **Icons:** Lucide React
- **AI:** OpenAI GPT-3.5-turbo
- **Deployment:** Vercel
- **Storage:** File-based JSON (simple and effective for early stage)

## Features in Detail

### 1. Landing Page Generator
- Form-based interface for inputting company info
- AI-powered headline and description generation
- Live preview of your landing page
- Copy generated HTML code with one click
- Responsive design that works on all devices

### 2. Email Signup API
- RESTful API endpoint at `/api/signup`
- Validates email format
- Prevents duplicate signups
- Stores data in JSON file (easily upgradeable to database)
- Tracks signup source for attribution

### 3. Analytics Dashboard
- Real-time signup tracking
- Stats: total signups, today, this week, sources
- Sortable table of all signups
- Beautiful data visualization
- Responsive design

### 4. AI Copy Generation
- OpenAI GPT-3.5-turbo integration
- Generates compelling headlines and descriptions
- Context-aware based on company name
- Fast and cost-effective

## Why This Stack?

- **Next.js:** Best-in-class React framework with excellent developer experience
- **Vercel:** Zero-config deployment, automatic HTTPS, global CDN
- **Tailwind CSS:** Rapid UI development with utility-first approach
- **TypeScript:** Type safety and better developer experience
- **File Storage:** Simple, no database needed for MVP stage

## Upgrading for Production

When you're ready to scale, consider:

1. **Database:** Replace JSON file storage with PostgreSQL, MongoDB, or Supabase
2. **Authentication:** Add user accounts with NextAuth.js
3. **Email Service:** Integrate with SendGrid or Resend for email automation
4. **Analytics:** Add Vercel Analytics or Google Analytics
5. **Rate Limiting:** Protect your API routes from abuse
6. **Custom Domain:** Connect your own domain in Vercel settings

## License

MIT License - feel free to use this for your own projects!

## Contributing

Contributions are welcome! Feel free to open issues or submit pull requests.

---

Built with ❤️ for founders who ship fast.
