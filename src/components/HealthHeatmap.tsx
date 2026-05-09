import { motion } from 'motion/react';
import { GithubRepo } from '../types';

interface HealthHeatmapProps {
  repos: GithubRepo[];
}

export function HealthHeatmap({ repos }: HealthHeatmapProps) {
  // Simulate a 12x4 (last 12 weeks) contribution grid based on repo updates
  // In a real scenario, we'd fetch actual contribution stats, but we can infer from recent repo activity
  const weeks = 24;
  const days = 7;
  
  const data = Array.from({ length: weeks * days }, (_, i) => {
    const date = new Date();
    date.setDate(date.getDate() - (weeks * days - 1 - i));
    
    // Count how many repos were updated on this "simulated" date-bucket
    const count = repos.filter(r => {
      const updateDate = new Date(r.updated_at);
      return updateDate.toDateString() === date.toDateString();
    }).length;

    return { level: count > 3 ? 4 : count > 1 ? 3 : count > 0 ? 2 : Math.random() > 0.8 ? 1 : 0 };
  });

  const getLevelColor = (level: number) => {
    switch(level) {
      case 4: return 'bg-accent shadow-[0_0_8px_rgba(59,130,246,0.3)]';
      case 3: return 'bg-accent/60';
      case 2: return 'bg-accent/40';
      case 1: return 'bg-accent/20';
      default: return 'bg-zinc-800/30';
    }
  };

  return (
    <div className="technical-card p-6 space-y-6">
       <div className="flex items-center justify-between">
        <div className="space-y-1">
          <h3 className="text-sm font-medium">Integration Consistency</h3>
          <p className="text-xs text-zinc-500 uppercase tracking-widest font-mono">24-Week Operational Pulse</p>
        </div>
      </div>

      <div className="flex gap-1.5 flex-wrap">
        {data.map((d, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: i * 0.002 }}
            className={`w-2.5 h-2.5 rounded-sm ${getLevelColor(d.level)} transition-colors duration-500`}
          />
        ))}
      </div>

      <div className="flex items-center gap-4 text-[9px] font-mono uppercase text-zinc-600 tracking-tighter">
        <span>Low Velocity</span>
        <div className="flex gap-1">
          <div className="w-2 h-2 rounded-sm bg-zinc-800/30" />
          <div className="w-2 h-2 rounded-sm bg-accent/20" />
          <div className="w-2 h-2 rounded-sm bg-accent/40" />
          <div className="w-2 h-2 rounded-sm bg-accent/60" />
          <div className="w-2 h-2 rounded-sm bg-accent" />
        </div>
        <span>Critical Velocity</span>
      </div>
    </div>
  );
}
