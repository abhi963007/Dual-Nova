import React, { useEffect, useState } from 'react';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import { supabase } from '../../lib/supabaseClient';
import { Loader2 } from 'lucide-react';
import { EnquiryDetailsModal } from './EnquiryDetailsModal';

interface Enquiry {
  id: string;
  name: string;
  email: string;
  service: string;
  budget: string;
  message: string;
  created_at: string;
  phone?: string;
  company?: string;
}

export const EnquiryTable: React.FC = () => {
  const queryClient = useQueryClient();
  const [selectedEnquiry, setSelectedEnquiry] = useState<Enquiry | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const { data: enquiries, isLoading } = useQuery({
    queryKey: ['enquiries'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('enquiries')
        .select('*')
        .order('created_at', { ascending: false });
      if (error) throw error;
      return data ?? [];
    },
  });

  // Realtime insert listener
  useEffect(() => {
    const channel = supabase
      .channel('public:enquiries')
      .on(
        'postgres_changes',
        { event: 'INSERT', schema: 'public', table: 'enquiries' },
        () => {
          queryClient.invalidateQueries({ queryKey: ['enquiries'] });
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [queryClient]);

  const handleRowClick = (enquiry: Enquiry) => {
    setSelectedEnquiry(enquiry);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-40 bg-[#171717] rounded-lg">
        <Loader2 className="animate-spin text-gray-400" />
      </div>
    );
  }

  return (
    <>
      <div className="bg-[#171717] rounded-lg p-4 overflow-auto h-80">
        <h3 className="text-xl font-bold text-white mb-4">Recent Enquiries</h3>
        {enquiries && enquiries.length > 0 ? (
          <table className="min-w-full text-sm text-left text-gray-400">
            <thead className="text-xs uppercase bg-[#1e1e1e] text-gray-500">
              <tr>
                <th scope="col" className="px-4 py-3">Name</th>
                <th scope="col" className="px-4 py-3">Email</th>
                <th scope="col" className="px-4 py-3">Service</th>
                <th scope="col" className="px-4 py-3">Budget</th>
                <th scope="col" className="px-4 py-3">Date</th>
              </tr>
            </thead>
            <tbody>
              {enquiries.map((enq: Enquiry) => (
                <tr 
                  key={enq.id} 
                  className="border-b border-gray-700 hover:bg-[#222222] cursor-pointer"
                  onClick={() => handleRowClick(enq)}
                >
                  <td className="px-4 py-3 whitespace-nowrap text-white">{enq.name}</td>
                  <td className="px-4 py-3">{enq.email}</td>
                  <td className="px-4 py-3">{enq.service}</td>
                  <td className="px-4 py-3">{enq.budget || '—'}</td>
                  <td className="px-4 py-3">{new Date(enq.created_at).toLocaleDateString()}</td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <p className="text-gray-500">No enquiries yet.</p>
        )}
      </div>

      <EnquiryDetailsModal 
        isOpen={isModalOpen}
        onClose={closeModal}
        enquiry={selectedEnquiry}
      />
    </>
  );
};
