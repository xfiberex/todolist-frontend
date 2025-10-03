"use client"

// src/components/Modal.jsx

import { Fragment } from "react"
import { Dialog, Transition } from "@headlessui/react"

const ModalGenerico = ({ isOpen, onClose, title, children }) => {
  return (
    <Transition.Root show={isOpen} as={Fragment}>
      <Dialog as="div" className="relative z-40" onClose={onClose}>
        {/* Overlay with backdrop blur */}
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-black/80 backdrop-blur-sm transition-opacity" />
        </Transition.Child>

        <div className="fixed inset-0 z-10 overflow-y-auto">
          <div className="flex min-h-full items-center justify-center p-4 text-center sm:p-0">
            {/* Panel del Modal with enhanced styling */}
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
              enterTo="opacity-100 translate-y-0 sm:scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 translate-y-0 sm:scale-100"
              leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
            >
              <Dialog.Panel
                className="relative w-full max-w-xl transform overflow-hidden rounded-2xl 
                                                     bg-gradient-to-br from-slate-800/95 to-slate-900/95 
                                                     backdrop-blur-xl border border-slate-700/50 
                                                     text-left shadow-2xl shadow-black/50
                                                     transition-all"
              >
                {/* Subtle gradient overlay */}
                <div className="absolute inset-0 bg-gradient-to-br from-white/[0.03] to-transparent pointer-events-none" />

                <div className="relative p-8">
                  <Dialog.Title
                    as="h3"
                    className="text-3xl font-black leading-tight text-slate-50 mb-6
                                                 bg-gradient-to-r from-slate-50 to-slate-200 bg-clip-text"
                  >
                    {title}
                  </Dialog.Title>
                  {children}
                </div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition.Root>
  )
}

export default ModalGenerico
