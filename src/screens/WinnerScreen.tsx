import React from 'react';
import { motion } from 'framer-motion';
import { Trophy, Star, Share2, Home, TrendingUp, ShieldCheck } from 'lucide-react';
import { cn } from '../utils/cn';

interface WinnerScreenProps {
  stats: {
    prize: string;
    tokens: number;
    eliminations: number;
    reputation: number;
  };
  onHome: () => void;
}

export const WinnerScreen = ({ stats, onHome }: WinnerScreenProps) => {
  return (
    <div className="px-6 flex flex-col items-center justify-center min-h-screen bg-[#07070E] relative overflow-hidden text-center">
      {/* Cinematic Winner Background */}
      <div className="absolute inset-0 z-0">
         <div className="absolute inset-0 bg-black" />
         <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full bg-phantom-gold/10 blur-[150px] animate-pulse" />
         <div className="absolute inset-0 opacity-[0.05] pointer-events-none" 
              style={{ backgroundImage: 'radial-gradient(#D4AF37 1px, transparent 1px)', backgroundSize: '40px 40px' }} />
      </div>

      <motion.div 
        initial={{ scale: 0.8, opacity: 0, y: 20 }}
        animate={{ scale: 1, opacity: 1, y: 0 }}
        transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
        className="relative z-10 mb-12"
      >
        <div className="w-40 h-40 rounded-full bg-phantom-gold/20 border-2 border-phantom-gold/40 flex items-center justify-center mx-auto mb-10 shadow-[0_0_80px_rgba(212,175,55,0.4)] relative">
           <div className="absolute inset-0 rounded-full border border-phantom-gold animate-ping opacity-20" />
           <Trophy size={72} className="text-phantom-gold" />
        </div>
        <h2 className="text-phantom-gold text-[14px] font-black tracking-[1em] uppercase mb-4">Apex Secured</h2>
        <h1 className="text-7xl font-black text-white italic tracking-tighter mb-4 uppercase leading-none">Victory</h1>
        <div className="flex items-center justify-center gap-2 mb-8">
           <Star size={14} className="text-phantom-gold fill-phantom-gold" />
           <Star size={14} className="text-phantom-gold fill-phantom-gold" />
           <Star size={14} className="text-phantom-gold fill-phantom-gold" />
           <Star size={14} className="text-phantom-gold fill-phantom-gold" />
           <Star size={14} className="text-phantom-gold fill-phantom-gold" />
        </div>
      </motion.div>

      {/* Prize HUD */}
      <motion.div 
        initial={{ y: 30, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.5, duration: 0.6 }}
        className="phantom-card p-10 rounded-[48px] border-phantom-gold/30 bg-phantom-gold/[0.03] w-full max-w-sm mb-12 relative z-10"
      >
         <p className="text-[11px] font-black text-white/40 uppercase tracking-[0.4em] mb-4">Total Harvest</p>
         <h3 className="text-5xl font-black text-white mb-8 tracking-tighter italic">{stats.prize}</h3>
         
         <div className="grid grid-cols-3 gap-4 border-t border-white/5 pt-8">
            <div>
               <p className="text-[14px] font-black text-white mb-1">{stats.tokens}</p>
               <p className="text-[8px] font-black text-white/30 uppercase">Tokens</p>
            </div>
            <div className="border-x border-white/5">
               <p className="text-[14px] font-black text-white mb-1">{stats.eliminations}</p>
               <p className="text-[8px] font-black text-white/30 uppercase">Kills</p>
            </div>
            <div>
               <p className="text-[14px] font-black text-phantom-emerald mb-1">+{stats.reputation}</p>
               <p className="text-[8px] font-black text-white/30 uppercase">Rep</p>
            </div>
         </div>
      </motion.div>

      {/* Actions */}
      <div className="w-full max-w-xs space-y-4 relative z-10">
         <motion.button 
           whileTap={{ scale: 0.96 }}
           className="w-full h-18 gold-button rounded-2xl flex items-center justify-center gap-3 font-black uppercase tracking-tight shadow-[0_10px_40px_rgba(212,175,55,0.3)]"
         >
            <Share2 size={20} />
            Broadcast Victory
         </motion.button>
         
         <motion.button 
           whileTap={{ scale: 0.96 }}
           onClick={onHome}
           className="w-full h-18 bg-white/5 border border-white/10 text-white rounded-2xl flex items-center justify-center gap-3 font-black uppercase tracking-tight"
         >
            <Home size={20} />
            Return to HQ
         </motion.button>
      </div>
    </div>
  );
};
