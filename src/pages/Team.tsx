import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { DashboardSidebar } from '../components/dashboard/DashboardSidebar';
import { Menu, Plus, Search, UserCircle, Loader, Calendar, Clock, Mail, Phone, MapPin, Briefcase, UserCog, X } from 'lucide-react';
import { supabase } from '../lib/supabaseClient';

// Define a minimal type with only the fields we know exist
interface AdminUser {
  id: string;
  full_name?: string | null;
  is_admin?: boolean;
  created_at?: string | null;
  last_sign_in_at?: string | null;
  email?: string | null;
  phone?: string | null;
  location?: string | null;
  department?: string | null;
  [key: string]: any; // Allow for any other fields that might exist
}

const Team = () => {
  const [showSidebar, setShowSidebar] = useState(false);
  const [adminUsers, setAdminUsers] = useState<AdminUser[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [isSuperAdmin, setIsSuperAdmin] = useState(false);
  const [showAddModal, setShowAddModal] = useState(false);
  const [formData, setFormData] = useState({
    full_name: '',
    email: '',
    phone: '',
    location: '',
    department: '',
    is_admin: false,
  });
  const [formError, setFormError] = useState<string | null>(null);
  const [formLoading, setFormLoading] = useState(false);

  const superAdmins = ['Abhiram', 'Rojin', 'Arjun'];

  // Function to fetch admin users
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

      console.log('Admin users data:', data);
      setAdminUsers(data || []);
      
    } catch (error) {
      console.error('Error:', error);
      setError('An unexpected error occurred. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  // Fetch user data on component mount
  useEffect(() => {
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

  // Handle form input changes
  const handleFormChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target as HTMLInputElement;
    setFormData({
      ...formData,
      [name]: type === 'checkbox' ? (e.target as HTMLInputElement).checked : value,
    });
  };

  // Handle form submission
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setFormError(null);
    setFormLoading(true);

    try {
      if (!formData.full_name || !formData.email) {
        setFormError('Name and email are required');
        setFormLoading(false);
        return;
      }

      // Create auth user first (this would normally be done through an admin API)
      const { data: authData, error: authError } = await supabase.auth.admin.createUser({
        email: formData.email,
        email_confirm: true,
        user_metadata: { full_name: formData.full_name },
        password: Math.random().toString(36).slice(-8), // Random password, user will reset
      });

      if (authError) {
        console.error('Auth error:', authError);
        setFormError(authError.message);
        setFormLoading(false);
        return;
      }

      // Then create admin_users entry
      const { error: profileError } = await supabase
        .from('admin_users')
        .insert({
          id: authData.user.id,
          full_name: formData.full_name,
          email: formData.email,
          phone: formData.phone || null,
          location: formData.location || null,
          department: formData.department || null,
          is_admin: formData.is_admin,
        });

      if (profileError) {
        console.error('Profile error:', profileError);
        setFormError(profileError.message);
        setFormLoading(false);
        return;
      }

      // Success - close modal and refresh
      setShowAddModal(false);
      fetchAdminUsers();
      
      // Reset form
      setFormData({
        full_name: '',
        email: '',
        phone: '',
        location: '',
        department: '',
        is_admin: false,
      });
      
    } catch (error: any) {
      console.error('Error adding user:', error);
      setFormError(error.message || 'An unexpected error occurred');
    } finally {
      setFormLoading(false);
    }
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
            <div className="flex gap-2">
              {isSuperAdmin && (
                <Link
                  to="/user-management"
                  className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-purple-500 to-pink-500 rounded-lg hover:from-purple-600 hover:to-pink-600 transition-colors"
                >
                  <UserCircle size={16} />
                  Manage Users
                </Link>
              )}
              <button 
                onClick={() => setShowAddModal(true)}
                className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-blue-500 to-purple-500 rounded-lg hover:from-blue-600 hover:to-purple-600 transition-colors"
              >
                <Plus size={16} />
                Add Member
              </button>
            </div>
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
                      <div className="space-y-2 mb-4 text-sm">
                        {/* Email */}
                        <div className="flex items-center justify-between gap-4">
                          <div className="flex items-center gap-2 text-gray-400">
                            <Mail size={14} />
                            <span>Email</span>
                          </div>
                          <span className="text-white font-medium truncate max-w-[55%] text-right">
                            {user.email ?? 'Not available'}
                          </span>
                        </div>

                        {/* Phone */}
                        <div className="flex items-center justify-between gap-4">
                          <div className="flex items-center gap-2 text-gray-400">
                            <Phone size={14} />
                            <span>Phone</span>
                          </div>
                          <span className="text-white font-medium">
                            {user.phone ?? 'Not available'}
                          </span>
                        </div>

                        {/* Location */}
                        <div className="flex items-center justify-between gap-4">
                          <div className="flex items-center gap-2 text-gray-400">
                            <MapPin size={14} />
                            <span>Location</span>
                          </div>
                          <span className="text-white font-medium">
                            {user.location ?? 'Not available'}
                          </span>
                        </div>

                        {/* Department */}
                        <div className="flex items-center justify-between gap-4">
                          <div className="flex items-center gap-2 text-gray-400">
                            <Briefcase size={14} />
                            <span>Department</span>
                          </div>
                          <span className="text-white font-medium">
                            {user.department ?? 'Not available'}
                          </span>
                        </div>

                        {/* Joined */}
                        <div className="flex items-center justify-between gap-4">
                          <div className="flex items-center gap-2 text-gray-400">
                            <Calendar size={14} />
                            <span>Joined</span>
                          </div>
                          <span className="text-white font-medium">
                            {formatDate(user.created_at)}
                          </span>
                        </div>

                        {/* Last Sign-In */}
                        <div className="flex items-center justify-between gap-4">
                          <div className="flex items-center gap-2 text-gray-400">
                            <Clock size={14} />
                            <span>Last sign-in</span>
                          </div>
                          <span className="text-white font-medium">
                            {formatDate(user.last_sign_in_at)}
                          </span>
                        </div>
                      </div>

                      {/* Action Buttons */}
                      <div className="pt-4 border-t border-gray-800 flex gap-2">
                        <Link
                           to={`/team/${user.id}`}
                           className="flex-1 px-3 py-2 bg-[#2d2d2d] hover:bg-[#3d3d3d] rounded-lg transition-colors text-sm flex items-center justify-center"
                         >
                          <UserCircle size={14} className="mr-1" />
                          Profile
                        </Link>
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

      {/* Add Member Modal */}
      {showAddModal && (
        <div className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center z-50">
          <div className="bg-[#171717] rounded-xl border border-gray-800 p-6 w-full max-w-md">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-bold text-white">Add Team Member</h2>
              <button 
                onClick={() => setShowAddModal(false)}
                className="p-1 hover:bg-gray-800 rounded-full"
              >
                <X size={20} className="text-gray-400" />
              </button>
            </div>
            
            {formError && (
              <div className="mb-4 p-3 bg-red-500/20 border border-red-500/30 rounded-lg text-red-200 text-sm">
                {formError}
              </div>
            )}
            
            <form onSubmit={handleSubmit}>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-400 mb-1">
                    Full Name *
                  </label>
                  <input
                    type="text"
                    name="full_name"
                    value={formData.full_name}
                    onChange={handleFormChange}
                    required
                    className="w-full px-4 py-2 bg-[#1e1e1e] border border-gray-700 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-400 mb-1">
                    Email *
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleFormChange}
                    required
                    className="w-full px-4 py-2 bg-[#1e1e1e] border border-gray-700 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-400 mb-1">
                    Phone
                  </label>
                  <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleFormChange}
                    className="w-full px-4 py-2 bg-[#1e1e1e] border border-gray-700 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-400 mb-1">
                    Location
                  </label>
                  <input
                    type="text"
                    name="location"
                    value={formData.location}
                    onChange={handleFormChange}
                    className="w-full px-4 py-2 bg-[#1e1e1e] border border-gray-700 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-400 mb-1">
                    Department
                  </label>
                  <input
                    type="text"
                    name="department"
                    value={formData.department}
                    onChange={handleFormChange}
                    className="w-full px-4 py-2 bg-[#1e1e1e] border border-gray-700 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                
                {isSuperAdmin && (
                  <div className="flex items-center">
                    <input
                      type="checkbox"
                      id="is_admin"
                      name="is_admin"
                      checked={formData.is_admin}
                      onChange={handleFormChange}
                      className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-700 rounded bg-gray-900"
                    />
                    <label htmlFor="is_admin" className="ml-2 block text-sm text-gray-400">
                      Admin Access
                    </label>
                  </div>
                )}
                
                <div className="flex justify-end gap-3 pt-4">
                  <button
                    type="button"
                    onClick={() => setShowAddModal(false)}
                    className="px-4 py-2 bg-gray-800 text-gray-300 rounded-lg hover:bg-gray-700 transition-colors"
                    disabled={formLoading}
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-4 py-2 bg-gradient-to-r from-blue-500 to-purple-500 text-white rounded-lg hover:from-blue-600 hover:to-purple-600 transition-colors flex items-center gap-2"
                    disabled={formLoading}
                  >
                    {formLoading ? (
                      <>
                        <div className="animate-spin rounded-full h-4 w-4 border-t-2 border-b-2 border-white"></div>
                        <span>Adding...</span>
                      </>
                    ) : (
                      <span>Add Member</span>
                    )}
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default Team;