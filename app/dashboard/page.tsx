'use client';

import { useState, useEffect } from 'react';
import { Rocket, Users, TrendingUp, Mail, ArrowLeft, Calendar, Activity } from 'lucide-react';
import Link from 'next/link';

interface Signup {
  email: string;
  source: string;
  timestamp: string;
}

interface Stats {
  total: number;
  today: number;
  thisWeek: number;
  sources: Record<string, number>;
}

export default function Dashboard() {
  const [signups, setSignups] = useState<Signup[]>([]);
  const [stats, setStats] = useState<Stats>({
    total: 0,
    today: 0,
    thisWeek: 0,
    sources: {},
  });
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetchSignups();
  }, []);

  const fetchSignups = async () => {
    try {
      const response = await fetch('/api/signup');
      const data = await response.json();
      
      if (data.signups) {
        setSignups(data.signups);
        calculateStats(data.signups);
      }
    } catch (error) {
      console.error('Error fetching signups:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const calculateStats = (signups: Signup[]) => {
    const now = new Date();
    const todayStart = new Date(now.getFullYear(), now.getMonth(), now.getDate());
    const weekStart = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000);

    const sources: Record<string, number> = {};
    let today = 0;
    let thisWeek = 0;

    signups.forEach(signup => {
      const signupDate = new Date(signup.timestamp);
      
      if (signupDate >= todayStart) today++;
      if (signupDate >= weekStart) thisWeek++;
      
      sources[signup.source] = (sources[signup.source] || 0) + 1;
    });

    setStats({
      total: signups.length,
      today,
      thisWeek,
      sources,
    });
  };

  const formatDate = (timestamp: string) => {
    const date = new Date(timestamp);
    return date.toLocaleDateString('en-US', { 
      month: 'short', 
      day: 'numeric', 
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
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
                Analytics Dashboard
              </h1>
            </Link>
            <Link 
              href="/generator"
              className="text-sm text-slate-600 dark:text-slate-400 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors"
            >
              Generator
            </Link>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {isLoading ? (
          <div className="text-center py-20">
            <div className="inline-block animate-spin rounded-full h-12 w-12 border-4 border-indigo-600 border-t-transparent"></div>
            <p className="mt-4 text-slate-600 dark:text-slate-400">Loading analytics...</p>
          </div>
        ) : (
          <>
            {/* Stats Grid */}
            <div className="grid md:grid-cols-4 gap-6 mb-8">
              <StatCard
                icon={<Users className="w-8 h-8 text-indigo-600 dark:text-indigo-400" />}
                title="Total Signups"
                value={stats.total.toString()}
                gradient="from-indigo-500 to-indigo-600"
              />
              <StatCard
                icon={<Activity className="w-8 h-8 text-green-600 dark:text-green-400" />}
                title="Today"
                value={stats.today.toString()}
                gradient="from-green-500 to-green-600"
              />
              <StatCard
                icon={<TrendingUp className="w-8 h-8 text-purple-600 dark:text-purple-400" />}
                title="This Week"
                value={stats.thisWeek.toString()}
                gradient="from-purple-500 to-purple-600"
              />
              <StatCard
                icon={<Calendar className="w-8 h-8 text-pink-600 dark:text-pink-400" />}
                title="Sources"
                value={Object.keys(stats.sources).length.toString()}
                gradient="from-pink-500 to-pink-600"
              />
            </div>

            {/* Sources Breakdown */}
            {Object.keys(stats.sources).length > 0 && (
              <div className="bg-white dark:bg-slate-900 rounded-xl shadow-lg border border-slate-200 dark:border-slate-800 p-8 mb-8">
                <h2 className="text-xl font-bold text-slate-900 dark:text-slate-100 mb-6">
                  Signup Sources
                </h2>
                <div className="grid md:grid-cols-3 gap-4">
                  {Object.entries(stats.sources).map(([source, count]) => (
                    <div 
                      key={source}
                      className="bg-slate-50 dark:bg-slate-800 rounded-lg p-4 border border-slate-200 dark:border-slate-700"
                    >
                      <p className="text-sm text-slate-600 dark:text-slate-400 mb-1">
                        {source}
                      </p>
                      <p className="text-2xl font-bold text-slate-900 dark:text-slate-100">
                        {count}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Recent Signups */}
            <div className="bg-white dark:bg-slate-900 rounded-xl shadow-lg border border-slate-200 dark:border-slate-800 p-8">
              <h2 className="text-xl font-bold text-slate-900 dark:text-slate-100 mb-6">
                Recent Signups
              </h2>
              
              {signups.length === 0 ? (
                <div className="text-center py-12">
                  <Mail className="w-16 h-16 mx-auto mb-4 text-slate-300 dark:text-slate-700" />
                  <p className="text-slate-600 dark:text-slate-400">
                    No signups yet. Share your landing page to get started!
                  </p>
                </div>
              ) : (
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="border-b border-slate-200 dark:border-slate-800">
                        <th className="text-left py-3 px-4 text-sm font-medium text-slate-600 dark:text-slate-400">
                          Email
                        </th>
                        <th className="text-left py-3 px-4 text-sm font-medium text-slate-600 dark:text-slate-400">
                          Source
                        </th>
                        <th className="text-left py-3 px-4 text-sm font-medium text-slate-600 dark:text-slate-400">
                          Date
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      {[...signups].reverse().map((signup, index) => (
                        <tr 
                          key={index}
                          className="border-b border-slate-100 dark:border-slate-800 hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors"
                        >
                          <td className="py-3 px-4 text-slate-900 dark:text-slate-100">
                            {signup.email}
                          </td>
                          <td className="py-3 px-4 text-slate-600 dark:text-slate-400">
                            <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-indigo-100 dark:bg-indigo-900 text-indigo-800 dark:text-indigo-200">
                              {signup.source}
                            </span>
                          </td>
                          <td className="py-3 px-4 text-slate-600 dark:text-slate-400">
                            {formatDate(signup.timestamp)}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </div>
          </>
        )}
      </div>
    </div>
  );
}

function StatCard({ 
  icon, 
  title, 
  value, 
  gradient 
}: { 
  icon: React.ReactNode; 
  title: string; 
  value: string; 
  gradient: string;
}) {
  return (
    <div className="bg-white dark:bg-slate-900 rounded-xl shadow-lg border border-slate-200 dark:border-slate-800 p-6 hover:shadow-xl transition-shadow">
      <div className="flex items-start justify-between mb-4">
        <div className={`p-3 rounded-lg bg-gradient-to-br ${gradient}`}>
          <div className="text-white">
            {icon}
          </div>
        </div>
      </div>
      <h3 className="text-sm font-medium text-slate-600 dark:text-slate-400 mb-1">
        {title}
      </h3>
      <p className="text-3xl font-bold text-slate-900 dark:text-slate-100">
        {value}
      </p>
    </div>
  );
}
