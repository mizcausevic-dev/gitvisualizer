/**
 * @license
 * SPDX-License-Identifier: AGPL-3.0-only
 */

import { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { GithubUser, GithubRepo, RepositoryStats } from './types';
import { fetchGithubUser, fetchGithubRepos } from './services/github';
import { Header } from './components/Header';
import { Stats } from './components/Stats';
import { RepoGrid } from './components/RepoGrid';
import { ActivityChart } from './components/ActivityChart';
import { TopicCloud } from './components/TopicCloud';
import { ExecutiveSummary } from './components/ExecutiveSummary';
import { FeaturedProjects } from './components/FeaturedProjects';
import { ContactPanel } from './components/ContactPanel';
import { InnovationIndex } from './components/InnovationIndex';
import { MaturityMatrix } from './components/MaturityMatrix';
import { HealthHeatmap } from './components/HealthHeatmap';
import { DiscoverySuite } from './components/DiscoverySuite';
import { TechnicalSchema } from './components/TechnicalSchema';
import { SearchBar } from './components/SearchBar';
import { LoadingSkeleton } from './components/LoadingSkeleton';
import { ErrorState } from './components/ErrorState';
import { Search as SearchIcon, Github, ArrowRight } from 'lucide-react';

function getInitialUsername(): string | null {
  if (typeof window === 'undefined') return null;
  const params = new URLSearchParams(window.location.search);
  const fromUrl = params.get('user') || params.get('u');
  const normalized = (fromUrl || '').trim().replace(/^@/, '');
  return normalized || null;
}

export default function App() {
  const [username, setUsername] = useState(getInitialUsername);
  const [user, setUser] = useState<GithubUser | null>(null);
  const [repos, setRepos] = useState<GithubRepo[]>([]);
  const [loading, setLoading] = useState(Boolean(username));
  const [error, setError] = useState<Error | null>(null);

  const loadData = useCallback(async (targetUser: string) => {
    setLoading(true);
    setError(null);
    try {
      const [userData, repoData] = await Promise.all([
        fetchGithubUser(targetUser),
        fetchGithubRepos(targetUser),
      ]);
      setUser(userData);
      setRepos(repoData);
    } catch (err) {
      setError(err instanceof Error ? err : new Error('Unknown error'));
    } finally {
      setLoading(false);
    }
  }, []);

  // Initial load + reload when username changes
  useEffect(() => {
    if (!username) {
      setUser(null);
      setRepos([]);
      setError(null);
      setLoading(false);
      document.title = 'GitVisualizer';
      return;
    }
    loadData(username);
  }, [username, loadData]);

  // Sync URL when username changes
  useEffect(() => {
    if (typeof window === 'undefined' || !username) return;
    const params = new URLSearchParams(window.location.search);
    const current = params.get('user') || params.get('u');
    if (current !== username) {
      params.set('user', username);
      const newUrl = `${window.location.pathname}?${params.toString()}`;
      window.history.replaceState({}, '', newUrl);
      document.title = `${username} · GitVisualizer`;
    }
  }, [username]);

  // Browser back/forward should refetch
  useEffect(() => {
    const handler = () => setUsername(getInitialUsername());
    window.addEventListener('popstate', handler);
    return () => window.removeEventListener('popstate', handler);
  }, []);

  const handleSearch = (next: string) => {
    const normalized = next.trim().replace(/^@/, '');
    if (normalized && normalized !== username) setUsername(normalized);
  };

  const calculateStats = (repositories: GithubRepo[]): RepositoryStats => {
    const languages: { [key: string]: number } = {};
    let totalStars = 0;
    let totalForks = 0;

    repositories.forEach((repo) => {
      if (repo.language) {
        languages[repo.language] = (languages[repo.language] || 0) + 1;
      }
      totalStars += repo.stargazers_count;
      totalForks += repo.forks_count;
    });

    return { languages, totalStars, totalForks };
  };

  const stats = calculateStats(repos);

  return (
    <div className="min-h-screen px-4 py-8 md:p-12 lg:p-16 max-w-7xl mx-auto">
      {/* Top toolbar — always visible */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-12">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-lg bg-accent/10 border border-accent/30 flex items-center justify-center">
            <Github className="w-4 h-4 text-accent" />
          </div>
          <div>
            <h1 className="font-serif text-lg leading-none text-text">GitVisualizer</h1>
            <p className="text-[10px] text-text-mute uppercase tracking-widest font-mono mt-0.5">
              Profile intelligence for engineers
            </p>
          </div>
        </div>
        <SearchBar initialValue={username ?? ''} onSearch={handleSearch} />
      </div>

      <AnimatePresence mode="wait">
        {!username ? (
          <motion.div key="empty" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
            <div className="min-h-[60vh] flex items-center justify-center">
              <div className="technical-card max-w-2xl w-full p-8 md:p-12 text-center space-y-8">
                <div className="mx-auto w-14 h-14 rounded-2xl bg-accent/10 border border-accent/30 flex items-center justify-center">
                  <SearchIcon className="w-6 h-6 text-accent" />
                </div>
                <div className="space-y-3">
                  <p className="data-label">Developer profile intelligence</p>
                  <h2 className="font-serif text-3xl md:text-5xl tracking-tight text-text">
                    Search any public GitHub username
                  </h2>
                  <p className="text-text-dim text-sm md:text-base max-w-xl mx-auto leading-relaxed">
                    Enter a GitHub handle to generate repository signals, language depth,
                    activity patterns, topic clusters, and a mobile-friendly technical report.
                  </p>
                </div>
                <div className="flex justify-center">
                  <SearchBar initialValue="" onSearch={handleSearch} />
                </div>
                <div className="flex items-center justify-center gap-2 text-[10px] uppercase tracking-widest font-mono text-text-mute">
                  <span>No login required</span>
                  <ArrowRight className="w-3 h-3" />
                  <span>Public GitHub data only</span>
                </div>
              </div>
            </div>
          </motion.div>
        ) : loading ? (
          <motion.div key="loading" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
            <LoadingSkeleton />
          </motion.div>
        ) : error ? (
          <motion.div key="error" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
            <ErrorState error={error} username={username} onRetry={() => loadData(username)} />
          </motion.div>
        ) : user ? (
          <motion.div key="content" initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-16 pb-16">
            <Header user={user} />

            <ExecutiveSummary stats={stats} repoCount={repos.length} />

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
              <div className="lg:col-span-8">
                <DiscoverySuite repos={repos} />
              </div>
              <div className="lg:col-span-4">
                <TechnicalSchema user={user} repos={repos} />
              </div>
            </div>

            {repos.length > 0 && <FeaturedProjects repos={repos} />}

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              <InnovationIndex repos={repos} />
              <MaturityMatrix repos={repos} />
              <HealthHeatmap repos={repos} />
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
              <div className="lg:col-span-4 space-y-8">
                <div className="flex items-center gap-3 mb-2">
                  <SearchIcon className="w-4 h-4 text-accent" />
                  <h2 className="font-serif text-xl tracking-tight text-text">Technical Data Signals</h2>
                </div>
                <Stats stats={stats} repoCount={repos.length} />
              </div>

              <div className="lg:col-span-8 space-y-12">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <ActivityChart repos={repos} />
                  <TopicCloud repos={repos} />
                </div>
                <RepoGrid repos={repos} />
              </div>
            </div>

            <ContactPanel user={user} />
          </motion.div>
        ) : null}
      </AnimatePresence>

      <footer className="pt-8 mt-8 border-t border-border-subtle flex flex-col md:flex-row justify-between items-center gap-3">
        <p className="font-mono text-[10px] uppercase tracking-widest text-text-mute">
          GitVisualizer v0.1 · AGPL-3.0
        </p>
        <div className="flex flex-wrap justify-center gap-4">
          <a
            href="/privacy.html"
            className="font-mono text-[10px] uppercase tracking-widest text-text-mute hover:text-accent transition-colors"
          >
            Privacy Policy
          </a>
          <a
            href="/delete-data.html"
            className="font-mono text-[10px] uppercase tracking-widest text-text-mute hover:text-accent transition-colors"
          >
            Delete Data
          </a>
          <a
            href="https://github.com/mizcausevic-dev/gitvisualizer"
            target="_blank"
            rel="noopener noreferrer"
            className="font-mono text-[10px] uppercase tracking-widest text-text-mute hover:text-accent transition-colors"
          >
            mizcausevic-dev/gitvisualizer
          </a>
        </div>
      </footer>
    </div>
  );
}
