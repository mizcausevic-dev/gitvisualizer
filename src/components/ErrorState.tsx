import { motion } from 'motion/react';
import { AlertCircle, RefreshCw, Clock, UserX } from 'lucide-react';

interface ErrorStateProps {
  error: Error;
  username: string;
  onRetry: () => void;
}

interface ParsedError {
  kind: 'rate_limit' | 'not_found' | 'network' | 'unknown';
  title: string;
  detail: string;
  icon: React.ComponentType<{ className?: string }>;
}

function parseError(error: Error, username: string): ParsedError {
  const msg = error.message.toLowerCase();

  if (msg.includes('rate limit') || msg.includes('403')) {
    return {
      kind: 'rate_limit',
      title: 'GitHub API rate limit hit',
      detail: 'Unauthenticated requests are capped at 60 per hour. Try again in a few minutes — or wait for our backend proxy in Phase 2.',
      icon: Clock,
    };
  }

  if (msg.includes('404') || msg.includes('not found')) {
    return {
      kind: 'not_found',
      title: `User "${username}" not found`,
      detail: 'Double-check the GitHub username — capitalization matters, and the user must exist.',
      icon: UserX,
    };
  }

  if (msg.includes('network') || msg.includes('fetch')) {
    return {
      kind: 'network',
      title: 'Network unreachable',
      detail: 'Check your connection and try again.',
      icon: AlertCircle,
    };
  }

  return {
    kind: 'unknown',
    title: 'Something went wrong',
    detail: error.message || 'Unexpected error',
    icon: AlertCircle,
  };
}

export function ErrorState({ error, username, onRetry }: ErrorStateProps) {
  const parsed = parseError(error, username);
  const Icon = parsed.icon;

  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      className="flex flex-col items-center justify-center min-h-[60vh] text-center space-y-5 px-4"
    >
      <div className="w-14 h-14 rounded-2xl bg-surface border border-border-subtle flex items-center justify-center">
        <Icon className="w-6 h-6 text-warm" />
      </div>
      <div className="space-y-2 max-w-md">
        <h2 className="font-serif text-2xl text-text">{parsed.title}</h2>
        <p className="text-text-dim text-sm leading-relaxed">{parsed.detail}</p>
      </div>
      <button
        onClick={onRetry}
        className="flex items-center gap-2 px-6 py-2 bg-surface border border-border-subtle hover:border-accent rounded-full text-xs font-mono uppercase tracking-wider transition-colors"
      >
        <RefreshCw className="w-3 h-3" />
        Retry
      </button>
    </motion.div>
  );
}
