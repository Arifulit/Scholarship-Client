import { Helmet } from 'react-helmet-async'
import { useState } from 'react'
import { FiSearch, FiRefreshCw, FiDownload, FiGrid, FiList } from 'react-icons/fi'
import { HiAcademicCap, HiCollection, HiCurrencyDollar } from 'react-icons/hi'
import { FaSort, FaFilter } from 'react-icons/fa'
import PlantDataRow from '../../../components/Dashboard/TableRows/PlantDataRow'
import useAxiosSecure from '../../../hooks/useAxiosSecure'
import { useQuery } from '@tanstack/react-query'
import LoadingSpinner from '../../../components/Shared/LoadingSpinner'

const MyInventory = () => {
  const axiosSecure = useAxiosSecure()
  const [searchTerm, setSearchTerm] = useState('')
  const [sortOption, setSortOption] = useState('name')
  const [filterCategory, setFilterCategory] = useState('all')
  const [viewMode, setViewMode] = useState('table')

  const {
    data: plants = [],
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ['plants'],
    queryFn: async () => {
      const { data } = await axiosSecure(`/scholar/moderator`)
      return data
    },
  })

  // Get unique categories for filter
  const categories = [...new Set(plants.map(plant => plant.category || plant.subjectCategory))].filter(Boolean)

  // Filter and sort logic
  const filteredPlants = plants.filter(plant => {
    const matchesSearch = !searchTerm || 
      plant.scholarshipName?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      plant.universityName?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      plant.subjectCategory?.toLowerCase().includes(searchTerm.toLowerCase())
    
    const matchesCategory = filterCategory === 'all' || 
      plant.category === filterCategory || 
      plant.subjectCategory === filterCategory
    
    return matchesSearch && matchesCategory
  })

  const sortedPlants = [...filteredPlants].sort((a, b) => {
    switch (sortOption) {
      case 'name':
        return (a.scholarshipName || a.name || '').localeCompare(b.scholarshipName || b.name || '')
      case 'price':
        return (a.applicationFees || a.price || 0) - (b.applicationFees || b.price || 0)
      case 'category':
        return (a.subjectCategory || a.category || '').localeCompare(b.subjectCategory || b.category || '')
      default:
        return 0
    }
  })

  if (isLoading) return <LoadingSpinner />

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors duration-300">
      <Helmet>
        <title>My Inventory | Dashboard</title>
      </Helmet>

      <div className="space-y-6">
        {/* Page Header */}
        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg border border-gray-200 dark:border-gray-700 p-6">
          <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-4">
            <div>
              <div className="flex items-center gap-3 mb-2">
                <div className="p-2 bg-gradient-to-r from-emerald-500 to-teal-600 rounded-lg">
                  <HiCollection className="w-6 h-6 text-white" />
                </div>
                <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
                  My Inventory
                </h1>
              </div>
              <p className="text-gray-600 dark:text-gray-400">
                Manage your scholarship offerings and inventory
              </p>
            </div>
            
            {/* Statistics */}
            <div className="flex flex-col sm:flex-row gap-4">
              <div className="bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-blue-900/20 dark:to-indigo-900/20 rounded-xl p-4 border border-blue-200 dark:border-blue-800">
                <div className="flex items-center gap-3">
                  <HiAcademicCap className="w-5 h-5 text-blue-600 dark:text-blue-400" />
                  <div>
                    <p className="text-sm text-blue-600 dark:text-blue-400">Total Items</p>
                    <p className="text-xl font-bold text-blue-700 dark:text-blue-300">{plants.length}</p>
                  </div>
                </div>
              </div>
              
              <div className="bg-gradient-to-r from-green-50 to-emerald-50 dark:from-green-900/20 dark:to-emerald-900/20 rounded-xl p-4 border border-green-200 dark:border-green-800">
                <div className="flex items-center gap-3">
                  <HiCurrencyDollar className="w-5 h-5 text-green-600 dark:text-green-400" />
                  <div>
                    <p className="text-sm text-green-600 dark:text-green-400">Filtered Results</p>
                    <p className="text-xl font-bold text-green-700 dark:text-green-300">{filteredPlants.length}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Search and Controls */}
        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg border border-gray-200 dark:border-gray-700 p-6">
          <div className="flex flex-col lg:flex-row gap-4 items-center justify-between">
            {/* Search Bar */}
            <div className="relative flex-1 max-w-md">
              <FiSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 dark:text-gray-500" />
              <input
                type="text"
                placeholder="Search scholarships..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-3 border border-gray-300 dark:border-gray-600 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-all duration-200 bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400"
              />
            </div>

            {/* Controls */}
            <div className="flex items-center gap-3">
              {/* Sort Dropdown */}
              <div className="flex items-center gap-2">
                <FaSort className="text-gray-500 dark:text-gray-400" />
                <select
                  value={sortOption}
                  onChange={(e) => setSortOption(e.target.value)}
                  className="px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                >
                  <option value="name">Sort by Name</option>
                  <option value="price">Sort by Price</option>
                  <option value="category">Sort by Category</option>
                </select>
              </div>

              {/* Category Filter */}
              <div className="flex items-center gap-2">
                <FaFilter className="text-gray-500 dark:text-gray-400" />
                <select
                  value={filterCategory}
                  onChange={(e) => setFilterCategory(e.target.value)}
                  className="px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                >
                  <option value="all">All Categories</option>
                  {categories.map(category => (
                    <option key={category} value={category}>{category}</option>
                  ))}
                </select>
              </div>

              {/* View Toggle */}
              <div className="flex items-center bg-gray-100 dark:bg-gray-700 rounded-lg p-1">
                <button
                  onClick={() => setViewMode('table')}
                  className={`p-2 rounded-md transition-colors duration-200 ${
                    viewMode === 'table'
                      ? "bg-emerald-500 text-white shadow-md"
                      : "text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-200"
                  }`}
                >
                  <FiList className="text-xl" />
                </button>
                <button
                  onClick={() => setViewMode('grid')}
                  className={`p-2 rounded-md transition-colors duration-200 ${
                    viewMode === 'grid'
                      ? "bg-emerald-500 text-white shadow-md"
                      : "text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-200"
                  }`}
                >
                  <FiGrid className="text-xl" />
                </button>
              </div>

              {/* Action Buttons */}
              <button
                onClick={() => refetch()}
                className="p-3 bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300 rounded-xl hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors duration-200"
                title="Refresh data"
              >
                <FiRefreshCw className="w-5 h-5" />
              </button>

              <button className="flex items-center gap-2 px-4 py-3 bg-gradient-to-r from-emerald-500 to-teal-600 text-white rounded-xl hover:shadow-lg transform hover:scale-105 transition-all duration-300">
                <FiDownload className="w-4 h-4" />
                <span className="hidden sm:inline">Export</span>
              </button>
            </div>
          </div>
        </div>

        {/* Table Container */}
        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg border border-gray-200 dark:border-gray-700 overflow-hidden">
          {sortedPlants.length === 0 ? (
            <div className="text-center py-16">
              <div className="w-24 h-24 bg-gray-100 dark:bg-gray-700 rounded-full flex items-center justify-center mx-auto mb-6">
                <HiCollection className="text-4xl text-gray-400 dark:text-gray-500" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                No items found
              </h3>
              <p className="text-gray-600 dark:text-gray-400 mb-6">
                {searchTerm || filterCategory !== 'all' ? 'Try adjusting your search criteria.' : 'Your inventory is empty.'}
              </p>
              {(searchTerm || filterCategory !== 'all') && (
                <button
                  onClick={() => {
                    setSearchTerm('');
                    setFilterCategory('all');
                  }}
                  className="bg-emerald-500 hover:bg-emerald-600 text-white px-6 py-3 rounded-lg transition-colors duration-200"
                >
                  Clear Filters
                </button>
              )}
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
                <thead className="bg-gray-50 dark:bg-gray-700/50">
                  <tr>
                    <th className="px-6 py-4 text-left text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                      Image
                    </th>
                    <th className="px-6 py-4 text-left text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                      Name
                    </th>
                    <th className="px-6 py-4 text-left text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                      Category
                    </th>
                    <th className="px-6 py-4 text-left text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                      Price
                    </th>
                    <th className="px-6 py-4 text-left text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                      Quantity
                    </th>
                    <th className="px-6 py-4 text-left text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
                  {sortedPlants.map(plant => (
                    <PlantDataRow
                      key={plant?._id}
                      plant={plant}
                      refetch={refetch}
                    />
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>

        {/* Results Summary */}
        {sortedPlants.length > 0 && (
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg border border-gray-200 dark:border-gray-700 p-4">
            <div className="flex items-center justify-between text-sm text-gray-600 dark:text-gray-400">
              <span>
                Showing <span className="font-semibold text-emerald-600 dark:text-emerald-400">{sortedPlants.length}</span> of{' '}
                <span className="font-semibold text-emerald-600 dark:text-emerald-400">{plants.length}</span> items
              </span>
              <span className="text-xs">
                Last updated: {new Date().toLocaleTimeString()}
              </span>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

export default MyInventory