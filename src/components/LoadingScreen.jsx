
    import React from 'react';
    import { motion } from 'framer-motion';

    const LoadingScreen = () => {
      return (
        <div className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-gradient-to-br from-slate-900 to-slate-800">
          <motion.div
            initial={{ opacity: 0, scale: 0.5, rotate: -180 }}
            animate={{ opacity: 1, scale: 1, rotate: 0 }}
            transition={{ duration: 1.5, ease: "easeInOut" }}
            className="relative w-40 h-40 sm:w-48 sm:h-48 md:w-56 md:h-56"
          >
            <div className="absolute inset-0 rounded-full bg-gradient-to-tr from-blue-600 via-blue-400 to-sky-300 opacity-80 animate-pulse"></div>
            <div className="absolute inset-2 rounded-full bg-slate-800"></div>
            <div className="absolute inset-0 flex items-center justify-center">
              <span className="text-7xl sm:text-8xl md:text-9xl font-bold text-transparent bg-clip-text bg-gradient-to-br from-amber-400 via-yellow-500 to-orange-500" style={{ fontFamily: "'Playfair Display', serif" }}>
                H
              </span>
            </div>
          </motion.div>
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.5, ease: "easeOut" }}
            className="mt-8 text-3xl sm:text-4xl font-bold text-slate-100 tracking-wider"
            style={{ fontFamily: "'Playfair Display', serif" }}
          >
            KANGO & CO PROJECT
          </motion.h1>
          <motion.div
            initial={{ width: 0 }}
            animate={{ width: "10rem" }}
            transition={{ duration: 1.5, delay: 1, ease: "easeInOut" }}
            className="mt-4 h-1 bg-gradient-to-r from-amber-400 to-orange-500 rounded-full"
          ></motion.div>
        </div>
      );
    };

    export default LoadingScreen;
  