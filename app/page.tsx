'use client';

import { useState } from 'react';
import { Rocket, Sparkles, BarChart3, Mail } from 'lucide-react';
import Link from 'next/link';

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-950 dark:to-slate-900">
      {/* Header */}
      <header className="border-b border-slate-200 dark:border-slate-800 bg-white/50 dark:bg-slate-950/50 backdrop-blur-sm sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Rocket className="w-6 h-6 text-indigo-600 dark:text-indigo-400" />
              <h1 className="text-xl font-semibold text-slate-900 dark:text-slate-100">
                Startup Launchpad
              </h1>
            </div>
            <Link 
              href="/dashboard"
              className="text-sm text-slate-600 dark:text-slate-400 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors"
            >
              Dashboard
            </Link>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 pt-20 pb-16 text-center">
        <div className="animate-fade-in">
          <h2 className="text-5xl sm:text-6xl font-bold text-slate-900 dark:text-slate-100 mb-6">
            Launch Your Startup
            <span className="block text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-purple-600 dark:from-indigo-400 dark:to-purple-400">
              In Minutes, Not Months
            </span>
          </h2>
          <p className="text-xl text-slate-600 dark:text-slate-400 mb-12 max-w-2xl mx-auto text-balance">
            The elegant toolkit for pre-seed founders. Generate landing pages, collect signups, and track what matters.
          </p>
          <Link 
            href="/generator"
            className="inline-flex items-center gap-2 bg-indigo-600 hover:bg-indigo-700 text-white px-8 py-4 rounded-lg font-medium transition-all hover:scale-105 shadow-lg hover:shadow-xl"
          >
            <Sparkles className="w-5 h-5" />
            Create Your Landing Page
          </Link>
        </div>
      </section>

      {/* Features */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid md:grid-cols-3 gap-8">
          <FeatureCard
            icon={<Sparkles className="w-8 h-8 text-indigo-600 dark:text-indigo-400" />}
            title="AI-Powered Copy"
            description="Generate compelling headlines and descriptions with OpenAI assistance."
          />
          <FeatureCard
            icon={<Mail className="w-8 h-8 text-purple-600 dark:text-purple-400" />}
            title="Email Collection"
            description="Capture early signups with a beautiful, conversion-optimized form."
          />
          <FeatureCard
            icon={<BarChart3 className="w-8 h-8 text-pink-600 dark:text-pink-400" />}
            title="Simple Analytics"
            description="Track signups and understand your early traction at a glance."
          />
        </div>
      </section>

      {/* CTA Section */}
      <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-20 text-center">
        <div className="bg-white dark:bg-slate-900 rounded-2xl shadow-xl p-12 border border-slate-200 dark:border-slate-800">
          <h3 className="text-3xl font-bold text-slate-900 dark:text-slate-100 mb-4">
            Built for Real Humans
          </h3>
          <p className="text-lg text-slate-600 dark:text-slate-400 mb-8 max-w-2xl mx-auto">
            No bloat. No complexity. Just the tools you need to validate your idea and start building.
          </p>
          <Link 
            href="/generator"
            className="inline-flex items-center gap-2 bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white px-8 py-4 rounded-lg font-medium transition-all hover:scale-105 shadow-lg"
          >
            Get Started Free
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-slate-200 dark:border-slate-800 mt-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 text-center text-sm text-slate-600 dark:text-slate-400">
          <p>Built with Next.js, deployed on Vercel. Made with care for founders.</p>
        </div>
      </footer>
    </div>
  );
}

function FeatureCard({ icon, title, description }: { icon: React.ReactNode; title: string; description: string }) {
  return (
    <div className="bg-white dark:bg-slate-900 rounded-xl p-8 shadow-lg border border-slate-200 dark:border-slate-800 hover:shadow-xl transition-all hover:-translate-y-1 animate-slide-up">
      <div className="mb-4">{icon}</div>
      <h3 className="text-xl font-semibold text-slate-900 dark:text-slate-100 mb-2">
        {title}
      </h3>
      <p className="text-slate-600 dark:text-slate-400">
        {description}
      </p>
    </div>
  );
}
