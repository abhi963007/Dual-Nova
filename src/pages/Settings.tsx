import React, { useState, useEffect } from 'react';
import { DashboardSidebar } from '../components/dashboard/DashboardSidebar';
import { Menu, User, Bell, Shield, Globe, Save } from 'lucide-react';
import { supabase } from '../lib/supabaseClient';
import { useToast } from '../hooks/use-toast';

const Settings = () => {
  const [showSidebar, setShowSidebar] = useState(false);
  const [activeTab, setActiveTab] = useState('profile');
  const { toast } = useToast();
  const [profile, setProfile] = useState({ full_name: '', email: '', phone: '', location: '', department: '' });
  const [loadingProfile, setLoadingProfile] = useState(true);
  const [saving, setSaving] = useState(false);

  const tabs = [
    { id: 'profile', label: 'Profile', icon: User },
    { id: 'notifications', label: 'Notifications', icon: Bell },
    { id: 'security', label: 'Security', icon: Shield },
    
    { id: 'general', label: 'General', icon: Globe },
  ];

  useEffect(() => {
    const loadProfile = async () => {
      setLoadingProfile(true);
      const { data: { session } } = await supabase.auth.getSession();
      if (!session) { setLoadingProfile(false); return; }
      const { data, error } = await supabase.from('admin_users').select('*').eq('id', session.user.id).single();
      if (error) { console.error(error); toast({ title: 'Error loading profile' }); }
      if (data) setProfile({ full_name: data.full_name || '', email: data.email || '', phone: data.phone || '', location: data.location || '', department: data.department || '' });
      setLoadingProfile(false);
    };
    loadProfile();
  }, []);

  const handleSave = async () => {
    setSaving(true);
    const { data: { session } } = await supabase.auth.getSession();
    if (!session) { toast({ title: 'Not signed in' }); setSaving(false); return; }
    // Build updates object dynamically – only include changed/non-empty fields
    const updates: Record<string, any> = {};
    if (profile.full_name.trim()) updates.full_name = profile.full_name.trim();
    if (profile.email) updates.email = profile.email;
    if (profile.phone !== undefined) updates.phone = profile.phone || null;
    if (profile.location !== undefined) updates.location = profile.location || null;
    if (profile.department !== undefined) updates.department = profile.department || null;

    if (Object.keys(updates).length === 0) {
      toast({ title: 'Nothing to save', description: 'No changes detected.' });
      setSaving(false);
      return;
    }
    const { data: updatedRows, error } = await supabase
      .from('admin_users')
      .update(updates)
      .eq('id', session.user.id)
      .select();

    console.log('Supabase update payload', updates, 'updatedRows', updatedRows);


    if (error) {
      console.error('Error saving profile:', error?.details || error?.message || error);
      toast({ title: 'Error saving profile', description: error.message, variant: 'destructive' });
    }
    else if (!updatedRows || updatedRows.length === 0) {
      toast({ title: 'No changes saved', description: 'Profile was already up to date.' });
    }
    else {
      // Refetch the latest profile row to sync UI
      const returned = Array.isArray(updatedRows) ? updatedRows[0] : updatedRows;
      if (returned) {
        setProfile({
          full_name: returned.full_name || '',
          email: returned.email || '',
          phone: returned.phone || '',
          location: returned.location || '',
          department: returned.department || '',
        });
      }
      toast({ title: 'Profile updated successfully' });
    }
    setSaving(false);
  };

  const getInitials = (name: string) => {
    const words = name.trim().split(' ').filter(Boolean);
    if (words.length === 0) return '?';
    if (words.length === 1) return words[0][0].toUpperCase();
    return (words[0][0] + words[1][0]).toUpperCase();
  };

  return (
    <div className="min-h-screen bg-[#1e1e1e] text-white font-outfit">
      <div className="flex">
        <DashboardSidebar
          onSidebarHide={() => setShowSidebar(false)}
          showSidebar={showSidebar}
        />
        <div className="flex-1 flex overflow-hidden ml-0 sm:ml-20 xl:ml-60">
          {/* Settings Sidebar */}
          <div className="w-64 bg-[#171717] border-r border-gray-800 flex flex-col">
            <div className="p-4 border-b border-gray-800">
              <div className="flex items-center gap-4">
                <button
                  onClick={() => setShowSidebar(true)}
                  className="block sm:hidden p-2 hover:bg-white/5 rounded-lg transition-colors"
                >
                  <Menu size={20} />
                </button>
                <h2 className="text-xl font-bold">Settings</h2>
              </div>
            </div>
            <nav className="flex-1 p-4">
              {tabs.map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`w-full flex items-center gap-3 px-3 py-2 rounded-lg transition-colors text-left mb-2 ${
                    activeTab === tab.id
                      ? 'bg-gradient-to-r from-blue-500/20 to-purple-500/20 text-white border-l-2 border-blue-400'
                      : 'text-gray-400 hover:text-white hover:bg-white/5'
                  }`}
                >
                  <tab.icon size={18} />
                  {tab.label}
                </button>
              ))}
            </nav>
          </div>

          {/* Settings Content */}
          <div className="flex-1 flex flex-col overflow-hidden">
            {/* Header */}
            <div className="p-6 bg-[#1e1e1e] border-b border-gray-800">
              <h1 className="text-2xl font-bold text-white">
                {tabs.find(tab => tab.id === activeTab)?.label}
              </h1>
            </div>

            {/* Content */}
            <div className="flex-1 p-6 overflow-auto">
              {activeTab === 'profile' && !loadingProfile && (
                <div className="max-w-2xl">
                  <div className="bg-[#171717] rounded-xl p-6 border border-gray-800 mb-6">
                    <h3 className="text-lg font-semibold text-white mb-4">Profile Information</h3>
                    <div className="space-y-4">
                      <div className="flex items-center gap-4 mb-6">
                        <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center text-white font-bold text-xl">
                          {getInitials(profile.full_name)}
                        </div>
                        <div>
                          <button className="px-4 py-2 bg-[#2d2d2d] hover:bg-[#3d3d3d] rounded-lg transition-colors text-sm">
                            Change Avatar
                          </button>
                        </div>
                      </div>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <label className="block text-sm font-medium text-gray-400 mb-2">First Name</label>
                          <input
                            type="text"
                            value={profile.full_name.split(' ')[0] || ''}
                            onChange={(e) => setProfile({ ...profile, full_name: e.target.value + ' ' + (profile.full_name.split(' ')[1] || '') })}
                            className="w-full px-3 py-2 bg-[#2d2d2d] border border-gray-700 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-400 mb-2">Last Name</label>
                          <input
                            type="text"
                            value={profile.full_name.split(' ')[1] || ''}
                            onChange={(e) => setProfile({ ...profile, full_name: (profile.full_name.split(' ')[0] || '') + ' ' + e.target.value })}
                            className="w-full px-3 py-2 bg-[#2d2d2d] border border-gray-700 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                          />
                        </div>
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-400 mb-2">Email</label>
                        <input
                          type="email"
                          value={profile.email}
                          onChange={(e) => setProfile({ ...profile, email: e.target.value })}
                          className="w-full px-3 py-2 bg-[#2d2d2d] border border-gray-700 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                      </div>
                      <div>
                        
                        <textarea



                          className="w-full px-3 py-2 bg-[#2d2d2d] border border-gray-700 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-400 mb-2">Phone</label>
                        <input
                          type="tel"
                          value={profile.phone}
                          onChange={(e) => setProfile({ ...profile, phone: e.target.value })}
                          className="w-full px-3 py-2 bg-[#2d2d2d] border border-gray-700 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-400 mb-2">Location</label>
                        <input
                          type="text"
                          value={profile.location}
                          onChange={(e) => setProfile({ ...profile, location: e.target.value })}
                          className="w-full px-3 py-2 bg-[#2d2d2d] border border-gray-700 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-400 mb-2">Department</label>
                        <select
                          value={profile.department}
                          onChange={(e) => setProfile({ ...profile, department: e.target.value })}
                          className="w-full px-3 py-2 bg-[#2d2d2d] border border-gray-700 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                        >
                          <option value="">Select Department</option>
                          <option value="Engineering">Engineering</option>
                          <option value="Marketing">Marketing</option>
                          <option value="Sales">Sales</option>
                          <option value="HR">HR</option>
                          <option value="Operations">Operations</option>
                        </select>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {activeTab === 'profile' && loadingProfile && (
                <div className="text-gray-400">Loading profile...</div>
              )}

              {activeTab === 'notifications' && (
                <div className="max-w-2xl">
                  <div className="bg-[#171717] rounded-xl p-6 border border-gray-800">
                    <h3 className="text-lg font-semibold text-white mb-4">Notification Preferences</h3>
                    <div className="space-y-4">
                      {[
                        { label: 'Email Notifications', description: 'Receive notifications via email' },
                        { label: 'Push Notifications', description: 'Receive push notifications in browser' },
                        { label: 'Task Updates', description: 'Get notified when tasks are updated' },
                        { label: 'Team Messages', description: 'Receive notifications for team messages' },
                        { label: 'System Updates', description: 'Get notified about system maintenance' },
                      ].map((item, index) => (
                        <div key={index} className="flex items-center justify-between p-4 bg-[#2d2d2d] rounded-lg">
                          <div>
                            <h4 className="font-medium text-white">{item.label}</h4>
                            <p className="text-sm text-gray-400">{item.description}</p>
                          </div>
                          <input
                            type="checkbox"
                            defaultChecked={index < 3}
                            className="w-4 h-4 text-blue-600 bg-gray-700 border-gray-600 rounded focus:ring-blue-500"
                          />
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              )}

              {activeTab === 'security' && (
                <div className="max-w-2xl">
                  <div className="bg-[#171717] rounded-xl p-6 border border-gray-800 mb-6">
                    <h3 className="text-lg font-semibold text-white mb-4">Security Settings</h3>
                    <div className="space-y-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-400 mb-2">Current Password</label>
                        <input
                          type="password"
                          className="w-full px-3 py-2 bg-[#2d2d2d] border border-gray-700 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-400 mb-2">New Password</label>
                        <input
                          type="password"
                          className="w-full px-3 py-2 bg-[#2d2d2d] border border-gray-700 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-400 mb-2">Confirm New Password</label>
                        <input
                          type="password"
                          className="w-full px-3 py-2 bg-[#2d2d2d] border border-gray-700 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                      </div>
                    </div>
                  </div>
                  <div className="bg-[#171717] rounded-xl p-6 border border-gray-800">
                    <h3 className="text-lg font-semibold text-white mb-4">Two-Factor Authentication</h3>
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-white">Enable 2FA for enhanced security</p>
                        <p className="text-sm text-gray-400">Add an extra layer of protection to your account</p>
                      </div>
                      <button className="px-4 py-2 bg-gradient-to-r from-blue-500 to-purple-500 rounded-lg hover:from-blue-600 hover:to-purple-600 transition-colors">
                        Enable 2FA
                      </button>
                    </div>
                  </div>
                </div>
              )}

              {activeTab === 'appearance' && (
                <div className="max-w-2xl">
                  <div className="bg-[#171717] rounded-xl p-6 border border-gray-800">
                    <h3 className="text-lg font-semibold text-white mb-4">Theme Settings</h3>
                    <div className="space-y-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-400 mb-3">Color Theme</label>
                        <div className="grid grid-cols-3 gap-3">
                          {['Dark', 'Light', 'Auto'].map((theme) => (
                            <button
                              key={theme}
                              className={`p-3 rounded-lg border transition-colors ${
                                theme === 'Dark'
                                  ? 'border-blue-500 bg-blue-500/10'
                                  : 'border-gray-700 bg-[#2d2d2d] hover:bg-[#3d3d3d]'
                              }`}
                            >
                              {theme}
                            </button>
                          ))}
                        </div>
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-400 mb-3">Accent Color</label>
                        <div className="flex gap-2">
                          {['bg-blue-500', 'bg-purple-500', 'bg-green-500', 'bg-red-500', 'bg-yellow-500'].map((color) => (
                            <button
                              key={color}
                              className={`w-8 h-8 rounded-full ${color} border-2 ${
                                color === 'bg-blue-500' ? 'border-white' : 'border-transparent'
                              }`}
                            />
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {activeTab === 'general' && (
                <div className="max-w-2xl">
                  <div className="bg-[#171717] rounded-xl p-6 border border-gray-800">
                    <h3 className="text-lg font-semibold text-white mb-4">General Settings</h3>
                    <div className="space-y-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-400 mb-2">Language</label>
                        <select className="w-full px-3 py-2 bg-[#2d2d2d] border border-gray-700 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500">
                          <option>English</option>
                          <option>Spanish</option>
                          <option>French</option>
                          <option>German</option>
                        </select>
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-400 mb-2">Timezone</label>
                        <select className="w-full px-3 py-2 bg-[#2d2d2d] border border-gray-700 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500">
                          <option>UTC-05:00 (Eastern Time)</option>
                          <option>UTC-08:00 (Pacific Time)</option>
                          <option>UTC+00:00 (GMT)</option>
                          <option>UTC+01:00 (Central Europe)</option>
                        </select>
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-400 mb-2">Date Format</label>
                        <select className="w-full px-3 py-2 bg-[#2d2d2d] border border-gray-700 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500">
                          <option>MM/DD/YYYY</option>
                          <option>DD/MM/YYYY</option>
                          <option>YYYY-MM-DD</option>
                        </select>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* Save Button */}
              <div className="mt-6">
                <button onClick={handleSave} disabled={saving} className={`flex items-center gap-2 px-6 py-3 rounded-lg transition-colors ${saving ? 'bg-gray-600 cursor-not-allowed' : 'bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600'}`}>
                  <Save size={16} />
                  Save Changes
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Settings;
