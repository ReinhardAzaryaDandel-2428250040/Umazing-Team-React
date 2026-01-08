import React from 'react'
import { motion } from 'framer-motion'

export default function Modal({ open, onClose, children, title }){
  if(!open) return null
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div className="absolute inset-0 bg-black/50" onClick={onClose}></div>
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.95 }}
        transition={{ duration: 0.18 }}
        className="relative bg-white rounded-xl shadow-2xl max-w-xl w-full p-6 mx-4"
      >
        <div className="flex items-start justify-between gap-4">
          <h3 className="text-lg font-bold">{title}</h3>
          <button onClick={onClose} className="text-slate-500 hover:text-slate-800">Close</button>
        </div>
        <div className="mt-4">{children}</div>
      </motion.div>
    </div>
  )
}
