import { motion } from 'motion/react';
import { GithubUser } from '../types';
import { MapPin, Link as LinkIcon, Users, ShieldCheck, Briefcase, Github } from 'lucide-react';

interface HeaderProps {
  user: GithubUser;
}

export function Header({ user }: HeaderProps) {
  return (
    <motion.header
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      className="relative space-y-10"
    >
      <div className="flex flex-col md:flex-row items-center md:items-start gap-10">
        <div className="relative group shrink-0">
          <div className="absolute -inset-1 bg-gradient-to-tr from-accent via-indigo-500 to-emerald-500 rounded-3xl blur opacity-30 group-hover:opacity-100 transition duration-1000 group-hover:duration-200" />
          <div className="relative">
            <img
              src={user.avatar_url}
              alt={user.login}
              className="w-40 h-40 md:w-48 md:h-48 rounded-2xl border border-white/10 shadow-2xl object-cover"
            />
            <div className="absolute -bottom-3 -right-3 bg-zinc-900 border border-border-subtle p-2 rounded-xl shadow-xl">
              <ShieldCheck className="w-5 h-5 text-emerald-500" />
            </div>
          </div>
        </div>

        <div className="flex-1 space-y-6 text-center md:text-left">
          <div className="space-y-4">
            <div className="flex flex-wrap justify-center md:justify-start gap-3">
              <a 
                href={user.html_url} 
                target="_blank" 
                rel="noopener noreferrer"
                className="px-3 py-1 bg-white/5 border border-white/10 rounded-full text-[10px] font-bold text-zinc-300 uppercase tracking-widest flex items-center gap-2 hover:bg-white/10 transition-colors"
              >
                <Github className="w-3 h-3 text-accent" /> Public GitHub Profile
              </a>
              <span className="px-3 py-1 bg-accent/10 border border-accent/20 rounded-full text-[10px] font-bold text-accent uppercase tracking-widest flex items-center gap-2">
                <Briefcase className="w-3 h-3" /> Repository Intelligence
              </span>
            </div>

            <div className="space-y-2">
              <h1 className="text-5xl md:text-7xl font-black tracking-tight bg-gradient-to-b from-white via-white to-zinc-500 bg-clip-text text-transparent">
                {user.name || user.login}
              </h1>
              <p className="font-mono text-xs text-zinc-500 uppercase tracking-[0.4em] translate-x-1">
                @{user.login}
              </p>
            </div>
          </div>

          <p className="text-zinc-400 max-w-2xl text-xl leading-relaxed font-light">
            {user.bio || 'Public GitHub profile intelligence generated from repository metadata.'}
          </p>

          <div className="flex flex-wrap justify-center md:justify-start gap-8 pt-4">
            <div className="flex items-center gap-3 group cursor-default">
              <Users className="w-5 h-5 text-zinc-600 group-hover:text-accent transition-colors" />
              <div className="flex flex-col">
                <span className="text-xl font-mono leading-none">{user.followers}</span>
                <span className="text-[10px] uppercase tracking-wider text-zinc-500">Global Signals</span>
              </div>
            </div>

            {user.location && (
              <div className="flex items-center gap-3">
                <MapPin className="w-5 h-5 text-zinc-600" />
                <div className="flex flex-col">
                  <span className="text-xl font-mono leading-none">GEO-ID</span>
                  <span className="text-[10px] uppercase tracking-wider text-zinc-500">{user.location}</span>
                </div>
              </div>
            )}

            {user.blog && (
              <a
                href={user.blog.startsWith('http') ? user.blog : `https://${user.blog}`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 text-zinc-500 hover:text-accent transition-colors"
              >
                <LinkIcon className="w-5 h-5 text-zinc-600" />
                <span className="text-base font-medium underline decoration-zinc-800 underline-offset-4 hover:decoration-accent">
                  {user.blog.replace(/^https?:\/\//, '')}
                </span>
              </a>
            )}
          </div>
        </div>
      </div>
    </motion.header>
  );
}
