import React, { useState, useEffect } from 'react';
import { DashboardSidebar } from '../components/dashboard/DashboardSidebar';
import { Menu, Plus, Search, UserCircle, Loader, Calendar, Clock } from 'lucide-react';
import { supabase } from '../lib/supabaseClient';

// Define a minimal type with only the fields we know exist
interface AdminUser {
  id: string;
  full_name?: string | null;
  is_admin?: boolean;
  created_at?: string | null;
  last_sign_in_at?: string | null;
  [key: string]: any; // Allow for any other fields that might exist
}

const Team = () => {
  const [showSidebar, setShowSidebar] = useState(false);
  const [adminUsers, setAdminUsers] = useState<AdminUser[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [isSuperAdmin, setIsSuperAdmin] = useState(false);
  const [availableFields, setAvailableFields] = useState<string[]>([]);
  
  const superAdmins = ['Abhiram', 'Rojin', 'Arjun'];

  // Fetch user data
  useEffect(() => {
    const fetchAdminUsers = async () => {
      try {
        setLoading(true);
        setError(null);
        
        // First, check if current user is a super admin
        const { data: { session } } = await supabase.auth.getSession();
        if (session) {
          const { data: currentUser } = await supabase
            .from('admin_users')
            .select('full_name')
            .eq('id', session.user.id)
            .single();
          
          setIsSuperAdmin(currentUser?.full_name && superAdmins.includes(currentUser.full_name));
        }

        // Fetch all admin users
        const { data, error } = await supabase
          .from('admin_users')
          .select('*')
          .order('created_at', { ascending: false });

        if (error) {
          console.error('Error fetching admin users:', error);
          setError('Failed to load team members. Please try again later.');
          return;
        }

        // Log what fields are available in the response
        if (data && data.length > 0) {
          const fields = Object.keys(data[0]);
          console.log('Available fields in admin_users:', fields);
          setAvailableFields(fields);
        }

        console.log('Admin users data:', data);
        setAdminUsers(data || []);
        
      } catch (error) {
        console.error('Error:', error);
        setError('An unexpected error occurred. Please try again.');
      } finally {
        setLoading(false);
      }
    };

    fetchAdminUsers();
  }, []);

  // Filter users based on search term
  const filteredUsers = adminUsers.filter(user => 
    (user.full_name || '').toLowerCase().includes(searchTerm.toLowerCase())
  );

  const getInitials = (name?: string | null) => {
    if (!name) return '?';
    return name.split(' ').map(n => n[0]).join('').toUpperCase();
  };

  const formatDate = (dateString?: string | null) => {
    if (!dateString) return 'Never';
    const date = new Date(dateString);
    return date.toLocaleDateString();
  };

  return (
    <div className="min-h-screen bg-[#1e1e1e] text-white font-outfit">
      <div className="flex">
        <DashboardSidebar
          onSidebarHide={() => setShowSidebar(false)}
          showSidebar={showSidebar}
          isSuperAdmin={isSuperAdmin}
          adminCount={adminUsers.length}
        />
        <div className="flex-1 flex flex-col overflow-hidden ml-0 sm:ml-20 xl:ml-60">
          {/* Header */}
          <div className="flex items-center justify-between p-6 bg-[#1e1e1e] border-b border-gray-800">
            <div className="flex items-center gap-4">
              <button
                onClick={() => setShowSidebar(true)}
                className="block sm:hidden p-2 hover:bg-white/5 rounded-lg transition-colors"
              >
                <Menu size={20} />
              </button>
              <h1 className="text-2xl font-bold text-white">Team ({adminUsers.length})</h1>
            </div>
            <button className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-blue-500 to-purple-500 rounded-lg hover:from-blue-600 hover:to-purple-600 transition-colors">
              <Plus size={16} />
              Add Member
            </button>
          </div>

          {/* Main Content */}
          <div className="flex-1 p-6 overflow-auto">
            {/* Search Bar */}
            <div className="mb-6">
              <div className="relative max-w-md">
                <Search size={16} className="absolute left-3 top-3 text-gray-500" />
                <input
                  type="text"
                  placeholder="Search team members..."
                  className="w-full pl-10 pr-4 py-2 bg-[#171717] border border-gray-700 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  disabled={loading}
                />
              </div>
            </div>

            {/* Debug Info */}
            {availableFields.length > 0 && (
              <div className="mb-6 p-4 bg-blue-500/10 border border-blue-500/30 rounded-lg">
                <p className="text-sm text-blue-300 mb-2">Available fields in database:</p>
                <div className="flex flex-wrap gap-2">
                  {availableFields.map(field => (
                    <span key={field} className="px-2 py-1 bg-blue-500/20 text-blue-300 rounded-md text-xs">
                      {field}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {/* Error Message */}
            {error && (
              <div className="mb-6 p-4 bg-red-500/20 border border-red-500/30 rounded-lg text-red-200">
                <p>{error}</p>
                <button 
                  onClick={() => window.location.reload()}
                  className="mt-2 text-white underline"
                >
                  Try again
                </button>
              </div>
            )}

            {/* Team Grid */}
            {loading ? (
              <div className="flex flex-col justify-center items-center h-64">
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500 mb-4"></div>
                <p className="text-gray-400">Loading team members...</p>
              </div>
            ) : filteredUsers.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                {filteredUsers.map((user) => (
                  <div 
                    key={user.id} 
                    className="bg-[#171717] rounded-xl overflow-hidden border border-gray-800 hover:border-blue-500/30 transition-all duration-300"
                  >
                    {/* Card Header with color based on role */}
                    <div className={`h-2 w-full ${
                      user.full_name && superAdmins.includes(user.full_name) 
                        ? 'bg-gradient-to-r from-purple-500 to-pink-500' 
                        : 'bg-gradient-to-r from-blue-500 to-cyan-500'
                    }`}></div>
                    
                    <div className="p-6">
                      <div className="flex items-center justify-between mb-6">
                        <div className="flex items-center gap-3">
                          <div className="relative">
                            <div className="w-14 h-14 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center text-white text-lg font-bold">
                              {getInitials(user.full_name)}
                            </div>
                          </div>
                          <div>
                            <h3 className="font-bold text-white text-lg">{user.full_name || 'Unnamed User'}</h3>
                            <div>
                              <span className={`px-2 py-0.5 rounded-full text-xs ${
                                user.full_name && superAdmins.includes(user.full_name) 
                                  ? 'bg-purple-500/20 text-purple-300 border border-purple-500/30' 
                                  : 'bg-blue-500/20 text-blue-300 border border-blue-500/30'
                              }`}>
                                {user.full_name && superAdmins.includes(user.full_name) ? 'Super Admin' : 'Admin'}
                              </span>
                            </div>
                          </div>
                        </div>
                      </div>

                      {/* User Details */}
                      <div className="space-y-2 mb-4">
                        {Object.entries(user).map(([key, value]) => {
                          // Skip id and certain fields 
                          if (['id', 'is_admin', '__typename'].includes(key)) return null;
                          
                          // Format dates
                          let displayValue = value;
                          if (key.includes('_at') && value) {
                            displayValue = formatDate(value as string);
                          }
                          
                          return (
                            <div key={key} className="flex justify-between text-sm">
                              <span className="text-gray-400">{key.replace(/_/g, ' ')}:</span>
                              <span className="text-white font-medium">{
                                displayValue !== null && displayValue !== undefined 
                                  ? String(displayValue) 
                                  : 'Not available'
                              }</span>
                            </div>
                          );
                        })}
                      </div>

                      {/* Action Buttons */}
                      <div className="pt-4 border-t border-gray-800 flex gap-2">
                        <button className="flex-1 px-3 py-2 bg-[#2d2d2d] hover:bg-[#3d3d3d] rounded-lg transition-colors text-sm flex items-center justify-center">
                          <UserCircle size={14} className="mr-1" />
                          Profile
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-12">
                <div className="text-gray-500 text-lg">No admin users found</div>
                {searchTerm && (
                  <button 
                    onClick={() => setSearchTerm('')}
                    className="mt-4 text-blue-500 hover:underline"
                  >
                    Clear search
                  </button>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Team;