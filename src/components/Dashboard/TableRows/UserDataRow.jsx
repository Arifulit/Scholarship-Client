import { useState } from 'react'
import UpdateUserModal from '../../Modal/UpdateUserModal'
import PropTypes from 'prop-types'
import useAxiosSecure from '../../../hooks/useAxiosSecure'
import { toast } from 'react-hot-toast'
import { FaUser, FaEnvelope, FaEdit, FaUserShield, FaCrown, FaUserFriends } from 'react-icons/fa'

const UserDataRow = ({ userData, refetch }) => {
  const axiosSecure = useAxiosSecure()
  const [isOpen, setIsOpen] = useState(false)
  const { email, role: rawRole, status, photoURL, displayName, name, firstName, lastName } = userData || {}
  
  // Map old "customer" role to "student" for display
  const role = rawRole === 'customer' ? 'student' : rawRole

  // Enhanced name display logic
  const getDisplayName = () => {
    // Try different name sources in order of preference
    if (displayName && displayName.trim()) return displayName.trim()
    if (name && name.trim()) return name.trim()
    if (firstName || lastName) {
      const fullName = `${firstName || ''} ${lastName || ''}`.trim()
      if (fullName) return fullName
    }
    // Extract name from email as last resort
    if (email) {
      const emailName = email.split('@')[0]
      // Convert email username to readable format (remove dots, underscores, numbers)
      const cleanName = emailName
        .replace(/[._]/g, ' ')
        .replace(/\d+/g, '')
        .split(' ')
        .map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
        .join(' ')
        .trim()
      
      if (cleanName) return cleanName
    }
    return 'Unknown User'
  }

  const displayUserName = getDisplayName()

  // handle user role update
  const updateRole = async selectedRole => {
    if (role === selectedRole) return
    try {
      await axiosSecure.patch(`/user/role/${email}`, {
        role: selectedRole,
      })
      toast.success('Role updated successfully!')
      refetch()
    } catch (err) {
      toast.error(err?.response?.data)
      console.log(err)
    } finally {
      setIsOpen(false)
    }
  }

  const getRoleIcon = (userRole) => {
    switch (userRole) {
      case 'admin':
        return <FaCrown className="w-4 h-4 text-red-500" />
      case 'moderator':
        return <FaUserShield className="w-4 h-4 text-blue-500" />
      case 'student':
        return <FaUserFriends className="w-4 h-4 text-green-500" />
      default:
        return <FaUser className="w-4 h-4 text-gray-500" />
    }
  }

  const getRoleBadgeColor = (userRole) => {
    switch (userRole) {
      case 'admin':
        return 'bg-red-100 text-red-800 dark:bg-red-900/20 dark:text-red-300'
      case 'moderator':
        return 'bg-blue-100 text-blue-800 dark:bg-blue-900/20 dark:text-blue-300'
      case 'student':
        return 'bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-300'
      default:
        return 'bg-gray-100 text-gray-800 dark:bg-gray-900/20 dark:text-gray-300'
    }
  }

  const getStatusColor = (userStatus) => {
    switch (userStatus) {
      case 'Requested':
        return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/20 dark:text-yellow-300'
      case 'Active':
        return 'bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-300'
      default:
        return 'bg-red-100 text-red-800 dark:bg-red-900/20 dark:text-red-300'
    }
  }

  return (
    <tr className="hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors duration-200">
      {/* User Information */}
      <td className='px-6 py-4'>
        <div className="flex items-center space-x-3">
          <div className="flex-shrink-0">
            {photoURL ? (
              <img
                className="w-10 h-10 rounded-full object-cover border-2 border-gray-200 dark:border-gray-600"
                src={photoURL}
                alt={displayUserName}
                onError={(e) => {
                  e.target.style.display = 'none'
                  e.target.nextSibling.style.display = 'flex'
                }}
              />
            ) : null}
            <div 
              className={`w-10 h-10 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center ${photoURL ? 'hidden' : 'flex'}`}
              title={displayUserName}
            >
              {displayUserName && displayUserName !== 'Unknown User' ? (
                <span className="text-white font-semibold text-sm">
                  {displayUserName.split(' ').map(n => n[0]).join('').slice(0, 2).toUpperCase()}
                </span>
              ) : (
                <FaUser className="w-5 h-5 text-white" />
              )}
            </div>
          </div>
          <div className="min-w-0 flex-1">
            <div className="flex items-center gap-2">
              <p className="text-sm font-semibold text-gray-900 dark:text-white truncate">
                {displayUserName}
              </p>
              {/* Show verification badge if user has proper displayName */}
              {displayName && displayName.trim() && (
                <span className="inline-flex items-center px-1.5 py-0.5 rounded text-xs font-medium bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-300">
                  ✓
                </span>
              )}
            </div>
            <div className="flex items-center text-sm text-gray-600 dark:text-gray-400 mt-1">
              <FaEnvelope className="w-3 h-3 mr-1.5 flex-shrink-0" />
              <span className="truncate">{email || 'No email provided'}</span>
            </div>
          </div>
        </div>
      </td>

      {/* Role */}
      <td className='px-6 py-4'>
        <div className="flex items-center">
          <span className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${getRoleBadgeColor(role)}`}>
            {getRoleIcon(role)}
            <span className="ml-2 capitalize">{role}</span>
          </span>
        </div>
      </td>

      {/* Status */}
      <td className='px-6 py-4'>
        {status ? (
          <span className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(status)}`}>
            <div className={`w-2 h-2 rounded-full mr-2 ${
              status === 'Requested' ? 'bg-yellow-500' : 
              status === 'Active' ? 'bg-green-500' : 'bg-red-500'
            }`}></div>
            {status}
          </span>
        ) : (
          <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-red-100 text-red-800 dark:bg-red-900/20 dark:text-red-300">
            <div className="w-2 h-2 rounded-full mr-2 bg-red-500"></div>
            Unavailable
          </span>
        )}
      </td>

      {/* Actions */}
      <td className='px-6 py-4'>
        <button
          onClick={() => setIsOpen(true)}
          className="inline-flex items-center px-4 py-2 bg-gradient-to-r from-indigo-500 to-purple-600 text-white text-sm font-medium rounded-lg hover:shadow-lg transform hover:scale-105 transition-all duration-300"
        >
          <FaEdit className="w-4 h-4 mr-2" />
          Update Role
        </button>
        
        {/* Modal */}
        <UpdateUserModal
          updateRole={updateRole}
          role={role}
          isOpen={isOpen}
          setIsOpen={setIsOpen}
        />
      </td>
    </tr>
  )
}

UserDataRow.propTypes = {
  userData: PropTypes.object,
  refetch: PropTypes.func,
}

export default UserDataRow