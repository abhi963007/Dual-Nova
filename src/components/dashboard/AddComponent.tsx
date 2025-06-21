
import React, { useState } from 'react';
import { Plus, Rocket } from 'lucide-react';
import { ProjectModal } from './ProjectModal';

interface AddComponentProps {
  onProjectCreate?: (project: { name: string; description: string; type: string }) => void;
}

export const AddComponent: React.FC<AddComponentProps> = ({ onProjectCreate }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleCreateProject = (project: { name: string; description: string; type: string }) => {
    onProjectCreate?.(project);
    console.log('New project created:', project);
  };

  return (
    <>
      <div className="h-full">
        <div className="w-full h-20 bg-[#181818] bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')]" />
        <div
          className="flex flex-col items-center"
          style={{ transform: 'translate(0, -40px)' }}
        >
          <div className="w-20 h-20 bg-[#414455] rounded-full flex items-center justify-center">
            <Rocket className="w-10 h-10 text-white" />
          </div>
          <div className="text-white font-bold mt-3 text-center">
            No Projects Created Yet
          </div>
          <div className="mt-2 text-gray-400 text-center text-sm">Simply create your first project</div>
          <div className="mt-1 text-gray-400 text-center text-sm">Just click on the button</div>
          <button 
            onClick={() => setIsModalOpen(true)}
            className="flex items-center p-3 mt-3 bg-[#2f49d1] hover:bg-[#4964ed] rounded-2xl text-white transition-colors"
          >
            <Plus className="w-5 h-5" />
            <div className="ml-2">Add Project</div>
            <div className="ml-2 bg-[#4964ed] rounded-2xl px-2 py-1 text-sm">
              23
            </div>
          </button>
        </div>
      </div>

      <ProjectModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onCreateProject={handleCreateProject}
      />
    </>
  );
};
