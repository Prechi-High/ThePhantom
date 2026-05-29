import React from 'react';
import { motion } from 'framer-motion';
import { Shield, Award, Zap, History, Globe, Lock, ChevronRight, Activity, TrendingUp, Skull } from 'lucide-react';
import { cn } from '../utils/cn';

export const Dossier = () => {
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
      {/* Background HUD Grid */}
      <div className="absolute inset-0 opacity-[0.03] pointer-events-none" 
           style={{ backgroundImage: 'linear-gradient(#fff 1px, transparent 1px), linear-gradient(90deg, #fff 1px, transparent 1px)', backgroundSize: '40px 40px' }} />

      <header className="mb-10 flex items-center justify-between">
        <div>
          <h2 className="text-phantom-emerald text-[11px] font-black tracking-[0.3em] uppercase mb-1">Performance Ledger</h2>
          <h1 className="text-3xl font-black tracking-tight text-white uppercase italic">Dossier</h1>
        </div>
        <div className="w-12 h-12 rounded-full glass-panel flex items-center justify-center border-phantom-emerald/20">
          <Shield className="text-phantom-emerald" size={24} />
        </div>
      </header>

      {/* Profile Overview */}
      <motion.div variants={itemVariants} className="phantom-card p-8 rounded-[40px] mb-8 relative overflow-hidden">
         <div className="absolute -right-20 -top-20 w-64 h-64 bg-phantom-emerald/5 rounded-full blur-[100px]" />
         
         <div className="flex items-center gap-6 mb-8 relative z-10">
            <div className="relative">
               <div className="w-24 h-24 rounded-full border-4 border-black p-[2px] bg-gradient-to-b from-phantom-emerald to-transparent shadow-[0_0_30px_rgba(46,204,113,0.3)]">
                  <div className="w-full h-full rounded-full overflow-hidden bg-black">
                     <img src="https://i.pravatar.cc/200?img=33" className="w-full h-full object-cover grayscale-[0.2]" />
                  </div>
               </div>
               <div className="absolute -bottom-2 -right-2 bg-black border border-phantom-emerald/40 rounded-full p-2">
                  <Award size={16} className="text-phantom-emerald" />
               </div>
            </div>
            <div>
               <h3 className="text-2xl font-black text-white uppercase tracking-tight">@GeminiDesigner</h3>
               <p className="text-phantom-emerald text-[11px] font-black tracking-[0.2em] uppercase mt-1">Phantom Elite</p>
               <div className="flex items-center gap-3 mt-4">
                  <div className="flex items-center gap-1.5 bg-white/5 px-3 py-1 rounded-full border border-white/5">
                     <Globe size={10} className="text-white/40" />
                     <span className="text-[9px] font-black text-white/60 uppercase">Global Rank: #1,240</span>
                  </div>
               </div>
            </div>
         </div>

         <div className="grid grid-cols-3 gap-4 relative z-10">
            <div className="text-center">
               <p className="text-[18px] font-black text-white tabular-nums">74.2%</p>
               <p className="text-[8px] font-black text-white/20 uppercase tracking-widest mt-1">Survival</p>
            </div>
            <div className="text-center border-x border-white/5">
               <p className="text-[18px] font-black text-white tabular-nums">142</p>
               <p className="text-[8px] font-black text-white/20 uppercase tracking-widest mt-1">Eliminations</p>
            </div>
            <div className="text-center">
               <p className="text-[18px] font-black text-phantom-emerald tabular-nums">12.5k</p>
               <p className="text-[8px] font-black text-white/20 uppercase tracking-widest mt-1">Reputation</p>
            </div>
         </div>
      </motion.div>

      {/* Rivalry History Card */}
      <motion.div variants={itemVariants} className="phantom-card p-6 rounded-[32px] mb-8 border-phantom-crimson/20 bg-phantom-crimson/[0.02]">
         <div className="flex items-center justify-between mb-6">
            <h4 className="text-[11px] font-black text-white/30 uppercase tracking-[0.3em]">Rivalry Index</h4>
            <Skull size={16} className="text-phantom-crimson" />
         </div>
         <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
               <div className="w-12 h-12 rounded-2xl overflow-hidden border border-phantom-crimson/40 grayscale">
                  <img src="https://i.pravatar.cc/100?img=11" className="w-full h-full object-cover" />
               </div>
               <div>
                  <p className="text-[14px] font-black text-white uppercase">@Viper77</p>
                  <p className="text-[9px] font-black text-phantom-crimson uppercase tracking-widest">Active Nemesis</p>
               </div>
            </div>
            <div className="text-right">
               <p className="text-[11px] font-black text-white/40 uppercase mb-1">Status</p>
               <p className="text-[12px] font-black text-phantom-crimson uppercase">Revenge Due</p>
            </div>
         </div>
      </motion.div>

      {/* Security & Audit Ledger */}
      <motion.div variants={itemVariants} className="space-y-4">
         <div className="flex items-center justify-between px-1 mb-2">
            <h4 className="text-[11px] font-black text-white/30 uppercase tracking-[0.3em]">Security Audit</h4>
            <History size={14} className="text-white/20" />
         </div>
         
         {[
            { id: 1, type: 'LOGIN', detail: 'New Device: iPhone 15 Pro', time: '2h ago', risk: 'LOW' },
            { id: 2, type: 'WALLET', detail: 'Withdrawal: $450.00', time: '5h ago', risk: 'SECURE' },
            { id: 3, type: 'SESSION', detail: 'Death Hour Participation', time: '1d ago', risk: 'ELITE' },
         ].map((log) => (
            <div key={log.id} className="phantom-card p-5 rounded-[24px] border-white/5 flex items-center justify-between hover:bg-white/[0.02] transition-colors cursor-pointer group">
               <div className="flex items-center gap-4">
                  <div className="w-10 h-10 rounded-xl bg-white/[0.03] flex items-center justify-center">
                     <Lock size={16} className="text-white/30" />
                  </div>
                  <div>
                     <p className="text-[13px] font-black text-white uppercase tracking-tight">{log.detail}</p>
                     <div className="flex items-center gap-2 mt-1">
                        <span className="text-[9px] font-black text-white/20 uppercase">{log.type}</span>
                        <div className="w-1 h-1 rounded-full bg-white/10" />
                        <span className="text-[9px] font-black text-white/20 uppercase">{log.time}</span>
                     </div>
                  </div>
               </div>
               <div className="text-right">
                  <span className={cn(
                     "text-[9px] font-black uppercase tracking-widest px-2 py-1 rounded-md",
                     log.risk === 'LOW' ? 'bg-phantom-emerald/10 text-phantom-emerald' : 
                     log.risk === 'SECURE' ? 'bg-phantom-gold/10 text-phantom-gold' : 'bg-white/5 text-white/40'
                  )}>
                     {log.risk}
                  </span>
               </div>
            </div>
         ))}
      </motion.div>

      {/* Global Stats Footer */}
      <motion.div variants={itemVariants} className="mt-12 p-8 rounded-[36px] bg-gradient-to-b from-white/[0.02] to-transparent border border-white/5 text-center">
         <Activity className="text-white/10 mx-auto mb-6" size={32} />
         <p className="text-[11px] font-black text-white/40 uppercase tracking-[0.4em] mb-4">Total Network Impact</p>
         <h3 className="text-4xl font-black text-white italic tracking-tighter mb-8">$24,850.20</h3>
         <button className="flex items-center gap-2 mx-auto text-phantom-emerald text-[10px] font-black uppercase tracking-[0.3em]">
            View Detailed Analytics <ChevronRight size={14} />
         </button>
      </motion.div>
    </motion.div>
  );
};
