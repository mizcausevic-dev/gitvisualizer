import { motion } from 'motion/react';
import { TrendingUp, ShieldCheck, Zap, Target, Activity as ActivityIcon, Cpu } from 'lucide-react';
import { RepositoryStats } from '../types';

interface ExecutiveSummaryProps {
  stats: RepositoryStats;
  repoCount: number;
}

export function ExecutiveSummary({ stats, repoCount }: ExecutiveSummaryProps) {
  // Derived business metrics
  const stackBreadth = Object.keys(stats.languages).length;
  const avgStars = (stats.totalStars / repoCount).toFixed(1);
  const healthScore = Math.min(100, (repoCount * 2) + (stats.totalStars * 5));

  const kpis = [
    { label: 'Cloud Velocity', value: 'High', icon: Zap, color: 'text-amber-400' },
    { label: 'Technical Depth', value: `${stackBreadth} Domains`, icon: Target, color: 'text-blue-400' },
    { label: 'System Integrity', value: `${healthScore}%`, icon: ShieldCheck, color: 'text-emerald-400' },
    { label: 'Market Interest', value: `${avgStars}★ Avg`, icon: TrendingUp, color: 'text-purple-400' },
    { label: 'Asset Liquidity', value: 'Prime', icon: ActivityIcon, color: 'text-rose-400' },
    { label: 'AI Readiness', value: 'Expert', icon: Cpu, color: 'text-indigo-400' },
  ];

  return (
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
      {kpis.map((kpi, i) => (
        <motion.div
          key={kpi.label}
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: i * 0.1 }}
          className="technical-card p-4 flex items-center gap-4 bg-gradient-to-br from-surface to-[#1e1e21]"
        >
          <div className={`p-2 rounded-lg bg-zinc-900/50 ${kpi.color}`}>
            <kpi.icon className="w-5 h-5" />
          </div>
          <div>
            <p className="data-label">{kpi.label}</p>
            <p className="stat-value text-lg">{kpi.value}</p>
          </div>
        </motion.div>
      ))}
    </div>
  );
}
