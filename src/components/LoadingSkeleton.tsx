import { motion, type Transition } from 'motion/react';

const shimmerAnimate = { opacity: [0.3, 0.55, 0.3] };
const shimmerTransition: Transition = {
  duration: 1.5,
  repeat: Infinity,
  ease: 'easeInOut' as const,
};

export function LoadingSkeleton() {
  return (
    <div className="space-y-12 pb-12">
      {/* Header skeleton */}
      <div className="flex flex-col md:flex-row gap-8 items-start">
        <motion.div animate={shimmerAnimate} transition={shimmerTransition} className="w-40 h-40 md:w-48 md:h-48 bg-surface rounded-2xl" />
        <div className="flex-1 space-y-4 w-full">
          <motion.div animate={shimmerAnimate} transition={shimmerTransition} className="h-10 bg-surface rounded w-3/5 max-w-md" />
          <motion.div animate={shimmerAnimate} transition={shimmerTransition} className="h-4 bg-surface rounded w-2/5 max-w-xs" />
          <motion.div animate={shimmerAnimate} transition={shimmerTransition} className="h-3 bg-surface rounded w-3/4 max-w-lg" />
          <div className="flex gap-3 pt-2">
            <motion.div animate={shimmerAnimate} transition={shimmerTransition} className="h-8 bg-surface rounded-full w-24" />
            <motion.div animate={shimmerAnimate} transition={shimmerTransition} className="h-8 bg-surface rounded-full w-24" />
          </div>
        </div>
      </div>

      {/* KPI grid */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
        {Array.from({ length: 6 }).map((_, i) => (
          <motion.div
            key={i}
            animate={shimmerAnimate}
            transition={{ ...shimmerTransition, delay: i * 0.05 }}
            className="h-24 bg-surface rounded-xl"
          />
        ))}
      </div>

      {/* Card grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {Array.from({ length: 3 }).map((_, i) => (
          <motion.div
            key={i}
            animate={shimmerAnimate}
            transition={{ ...shimmerTransition, delay: i * 0.08 }}
            className="h-48 bg-surface rounded-xl"
          />
        ))}
      </div>

      {/* Repo grid placeholder */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {Array.from({ length: 6 }).map((_, i) => (
          <motion.div
            key={i}
            animate={shimmerAnimate}
            transition={{ ...shimmerTransition, delay: i * 0.04 }}
            className="h-32 bg-surface rounded-xl"
          />
        ))}
      </div>

      <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-text-mute text-center">
        Synchronizing GitHub data...
      </p>
    </div>
  );
}
