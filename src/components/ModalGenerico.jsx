// src/components/Modal.jsx

import { Fragment } from 'react';
import { Dialog, Transition } from '@headlessui/react';

const ModalGenerico = ({ isOpen, onClose, title, children }) => {
    return (
        <Transition.Root show={isOpen} as={Fragment}>
            <Dialog as="div" className="relative z-40" onClose={onClose}>
                {/* Overlay */}
                <Transition.Child as={Fragment} enter="ease-out duration-300" enterFrom="opacity-0" enterTo="opacity-100" leave="ease-in duration-200" leaveFrom="opacity-100" leaveTo="opacity-0">
                    <div className="fixed inset-0 bg-black bg-opacity-75 transition-opacity" />
                </Transition.Child>

                <div className="fixed inset-0 z-10 overflow-y-auto">
                    <div className="flex min-h-full items-center justify-center p-4 text-center sm:p-0">
                        {/* Panel del Modal */}
                        <Transition.Child as={Fragment} enter="ease-out duration-300" enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95" enterTo="opacity-100 translate-y-0 sm:scale-100" leave="ease-in duration-200" leaveFrom="opacity-100 translate-y-0 sm:scale-100" leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95">
                            <Dialog.Panel className="relative w-full max-w-xl transform overflow-hidden rounded-lg bg-slate-800 border border-slate-700 text-left shadow-xl transition-all">
                                <div className="p-8">
                                    <Dialog.Title as="h3" className="text-2xl font-black leading-6 text-slate-100 mb-6">
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
    );
};

export default ModalGenerico;