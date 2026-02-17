/* eslint-disable no-unused-vars */
import { Helmet } from "react-helmet-async";
import { useState, useEffect } from "react";
import { FaEdit, FaTrash, FaSearch, FaSort, FaFilter, FaEye, FaChevronLeft, FaChevronRight, FaChevronUp, FaChevronDown } from "react-icons/fa";
import { FiRefreshCw, FiDownload, FiSettings } from "react-icons/fi";
import { HiAcademicCap, HiCurrencyDollar, HiCalendar } from "react-icons/hi";
import { BiWorld } from "react-icons/bi";
import Swal from "sweetalert2";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import { useQuery } from "@tanstack/react-query";
import LoadingSpinner from "../../../components/Shared/LoadingSpinner";
import Modal from "react-modal";
import toast from "react-hot-toast";

const ManageScholarship = () => {
  const axiosSecure = useAxiosSecure();
  const [editScholarship, setEditScholarship] = useState(null);
  const [sortOption, setSortOption] = useState("createdAt");
  const [sortDirection, setSortDirection] = useState("desc");
  const [filterOption, setFilterOption] = useState("all");
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(10);
  const [isExporting, setIsExporting] = useState(false);

  const { data: scholarships = [], isLoading, refetch, error } = useQuery({
    queryKey: ["scholarships"],
    queryFn: async () => {
      try {
        const { data } = await axiosSecure.get("/scholarship");
        return data;
      } catch (error) {
        throw new Error(error.response?.data?.message || "Failed to fetch scholarships");
      }
    },
    retry: 1,
    staleTime: 3 * 60 * 1000,
    refetchOnWindowFocus: false
  });

  useEffect(() => {
    if (error) {
      toast.error(error.message);
    }
  }, [error]);

  const sortScholarships = (scholarships) => {
    return [...scholarships].sort((a, b) => {
      let aValue, bValue;
      
      switch (sortOption) {
        case "createdAt":
          aValue = new Date(a.createdAt || a.scholarshipPostDate);
          bValue = new Date(b.createdAt || b.scholarshipPostDate);
          break;
        case "deadline":
          aValue = new Date(a.applicationDeadline);
          bValue = new Date(b.applicationDeadline);
          break;
        case "fees":
          aValue = a.applicationFees || 0;
          bValue = b.applicationFees || 0;
          break;
        case "name":
          aValue = a.scholarshipName?.toLowerCase() || "";
          bValue = b.scholarshipName?.toLowerCase() || "";
          break;
        case "university":
          aValue = a.universityName?.toLowerCase() || "";
          bValue = b.universityName?.toLowerCase() || "";
          break;
        default:
          return 0;
      }
      
      if (aValue < bValue) return sortDirection === "asc" ? -1 : 1;
      if (aValue > bValue) return sortDirection === "asc" ? 1 : -1;
      return 0;
    });
  };

  const filteredScholarships = scholarships.filter((scholarship) => {
    const matchesSearch = !searchTerm || 
      scholarship.scholarshipName?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      scholarship.universityName?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      scholarship.subjectCategory?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      scholarship.universityCountry?.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesFilter = filterOption === "all" || 
      scholarship.subjectCategory === filterOption ||
      scholarship.scholarshipCategory === filterOption;
    
    return matchesSearch && matchesFilter;
  });

  // Pagination
  const totalPages = Math.ceil(filteredScholarships.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginatedScholarships = sortScholarships(filteredScholarships).slice(startIndex, startIndex + itemsPerPage);

  const handleSort = (option) => {
    if (sortOption === option) {
      setSortDirection(sortDirection === "asc" ? "desc" : "asc");
    } else {
      setSortOption(option);
      setSortDirection("asc");
    }
  };

  const handleDelete = (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this scholarship deletion!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#ef4444",
      cancelButtonColor: "#6b7280",
      confirmButtonText: "Yes, delete it!",
      cancelButtonText: "Cancel",
      background: '#1f2937',
      color: '#fff',
      customClass: {
        popup: 'rounded-2xl',
        confirmButton: 'rounded-lg px-6 py-3',
        cancelButton: 'rounded-lg px-6 py-3'
      }
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          const loadingToast = toast.loading("Deleting scholarship...");
          
          const response = await axiosSecure.delete(`/scholarship/${id}`);
          
          toast.dismiss(loadingToast);
          
          if (response.data.success || response.status === 200) {
            refetch();
            toast.success("Scholarship deleted successfully!");
            
            Swal.fire({
              title: "Deleted!",
              text: "The scholarship has been permanently deleted.",
              icon: "success",
              background: '#1f2937',
              color: '#fff',
              confirmButtonColor: '#10b981',
              timer: 2000,
              timerProgressBar: true
            });
          } else {
            throw new Error(response.data.message || "Failed to delete");
          }
        } catch (error) {
          console.error("Delete error:", error);
          toast.error("Failed to delete scholarship");
          
          Swal.fire({
            title: "Error!",
            text: error.message || "Failed to delete the scholarship.",
            icon: "error",
            background: '#1f2937',
            color: '#fff',
            confirmButtonColor: '#ef4444'
          });
        }
      }
    });
  };

  const handleUpdateData = async (updatedData) => {
    try {
      const loadingToast = toast.loading("Updating scholarship...");
      
      await axiosSecure.put(`/scholarship/${editScholarship._id}`, updatedData);
      
      toast.dismiss(loadingToast);
      toast.success("Scholarship updated successfully!");
      
      Swal.fire({
        title: "Success!",
        text: "Scholarship has been updated successfully.",
        icon: "success",
        background: '#1f2937',
        color: '#fff',
        confirmButtonColor: '#10b981',
        timer: 2000,
        timerProgressBar: true
      });
      
      setEditScholarship(null);
      refetch();
    } catch (err) {
      console.error("Update error:", err);
      toast.error("Failed to update scholarship");
      
      Swal.fire({
        title: "Error!",
        text: `Failed to update scholarship: ${err.response?.data?.message || err.message}`,
        icon: "error",
        background: '#1f2937',
        color: '#fff',
        confirmButtonColor: '#ef4444'
      });
    }
  };

  const showScholarshipDetails = (scholarship) => {
    const formatDate = (dateString) => {
      if (!dateString) return 'N/A';
      return new Date(dateString).toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
      });
    };

    Swal.fire({
      title: `<div class="flex items-center gap-3">
        <div class="p-2 bg-blue-500 rounded-lg">
          <svg class="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 20 20">
            <path d="M10.394 2.08a1 1 0 00-.788 0l-7 3a1 1 0 000 1.84L5.25 8.051a.999.999 0 01.356-.257l4-1.714a1 1 0 11.788 1.838L7.667 9.088l1.94.831a1 1 0 00.787 0l7-3a1 1 0 000-1.838l-7-3zM3.31 9.397L5 10.12v4.102a8.969 8.969 0 00-1.05-.174 1 1 0 01-.89-.89 11.115 11.115 0 01.25-3.762zM9.3 16.573A9.026 9.026 0 007 14.935v-3.957l1.818.78a3 3 0 002.364 0l5.508-2.361a11.026 11.026 0 01.25 3.762 1 1 0 01-.89.89 8.968 8.968 0 00-5.35 2.524 1 1 0 01-1.4 0zM6 18a1 1 0 001-1v-2.065a8.935 8.935 0 00-2-.712V17a1 1 0 001 1z"/>
          </svg>
        </div>
        <span>${scholarship.scholarshipName}</span>
      </div>`,
      html: `
        <div class="text-left space-y-4 max-w-lg mx-auto">
          <div class="bg-gray-50 dark:bg-gray-700 rounded-xl p-4 space-y-3">
            <div class="flex items-center gap-3">
              <div class="w-8 h-8 bg-blue-100 dark:bg-blue-900/30 rounded-lg flex items-center justify-center">
                <svg class="w-4 h-4 text-blue-600 dark:text-blue-400" fill="currentColor" viewBox="0 0 20 20">
                  <path fill-rule="evenodd" d="M6 6V5a3 3 0 013-3h2a3 3 0 013 3v1h2a2 2 0 012 2v3.57A22.952 22.952 0 0110 13a22.95 22.95 0 01-8-1.43V8a2 2 0 012-2h2zm2-1a1 1 0 011-1h2a1 1 0 011 1v1H8V5zm1 5a1 1 0 011-1h.01a1 1 0 110 2H10a1 1 0 01-1-1z" clip-rule="evenodd"/>
                  <path d="M2 13.692V16a2 2 0 002 2h12a2 2 0 002-2v-2.308A24.974 24.974 0 0110 15c-2.796 0-5.487-.46-8-1.308z"/>
                </svg>
              </div>
              <div>
                <p class="font-semibold text-gray-900 dark:text-white">University Information</p>
              </div>
            </div>
            <div class="grid grid-cols-1 gap-2 text-sm">
              <div><span class="font-medium text-gray-700 dark:text-gray-300">University:</span> <span class="text-gray-900 dark:text-white">${scholarship.universityName}</span></div>
              <div><span class="font-medium text-gray-700 dark:text-gray-300">Country:</span> <span class="text-gray-900 dark:text-white">${scholarship.universityCountry || 'N/A'}</span></div>
              <div><span class="font-medium text-gray-700 dark:text-gray-300">City:</span> <span class="text-gray-900 dark:text-white">${scholarship.universityCity || 'N/A'}</span></div>
              <div><span class="font-medium text-gray-700 dark:text-gray-300">Rank:</span> <span class="text-gray-900 dark:text-white">#${scholarship.universityRank || 'N/A'}</span></div>
            </div>
          </div>
          
          <div class="bg-green-50 dark:bg-green-900/20 rounded-xl p-4 space-y-3">
            <div class="flex items-center gap-3">
              <div class="w-8 h-8 bg-green-100 dark:bg-green-900/30 rounded-lg flex items-center justify-center">
                <svg class="w-4 h-4 text-green-600 dark:text-green-400" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M8.433 7.418c.155-.103.346-.196.567-.267v1.698a2.305 2.305 0 01-.567-.267C8.07 8.34 8 8.114 8 8c0-.114.07-.34.433-.582zM11 12.849v-1.698c.22.071.412.164.567.267.364.243.433.468.433.582 0 .114-.07.34-.433.582a2.305 2.305 0 01-.567.267z"/>
                  <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-13a1 1 0 10-2 0v.092a4.535 4.535 0 00-1.676.662C6.602 6.234 6 7.009 6 8c0 .99.602 1.765 1.324 2.246.48.32 1.054.545 1.676.662v1.941c-.391-.127-.68-.317-.843-.504a1 1 0 10-1.51 1.31c.562.649 1.413 1.076 2.353 1.253V15a1 1 0 102 0v-.092a4.535 4.535 0 001.676-.662C13.398 13.766 14 12.991 14 12c0-.99-.602-1.765-1.324-2.246A4.535 4.535 0 0011 9.092V7.151c.391.127.68.317.843.504a1 1 0 101.511-1.31c-.563-.649-1.413-1.076-2.354-1.253V5z" clip-rule="evenodd"/>
                </svg>
              </div>
              <div>
                <p class="font-semibold text-gray-900 dark:text-white">Financial Details</p>
              </div>
            </div>
            <div class="grid grid-cols-1 gap-2 text-sm">
              <div><span class="font-medium text-gray-700 dark:text-gray-300">Application Fees:</span> <span class="text-gray-900 dark:text-white font-semibold">$${scholarship.applicationFees}</span></div>
              <div><span class="font-medium text-gray-700 dark:text-gray-300">Service Charge:</span> <span class="text-gray-900 dark:text-white">$${scholarship.serviceCharge || '0'}</span></div>
              <div><span class="font-medium text-gray-700 dark:text-gray-300">Tuition Fees:</span> <span class="text-gray-900 dark:text-white">$${scholarship.tuitionFees || 'N/A'}</span></div>
            </div>
          </div>
          
          <div class="bg-purple-50 dark:bg-purple-900/20 rounded-xl p-4 space-y-3">
            <div class="flex items-center gap-3">
              <div class="w-8 h-8 bg-purple-100 dark:bg-purple-900/30 rounded-lg flex items-center justify-center">
                <svg class="w-4 h-4 text-purple-600 dark:text-purple-400" fill="currentColor" viewBox="0 0 20 20">
                  <path fill-rule="evenodd" d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z" clip-rule="evenodd"/>
                </svg>
              </div>
              <div>
                <p class="font-semibold text-gray-900 dark:text-white">Academic Information</p>
              </div>
            </div>
            <div class="grid grid-cols-1 gap-2 text-sm">
              <div><span class="font-medium text-gray-700 dark:text-gray-300">Subject:</span> <span class="text-gray-900 dark:text-white">${scholarship.subjectCategory}</span></div>
              <div><span class="font-medium text-gray-700 dark:text-gray-300">Degree:</span> <span class="text-gray-900 dark:text-white">${scholarship.degree || 'N/A'}</span></div>
              <div><span class="font-medium text-gray-700 dark:text-gray-300">Category:</span> <span class="text-gray-900 dark:text-white">${scholarship.scholarshipCategory || 'N/A'}</span></div>
              <div><span class="font-medium text-gray-700 dark:text-gray-300">Deadline:</span> <span class="text-gray-900 dark:text-white">${formatDate(scholarship.applicationDeadline)}</span></div>
            </div>
          </div>
        </div>
      `,
      icon: null,
      background: '#1f2937',
      color: '#fff',
      confirmButtonColor: '#6366f1',
      confirmButtonText: 'Close',
      width: '600px',
      padding: '2rem',
      customClass: {
        popup: 'rounded-2xl',
        title: 'text-xl font-bold mb-6',
        htmlContainer: 'text-base',
        confirmButton: 'rounded-lg px-6 py-3 font-medium'
      }
    });
  };

  const exportData = async () => {
    try {
      toast.loading("Preparing export...");
      
      // Create CSV content
      const headers = ['Scholarship Name', 'University', 'Country', 'Subject', 'Degree', 'Category', 'Application Fees', 'Deadline'];
      const csvContent = [
        headers.join(','),
        ...filteredScholarships.map(scholarship => [
          `"${scholarship.scholarshipName}"`,
          `"${scholarship.universityName}"`,
          `"${scholarship.universityCountry || 'N/A'}"`,
          `"${scholarship.subjectCategory}"`,
          `"${scholarship.degree || 'N/A'}"`,
          `"${scholarship.scholarshipCategory || 'N/A'}"`,
          scholarship.applicationFees || 0,
          `"${scholarship.applicationDeadline ? new Date(scholarship.applicationDeadline).toLocaleDateString() : 'N/A'}"`
        ].join(','))
      ].join('\n');

      // Create and download file
      const blob = new Blob([csvContent], { type: 'text/csv' });
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `scholarships-${new Date().toISOString().split('T')[0]}.csv`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      window.URL.revokeObjectURL(url);
      
      toast.dismiss();
      toast.success("Scholarships exported successfully!");
    } catch (error) {
      toast.dismiss();
      toast.error("Failed to export data");
    }
  };

  if (isLoading) return <LoadingSpinner message="Loading scholarships..." size="large" />;

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-100 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 transition-all duration-300">
      <Helmet>
        <title>Manage Scholarships | Scholarship Dashboard</title>
        <meta name="description" content="Manage and oversee all scholarship offerings with advanced filtering and search capabilities" />
      </Helmet>

      <div className="space-y-8 p-6">
        {/* Enhanced Page Header */}
        <div className="bg-white dark:bg-gray-800 rounded-3xl shadow-xl border border-gray-200 dark:border-gray-700 p-8 backdrop-blur-sm bg-opacity-95">
          <div className="flex flex-col xl:flex-row items-start xl:items-center justify-between gap-6">
            <div className="flex items-start gap-6">
              <div className="p-4 bg-gradient-to-br from-purple-500 via-indigo-600 to-blue-700 rounded-2xl shadow-lg">
                <FiSettings className="w-8 h-8 text-white" />
              </div>
              <div>
                <h1 className="text-4xl font-bold bg-gradient-to-r from-purple-600 via-indigo-600 to-blue-600 bg-clip-text text-transparent mb-2">
                  Manage Scholarships
                </h1>
                <p className="text-lg text-gray-600 dark:text-gray-400 mb-4">
                  Oversee and manage all scholarship offerings with advanced controls
                </p>
                <div className="flex items-center gap-4 text-sm text-gray-500 dark:text-gray-400">
                  <span className="flex items-center gap-1">
                    <HiCalendar className="w-4 h-4" />
                    Last updated: {new Date().toLocaleString()}
                  </span>
                  <span className="flex items-center gap-1">
                    <BiWorld className="w-4 h-4" />
                    Global reach
                  </span>
                </div>
              </div>
            </div>
            
            {/* Enhanced Statistics Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 w-full xl:w-auto">
              <div className="bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-blue-900/30 dark:to-indigo-900/30 rounded-2xl p-6 border border-blue-200 dark:border-blue-800 backdrop-blur-sm">
                <div className="flex items-center justify-between mb-3">
                  <div className="p-2 bg-blue-500 rounded-xl">
                    <HiAcademicCap className="w-6 h-6 text-white" />
                  </div>
                  <span className="text-xs font-medium text-blue-600 dark:text-blue-400 bg-blue-100 dark:bg-blue-900/50 px-2 py-1 rounded-full">
                    Total
                  </span>
                </div>
                <div>
                  <p className="text-sm font-medium text-blue-600 dark:text-blue-400 mb-1">Total Scholarships</p>
                  <p className="text-3xl font-bold text-blue-700 dark:text-blue-300">{scholarships.length}</p>
                </div>
              </div>
              
              <div className="bg-gradient-to-br from-green-50 to-emerald-100 dark:from-green-900/30 dark:to-emerald-900/30 rounded-2xl p-6 border border-green-200 dark:border-green-800 backdrop-blur-sm">
                <div className="flex items-center justify-between mb-3">
                  <div className="p-2 bg-green-500 rounded-xl">
                    <FaSearch className="w-6 h-6 text-white" />
                  </div>
                  <span className="text-xs font-medium text-green-600 dark:text-green-400 bg-green-100 dark:bg-green-900/50 px-2 py-1 rounded-full">
                    Filtered
                  </span>
                </div>
                <div>
                  <p className="text-sm font-medium text-green-600 dark:text-green-400 mb-1">Search Results</p>
                  <p className="text-3xl font-bold text-green-700 dark:text-green-300">{filteredScholarships.length}</p>
                </div>
              </div>

              <div className="bg-gradient-to-br from-purple-50 to-pink-100 dark:from-purple-900/30 dark:to-pink-900/30 rounded-2xl p-6 border border-purple-200 dark:border-purple-800 backdrop-blur-sm">
                <div className="flex items-center justify-between mb-3">
                  <div className="p-2 bg-purple-500 rounded-xl">
                    <HiCurrencyDollar className="w-6 h-6 text-white" />
                  </div>
                  <span className="text-xs font-medium text-purple-600 dark:text-purple-400 bg-purple-100 dark:bg-purple-900/50 px-2 py-1 rounded-full">
                    Active
                  </span>
                </div>
                <div>
                  <p className="text-sm font-medium text-purple-600 dark:text-purple-400 mb-1">Current Page</p>
                  <p className="text-3xl font-bold text-purple-700 dark:text-purple-300">{paginatedScholarships.length}</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Advanced Search and Controls */}
        <div className="bg-white dark:bg-gray-800 rounded-3xl shadow-xl border border-gray-200 dark:border-gray-700 p-8 backdrop-blur-sm bg-opacity-95">
          <div className="flex flex-col space-y-6">
            {/* Search and Quick Actions Row */}
            <div className="flex flex-col lg:flex-row gap-6 items-center justify-between">
              {/* Enhanced Search Bar */}
              <div className="relative flex-1 max-w-2xl">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                  <FaSearch className="w-5 h-5 text-gray-400 dark:text-gray-500" />
                </div>
                <input
                  type="text"
                  placeholder="Search by scholarship name, university, subject, or country..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-12 pr-4 py-4 border-2 border-gray-300 dark:border-gray-600 rounded-2xl focus:ring-4 focus:ring-purple-500/20 focus:border-purple-500 transition-all duration-300 bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 shadow-sm"
                />
                {searchTerm && (
                  <button
                    onClick={() => setSearchTerm('')}
                    className="absolute inset-y-0 right-0 pr-4 flex items-center text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 transition-colors"
                  >
                    <FaTrash className="w-4 h-4" />
                  </button>
                )}
              </div>

              {/* Quick Action Buttons */}
              <div className="flex items-center gap-3">
                <button
                  onClick={() => refetch()}
                  className="p-4 bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300 rounded-2xl hover:bg-gray-200 dark:hover:bg-gray-600 transition-all duration-300 shadow-sm hover:shadow-md transform hover:scale-105"
                  title="Refresh scholarships"
                >
                  <FiRefreshCw className="w-5 h-5" />
                </button>

                <button 
                  onClick={exportData}
                  className="flex items-center gap-3 px-6 py-4 bg-gradient-to-r from-green-500 to-emerald-600 text-white rounded-2xl hover:shadow-lg transform hover:scale-105 transition-all duration-300 font-medium shadow-sm"
                >
                  <FiDownload className="w-5 h-5" />
                  <span className="hidden sm:inline">Export CSV</span>
                </button>
              </div>
            </div>

            {/* Sorting and Filtering Row */}
            <div className="flex flex-col sm:flex-row gap-4 items-center justify-between bg-gray-50 dark:bg-gray-700/50 rounded-2xl p-4">
              {/* Advanced Sort Controls */}
              <div className="flex items-center gap-4">
                <div className="flex items-center gap-2">
                  <FaSort className="text-gray-500 dark:text-gray-400" />
                  <span className="text-sm font-medium text-gray-700 dark:text-gray-300">Sort by:</span>
                </div>
                <select
                  value={sortOption}
                  onChange={(e) => setSortOption(e.target.value)}
                  className="px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white shadow-sm"
                >
                  <option value="createdAt">Date Created</option>
                  <option value="deadline">Application Deadline</option>
                  <option value="fees">Application Fees</option>
                  <option value="name">Scholarship Name</option>
                  <option value="university">University Name</option>
                </select>
                
                <button
                  onClick={() => setSortDirection(sortDirection === "asc" ? "desc" : "asc")}
                  className="p-2 text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200 transition-colors"
                  title={`Sort ${sortDirection === "asc" ? "Descending" : "Ascending"}`}
                >
                  {sortDirection === "asc" ? <FaChevronUp className="w-4 h-4" /> : <FaChevronRight className="w-4 h-4" />}
                </button>
              </div>

              {/* Enhanced Filter Controls */}
              <div className="flex items-center gap-4">
                <div className="flex items-center gap-2">
                  <FaFilter className="text-gray-500 dark:text-gray-400" />
                  <span className="text-sm font-medium text-gray-700 dark:text-gray-300">Filter:</span>
                </div>
                <select
                  value={filterOption}
                  onChange={(e) => setFilterOption(e.target.value)}
                  className="px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white shadow-sm"
                >
                  <option value="all">All Categories</option>
                  <optgroup label="Subject Categories">
                    <option value="Agriculture">🌾 Agriculture</option>
                    <option value="Engineering">⚙️ Engineering</option>
                    <option value="Doctor">🩺 Medical</option>
                    <option value="Business">💼 Business</option>
                    <option value="Computer Science">💻 Computer Science</option>
                    <option value="Arts">🎨 Arts</option>
                  </optgroup>
                  <optgroup label="Funding Types">
                    <option value="Full fund">💰 Full Fund</option>
                    <option value="Partial">💵 Partial Fund</option>
                    <option value="Self-fund">💳 Self Fund</option>
                  </optgroup>
                </select>
                
                {(searchTerm || filterOption !== "all") && (
                  <button
                    onClick={() => {
                      setSearchTerm('');
                      setFilterOption('all');
                    }}
                    className="px-4 py-2 text-sm text-red-600 hover:text-red-700 dark:text-red-400 dark:hover:text-red-300 border border-red-300 dark:border-red-600 rounded-lg hover:bg-red-50 dark:hover:bg-red-900/20 transition-all duration-200"
                  >
                    Clear All
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Enhanced Table Container */}
        <div className="bg-white dark:bg-gray-800 rounded-3xl shadow-xl border border-gray-200 dark:border-gray-700 overflow-hidden backdrop-blur-sm bg-opacity-95">
          {filteredScholarships.length === 0 ? (
            <div className="text-center py-20">
              <div className="w-32 h-32 bg-gradient-to-br from-gray-100 to-gray-200 dark:from-gray-700 dark:to-gray-600 rounded-full flex items-center justify-center mx-auto mb-8 shadow-inner">
                <HiAcademicCap className="text-6xl text-gray-400 dark:text-gray-500" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
                No scholarships found
              </h3>
              <p className="text-lg text-gray-600 dark:text-gray-400 mb-8 max-w-md mx-auto">
                {searchTerm || filterOption !== "all" 
                  ? 'No scholarships match your current search criteria. Try adjusting your filters or search terms.' 
                  : 'No scholarships are currently available in the system.'}
              </p>
              {(searchTerm || filterOption !== "all") && (
                <button
                  onClick={() => {
                    setSearchTerm('');
                    setFilterOption('all');
                  }}
                  className="bg-gradient-to-r from-purple-500 to-indigo-600 hover:from-purple-600 hover:to-indigo-700 text-white font-semibold px-8 py-4 rounded-2xl transition-all duration-300 transform hover:scale-105 shadow-lg"
                >
                  Clear All Filters
                </button>
              )}
            </div>
          ) : (
            <>
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
                  <thead className="bg-gradient-to-r from-gray-50 to-gray-100 dark:from-gray-700 dark:to-gray-600">
                    <tr>
                      <th 
                        onClick={() => handleSort('name')}
                        className="px-6 py-5 text-left text-xs font-bold text-gray-600 dark:text-gray-300 uppercase tracking-wider cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-600 transition-colors group"
                      >
                        <div className="flex items-center space-x-2">
                          <span>Scholarship Details</span>
                          {sortOption === 'name' && (
                            sortDirection === 'asc' ? <FaChevronUp className="w-3 h-3" /> : <FaChevronRight className="w-3 h-3 rotate-90" />
                          )}
                        </div>
                      </th>
                      <th 
                        onClick={() => handleSort('university')}
                        className="px-6 py-5 text-left text-xs font-bold text-gray-600 dark:text-gray-300 uppercase tracking-wider cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-600 transition-colors group"
                      >
                        <div className="flex items-center space-x-2">
                          <span>University</span>
                          {sortOption === 'university' && (
                            sortDirection === 'asc' ? <FaChevronUp className="w-3 h-3" /> : <FaChevronRight className="w-3 h-3 rotate-90" />
                          )}
                        </div>
                      </th>
                      <th className="px-6 py-5 text-left text-xs font-bold text-gray-600 dark:text-gray-300 uppercase tracking-wider">
                        Academic Info
                      </th>
                      <th 
                        onClick={() => handleSort('fees')}
                        className="px-6 py-5 text-left text-xs font-bold text-gray-600 dark:text-gray-300 uppercase tracking-wider cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-600 transition-colors group"
                      >
                        <div className="flex items-center space-x-2">
                          <span>Fees & Deadline</span>
                          {sortOption === 'fees' && (
                            sortDirection === 'asc' ? <FaChevronUp className="w-3 h-3" /> : <FaChevronRight className="w-3 h-3 rotate-90" />
                          )}
                        </div>
                      </th>
                      <th className="px-6 py-5 text-center text-xs font-bold text-gray-600 dark:text-gray-300 uppercase tracking-wider">
                        Actions
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
                    {paginatedScholarships.map((scholarship, index) => (
                      <tr 
                        key={scholarship._id} 
                        className="hover:bg-gradient-to-r hover:from-blue-50 hover:to-indigo-50 dark:hover:from-blue-900/20 dark:hover:to-indigo-900/20 transition-all duration-300 group"
                      >
                        <td className="px-6 py-6">
                          <div className="flex items-center space-x-4">
                            <div className="flex-shrink-0 relative">
                              {scholarship.universityLogo ? (
                                <img
                                  className="w-14 h-14 rounded-2xl object-cover shadow-lg border-2 border-gray-200 dark:border-gray-600 group-hover:border-blue-300 dark:group-hover:border-blue-500 transition-colors"
                                  src={scholarship.universityLogo}
                                  alt={scholarship.universityName}
                                />
                              ) : (
                                <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-purple-500 via-indigo-600 to-blue-700 flex items-center justify-center shadow-lg border-2 border-gray-200 dark:border-gray-600 group-hover:border-blue-300 dark:group-hover:border-blue-500 transition-colors">
                                  <HiAcademicCap className="w-7 h-7 text-white" />
                                </div>
                              )}
                              <div className="absolute -top-1 -right-1 w-6 h-6 bg-green-500 rounded-full flex items-center justify-center text-xs text-white font-bold">
                                {index + 1}
                              </div>
                            </div>
                            <div className="min-w-0 flex-1">
                              <div className="text-base font-bold text-gray-900 dark:text-white mb-1 truncate">
                                {scholarship.scholarshipName}
                              </div>
                              <div className="flex items-center space-x-3 text-sm text-gray-600 dark:text-gray-400">
                                <span className="flex items-center">
                                  <span className="font-medium">{scholarship.degree || 'N/A'}</span>
                                </span>
                                <span className="w-1 h-1 bg-gray-400 rounded-full"></span>
                                <span className="flex items-center">
                                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                                    scholarship.scholarshipCategory === 'Full fund' ? 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300' :
                                    scholarship.scholarshipCategory === 'Partial' ? 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-300' :
                                    'bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-300'
                                  }`}>
                                    {scholarship.scholarshipCategory || 'General'}
                                  </span>
                                </span>
                              </div>
                            </div>
                          </div>
                        </td>
                        <td className="px-6 py-6">
                          <div className="space-y-2">
                            <div className="text-base font-semibold text-gray-900 dark:text-white">
                              {scholarship.universityName}
                            </div>
                            <div className="flex items-center space-x-2 text-sm text-gray-600 dark:text-gray-400">
                              <BiWorld className="w-4 h-4" />
                              <span>{scholarship.universityCountry || 'N/A'}</span>
                              {scholarship.universityCity && (
                                <>
                                  <span className="w-1 h-1 bg-gray-400 rounded-full"></span>
                                  <span>{scholarship.universityCity}</span>
                                </>
                              )}
                            </div>
                            {scholarship.universityRank && (
                              <div className="text-xs text-purple-600 dark:text-purple-400 font-medium">
                                World Rank: #{scholarship.universityRank}
                              </div>
                            )}
                          </div>
                        </td>
                        <td className="px-6 py-6">
                          <div className="space-y-2">
                            <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-gradient-to-r from-blue-100 to-indigo-100 text-blue-800 dark:from-blue-900/30 dark:to-indigo-900/30 dark:text-blue-300 border border-blue-200 dark:border-blue-700">
                              {scholarship.subjectCategory}
                            </span>
                            <div className="text-xs text-gray-500 dark:text-gray-400">
                              Subject Category
                            </div>
                          </div>
                        </td>
                        <td className="px-6 py-6">
                          <div className="space-y-3">
                            <div className="flex items-center space-x-2">
                              <HiCurrencyDollar className="w-4 h-4 text-green-600 dark:text-green-400" />
                              <span className="text-lg font-bold text-gray-900 dark:text-white">
                                ${scholarship.applicationFees}
                              </span>
                            </div>
                            <div className="text-xs text-gray-500 dark:text-gray-400">
                              Application Fee
                            </div>
                            {scholarship.applicationDeadline && (
                              <div className="flex items-center space-x-2 text-xs">
                                <HiCalendar className="w-3 h-3 text-orange-500" />
                                <span className="text-gray-600 dark:text-gray-400">
                                  {new Date(scholarship.applicationDeadline).toLocaleDateString()}
                                </span>
                              </div>
                            )}
                          </div>
                        </td>
                        <td className="px-6 py-6">
                          <div className="flex items-center justify-center space-x-2">
                            <button
                              onClick={() => showScholarshipDetails(scholarship)}
                              className="p-3 text-blue-600 dark:text-blue-400 hover:bg-blue-50 dark:hover:bg-blue-900/20 rounded-xl transition-all duration-200 hover:scale-110 group/btn"
                              title="View Details"
                            >
                              <FaEye className="w-4 h-4 group-hover/btn:scale-110 transition-transform" />
                            </button>
                            <button
                              onClick={() => setEditScholarship(scholarship)}
                              className="p-3 text-amber-600 dark:text-amber-400 hover:bg-amber-50 dark:hover:bg-amber-900/20 rounded-xl transition-all duration-200 hover:scale-110 group/btn"
                              title="Edit Scholarship"
                            >
                              <FaEdit className="w-4 h-4 group-hover/btn:scale-110 transition-transform" />
                            </button>
                            <button
                              onClick={() => handleDelete(scholarship._id)}
                              className="p-3 text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-xl transition-all duration-200 hover:scale-110 group/btn"
                              title="Delete Scholarship"
                            >
                              <FaTrash className="w-4 h-4 group-hover/btn:scale-110 transition-transform" />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              {/* Enhanced Pagination */}
              {totalPages > 1 && (
                <div className="bg-gradient-to-r from-gray-50 to-gray-100 dark:from-gray-700 dark:to-gray-600 px-6 py-4 border-t border-gray-200 dark:border-gray-600">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2 text-sm text-gray-600 dark:text-gray-400">
                      <span>
                        Showing <span className="font-semibold text-purple-600 dark:text-purple-400">{startIndex + 1}</span> to{' '}
                        <span className="font-semibold text-purple-600 dark:text-purple-400">
                          {Math.min(startIndex + itemsPerPage, filteredScholarships.length)}
                        </span> of{' '}
                        <span className="font-semibold text-purple-600 dark:text-purple-400">{filteredScholarships.length}</span> results
                      </span>
                    </div>
                    
                    <div className="flex items-center space-x-2">
                      <button
                        onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
                        disabled={currentPage === 1}
                        className="p-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-600 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-600 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200"
                      >
                        <FaChevronLeft className="w-4 h-4" />
                      </button>
                      
                      <div className="flex items-center space-x-1">
                        {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
                          const pageNum = i + 1;
                          return (
                            <button
                              key={pageNum}
                              onClick={() => setCurrentPage(pageNum)}
                              className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
                                currentPage === pageNum
                                  ? 'bg-purple-600 text-white shadow-lg transform scale-105'
                                  : 'bg-white dark:bg-gray-700 text-gray-600 dark:text-gray-300 border border-gray-300 dark:border-gray-600 hover:bg-gray-50 dark:hover:bg-gray-600'
                              }`}
                            >
                              {pageNum}
                            </button>
                          );
                        })}
                      </div>
                      
                      <button
                        onClick={() => setCurrentPage(Math.min(totalPages, currentPage + 1))}
                        disabled={currentPage === totalPages}
                        className="p-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-600 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-600 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200"
                      >
                        <FaChevronRight className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                </div>
              )}
            </>
          )}
        </div>

        {/* Enhanced Results Summary */}
        {filteredScholarships.length > 0 && (
          <div className="bg-gradient-to-r from-white to-gray-50 dark:from-gray-800 dark:to-gray-700 rounded-2xl shadow-lg border border-gray-200 dark:border-gray-700 p-6 backdrop-blur-sm bg-opacity-95">
            <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
              <div className="flex items-center space-x-4 text-sm text-gray-600 dark:text-gray-400">
                <div className="flex items-center space-x-2">
                  <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                  <span>
                    <span className="font-semibold text-purple-600 dark:text-purple-400">{filteredScholarships.length}</span> scholarships found
                  </span>
                </div>
                <div className="hidden sm:block w-px h-4 bg-gray-300 dark:bg-gray-600"></div>
                <div className="flex items-center space-x-2">
                  <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
                  <span>
                    Page <span className="font-semibold text-purple-600 dark:text-purple-400">{currentPage}</span> of{' '}
                    <span className="font-semibold text-purple-600 dark:text-purple-400">{totalPages}</span>
                  </span>
                </div>
              </div>
              
              <div className="flex items-center space-x-2 text-xs text-gray-500 dark:text-gray-400">
                <HiCalendar className="w-4 h-4" />
                <span>Last updated: {new Date().toLocaleTimeString()}</span>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Edit Modal */}
      {editScholarship && (
        <Modal
          isOpen={true}
          onRequestClose={() => setEditScholarship(null)}
          contentLabel="Edit Scholarship"
          className="fixed inset-0 flex items-center justify-center p-4 z-50"
          overlayClassName="fixed inset-0 bg-black bg-opacity-50 z-40"
        >
          <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto">
            <div className="p-6 border-b border-gray-200 dark:border-gray-700">
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
                Edit Scholarship
              </h2>
            </div>
            
            <form
              onSubmit={(e) => {
                e.preventDefault();
                const formData = new FormData(e.target);
                const updatedData = {
                  scholarshipName: formData.get('scholarshipName'),
                  universityName: formData.get('universityName'),
                  subjectCategory: formData.get('subjectCategory'),
                  applicationFees: parseInt(formData.get('applicationFees')),
                  degree: formData.get('degree'),
                  scholarshipCategory: formData.get('scholarshipCategory'),
                };
                handleUpdateData(updatedData);
              }}
              className="p-6 space-y-6"
            >
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                    Scholarship Name
                  </label>
                  <input
                    name="scholarshipName"
                    type="text"
                    defaultValue={editScholarship.scholarshipName}
                    className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                    required
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                    University Name
                  </label>
                  <input
                    name="universityName"
                    type="text"
                    defaultValue={editScholarship.universityName}
                    className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                    required
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                    Subject Category
                  </label>
                  <select
                    name="subjectCategory"
                    defaultValue={editScholarship.subjectCategory}
                    className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                    required
                  >
                    <option value="Agriculture">Agriculture</option>
                    <option value="Engineering">Engineering</option>
                    <option value="Doctor">Doctor</option>
                  </select>
                </div>
                
                <div>
                  <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                    Application Fees
                  </label>
                  <input
                    name="applicationFees"
                    type="number"
                    defaultValue={editScholarship.applicationFees}
                    className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                    required
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                    Degree
                  </label>
                  <select
                    name="degree"
                    defaultValue={editScholarship.degree}
                    className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                    required
                  >
                    <option value="Diploma">Diploma</option>
                    <option value="Bachelor">Bachelor</option>
                    <option value="Masters">Masters</option>
                  </select>
                </div>
                
                <div>
                  <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                    Scholarship Category
                  </label>
                  <select
                    name="scholarshipCategory"
                    defaultValue={editScholarship.scholarshipCategory}
                    className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                    required
                  >
                    <option value="Full fund">Full fund</option>
                    <option value="Partial">Partial</option>
                    <option value="Self-fund">Self-fund</option>
                  </select>
                </div>
              </div>
              
              <div className="flex gap-3 pt-6 border-t border-gray-200 dark:border-gray-700">
                <button
                  type="button"
                  onClick={() => setEditScholarship(null)}
                  className="flex-1 px-6 py-3 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 rounded-xl hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors duration-200"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="flex-1 px-6 py-3 bg-gradient-to-r from-purple-500 to-indigo-600 text-white rounded-xl hover:shadow-lg transform hover:scale-105 transition-all duration-300"
                >
                  Save Changes
                </button>
              </div>
            </form>
          </div>
        </Modal>
      )}
    </div>
  );
};

export default ManageScholarship;
