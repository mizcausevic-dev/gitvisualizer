import { motion } from 'motion/react';
import { GithubRepo } from '../types';
import { Award, ExternalLink, ArrowRight } from 'lucide-react';
import { cn } from '../lib/utils';

interface FeaturedProjectsProps {
  repos: GithubRepo[];
}

export function FeaturedProjects({ repos }: FeaturedProjectsProps) {
  // Select top 3 by stars as "Flagship"
  const featured = [...repos]
    .sort((a, b) => b.stargazers_count - a.stargazers_count)
    .slice(0, 3);

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-3">
        <div className="px-2 py-0.5 bg-accent/20 border border-accent/30 rounded text-[10px] font-bold text-accent uppercase tracking-[0.2em]">
          Priority Access
        </div>
        <h2 className="text-xl font-bold tracking-tight">Flagship Case Studies</h2>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {featured.map((repo, i) => (
          <motion.div
            key={repo.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1 }}
            className="group relative h-full"
          >
            <div className="absolute -inset-0.5 bg-gradient-to-r from-accent/50 to-purple-500/50 rounded-2xl blur opacity-20 group-hover:opacity-40 transition duration-500" />
            <div className="relative h-full technical-card p-6 flex flex-col bg-zinc-900/90 backdrop-blur-sm border-white/5">
              <div className="flex justify-between items-start mb-4">
                <div className="p-2 bg-accent/10 rounded-lg">
                  <Award className="w-5 h-5 text-accent" />
                </div>
                <div className="flex items-center gap-1.5 font-mono text-[10px] text-zinc-500">
                  <div className="w-1.5 h-1.5 rounded-full bg-accent" />
                  STABLE RELEASE
                </div>
              </div>

              <h3 className="text-lg font-bold mb-2 group-hover:text-accent transition-colors">
                {repo.name.replace(/-/g, ' ')}
              </h3>
              
              <p className="text-sm text-zinc-400 mb-6 flex-1 line-clamp-3 leading-relaxed">
                {repo.description || 'Enterprise-grade technical documentation and implementation logic.'}
              </p>

              <div className="flex items-center justify-between pt-4 border-t border-white/5">
                <span className="text-[10px] font-mono text-zinc-500 uppercase tracking-widest">
                  {repo.language || 'System'}
                </span>
                <a
                  href={repo.html_url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-1 text-xs font-semibold text-accent hover:gap-2 transition-all"
                >
                  View Case Study <ArrowRight className="w-3 h-3" />
                </a>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
