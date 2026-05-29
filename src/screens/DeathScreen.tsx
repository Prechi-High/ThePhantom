import React from 'react';
import { motion } from 'framer-motion';
import { Skull, AlertTriangle, RefreshCcw, Home, LogOut } from 'lucide-react';
import { cn } from '../utils/cn';

interface DeathScreenProps {
  stats: {
    placement: number;
    tokens: number;
    eliminatedBy: string;
    round: number;
  };
  onRestart: () => void;
  onHome: () => void;
}

export const DeathScreen = ({ stats, onRestart, onHome }: DeathScreenProps) => {
  return (
    <div className="px-6 flex flex-col items-center justify-center min-h-screen bg-[#07070E] relative overflow-hidden text-center">
      {/* Cinematic Death Background */}
      <div className="absolute inset-0 z-0">
         <div className="absolute inset-0 bg-black" />
         <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full bg-phantom-crimson/10 blur-[150px]" />
      </div>

      <motion.div 
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="relative z-10 mb-12"
      >
        <div className="w-32 h-32 rounded-full bg-phantom-crimson/20 border border-phantom-crimson/40 flex items-center justify-center mx-auto mb-8 shadow-[0_0_60px_rgba(192,57,43,0.4)]">
           <Skull size={56} className="text-phantom-crimson" />
        </div>
        <h2 className="text-phantom-crimson text-[14px] font-black tracking-[0.8em] uppercase mb-4">Eliminated</h2>
        <h1 className="text-6xl font-black text-white italic tracking-tighter mb-4 uppercase">Dead End</h1>
        <p className="text-white/40 text-[11px] font-bold uppercase tracking-[0.3em] max-w-[240px] mx-auto">
          Your journey in Death Hour has been terminated by @{stats.eliminatedBy}.
        </p>
      </motion.div>

      {/* Stats Summary */}
      <motion.div 
        initial={{ y: 40, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.4, duration: 0.5 }}
        className="grid grid-cols-2 gap-4 w-full max-w-sm mb-16 relative z-10"
      >
         <div className="phantom-card p-6 bg-white/[0.02] border-white/5">
            <p className="text-[10px] font-black text-white/20 uppercase tracking-widest mb-1">Placement</p>
            <p className="text-3xl font-black text-white italic">#{stats.placement}</p>
         </div>
         <div className="phantom-card p-6 bg-white/[0.02] border-white/5">
            <p className="text-[10px] font-black text-white/20 uppercase tracking-widest mb-1">Tokens</p>
            <p className="text-3xl font-black text-white italic">{stats.tokens}</p>
         </div>
         <div className="phantom-card p-6 bg-white/[0.02] border-white/5">
            <p className="text-[10px] font-black text-white/20 uppercase tracking-widest mb-1">Round</p>
            <p className="text-3xl font-black text-white italic">{stats.round}</p>
         </div>
         <div className="phantom-card p-6 bg-white/[0.02] border-white/5 flex items-center justify-center">
            <AlertTriangle className="text-phantom-crimson" size={32} />
         </div>
      </motion.div>

      {/* Actions */}
      <div className="w-full max-w-xs space-y-4 relative z-10">
         <motion.button 
           whileTap={{ scale: 0.96 }}
           onClick={onRestart}
           className="w-full h-16 bg-white text-black rounded-2xl flex items-center justify-center gap-3 font-black uppercase tracking-tight shadow-xl"
         >
            <RefreshCcw size={20} />
            Find New Session
         </motion.button>
         
         <motion.button 
           whileTap={{ scale: 0.96 }}
           onClick={onHome}
           className="w-full h-16 bg-white/5 border border-white/10 text-white rounded-2xl flex items-center justify-center gap-3 font-black uppercase tracking-tight"
         >
            <Home size={20} />
            Back to Command
         </motion.button>
      </div>
    </div>
  );
};
