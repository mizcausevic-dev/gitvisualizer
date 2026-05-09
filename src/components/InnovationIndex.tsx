import { motion } from 'motion/react';
import { GithubRepo } from '../types';
import { Cpu, Brain, Sparkles, Code } from 'lucide-react';

interface InnovationIndexProps {
  repos: GithubRepo[];
}

export function InnovationIndex({ repos }: InnovationIndexProps) {
  const aiKeywords = ['ai', 'ml', 'openai', 'gemini', 'anthropic', 'tensor', 'neural', 'llm', 'nlp', 'bot', 'agent'];
  const modernTech = ['rust', 'go', 'typescript', 'wasm', 'docker', 'kubernetes', 'aws', 'gcp', 'serverless'];
  
  const aiRepos = repos.filter(r => 
    aiKeywords.some(k => r.name.toLowerCase().includes(k) || r.topics?.some(t => t.includes(k)))
  ).length;

  const modernScore = repos.filter(r => 
    modernTech.some(k => r.language?.toLowerCase() === k || r.name.toLowerCase().includes(k))
  ).length;

  // Calculate Innovation Score 0-100
  const index = Math.min(100, (aiRepos * 25) + (modernScore * 10) + (repos.length * 2));

  return (
    <div className="technical-card p-6 border-accent/30 bg-gradient-to-br from-accent/5 to-transparent">
      <div className="flex items-center gap-4 mb-6">
        <div className="w-10 h-10 rounded-xl bg-accent/20 flex items-center justify-center">
          <Brain className="w-6 h-6 text-accent" />
        </div>
        <div>
          <h3 className="text-sm font-bold uppercase tracking-widest text-zinc-300">Innovation Index</h3>
          <p className="text-[10px] font-mono text-zinc-500 uppercase">Strategic Tech Capability</p>
        </div>
        <div className="ml-auto text-3xl font-black font-mono text-accent">{index}<span className="text-xs">%</span></div>
      </div>

      <div className="space-y-4">
        <div className="w-full bg-zinc-900 rounded-full h-1.5 overflow-hidden">
          <motion.div 
            initial={{ width: 0 }}
            animate={{ width: `${index}%` }}
            className="h-full bg-accent shadow-[0_0_15px_rgba(59,130,246,0.5)]"
          />
        </div>

        <div className="grid grid-cols-2 gap-3">
          <div className="p-3 bg-white/5 rounded-lg border border-white/5">
            <div className="flex items-center gap-2 mb-1">
              <Cpu className="w-3 h-3 text-zinc-500" />
              <span className="text-[9px] uppercase font-bold text-zinc-500">AI Logic</span>
            </div>
            <p className="text-sm font-mono">{aiRepos} <span className="text-[10px] text-zinc-600">Modules</span></p>
          </div>
          <div className="p-3 bg-white/5 rounded-lg border border-white/5">
            <div className="flex items-center gap-2 mb-1">
              <Sparkles className="w-3 h-3 text-zinc-500" />
              <span className="text-[9px] uppercase font-bold text-zinc-500">Next-Gen Stack</span>
            </div>
            <p className="text-sm font-mono">{modernScore} <span className="text-[10px] text-zinc-600">Directs</span></p>
          </div>
        </div>
      </div>
    </div>
  );
}
