import { motion } from 'motion/react';
import { 
  ResponsiveContainer, 
  PieChart, 
  Pie, 
  Cell, 
  Tooltip, 
  Radar, 
  RadarChart, 
  PolarGrid, 
  PolarAngleAxis 
} from 'recharts';
import { RepositoryStats } from '../types';
import { Star, GitFork, Book, Code2, Zap } from 'lucide-react';

interface StatsProps {
  stats: RepositoryStats;
  repoCount: number;
}

const COLORS = ['#66FCF1', '#FBBF24', '#A78BFA', '#34D399', '#F87171', '#FB923C'];

export function Stats({ stats, repoCount }: StatsProps) {
  const chartData = Object.entries(stats.languages)
    .map(([name, value]) => ({ name, value }))
    .sort((a, b) => b.value - a.value)
    .slice(0, 6);

  // Data for Radar Chart
  const radarData = chartData.map(item => ({
    subject: item.name,
    A: item.value,
    fullMark: Math.max(...chartData.map(d => d.value))
  }));

  const containerVariants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, x: -20 },
    show: { opacity: 1, x: 0 }
  };

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="show"
      className="space-y-8"
    >
      <div className="grid grid-cols-2 gap-4">
        <motion.div variants={itemVariants} className="technical-card p-4 space-y-2">
          <div className="flex items-center gap-2 text-zinc-500">
            <Book className="w-3.5 h-3.5" />
            <span className="data-label">Repos</span>
          </div>
          <p className="stat-value">{repoCount}</p>
        </motion.div>

        <motion.div variants={itemVariants} className="technical-card p-4 space-y-2">
          <div className="flex items-center gap-2 text-zinc-500">
            <Star className="w-3.5 h-3.5" />
            <span className="data-label">Stars</span>
          </div>
          <p className="stat-value">{stats.totalStars}</p>
        </motion.div>

        <motion.div variants={itemVariants} className="technical-card p-4 space-y-2">
          <div className="flex items-center gap-2 text-zinc-500">
            <GitFork className="w-3.5 h-3.5" />
            <span className="data-label">Forks</span>
          </div>
          <p className="stat-value">{stats.totalForks}</p>
        </motion.div>

        <motion.div variants={itemVariants} className="technical-card p-4 space-y-2">
          <div className="flex items-center gap-2 text-zinc-500">
            <Code2 className="w-3.5 h-3.5" />
            <span className="data-label">Languages</span>
          </div>
          <p className="stat-value">{Object.keys(stats.languages).length}</p>
        </motion.div>
      </div>

      <motion.div variants={itemVariants} className="technical-card p-6 space-y-6">
        <div className="flex items-center justify-between">
          <div className="space-y-1">
            <h3 className="text-sm font-medium">Capability Matrix</h3>
            <p className="text-xs text-zinc-500 uppercase tracking-widest font-mono">Language Frequency</p>
          </div>
          <Zap className="w-4 h-4 text-zinc-600" />
        </div>

        <div className="h-64 w-full">
          <ResponsiveContainer width="100%" height="100%">
            <RadarChart cx="50%" cy="50%" outerRadius="80%" data={radarData}>
              <PolarGrid stroke="#2A2F38" />
              <PolarAngleAxis 
                dataKey="subject" 
                tick={{ fill: '#8A8F99', fontSize: 10, fontFamily: 'IBM Plex Mono' }} 
              />
              <Radar
                name="Proficiency"
                dataKey="A"
                stroke="#66FCF1"
                strokeWidth={2}
                fill="#66FCF1"
                fillOpacity={0.4}
              />
              <Tooltip
                contentStyle={{
                  backgroundColor: '#14161C',
                  border: '1px solid #2A2F38',
                  borderRadius: '8px',
                  fontSize: '12px',
                  fontFamily: 'IBM Plex Sans, sans-serif'
                }}
              />
            </RadarChart>
          </ResponsiveContainer>
        </div>
      </motion.div>

      <motion.div variants={itemVariants} className="technical-card p-6 space-y-6">
        <div className="space-y-1">
          <h3 className="text-sm font-medium">Language Distribution</h3>
          <p className="text-xs text-zinc-500 uppercase tracking-widest font-mono">Top technologies</p>
        </div>

        <div className="h-48 w-full">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={chartData}
                innerRadius={50}
                outerRadius={70}
                paddingAngle={5}
                dataKey="value"
                stroke="none"
              >
                {chartData.map((_, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip
                contentStyle={{
                  backgroundColor: '#14161C',
                  border: '1px solid #2A2F38',
                  borderRadius: '8px',
                  fontSize: '12px',
                  fontFamily: 'IBM Plex Sans, sans-serif'
                }}
              />
            </PieChart>
          </ResponsiveContainer>
        </div>

        <div className="grid grid-cols-2 gap-x-4 gap-y-3">
          {chartData.map((item, index) => (
            <div key={item.name} className="flex items-center gap-2">
              <div
                className="w-2 h-2 rounded-full"
                style={{ backgroundColor: COLORS[index % COLORS.length] }}
              />
              <span className="text-xs text-zinc-400 font-medium">{item.name}</span>
              <span className="text-[10px] text-zinc-600 ml-auto font-mono">{item.value}</span>
            </div>
          ))}
        </div>
      </motion.div>
    </motion.div>
  );
}

