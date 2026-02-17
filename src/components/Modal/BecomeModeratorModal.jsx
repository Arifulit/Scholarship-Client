import PropTypes from 'prop-types'
import { Dialog, Transition } from '@headlessui/react'
import { Fragment } from 'react'

const BecomeModeratorModal = ({ closeModal, isOpen, requestHandler }) => {
  return (
    <Transition appear show={isOpen} as={Fragment}>
      <Dialog as="div" className="relative z-50" onClose={closeModal}>
        {/* Enhanced Gradient Backdrop */}
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-500"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-300"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="
            fixed inset-0 
            bg-gradient-to-br from-black/80 via-gray-900/70 to-black/80 
            before:absolute before:inset-0 
            before:bg-gradient-to-r before:from-blue-600/10 before:via-purple-600/10 before:to-pink-600/10
          " />
        </Transition.Child>

        <div className="fixed inset-0 overflow-y-auto">
          <div className="flex min-h-full items-center justify-center p-4 text-center">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-500"
              enterFrom="opacity-0 scale-90 translate-y-8"
              enterTo="opacity-100 scale-100 translate-y-0"
              leave="ease-in duration-300"
              leaveFrom="opacity-100 scale-100 translate-y-0"
              leaveTo="opacity-0 scale-95 translate-y-8"
            >
              <Dialog.Panel className="
                w-full max-w-md transform overflow-hidden 
                rounded-3xl shadow-2xl transition-all
                bg-gradient-to-br from-white via-white to-gray-50
                dark:from-gray-800 dark:via-gray-800 dark:to-gray-900
                border border-white/20 dark:border-gray-700/50
                relative
                before:absolute before:inset-0 before:rounded-3xl
                before:bg-gradient-to-br before:from-white/40 before:via-transparent before:to-transparent
                before:opacity-60 before:pointer-events-none
                after:absolute after:inset-0 after:rounded-3xl
                after:bg-gradient-to-t after:from-transparent after:via-transparent after:to-white/10
                after:pointer-events-none
              ">
                <div className="relative z-10 p-6">
                  {/* Header with Icon */}
                  <div className="text-center mb-6">
                    <div className="
                      mx-auto w-16 h-16 mb-4 rounded-full 
                      bg-gradient-to-r from-blue-500 to-purple-600 
                      flex items-center justify-center shadow-lg shadow-blue-500/25
                      animate-pulse
                    ">
                      <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} 
                          d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" 
                        />
                      </svg>
                    </div>
                    
                    {/* Enhanced Title */}
                    <Dialog.Title
                      as="h3"
                      className="
                        text-3xl font-bold text-center mb-2
                        bg-gradient-to-r from-gray-900 via-blue-800 to-purple-700
                        dark:from-white dark:via-blue-200 dark:to-purple-300
                        bg-clip-text text-transparent
                        tracking-tight
                      "
                    >
                      Become a Moderator
                    </Dialog.Title>
                    
                    <div className="w-16 h-1 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full mx-auto"></div>
                  </div>

                  {/* Enhanced Description */}
                  <div className="
                    bg-gradient-to-r from-blue-50/80 to-purple-50/80 
                    dark:from-blue-900/20 dark:to-purple-900/20
                    rounded-2xl p-6 mb-6 border border-blue-200/30 dark:border-blue-700/30
                  ">
                    <p className="text-center text-gray-700 dark:text-gray-300 leading-relaxed">
                      Please read all the terms & conditions carefully before requesting to become a 
                      <span className="font-semibold text-blue-600 dark:text-blue-400"> Moderator</span>.
                    </p>
                    
                    <div className="flex items-center justify-center mt-4 space-x-6 text-sm text-gray-500 dark:text-gray-400">
                      <div className="flex items-center space-x-2">
                        <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                        <span>Trusted Role</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <div className="w-2 h-2 bg-blue-500 rounded-full animate-pulse"></div>
                        <span>Special Privileges</span>
                      </div>
                    </div>
                  </div>

                  {/* Enhanced Buttons */}
                  <div className="flex justify-center gap-4">
                    <button
                      onClick={requestHandler}
                      type="button"
                      className="
                        group relative px-8 py-3 rounded-2xl font-bold text-white 
                        bg-gradient-to-r from-green-500 via-emerald-500 to-green-600
                        hover:from-green-600 hover:via-emerald-600 hover:to-green-700
                        shadow-lg hover:shadow-xl hover:shadow-green-500/30
                        transform hover:scale-105 hover:-translate-y-1
                        transition-all duration-300 ease-out
                        focus:outline-none focus:ring-4 focus:ring-green-400/50
                        border border-green-400/30
                        overflow-hidden
                        before:absolute before:inset-0 before:bg-gradient-to-r 
                        before:from-white/20 before:via-transparent before:to-transparent
                        before:opacity-0 hover:before:opacity-100 before:transition-opacity before:duration-300
                      "
                    >
                      <span className="relative z-10 flex items-center gap-2">
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} 
                            d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" 
                          />
                        </svg>
                        Send Request
                      </span>
                    </button>
                    
                    <button
                      type="button"
                      onClick={closeModal}
                      className="
                        group relative px-8 py-3 rounded-2xl font-bold text-white 
                        bg-gradient-to-r from-red-500 via-rose-500 to-red-600
                        hover:from-red-600 hover:via-rose-600 hover:to-red-700
                        shadow-lg hover:shadow-xl hover:shadow-red-500/30
                        transform hover:scale-105 hover:-translate-y-1
                        transition-all duration-300 ease-out
                        focus:outline-none focus:ring-4 focus:ring-red-400/50
                        border border-red-400/30
                        overflow-hidden
                        before:absolute before:inset-0 before:bg-gradient-to-r 
                        before:from-white/20 before:via-transparent before:to-transparent
                        before:opacity-0 hover:before:opacity-100 before:transition-opacity before:duration-300
                      "
                    >
                      <span className="relative z-10 flex items-center gap-2">
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} 
                            d="M6 18L18 6M6 6l12 12" 
                          />
                        </svg>
                        Cancel
                      </span>
                    </button>
                  </div>
                </div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition>
  )
}

BecomeModeratorModal.propTypes = {
  closeModal: PropTypes.func.isRequired,
  requestHandler: PropTypes.func.isRequired,
  isOpen: PropTypes.bool.isRequired,
}

export default BecomeModeratorModal
