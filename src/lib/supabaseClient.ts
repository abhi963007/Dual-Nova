import { createClient } from '@supabase/supabase-js';

// These values should be set in your environment (e.g. Netlify site settings)
// Vite automatically exposes variables prefixed with VITE_
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL as string;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY as string;

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

// Admin-related functions
export const adminFunctions = {
  // Check if a user is an admin
  isAdmin: async (userId: string) => {
    if (!userId) return false;
    
    const { data, error } = await supabase
      .from('admin_users')
      .select('is_admin')
      .eq('id', userId)
      .single();
    
    if (error || !data) return false;
    return data.is_admin === true;
  },

  // Check if a user is a super admin
  isSuperAdmin: async (userId: string, superAdminNames: string[] = ['Abhiram', 'Rojin', 'Arjun']) => {
    if (!userId) return false;
    
    const { data, error } = await supabase
      .from('admin_users')
      .select('full_name, is_admin')
      .eq('id', userId)
      .single();
    
    if (error || !data || !data.is_admin) return false;
    return superAdminNames.includes(data.full_name);
  },

  // Get all admin users
  getAdminUsers: async () => {
    const { data, error } = await supabase
      .from('admin_users')
      .select('*')
      .eq('is_admin', true)
      .order('created_at', { ascending: false });
    
    if (error) {
      console.error('Error fetching admin users:', error);
      return [];
    }
    
    return data || [];
  },

  // Toggle admin status
  toggleAdminStatus: async (userId: string, isAdmin: boolean) => {
    const { data, error } = await supabase
      .from('admin_users')
      .update({ is_admin: isAdmin })
      .eq('id', userId);
    
    if (error) {
      console.error('Error updating admin status:', error);
      throw error;
    }
    
    return data;
  }
};
