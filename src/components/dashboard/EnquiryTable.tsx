import React, { useEffect, useState } from 'react';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import { supabase } from '../../lib/supabaseClient';
import { Loader2, ArrowUpDown, ArrowDown, ArrowUp, ChevronDown } from 'lucide-react';
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

type SortField = 'name' | 'email' | 'service' | 'budget' | 'created_at';
type SortDirection = 'asc' | 'desc';

export const EnquiryTable: React.FC = () => {
  const queryClient = useQueryClient();
  const [selectedEnquiry, setSelectedEnquiry] = useState<Enquiry | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [sortField, setSortField] = useState<SortField>('created_at');
  const [sortDirection, setSortDirection] = useState<SortDirection>('desc');
  const [showSortMenu, setShowSortMenu] = useState(false);
  // Pagination state
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

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

  const handleSort = (field: SortField) => {
    if (sortField === field) {
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
    } else {
      setSortField(field);
      setSortDirection('asc');
    }
  };

  const getSortIcon = (field: SortField) => {
    if (sortField !== field) return <ArrowUpDown className="w-4 h-4 ml-1 inline" />;
    return sortDirection === 'asc' ? 
      <ArrowUp className="w-4 h-4 ml-1 inline text-blue-400" /> : 
      <ArrowDown className="w-4 h-4 ml-1 inline text-blue-400" />;
  };

  const sortedEnquiries = React.useMemo(() => {
    if (!enquiries) return [];
    
    return [...enquiries].sort((a, b) => {
      if (sortField === 'created_at') {
        const dateA = new Date(a.created_at).getTime();
        const dateB = new Date(b.created_at).getTime();
        return sortDirection === 'asc' ? dateA - dateB : dateB - dateA;
      }
      
      if (sortField === 'budget') {
        // Extract numeric values from budget strings for sorting
        const extractValue = (budget: string | null) => {
          if (!budget) return 0;
          const matches = budget.match(/[\d,]+/g);
          if (!matches) return 0;
          // Use the first number in the range
          return parseFloat(matches[0].replace(/,/g, ''));
        };
        
        const budgetA = extractValue(a.budget);
        const budgetB = extractValue(b.budget);
        return sortDirection === 'asc' ? budgetA - budgetB : budgetB - budgetA;
      }
      
      // For string fields
      const valueA = a[sortField]?.toLowerCase() || '';
      const valueB = b[sortField]?.toLowerCase() || '';
      
      if (sortDirection === 'asc') {
        return valueA.localeCompare(valueB);
      } else {
        return valueB.localeCompare(valueA);
      }
    });
  }, [enquiries, sortField, sortDirection]);

  // Paginated data derived from sorted list
  const paginatedEnquiries = React.useMemo(() => {
    const start = (currentPage - 1) * itemsPerPage;
    return sortedEnquiries.slice(start, start + itemsPerPage);
  }, [sortedEnquiries, currentPage]);

  const totalPages = Math.ceil(sortedEnquiries.length / itemsPerPage);

  // Reset page to first whenever the sorted list changes (e.g., after sorting or realtime update)
  React.useEffect(() => {
    setCurrentPage(1);
  }, [sortedEnquiries]);

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
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-xl font-bold text-white">Recent Enquiries</h3>
          
          <div className="relative">
            <button 
              onClick={() => setShowSortMenu(!showSortMenu)}
              className="flex items-center px-3 py-2 bg-[#1e1e1e] text-gray-300 rounded-lg text-sm hover:bg-[#252525]"
            >
              Sort by
              <ChevronDown className="w-4 h-4 ml-1" />
            </button>
            
            {showSortMenu && (
              <div className="absolute right-0 mt-2 w-48 bg-[#1e1e1e] rounded-lg shadow-lg z-10 py-1">
                <button 
                  className={`w-full text-left px-4 py-2 text-sm ${sortField === 'name' ? 'text-blue-400' : 'text-gray-300'} hover:bg-[#252525]`}
                  onClick={() => {
                    handleSort('name');
                    setShowSortMenu(false);
                  }}
                >
                  Name {sortField === 'name' && (sortDirection === 'asc' ? '(A-Z)' : '(Z-A)')}
                </button>
                <button 
                  className={`w-full text-left px-4 py-2 text-sm ${sortField === 'service' ? 'text-blue-400' : 'text-gray-300'} hover:bg-[#252525]`}
                  onClick={() => {
                    handleSort('service');
                    setShowSortMenu(false);
                  }}
                >
                  Service {sortField === 'service' && (sortDirection === 'asc' ? '(A-Z)' : '(Z-A)')}
                </button>
                <button 
                  className={`w-full text-left px-4 py-2 text-sm ${sortField === 'budget' ? 'text-blue-400' : 'text-gray-300'} hover:bg-[#252525]`}
                  onClick={() => {
                    handleSort('budget');
                    setShowSortMenu(false);
                  }}
                >
                  Budget {sortField === 'budget' && (sortDirection === 'asc' ? '(Low-High)' : '(High-Low)')}
                </button>
                <button 
                  className={`w-full text-left px-4 py-2 text-sm ${sortField === 'created_at' ? 'text-blue-400' : 'text-gray-300'} hover:bg-[#252525]`}
                  onClick={() => {
                    handleSort('created_at');
                    setShowSortMenu(false);
                  }}
                >
                  Date {sortField === 'created_at' && (sortDirection === 'asc' ? '(Oldest)' : '(Newest)')}
                </button>
              </div>
            )}
          </div>
        </div>
        
        {sortedEnquiries && sortedEnquiries.length > 0 ? (
        <table className="min-w-full text-sm text-left text-gray-400">
          <thead className="text-xs uppercase bg-[#1e1e1e] text-gray-500">
            <tr>
                <th scope="col" className="px-4 py-3 cursor-pointer" onClick={() => handleSort('name')}>
                  Name {getSortIcon('name')}
                </th>
                <th scope="col" className="px-4 py-3 cursor-pointer" onClick={() => handleSort('email')}>
                  Email {getSortIcon('email')}
                </th>
                <th scope="col" className="px-4 py-3 cursor-pointer" onClick={() => handleSort('service')}>
                  Service {getSortIcon('service')}
                </th>
                <th scope="col" className="px-4 py-3 cursor-pointer" onClick={() => handleSort('budget')}>
                  Budget {getSortIcon('budget')}
                </th>
                <th scope="col" className="px-4 py-3 cursor-pointer" onClick={() => handleSort('created_at')}>
                  Date {getSortIcon('created_at')}
                </th>
            </tr>
          </thead>
          <tbody>
              {paginatedEnquiries.map((enq: Enquiry) => (
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

      {sortedEnquiries && sortedEnquiries.length > itemsPerPage && (
        <div className="flex justify-between items-center mt-4">
          <button
            onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
            disabled={currentPage === 1}
            className="px-3 py-1 rounded-lg bg-[#1e1e1e] text-gray-300 disabled:opacity-50"
          >
            Previous
          </button>
          <span className="text-sm text-gray-400">
            Page {currentPage} of {totalPages}
          </span>
          <button
            onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
            disabled={currentPage === totalPages}
            className="px-3 py-1 rounded-lg bg-[#1e1e1e] text-gray-300 disabled:opacity-50"
          >
            Next
          </button>
        </div>
      )}

      <EnquiryDetailsModal 
        isOpen={isModalOpen}
        onClose={closeModal}
        enquiry={selectedEnquiry}
      />
    </>
  );
};
