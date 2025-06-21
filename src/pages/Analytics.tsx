import React, { useState, useEffect } from 'react';
import { DashboardSidebar } from '../components/dashboard/DashboardSidebar';
import { Menu, BarChart2, TrendingUp, Activity, Globe, User, Filter } from 'lucide-react';
import { supabase } from '../lib/supabaseClient';
import { Navigate } from 'react-router-dom';

// A simple ProtectedRoute for SuperAdmin
const SuperAdminRoute: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isSuperAdmin, setIsSuperAdmin] = useState<boolean | null>(null);
  const [loading, setLoading] = useState(true);
  const superAdmins = ['Abhiram', 'Rojin', 'Arjun'];

  useEffect(() => {
    const checkSuperAdmin = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      if (!session) {
        setIsSuperAdmin(false);
        setLoading(false);
        return;
      }

      try {
        const { data } = await supabase
          .from('admin_users')
          .select('full_name')
          .eq('id', session.user.id)
          .single();
        
        setIsSuperAdmin(data?.full_name && superAdmins.includes(data.full_name));
        setLoading(false);
      } catch (error) {
        console.error('Error checking super admin status:', error);
        setIsSuperAdmin(false);
        setLoading(false);
      }
    };

    checkSuperAdmin();
  }, []);

  if (loading) return <div className="flex justify-center items-center h-screen bg-[#1e1e1e]">
    <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-blue-500"></div>
  </div>;

  if (!isSuperAdmin) return <Navigate to="/" replace />;

  return <>{children}</>;
};

const Analytics = () => {
  const [showSidebar, setShowSidebar] = useState(false);
  const [period, setPeriod] = useState('week');
  const [activeTab, setActiveTab] = useState('overview');
  const [enquiries, setEnquiries] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [stats, setStats] = useState({
    totalEnquiries: 0,
    uniqueVisitors: 0,
    conversionRate: 0,
    avgResponseTime: 0
  });

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        // Fetch enquiries
        const { data, error } = await supabase
          .from('enquiries')
          .select('*')
          .order('created_at', { ascending: false });
        
        if (error) throw error;
        
        const enquiriesData = data || [];
        setEnquiries(enquiriesData);
        
        // Calculate stats
        setStats({
          totalEnquiries: enquiriesData.length,
          uniqueVisitors: Math.floor(enquiriesData.length * 5.7), // Simulated: About 5.7x visitors than enquiries
          conversionRate: enquiriesData.length > 0 ? +((enquiriesData.length / (enquiriesData.length * 5.7)) * 100).toFixed(1) : 0,
          avgResponseTime: 3.2 // Hours (simulated)
        });
        
        setLoading(false);
      } catch (err) {
        console.error('Error fetching data:', err);
        setLoading(false);
      }
    };

    fetchData();

    // Setup realtime listener
    const channel = supabase
      .channel('analytics_changes')
      .on('postgres_changes', { event: 'INSERT', schema: 'public', table: 'enquiries' }, () => {
        fetchData();
      })
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, []);

  // Function to generate mock chart data
  const generateChartData = (days: number = 7) => {
    const labels = Array.from({ length: days }, (_, i) => {
      const d = new Date();
      d.setDate(d.getDate() - (days - 1) + i);
      return d.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
    });
    
    return {
      labels,
      datasets: [
        {
          label: 'Website Visitors',
          data: Array.from({ length: days }, () => Math.floor(Math.random() * 100) + 50),
          borderColor: 'rgba(99, 102, 241, 1)',
          backgroundColor: 'rgba(99, 102, 241, 0.5)',
        },
        {
          label: 'Enquiries',
          data: Array.from({ length: days }, () => Math.floor(Math.random() * 20) + 5),
          borderColor: 'rgba(168, 85, 247, 1)',
          backgroundColor: 'rgba(168, 85, 247, 0.5)',
        }
      ]
    };
  };

  // Data for different tabs
  const tabData = {
    overview: generateChartData(period === 'week' ? 7 : period === 'month' ? 30 : 90),
    services: {
      labels: ['Web Development', 'Mobile Apps', 'UI/UX Design', 'API Development', 'Full Stack'],
      data: [40, 25, 15, 12, 8]
    },
    locations: {
      labels: ['United States', 'India', 'UK', 'Canada', 'Australia', 'Germany', 'Other'],
      data: [35, 25, 15, 10, 8, 5, 2]
    }
  };

  const renderChart = () => {
    if (loading) {
      return <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-blue-500"></div>
      </div>;
    }

    // Return different chart UI based on activeTab
    return (
      <div className="relative h-80 bg-[#171717] rounded-lg p-5">
        <div className="flex justify-between mb-5">
          <h3 className="text-xl font-bold text-white">
            {activeTab === 'overview' ? 'Traffic & Enquiries' : 
             activeTab === 'services' ? 'Service Distribution' : 'Geographic Distribution'}
          </h3>
          {activeTab === 'overview' && (
            <div className="flex space-x-2">
              <button 
                onClick={() => setPeriod('week')} 
                className={`px-3 py-1 text-xs rounded-full ${period === 'week' ? 'bg-blue-500 text-white' : 'bg-[#222] text-gray-300'}`}
              >
                Week
              </button>
              <button 
                onClick={() => setPeriod('month')} 
                className={`px-3 py-1 text-xs rounded-full ${period === 'month' ? 'bg-blue-500 text-white' : 'bg-[#222] text-gray-300'}`}
              >
                Month
              </button>
              <button 
                onClick={() => setPeriod('quarter')} 
                className={`px-3 py-1 text-xs rounded-full ${period === 'quarter' ? 'bg-blue-500 text-white' : 'bg-[#222] text-gray-300'}`}
              >
                Quarter
              </button>
            </div>
          )}
        </div>

        {/* Display mock chart UI */}
        <div className="h-52 w-full">
          {activeTab === 'overview' && (
            <div className="relative h-full">
              <div className="absolute bottom-0 left-0 w-full h-full flex items-end">
                {tabData.overview.labels.map((label, index) => (
                  <div key={index} className="flex-1 flex flex-col items-center">
                    <div className="relative w-full flex justify-center">
                      <div 
                        className="w-4 bg-purple-500 rounded-t-sm mx-1" 
                        style={{ height: `${tabData.overview.datasets[1].data[index]}px` }}
                      ></div>
                      <div 
                        className="w-4 bg-blue-500 rounded-t-sm mx-1" 
                        style={{ height: `${tabData.overview.datasets[0].data[index]}px` }}
                      ></div>
                    </div>
                    <div className="text-xs text-gray-400 mt-2">{label}</div>
                  </div>
                ))}
              </div>
            </div>
          )}
          
          {activeTab === 'services' && (
            <div className="h-full flex items-center justify-center">
              <div className="w-full flex h-28">
                {tabData.services.labels.map((label, index) => (
                  <div key={index} className="flex-1 flex flex-col items-center justify-end">
                    <div 
                      className="w-full max-w-[30px] bg-gradient-to-t from-blue-500 to-purple-500 rounded-t-sm" 
                      style={{ height: `${tabData.services.data[index] * 2}px` }}
                    ></div>
                    <div className="text-xs text-gray-400 mt-2 text-center">{label}</div>
                    <div className="text-xs font-bold mt-1">{tabData.services.data[index]}%</div>
                  </div>
                ))}
              </div>
            </div>
          )}
          
          {activeTab === 'locations' && (
            <div className="h-full flex items-center justify-center">
              <div className="w-full flex h-28">
                {tabData.locations.labels.map((label, index) => (
                  <div key={index} className="flex-1 flex flex-col items-center justify-end">
                    <div 
                      className="w-full max-w-[30px] bg-gradient-to-t from-blue-500 to-purple-500 rounded-t-sm" 
                      style={{ height: `${tabData.locations.data[index] * 2}px` }}
                    ></div>
                    <div className="text-xs text-gray-400 mt-2 text-center">{label}</div>
                    <div className="text-xs font-bold mt-1">{tabData.locations.data[index]}%</div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    );
  };

  return (
    <SuperAdminRoute>
      <div className="min-h-screen bg-[#1e1e1e] text-white font-outfit">
        <div className="flex">
          <DashboardSidebar
            onSidebarHide={() => setShowSidebar(false)}
            showSidebar={showSidebar}
          />
          
          <div className="flex w-full">
            <div className="w-full h-screen hidden sm:block sm:w-20 xl:w-60 flex-shrink-0">
              {/* Spacer for sidebar */}
            </div>
            <div className="h-screen flex-grow overflow-x-hidden overflow-auto flex flex-wrap content-start p-2">
              {/* Header */}
              <div className="w-full sm:flex p-2 items-end">
                <div className="sm:flex-grow flex justify-between">
                  <div className="">
                    <div className="flex items-center">
                      <div className="text-3xl font-bold text-white">Analytics Dashboard</div>
                      <div className="flex items-center p-2 bg-gradient-to-r from-blue-500/20 to-purple-500/20 ml-2 rounded-xl">
                        <BarChart2 className="w-4 h-4 text-blue-500" />
                        <div className="ml-2 font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-500">
                          SUPER ADMIN
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center">
                      <Filter className="w-3 h-3 text-gray-400" />
                      <div className="ml-2 text-gray-400">All time data</div>
                    </div>
                  </div>
                  <button
                    onClick={() => setShowSidebar(true)}
                    className="block sm:hidden p-2 hover:bg-white/5 rounded"
                  >
                    <Menu size={20} />
                  </button>
                </div>
              </div>
              
              {/* Stats Cards */}
              <div className="w-full p-2 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                <div className="bg-[#171717] rounded-lg p-4 border-l-4 border-blue-500">
                  <div className="flex justify-between">
                    <div>
                      <div className="text-gray-400 text-sm">Total Enquiries</div>
                      <div className="text-2xl font-bold text-white">{stats.totalEnquiries}</div>
                    </div>
                    <div className="bg-blue-500/20 p-2 rounded-lg">
                      <Activity className="w-6 h-6 text-blue-500" />
                    </div>
                  </div>
                  <div className="flex items-center mt-2">
                    <TrendingUp className="w-3 h-3 text-green-500" />
                    <span className="text-green-500 text-xs ml-1">+24.5%</span>
                    <span className="text-gray-500 text-xs ml-1">vs last month</span>
                  </div>
                </div>
                
                <div className="bg-[#171717] rounded-lg p-4 border-l-4 border-purple-500">
                  <div className="flex justify-between">
                    <div>
                      <div className="text-gray-400 text-sm">Unique Visitors</div>
                      <div className="text-2xl font-bold text-white">{stats.uniqueVisitors}</div>
                    </div>
                    <div className="bg-purple-500/20 p-2 rounded-lg">
                      <User className="w-6 h-6 text-purple-500" />
                    </div>
                  </div>
                  <div className="flex items-center mt-2">
                    <TrendingUp className="w-3 h-3 text-green-500" />
                    <span className="text-green-500 text-xs ml-1">+12.3%</span>
                    <span className="text-gray-500 text-xs ml-1">vs last month</span>
                  </div>
                </div>
                
                <div className="bg-[#171717] rounded-lg p-4 border-l-4 border-green-500">
                  <div className="flex justify-between">
                    <div>
                      <div className="text-gray-400 text-sm">Conversion Rate</div>
                      <div className="text-2xl font-bold text-white">{stats.conversionRate}%</div>
                    </div>
                    <div className="bg-green-500/20 p-2 rounded-lg">
                      <TrendingUp className="w-6 h-6 text-green-500" />
                    </div>
                  </div>
                  <div className="flex items-center mt-2">
                    <TrendingUp className="w-3 h-3 text-green-500" />
                    <span className="text-green-500 text-xs ml-1">+3.2%</span>
                    <span className="text-gray-500 text-xs ml-1">vs last month</span>
                  </div>
                </div>
                
                <div className="bg-[#171717] rounded-lg p-4 border-l-4 border-orange-500">
                  <div className="flex justify-between">
                    <div>
                      <div className="text-gray-400 text-sm">Avg Response Time</div>
                      <div className="text-2xl font-bold text-white">{stats.avgResponseTime}h</div>
                    </div>
                    <div className="bg-orange-500/20 p-2 rounded-lg">
                      <Globe className="w-6 h-6 text-orange-500" />
                    </div>
                  </div>
                  <div className="flex items-center mt-2">
                    <TrendingUp className="w-3 h-3 text-red-500 rotate-180" />
                    <span className="text-red-500 text-xs ml-1">-1.2h</span>
                    <span className="text-gray-500 text-xs ml-1">vs last month</span>
                  </div>
                </div>
              </div>
              
              {/* Chart tabs */}
              <div className="w-full p-2">
                <div className="bg-[#171717] rounded-lg p-4 mb-4">
                  <div className="flex space-x-2">
                    <button 
                      onClick={() => setActiveTab('overview')} 
                      className={`px-4 py-2 text-sm rounded-lg ${activeTab === 'overview' ? 'bg-blue-500 text-white' : 'bg-[#222] text-gray-300'}`}
                    >
                      Overview
                    </button>
                    <button 
                      onClick={() => setActiveTab('services')} 
                      className={`px-4 py-2 text-sm rounded-lg ${activeTab === 'services' ? 'bg-blue-500 text-white' : 'bg-[#222] text-gray-300'}`}
                    >
                      Services
                    </button>
                    <button 
                      onClick={() => setActiveTab('locations')} 
                      className={`px-4 py-2 text-sm rounded-lg ${activeTab === 'locations' ? 'bg-blue-500 text-white' : 'bg-[#222] text-gray-300'}`}
                    >
                      Locations
                    </button>
                  </div>
                </div>
                
                {renderChart()}
              </div>
              
              {/* Recent Enquiries */}
              <div className="w-full p-2">
                <div className="bg-[#171717] rounded-lg p-4">
                  <h3 className="text-xl font-bold text-white mb-4">Recent Enquiries</h3>
                  
                  {loading ? (
                    <div className="flex justify-center items-center h-40">
                      <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-blue-500"></div>
                    </div>
                  ) : enquiries.length > 0 ? (
                    <div className="overflow-x-auto">
                      <table className="min-w-full text-sm text-left text-gray-400">
                        <thead className="text-xs uppercase bg-[#1e1e1e] text-gray-500">
                          <tr>
                            <th scope="col" className="px-4 py-3">Name</th>
                            <th scope="col" className="px-4 py-3">Email</th>
                            <th scope="col" className="px-4 py-3">Service</th>
                            <th scope="col" className="px-4 py-3">Budget</th>
                            <th scope="col" className="px-4 py-3">Status</th>
                            <th scope="col" className="px-4 py-3">Date</th>
                          </tr>
                        </thead>
                        <tbody>
                          {enquiries.slice(0, 5).map((enq) => (
                            <tr key={enq.id} className="border-b border-gray-700 hover:bg-[#222222]">
                              <td className="px-4 py-3 whitespace-nowrap text-white">{enq.name}</td>
                              <td className="px-4 py-3">{enq.email}</td>
                              <td className="px-4 py-3">{enq.service}</td>
                              <td className="px-4 py-3">{enq.budget || '—'}</td>
                              <td className="px-4 py-3">
                                <span className="px-2 py-1 text-xs rounded-full bg-blue-500/20 text-blue-500">
                                  {Math.random() > 0.5 ? 'Processed' : 'New'}
                                </span>
                              </td>
                              <td className="px-4 py-3">{new Date(enq.created_at).toLocaleDateString()}</td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  ) : (
                    <p className="text-gray-500">No enquiries yet.</p>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </SuperAdminRoute>
  );
};

export default Analytics; 