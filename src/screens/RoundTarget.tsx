import React from 'react';
import { motion } from 'framer-motion';
import { Target, Users, Zap, Timer, ChevronRight } from 'lucide-react';
import { cn } from '../utils/cn';

interface RoundTargetProps {
  onContinue: () => void;
}

export const RoundTarget = ({ onContinue }: RoundTargetProps) => {
  const containerVariants = {
    initial: { opacity: 0 },
    animate: { 
      opacity: 1,
      transition: { staggerChildren: 0.15 }
    }
  };

  const itemVariants = {
    initial: { scale: 0.9, opacity: 0 },
    animate: { scale: 1, opacity: 1 }
  };

  return (
    <motion.div 
      className="px-6 flex flex-col items-center justify-center min-h-screen bg-[#07070E] relative overflow-hidden text-center"
      variants={containerVariants}
      initial="initial"
      animate="animate"
    >
      {/* Cinematic Pulse Background */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full">
        <div className="absolute inset-0 bg-phantom-crimson/5 rounded-full blur-[120px] animate-pulse" />
        <div className="absolute inset-0 opacity-[0.05] pointer-events-none" 
             style={{ backgroundImage: 'radial-gradient(#fff 1px, transparent 1px)', backgroundSize: '30px 30px' }} />
      </div>

      <motion.div variants={itemVariants} className="relative mb-12">
        <div className="w-32 h-32 rounded-full border-2 border-phantom-crimson/30 flex items-center justify-center relative">
          <div className="absolute inset-0 rounded-full border border-phantom-crimson animate-ping opacity-20" />
          <Target className="text-phantom-crimson" size={48} />
        </div>
        <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 bg-phantom-crimson px-3 py-1 rounded-full">
          <span className="text-[10px] font-black text-white uppercase tracking-tighter">PHASE 02</span>
        </div>
      </motion.div>

      <motion.div variants={itemVariants} className="space-y-4 mb-16 relative z-10">
        <h2 className="text-phantom-crimson text-[12px] font-black tracking-[0.6em] uppercase">Target Acquisition</h2>
        <h1 className="text-5xl font-black tracking-tighter text-white uppercase italic">15 Tokens</h1>
        <p className="text-white/40 text-sm font-medium max-w-[240px] mx-auto leading-relaxed">
          Collect the minimum required tokens to advance. Failure results in immediate liquidation.
        </p>
      </motion.div>

      {/* Live Status HUD */}
      <motion.div variants={itemVariants} className="grid grid-cols-2 gap-4 w-full max-w-sm mb-12">
        <div className="phantom-card p-6 bg-white/[0.02] border-white/5">
          <Users className="text-white/20 mb-3 mx-auto" size={20} />
          <p className="text-[10px] font-black text-white/20 uppercase tracking-widest mb-1">Alive</p>
          <p className="text-2xl font-black text-white italic">84</p>
        </div>
        <div className="phantom-card p-6 bg-white/[0.02] border-white/5">
          <Timer className="text-white/20 mb-3 mx-auto" size={20} />
          <p className="text-[10px] font-black text-white/20 uppercase tracking-widest mb-1">Window</p>
          <p className="text-2xl font-black text-white italic">03:00</p>
        </div>
      </motion.div>

      {/* Warning Ticker */}
      <motion.div 
        variants={itemVariants}
        className="w-full bg-phantom-crimson/10 border-y border-phantom-crimson/20 py-3 mb-16 overflow-hidden flex"
      >
        <div className="flex animate-marquee whitespace-nowrap">
          {[1, 2, 3].map((i) => (
            <span key={i} className="text-[10px] font-black text-phantom-crimson uppercase tracking-[0.3em] mx-4">
              /// HIGH STAKES ENVIRONMENT /// NO REFUNDS /// SURVIVAL MANDATORY ///
            </span>
          ))}
        </div>
      </motion.div>

      <motion.button 
        variants={itemVariants}
        whileTap={{ scale: 0.96 }}
        onClick={onContinue}
        className="w-full max-w-xs h-16 bg-phantom-crimson text-white rounded-2xl flex items-center justify-center gap-3 shadow-[0_10px_40px_rgba(192,57,43,0.3)] group"
      >
        <Zap size={20} fill="currentColor" />
        <span className="text-[16px] font-black uppercase tracking-tight">Enter Arena</span>
        <ChevronRight size={20} className="group-hover:translate-x-1 transition-transform" />
      </motion.button>
    </motion.div>
  );
};
