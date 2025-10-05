"use client"

// src/components/ModalEliminacion.jsx

import { Fragment } from "react"
import { Dialog, Transition } from "@headlessui/react"
import { BotonCancelacion } from "./Boton"
import Spinner from "./Spinner"

// Icono de advertencia para el modal
const IconoAdvertencia = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    className="h-12 w-12 text-rose-400 drop-shadow-lg"
    fill="none"
    viewBox="0 0 24 24"
    stroke="currentColor"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
    />
  </svg>
)

const ModalEliminacion = ({ isOpen, onClose, onConfirm, tareaNombre, cargando }) => {
  return (
    <Transition show={isOpen} as={Fragment}>
      <Dialog as="div" className="relative z-50" onClose={onClose}>
        {/* Overlay del fondo with backdrop blur */}
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
            {/* Panel del modal */}
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
                className="relative transform overflow-hidden rounded-2xl 
                                                     bg-gradient-to-br from-slate-800/95 to-slate-900/95 
                                                     backdrop-blur-xl border border-slate-700/50 
                                                     px-4 pt-5 pb-4 text-left shadow-2xl shadow-black/50
                                                     transition-all sm:my-8 sm:w-full sm:max-w-lg sm:p-8"
              >
                {/* Subtle gradient overlay */}
                <div className="absolute inset-0 bg-gradient-to-br from-white/[0.02] to-transparent pointer-events-none" />

                <div className="relative sm:flex sm:items-start">
                  <div
                    className="mx-auto flex h-16 w-16 flex-shrink-0 items-center justify-center 
                                                  rounded-full bg-gradient-to-br from-rose-900/50 to-rose-800/30
                                                  ring-2 ring-rose-500/30 shadow-lg shadow-rose-500/20
                                                  sm:mx-0 sm:h-14 sm:w-14"
                  >
                    <IconoAdvertencia />
                  </div>
                  <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
                    <Dialog.Title as="h3" className="text-2xl font-black leading-tight text-slate-50">
                      Eliminar Tarea
                    </Dialog.Title>
                    <div className="mt-4">
                      <p className="text-base text-slate-300 leading-relaxed">
                        ¿Estás seguro de que deseas eliminar la tarea:{" "}
                        <strong className="text-teal-400 font-bold">{`"${tareaNombre}"`}</strong>?
                      </p>
                      <p className="text-sm text-slate-400 mt-3 leading-relaxed">
                        Esta acción es permanente y no se puede deshacer.
                      </p>
                    </div>
                  </div>
                </div>

                {/* Botones de acción */}
                <div className="relative mt-6 sm:flex sm:flex-row-reverse gap-3">
                  <button
                    type="button"
                    className="w-full md:w-auto bg-gradient-to-r from-rose-600 to-rose-700 
                                                 hover:from-rose-700 hover:to-rose-800
                                                 focus:ring-4 focus:ring-rose-500/30
                                                 text-white font-bold py-3 px-8 rounded-xl
                                                 transition-all duration-300 ease-out transform 
                                                 hover:scale-105 hover:shadow-lg hover:shadow-rose-500/30
                                                 focus:outline-none 
                                                 disabled:from-slate-700 disabled:to-slate-800 
                                                 disabled:scale-100 disabled:cursor-not-allowed 
                                                 disabled:shadow-none disabled:ring-0"
                    onClick={onConfirm}
                    disabled={cargando}
                  >
                    {cargando ? (
                      <div className="flex justify-center items-center gap-3">
                        <Spinner />
                        <span>Eliminando...</span>
                      </div>
                    ) : (
                      "Sí, Eliminar"
                    )}
                  </button>
                  <BotonCancelacion type="button" onClick={onClose}>
                    Cancelar
                  </BotonCancelacion>
                </div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition>
  )
}

export default ModalEliminacion
