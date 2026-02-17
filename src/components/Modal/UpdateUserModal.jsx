import PropTypes from 'prop-types'
import React, { Fragment, useState } from 'react'
import {
  Dialog,
  Listbox,
  Transition,
  TransitionChild,
  DialogTitle,
  DialogPanel,
  ListboxButton,
  ListboxOption,
  ListboxOptions,
} from '@headlessui/react'
import { BsCheckLg } from 'react-icons/bs'
import { AiOutlineDown } from 'react-icons/ai'
import { FaUserShield, FaCrown, FaUser, FaTimes, FaCheck } from 'react-icons/fa'

const roles = [
  { 
    value: 'student', 
    label: 'Student', 
    icon: FaUser, 
    color: 'text-green-600',
    bgColor: 'bg-green-50 dark:bg-green-900/20',
    description: 'Can view and apply for scholarships'
  },
  { 
    value: 'moderator', 
    label: 'Moderator', 
    icon: FaUserShield, 
    color: 'text-blue-600',
    bgColor: 'bg-blue-50 dark:bg-blue-900/20',
    description: 'Can manage scholarships and applications'
  },
  { 
    value: 'admin', 
    label: 'Administrator', 
    icon: FaCrown, 
    color: 'text-red-600',
    bgColor: 'bg-red-50 dark:bg-red-900/20',
    description: 'Full system access and user management'
  }
]

const UpdateUserModal = ({ setIsOpen, isOpen, role, updateRole }) => {
  // Map old "customer" role to "student"
  const mappedRole = role === 'customer' ? 'student' : role
  const [selected, setSelected] = useState(mappedRole)
  const [isLoading, setIsLoading] = useState(false)

  const handleUpdateRole = async () => {
    setIsLoading(true)
    try {
      await updateRole(selected)
    } finally {
      setIsLoading(false)
    }
  }

  const selectedRole = roles.find(r => r.value === selected)

  return (
    <Transition appear show={isOpen} as={Fragment}>
      <Dialog
        as='div'
        className='relative z-50'
        onClose={() => setIsOpen(false)}
      >
        <TransitionChild
          as={Fragment}
          enter='ease-out duration-300'
          enterFrom='opacity-0'
          enterTo='opacity-100'
          leave='ease-in duration-200'
          leaveFrom='opacity-100'
          leaveTo='opacity-0'
        >
          <div className='fixed inset-0 bg-black/60 backdrop-blur-sm' />
        </TransitionChild>

        <div className='fixed inset-0 overflow-y-auto'>
          <div className='flex min-h-full items-center justify-center p-4 text-center'>
            <TransitionChild
              as={Fragment}
              enter='ease-out duration-300'
              enterFrom='opacity-0 scale-95'
              enterTo='opacity-100 scale-100'
              leave='ease-in duration-200'
              leaveFrom='opacity-100 scale-100'
              leaveTo='opacity-0 scale-95'
            >
              <DialogPanel className='w-full max-w-md transform overflow-hidden rounded-2xl bg-white dark:bg-gray-800 shadow-2xl transition-all border border-gray-200 dark:border-gray-700'>
                {/* Header */}
                <div className="flex items-center justify-between p-6 border-b border-gray-200 dark:border-gray-700">
                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-full flex items-center justify-center">
                      <FaUserShield className="w-5 h-5 text-white" />
                    </div>
                    <div className="text-left">
                      <DialogTitle className='text-lg font-semibold text-gray-900 dark:text-white'>
                        Update User Role
                      </DialogTitle>
                      <p className="text-sm text-gray-600 dark:text-gray-400">
                        Change user permissions and access level
                      </p>
                    </div>
                  </div>
                  <button
                    onClick={() => setIsOpen(false)}
                    className="p-2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
                  >
                    <FaTimes className="w-4 h-4" />
                  </button>
                </div>

                {/* Content */}
                <div className='p-6 space-y-6'>
                  {/* Current Role Display */}
                  <div className="bg-gray-50 dark:bg-gray-700 rounded-xl p-4">
                    <p className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Current Role
                    </p>
                    <div className="flex items-center space-x-3">
                      {roles.find(r => r.value === role) && (
                        <>
                          <div className={`w-8 h-8 ${roles.find(r => r.value === role).bgColor} rounded-lg flex items-center justify-center`}>
                            {React.createElement(roles.find(r => r.value === role).icon, {
                              className: `w-4 h-4 ${roles.find(r => r.value === role).color}`
                            })}
                          </div>
                          <span className="font-medium text-gray-900 dark:text-white capitalize">
                            {roles.find(r => r.value === role).label}
                          </span>
                        </>
                      )}
                    </div>
                  </div>

                  {/* Role Selection */}
                  <div className="space-y-3">
                    <label className="text-sm font-medium text-gray-700 dark:text-gray-300">
                      Select New Role
                    </label>
                    <Listbox value={selected} onChange={setSelected}>
                      <div className='relative'>
                        <ListboxButton className='relative w-full cursor-pointer rounded-xl bg-white dark:bg-gray-700 py-3 pl-4 pr-10 text-left shadow-sm border border-gray-300 dark:border-gray-600 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-colors'>
                          <div className="flex items-center space-x-3">
                            {selectedRole && (
                              <>
                                <div className={`w-6 h-6 ${selectedRole.bgColor} rounded-lg flex items-center justify-center`}>
                                  <selectedRole.icon className={`w-3 h-3 ${selectedRole.color}`} />
                                </div>
                                <span className='block truncate font-medium text-gray-900 dark:text-white'>
                                  {selectedRole.label}
                                </span>
                              </>
                            )}
                          </div>
                          <span className='pointer-events-none absolute inset-y-0 right-0 flex items-center pr-3'>
                            <AiOutlineDown className='h-4 w-4 text-gray-400' />
                          </span>
                        </ListboxButton>
                        
                        <Transition
                          as={Fragment}
                          leave='transition ease-in duration-100'
                          leaveFrom='opacity-100'
                          leaveTo='opacity-0'
                        >
                          <ListboxOptions className='absolute z-10 mt-2 max-h-60 w-full overflow-auto rounded-xl bg-white dark:bg-gray-700 py-1 shadow-lg ring-1 ring-black/5 border border-gray-200 dark:border-gray-600 focus:outline-none'>
                            {roles.map((roleOption) => (
                              <ListboxOption
                                key={roleOption.value}
                                value={roleOption.value}
                                className='relative cursor-pointer select-none py-3 px-4 hover:bg-gray-50 dark:hover:bg-gray-600 transition-colors'
                              >
                                {({ selected }) => (
                                  <div className="flex items-center justify-between">
                                    <div className="flex items-center space-x-3">
                                      <div className={`w-8 h-8 ${roleOption.bgColor} rounded-lg flex items-center justify-center`}>
                                        <roleOption.icon className={`w-4 h-4 ${roleOption.color}`} />
                                      </div>
                                      <div>
                                        <span className={`block text-sm font-medium ${selected ? 'text-indigo-600 dark:text-indigo-400' : 'text-gray-900 dark:text-white'}`}>
                                          {roleOption.label}
                                        </span>
                                        <span className="block text-xs text-gray-500 dark:text-gray-400">
                                          {roleOption.description}
                                        </span>
                                      </div>
                                    </div>
                                    {selected && (
                                      <BsCheckLg className='h-4 w-4 text-indigo-600 dark:text-indigo-400' />
                                    )}
                                  </div>
                                )}
                              </ListboxOption>
                            ))}
                          </ListboxOptions>
                        </Transition>
                      </div>
                    </Listbox>
                  </div>

                  {/* Warning for role changes */}
                  {selected !== role && (
                    <div className="bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-800 rounded-xl p-4">
                      <p className="text-sm text-yellow-800 dark:text-yellow-200">
                        <strong>Warning:</strong> Changing user roles will immediately affect their access permissions.
                      </p>
                    </div>
                  )}
                </div>

                {/* Actions */}
                <div className='flex justify-end space-x-3 p-6 border-t border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-700/50'>
                  <button
                    type='button'
                    className='px-6 py-2 text-sm font-medium text-gray-700 dark:text-gray-300 bg-white dark:bg-gray-600 border border-gray-300 dark:border-gray-500 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-500 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2 transition-colors'
                    onClick={() => setIsOpen(false)}
                    disabled={isLoading}
                  >
                    Cancel
                  </button>
                  <button
                    onClick={handleUpdateRole}
                    disabled={isLoading || selected === role}
                    className='inline-flex items-center px-6 py-2 text-sm font-medium text-white bg-gradient-to-r from-indigo-600 to-purple-600 rounded-lg hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed transform hover:scale-105 transition-all duration-200'
                  >
                    {isLoading ? (
                      <>
                        <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                        Updating...
                      </>
                    ) : (
                      <>
                        <FaCheck className="w-4 h-4 mr-2" />
                        Update Role
                      </>
                    )}
                  </button>
                </div>
              </DialogPanel>
            </TransitionChild>
          </div>
        </div>
      </Dialog>
    </Transition>
  )
}

UpdateUserModal.propTypes = {
  user: PropTypes.object,
  modalHandler: PropTypes.func,
  setIsOpen: PropTypes.func,
  updateRole: PropTypes.func,
  isOpen: PropTypes.bool,
  role: PropTypes.string,
}

export default UpdateUserModal