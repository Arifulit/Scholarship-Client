import {
  Dialog,
  Transition,
  TransitionChild,
  DialogPanel,
  DialogTitle,
} from '@headlessui/react'
import { Fragment } from 'react'
import { HiExclamationTriangle, HiX } from 'react-icons/hi'
import { FiTrash2, FiX } from 'react-icons/fi'
import PropTypes from 'prop-types'

const DeleteModal = ({ 
  closeModal, 
  isOpen, 
  handleDelete, 
  title = "Delete Item",
  message = "Are you sure you want to delete this item? This action cannot be undone.",
  confirmText = "Delete",
  cancelText = "Cancel"
}) => {
  return (
    <Transition appear show={isOpen} as={Fragment}>
      <Dialog as='div' className='relative z-50' onClose={closeModal}>
        {/* Backdrop */}
        <TransitionChild
          as={Fragment}
          enter='ease-out duration-300'
          enterFrom='opacity-0'
          enterTo='opacity-100'
          leave='ease-in duration-200'
          leaveFrom='opacity-100'
          leaveTo='opacity-0'
        >
          <div className='fixed inset-0 bg-black/50 backdrop-blur-sm' />
        </TransitionChild>

        <div className='fixed inset-0 overflow-y-auto'>
          <div className='flex min-h-full items-center justify-center p-4'>
            <TransitionChild
              as={Fragment}
              enter='ease-out duration-300'
              enterFrom='opacity-0 scale-95 translate-y-4'
              enterTo='opacity-100 scale-100 translate-y-0'
              leave='ease-in duration-200'
              leaveFrom='opacity-100 scale-100 translate-y-0'
              leaveTo='opacity-0 scale-95 translate-y-4'
            >
              <DialogPanel className='w-full max-w-md transform overflow-hidden rounded-2xl bg-white shadow-2xl transition-all border border-gray-200'>
                {/* Header */}
                <div className='relative p-6 pb-4'>
                  <button
                    onClick={closeModal}
                    className='absolute top-4 right-4 p-1 text-gray-400 hover:text-gray-600 transition-colors duration-200'
                  >
                    <HiX className='w-5 h-5' />
                  </button>
                  
                  <div className='flex items-center gap-4'>
                    <div className='flex-shrink-0'>
                      <div className='w-12 h-12 bg-red-100 rounded-full flex items-center justify-center'>
                        <HiExclamationTriangle className='w-6 h-6 text-red-600' />
                      </div>
                    </div>
                    <div className='flex-1'>
                      <DialogTitle className='text-lg font-semibold text-gray-900'>
                        {title}
                      </DialogTitle>
                    </div>
                  </div>
                </div>

                {/* Content */}
                <div className='px-6 pb-6'>
                  <p className='text-gray-600 leading-relaxed'>
                    {message}
                  </p>
                </div>

                {/* Actions */}
                <div className='bg-gray-50 px-6 py-4 flex flex-col-reverse gap-3 sm:flex-row sm:justify-end'>
                  <button
                    type='button'
                    onClick={closeModal}
                    className='inline-flex items-center justify-center gap-2 px-4 py-2.5 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2 transition-all duration-200'
                  >
                    <FiX className='w-4 h-4' />
                    {cancelText}
                  </button>
                  
                  <button
                    onClick={handleDelete}
                    type='button'
                    className='inline-flex items-center justify-center gap-2 px-4 py-2.5 text-sm font-medium text-white bg-gradient-to-r from-red-500 to-red-600 border border-transparent rounded-lg hover:from-red-600 hover:to-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 transition-all duration-200 shadow-md hover:shadow-lg transform hover:scale-105'
                  >
                    <FiTrash2 className='w-4 h-4' />
                    {confirmText}
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

DeleteModal.propTypes = {
  closeModal: PropTypes.func.isRequired,
  isOpen: PropTypes.bool.isRequired,
  handleDelete: PropTypes.func.isRequired,
  title: PropTypes.string,
  message: PropTypes.string,
  confirmText: PropTypes.string,
  cancelText: PropTypes.string,
}

export default DeleteModal
