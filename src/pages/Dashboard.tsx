import React, { useState, useEffect } from 'react';
import { DashboardSidebar } from '../components/dashboard/DashboardSidebar';
import { DashboardContent } from '../components/dashboard/DashboardContent';
import { supabase } from '../lib/supabaseClient';

const Dashboard = () => {
  const [showSidebar, setShowSidebar] = useState(false);
  const [isSuperAdmin, setIsSuperAdmin] = useState(false);
  const [adminCount, setAdminCount] = useState(0);
  const superAdmins = ['Abhiram', 'Rojin', 'Arjun'];

  useEffect(() => {
    const checkSuperAdmin = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      if (!session) return;

      try {
        const { data } = await supabase
          .from('admin_users')
          .select('full_name')
          .eq('id', session.user.id)
          .single();
        
        setIsSuperAdmin(data?.full_name && superAdmins.includes(data.full_name));
      } catch (error) {
        console.error('Error checking super admin status:', error);
      }
    };

    const fetchAdminCount = async () => {
      try {
        const { count, error } = await supabase
          .from('admin_users')
          .select('*', { count: 'exact', head: true })
          .eq('is_admin', true);
        
        if (error) {
          console.error('Error fetching admin count:', error);
        } else {
          setAdminCount(count || 0);
        }
      } catch (error) {
        console.error('Error fetching admin count:', error);
      }
    };

    checkSuperAdmin();
    fetchAdminCount();
  }, []);

  return (
    <div className="min-h-screen bg-[#1e1e1e] text-white font-outfit">
      <div className="flex">
        <DashboardSidebar
          onSidebarHide={() => setShowSidebar(false)}
          showSidebar={showSidebar}
          isSuperAdmin={isSuperAdmin}
          adminCount={adminCount}
        />
        <DashboardContent
          onSidebarShow={() => setShowSidebar(true)}
        />
      </div>
    </div>
  );
};

export default Dashboard;
