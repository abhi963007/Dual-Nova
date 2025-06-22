import { supabase } from './supabaseClient';
import { generateUUID } from './utils';

// Function to create a new team member
export const createTeamMember = async (
  memberData: {
    full_name: string;
    email: string;
    phone?: string;
    location?: string;
    department?: string;
    is_admin?: boolean;
  }
) => {
  try {
    // First, check if the current user is authenticated
    const { data: { session } } = await supabase.auth.getSession();
    if (!session) {
      throw new Error('You must be logged in to perform this action');
    }

    // Check if the current user is an admin
    const { data: adminData, error: adminError } = await supabase
      .from('admin_users')
      .select('is_admin')
      .eq('id', session.user.id)
      .single();

    if (adminError || !adminData?.is_admin) {
      throw new Error('You must be an admin to perform this action');
    }

    // First, create a user in the auth.users table via signUp
    // This will automatically handle the foreign key relationship
    const tempPassword = Math.random().toString(36).slice(-10);
    
    const { data: authData, error: signUpError } = await supabase.auth.signUp({
      email: memberData.email,
      password: tempPassword,
      options: {
        data: {
          full_name: memberData.full_name
        }
      }
    });

    if (signUpError || !authData.user) {
      console.error('Error creating auth user:', signUpError);
      throw new Error(signUpError?.message || 'Failed to create user account');
    }

    // Check if an admin_users entry was automatically created
    const { data: existingUser } = await supabase
      .from('admin_users')
      .select('*')
      .eq('id', authData.user.id)
      .single();

    if (existingUser) {
      // Update the existing record
      const { error: updateError } = await supabase
        .from('admin_users')
        .update({
          full_name: memberData.full_name,
          email: memberData.email,
          phone: memberData.phone || null,
          location: memberData.location || null,
          department: memberData.department || null,
          is_admin: memberData.is_admin || false
        })
        .eq('id', authData.user.id);

      if (updateError) {
        console.error('Error updating admin user:', updateError);
        throw updateError;
      }
    } else {
      // Create a new admin_users entry
      const { error: insertError } = await supabase
        .from('admin_users')
        .insert({
          id: authData.user.id,
          full_name: memberData.full_name,
          email: memberData.email,
          phone: memberData.phone || null,
          location: memberData.location || null,
          department: memberData.department || null,
          is_admin: memberData.is_admin || false
        });

      if (insertError) {
        console.error('Error inserting admin user:', insertError);
        throw insertError;
      }
    }

    return { success: true, userId: authData.user.id };
  } catch (error: any) {
    console.error('Error creating team member:', error);
    return { 
      success: false, 
      error: error.message || 'Failed to create team member' 
    };
  }
};

// Function to toggle admin status
export const toggleAdminStatus = async (userId: string, isAdmin: boolean) => {
  try {
    // First, check if the current user is authenticated
    const { data: { session } } = await supabase.auth.getSession();
    if (!session) {
      throw new Error('You must be logged in to perform this action');
    }

    // Check if the current user is an admin
    const { data: adminData, error: adminError } = await supabase
      .from('admin_users')
      .select('is_admin, full_name')
      .eq('id', session.user.id)
      .single();

    if (adminError || !adminData?.is_admin) {
      throw new Error('You must be an admin to perform this action');
    }

    // Check if the current user is a super admin
    const superAdmins = ['Abhiram', 'Rojin', 'Arjun'];
    const isSuperAdmin = superAdmins.includes(adminData.full_name || '');

    if (!isSuperAdmin) {
      throw new Error('Only super admins can change admin status');
    }

    // Use RPC function to bypass RLS
    const { data, error } = await supabase.rpc('toggle_admin_status', {
      p_user_id: userId,
      p_is_admin: isAdmin
    });

    if (error) {
      throw error;
    }

    return { success: true };
  } catch (error: any) {
    console.error('Error toggling admin status:', error);
    return { 
      success: false, 
      error: error.message || 'Failed to update admin status' 
    };
  }
};

// Function to delete a team member
export const deleteTeamMember = async (userId: string) => {
  try {
    // First, check if the current user is authenticated
    const { data: { session } } = await supabase.auth.getSession();
    if (!session) {
      throw new Error('You must be logged in to perform this action');
    }

    // Check if the current user is an admin
    const { data: adminData, error: adminError } = await supabase
      .from('admin_users')
      .select('is_admin, full_name')
      .eq('id', session.user.id)
      .single();

    if (adminError || !adminData?.is_admin) {
      throw new Error('You must be an admin to perform this action');
    }

    // Check if the current user is a super admin
    const superAdmins = ['Abhiram', 'Rojin', 'Arjun'];
    const isSuperAdmin = superAdmins.includes(adminData.full_name || '');

    if (!isSuperAdmin) {
      throw new Error('Only super admins can delete team members');
    }

    // Use RPC function to bypass RLS
    const { data, error } = await supabase.rpc('delete_team_member', {
      p_user_id: userId
    });

    if (error) {
      throw error;
    }

    return { success: true };
  } catch (error: any) {
    console.error('Error deleting team member:', error);
    return { 
      success: false, 
      error: error.message || 'Failed to delete team member' 
    };
  }
}; 