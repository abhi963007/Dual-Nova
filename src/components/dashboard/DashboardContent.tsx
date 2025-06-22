import React, { useState, useEffect } from 'react';
import { Search, Menu, Star, Calendar } from 'lucide-react';
import { NameCard } from './NameCard';
import { StatsGraph } from './StatsGraph';
import { EnquiryTable } from './EnquiryTable';
import { AddComponent } from './AddComponent';
import { supabase } from '../../lib/supabaseClient';

interface ContentProps {
  onSidebarShow: () => void;
}

interface Project {
  id: string;
  name: string;
  description: string;
  type: string;
  createdAt: string;
}

interface AdminUser {
  id: string;
  full_name: string | null;
  email?: string | null;
  department?: string | null;
  name?: string;
  position?: string;
  transactions?: number;
  rise?: boolean;
  tasksCompleted?: number;
  imgId?: number;
}

export const DashboardContent: React.FC<ContentProps> = ({ onSidebarShow }) => {
  const [projects, setProjects] = useState<Project[]>([]);
  const [currentUser, setCurrentUser] = useState<any>(null);
  const [teamMembers, setTeamMembers] = useState<AdminUser[]>([]);
  const [loading, setLoading] = useState(true);

  // Fetch user data and projects from Supabase
  useEffect(() => {
    const fetchDashboardData = async () => {
      setLoading(true);
      try {
        // Get current user session
        const { data: { session } } = await supabase.auth.getSession();
        if (!session) {
          setLoading(false);
          return;
        }

        // Get current user details
        const { data: userData } = await supabase
          .from('admin_users')
          .select('*')
          .eq('id', session.user.id)
          .single();
          
        setCurrentUser(userData || null);
        
        // Get team members (admin users)
        const { data: adminUsers } = await supabase
          .from('admin_users')
          .select('*')
          .eq('is_admin', true)
          .limit(3);
          
        // Transform admin users to team members with required fields
        // In a real app, you'd have these fields in your database
        if (adminUsers) {
          const enhancedTeamMembers = adminUsers.map((admin, index) => ({
            id: admin.id,
            full_name: admin.full_name,
            name: admin.full_name || 'Unnamed Admin',
            position: admin.department || ['AI/ML Engineer', 'Full Stack Developer', 'Project Manager'][index % 3],
            transactions: Math.floor(2000 + Math.random() * 2000),
            rise: Math.random() > 0.3,
            tasksCompleted: Math.floor(3 + Math.random() * 3),
            imgId: index % 3
          }));
          setTeamMembers(enhancedTeamMembers);
        }
        
        // Get projects (simulated - in real app you'd have a projects table)
        // This would be a real query to your projects table
        const mockProjects = [
          {
            id: '1',
            name: 'E-commerce Platform',
            description: 'Online shopping platform with payment integration',
            type: 'Web Development',
            createdAt: new Date().toLocaleDateString()
          },
          {
            id: '2',
            name: 'Mobile Banking App',
            description: 'Secure banking application for iOS and Android',
            type: 'Mobile App',
            createdAt: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toLocaleDateString()
          }
        ];
        setProjects(mockProjects);
        
      } catch (error) {
        console.error('Error fetching dashboard data:', error);
      } finally {
        setLoading(false);
      }
    };
    
    fetchDashboardData();
  }, []);

  const handleProjectCreate = (projectData: { name: string; description: string; type: string }) => {
    const newProject: Project = {
      id: Date.now().toString(),
      name: projectData.name,
      description: projectData.description,
      type: projectData.type,
      createdAt: new Date().toLocaleDateString()
    };
    setProjects(prev => [newProject, ...prev]);
    
    // In a real app, you'd save to Supabase here
    // supabase.from('projects').insert(newProject)
  };

  // Format current date for display
  const formattedDate = new Intl.DateTimeFormat('en-US', {
    month: 'long',
    day: 'numeric'
  }).format(new Date());

  if (loading) {
    return (
      <div className="w-full h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  return (
    <div className="flex w-full">
      <div className="w-full h-screen hidden sm:block sm:w-20 xl:w-60 flex-shrink-0">
        {/* Spacer for sidebar */}
      </div>
      <div className="h-screen flex-grow overflow-x-hidden overflow-auto flex flex-wrap content-start p-2">
        <div className="w-full sm:flex p-2 items-end">
          <div className="sm:flex-grow flex justify-between">
            <div className="">
              <div className="flex items-center">
                <div className="text-3xl font-bold text-white">Hello {currentUser?.full_name?.split(' ')[0] || 'User'}</div>
                <div className="flex items-center p-2 bg-[#171717] ml-2 rounded-xl">
                  <Star className="w-4 h-4 text-[#f7b91c]" />
                  <div className="ml-2 font-bold text-[#f7b91c]">
                    PREMIUM
                  </div>
                </div>
              </div>
              <div className="flex items-center">
                <Calendar className="w-3 h-3 text-gray-400" />
                <div className="ml-2 text-gray-400">{formattedDate}</div>
              </div>
            </div>
            <button
              onClick={onSidebarShow}
              className="block sm:hidden p-2 hover:bg-white/5 rounded"
            >
              <Menu size={20} />
            </button>
          </div>
          <div className="w-full sm:w-56 mt-4 sm:mt-0 relative">
            <Search className="w-5 h-5 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              className="pl-12 py-2 pr-2 block w-full rounded-lg border-gray-600 bg-[#171717] text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Search projects..."
            />
          </div>
        </div>

        {/* Enquiries */}
        <div className="w-full p-2">
          <EnquiryTable />
        </div>

        {teamMembers.map((member) => (
          <NameCard
            key={member.id}
            name={member.name || ''}
            position={member.position || ''}
            transactions={member.transactions || 0}
            rise={member.rise || false}
            tasksCompleted={member.tasksCompleted || 0}
            imgId={member.imgId || 0}
          />
        ))}

        <div className="w-full p-2">
          <div className="rounded-lg bg-[#171717] h-80">
            <StatsGraph />
          </div>
        </div>

        {/* Add Project CTA */}
        <div className="w-full p-2 lg:w-1/3">
          <div className="rounded-lg bg-[#171717] overflow-hidden h-80">
            <AddComponent onProjectCreate={handleProjectCreate} />
          </div>
        </div>
      </div>
    </div>
  );
};
