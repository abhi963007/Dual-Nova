import React, { useEffect, useState } from 'react';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import { supabase } from '../../lib/supabaseClient';
import { Loader2, ArrowUpDown, ArrowDown, ArrowUp, ChevronDown, ChevronLeft, ChevronRight } from 'lucide-react';
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
    // Reset to first page when sorting changes
    setCurrentPage(1);
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

  // Calculate pagination
  const totalPages = Math.ceil((sortedEnquiries?.length || 0) / itemsPerPage);
  const paginatedEnquiries = sortedEnquiries.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const goToNextPage = () => {
    setCurrentPage(prev => Math.min(prev + 1, totalPages));
  };

  const goToPreviousPage = () => {
    setCurrentPage(prev => Math.max(prev - 1, 1));
  };

  const goToPage = (pageNumber: number) => {
    setCurrentPage(pageNumber);
  };

  // Generate page numbers to display
  const getPageNumbers = () => {
    const pageNumbers = [];
    const maxButtons = 5; // Maximum number of page buttons to show
    
    if (totalPages <= maxButtons) {
      // If total pages are less than or equal to max buttons, show all pages
      for (let i = 1; i <= totalPages; i++) {
        pageNumbers.push(i);
      }
    } else {
      // Always include first page
      pageNumbers.push(1);
      
      // Calculate start and end of middle section
      let startMiddle = Math.max(2, currentPage - 1);
      let endMiddle = Math.min(currentPage + 1, totalPages - 1);
      
      // Adjust to show up to 3 middle buttons
      if (startMiddle > endMiddle) {
        startMiddle = endMiddle;
      }
      
      // Add ellipsis after page 1 if needed
      if (startMiddle > 2) {
        pageNumbers.push('...');
      }
      
      // Add middle pages
      for (let i = startMiddle; i <= endMiddle; i++) {
        pageNumbers.push(i);
      }
      
      // Add ellipsis before last page if needed
      if (endMiddle < totalPages - 1) {
        pageNumbers.push('...');
      }
      
      // Always include last page
      pageNumbers.push(totalPages);
    }
    
    return pageNumbers;
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
      <div className="bg-[#171717] rounded-lg p-4 overflow-auto h-auto">
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
        
        <div className="max-h-[380px] overflow-auto">
          {sortedEnquiries && sortedEnquiries.length > 0 ? (
        <table className="min-w-full text-sm text-left text-gray-400">
              <thead className="text-xs uppercase bg-[#1e1e1e] sticky top-0 z-10 text-gray-500">
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

        {/* Pagination controls */}
        {totalPages > 1 && (
          <div className="flex justify-center items-center mt-4 space-x-2">
            <button
              onClick={goToPreviousPage}
              disabled={currentPage === 1}
              className={`p-2 rounded-md ${currentPage === 1 ? 'text-gray-600 cursor-not-allowed' : 'text-gray-300 hover:bg-[#252525]'}`}
            >
              <ChevronLeft size={16} />
            </button>

            {getPageNumbers().map((pageNum, index) => (
              <React.Fragment key={index}>
                {pageNum === '...' ? (
                  <span className="text-gray-500 px-3">...</span>
                ) : (
                  <button
                    onClick={() => typeof pageNum === 'number' && goToPage(pageNum)}
                    className={`px-3 py-1 rounded-md ${
                      currentPage === pageNum
                        ? 'bg-blue-600 text-white'
                        : 'text-gray-300 hover:bg-[#252525]'
                    }`}
                  >
                    {pageNum}
                  </button>
                )}
              </React.Fragment>
            ))}

            <button
              onClick={goToNextPage}
              disabled={currentPage === totalPages}
              className={`p-2 rounded-md ${currentPage === totalPages ? 'text-gray-600 cursor-not-allowed' : 'text-gray-300 hover:bg-[#252525]'}`}
            >
              <ChevronRight size={16} />
            </button>
          </div>
        )}

        {/* Page info */}
        {sortedEnquiries.length > 0 && (
          <div className="text-center mt-2 text-sm text-gray-500">
            Showing {(currentPage - 1) * itemsPerPage + 1} to {Math.min(currentPage * itemsPerPage, sortedEnquiries.length)} of {sortedEnquiries.length} enquiries
          </div>
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
