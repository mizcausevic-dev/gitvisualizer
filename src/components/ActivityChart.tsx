import { motion } from 'motion/react';
import { 
  AreaChart, 
  Area, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer 
} from 'recharts';
import { Activity } from 'lucide-react';

interface ActivityChartProps {
  repos: any[];
}

export function ActivityChart({ repos }: ActivityChartProps) {
  // Process repo updates by month
  const last12Months = Array.from({ length: 12 }, (_, i) => {
    const d = new Date();
    d.setMonth(d.getMonth() - i);
    return {
      month: d.toLocaleString('default', { month: 'short' }),
      count: 0,
      timestamp: d.getTime()
    };
  }).reverse();

  repos.forEach(repo => {
    const updateDate = new Date(repo.updated_at);
    const monthStr = updateDate.toLocaleString('default', { month: 'short' });
    const year = updateDate.getFullYear();
    const now = new Date();
    
    // Check if within last 12 months
    if (now.getTime() - updateDate.getTime() < 365 * 24 * 60 * 60 * 1000) {
      const monthData = last12Months.find(m => m.month === monthStr);
      if (monthData) monthData.count += 1;
    }
  });

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="technical-card p-6 space-y-6"
    >
      <div className="flex items-center justify-between">
        <div className="space-y-1">
          <h3 className="text-sm font-medium">Activity Pulse</h3>
          <p className="text-xs text-zinc-500 uppercase tracking-widest font-mono">Recent Updates (12M)</p>
        </div>
        <Activity className="w-4 h-4 text-zinc-600" />
      </div>

      <div className="h-48 w-full">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={last12Months}>
            <defs>
              <linearGradient id="colorCount" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#66FCF1" stopOpacity={0.3}/>
                <stop offset="95%" stopColor="#66FCF1" stopOpacity={0}/>
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" stroke="#2A2F38" vertical={false} />
            <XAxis 
              dataKey="month" 
              axisLine={false} 
              tickLine={false} 
              tick={{ fill: '#8A8F99', fontSize: 10, fontFamily: 'IBM Plex Mono' }}
            />
            <YAxis hide />
            <Tooltip
              contentStyle={{
                backgroundColor: '#14161C',
                border: '1px solid #2A2F38',
                borderRadius: '8px',
                fontSize: '12px',
                fontFamily: 'IBM Plex Sans, sans-serif',
                color: '#fff'
              }}
              itemStyle={{ color: '#66FCF1' }}
            />
            <Area
              type="monotone"
              dataKey="count"
              stroke="#66FCF1"
              fillOpacity={1}
              fill="url(#colorCount)"
              strokeWidth={2}
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </motion.div>
  );
}
