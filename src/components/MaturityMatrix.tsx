import { motion } from 'motion/react';
import { CheckCircle2, Beaker as Flask, Construction, Zap } from 'lucide-react';
import { GithubRepo } from '../types';

interface MaturityMatrixProps {
  repos: GithubRepo[];
}

export function MaturityMatrix({ repos }: MaturityMatrixProps) {
  const production = repos.filter(r => r.stargazers_count > 5 || r.forks_count > 2).length;
  const development = repos.filter(r => (r.stargazers_count <= 5 && r.stargazers_count > 1) || r.topics?.includes('beta')).length;
  const research = repos.length - production - development;

  const stages = [
    { label: 'Production Ready', count: production, icon: CheckCircle2, color: 'text-emerald-500', bg: 'bg-emerald-500/10' },
    { label: 'Strategic Beta', count: development, icon: Zap, color: 'text-amber-500', bg: 'bg-amber-500/10' },
    { label: 'R&D / Prototypes', count: research, icon: Flask, color: 'text-zinc-500', bg: 'bg-zinc-500/10' },
  ];

  return (
    <div className="technical-card p-6 space-y-6">
      <div className="flex items-center justify-between">
        <div className="space-y-1">
          <h3 className="text-sm font-medium">Lifecycle Asset Mapping</h3>
          <p className="text-xs text-zinc-500 uppercase tracking-widest font-mono">Portfolio Stability</p>
        </div>
        <Construction className="w-4 h-4 text-zinc-600" />
      </div>

      <div className="space-y-3">
        {stages.map((stage, i) => (
          <motion.div
            key={stage.label}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: i * 0.1 }}
            className="flex items-center gap-4 p-3 bg-zinc-900/50 rounded-xl border border-white/5"
          >
            <div className={`p-2 rounded-lg ${stage.bg} ${stage.color}`}>
              <stage.icon className="w-4 h-4" />
            </div>
            <div className="flex-1">
              <p className="text-[10px] uppercase font-bold text-zinc-500 tracking-wider leading-none mb-1">{stage.label}</p>
              <div className="flex items-end justify-between">
                <span className="text-lg font-mono font-bold leading-none">{stage.count}</span>
                <span className="text-[10px] text-zinc-600 font-mono">{Math.round((stage.count / repos.length) * 100)}%</span>
              </div>
            </div>
            <div className="w-24 h-1 bg-zinc-800 rounded-full overflow-hidden shrink-0 hidden sm:block">
              <div className={`h-full ${stage.color.replace('text-', 'bg-')}`} style={{ width: `${(stage.count / repos.length) * 100}%` }} />
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
