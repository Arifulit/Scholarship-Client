/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import { Helmet } from 'react-helmet-async';
import { useQuery } from '@tanstack/react-query';
import { useState, useMemo } from 'react';
import { FiSearch, FiDownload, FiRefreshCw, FiUsers, FiCalendar, FiTrendingUp, FiCheckCircle, FiClock, FiXCircle, FiEye, FiBarChart, FiChevronLeft, FiChevronRight, FiMoreHorizontal, FiFilter, FiGrid, FiList, FiChevronUp, FiChevronDown } from 'react-icons/fi';
import { HiAcademicCap } from 'react-icons/hi';
import { BsGrid3X3Gap, BsList, BsThreeDotsVertical } from 'react-icons/bs';
import { toast } from 'react-hot-toast';
import useAxiosSecure from '../../../hooks/useAxiosSecure';

const AllAppliedScholarship = () => {
  const axiosSecure = useAxiosSecure();
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('');
  const [sortBy, setSortBy] = useState('date');
  const [sortDirection, setSortDirection] = useState('desc');
  const [viewMode, setViewMode] = useState('table'); // table or grid
  const [dateRange, setDateRange] = useState('all');
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);
  const [selectedItems, setSelectedItems] = useState([]);
  const [showBulkActions, setShowBulkActions] = useState(false);
  
  const { data: orders = [], isLoading, error, refetch } = useQuery({
    queryKey: ['orders'],
    queryFn: async () => {
      console.log('🔍 Attempting to fetch data from backend...');
      try {
        // Try to fetch from backend first
        console.log('📡 Trying backend:', '/scholar/moderator');
        const { data } = await axiosSecure('/scholar/moderator');
        console.log('✅ Backend data received:', data);
        return data;
      } catch (backendError) {
        console.error('❌ Backend failed:', backendError);
        toast.error('Failed to fetch data from server');
        throw backendError;
      }
    },
    retry: 1,
    staleTime: 2 * 60 * 1000,
    onError: (error) => {
      console.error('❌ Query Error:', error);
      if (error?.response?.status !== 403) {
        toast.error('Failed to fetch scholarship data');
      }
    }
  });

  // Filter and sort orders
  const filteredAndSortedOrders = useMemo(() => {
    let filtered = orders.filter(order => {
      const matchesSearch = !searchTerm || 
        order.universityName?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        order.scholarshipCategory?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        order.subjectCategory?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        order.applicantName?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        order.degree?.toLowerCase().includes(searchTerm.toLowerCase());
      
      const matchesStatus = !filterStatus || order.status === filterStatus;
      
      // Date range filtering
      let matchesDate = true;
      if (dateRange !== 'all' && order.appliedDate) {
        const orderDate = new Date(order.appliedDate);
        const now = new Date();
        
        switch (dateRange) {
          case 'today': {
            matchesDate = orderDate.toDateString() === now.toDateString();
            break;
          }
          case 'week': {
            const weekAgo = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000);
            matchesDate = orderDate >= weekAgo;
            break;
          }
          case 'month': {
            const monthAgo = new Date(now.getTime() - 30 * 24 * 60 * 60 * 1000);
            matchesDate = orderDate >= monthAgo;
            break;
          }
          case 'quarter': {
            const quarterAgo = new Date(now.getTime() - 90 * 24 * 60 * 60 * 1000);
            matchesDate = orderDate >= quarterAgo;
            break;
          }
          default:
            matchesDate = true;
        }
      }
      
      return matchesSearch && matchesStatus && matchesDate;
    });

    // Sort the filtered results
    filtered.sort((a, b) => {
      let aValue, bValue;
      
      switch (sortBy) {
        case 'university':
          aValue = a.universityName?.toLowerCase() || '';
          bValue = b.universityName?.toLowerCase() || '';
          break;
        case 'category':
          aValue = a.scholarshipCategory?.toLowerCase() || '';
          bValue = b.scholarshipCategory?.toLowerCase() || '';
          break;
        case 'status':
          aValue = a.status?.toLowerCase() || '';
          bValue = b.status?.toLowerCase() || '';
          break;
        case 'date':
        default:
          aValue = new Date(a.appliedDate || 0);
          bValue = new Date(b.appliedDate || 0);
          break;
      }
      
      if (aValue < bValue) return sortDirection === 'asc' ? -1 : 1;
      if (aValue > bValue) return sortDirection === 'asc' ? 1 : -1;
      return 0;
    });

    return filtered;
  }, [orders, searchTerm, filterStatus, dateRange, sortBy, sortDirection]);

  // Pagination logic
  const totalPages = Math.ceil(filteredAndSortedOrders.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const paginatedOrders = filteredAndSortedOrders.slice(startIndex, endIndex);

  // Handle sorting
  const handleSort = (field) => {
    if (sortBy === field) {
      setSortDirection(prev => prev === 'asc' ? 'desc' : 'asc');
    } else {
      setSortBy(field);
      setSortDirection('asc');
    }
  };

  // Handle bulk selection
  const handleSelectAll = () => {
    if (selectedItems.length === paginatedOrders.length) {
      setSelectedItems([]);
    } else {
      setSelectedItems(paginatedOrders.map(order => order._id));
    }
  };

  const handleSelectItem = (orderId) => {
    setSelectedItems(prev => 
      prev.includes(orderId) 
        ? prev.filter(id => id !== orderId)
        : [...prev, orderId]
    );
  };

  // CSV Export function
  const exportToCSV = () => {
    const csvData = filteredAndSortedOrders.map(order => ({
      'University': order.universityName || '',
      'Scholarship Category': order.scholarshipCategory || '',
      'Subject Category': order.subjectCategory || '',
      'Degree': order.degree || '',
      'Status': order.status || '',
      'Applied Date': order.appliedDate ? new Date(order.appliedDate).toLocaleDateString() : '',
      'Applicant': order.applicantName || '',
      'Email': order.applicantEmail || ''
    }));

    const csvHeaders = Object.keys(csvData[0]).join(',');
    const csvRows = csvData.map(row => Object.values(row).join(','));
    const csvContent = [csvHeaders, ...csvRows].join('\n');

    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = `scholarship_applications_${new Date().toISOString().split('T')[0]}.csv`;
    link.click();

    toast.success('Data exported successfully!');
  };

  // Status badge component
  const StatusBadge = ({ status }) => {
    const statusConfig = {
      pending: {
        bg: 'bg-yellow-100 dark:bg-yellow-900/30',
        text: 'text-yellow-800 dark:text-yellow-300',
        icon: FiClock
      },
      approved: {
        bg: 'bg-green-100 dark:bg-green-900/30',
        text: 'text-green-800 dark:text-green-300',
        icon: FiCheckCircle
      },
      rejected: {
        bg: 'bg-red-100 dark:bg-red-900/30',
        text: 'text-red-800 dark:text-red-300',
        icon: FiXCircle
      }
    };

    const config = statusConfig[status] || statusConfig.pending;
    const Icon = config.icon;

    return (
      <span className={`inline-flex items-center gap-1 px-3 py-1 rounded-full text-sm font-medium ${config.bg} ${config.text}`}>
        <Icon className="w-4 h-4" />
        {status?.charAt(0).toUpperCase() + status?.slice(1)}
      </span>
    );
  };

  // Calculate statistics
  const stats = {
    total: orders.length,
    pending: orders.filter(o => o.status === 'pending').length,
    approved: orders.filter(o => o.status === 'approved').length,
    rejected: orders.filter(o => o.status === 'rejected').length,
    filtered: filteredAndSortedOrders.length,
    approvalRate: orders.length > 0 ? Math.round((orders.filter(o => o.status === 'approved').length / orders.length) * 100) : 0,
    currentPage,
    totalPages,
    showing: `${startIndex + 1}-${Math.min(endIndex, filteredAndSortedOrders.length)}`,
    selectedCount: selectedItems.length
  };

  if (isLoading) return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors duration-300">
      <div className="space-y-4 sm:space-y-6 p-3 sm:p-4 lg:p-6">
        {/* Loading Statistics Dashboard */}
        <div className="grid grid-cols-1 xs:grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 lg:gap-6 mb-4 sm:mb-6">
          {[...Array(4)].map((_, i) => (
            <div key={i} className="bg-white dark:bg-gray-800 rounded-xl sm:rounded-2xl p-4 sm:p-5 lg:p-6 border border-gray-200 dark:border-gray-700 animate-pulse">
              <div className="flex items-center justify-between">
                <div className="space-y-2 flex-1">
                  <div className="h-3 sm:h-4 bg-gray-300 dark:bg-gray-600 rounded w-20 sm:w-24"></div>
                  <div className="h-6 sm:h-8 bg-gray-300 dark:bg-gray-600 rounded w-12 sm:w-16"></div>
                  <div className="h-2 sm:h-3 bg-gray-300 dark:bg-gray-600 rounded w-16 sm:w-20"></div>
                </div>
                <div className="p-2 sm:p-3 bg-gray-300 dark:bg-gray-600 rounded-lg sm:rounded-xl flex-shrink-0">
                  <div className="w-5 h-5 sm:w-6 sm:h-6 bg-gray-400 dark:bg-gray-500 rounded"></div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Loading Content */}
        <div className="bg-white dark:bg-gray-800 rounded-xl sm:rounded-2xl shadow-lg border border-gray-200 dark:border-gray-700 p-4 sm:p-6 animate-pulse">
          <div className="space-y-3 sm:space-y-4">
            {[...Array(window.innerWidth < 640 ? 5 : 10)].map((_, i) => (
              <div key={i} className="flex items-center gap-3 sm:gap-4 p-3 sm:p-4 border border-gray-200 dark:border-gray-700 rounded-lg">
                <div className="h-3 w-3 sm:h-4 sm:w-4 bg-gray-300 dark:bg-gray-600 rounded"></div>
                <div className="flex-1 space-y-2">
                  <div className="h-3 sm:h-4 bg-gray-300 dark:bg-gray-600 rounded w-full sm:w-3/4"></div>
                  <div className="h-2 sm:h-3 bg-gray-300 dark:bg-gray-600 rounded w-3/4 sm:w-1/2"></div>
                </div>
                <div className="h-5 sm:h-6 bg-gray-300 dark:bg-gray-600 rounded-full w-12 sm:w-16"></div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50/80 to-indigo-100/70 dark:from-gray-950 dark:via-blue-950/30 dark:to-indigo-950/40 transition-all duration-500 relative overflow-hidden">
      {/* Enhanced Background Elements */}
      <div className="absolute top-0 right-0 w-72 h-72 sm:w-96 sm:h-96 lg:w-[32rem] lg:h-[32rem] bg-gradient-to-br from-blue-400/25 via-purple-500/20 to-pink-600/15 rounded-full blur-3xl animate-pulse"></div>
      <div className="absolute bottom-0 left-0 w-72 h-72 sm:w-96 sm:h-96 lg:w-[32rem] lg:h-[32rem] bg-gradient-to-tr from-emerald-400/25 via-cyan-500/20 to-teal-600/15 rounded-full blur-3xl animate-pulse animation-delay-1000"></div>
      <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-64 h-64 sm:w-80 sm:h-80 lg:w-96 lg:h-96 bg-gradient-to-r from-violet-400/15 via-purple-500/10 to-indigo-600/15 rounded-full blur-3xl animate-pulse animation-delay-2000"></div>
      
      {/* Floating Elements */}
      <div className="absolute top-20 left-20 w-3 h-3 bg-blue-400/40 rounded-full animate-bounce animation-delay-300"></div>
      <div className="absolute top-40 right-32 w-2 h-2 bg-purple-400/40 rounded-full animate-bounce animation-delay-700"></div>
      <div className="absolute bottom-32 left-40 w-4 h-4 bg-emerald-400/40 rounded-full animate-bounce animation-delay-500"></div>
      
      <Helmet>
        <title>Manage Applied Scholarships | Dashboard</title>
      </Helmet>

      <div className="relative z-10 space-y-4 sm:space-y-6 lg:space-y-8 p-3 sm:p-4 lg:p-6">
        {/* Statistics Dashboard */}
        <div className="grid grid-cols-1 xs:grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 lg:gap-6 mb-6 lg:mb-8">
          {/* Total Applications - Enhanced */}
          <div className="group relative bg-gradient-to-br from-white/90 via-white/80 to-blue-50/70 dark:from-gray-800/90 dark:via-gray-800/80 dark:to-blue-900/30 backdrop-blur-2xl rounded-2xl sm:rounded-3xl lg:rounded-[2rem] p-5 sm:p-6 lg:p-8 border border-white/40 dark:border-gray-700/40 shadow-xl sm:shadow-2xl hover:shadow-3xl transform hover:scale-[1.02] hover:-translate-y-2 sm:hover:-translate-y-3 transition-all duration-500 sm:duration-700 overflow-hidden hover:border-blue-400/50 dark:hover:border-blue-500/50">
            <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 via-indigo-500/8 to-purple-600/5 dark:from-blue-400/8 dark:via-indigo-500/10 dark:to-purple-500/5"></div>
            <div className="absolute top-0 right-0 w-20 h-20 sm:w-24 sm:h-24 lg:w-32 lg:h-32 bg-gradient-to-br from-blue-400/20 to-transparent rounded-full blur-2xl group-hover:scale-150 transition-transform duration-700"></div>
            <div className="relative flex items-center justify-between">
              <div className="min-w-0 flex-1">
                <div className="flex items-center gap-2 mb-2">
                  <div className="w-2 h-2 bg-blue-500 rounded-full animate-pulse"></div>
                  <p className="text-xs sm:text-sm font-bold text-blue-600 dark:text-blue-400 tracking-wider uppercase">Total Applications</p>
                </div>
                <p className="text-3xl sm:text-4xl lg:text-5xl font-black text-transparent bg-gradient-to-r from-blue-600 via-blue-700 to-indigo-700 dark:from-blue-400 dark:via-blue-300 dark:to-indigo-400 bg-clip-text mb-2 font-display group-hover:scale-105 transition-transform duration-300">{stats.total}</p>
                <div className="flex items-center gap-2">
                  <div className="w-8 h-1 bg-gradient-to-r from-blue-500 to-transparent rounded-full"></div>
                  <p className="text-xs sm:text-sm text-blue-500 dark:text-blue-400 font-semibold">All submissions</p>
                </div>
              </div>
              <div className="relative p-3 sm:p-4 lg:p-5 bg-gradient-to-br from-blue-500 via-blue-600 to-indigo-600 rounded-xl sm:rounded-2xl lg:rounded-3xl shadow-2xl group-hover:scale-110 group-hover:rotate-3 transition-all duration-500 flex-shrink-0">
                <div className="absolute inset-0 bg-gradient-to-br from-white/20 to-transparent rounded-xl sm:rounded-2xl lg:rounded-3xl"></div>
                <FiUsers className="relative w-6 h-6 sm:w-7 sm:h-7 lg:w-8 lg:h-8 text-white group-hover:scale-110 transition-transform duration-300" />
              </div>
            </div>
          </div>

          {/* Pending Applications - Enhanced */}
          <div className="group relative bg-gradient-to-br from-white/90 via-white/80 to-yellow-50/70 dark:from-gray-800/90 dark:via-gray-800/80 dark:to-yellow-900/30 backdrop-blur-2xl rounded-2xl sm:rounded-3xl lg:rounded-[2rem] p-5 sm:p-6 lg:p-8 border border-white/40 dark:border-gray-700/40 shadow-xl sm:shadow-2xl hover:shadow-3xl transform hover:scale-[1.02] hover:-translate-y-2 sm:hover:-translate-y-3 transition-all duration-500 sm:duration-700 overflow-hidden hover:border-yellow-400/50 dark:hover:border-yellow-500/50">
            <div className="absolute inset-0 bg-gradient-to-br from-yellow-500/5 via-amber-500/8 to-orange-600/5 dark:from-yellow-400/8 dark:via-amber-500/10 dark:to-orange-500/5"></div>
            <div className="absolute top-0 right-0 w-20 h-20 sm:w-24 sm:h-24 lg:w-32 lg:h-32 bg-gradient-to-br from-yellow-400/20 to-transparent rounded-full blur-2xl group-hover:scale-150 transition-transform duration-700"></div>
            <div className="relative flex items-center justify-between">
              <div className="min-w-0 flex-1">
                <div className="flex items-center gap-2 mb-2">
                  <div className="w-2 h-2 bg-yellow-500 rounded-full animate-bounce"></div>
                  <p className="text-xs sm:text-sm font-bold text-yellow-600 dark:text-yellow-400 tracking-wider uppercase">Pending Review</p>
                </div>
                <p className="text-3xl sm:text-4xl lg:text-5xl font-black text-transparent bg-gradient-to-r from-yellow-600 via-yellow-700 to-orange-700 dark:from-yellow-400 dark:via-yellow-300 dark:to-orange-400 bg-clip-text mb-2 font-display group-hover:scale-105 transition-transform duration-300">{stats.pending}</p>
                <div className="flex items-center gap-2">
                  <div className="w-8 h-1 bg-gradient-to-r from-yellow-500 to-transparent rounded-full"></div>
                  <p className="text-xs sm:text-sm text-yellow-500 dark:text-yellow-400 font-semibold">Awaiting action</p>
                </div>
              </div>
              <div className="relative p-3 sm:p-4 lg:p-5 bg-gradient-to-br from-yellow-500 via-yellow-600 to-orange-600 rounded-xl sm:rounded-2xl lg:rounded-3xl shadow-2xl group-hover:scale-110 group-hover:rotate-3 transition-all duration-500 flex-shrink-0">
                <div className="absolute inset-0 bg-gradient-to-br from-white/20 to-transparent rounded-xl sm:rounded-2xl lg:rounded-3xl"></div>
                <FiClock className="relative w-6 h-6 sm:w-7 sm:h-7 lg:w-8 lg:h-8 text-white group-hover:scale-110 transition-transform duration-300 animate-pulse" />
              </div>
            </div>
          </div>

          {/* Approved Applications - Enhanced */}
          <div className="group relative bg-gradient-to-br from-white/90 via-white/80 to-green-50/70 dark:from-gray-800/90 dark:via-gray-800/80 dark:to-green-900/30 backdrop-blur-2xl rounded-2xl sm:rounded-3xl lg:rounded-[2rem] p-5 sm:p-6 lg:p-8 border border-white/40 dark:border-gray-700/40 shadow-xl sm:shadow-2xl hover:shadow-3xl transform hover:scale-[1.02] hover:-translate-y-2 sm:hover:-translate-y-3 transition-all duration-500 sm:duration-700 overflow-hidden hover:border-green-400/50 dark:hover:border-green-500/50">
            <div className="absolute inset-0 bg-gradient-to-br from-green-500/5 via-emerald-500/8 to-teal-600/5 dark:from-green-400/8 dark:via-emerald-500/10 dark:to-teal-500/5"></div>
            <div className="absolute top-0 right-0 w-20 h-20 sm:w-24 sm:h-24 lg:w-32 lg:h-32 bg-gradient-to-br from-green-400/20 to-transparent rounded-full blur-2xl group-hover:scale-150 transition-transform duration-700"></div>
            <div className="relative flex items-center justify-between">
              <div className="min-w-0 flex-1">
                <div className="flex items-center gap-2 mb-2">
                  <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                  <p className="text-xs sm:text-sm font-bold text-green-600 dark:text-green-400 tracking-wider uppercase">Approved</p>
                </div>
                <p className="text-3xl sm:text-4xl lg:text-5xl font-black text-transparent bg-gradient-to-r from-green-600 via-green-700 to-emerald-700 dark:from-green-400 dark:via-green-300 dark:to-emerald-400 bg-clip-text mb-2 font-display group-hover:scale-105 transition-transform duration-300">{stats.approved}</p>
                <div className="flex items-center gap-2">
                  <div className="w-8 h-1 bg-gradient-to-r from-green-500 to-transparent rounded-full"></div>
                  <p className="text-xs sm:text-sm text-green-500 dark:text-green-400 font-semibold">{stats.approvalRate}% success rate</p>
                </div>
              </div>
              <div className="relative p-3 sm:p-4 lg:p-5 bg-gradient-to-br from-green-500 via-green-600 to-emerald-600 rounded-xl sm:rounded-2xl lg:rounded-3xl shadow-2xl group-hover:scale-110 group-hover:rotate-3 transition-all duration-500 flex-shrink-0">
                <div className="absolute inset-0 bg-gradient-to-br from-white/20 to-transparent rounded-xl sm:rounded-2xl lg:rounded-3xl"></div>
                <FiCheckCircle className="relative w-6 h-6 sm:w-7 sm:h-7 lg:w-8 lg:h-8 text-white group-hover:scale-110 transition-transform duration-300" />
              </div>
            </div>
          </div>

          {/* Rejected Applications - Enhanced */}
          <div className="group relative bg-gradient-to-br from-white/90 via-white/80 to-red-50/70 dark:from-gray-800/90 dark:via-gray-800/80 dark:to-red-900/30 backdrop-blur-2xl rounded-2xl sm:rounded-3xl lg:rounded-[2rem] p-5 sm:p-6 lg:p-8 border border-white/40 dark:border-gray-700/40 shadow-xl sm:shadow-2xl hover:shadow-3xl transform hover:scale-[1.02] hover:-translate-y-2 sm:hover:-translate-y-3 transition-all duration-500 sm:duration-700 overflow-hidden hover:border-red-400/50 dark:hover:border-red-500/50">
            <div className="absolute inset-0 bg-gradient-to-br from-red-500/5 via-pink-500/8 to-rose-600/5 dark:from-red-400/8 dark:via-pink-500/10 dark:to-rose-500/5"></div>
            <div className="absolute top-0 right-0 w-20 h-20 sm:w-24 sm:h-24 lg:w-32 lg:h-32 bg-gradient-to-br from-red-400/20 to-transparent rounded-full blur-2xl group-hover:scale-150 transition-transform duration-700"></div>
            <div className="relative flex items-center justify-between">
              <div className="min-w-0 flex-1">
                <div className="flex items-center gap-2 mb-2">
                  <div className="w-2 h-2 bg-red-500 rounded-full animate-ping"></div>
                  <p className="text-xs sm:text-sm font-bold text-red-600 dark:text-red-400 tracking-wider uppercase">Rejected</p>
                </div>
                <p className="text-3xl sm:text-4xl lg:text-5xl font-black text-transparent bg-gradient-to-r from-red-600 via-red-700 to-pink-700 dark:from-red-400 dark:via-red-300 dark:to-pink-400 bg-clip-text mb-2 font-display group-hover:scale-105 transition-transform duration-300">{stats.rejected}</p>
                <div className="flex items-center gap-2">
                  <div className="w-8 h-1 bg-gradient-to-r from-red-500 to-transparent rounded-full"></div>
                  <p className="text-xs sm:text-sm text-red-500 dark:text-red-400 font-semibold">Need revision</p>
                </div>
              </div>
              <div className="relative p-3 sm:p-4 lg:p-5 bg-gradient-to-br from-red-500 via-red-600 to-pink-600 rounded-xl sm:rounded-2xl lg:rounded-3xl shadow-2xl group-hover:scale-110 group-hover:rotate-3 transition-all duration-500 flex-shrink-0">
                <div className="absolute inset-0 bg-gradient-to-br from-white/20 to-transparent rounded-xl sm:rounded-2xl lg:rounded-3xl"></div>
                <FiXCircle className="relative w-6 h-6 sm:w-7 sm:h-7 lg:w-8 lg:h-8 text-white group-hover:scale-110 transition-transform duration-300" />
              </div>
            </div>
          </div>
        </div>

        {/* Additional Statistics Row - Responsive Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 lg:gap-6 mb-6 lg:mb-8">
          <div className="bg-white/70 dark:bg-gray-800/70 backdrop-blur-xl rounded-xl sm:rounded-2xl lg:rounded-3xl p-4 sm:p-5 lg:p-6 border border-white/30 dark:border-gray-700/40 shadow-lg">
            <div className="flex flex-col space-y-3 sm:space-y-4">
              <div className="group bg-gradient-to-br from-purple-50 to-violet-100 dark:from-purple-900/30 dark:to-violet-900/30 rounded-xl sm:rounded-2xl p-3 sm:p-4 lg:p-5 border border-purple-200/50 dark:border-purple-800/50 backdrop-blur-sm hover:shadow-lg transition-all duration-300">
                <div className="flex items-center gap-2 sm:gap-3">
                  <div className="p-2 bg-gradient-to-br from-purple-500 to-violet-600 rounded-lg sm:rounded-xl group-hover:scale-110 transition-transform duration-300 flex-shrink-0">
                    <FiTrendingUp className="w-4 h-4 sm:w-5 sm:h-5 text-white" />
                  </div>
                  <div className="min-w-0 flex-1">
                    <p className="text-xs sm:text-sm text-purple-600 dark:text-purple-400 font-semibold">This Month</p>
                    <p className="text-lg sm:text-xl lg:text-2xl font-bold text-purple-700 dark:text-purple-300">{Math.floor(orders.length * 0.3)}</p>
                  </div>
                </div>
              </div>
              
              <div className="group bg-gradient-to-br from-indigo-50 to-blue-100 dark:from-indigo-900/30 dark:to-blue-900/30 rounded-xl sm:rounded-2xl p-3 sm:p-4 lg:p-5 border border-indigo-200/50 dark:border-indigo-800/50 backdrop-blur-sm hover:shadow-lg transition-all duration-300">
                <div className="flex items-center gap-2 sm:gap-3">
                  <div className="p-2 bg-gradient-to-br from-indigo-500 to-blue-600 rounded-lg sm:rounded-xl group-hover:scale-110 transition-transform duration-300 flex-shrink-0">
                    <FiBarChart className="w-4 h-4 sm:w-5 sm:h-5 text-white" />
                  </div>
                  <div className="min-w-0 flex-1">
                    <p className="text-xs sm:text-sm text-indigo-600 dark:text-indigo-400 font-semibold">Filtered Results</p>
                    <p className="text-lg sm:text-xl lg:text-2xl font-bold text-indigo-700 dark:text-indigo-300">{stats.filtered}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Page Header - Responsive */}
        <div className="relative bg-white/70 dark:bg-gray-800/70 backdrop-blur-2xl rounded-xl sm:rounded-2xl lg:rounded-3xl shadow-lg sm:shadow-xl lg:shadow-2xl border border-white/30 dark:border-gray-700/40 p-4 sm:p-6 lg:p-8 overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-r from-blue-500/5 to-purple-600/5"></div>
          <div className="relative flex flex-col lg:flex-row items-start lg:items-center justify-between gap-4 sm:gap-6">
            <div className="flex-1 w-full">
              <div className="flex flex-col sm:flex-row sm:items-center gap-3 sm:gap-4 mb-3 sm:mb-4">
                <div className="p-2 sm:p-3 bg-gradient-to-br from-blue-500 via-purple-500 to-indigo-600 rounded-xl sm:rounded-2xl shadow-lg flex-shrink-0">
                  <HiAcademicCap className="w-6 h-6 sm:w-7 sm:h-7 lg:w-8 lg:h-8 text-white" />
                </div>
                <div className="min-w-0 flex-1">
                  <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-600 bg-clip-text text-transparent font-display leading-tight">
                    Applied Scholarships
                  </h1>
                  <div className="h-1 w-20 sm:w-24 lg:w-32 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full mt-2"></div>
                </div>
              </div>
              <p className="text-sm sm:text-base lg:text-lg text-gray-600 dark:text-gray-400 font-medium">
                Review and manage student scholarship applications with ease
              </p>
            </div>
            
            {/* Statistics Cards */}
            <div className="flex flex-col sm:flex-row gap-4">
              <div className="group bg-gradient-to-br from-purple-50 to-violet-100 dark:from-purple-900/30 dark:to-violet-900/30 rounded-2xl p-5 border border-purple-200/50 dark:border-purple-800/50 backdrop-blur-sm hover:shadow-lg transition-all duration-300">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-gradient-to-br from-purple-500 to-violet-600 rounded-xl group-hover:scale-110 transition-transform duration-300">
                    <FiTrendingUp className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <p className="text-sm text-purple-600 dark:text-purple-400 font-semibold">This Month</p>
                    <p className="text-2xl font-bold text-purple-700 dark:text-purple-300">{Math.floor(orders.length * 0.3)}</p>
                  </div>
                </div>
              </div>
              
              <div className="group bg-gradient-to-br from-indigo-50 to-blue-100 dark:from-indigo-900/30 dark:to-blue-900/30 rounded-2xl p-5 border border-indigo-200/50 dark:border-indigo-800/50 backdrop-blur-sm hover:shadow-lg transition-all duration-300">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-gradient-to-br from-indigo-500 to-blue-600 rounded-xl group-hover:scale-110 transition-transform duration-300">
                    <FiBarChart className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <p className="text-sm text-indigo-600 dark:text-indigo-400 font-semibold">Filtered Results</p>
                    <p className="text-2xl font-bold text-indigo-700 dark:text-indigo-300">{stats.filtered}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Bulk Actions Bar - Responsive */}
        {selectedItems.length > 0 && (
          <div className="relative bg-gradient-to-r from-blue-50/80 via-indigo-50/80 to-purple-50/80 dark:from-blue-900/20 dark:via-indigo-900/20 dark:to-purple-900/20 backdrop-blur-xl border border-blue-200/60 dark:border-blue-800/60 rounded-xl sm:rounded-2xl lg:rounded-3xl p-4 sm:p-5 lg:p-6 mb-6 lg:mb-8 shadow-xl sm:shadow-2xl">
            <div className="relative flex flex-col lg:flex-row items-start lg:items-center justify-between gap-4">
              <div className="flex flex-col sm:flex-row sm:items-center gap-3 sm:gap-6 w-full lg:w-auto">
                <div className="flex items-center gap-3">
                  <div className="w-3 h-3 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full animate-pulse"></div>
                  <div className="text-sm sm:text-base font-bold text-blue-700 dark:text-blue-300">
                    {selectedItems.length} application{selectedItems.length > 1 ? 's' : ''} selected
                  </div>
                </div>
                <button
                  onClick={() => setSelectedItems([])}
                  className="text-xs sm:text-sm text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-200 transition-colors duration-200 font-medium underline decoration-2 underline-offset-2 w-fit"
                >
                  Clear selection
                </button>
              </div>
              
              <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2 sm:gap-3 w-full lg:w-auto">
                <button className="group flex items-center justify-center gap-2 sm:gap-3 px-4 sm:px-5 lg:px-6 py-2 sm:py-3 bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 text-white rounded-lg sm:rounded-xl lg:rounded-2xl shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300 text-sm sm:text-base">
                  <FiCheckCircle className="w-4 h-4 sm:w-5 sm:h-5 group-hover:rotate-12 transition-transform duration-300" />
                  <span className="font-semibold">Bulk Approve</span>
                </button>
                <button className="group flex items-center justify-center gap-2 sm:gap-3 px-4 sm:px-5 lg:px-6 py-2 sm:py-3 bg-gradient-to-r from-red-500 to-pink-600 hover:from-red-600 hover:to-pink-700 text-white rounded-lg sm:rounded-xl lg:rounded-2xl shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300 text-sm sm:text-base">
                  <FiXCircle className="w-4 h-4 sm:w-5 sm:h-5 group-hover:rotate-12 transition-transform duration-300" />
                  <span className="font-semibold">Bulk Reject</span>
                </button>
                <button
                  onClick={exportToCSV}
                  className="group flex items-center justify-center gap-2 sm:gap-3 px-4 sm:px-5 lg:px-6 py-2 sm:py-3 bg-gradient-to-r from-purple-500 to-indigo-600 hover:from-purple-600 hover:to-indigo-700 text-white rounded-lg sm:rounded-xl lg:rounded-2xl shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300 text-sm sm:text-base"
                >
                  <FiDownload className="w-4 h-4 sm:w-5 sm:h-5 group-hover:translate-y-1 transition-transform duration-300" />
                  <span className="font-semibold">Export Selected</span>
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Search and Filter Controls - Responsive */}
        <div className="relative bg-white/70 dark:bg-gray-800/70 backdrop-blur-2xl rounded-xl sm:rounded-2xl lg:rounded-3xl shadow-lg sm:shadow-xl lg:shadow-2xl border border-white/30 dark:border-gray-700/40 p-4 sm:p-6 lg:p-8 overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-gray-50/50 to-blue-50/50 dark:from-gray-900/50 dark:to-blue-900/50"></div>
          
          {/* Mobile Filter Toggle */}
          <div className="lg:hidden mb-4 sm:mb-6 relative">
            <button
              onClick={() => setShowBulkActions(!showBulkActions)}
              className="group flex items-center gap-2 sm:gap-3 px-4 sm:px-6 py-3 sm:py-4 bg-gradient-to-r from-gray-100 to-gray-200 dark:from-gray-700 dark:to-gray-800 text-gray-700 dark:text-gray-300 rounded-xl sm:rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105 w-full sm:w-auto"
            >
              <FiFilter className="w-4 h-4 sm:w-5 sm:h-5 group-hover:rotate-12 transition-transform duration-300" />
              <span className="font-semibold text-sm sm:text-base">Filters & Options</span>
            </button>
          </div>

          <div className={`relative ${showBulkActions ? 'block' : 'hidden lg:block'} space-y-4 lg:space-y-6`}>
            <div className="flex flex-col lg:flex-row gap-4 lg:gap-6 items-stretch lg:items-center justify-between">
              {/* Search Bar */}
              <div className="relative flex-1 w-full lg:max-w-md group">
                <FiSearch className="absolute left-3 sm:left-4 top-1/2 transform -translate-y-1/2 text-gray-400 dark:text-gray-500 group-focus-within:text-blue-500 transition-colors duration-300 w-4 h-4 sm:w-5 sm:h-5" />
                <input
                  type="text"
                  placeholder="Search by university, category, or subject..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 sm:pl-12 pr-4 sm:pr-6 py-3 sm:py-4 border-2 border-gray-200/60 dark:border-gray-600/60 rounded-xl sm:rounded-2xl focus:ring-4 focus:ring-blue-500/20 focus:border-blue-500 dark:focus:border-blue-400 transition-all duration-300 bg-white/70 dark:bg-gray-700/70 backdrop-blur-sm text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 shadow-lg hover:shadow-xl text-sm sm:text-base"
                />
              </div>

              {/* Filter Controls */}
              <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 sm:gap-4 w-full lg:w-auto">
                <select
                  value={dateRange}
                  onChange={(e) => setDateRange(e.target.value)}
                  className="px-3 sm:px-4 py-3 sm:py-4 border-2 border-gray-200/60 dark:border-gray-600/60 rounded-xl sm:rounded-2xl focus:ring-4 focus:ring-blue-500/20 focus:border-blue-500 dark:focus:border-blue-400 transition-all duration-300 bg-white/70 dark:bg-gray-700/70 backdrop-blur-sm text-gray-900 dark:text-white shadow-lg hover:shadow-xl text-sm sm:text-base"
                >
                  <option value="">All dates</option>
                  <option value="today">Today</option>
                  <option value="week">This week</option>
                  <option value="month">This month</option>
                  <option value="year">This year</option>
                </select>

                <select
                  value={filterStatus}
                  onChange={(e) => setFilterStatus(e.target.value)}
                  className="px-3 sm:px-4 py-3 sm:py-4 border-2 border-gray-200/60 dark:border-gray-600/60 rounded-xl sm:rounded-2xl focus:ring-4 focus:ring-blue-500/20 focus:border-blue-500 dark:focus:border-blue-400 transition-all duration-300 bg-white/70 dark:bg-gray-700/70 backdrop-blur-sm text-gray-900 dark:text-white shadow-lg hover:shadow-xl text-sm sm:text-base"
                >
                  <option value="">All statuses</option>
                  <option value="pending">Pending</option>
                  <option value="approved">Approved</option>
                  <option value="rejected">Rejected</option>
                </select>

                {/* View Toggle */}
                <div className="flex items-center gap-1 sm:gap-2 bg-white/70 dark:bg-gray-700/70 backdrop-blur-sm rounded-xl sm:rounded-2xl shadow-lg border border-gray-200/60 dark:border-gray-600/60 p-1">
                  <button
                    onClick={() => setViewMode('table')}
                    className={`group p-2 sm:p-3 rounded-lg sm:rounded-xl transition-all duration-300 ${
                      viewMode === 'table'
                        ? 'bg-gradient-to-r from-blue-500 to-blue-600 shadow-lg text-white scale-110'
                        : 'text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300 hover:scale-105'
                    }`}
                    title="Table view"
                  >
                    <FiList className="w-4 h-4 sm:w-5 sm:h-5 group-hover:scale-110 transition-transform duration-300" />
                  </button>
                  <button
                    onClick={() => setViewMode('grid')}
                    className={`group p-2 sm:p-3 rounded-lg sm:rounded-xl transition-all duration-300 ${
                      viewMode === 'grid'
                        ? 'bg-gradient-to-r from-blue-500 to-blue-600 shadow-lg text-white scale-110'
                        : 'text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300 hover:scale-105'
                    }`}
                    title="Grid view"
                  >
                    <BsGrid3X3Gap className="w-4 h-4 sm:w-5 sm:h-5 group-hover:scale-110 transition-transform duration-300" />
                  </button>
                </div>

                {/* Action Buttons */}
                <div className="flex items-center gap-2 sm:gap-3">
                  <button
                    onClick={() => refetch()}
                    className="group p-3 sm:p-4 bg-white/70 dark:bg-gray-700/70 backdrop-blur-sm text-gray-600 dark:text-gray-300 rounded-xl sm:rounded-2xl shadow-lg hover:shadow-xl border border-gray-200/60 dark:border-gray-600/60 hover:bg-gray-200/70 dark:hover:bg-gray-600/70 transition-all duration-300 transform hover:scale-105"
                    title="Refresh data"
                  >
                    <FiRefreshCw className="w-5 h-5 sm:w-6 sm:h-6 group-hover:rotate-180 transition-transform duration-500" />
                  </button>

                  <button 
                    onClick={exportToCSV}
                    className="group flex items-center gap-2 sm:gap-3 px-4 sm:px-6 py-3 sm:py-4 bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 text-white rounded-xl sm:rounded-2xl shadow-lg hover:shadow-2xl transform hover:scale-105 transition-all duration-300 text-sm sm:text-base"
                  >
                    <FiDownload className="w-4 h-4 sm:w-5 sm:h-5 group-hover:translate-y-1 transition-transform duration-300" />
                    <span className="hidden sm:inline font-semibold">Export CSV</span>
                    <span className="sm:hidden font-semibold">Export</span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Main Content Area - Responsive */}
        <div className="relative bg-white/70 dark:bg-gray-800/70 backdrop-blur-2xl rounded-xl sm:rounded-2xl lg:rounded-3xl shadow-lg sm:shadow-xl lg:shadow-2xl border border-white/30 dark:border-gray-700/40 overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-white/50 to-gray-50/50 dark:from-gray-900/50 dark:to-gray-800/50"></div>
          
          {paginatedOrders.length === 0 ? (
            <div className="relative text-center py-12 sm:py-16 lg:py-20">
              <div className="w-24 h-24 sm:w-28 sm:h-28 lg:w-32 lg:h-32 bg-gradient-to-br from-gray-100 to-gray-200 dark:from-gray-700 dark:to-gray-800 rounded-full flex items-center justify-center mx-auto mb-6 sm:mb-8 shadow-xl sm:shadow-2xl">
                <HiAcademicCap className="text-4xl sm:text-5xl lg:text-6xl text-gray-400 dark:text-gray-500" />
              </div>
              <h3 className="text-xl sm:text-2xl font-bold text-gray-900 dark:text-white mb-2 sm:mb-3">
                No applications found
              </h3>
              <p className="text-gray-600 dark:text-gray-400 mb-6 sm:mb-8 text-base sm:text-lg px-4">
                {searchTerm || filterStatus ? 'Try adjusting your search criteria.' : 'No scholarship applications have been submitted yet.'}
              </p>
              {(searchTerm || filterStatus) && (
                <button
                  onClick={() => {
                    setSearchTerm('');
                    setFilterStatus('');
                  }}
                  className="bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white px-6 sm:px-8 py-3 sm:py-4 rounded-xl sm:rounded-2xl transition-all duration-300 font-semibold shadow-lg hover:shadow-xl transform hover:scale-105 text-sm sm:text-base"
                >
                  Clear Filters
                </button>
              )}
            </div>
          ) : (
            <>
              {viewMode === 'table' ? (
                <>
                  {/* Desktop Table View - Enhanced */}
                  <div className="hidden lg:block bg-white/70 dark:bg-gray-800/70 backdrop-blur-2xl rounded-3xl p-2 sm:p-4 border border-white/40 dark:border-gray-700/40 shadow-2xl overflow-hidden">
                    <div className="overflow-x-auto relative rounded-2xl">
                      <table className="min-w-full divide-y divide-gray-200/50 dark:divide-gray-700/50">
                      <thead className="bg-gradient-to-r from-gray-50/80 via-white/60 to-gray-50/80 dark:from-gray-800/80 dark:via-gray-800/60 dark:to-gray-800/80 backdrop-blur-xl border-b border-gray-200/50 dark:border-gray-700/50">
                        <tr>
                          <th className="px-6 py-4 text-left text-xs font-bold text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                            <input
                              type="checkbox"
                              checked={selectedItems.length === paginatedOrders.length && paginatedOrders.length > 0}
                              onChange={handleSelectAll}
                              className="rounded border-gray-300 dark:border-gray-600 text-blue-600 focus:ring-blue-500"
                            />
                          </th>
                          <th 
                            className="px-6 py-4 text-left text-xs font-bold text-gray-500 dark:text-gray-400 uppercase tracking-wider cursor-pointer hover:text-gray-700 dark:hover:text-gray-200 transition-colors"
                            onClick={() => handleSort('university')}
                          >
                            University
                            {sortBy === 'university' && (
                              <span className="ml-1">{sortDirection === 'asc' ? '↑' : '↓'}</span>
                            )}
                          </th>
                          <th 
                            className="px-6 py-4 text-left text-xs font-bold text-gray-500 dark:text-gray-400 uppercase tracking-wider cursor-pointer hover:text-gray-700 dark:hover:text-gray-200 transition-colors"
                            onClick={() => handleSort('category')}
                          >
                            Category
                            {sortBy === 'category' && (
                              <span className="ml-1">{sortDirection === 'asc' ? '↑' : '↓'}</span>
                            )}
                          </th>
                          <th className="px-6 py-4 text-left text-xs font-bold text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                            Subject
                          </th>
                          <th 
                            className="px-6 py-4 text-left text-xs font-bold text-gray-500 dark:text-gray-400 uppercase tracking-wider cursor-pointer hover:text-gray-700 dark:hover:text-gray-200 transition-colors"
                            onClick={() => handleSort('status')}
                          >
                            Status
                            {sortBy === 'status' && (
                              <span className="ml-1">{sortDirection === 'asc' ? '↑' : '↓'}</span>
                            )}
                          </th>
                          <th 
                            className="px-6 py-4 text-left text-xs font-bold text-gray-500 dark:text-gray-400 uppercase tracking-wider cursor-pointer hover:text-gray-700 dark:hover:text-gray-200 transition-colors"
                            onClick={() => handleSort('date')}
                          >
                            Applied Date
                            {sortBy === 'date' && (
                              <span className="ml-1">{sortDirection === 'asc' ? '↑' : '↓'}</span>
                            )}
                          </th>
                          <th className="px-6 py-4 text-right text-xs font-bold text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                            Actions
                          </th>
                        </tr>
                      </thead>
                      <tbody className="bg-white/50 dark:bg-gray-800/50 divide-y divide-gray-200/30 dark:divide-gray-700/30">
                        {paginatedOrders.map((order) => (
                          <tr key={order._id} className="hover:bg-gray-50/70 dark:hover:bg-gray-700/70 transition-colors duration-200">
                            <td className="px-6 py-4 whitespace-nowrap">
                              <input
                                type="checkbox"
                                checked={selectedItems.includes(order._id)}
                                onChange={() => handleSelectItem(order._id)}
                                className="rounded border-gray-300 dark:border-gray-600 text-blue-600 focus:ring-blue-500"
                              />
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap">
                              <div className="text-sm font-semibold text-gray-900 dark:text-white">
                                {order.universityName}
                              </div>
                              <div className="text-sm text-gray-500 dark:text-gray-400">
                                {order.applicantName}
                              </div>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap">
                              <div className="text-sm font-medium text-gray-900 dark:text-white">
                                {order.scholarshipCategory}
                              </div>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap">
                              <div className="text-sm text-gray-900 dark:text-white">
                                {order.subjectCategory}
                              </div>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap">
                              <StatusBadge status={order.status} />
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">
                              {order.appliedDate ? new Date(order.appliedDate).toLocaleDateString() : 'N/A'}
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                              <div className="flex items-center justify-end gap-2">
                                <button
                                  className="text-blue-600 hover:text-blue-900 dark:text-blue-400 dark:hover:text-blue-300 transition-colors p-2 hover:bg-blue-50 dark:hover:bg-blue-900/20 rounded-lg"
                                  title="View details"
                                >
                                  <FiEye className="w-4 h-4" />
                                </button>
                                <button
                                  className="text-green-600 hover:text-green-900 dark:text-green-400 dark:hover:text-green-300 transition-colors p-2 hover:bg-green-50 dark:hover:bg-green-900/20 rounded-lg"
                                  title="Approve"
                                >
                                  <FiCheckCircle className="w-4 h-4" />
                                </button>
                                <button
                                  className="text-red-600 hover:text-red-900 dark:text-red-400 dark:hover:text-red-300 transition-colors p-2 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg"
                                  title="Reject"
                                >
                                  <FiXCircle className="w-4 h-4" />
                                </button>
                              </div>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                    </div>
                  </div>
                  
                  {/* Mobile Card View - Enhanced Responsive */}
                  <div className="lg:hidden bg-white/50 dark:bg-gray-800/50 backdrop-blur-2xl rounded-3xl p-4 sm:p-6 border border-white/40 dark:border-gray-700/40 shadow-2xl space-y-4 sm:space-y-6">
                    {paginatedOrders.map((order) => (
                      <div key={order._id} className="bg-gradient-to-r from-gray-50 to-white dark:from-gray-800 dark:to-gray-700 rounded-lg sm:rounded-xl border border-gray-200 dark:border-gray-600 p-3 sm:p-4 shadow-sm hover:shadow-md transition-all duration-300">
                        <div className="flex items-start justify-between mb-3">
                          <div className="flex items-center gap-2 sm:gap-3 min-w-0 flex-1">
                            <input
                              type="checkbox"
                              checked={selectedItems.includes(order._id)}
                              onChange={() => handleSelectItem(order._id)}
                              className="rounded border-gray-300 dark:border-gray-600 text-blue-600 focus:ring-blue-500 flex-shrink-0"
                            />
                            <div className="min-w-0 flex-1">
                              <h3 className="text-base sm:text-lg font-semibold text-gray-900 dark:text-white truncate">
                                {order.universityName}
                              </h3>
                              <p className="text-sm text-gray-600 dark:text-gray-400 truncate">
                                {order.applicantName}
                              </p>
                            </div>
                          </div>
                          <div className="flex-shrink-0">
                            <StatusBadge status={order.status} />
                          </div>
                        </div>
                        
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4 mb-3 sm:mb-4 text-sm">
                          <div>
                            <span className="text-gray-500 dark:text-gray-400 text-xs sm:text-sm">Category:</span>
                            <div className="font-medium text-gray-900 dark:text-white text-sm">
                              {order.scholarshipCategory}
                            </div>
                          </div>
                          <div>
                            <span className="text-gray-500 dark:text-gray-400 text-xs sm:text-sm">Subject:</span>
                            <div className="font-medium text-gray-900 dark:text-white text-sm">
                              {order.subjectCategory}
                            </div>
                          </div>
                        </div>
                        
                        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 sm:gap-0">
                          <div className="text-xs sm:text-sm text-gray-500 dark:text-gray-400">
                            Applied: {order.appliedDate ? new Date(order.appliedDate).toLocaleDateString() : 'N/A'}
                          </div>
                          <div className="flex items-center gap-1 sm:gap-2">
                            <button className="text-blue-600 hover:text-blue-900 dark:text-blue-400 dark:hover:text-blue-300 p-1.5 sm:p-2 hover:bg-blue-50 dark:hover:bg-blue-900/20 rounded-lg transition-colors">
                              <FiEye className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                            </button>
                            <button className="text-green-600 hover:text-green-900 dark:text-green-400 dark:hover:text-green-300 p-1.5 sm:p-2 hover:bg-green-50 dark:hover:bg-green-900/20 rounded-lg transition-colors">
                              <FiCheckCircle className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                            </button>
                            <button className="text-red-600 hover:text-red-900 dark:text-red-400 dark:hover:text-red-300 p-1.5 sm:p-2 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg transition-colors">
                              <FiXCircle className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                            </button>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </>
              ) : (
                /* Grid View - Enhanced Responsive */
                <div className="p-3 sm:p-4 lg:p-6">
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 gap-3 sm:gap-4 lg:gap-6">
                    {paginatedOrders.map((order) => (
                      <div key={order._id} className="bg-gradient-to-br from-white to-gray-50 dark:from-gray-800 dark:to-gray-900 rounded-lg sm:rounded-xl border border-gray-200 dark:border-gray-700 p-4 sm:p-5 lg:p-6 hover:shadow-lg transition-all duration-300 transform hover:scale-105">
                        <div className="flex items-start justify-between mb-3 sm:mb-4">
                          <input
                            type="checkbox"
                            checked={selectedItems.includes(order._id)}
                            onChange={() => handleSelectItem(order._id)}
                            className="rounded border-gray-300 dark:border-gray-600 text-blue-600 focus:ring-blue-500 flex-shrink-0"
                          />
                          <div className="flex-shrink-0">
                            <StatusBadge status={order.status} />
                          </div>
                        </div>
                        
                        <h3 className="text-lg sm:text-xl font-bold text-gray-900 dark:text-white mb-2 truncate" title={order.universityName}>
                          {order.universityName}
                        </h3>
                        
                        <div className="space-y-2 mb-3 sm:mb-4">
                          <div className="text-sm">
                            <span className="text-gray-500 dark:text-gray-400">Applicant:</span>
                            <span className="ml-2 font-medium text-gray-900 dark:text-white block sm:inline truncate" title={order.applicantName}>
                              {order.applicantName}
                            </span>
                          </div>
                          <div className="text-sm">
                            <span className="text-gray-500 dark:text-gray-400">Category:</span>
                            <span className="ml-2 font-medium text-gray-900 dark:text-white block sm:inline truncate" title={order.scholarshipCategory}>
                              {order.scholarshipCategory}
                            </span>
                          </div>
                          <div className="text-sm">
                            <span className="text-gray-500 dark:text-gray-400">Subject:</span>
                            <span className="ml-2 font-medium text-gray-900 dark:text-white block sm:inline truncate" title={order.subjectCategory}>
                              {order.subjectCategory}
                            </span>
                          </div>
                          <div className="text-sm">
                            <span className="text-gray-500 dark:text-gray-400">Applied:</span>
                            <span className="ml-2 font-medium text-gray-900 dark:text-white block sm:inline">
                              {order.appliedDate ? new Date(order.appliedDate).toLocaleDateString() : 'N/A'}
                            </span>
                          </div>
                        </div>
                        
                        <div className="flex items-center justify-between pt-3 sm:pt-4 border-t border-gray-200 dark:border-gray-700">
                          <button className="flex items-center gap-2 text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300 transition-colors">
                            <FiEye className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                            <span className="text-xs sm:text-sm font-medium">View</span>
                          </button>
                          <div className="flex items-center gap-1 sm:gap-2">
                            <button className="p-1.5 sm:p-2 text-green-600 hover:text-green-800 dark:text-green-400 dark:hover:text-green-300 hover:bg-green-50 dark:hover:bg-green-900/20 rounded-lg transition-colors" title="Approve">
                              <FiCheckCircle className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                            </button>
                            <button className="p-1.5 sm:p-2 text-red-600 hover:text-red-800 dark:text-red-400 dark:hover:text-red-300 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg transition-colors" title="Reject">
                              <FiXCircle className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                            </button>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </>
          )}
        </div>

        {/* Pagination Controls - Enhanced Responsive */}
        {totalPages > 1 && (
          <div className="bg-white/70 dark:bg-gray-800/70 backdrop-blur-xl rounded-xl sm:rounded-2xl shadow-lg border border-white/30 dark:border-gray-700/40 p-4 sm:p-5 lg:p-6">
            <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-4">
              {/* Pagination Info */}
              <div className="flex flex-col sm:flex-row sm:items-center gap-3 sm:gap-4 w-full lg:w-auto">
                <div className="text-xs sm:text-sm text-gray-600 dark:text-gray-400">
                  Showing <span className="font-medium text-gray-900 dark:text-white">{stats.showing}</span> of{' '}
                  <span className="font-medium text-gray-900 dark:text-white">{stats.filtered}</span> results
                </div>
                
                {/* Items per page selector */}
                <div className="flex items-center gap-2">
                  <label className="text-xs sm:text-sm text-gray-600 dark:text-gray-400 whitespace-nowrap">Show:</label>
                  <select
                    value={itemsPerPage}
                    onChange={(e) => {
                      setItemsPerPage(Number(e.target.value));
                      setCurrentPage(1);
                    }}
                    className="px-2 sm:px-3 py-1 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white text-xs sm:text-sm"
                  >
                    <option value={5}>5</option>
                    <option value={10}>10</option>
                    <option value={25}>25</option>
                    <option value={50}>50</option>
                    <option value={100}>100</option>
                  </select>
                </div>
              </div>

              {/* Pagination Navigation */}
              <div className="flex items-center gap-1 sm:gap-2 w-full lg:w-auto justify-center lg:justify-end">
                {/* Previous Page */}
                <button
                  onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                  disabled={currentPage === 1}
                  className="p-2 rounded-lg border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors duration-200"
                  title="Previous page"
                >
                  <FiChevronLeft className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                </button>

                {/* Page Numbers - Responsive */}
                <div className="flex items-center gap-1">
                  {Array.from({ length: Math.min(totalPages, window.innerWidth < 640 ? 3 : 5) }, (_, i) => {
                    let pageNumber;
                    const maxPages = window.innerWidth < 640 ? 3 : 5;
                    
                    if (totalPages <= maxPages) {
                      pageNumber = i + 1;
                    } else if (currentPage <= Math.ceil(maxPages / 2)) {
                      pageNumber = i + 1;
                    } else if (currentPage >= totalPages - Math.floor(maxPages / 2)) {
                      pageNumber = totalPages - maxPages + 1 + i;
                    } else {
                      pageNumber = currentPage - Math.floor(maxPages / 2) + i;
                    }

                    return (
                      <button
                        key={pageNumber}
                        onClick={() => setCurrentPage(pageNumber)}
                        className={`px-2 sm:px-3 py-1.5 sm:py-2 rounded-lg text-xs sm:text-sm font-medium transition-colors duration-200 ${
                          currentPage === pageNumber
                            ? 'bg-blue-500 text-white shadow-md'
                            : 'border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700'
                        }`}
                      >
                        {pageNumber}
                      </button>
                    );
                  })}
                </div>

                {/* Next Page */}
                <button
                  onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
                  disabled={currentPage === totalPages}
                  className="p-2 rounded-lg border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors duration-200"
                  title="Next page"
                >
                  <FiChevronRight className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default AllAppliedScholarship;