#!/bin/bash

echo "🚀 Startup Launchpad Setup"
echo "=========================="
echo ""

# Check if .env.local exists
if [ -f .env.local ]; then
    echo "✅ .env.local already exists"
else
    echo "📝 Creating .env.local from example..."
    echo "# OpenAI API Key for AI-assisted copy generation" > .env.local
    echo "# Get your key from: https://platform.openai.com/api-keys" >> .env.local
    echo "OPENAI_API_KEY=your_openai_api_key_here" >> .env.local
    echo "✅ Created .env.local"
    echo "⚠️  Remember to add your actual OpenAI API key!"
fi

echo ""
echo "📦 Installing dependencies..."
npm install

echo ""
echo "✅ Setup complete!"
echo ""
echo "Next steps:"
echo "1. Edit .env.local and add your OpenAI API key"
echo "2. Run 'npm run dev' to start the development server"
echo "3. Open http://localhost:3000 in your browser"
echo ""
echo "To deploy to Vercel:"
echo "1. Run 'npm i -g vercel' to install Vercel CLI"
echo "2. Run 'vercel' and follow the prompts"
echo "3. Add your OPENAI_API_KEY as an environment variable"
echo ""
echo "Happy launching! 🎉"
