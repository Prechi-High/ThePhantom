import React from 'react';
import { motion } from 'framer-motion';
import { TrendingUp, Users, Target, Zap, Shield, ChevronRight, BarChart3, Award, Clock } from 'lucide-react';
import { cn } from '../utils/cn';

export const Recap = ({ onHome }: { onHome: () => void }) => {
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
      <header className="mb-10 text-center">
        <h2 className="text-white/30 text-[11px] font-black tracking-[0.6em] uppercase mb-1">Session Protocol</h2>
        <h1 className="text-3xl font-black tracking-tight text-white uppercase italic">The Harvest Recap</h1>
      </header>

      {/* Main Stats Card */}
      <motion.div variants={itemVariants} className="phantom-card p-8 rounded-[40px] mb-8 bg-gradient-to-br from-white/[0.03] to-transparent border-white/10 relative overflow-hidden">
         <div className="absolute -right-20 -top-20 w-64 h-64 bg-white/5 rounded-full blur-[100px]" />
         
         <div className="flex items-center justify-between mb-8 relative z-10">
            <div>
               <p className="text-[10px] font-black text-white/20 uppercase tracking-widest mb-1">Session Result</p>
               <h3 className="text-3xl font-black text-phantom-gold italic">VICTORY</h3>
            </div>
            <Award className="text-phantom-gold" size={32} />
         </div>

         <div className="grid grid-cols-2 gap-8 relative z-10">
            <div>
               <p className="text-2xl font-black text-white">$1,240.20</p>
               <p className="text-[9px] font-black text-white/20 uppercase tracking-widest mt-1">Total Payout</p>
            </div>
            <div className="text-right">
               <p className="text-2xl font-black text-white">152</p>
               <p className="text-[9px] font-black text-white/20 uppercase tracking-widest mt-1">Tokens Swept</p>
            </div>
         </div>
      </motion.div>

      {/* Performance Timeline */}
      <motion.div variants={itemVariants} className="space-y-6 mb-10">
         <h4 className="text-[11px] font-black text-white/30 uppercase tracking-[0.3em] px-1">Phase Performance</h4>
         
         {[
            { phase: 'ROUND 1', result: 'Target Reached', impact: '+15 Tokens', color: 'phantom-emerald' },
            { phase: 'STEAL PHASE', result: '3 Successful Extractions', impact: '+42 Tokens', color: 'phantom-amber' },
            { phase: 'FINAL DUEL', result: 'Eliminated @Viper77', impact: 'CHAMPION', color: 'phantom-crimson' },
         ].map((p, i) => (
            <div key={i} className="flex gap-4 relative">
               {i !== 2 && <div className="absolute left-[19px] top-10 bottom-[-24px] w-[1px] bg-white/10" />}
               <div className={cn("w-10 h-10 rounded-full border border-white/10 flex items-center justify-center bg-[#0A0A0A] relative z-10", `border-${p.color}/30`)}>
                  <div className={cn("w-2 h-2 rounded-full", `bg-${p.color}`)} />
               </div>
               <div className="flex-1 pb-6">
                  <div className="flex items-center justify-between mb-1">
                     <p className="text-[11px] font-black text-white/20 uppercase tracking-widest">{p.phase}</p>
                     <span className={cn("text-[10px] font-black uppercase", `text-${p.color}`)}>{p.impact}</span>
                  </div>
                  <p className="text-[15px] font-black text-white uppercase tracking-tight">{p.result}</p>
               </div>
            </div>
         ))}
      </motion.div>

      {/* Social Impact */}
      <motion.div variants={itemVariants} className="phantom-card p-6 rounded-[32px] mb-12 border-white/5">
         <div className="flex items-center gap-3 mb-6">
            <Users className="text-white/20" size={18} />
            <h4 className="text-[11px] font-black text-white/30 uppercase tracking-[0.3em]">Network Impact</h4>
         </div>
         <div className="space-y-4">
            <div className="flex items-center justify-between">
               <span className="text-[12px] font-black text-white/60 uppercase">Reputation Gain</span>
               <span className="text-[12px] font-black text-phantom-emerald">+450</span>
            </div>
            <div className="flex items-center justify-between">
               <span className="text-[12px] font-black text-white/60 uppercase">Camp Loyalty</span>
               <span className="text-[12px] font-black text-phantom-gold">+12%</span>
            </div>
            <div className="flex items-center justify-between">
               <span className="text-[12px] font-black text-white/60 uppercase">Rivalry Points</span>
               <span className="text-[12px] font-black text-phantom-crimson">+80</span>
            </div>
         </div>
      </motion.div>

      {/* Footer Action */}
      <motion.button 
        whileTap={{ scale: 0.96 }}
        onClick={onHome}
        className="w-full h-20 bg-white text-black rounded-2xl flex items-center justify-center gap-3 shadow-2xl"
      >
         <Home size={20} />
         <span className="text-[18px] font-black uppercase tracking-tighter">Return to HQ</span>
      </motion.button>
    </motion.div>
  );
};
