import React, { useState, useEffect } from 'react';
import { DashboardSidebar } from '../components/dashboard/DashboardSidebar';
import { Menu, Search, UserPlus, Edit2, Trash2, Shield, ShieldOff, X } from 'lucide-react';
import { supabase } from '../lib/supabaseClient';
import { useNavigate } from 'react-router-dom';
import { generateUUID } from '../lib/utils';
import { createTeamMember, toggleAdminStatus as toggleAdminStatusFn, deleteTeamMember } from '../lib/serverFunctions';

interface User {
  id: string;
  full_name: string | null;
  email: string | null;
  is_admin: boolean;
  department: string | null;
  created_at: string;
}

const UserManagement = () => {
  const [showSidebar, setShowSidebar] = useState(false);
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [isSuperAdmin, setIsSuperAdmin] = useState(false);
  const [currentUser, setCurrentUser] = useState<string | null>(null);
  const [showAddModal, setShowAddModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [formData, setFormData] = useState({
    full_name: '',
    email: '',
    department: '',
    is_admin: false,
  });
  const navigate = useNavigate();
  const superAdmins = ['Abhiram', 'Rojin', 'Arjun'];

  useEffect(() => {
    const checkAuth = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      if (!session) {
        navigate('/');
        return;
      }

      setCurrentUser(session.user.id);

      // Check if user is super admin
      const { data: adminData } = await supabase
        .from('admin_users')
        .select('full_name, is_admin')
        .eq('id', session.user.id)
        .single();

      if (!adminData?.is_admin) {
        // Redirect non-admin users
        navigate('/');
        return;
      }

      setIsSuperAdmin(adminData?.full_name && superAdmins.includes(adminData.full_name));
      fetchUsers();
    };

    checkAuth();
  }, [navigate]);

  const fetchUsers = async () => {
    setLoading(true);
    try {
      const { data, error } = await supabase
        .from('admin_users')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;
      setUsers(data || []);
    } catch (error) {
      console.error('Error fetching users:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };

  const filteredUsers = users.filter(user => 
    user.full_name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    user.email?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    user.department?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleAddUser = () => {
    setFormData({
      full_name: '',
      email: '',
      department: '',
      is_admin: false,
    });
    setShowAddModal(true);
  };

  const handleEditUser = (user: User) => {
    setSelectedUser(user);
    setFormData({
      full_name: user.full_name || '',
      email: user.email || '',
      department: user.department || '',
      is_admin: user.is_admin,
    });
    setShowEditModal(true);
  };

  const handleToggleAdmin = async (user: User) => {
    try {
      // Don't allow changing super admin status
      if (superAdmins.includes(user.full_name || '') && user.is_admin) {
        alert('Cannot remove admin status from super admins');
        return;
      }

      const result = await toggleAdminStatusFn(user.id, !user.is_admin);
      
      if (!result.success) {
        alert(result.error || 'Failed to update user status');
        return;
      }
      
      // Update local state immediately for better UX
      setUsers(users.map(u => 
        u.id === user.id ? { ...u, is_admin: !u.is_admin } : u
      ));
      
      // Refresh the user list after a short delay to ensure we have the latest data
      setTimeout(() => {
        fetchUsers();
      }, 1000);
    } catch (error: any) {
      console.error('Error updating user:', error);
      alert(`Failed to update user status: ${error.message || 'Unknown error'}`);
    }
  };

  const handleDeleteUser = async (userId: string) => {
    // Don't allow deleting super admins
    const user = users.find(u => u.id === userId);
    if (user && superAdmins.includes(user.full_name || '')) {
      alert('Cannot delete super admin accounts');
      return;
    }

    // Don't allow deleting yourself
    if (userId === currentUser) {
      alert('You cannot delete your own account');
      return;
    }

    if (window.confirm('Are you sure you want to delete this user?')) {
      try {
        const result = await deleteTeamMember(userId);
        
        if (!result.success) {
          alert(result.error || 'Failed to delete user');
          return;
        }
        
        // Update local state immediately for better UX
        setUsers(users.filter(u => u.id !== userId));
        
        // Refresh the user list after a short delay to ensure we have the latest data
        setTimeout(() => {
          fetchUsers();
        }, 1000);
      } catch (error: any) {
        console.error('Error deleting user:', error);
        alert(`Failed to delete user: ${error.message || 'Unknown error'}`);
      }
    }
  };

  const handleFormChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target as HTMLInputElement;
    setFormData({
      ...formData,
      [name]: type === 'checkbox' ? (e.target as HTMLInputElement).checked : value,
    });
  };

  const handleSubmitAdd = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const result = await createTeamMember({
        full_name: formData.full_name,
        email: formData.email,
        department: formData.department,
        is_admin: formData.is_admin,
      });

      if (!result.success) {
        alert(result.error || 'Failed to add user');
        return;
      }

      // Update UI
      setShowAddModal(false);
      
      // Reset form
      setFormData({
        full_name: '',
        email: '',
        department: '',
        is_admin: false,
      });
      
      // Refresh the user list after a short delay
      setTimeout(() => {
        fetchUsers();
      }, 1000);
    } catch (error: any) {
      console.error('Error adding user:', error);
      alert(`Failed to add user: ${error.message}`);
    }
  };

  const handleSubmitEdit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedUser) return;

    try {
      // Don't allow removing admin status from super admins
      if (superAdmins.includes(selectedUser.full_name || '') && 
          selectedUser.is_admin && 
          !formData.is_admin) {
        alert('Cannot remove admin status from super admins');
        return;
      }

      const { error } = await supabase
        .from('admin_users')
        .update({
          full_name: formData.full_name,
          email: formData.email,
          department: formData.department,
          is_admin: formData.is_admin,
        })
        .eq('id', selectedUser.id);

      if (error) {
        console.error('Error updating user:', error);
        alert(`Failed to update user: ${error.message}`);
        return;
      }

      // Update UI
      fetchUsers();
      setShowEditModal(false);
    } catch (error: any) {
      console.error('Error updating user:', error);
      alert(`Failed to update user: ${error.message || 'Unknown error'}`);
    }
  };

  return (
    <div className="min-h-screen bg-[#1e1e1e] text-white font-outfit">
      <div className="flex">
        <DashboardSidebar
          onSidebarHide={() => setShowSidebar(false)}
          showSidebar={showSidebar}
          isSuperAdmin={isSuperAdmin}
          adminCount={users.filter(u => u.is_admin).length}
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
              <h1 className="text-2xl font-bold text-white">User Management ({users.length})</h1>
            </div>
            <div className="flex gap-2">
              <button
                onClick={() => setShowAddModal(true)}
                className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-blue-500 to-purple-500 rounded-lg hover:from-blue-600 hover:to-purple-600 transition-colors"
              >
                <UserPlus size={16} />
                Add User
              </button>
            </div>
          </div>

          {/* Main Content */}
          <div className="flex-1 p-6 overflow-auto">
            {/* Search Bar */}
            <div className="mb-6 relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Search size={18} className="text-gray-400" />
              </div>
              <input
                type="text"
                placeholder="Search users by name, email or department..."
                className="w-full pl-10 pr-4 py-2 bg-[#171717] border border-gray-700 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                value={searchTerm}
                onChange={handleSearchChange}
              />
            </div>

            {/* Users Table */}
            <div className="bg-[#171717] rounded-xl border border-gray-800 overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="bg-[#1d1d1d] text-left">
                      <th className="px-6 py-3 text-xs font-medium text-gray-400 uppercase tracking-wider">Name</th>
                      <th className="px-6 py-3 text-xs font-medium text-gray-400 uppercase tracking-wider">Email</th>
                      <th className="px-6 py-3 text-xs font-medium text-gray-400 uppercase tracking-wider">Department</th>
                      <th className="px-6 py-3 text-xs font-medium text-gray-400 uppercase tracking-wider">Status</th>
                      <th className="px-6 py-3 text-xs font-medium text-gray-400 uppercase tracking-wider">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-800">
                    {loading ? (
                      <tr>
                        <td colSpan={5} className="px-6 py-4 text-center text-gray-400">
                          <div className="flex justify-center">
                            <div className="animate-spin rounded-full h-6 w-6 border-t-2 border-b-2 border-blue-500"></div>
                          </div>
                        </td>
                      </tr>
                    ) : filteredUsers.length === 0 ? (
                      <tr>
                        <td colSpan={5} className="px-6 py-4 text-center text-gray-400">
                          No users found
                        </td>
                      </tr>
                    ) : (
                      filteredUsers.map((user) => (
                        <tr key={user.id} className="hover:bg-[#1a1a1a]">
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="flex items-center">
                              <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center text-white font-bold text-sm">
                                {user.full_name?.charAt(0) || '?'}
                              </div>
                              <div className="ml-3">
                                <div className="font-medium text-white">{user.full_name || 'Unnamed'}</div>
                                {superAdmins.includes(user.full_name || '') && (
                                  <div className="text-xs text-purple-400">Super Admin</div>
                                )}
                              </div>
                            </div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-gray-300">
                            {user.email || 'No email'}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-gray-300">
                            {user.department || 'Not assigned'}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            {user.is_admin ? (
                              <span className="px-2 py-1 text-xs font-medium rounded-full bg-green-900/30 text-green-400 border border-green-800/30">
                                Admin
                              </span>
                            ) : (
                              <span className="px-2 py-1 text-xs font-medium rounded-full bg-gray-800 text-gray-400 border border-gray-700">
                                User
                              </span>
                            )}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="flex space-x-2">
                              <button
                                onClick={() => handleToggleAdmin(user)}
                                className="p-1 hover:bg-gray-800 rounded-lg transition-colors"
                                title={user.is_admin ? "Remove Admin" : "Make Admin"}
                              >
                                {user.is_admin ? (
                                  <ShieldOff size={16} className="text-red-400" />
                                ) : (
                                  <Shield size={16} className="text-green-400" />
                                )}
                              </button>
                              <button
                                onClick={() => handleEditUser(user)}
                                className="p-1 hover:bg-gray-800 rounded-lg transition-colors"
                                title="Edit User"
                              >
                                <Edit2 size={16} className="text-blue-400" />
                              </button>
                              <button
                                onClick={() => handleDeleteUser(user.id)}
                                className="p-1 hover:bg-gray-800 rounded-lg transition-colors"
                                title="Delete User"
                                disabled={user.id === currentUser || superAdmins.includes(user.full_name || '')}
                              >
                                <Trash2 size={16} className={`${
                                  user.id === currentUser || superAdmins.includes(user.full_name || '') 
                                    ? 'text-gray-600 cursor-not-allowed' 
                                    : 'text-red-400'
                                }`} />
                              </button>
                            </div>
                          </td>
                        </tr>
                      ))
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Add User Modal */}
      {showAddModal && (
        <div className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center z-50">
          <div className="bg-[#171717] rounded-xl border border-gray-800 p-6 w-full max-w-md">
            <h2 className="text-xl font-bold mb-4 text-white">Add New User</h2>
            <form onSubmit={handleSubmitAdd}>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-400 mb-1">
                    Full Name
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
                    Email
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
                <div className="flex justify-end gap-3 pt-4">
                  <button
                    type="button"
                    onClick={() => setShowAddModal(false)}
                    className="px-4 py-2 bg-gray-800 text-gray-300 rounded-lg hover:bg-gray-700 transition-colors"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-4 py-2 bg-gradient-to-r from-blue-500 to-purple-500 text-white rounded-lg hover:from-blue-600 hover:to-purple-600 transition-colors"
                  >
                    Add User
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Edit User Modal */}
      {showEditModal && selectedUser && (
        <div className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center z-50">
          <div className="bg-[#171717] rounded-xl border border-gray-800 p-6 w-full max-w-md">
            <h2 className="text-xl font-bold mb-4 text-white">Edit User</h2>
            <form onSubmit={handleSubmitEdit}>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-400 mb-1">
                    Full Name
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
                    Email
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
                <div className="flex items-center">
                  <input
                    type="checkbox"
                    id="edit_is_admin"
                    name="is_admin"
                    checked={formData.is_admin}
                    onChange={handleFormChange}
                    className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-700 rounded bg-gray-900"
                    disabled={superAdmins.includes(selectedUser.full_name || '') && selectedUser.is_admin}
                  />
                  <label htmlFor="edit_is_admin" className="ml-2 block text-sm text-gray-400">
                    Admin Access
                    {superAdmins.includes(selectedUser.full_name || '') && selectedUser.is_admin && (
                      <span className="ml-2 text-xs text-purple-400">(Super Admin - Cannot be changed)</span>
                    )}
                  </label>
                </div>
                <div className="flex justify-end gap-3 pt-4">
                  <button
                    type="button"
                    onClick={() => setShowEditModal(false)}
                    className="px-4 py-2 bg-gray-800 text-gray-300 rounded-lg hover:bg-gray-700 transition-colors"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-4 py-2 bg-gradient-to-r from-blue-500 to-purple-500 text-white rounded-lg hover:from-blue-600 hover:to-purple-600 transition-colors"
                  >
                    Save Changes
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

export default UserManagement; 