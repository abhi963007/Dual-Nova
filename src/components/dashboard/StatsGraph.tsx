import React, { useState, useEffect } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { MoreHorizontal, HelpCircle, Loader2 } from 'lucide-react';
import { supabase } from '../../lib/supabaseClient';

interface ProjectData {
  name: string;
  revenue: number;
  expectedRevenue: number;
  projects: number;
}

export const StatsGraph: React.FC = () => {
  const [graphData, setGraphData] = useState<ProjectData[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchProjectData = async () => {
      setLoading(true);
      try {
        // In a real app, you would have a table with monthly stats
        // Here we'll simulate by querying admin_users and generating stats
        const { data: adminUsers, error: adminError } = await supabase
          .from('admin_users')
          .select('created_at');
          
        if (adminError) throw adminError;
        
        // Generate monthly data based on real user data
        const months = ['Nov', 'Dec', 'Jan', 'Feb', 'Mar', 'Apr', 'May', 'June', 'July'];
        const monthlyData = months.map((month, index) => {
          // Use the number of users as a seed for revenue calculation
          const userCount = adminUsers?.length || 1;
          const baseRevenue = 500 + (userCount * 300) + (Math.random() * 1000);
          const revenue = Math.round(baseRevenue * (1 + (index * 0.1))); // Increasing trend
          const expectedRevenue = Math.max(revenue + (Math.random() - 0.3) * 1000, 0);
          
          return {
            name: month,
            revenue,
            expectedRevenue,
            projects: Math.floor((userCount * 2) + (Math.random() * 10)),
          };
        });
        
        setGraphData(monthlyData);
      } catch (err) {
        console.error('Error fetching project data:', err);
        setError('Failed to load project data');
      } finally {
        setLoading(false);
      }
    };
    
    fetchProjectData();
  }, []);

  const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-[#1d1d1d] border border-gray-700 rounded-xl overflow-hidden">
          <div className="flex items-center justify-between p-2 bg-[#252525]">
            <div className="text-white">Revenue</div>
            <MoreHorizontal className="w-4 h-4 text-gray-400" />
          </div>
          <div className="p-3 text-center">
            <div className="text-white font-bold">${payload[0].value.toFixed(2)}</div>
            <div className="text-gray-400">Revenue from {payload[0].payload.projects} projects</div>
          </div>
        </div>
      );
    }
    return null;
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-full">
        <Loader2 className="animate-spin text-gray-400" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center h-full">
        <div className="text-red-400">{error}</div>
      </div>
    );
  }

  return (
    <div className="flex p-4 h-full flex-col">
      <div className="">
        <div className="flex items-center">
          <div className="font-bold text-white">Project Analytics Summary</div>
          <div className="flex-grow" />
          <div className="text-gray-400 text-sm">Last 9 Months</div>
          <div className="ml-6 w-5 h-5 flex justify-center items-center rounded-full bg-[#2d2d2d] text-gray-400 text-xs">
            ?
          </div>
        </div>
        <div className="text-gray-400 text-sm ml-5">Nov - July</div>
      </div>

      <div className="flex-grow">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart width={500} height={300} data={graphData}>
            <defs>
              <linearGradient id="paint0_linear" x1="0" y1="0" x2="1" y2="0">
                <stop stopColor="#6B8DE3" />
                <stop offset="1" stopColor="#7D1C8D" />
              </linearGradient>
            </defs>
            <CartesianGrid
              horizontal={false}
              strokeWidth="2"
              stroke="#252525"
            />
            <XAxis
              dataKey="name"
              axisLine={false}
              tickLine={false}
              tickMargin={10}
              tick={{ fill: '#676767' }}
            />
            <YAxis 
              axisLine={false} 
              tickLine={false} 
              tickMargin={10}
              tick={{ fill: '#676767' }}
            />
            <Tooltip content={<CustomTooltip />} cursor={false} />
            <Line
              activeDot={false}
              type="monotone"
              dataKey="expectedRevenue"
              stroke="#242424"
              strokeWidth="3"
              dot={false}
              strokeDasharray="8 8"
            />
            <Line
              type="monotone"
              dataKey="revenue"
              stroke="url(#paint0_linear)"
              strokeWidth="4"
              dot={false}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};
