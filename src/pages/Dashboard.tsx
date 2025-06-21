import React, { useState, useEffect } from 'react';
import { DashboardSidebar } from '../components/dashboard/DashboardSidebar';
import { DashboardContent } from '../components/dashboard/DashboardContent';
import { supabase } from '../lib/supabaseClient';

const Dashboard = () => {
  const [showSidebar, setShowSidebar] = useState(false);
  const [isSuperAdmin, setIsSuperAdmin] = useState(false);
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

    checkSuperAdmin();
  }, []);

  return (
    <div className="min-h-screen bg-[#1e1e1e] text-white font-outfit">
      <div className="flex">
        <DashboardSidebar
          onSidebarHide={() => setShowSidebar(false)}
          showSidebar={showSidebar}
          isSuperAdmin={isSuperAdmin}
        />
        <DashboardContent
          onSidebarShow={() => setShowSidebar(true)}
        />
      </div>
    </div>
  );
};

export default Dashboard;
