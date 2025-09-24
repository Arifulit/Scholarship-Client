import { Helmet } from "react-helmet-async";
import { useState, useMemo } from "react";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { 
  FiSearch, 
  FiFilter, 
  FiGrid, 
  FiList, 
  FiChevronLeft, 
  FiChevronRight,
  FiTrendingUp,
  FiAward,
  FiBook,
  FiGlobe,
  FiRefreshCw,
  FiX
} from "react-icons/fi";
import { 
  HiAcademicCap, 
  HiStar, 
  HiSparkles,
  HiCheckCircle,
  HiLightningBolt,
  HiTrendingUp as HiTrendUp
} from "react-icons/hi";
import LoadingSpinner from "../../components/Shared/LoadingSpinner";
import Container from "../../components/Shared/Container";
import Card from "../../components/Home/Card";
import { mockScholarships } from "../../services/mockData";

const ITEMS_PER_PAGE = 6;

const AllScholarship = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [sortOrder, setSortOrder] = useState("asc");
  const [viewMode, setViewMode] = useState("grid");
  const [selectedCategory, setSelectedCategory] = useState("");
  const [selectedSubject, setSelectedSubject] = useState("");
  const [priceRange, setPriceRange] = useState("all");
  const [isFilterExpanded, setIsFilterExpanded] = useState(false);

  const { data: scholarships, isLoading, refetch } = useQuery({
    queryKey: ["scholarship"],
    queryFn: async () => {
      try {
        const apiUrl = `${import.meta.env.VITE_API_URL}/scholarship`;
        console.log('🔍 AllScholarship API URL:', apiUrl);
        
        const response = await axios(apiUrl);
        console.log('✅ AllScholarship API Response:', response.data);
        
        if (response.data && Array.isArray(response.data) && response.data.length > 0) {
          return response.data;
        } else {
          console.log('⚠️ AllScholarship API returned empty, using mock data');
          return mockScholarships;
        }
      } catch (error) {
        console.error('❌ AllScholarship API Error:', error);
        console.log('🎭 AllScholarship using mock data as fallback');
        return mockScholarships;
      }
    },
    retry: 1,
    retryDelay: 1000,
  });

  // Memoized calculations for performance
  const { categories, subjects, filteredScholarships, stats } = useMemo(() => {
    if (!scholarships) return { categories: [], subjects: [], filteredScholarships: [], stats: {} };
    
    const cats = [...new Set(scholarships.map(s => s.scholarshipCategory))];
    const subs = [...new Set(scholarships.map(s => s.subjectCategory))];
    
    const filtered = scholarships.filter((scholarship) => {
      const matchesSearch = ["scholarshipName", "universityName", "subjectCategory"].some((key) =>
        scholarship[key]?.toLowerCase().includes(searchQuery.toLowerCase())
      );
      const matchesCategory = !selectedCategory || scholarship.scholarshipCategory === selectedCategory;
      const matchesSubject = !selectedSubject || scholarship.subjectCategory === selectedSubject;
      const matchesPrice = 
        priceRange === "all" ||
        (priceRange === "free" && scholarship.applicationFees === 0) ||
        (priceRange === "low" && scholarship.applicationFees > 0 && scholarship.applicationFees <= 50) ||
        (priceRange === "medium" && scholarship.applicationFees > 50 && scholarship.applicationFees <= 100) ||
        (priceRange === "high" && scholarship.applicationFees > 100);
      
      return matchesSearch && matchesCategory && matchesSubject && matchesPrice;
    });

    const statsData = {
      total: scholarships.length,
      free: scholarships.filter(s => s.applicationFees === 0).length,
      categories: cats.length,
      subjects: subs.length
    };

    return { categories: cats, subjects: subs, filteredScholarships: filtered, stats: statsData };
  }, [scholarships, searchQuery, selectedCategory, selectedSubject, priceRange]);

  const sortedScholarships = useMemo(() => {
    return [...filteredScholarships].sort((a, b) =>
      sortOrder === "asc" ? a.universityRank - b.universityRank : b.universityRank - a.universityRank
    );
  }, [filteredScholarships, sortOrder]);

  // Pagination calculations
  const totalItems = sortedScholarships.length;
  const totalPages = Math.ceil(totalItems / ITEMS_PER_PAGE);
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const paginatedScholarships = sortedScholarships.slice(startIndex, startIndex + ITEMS_PER_PAGE);

  const clearAllFilters = () => {
    setSearchQuery("");
    setSelectedCategory("");
    setSelectedSubject("");
    setPriceRange("all");
    setCurrentPage(1);
  };

  const hasActiveFilters = searchQuery || selectedCategory || selectedSubject || priceRange !== "all";

  if (isLoading) return <LoadingSpinner />;

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-green-50 to-teal-50 dark:from-gray-900 dark:via-emerald-950 dark:to-green-950 transition-all duration-500">
      <Helmet>
        <title>All Scholarships | Scholarship Platform</title>
      </Helmet>

      {/* Enhanced Hero Section with Professional Design */}
      <div className="relative overflow-hidden bg-gradient-to-br from-emerald-600 via-green-600 to-teal-700 text-white">
        {/* Animated Background Elements */}
        <div className="absolute inset-0 opacity-20">
          <div className="absolute top-20 left-10 w-32 h-32 bg-white/10 rounded-full animate-pulse"></div>
          <div className="absolute top-40 right-20 w-24 h-24 bg-white/10 rounded-full animate-bounce delay-300"></div>
          <div className="absolute bottom-20 left-1/3 w-40 h-40 bg-white/10 rounded-full animate-pulse delay-700"></div>
          <div className="absolute bottom-10 right-10 w-28 h-28 bg-white/10 rounded-full animate-bounce delay-500"></div>
        </div>
        
        <Container>
          <div className="relative py-24 lg:py-32">
            <div className="text-center">
              {/* Enhanced Icon with Animation */}
              <div className="group inline-flex items-center justify-center w-28 h-28 bg-white/20 backdrop-blur-xl rounded-3xl mb-8 shadow-2xl transform transition-all duration-500 hover:scale-110 hover:rotate-6">
                <HiAcademicCap className="text-5xl group-hover:text-6xl transition-all duration-500 animate-pulse" />
                <div className="absolute inset-0 bg-gradient-to-r from-emerald-400/30 to-teal-400/30 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 animate-pulse"></div>
              </div>
              
              {/* Enhanced Typography with Gradient Text */}
              <h1 className="text-6xl md:text-7xl lg:text-8xl font-black mb-8 leading-tight">
                <span className="bg-gradient-to-r from-white via-emerald-100 to-teal-100 bg-clip-text text-transparent animate-fade-in-up">
                  Discover
                </span>
                <br />
                <span className="bg-gradient-to-r from-emerald-200 via-green-200 to-teal-200 bg-clip-text text-transparent animate-fade-in-up animation-delay-200">
                  Excellence
                </span>
              </h1>
              
              <p className="text-2xl md:text-3xl text-emerald-100 max-w-4xl mx-auto mb-12 leading-relaxed font-light animate-fade-in-up animation-delay-400">
                Unlock your potential with <span className="font-bold text-white">world-class scholarships</span> from premier institutions worldwide. 
                Your journey to academic excellence starts here.
              </p>
              
              {/* Enhanced Statistics Grid */}
              <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8 max-w-6xl mx-auto animate-fade-in-up animation-delay-600">
                {/* Total Scholarships */}
                <div className="group bg-white/10 backdrop-blur-xl p-8 rounded-3xl border border-white/20 hover:bg-white/20 transition-all duration-500 transform hover:scale-105 hover:shadow-2xl">
                  <div className="flex flex-col items-center text-center">
                    <div className="w-16 h-16 bg-gradient-to-br from-emerald-400 to-green-500 rounded-2xl flex items-center justify-center mb-4 group-hover:rotate-12 transition-transform duration-500 shadow-lg">
                      <FiAward className="w-8 h-8 text-white" />
                    </div>
                    <div className="text-4xl font-black text-white mb-2">{stats.total || 0}</div>
                    <div className="text-sm font-semibold text-emerald-200 uppercase tracking-wide">Total Scholarships</div>
                  </div>
                </div>

                {/* Free Scholarships */}
                <div className="group bg-white/10 backdrop-blur-xl p-8 rounded-3xl border border-white/20 hover:bg-white/20 transition-all duration-500 transform hover:scale-105 hover:shadow-2xl">
                  <div className="flex flex-col items-center text-center">
                    <div className="w-16 h-16 bg-gradient-to-br from-yellow-400 to-orange-500 rounded-2xl flex items-center justify-center mb-4 group-hover:rotate-12 transition-transform duration-500 shadow-lg">
                      <HiStar className="w-8 h-8 text-white" />
                    </div>
                    <div className="text-4xl font-black text-white mb-2">{stats.free || 0}</div>
                    <div className="text-sm font-semibold text-emerald-200 uppercase tracking-wide">Free Applications</div>
                  </div>
                </div>

                {/* Categories */}
                <div className="group bg-white/10 backdrop-blur-xl p-8 rounded-3xl border border-white/20 hover:bg-white/20 transition-all duration-500 transform hover:scale-105 hover:shadow-2xl">
                  <div className="flex flex-col items-center text-center">
                    <div className="w-16 h-16 bg-gradient-to-br from-blue-400 to-indigo-500 rounded-2xl flex items-center justify-center mb-4 group-hover:rotate-12 transition-transform duration-500 shadow-lg">
                      <FiBook className="w-8 h-8 text-white" />
                    </div>
                    <div className="text-4xl font-black text-white mb-2">{stats.categories || 0}</div>
                    <div className="text-sm font-semibold text-emerald-200 uppercase tracking-wide">Categories</div>
                  </div>
                </div>

                {/* Universities */}
                <div className="group bg-white/10 backdrop-blur-xl p-8 rounded-3xl border border-white/20 hover:bg-white/20 transition-all duration-500 transform hover:scale-105 hover:shadow-2xl">
                  <div className="flex flex-col items-center text-center">
                    <div className="w-16 h-16 bg-gradient-to-br from-purple-400 to-pink-500 rounded-2xl flex items-center justify-center mb-4 group-hover:rotate-12 transition-transform duration-500 shadow-lg">
                      <FiGlobe className="w-8 h-8 text-white" />
                    </div>
                    <div className="text-4xl font-black text-white mb-2">{stats.subjects || 0}</div>
                    <div className="text-sm font-semibold text-emerald-200 uppercase tracking-wide">Study Fields</div>
                  </div>
                </div>
              </div>

              {/* Call to Action */}
              <div className="mt-16 animate-fade-in-up animation-delay-800">
                <button 
                  onClick={() => document.getElementById('search-section')?.scrollIntoView({ behavior: 'smooth' })}
                  className="group inline-flex items-center gap-4 px-12 py-6 bg-white text-emerald-600 rounded-3xl font-bold text-xl hover:bg-emerald-50 hover:shadow-2xl transition-all duration-500 transform hover:scale-105"
                >
                  <HiLightningBolt className="w-6 h-6 group-hover:animate-bounce" />
                  <span>Start Your Search</span>
                  <FiChevronRight className="w-6 h-6 group-hover:translate-x-2 transition-transform duration-300" />
                </button>
              </div>
            </div>
          </div>
        </Container>
       
      </div>

      <Container>
        {/* Enhanced Search & Filter Section */}
        <div id="search-section" className="bg-white/95 dark:bg-gray-900/95 backdrop-blur-2xl rounded-3xl shadow-2xl border-2 border-emerald-200/30 dark:border-emerald-700/30 p-8 lg:p-12 -mt-16 relative z-10 overflow-hidden">
          {/* Background Pattern */}
          <div className="absolute inset-0 opacity-5">
            <div className="absolute top-4 left-4 w-8 h-8 bg-emerald-500 rounded-full"></div>
            <div className="absolute top-20 right-8 w-6 h-6 bg-green-500 rounded-full"></div>
            <div className="absolute bottom-8 left-12 w-10 h-10 bg-teal-500 rounded-full"></div>
            <div className="absolute bottom-4 right-4 w-4 h-4 bg-emerald-500 rounded-full"></div>
          </div>

          {/* Header */}
          <div className="relative text-center mb-12">
            <div className="inline-flex items-center gap-3 px-6 py-3 bg-gradient-to-r from-emerald-100 to-green-100 dark:from-emerald-900/30 dark:to-green-900/30 rounded-2xl mb-6">
              <HiSparkles className="w-6 h-6 text-emerald-600 dark:text-emerald-400" />
              <span className="font-bold text-emerald-800 dark:text-emerald-200 text-lg">Smart Search & Filter</span>
              <HiSparkles className="w-6 h-6 text-emerald-600 dark:text-emerald-400" />
            </div>
            <h2 className="text-4xl font-black text-gray-900 dark:text-white mb-4">
              Find Your Perfect Scholarship
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-400 max-w-3xl mx-auto">
              Use our advanced filters to discover scholarships tailored to your academic goals and financial needs.
            </p>
          </div>

          {/* Enhanced Search Bar */}
          <div className="mb-10">
            <div className="relative max-w-4xl mx-auto group">
              <div className="absolute inset-0 bg-gradient-to-r from-emerald-500/20 to-green-500/20 rounded-3xl opacity-0 group-focus-within:opacity-100 transition-opacity duration-500 blur-xl"></div>
              <div className="relative">
                <FiSearch className="absolute left-8 top-1/2 transform -translate-y-1/2 text-gray-400 dark:text-gray-500 w-8 h-8 group-focus-within:text-emerald-500 transition-colors duration-300" />
                <input
                  type="text"
                  placeholder="Search by scholarship name, university, subject, or keyword..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-20 pr-8 py-6 border-3 border-emerald-200 dark:border-emerald-700 rounded-3xl focus:ring-4 focus:ring-emerald-500/20 focus:border-emerald-500 transition-all duration-300 text-xl bg-white/90 dark:bg-gray-800/90 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 shadow-inner backdrop-blur-sm font-medium hover:border-emerald-300 dark:hover:border-emerald-600"
                />
                {searchQuery && (
                  <button
                    onClick={() => setSearchQuery("")}
                    className="absolute right-8 top-1/2 transform -translate-y-1/2 p-2 text-gray-400 hover:text-emerald-500 transition-colors duration-300"
                  >
                    <FiX className="w-6 h-6" />
                  </button>
                )}
              </div>
            </div>
          </div>

          {/* Advanced Filter Controls */}
          <div className="space-y-8">
            {/* Filter Toggle Button */}
            <div className="text-center">
              <button
                onClick={() => setIsFilterExpanded(!isFilterExpanded)}
                className="inline-flex items-center gap-3 px-8 py-4 bg-gradient-to-r from-emerald-100 to-green-100 dark:from-emerald-900/30 dark:to-green-900/30 text-emerald-800 dark:text-emerald-200 rounded-2xl hover:from-emerald-200 hover:to-green-200 dark:hover:from-emerald-800/50 dark:hover:to-green-800/50 transition-all duration-300 font-bold text-lg shadow-lg hover:shadow-xl"
              >
                <FiFilter className="w-5 h-5" />
                <span>{isFilterExpanded ? 'Hide' : 'Show'} Advanced Filters</span>
                <FiChevronRight className={`w-5 h-5 transition-transform duration-300 ${isFilterExpanded ? 'rotate-90' : ''}`} />
              </button>
            </div>

            {/* Expandable Filter Section */}
            <div className={`transition-all duration-500 overflow-hidden ${isFilterExpanded ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'}`}>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {/* Category Filter */}
                <div className="space-y-3">
                  <label className="block text-sm font-bold text-gray-700 dark:text-gray-300 uppercase tracking-wider">
                    <FiBook className="inline w-4 h-4 mr-2" />
                    Category
                  </label>
                  <select
                    value={selectedCategory}
                    onChange={(e) => setSelectedCategory(e.target.value)}
                    className="w-full px-6 py-4 border-2 border-emerald-200 dark:border-emerald-700 rounded-2xl focus:ring-4 focus:ring-emerald-500/20 focus:border-emerald-500 bg-white dark:bg-gray-800 text-gray-900 dark:text-white transition-all duration-300 font-medium shadow-inner hover:border-emerald-300 dark:hover:border-emerald-600"
                  >
                    <option value="">🌟 All Categories</option>
                    {categories.map(category => (
                      <option key={category} value={category}>📚 {category}</option>
                    ))}
                  </select>
                </div>

                {/* Subject Filter */}
                <div className="space-y-3">
                  <label className="block text-sm font-bold text-gray-700 dark:text-gray-300 uppercase tracking-wider">
                    <FiAward className="inline w-4 h-4 mr-2" />
                    Subject
                  </label>
                  <select
                    value={selectedSubject}
                    onChange={(e) => setSelectedSubject(e.target.value)}
                    className="w-full px-6 py-4 border-2 border-emerald-200 dark:border-emerald-700 rounded-2xl focus:ring-4 focus:ring-emerald-500/20 focus:border-emerald-500 bg-white dark:bg-gray-800 text-gray-900 dark:text-white transition-all duration-300 font-medium shadow-inner hover:border-emerald-300 dark:hover:border-emerald-600"
                  >
                    <option value="">🎓 All Subjects</option>
                    {subjects.map(subject => (
                      <option key={subject} value={subject}>📖 {subject}</option>
                    ))}
                  </select>
                </div>

                {/* Price Range Filter */}
                <div className="space-y-3">
                  <label className="block text-sm font-bold text-gray-700 dark:text-gray-300 uppercase tracking-wider">
                    <FiTrendingUp className="inline w-4 h-4 mr-2" />
                    Application Fee
                  </label>
                  <select
                    value={priceRange}
                    onChange={(e) => setPriceRange(e.target.value)}
                    className="w-full px-6 py-4 border-2 border-emerald-200 dark:border-emerald-700 rounded-2xl focus:ring-4 focus:ring-emerald-500/20 focus:border-emerald-500 bg-white dark:bg-gray-800 text-gray-900 dark:text-white transition-all duration-300 font-medium shadow-inner hover:border-emerald-300 dark:hover:border-emerald-600"
                  >
                    <option value="all">💰 All Fee Ranges</option>
                    <option value="free">🆓 Free (₹0)</option>
                    <option value="low">💚 Low (₹1-50)</option>
                    <option value="medium">💛 Medium (₹51-100)</option>
                    <option value="high">🔥 High (₹100+)</option>
                  </select>
                </div>

                {/* Sort Control */}
                <div className="space-y-3">
                  <label className="block text-sm font-bold text-gray-700 dark:text-gray-300 uppercase tracking-wider">
                    <FiFilter className="inline w-4 h-4 mr-2" />
                    Sort By Rank
                  </label>
                  <select
                    value={sortOrder}
                    onChange={(e) => setSortOrder(e.target.value)}
                    className="w-full px-6 py-4 border-2 border-emerald-200 dark:border-emerald-700 rounded-2xl focus:ring-4 focus:ring-emerald-500/20 focus:border-emerald-500 bg-white dark:bg-gray-800 text-gray-900 dark:text-white transition-all duration-300 font-medium shadow-inner hover:border-emerald-300 dark:hover:border-emerald-600"
                  >
                    <option value="asc">📈 Rank: Low to High</option>
                    <option value="desc">📉 Rank: High to Low</option>
                  </select>
                </div>
              </div>
            </div>

            {/* Filter Summary and Controls */}
            <div className="flex flex-col lg:flex-row items-center justify-between gap-6">
              {/* Results Summary */}
              <div className="flex flex-wrap items-center gap-4">
                <div className="flex items-center gap-3 px-6 py-3 bg-gradient-to-r from-emerald-100 to-green-100 dark:from-emerald-900/30 dark:to-green-900/30 text-emerald-800 dark:text-emerald-200 rounded-2xl shadow-lg backdrop-blur-sm">
                  <HiCheckCircle className="w-6 h-6" />
                  <span className="font-bold text-lg">
                    Showing {paginatedScholarships.length} of {totalItems} scholarships
                  </span>
                </div>
                
                {hasActiveFilters && (
                  <div className="flex items-center gap-3 px-6 py-3 bg-gradient-to-r from-blue-100 to-indigo-100 dark:from-blue-900/30 dark:to-indigo-900/30 text-blue-800 dark:text-blue-200 rounded-2xl shadow-lg backdrop-blur-sm">
                    <FiFilter className="w-5 h-5" />
                    <span className="font-bold">Filters Active</span>
                  </div>
                )}
              </div>

              {/* Control Buttons */}
              <div className="flex items-center gap-4">
                {/* Refresh Button */}
                <button
                  onClick={() => refetch()}
                  className="flex items-center gap-3 px-6 py-3 bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 rounded-2xl hover:bg-emerald-100 hover:text-emerald-700 dark:hover:bg-emerald-900/30 dark:hover:text-emerald-300 transition-all duration-300 font-bold shadow-lg hover:shadow-xl"
                >
                  <FiRefreshCw className="w-5 h-5" />
                  <span>Refresh</span>
                </button>

                {/* Clear Filters */}
                {hasActiveFilters && (
                  <button
                    onClick={clearAllFilters}
                    className="flex items-center gap-3 px-6 py-3 bg-gradient-to-r from-red-100 to-pink-100 dark:from-red-900/30 dark:to-pink-900/30 text-red-700 dark:text-red-300 rounded-2xl hover:from-red-200 hover:to-pink-200 dark:hover:from-red-800/50 dark:hover:to-pink-800/50 transition-all duration-300 font-bold shadow-lg hover:shadow-xl"
                  >
                    <FiX className="w-5 h-5" />
                    <span>Clear All</span>
                  </button>
                )}

                {/* View Mode Toggle */}
                <div className="flex items-center bg-gray-100 dark:bg-gray-800 rounded-2xl p-2 shadow-inner">
                  <button
                    onClick={() => setViewMode("grid")}
                    className={`flex items-center gap-2 px-4 py-3 rounded-xl transition-all duration-300 font-bold ${
                      viewMode === "grid"
                        ? "bg-gradient-to-r from-emerald-500 to-green-600 text-white shadow-lg transform scale-105"
                        : "text-gray-500 dark:text-gray-400 hover:text-emerald-600 dark:hover:text-emerald-400"
                    }`}
                  >
                    <FiGrid className="w-5 h-5" />
                    <span className="hidden sm:inline">Grid</span>
                  </button>
                  <button
                    onClick={() => setViewMode("list")}
                    className={`flex items-center gap-2 px-4 py-3 rounded-xl transition-all duration-300 font-bold ${
                      viewMode === "list"
                        ? "bg-gradient-to-r from-emerald-500 to-green-600 text-white shadow-lg transform scale-105"
                        : "text-gray-500 dark:text-gray-400 hover:text-emerald-600 dark:hover:text-emerald-400"
                    }`}
                  >
                    <FiList className="w-5 h-5" />
                    <span className="hidden sm:inline">List</span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Enhanced Scholarships Display Section */}
        <div className="mt-12">
          {sortedScholarships.length === 0 ? (
            <div className="text-center py-24">
              <div className="max-w-2xl mx-auto">
                <div className="relative mb-12">
                  <div className="w-32 h-32 bg-gradient-to-br from-emerald-100 to-green-200 dark:from-emerald-900/30 dark:to-green-800/30 rounded-full flex items-center justify-center mx-auto shadow-2xl">
                    <HiAcademicCap className="w-16 h-16 text-emerald-500 dark:text-emerald-400" />
                  </div>
                  <div className="absolute top-0 left-1/2 transform -translate-x-1/2 w-40 h-40 bg-emerald-400/20 rounded-full animate-ping"></div>
                </div>
                <h3 className="text-4xl font-black text-gray-900 dark:text-white mb-6">
                  No Scholarships Found
                </h3>
                <p className="text-xl text-gray-600 dark:text-gray-400 mb-10 leading-relaxed">
                  We couldn&apos;t find any scholarships matching your current search criteria. 
                  Try adjusting your filters or search terms to discover amazing opportunities.
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <button
                    onClick={clearAllFilters}
                    className="inline-flex items-center gap-3 px-8 py-4 bg-gradient-to-r from-emerald-500 via-green-500 to-teal-600 text-white rounded-2xl hover:from-emerald-600 hover:via-green-600 hover:to-teal-700 transition-all duration-300 font-bold text-lg shadow-xl hover:shadow-2xl hover:shadow-emerald-500/30 transform hover:scale-105"
                  >
                    <FiRefreshCw className="w-6 h-6" />
                    Clear All Filters
                  </button>
                  <button
                    onClick={() => refetch()}
                    className="inline-flex items-center gap-3 px-8 py-4 bg-white dark:bg-gray-800 text-emerald-600 dark:text-emerald-400 border-2 border-emerald-500 rounded-2xl hover:bg-emerald-50 dark:hover:bg-emerald-900/20 transition-all duration-300 font-bold text-lg shadow-lg hover:shadow-xl transform hover:scale-105"
                  >
                    <FiRefreshCw className="w-6 h-6" />
                    Refresh Data
                  </button>
                </div>
              </div>
            </div>
          ) : (
            <>
              {/* Ultra Professional Grid Layout with Perfect Window Spacing */}
              <div className={`max-w-7xl mx-auto ${
                viewMode === "grid" 
                  ? "grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-0" 
                  : "flex flex-col gap-0"
              }`}>
                {paginatedScholarships.map((scholarship, index) => (
                  <div
                    key={scholarship._id}
                    className={`transform transition-all duration-700 hover:z-10 ${
                      viewMode === "list" ? "" : ""
                    }`}
                    style={{
                      animationDelay: `${index * 120}ms`,
                      animation: 'fadeInUp 0.8s ease-out forwards'
                    }}
                  >
                    <Card scholar={scholarship} viewMode={viewMode} />
                  </div>
                ))}
              </div>

              {/* Enhanced Pagination */}
              {totalPages > 1 && (
                <div className="mt-16 mb-12">
                  <div className="flex flex-col lg:flex-row items-center justify-between gap-8">
                    {/* Page Information */}
                    <div className="flex items-center gap-4">
                      <div className="flex items-center gap-3 px-6 py-3 bg-gradient-to-r from-emerald-100 to-green-100 dark:from-emerald-900/30 dark:to-green-900/30 text-emerald-800 dark:text-emerald-200 rounded-2xl shadow-lg backdrop-blur-sm">
                        <HiCheckCircle className="w-5 h-5" />
                        <span className="font-bold">
                          Page {currentPage} of {totalPages}
                        </span>
                      </div>
                      <div className="text-gray-600 dark:text-gray-400 font-medium">
                        ({startIndex + 1}-{Math.min(startIndex + ITEMS_PER_PAGE, totalItems)} of {totalItems})
                      </div>
                    </div>

                    {/* Pagination Controls */}
                    <div className="flex items-center gap-3">
                      {/* Previous Button */}
                      <button
                        onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                        disabled={currentPage === 1}
                        className={`flex items-center gap-3 px-6 py-4 rounded-2xl transition-all duration-300 font-bold shadow-lg ${
                          currentPage === 1
                            ? "bg-gray-100 dark:bg-gray-800 text-gray-400 dark:text-gray-500 cursor-not-allowed"
                            : "bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-emerald-50 dark:hover:bg-emerald-900/20 hover:text-emerald-600 dark:hover:text-emerald-400 border-2 border-emerald-200 dark:border-emerald-700 hover:border-emerald-400 dark:hover:border-emerald-500 hover:shadow-xl transform hover:scale-105"
                        }`}
                      >
                        <FiChevronLeft className="w-5 h-5" />
                        <span className="hidden sm:inline">Previous</span>
                      </button>

                      {/* Page Numbers */}
                      <div className="flex items-center gap-2">
                        {[...Array(Math.min(totalPages, 5))].map((_, index) => {
                          const pageNumber = currentPage <= 3 ? index + 1 : 
                                           currentPage >= totalPages - 2 ? totalPages - 4 + index :
                                           currentPage - 2 + index;
                          
                          if (pageNumber < 1 || pageNumber > totalPages) return null;
                          
                          return (
                            <button
                              key={pageNumber}
                              onClick={() => setCurrentPage(pageNumber)}
                              className={`w-12 h-12 rounded-xl transition-all duration-300 font-bold text-lg shadow-lg ${
                                currentPage === pageNumber
                                  ? "bg-gradient-to-r from-emerald-500 to-green-600 text-white shadow-2xl transform scale-110 shadow-emerald-500/30"
                                  : "bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-emerald-50 dark:hover:bg-emerald-900/20 hover:text-emerald-600 dark:hover:text-emerald-400 border-2 border-emerald-200 dark:border-emerald-700 hover:border-emerald-400 dark:hover:border-emerald-500 hover:shadow-xl transform hover:scale-105"
                              }`}
                            >
                              {pageNumber}
                            </button>
                          );
                        })}
                      </div>

                      {/* Next Button */}
                      <button
                        onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
                        disabled={currentPage === totalPages}
                        className={`flex items-center gap-3 px-6 py-4 rounded-2xl transition-all duration-300 font-bold shadow-lg ${
                          currentPage === totalPages
                            ? "bg-gray-100 dark:bg-gray-800 text-gray-400 dark:text-gray-500 cursor-not-allowed"
                            : "bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-emerald-50 dark:hover:bg-emerald-900/20 hover:text-emerald-600 dark:hover:text-emerald-400 border-2 border-emerald-200 dark:border-emerald-700 hover:border-emerald-400 dark:hover:border-emerald-500 hover:shadow-xl transform hover:scale-105"
                        }`}
                      >
                        <span className="hidden sm:inline">Next</span>
                        <FiChevronRight className="w-5 h-5" />
                      </button>
                    </div>

                    {/* Items per page info */}
                    <div className="flex items-center gap-3 px-6 py-3 bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400 rounded-2xl shadow-inner">
                      <HiTrendUp className="w-5 h-5" />
                      <span className="font-medium">{ITEMS_PER_PAGE} per page</span>
                    </div>
                  </div>
                </div>
              )}
            </>
          )}
        </div>
      </Container>

      {/* Custom CSS for Animations */}
      <style>{`
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        
        .animate-fade-in-up {
          animation: fadeInUp 0.6s ease-out forwards;
        }
        
        .animation-delay-200 {
          animation-delay: 200ms;
        }
        
        .animation-delay-400 {
          animation-delay: 400ms;
        }
        
        .animation-delay-600 {
          animation-delay: 600ms;
        }
        
        .animation-delay-800 {
          animation-delay: 800ms;
        }
      `}</style>
    </div>
  );
};

export default AllScholarship;