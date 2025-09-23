
import { useQuery } from "@tanstack/react-query"
import useAuth from "../../../hooks/useAuth"
import useAxiosSecure from "../../../hooks/useAxiosSecure"
import LoadingSpinner from "../../../components/Shared/LoadingSpinner"
import { Helmet } from "react-helmet-async"
import UserDataRow from '../../../components/Dashboard/TableRows/UserDataRow'
import { FaUsers, FaSearch, FaFilter, FaDownload } from "react-icons/fa"
import { useState } from "react"
import toast from "react-hot-toast"

const ManageUsers = () => {
  const { user } = useAuth()
  const axiosSecure = useAxiosSecure()
  const [searchTerm, setSearchTerm] = useState("")
  const [filterRole, setFilterRole] = useState("all")

  const {
    data: users = [],
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ['users', user?.email],
    queryFn: async () => {
      const { data } = await axiosSecure(`/all-users/${user?.email}`)
      return data
    },
  })

  // Filter users based on search term and role filter
  const filteredUsers = users.filter(userData => {
    const matchesSearch = userData.email?.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         userData.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         userData.displayName?.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesRole = filterRole === "all" || userData.role === filterRole
    return matchesSearch && matchesRole
  })

  // Export functionality
  const handleExport = () => {
    if (users.length === 0) {
      toast.error("No users available to export")
      return
    }

    try {
      // Helper function to get display name
      const getDisplayName = (userData) => {
        const { displayName, name, firstName, lastName, email } = userData
        if (displayName?.trim()) return displayName.trim()
        if (name?.trim()) return name.trim()
        if (firstName || lastName) {
          return `${firstName || ''} ${lastName || ''}`.trim()
        }
        if (email) {
          return email.split('@')[0]
            .replace(/[._]/g, ' ')
            .replace(/\d+/g, '')
            .split(' ')
            .map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
            .join(' ')
            .trim()
        }
        return 'Unknown User'
      }

      // Create CSV content
      const headers = ['Name', 'Email', 'Role', 'Status', 'Join Date']
      const csvContent = [
        headers.join(','),
        ...filteredUsers.map(userData => [
          `"${getDisplayName(userData)}"`,
          `"${userData.email || 'No Email'}"`,
          `"${userData.role || 'customer'}"`,
          `"${userData.status || 'active'}"`,
          `"${userData.createdAt ? new Date(userData.createdAt).toLocaleDateString() : 'Unknown'}"`
        ].join(','))
      ].join('\n')

      // Create and download file
      const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' })
      const link = document.createElement('a')
      const url = URL.createObjectURL(blob)
      link.setAttribute('href', url)
      link.setAttribute('download', `users_export_${new Date().toISOString().split('T')[0]}.csv`)
      link.style.visibility = 'hidden'
      document.body.appendChild(link)
      link.click()
      document.body.removeChild(link)
      URL.revokeObjectURL(url)
      
      toast.success(`Successfully exported ${filteredUsers.length} users to CSV`)
    } catch (error) {
      toast.error("Failed to export users")
      console.error('Export error:', error)
    }
  }

  if (isLoading) return <LoadingSpinner />

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors duration-300">
      <Helmet>
        <title>Manage Users | Scholarship Platform</title>
      </Helmet>
      
      {/* Header Section */}
      <div className="bg-white dark:bg-gray-800 shadow-sm border-b border-gray-200 dark:border-gray-700">
        <div className="px-6 py-8">
          <div className="flex items-center justify-between flex-wrap gap-4">
            <div className="flex items-center">
              <div className="p-3 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-xl shadow-lg mr-4">
                <FaUsers className="w-8 h-8 text-white" />
              </div>
              <div>
                <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
                  Manage Users
                </h1>
                <p className="mt-1 text-gray-600 dark:text-gray-400">
                  Manage user accounts and permissions
                </p>
              </div>
            </div>
            
            <div className="flex items-center space-x-3">
              <div className="flex items-center bg-blue-50 dark:bg-blue-900/20 px-4 py-2 rounded-lg">
                <FaUsers className="w-4 h-4 text-blue-600 mr-2" />
                <span className="text-sm font-medium text-blue-900 dark:text-blue-300">
                  Total: {users.length} users
                </span>
              </div>
              
              <button 
                onClick={handleExport}
                disabled={users.length === 0}
                className={`flex items-center px-4 py-2 rounded-lg transition-all duration-300 ${
                  users.length === 0 
                    ? 'bg-gray-300 text-gray-500 cursor-not-allowed' 
                    : 'bg-gradient-to-r from-green-500 to-emerald-600 text-white hover:shadow-lg hover:from-green-600 hover:to-emerald-700 transform hover:scale-105'
                }`}
              >
                <FaDownload className="w-4 h-4 mr-2" />
                Export ({filteredUsers.length})
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="p-6">
        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg border border-gray-100 dark:border-gray-700 overflow-hidden">
          {/* Search and Filter Section */}
          <div className="p-6 border-b border-gray-200 dark:border-gray-700">
            <div className="flex flex-col md:flex-row gap-4">
              {/* Search Bar */}
              <div className="flex-1 relative">
                <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <input
                  type="text"
                  placeholder="Search by email or name..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 border border-gray-300 dark:border-gray-600 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white transition-colors"
                />
              </div>
              
              {/* Role Filter */}
              <div className="relative min-w-[200px]">
                <FaFilter className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <select
                  value={filterRole}
                  onChange={(e) => setFilterRole(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 border border-gray-300 dark:border-gray-600 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white transition-colors appearance-none"
                >
                  <option value="all">All Roles</option>
                  <option value="admin">Admin</option>
                  <option value="moderator">Moderator</option>
                  <option value="customer">Customer</option>
                </select>
              </div>
            </div>
            
            {/* Results count */}
            <div className="mt-4 text-sm text-gray-600 dark:text-gray-400">
              Showing {filteredUsers.length} of {users.length} users
            </div>
          </div>

          {/* Table Section */}
          <div className="overflow-x-auto">
            {filteredUsers.length === 0 ? (
              <div className="text-center py-12">
                <FaUsers className="w-16 h-16 text-gray-300 dark:text-gray-600 mx-auto mb-4" />
                <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">
                  No users found
                </h3>
                <p className="text-gray-600 dark:text-gray-400">
                  Try adjusting your search or filter criteria
                </p>
              </div>
            ) : (
              <table className="min-w-full">
                <thead className="bg-gray-50 dark:bg-gray-700">
                  <tr>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900 dark:text-white uppercase tracking-wider">
                      User Information
                    </th>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900 dark:text-white uppercase tracking-wider">
                      Role
                    </th>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900 dark:text-white uppercase tracking-wider">
                      Status
                    </th>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900 dark:text-white uppercase tracking-wider">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
                  {filteredUsers.map(userData => (
                    <UserDataRow
                      refetch={refetch}
                      key={userData?._id}
                      userData={userData}
                    />
                  ))}
                </tbody>
              </table>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

export default ManageUsers