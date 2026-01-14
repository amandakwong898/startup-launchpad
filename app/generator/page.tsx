'use client';

import { useState } from 'react';
import { Rocket, Sparkles, Copy, Eye, ArrowLeft } from 'lucide-react';
import Link from 'next/link';

interface LandingPageData {
  companyName: string;
  headline: string;
  description: string;
  ctaText: string;
}

export default function Generator() {
  const [formData, setFormData] = useState<LandingPageData>({
    companyName: '',
    headline: '',
    description: '',
    ctaText: 'Get Early Access',
  });
  const [isGenerating, setIsGenerating] = useState(false);
  const [showPreview, setShowPreview] = useState(false);

  const handleGenerateCopy = async (field: 'headline' | 'description') => {
    if (!formData.companyName) {
      alert('Please enter a company name first!');
      return;
    }

    setIsGenerating(true);
    try {
      const response = await fetch('/api/generate-copy', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          companyName: formData.companyName,
          field,
        }),
      });

      if (!response.ok) throw new Error('Failed to generate copy');

      const data = await response.json();
      setFormData(prev => ({ ...prev, [field]: data.text }));
    } catch (error) {
      console.error('Error generating copy:', error);
      alert('Failed to generate copy. Please try again.');
    } finally {
      setIsGenerating(false);
    }
  };

  const handleCopyCode = () => {
    const code = generateLandingPageCode();
    navigator.clipboard.writeText(code);
    alert('Code copied to clipboard!');
  };

  const generateLandingPageCode = () => {
    return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>${formData.companyName}</title>
  <script src="https://cdn.tailwindcss.com"></script>
</head>
<body class="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100">
  <div class="max-w-4xl mx-auto px-4 py-20">
    <div class="text-center mb-16">
      <h1 class="text-5xl font-bold text-slate-900 mb-6">${formData.headline || 'Your Headline Here'}</h1>
      <p class="text-xl text-slate-600 mb-12 max-w-2xl mx-auto">${formData.description || 'Your description here'}</p>
      
      <form id="signup-form" class="max-w-md mx-auto">
        <div class="flex gap-2">
          <input 
            type="email" 
            id="email" 
            placeholder="Enter your email" 
            required
            class="flex-1 px-4 py-3 rounded-lg border border-slate-300 focus:outline-none focus:ring-2 focus:ring-indigo-500"
          >
          <button 
            type="submit"
            class="px-8 py-3 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg font-medium transition-colors"
          >
            ${formData.ctaText}
          </button>
        </div>
        <p id="message" class="mt-4 text-sm"></p>
      </form>
    </div>
  </div>

  <script>
    document.getElementById('signup-form').addEventListener('submit', async (e) => {
      e.preventDefault();
      const email = document.getElementById('email').value;
      const message = document.getElementById('message');
      
      try {
        const response = await fetch('/api/signup', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ email, source: '${formData.companyName}' }),
        });
        
        const data = await response.json();
        
        if (response.ok) {
          message.textContent = '✓ Thanks for signing up!';
          message.className = 'mt-4 text-sm text-green-600';
          document.getElementById('email').value = '';
        } else {
          message.textContent = data.error || 'Something went wrong';
          message.className = 'mt-4 text-sm text-red-600';
        }
      } catch (error) {
        message.textContent = 'Error signing up. Please try again.';
        message.className = 'mt-4 text-sm text-red-600';
      }
    });
  </script>
</body>
</html>`;
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-950 dark:to-slate-900">
      {/* Header */}
      <header className="border-b border-slate-200 dark:border-slate-800 bg-white/50 dark:bg-slate-950/50 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <Link href="/" className="flex items-center gap-2 hover:opacity-80 transition-opacity">
              <ArrowLeft className="w-5 h-5 text-slate-600 dark:text-slate-400" />
              <Rocket className="w-6 h-6 text-indigo-600 dark:text-indigo-400" />
              <h1 className="text-xl font-semibold text-slate-900 dark:text-slate-100">
                Landing Page Generator
              </h1>
            </Link>
            <Link 
              href="/dashboard"
              className="text-sm text-slate-600 dark:text-slate-400 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors"
            >
              Dashboard
            </Link>
          </div>
        </div>
      </header>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid lg:grid-cols-2 gap-8">
          {/* Form Section */}
          <div className="bg-white dark:bg-slate-900 rounded-xl shadow-lg border border-slate-200 dark:border-slate-800 p-8">
            <h2 className="text-2xl font-bold text-slate-900 dark:text-slate-100 mb-6">
              Configure Your Landing Page
            </h2>

            <div className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
                  Company Name *
                </label>
                <input
                  type="text"
                  value={formData.companyName}
                  onChange={(e) => setFormData(prev => ({ ...prev, companyName: e.target.value }))}
                  className="w-full px-4 py-2 rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-slate-100 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  placeholder="Acme Inc."
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
                  Headline
                </label>
                <div className="flex gap-2">
                  <input
                    type="text"
                    value={formData.headline}
                    onChange={(e) => setFormData(prev => ({ ...prev, headline: e.target.value }))}
                    className="flex-1 px-4 py-2 rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-slate-100 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    placeholder="Your compelling headline"
                  />
                  <button
                    onClick={() => handleGenerateCopy('headline')}
                    disabled={isGenerating}
                    className="px-4 py-2 bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white rounded-lg font-medium transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
                  >
                    <Sparkles className="w-4 h-4" />
                    AI
                  </button>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
                  Description
                </label>
                <div className="flex gap-2">
                  <textarea
                    value={formData.description}
                    onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
                    rows={3}
                    className="flex-1 px-4 py-2 rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-slate-100 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    placeholder="Describe what makes your product special"
                  />
                  <button
                    onClick={() => handleGenerateCopy('description')}
                    disabled={isGenerating}
                    className="px-4 py-2 bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white rounded-lg font-medium transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2 h-fit"
                  >
                    <Sparkles className="w-4 h-4" />
                    AI
                  </button>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
                  CTA Button Text
                </label>
                <input
                  type="text"
                  value={formData.ctaText}
                  onChange={(e) => setFormData(prev => ({ ...prev, ctaText: e.target.value }))}
                  className="w-full px-4 py-2 rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-slate-100 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  placeholder="Get Early Access"
                />
              </div>
            </div>

            <div className="flex gap-3 mt-8">
              <button
                onClick={() => setShowPreview(!showPreview)}
                className="flex-1 px-6 py-3 bg-slate-200 dark:bg-slate-800 hover:bg-slate-300 dark:hover:bg-slate-700 text-slate-900 dark:text-slate-100 rounded-lg font-medium transition-colors flex items-center justify-center gap-2"
              >
                <Eye className="w-5 h-5" />
                {showPreview ? 'Hide' : 'Preview'}
              </button>
              <button
                onClick={handleCopyCode}
                className="flex-1 px-6 py-3 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg font-medium transition-colors flex items-center justify-center gap-2"
              >
                <Copy className="w-5 h-5" />
                Copy Code
              </button>
            </div>
          </div>

          {/* Preview Section */}
          <div className="bg-white dark:bg-slate-900 rounded-xl shadow-lg border border-slate-200 dark:border-slate-800 p-8">
            <h2 className="text-2xl font-bold text-slate-900 dark:text-slate-100 mb-6">
              Preview
            </h2>
            
            {showPreview ? (
              <div className="border-2 border-dashed border-slate-300 dark:border-slate-700 rounded-lg p-8 min-h-[400px]">
                <div className="text-center">
                  <h1 className="text-4xl font-bold text-slate-900 dark:text-slate-100 mb-6">
                    {formData.headline || 'Your Headline Here'}
                  </h1>
                  <p className="text-lg text-slate-600 dark:text-slate-400 mb-8">
                    {formData.description || 'Your description will appear here'}
                  </p>
                  
                  <form className="max-w-md mx-auto" onSubmit={(e) => e.preventDefault()}>
                    <div className="flex gap-2">
                      <input
                        type="email"
                        placeholder="Enter your email"
                        className="flex-1 px-4 py-3 rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-slate-100 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                        disabled
                      />
                      <button
                        className="px-6 py-3 bg-indigo-600 text-white rounded-lg font-medium"
                        disabled
                      >
                        {formData.ctaText}
                      </button>
                    </div>
                  </form>
                </div>
              </div>
            ) : (
              <div className="flex items-center justify-center min-h-[400px] text-slate-400 dark:text-slate-600">
                <div className="text-center">
                  <Eye className="w-16 h-16 mx-auto mb-4 opacity-50" />
                  <p>Click "Preview" to see your landing page</p>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
