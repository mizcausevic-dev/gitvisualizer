import { motion } from 'motion/react';
import { Tag } from 'lucide-react';

interface TopicCloudProps {
  repos: any[];
}

export function TopicCloud({ repos }: TopicCloudProps) {
  // Extract and count topics
  const topicsMap: { [key: string]: number } = {};
  repos.forEach(repo => {
    (repo.topics || []).forEach((topic: string) => {
      topicsMap[topic] = (topicsMap[topic] || 0) + 1;
    });
  });

  const sortedTopics = Object.entries(topicsMap)
    .map(([name, count]) => ({ name, count }))
    .sort((a, b) => b.count - a.count)
    .slice(0, 20);

  if (sortedTopics.length === 0) return null;

  const maxCount = Math.max(...sortedTopics.map(t => t.count));

  return (
    <div className="technical-card p-6 space-y-6">
      <div className="flex items-center justify-between">
        <div className="space-y-1">
          <h3 className="text-sm font-medium">Domain Expertise</h3>
          <p className="text-xs text-zinc-500 uppercase tracking-widest font-mono">Top Repository Topics</p>
        </div>
        <Tag className="w-4 h-4 text-zinc-600" />
      </div>

      <div className="flex flex-wrap gap-2">
        {sortedTopics.map((topic, index) => {
          const weight = topic.count / maxCount;
          return (
            <motion.span
              key={topic.name}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: index * 0.05 }}
              className="px-3 py-1.5 rounded-lg font-mono text-[10px] uppercase tracking-wider border border-border-subtle transition-all hover:border-accent/40 hover:bg-accent-muted flex items-center gap-1.5"
              style={{
                fontSize: `${10 + weight * 4}px`,
                backgroundColor: `rgba(102, 252, 241, ${0.05 + weight * 0.1})`,
                color: weight > 0.7 ? '#fff' : '#a1a1aa'
              }}
            >
              {topic.name}
              <span className="text-[8px] text-zinc-600 font-bold">{topic.count}</span>
            </motion.span>
          );
        })}
      </div>
    </div>
  );
}
