import React from 'react';
import { motion } from 'framer-motion';
import { Users, Zap, Shield, ChevronLeft, MessageSquare, Timer, Target, Award } from 'lucide-react';
import { cn } from '../utils/cn';

interface LobbyProps {
  onBack: () => void;
  onCommence: () => void;
}

export const Lobby = ({ onBack, onCommence }: LobbyProps) => {
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
      className="px-6 pt-12 pb-24 min-h-screen bg-[#07070E] relative overflow-x-hidden"
      variants={containerVariants}
      initial="initial"
      animate="animate"
    >
      {/* Background HUD elements */}
      <div className="absolute top-0 right-0 w-64 h-64 bg-phantom-crimson/5 rounded-full blur-[100px] pointer-events-none" />
      <div className="absolute inset-0 opacity-[0.03] pointer-events-none" 
           style={{ backgroundImage: 'linear-gradient(#fff 1px, transparent 1px), linear-gradient(90deg, #fff 1px, transparent 1px)', backgroundSize: '40px 40px' }} />

      <header className="mb-10 flex items-center justify-between">
        <button 
          onClick={onBack}
          className="w-10 h-10 rounded-full glass-panel flex items-center justify-center border-white/5"
        >
          <ChevronLeft size={20} className="text-white/40" />
        </button>
        <div className="text-center">
          <h2 className="text-phantom-crimson text-[10px] font-black tracking-[0.4em] uppercase mb-1">Live Lobby</h2>
          <h1 className="text-2xl font-black tracking-tight text-white uppercase">Death Hour</h1>
        </div>
        <div className="w-10 h-10 rounded-full glass-panel flex items-center justify-center border-phantom-crimson/20">
          <div className="w-2 h-2 bg-phantom-crimson rounded-full animate-ping" />
        </div>
      </header>

      {/* Session Stats HUD */}
      <motion.div variants={itemVariants} className="grid grid-cols-2 gap-4 mb-8">
        <div className="phantom-card p-6 border-phantom-crimson/20 bg-phantom-crimson/[0.02]">
          <p className="text-[10px] font-black text-white/20 uppercase tracking-widest mb-2">Total Pot</p>
          <p className="text-2xl font-black text-white">$12,450.00</p>
        </div>
        <div className="phantom-card p-6 border-phantom-emerald/20 bg-phantom-emerald/[0.02]">
          <p className="text-[10px] font-black text-white/20 uppercase tracking-widest mb-2">Players</p>
          <p className="text-2xl font-black text-white">84 / 100</p>
        </div>
      </motion.div>

      {/* Your Squad Card */}
      <motion.div variants={itemVariants} className="phantom-card p-8 rounded-[36px] mb-8 border-phantom-gold/20 relative overflow-hidden">
        <div className="absolute top-0 right-0 bg-phantom-gold/10 px-4 py-2 rounded-bl-2xl border-l border-b border-phantom-gold/20">
          <span className="text-[10px] font-black text-phantom-gold uppercase tracking-widest flex items-center gap-2">
            <Shield size={12} /> Phantom Elite
          </span>
        </div>
        
        <h3 className="text-[11px] font-black text-white/30 uppercase tracking-[0.3em] mb-6">Your Squad</h3>
        
        <div className="flex justify-between items-center mb-8">
          <div className="flex -space-x-4">
            {[1, 2, 3, 4, 5].map((i) => (
              <div key={i} className={cn(
                "w-14 h-14 rounded-full border-4 border-[#0D0D0D] bg-[#1A1A1A] overflow-hidden",
                i === 1 ? "border-phantom-gold shadow-[0_0_20px_rgba(212,175,55,0.3)]" : ""
              )}>
                <img src={`https://i.pravatar.cc/100?img=${i+50}`} className="w-full h-full object-cover" />
              </div>
            ))}
          </div>
          <div className="text-right">
            <p className="text-[10px] font-black text-phantom-emerald uppercase tracking-widest mb-1">Squad Ready</p>
            <p className="text-sm font-black text-white uppercase">The Outlaws</p>
          </div>
        </div>

        <div className="space-y-4">
          <div className="flex items-center gap-4 bg-white/5 p-4 rounded-2xl border border-white/5">
            <Timer className="text-phantom-amber" size={20} />
            <div>
              <p className="text-[10px] font-black text-white/20 uppercase tracking-widest">Commencing In</p>
              <p className="text-lg font-black text-white tabular-nums">00:42:15</p>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Live Chat / Feed Preview */}
      <motion.div variants={itemVariants} className="phantom-card p-6 rounded-[28px] h-64 flex flex-col">
        <div className="flex items-center justify-between mb-6">
          <h4 className="text-[11px] font-black text-white/30 uppercase tracking-[0.3em]">Lobby Comms</h4>
          <div className="flex items-center gap-2">
            <div className="w-1.5 h-1.5 bg-phantom-emerald rounded-full" />
            <span className="text-[9px] font-black text-white/40 uppercase">12 active</span>
          </div>
        </div>
        
        <div className="flex-1 space-y-4 overflow-y-auto no-scrollbar pr-2">
          {[
            { user: 'Jade', msg: 'Ready to take that crown @Viper77?', color: 'phantom-emerald' },
            { user: 'Viper77', msg: 'Try it. My vault is ready for more.', color: 'phantom-crimson' },
            { user: 'Ghost_X', msg: 'Squad check-in. All green.', color: 'phantom-amber' },
            { user: 'NeonPulse', msg: 'Death Hour is going to be intense tonight.', color: 'white/40' },
          ].map((chat, i) => (
            <div key={i} className="flex gap-3">
              <span className={cn("text-[10px] font-black uppercase tracking-widest", `text-${chat.color}`)}>{chat.user}:</span>
              <p className="text-[11px] font-bold text-white/60 leading-relaxed">{chat.msg}</p>
            </div>
          ))}
        </div>

        <div className="mt-6 flex gap-3">
          <div className="flex-1 h-12 bg-white/5 rounded-xl border border-white/5 px-4 flex items-center">
            <span className="text-[11px] font-black text-white/20 uppercase">Enter message...</span>
          </div>
          <button className="w-12 h-12 rounded-xl bg-white/5 border border-white/5 flex items-center justify-center">
            <MessageSquare size={18} className="text-white/40" />
          </button>
        </div>
      </motion.div>

      {/* Fixed Bottom Action (Floating) */}
      <div className="fixed bottom-10 left-6 right-6 z-40">
        <motion.button 
          whileTap={{ scale: 0.96 }}
          onClick={onCommence}
          className="w-full h-16 bg-phantom-crimson rounded-2xl flex items-center justify-center gap-3 shadow-[0_10px_40px_rgba(192,57,43,0.4)]"
        >
          <Zap size={20} fill="currentColor" className="text-white" />
          <span className="text-[16px] font-black text-white uppercase tracking-tight">Commence Session</span>
        </motion.button>
      </div>
    </motion.div>
  );
};
