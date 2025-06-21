
import React from 'react';
import { Calendar, FolderOpen, ExternalLink } from 'lucide-react';

interface Project {
  id: string;
  name: string;
  description: string;
  type: string;
  createdAt: string;
}

interface ProjectListProps {
  projects: Project[];
}

export const ProjectList: React.FC<ProjectListProps> = ({ projects }) => {
  if (projects.length === 0) {
    return null;
  }

  return (
    <div className="w-full p-2">
      <div className="bg-[#171717] rounded-lg p-6">
        <h3 className="text-xl font-bold text-white mb-4">Recent Projects</h3>
        <div className="space-y-3">
          {projects.slice(0, 3).map((project) => (
            <div
              key={project.id}
              className="p-4 bg-[#1e1e1e] rounded-lg border border-gray-700 hover:border-gray-600 transition-colors group cursor-pointer"
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-[#2f49d1] rounded-lg flex items-center justify-center">
                    <FolderOpen className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-white group-hover:text-blue-400 transition-colors">
                      {project.name}
                    </h4>
                    <p className="text-sm text-gray-400">{project.type}</p>
                  </div>
                </div>
                <div className="flex items-center gap-2 text-gray-400">
                  <Calendar className="w-4 h-4" />
                  <span className="text-sm">{project.createdAt}</span>
                  <ExternalLink className="w-4 h-4 opacity-0 group-hover:opacity-100 transition-opacity" />
                </div>
              </div>
              {project.description && (
                <p className="text-sm text-gray-500 mt-2 ml-13">{project.description}</p>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
