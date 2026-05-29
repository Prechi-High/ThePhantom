import React from 'react';
import { motion } from 'framer-motion';
import { Eye, TrendingUp, Users, Target, Zap, ChevronRight, BarChart3, Shield } from 'lucide-react';
import { cn } from '../utils/cn';

export const SpectatorVantage = () => {
  const containerVariants = {
    initial: { opacity: 0 },
    animate: { 
      opacity: 1,
      transition: { staggerChildren: 0.1 }
    }
  };

  const itemVariants = {
    initial: { y: 20, opacity: 0 },
    animate: { y: 0, opacity: 1 }
  };

  return (
    <motion.div 
      className="px-6 pt-12 pb-32 min-h-screen bg-[#07070E] relative overflow-x-hidden"
      variants={containerVariants}
      initial="initial"
      animate="animate"
    >
      {/* Cinematic Vantage Overlay */}
      <div className="absolute inset-0 z-0 pointer-events-none">
         <div className="absolute top-0 left-0 w-full h-32 bg-gradient-to-b from-phantom-gold/10 to-transparent" />
         <div className="absolute inset-0 opacity-[0.05]" 
              style={{ backgroundImage: 'linear-gradient(#fff 1px, transparent 1px), linear-gradient(90deg, #fff 1px, transparent 1px)', backgroundSize: '60px 60px' }} />
      </div>

      <header className="mb-10 flex items-center justify-between relative z-10">
        <div>
          <h2 className="text-phantom-gold text-[11px] font-black tracking-[0.4em] uppercase mb-1">Phantom's Vantage</h2>
          <h1 className="text-3xl font-black tracking-tight text-white uppercase italic">Spectator Terminal</h1>
        </div>
        <div className="w-12 h-12 rounded-full glass-panel flex items-center justify-center border-phantom-gold/20 shadow-[0_0_20px_rgba(212,175,55,0.2)]">
          <Eye className="text-phantom-gold" size={24} />
        </div>
      </header>

      {/* Live Odds & Oracle Board */}
      <motion.div variants={itemVariants} className="phantom-card p-8 rounded-[40px] mb-8 border-phantom-gold/20 bg-phantom-gold/[0.02] relative overflow-hidden">
         <div className="flex items-center justify-between mb-8">
            <div className="flex items-center gap-3">
               <div className="w-2 h-2 bg-phantom-emerald rounded-full animate-pulse shadow-[0_0_8px_rgba(46,204,113,0.6)]" />
               <span className="text-[10px] font-black text-white/40 uppercase tracking-widest">Oracle Stream Live</span>
            </div>
            <BarChart3 size={16} className="text-phantom-gold" />
         </div>

         <div className="grid grid-cols-2 gap-6">
            <div>
               <p className="text-[10px] font-black text-white/20 uppercase tracking-widest mb-1">Total Pot</p>
               <p className="text-2xl font-black text-white">$142,500</p>
            </div>
            <div className="text-right">
               <p className="text-[10px] font-black text-white/20 uppercase tracking-widest mb-1">Top Multiplier</p>
               <p className="text-2xl font-black text-phantom-gold">14.2x</p>
            </div>
         </div>

         <div className="mt-8 h-1 bg-white/5 rounded-full overflow-hidden">
            <motion.div 
               initial={{ width: 0 }}
               animate={{ width: '65%' }}
               transition={{ duration: 2, ease: "easeOut" }}
               className="h-full bg-phantom-gold shadow-[0_0_10px_rgba(212,175,55,0.5)]"
            />
         </div>
      </motion.div>

      {/* Top Contenders List */}
      <motion.div variants={itemVariants} className="space-y-4 mb-10">
         <div className="flex items-center justify-between px-1 mb-2">
            <h4 className="text-[11px] font-black text-white/30 uppercase tracking-[0.3em]">Live Contenders</h4>
            <span className="text-[10px] font-black text-phantom-emerald uppercase">84 Alive</span>
         </div>
         
         {[
            { id: 1, name: 'Viper77', tokens: 142, odds: '1.2x', status: 'Dominating' },
            { id: 2, name: 'Ghost_X', tokens: 85, odds: '3.4x', status: 'High Risk' },
            { id: 3, name: 'NeonPulse', tokens: 64, odds: '5.8x', status: 'Rising' },
         ].map((player) => (
            <div key={player.id} className="phantom-card p-5 rounded-[24px] border-white/5 flex items-center justify-between hover:bg-white/[0.02] transition-colors cursor-pointer group">
               <div className="flex items-center gap-4">
                  <div className="w-11 h-11 rounded-full p-[1px] bg-white/10">
                     <div className="w-full h-full rounded-full bg-black overflow-hidden">
                        <img src={`https://i.pravatar.cc/100?img=${player.id+55}`} className="w-full h-full object-cover grayscale-[0.2]" />
                     </div>
                  </div>
                  <div>
                     <p className="text-[15px] font-black text-white tracking-tight">@{player.name}</p>
                     <p className="text-[9px] text-white/20 uppercase font-black tracking-widest mt-0.5">
                        {player.tokens} Tokens <span className="text-white/40 mx-1">/</span> {player.status}
                     </p>
                  </div>
               </div>
               <div className="text-right">
                  <p className="text-[16px] font-black text-phantom-gold">{player.odds}</p>
                  <p className="text-[8px] text-white/20 uppercase font-black tracking-widest">Odds</p>
               </div>
            </div>
         ))}
      </motion.div>

      {/* Prediction Action */}
      <motion.div variants={itemVariants} className="fixed bottom-12 left-6 right-6 z-20">
         <motion.button 
           whileTap={{ scale: 0.96 }}
           className="w-full h-20 bg-phantom-gold text-black rounded-2xl flex flex-col items-center justify-center gap-1 shadow-[0_10px_40px_rgba(212,175,55,0.3)]"
         >
            <span className="text-[18px] font-black uppercase tracking-tighter">Place Oracle Prediction</span>
            <span className="text-[9px] font-bold uppercase opacity-60">Back a Contender • Earn Dividends</span>
         </motion.button>
      </motion.div>
    </motion.div>
  );
};
