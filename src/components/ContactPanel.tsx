import { motion } from 'motion/react';
import { Github, Globe, Mail, ExternalLink } from 'lucide-react';
import { GithubUser } from '../types';

interface ContactPanelProps {
  user: GithubUser;
}

export function ContactPanel({ user }: ContactPanelProps) {
  const hasBlog = !!user.blog;
  const hasTwitter = !!user.twitter_username;

  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className="technical-card overflow-hidden"
    >
      <div className="grid grid-cols-1 lg:grid-cols-2">
        <div className="p-8 lg:p-12 space-y-6 bg-bg/40">
          <div className="space-y-3">
            <div className="data-label">Profile dossier</div>
            <h2 className="font-serif text-3xl tracking-tight text-text">{user.name || user.login}</h2>
            {user.bio && (
              <p className="text-text-dim text-sm leading-relaxed max-w-prose">{user.bio}</p>
            )}
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <a
              href={user.html_url}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-3 p-3 bg-surface-2/50 rounded-lg border border-border-subtle hover:border-accent transition-colors"
            >
              <Github className="w-4 h-4 text-accent" />
              <div className="flex-1 min-w-0">
                <p className="text-[10px] text-text-mute uppercase tracking-widest font-mono">GitHub</p>
                <p className="text-sm font-mono text-text truncate">@{user.login}</p>
              </div>
              <ExternalLink className="w-3 h-3 text-text-mute" />
            </a>

            {hasBlog && (
              <a
                href={user.blog!.startsWith('http') ? user.blog! : `https://${user.blog}`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-3 p-3 bg-surface-2/50 rounded-lg border border-border-subtle hover:border-accent transition-colors"
              >
                <Globe className="w-4 h-4 text-warm" />
                <div className="flex-1 min-w-0">
                  <p className="text-[10px] text-text-mute uppercase tracking-widest font-mono">Website</p>
                  <p className="text-sm font-mono text-text truncate">{user.blog}</p>
                </div>
                <ExternalLink className="w-3 h-3 text-text-mute" />
              </a>
            )}

            {hasTwitter && (
              <a
                href={`https://twitter.com/${user.twitter_username}`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-3 p-3 bg-surface-2/50 rounded-lg border border-border-subtle hover:border-accent transition-colors"
              >
                <Mail className="w-4 h-4 text-violet" />
                <div className="flex-1 min-w-0">
                  <p className="text-[10px] text-text-mute uppercase tracking-widest font-mono">X / Twitter</p>
                  <p className="text-sm font-mono text-text truncate">@{user.twitter_username}</p>
                </div>
                <ExternalLink className="w-3 h-3 text-text-mute" />
              </a>
            )}
          </div>
        </div>

        <div className="p-8 lg:p-12 bg-surface-2/40 flex flex-col justify-between">
          <div className="space-y-3">
            <div className="data-label">Snapshot</div>
            <div className="grid grid-cols-3 gap-3">
              <div>
                <p className="font-serif text-3xl text-accent tracking-tight">{user.public_repos}</p>
                <p className="text-[10px] text-text-mute uppercase tracking-widest font-mono mt-1">Repos</p>
              </div>
              <div>
                <p className="font-serif text-3xl text-text tracking-tight">{user.followers}</p>
                <p className="text-[10px] text-text-mute uppercase tracking-widest font-mono mt-1">Followers</p>
              </div>
              <div>
                <p className="font-serif text-3xl text-text tracking-tight">{user.following}</p>
                <p className="text-[10px] text-text-mute uppercase tracking-widest font-mono mt-1">Following</p>
              </div>
            </div>
          </div>

          <div className="text-[10px] font-mono uppercase tracking-widest text-text-mute mt-8 pt-6 border-t border-border-subtle">
            Profile rendered by GitVisualizer · open the source on{' '}
            <a
              href="https://github.com/mizcausevic-dev/gitvisualizer"
              className="text-accent hover:underline"
              target="_blank"
              rel="noopener noreferrer"
            >
              GitHub
            </a>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
