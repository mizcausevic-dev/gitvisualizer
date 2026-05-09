import { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { GithubRepo } from '../types';
import { 
  Star, 
  GitFork, 
  Folder, 
  Search, 
  ArrowUpDown, 
  LayoutGrid, 
  List, 
  ChevronRight,
  FilterX
} from 'lucide-react';
import { cn } from '../lib/utils';

interface RepoGridProps {
  repos: GithubRepo[];
}

type SortOption = 'updated' | 'stars' | 'name';
type ViewType = 'grid' | 'list';

export function RepoGrid({ repos }: RepoGridProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState<SortOption>('updated');
  const [viewType, setViewType] = useState<ViewType>('grid');

  const filteredAndSortedRepos = useMemo(() => {
    return repos
      .filter(repo => 
        repo.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        repo.description?.toLowerCase().includes(searchQuery.toLowerCase())
      )
      .sort((a, b) => {
        if (sortBy === 'stars') return b.stargazers_count - a.stargazers_count;
        if (sortBy === 'name') return a.name.localeCompare(b.name);
        return new Date(b.updated_at).getTime() - new Date(a.updated_at).getTime();
      });
  }, [repos, searchQuery, sortBy]);

  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: { staggerChildren: 0.05 }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 10 },
    show: { opacity: 1, y: 0 }
  };

  return (
    <div className="space-y-6">
      {/* Control Bar */}
      <div className="flex flex-col lg:flex-row gap-4 justify-between items-start lg:items-center bg-surface/50 p-4 rounded-xl border border-border-subtle backdrop-blur-sm sticky top-4 z-10">
        <div className="relative w-full lg:w-72">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-500" />
          <input
            type="text"
            placeholder="Search repositories..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full bg-zinc-900 border border-border-subtle rounded-lg py-2 pl-10 pr-4 text-sm focus:outline-none focus:border-accent/50 focus:ring-1 focus:ring-accent/20 transition-all"
          />
        </div>

        <div className="flex items-center gap-2 w-full lg:w-auto overflow-x-auto pb-2 lg:pb-0">
          <div className="flex items-center gap-2 px-3 py-1.5 bg-zinc-900 border border-border-subtle rounded-lg">
            <ArrowUpDown className="w-3.5 h-3.5 text-zinc-500" />
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as SortOption)}
              className="bg-transparent text-xs font-medium focus:outline-none cursor-pointer"
            >
              <option value="updated">Recent Activity</option>
              <option value="stars">Star Power</option>
              <option value="name">Alphabetical</option>
            </select>
          </div>

          <div className="h-6 w-px bg-border-subtle mx-2 hidden sm:block" />

          <div className="flex bg-zinc-900 p-1 rounded-lg border border-border-subtle">
            <button
              onClick={() => setViewType('grid')}
              className={cn(
                "p-1.5 rounded-md transition-all",
                viewType === 'grid' ? "bg-zinc-800 text-accent shadow-sm" : "text-zinc-500 hover:text-zinc-300"
              )}
            >
              <LayoutGrid className="w-4 h-4" />
            </button>
            <button
              onClick={() => setViewType('list')}
              className={cn(
                "p-1.5 rounded-md transition-all",
                viewType === 'list' ? "bg-zinc-800 text-accent shadow-sm" : "text-zinc-500 hover:text-zinc-300"
              )}
            >
              <List className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>

      <AnimatePresence mode="popLayout">
        {filteredAndSortedRepos.length > 0 ? (
          <motion.div
            key={viewType + sortBy + searchQuery}
            variants={container}
            initial="hidden"
            animate="show"
            className={cn(
              "grid gap-4",
              viewType === 'grid' ? "grid-cols-1 md:grid-cols-2" : "grid-cols-1"
            )}
          >
            {filteredAndSortedRepos.map((repo) => (
              <motion.a
                key={repo.id}
                variants={itemVariants}
                href={repo.html_url}
                target="_blank"
                rel="noopener noreferrer"
                className={cn(
                  "technical-card group relative p-5 flex transition-all hover:border-accent/40 active:scale-[0.99]",
                  viewType === 'grid' ? "flex-col space-y-4" : "flex-row items-center gap-6"
                )}
              >
                <div className={cn(
                  "bg-accent-muted p-2 rounded-lg group-hover:scale-110 transition-transform duration-300 shrink-0",
                  viewType === 'list' && "hidden sm:block"
                )}>
                  <Folder className="w-5 h-5 text-accent" />
                </div>

                <div className="space-y-1 flex-1 min-w-0">
                  <div className="flex items-center justify-between gap-2">
                    <h3 className="font-semibold text-base group-hover:text-accent transition-colors truncate">
                      {repo.name}
                    </h3>
                    {viewType === 'list' && (
                      <div className="flex items-center gap-3 shrink-0">
                        <div className="flex items-center gap-1.5 text-zinc-500">
                          <Star className="w-3.5 h-3.5" />
                          <span className="font-mono text-xs">{repo.stargazers_count}</span>
                        </div>
                        <ChevronRight className="w-4 h-4 text-zinc-700 group-hover:text-accent transition-colors" />
                      </div>
                    )}
                  </div>
                  <p className="text-zinc-500 text-xs leading-relaxed line-clamp-1">
                    {repo.description || 'No description provided.'}
                  </p>
                </div>

                <div className={cn(
                  "flex items-center justify-between border-border-subtle transition-colors",
                  viewType === 'grid' ? "pt-4 border-t group-hover:border-accent/10" : "shrink-0 gap-6"
                )}>
                  <div className={cn("flex gap-4", viewType === 'list' && "hidden md:flex")}>
                    <div className="flex items-center gap-1.5 text-zinc-500">
                      <Star className="w-3.5 h-3.5" />
                      <span className="font-mono text-xs">{repo.stargazers_count}</span>
                    </div>
                    <div className="flex items-center gap-1.5 text-zinc-500">
                      <GitFork className="w-3.5 h-3.5" />
                      <span className="font-mono text-xs">{repo.forks_count}</span>
                    </div>
                  </div>

                  {repo.language && (
                    <div className="flex items-center gap-1.5 px-2 py-0.5 bg-zinc-800/50 rounded text-[10px] font-mono text-zinc-400 border border-white/5">
                      <div 
                        className="w-1.5 h-1.5 rounded-full" 
                        style={{ backgroundColor: getLanguageColor(repo.language) }}
                      />
                      {repo.language.toUpperCase()}
                    </div>
                  )}
                </div>
              </motion.a>
            ))}
          </motion.div>
        ) : (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="flex flex-col items-center justify-center py-20 technical-card border-dashed border-2"
          >
            <FilterX className="w-10 h-10 text-zinc-700 mb-4" />
            <p className="text-zinc-500 font-medium">No repositories match your search.</p>
            <button 
              onClick={() => setSearchQuery('')}
              className="mt-4 text-xs text-accent hover:underline"
            >
              Clear filters
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

function getLanguageColor(lang: string) {
  const colors: { [key: string]: string } = {
    TypeScript: '#3178c6',
    JavaScript: '#f1e05a',
    HTML: '#e34c26',
    CSS: '#563d7c',
    Python: '#3572A5',
    Rust: '#dea584',
    Java: '#b07219',
    C: '#555555',
    'C++': '#f34b7d',
    PHP: '#4F5D95',
    Ruby: '#701516',
    Swift: '#F05138',
    Kotlin: '#A97BFF',
    Go: '#00ADD8',
    Vue: '#41b883',
    React: '#61dafb',
  };
  return colors[lang] || '#888888';
}

