import React from 'react';
import { X } from 'lucide-react';

interface EnquiryDetailsModalProps {
  isOpen: boolean;
  onClose: () => void;
  enquiry: {
    id: string;
    name: string;
    email: string;
    service: string;
    budget: string;
    message: string;
    created_at: string;
    phone?: string;
    company?: string;
  } | null;
}

export const EnquiryDetailsModal: React.FC<EnquiryDetailsModalProps> = ({
  isOpen,
  onClose,
  enquiry
}) => {
  if (!isOpen || !enquiry) return null;

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return new Intl.DateTimeFormat('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    }).format(date);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-[#171717] rounded-lg w-full max-w-2xl mx-4 overflow-hidden">
        <div className="flex justify-between items-center p-4 border-b border-gray-700">
          <h3 className="text-xl font-bold text-white">Enquiry Details</h3>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-white"
          >
            <X className="w-5 h-5" />
          </button>
        </div>
        
        <div className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
            <div>
              <p className="text-gray-400 text-sm">Name</p>
              <p className="text-white font-medium">{enquiry.name}</p>
            </div>
            <div>
              <p className="text-gray-400 text-sm">Email</p>
              <p className="text-white font-medium">{enquiry.email}</p>
            </div>
            {enquiry.phone && (
              <div>
                <p className="text-gray-400 text-sm">Phone</p>
                <p className="text-white font-medium">{enquiry.phone}</p>
              </div>
            )}
            {enquiry.company && (
              <div>
                <p className="text-gray-400 text-sm">Company</p>
                <p className="text-white font-medium">{enquiry.company}</p>
              </div>
            )}
            <div>
              <p className="text-gray-400 text-sm">Service</p>
              <p className="text-white font-medium">{enquiry.service}</p>
            </div>
            <div>
              <p className="text-gray-400 text-sm">Budget</p>
              <p className="text-white font-medium">{enquiry.budget || '—'}</p>
            </div>
            <div>
              <p className="text-gray-400 text-sm">Date</p>
              <p className="text-white font-medium">{formatDate(enquiry.created_at)}</p>
            </div>
          </div>
          
          <div className="mt-6">
            <p className="text-gray-400 text-sm mb-2">Message</p>
            <div className="bg-[#1e1e1e] p-4 rounded-lg text-white">
              <p className="whitespace-pre-wrap">{enquiry.message}</p>
            </div>
          </div>
        </div>
        
        <div className="flex justify-end p-4 border-t border-gray-700">
          <button
            onClick={onClose}
            className="px-4 py-2 bg-[#2f49d1] hover:bg-[#4964ed] text-white rounded-lg transition-colors"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
}; 