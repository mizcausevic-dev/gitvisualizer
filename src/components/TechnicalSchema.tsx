import { motion } from 'motion/react';
import { Layers, Share2, FileJson } from 'lucide-react';
import { GithubUser, GithubRepo } from '../types';

interface TechnicalSchemaProps {
  user: GithubUser;
  repos: GithubRepo[];
}

function deriveExpertise(repos: GithubRepo[]): string[] {
  const counts: Record<string, number> = {};
  repos.forEach((r) => {
    (r.topics || []).forEach((t) => {
      counts[t] = (counts[t] || 0) + 1;
    });
  });
  return Object.entries(counts)
    .sort((a, b) => b[1] - a[1])
    .slice(0, 4)
    .map(([t]) => t);
}

export function TechnicalSchema({ user, repos }: TechnicalSchemaProps) {
  const expertise = deriveExpertise(repos);
  const hasExpertise = expertise.length > 0;

  // The JSON-LD payload that consuming search engines / AI crawlers can lift
  const schemaMarkup = {
    '@context': 'https://schema.org/',
    '@type': 'Person',
    name: user.name || user.login,
    alternateName: user.login,
    url: user.html_url,
    sameAs: [user.html_url, user.blog].filter(Boolean),
    knowsAbout: hasExpertise ? expertise : undefined,
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      className="technical-card p-6 space-y-6"
    >
      <div className="flex items-center justify-between">
        <div className="space-y-1">
          <h3 className="text-sm font-medium text-text">JSON-LD Schema</h3>
          <p className="text-[10px] text-text-mute font-mono uppercase tracking-widest">Entity definition for AI crawlers</p>
        </div>
        <FileJson className="w-4 h-4 text-accent" />
      </div>

      {/* Embed actual machine-readable JSON-LD for crawlers */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaMarkup) }}
      />

      <pre className="p-4 bg-bg/60 rounded-lg border border-border-subtle font-mono text-[10px] overflow-x-auto custom-scrollbar leading-relaxed">
{`{
  "@context": `}<span className="text-good">{`"https://schema.org/"`}</span>{`,
  "@type": `}<span className="text-good">{`"Person"`}</span>{`,
  "name": `}<span className="text-warm">{`"${user.name || user.login}"`}</span>{`,
  "alternateName": `}<span className="text-warm">{`"${user.login}"`}</span>{`,
  "url": `}<span className="text-violet">{`"${user.html_url}"`}</span>{`,
  "sameAs": [`}{user.blog ? <span className="text-violet">{`"${user.blog}"`}</span> : <span className="text-text-mute">{`...`}</span>}{`],
  "knowsAbout": [${hasExpertise ? expertise.map((e) => `"${e}"`).join(', ') : '...'}]
}`}
      </pre>

      <div className="grid grid-cols-2 gap-3">
        <div className="flex items-center gap-3 p-3 bg-bg/40 rounded-lg border border-border-subtle">
          <Layers className="w-4 h-4 text-text-mute" />
          <div className="flex-1">
            <p className="text-[8px] uppercase tracking-widest text-text-mute font-mono">Topics tagged</p>
            <p className="text-xs font-mono text-text">{Object.keys(deriveExpertise(repos)).length || 0}</p>
          </div>
        </div>
        <div className="flex items-center gap-3 p-3 bg-bg/40 rounded-lg border border-border-subtle">
          <Share2 className="w-4 h-4 text-text-mute" />
          <div className="flex-1">
            <p className="text-[8px] uppercase tracking-widest text-text-mute font-mono">External links</p>
            <p className="text-xs font-mono text-text">{[user.html_url, user.blog].filter(Boolean).length}</p>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
