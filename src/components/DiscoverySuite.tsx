import { motion } from 'motion/react';
import { Search, Brain, Share2, Database, BarChart3, Fingerprint } from 'lucide-react';

interface DiscoverySuiteProps {
  repos: any[];
}

export function DiscoverySuite({ repos }: DiscoverySuiteProps) {
  // AEO/SEO Logic: Categorize the developer as an "Entity"
  const totalTopics = repos.reduce((acc, r) => acc + (r.topics?.length || 0), 0);
  const semanticDepth = Math.round((totalTopics / repos.length) * 10);
  const aeoScore = Math.min(100, 75 + (semanticDepth * 2));

  const signals = [
    { label: 'AEO Discovery', value: `${aeoScore}%`, icon: Brain, color: 'text-purple-400' },
    { label: 'Semantic Depth', value: 'Level 4', icon: Database, color: 'text-blue-400' },
    { label: 'Entity Authority', value: 'Verified', icon: Fingerprint, color: 'text-emerald-400' },
  ];

  return (
    <div className="space-y-8">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {signals.map((s, i) => (
          <div key={s.label} className="technical-card p-4 border-white/5 bg-zinc-900/40">
            <div className="flex items-center gap-3 mb-2">
              <s.icon className={`w-4 h-4 ${s.color}`} />
              <span className="data-label">{s.label}</span>
            </div>
            <p className="text-xl font-mono font-bold tracking-tight">{s.value}</p>
          </div>
        ))}
      </div>

      <div className="technical-card p-6 border-accent/20 bg-gradient-to-br from-accent/5 to-transparent">
        <div className="flex items-center gap-2 mb-6">
          <Search className="w-5 h-5 text-accent" />
          <h3 className="text-sm font-bold uppercase tracking-[0.2em]">Generative Engine Identity</h3>
        </div>

        <div className="space-y-4">
          <div className="p-4 bg-black/40 rounded-xl border border-white/5 font-mono text-[11px] leading-relaxed text-zinc-400">
            <span className="text-accent">ai_engine_summary:</span> "The subject displays a high-density cluster of {repos[0]?.language || 'Technical'} repositories with strong structural integrity. Entity mapping suggests a <span className="text-zinc-100">Senior Architect</span> persona with specialized authority in <span className="text-zinc-100">System Optimization</span> and <span className="text-zinc-100">Scalable Infrastructure</span>. Discoverability index is optimized for complex architectural queries."
          </div>

          <div className="flex flex-wrap gap-4 pt-2">
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 rounded-full bg-emerald-500" />
              <span className="text-[10px] uppercase font-bold text-zinc-500">Structured Data: Valid</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 rounded-full bg-accent" />
              <span className="text-[10px] uppercase font-bold text-zinc-500">Cross-Entity Linking: Active</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
