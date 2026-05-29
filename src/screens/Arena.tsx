import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Eye, Zap, Users, Target } from 'lucide-react';
import { cn } from '../utils/cn';

const BETTING_TABS = ['BOUNTY', 'CROWN', 'COUNT'];

const LIVE_PLAYERS = [
  { id: 1, name: 'Viper77', status: 'alive', tokens: 12, odds: '2.4x' },
  { id: 2, name: 'Ghost_X', status: 'alive', tokens: 8, odds: '4.1x' },
  { id: 3, name: 'NeonPulse', status: 'eliminated', tokens: 3, odds: '0x' },
  { id: 4, name: 'ShadowUnit', status: 'alive', tokens: 15, odds: '1.8x' },
  { id: 5, name: 'Cipher', status: 'alive', tokens: 5, odds: '6.5x' },
  { id: 6, name: 'Kage', status: 'alive', tokens: 10, odds: '3.2x' },
];

interface ArenaProps {
  onSessionEnd?: () => void;
}

export const Arena = ({ onSessionEnd }: ArenaProps) => {
  const [activeTab, setActiveTab] = useState('BOUNTY');
  const isLive = true;

  const containerVariants = {
    initial: { opacity: 0 },
    animate: {
      opacity: 1,
      transition: { staggerChildren: 0.03 }
    }
  };

  const cardVariants = {
    initial: { opacity: 0, y: 8 },
    animate: { 
      opacity: 1, 
      y: 0,
      transition: { duration: 0.24, ease: "easeOut" }
    }
  };

  return (
    <motion.div 
      className="px-6 pt-12 pb-24 min-h-screen bg-[#07070E] relative overflow-x-hidden"
      variants={containerVariants}
      initial="initial"
      animate="animate"
    >
      <header className="mb-10 flex items-center justify-between">
        <div>
          <h2 className={cn(
            "text-[11px] font-black tracking-[0.3em] uppercase mb-1 transition-colors duration-500",
            isLive ? "text-phantom-crimson" : "text-white/40"
          )}>
            {isLive ? 'Live Spectator' : 'Oracle Board'}
          </h2>
          <h1 className="text-3xl font-black tracking-tight text-white uppercase">Arena</h1>
        </div>
        <div className={cn(
          "w-12 h-12 rounded-full glass-panel flex items-center justify-center transition-all duration-500",
          isLive ? "border-phantom-crimson/30 shadow-[0_0_20px_rgba(192,57,43,0.2)]" : "border-white/10"
        )}>
          <Eye className={cn("transition-colors duration-500", isLive ? "text-phantom-crimson" : "text-white/40")} size={22} />
        </div>
      </header>

      {/* Live Player Grid with Staggered Entry */}
      <div className="grid grid-cols-2 gap-4 mb-10">
        {LIVE_PLAYERS.map((player) => (
          <motion.div
            key={player.id}
            variants={cardVariants}
            className={cn(
              "phantom-card p-5 rounded-[24px] relative overflow-hidden transition-all duration-500",
              player.status === 'eliminated' ? "opacity-20 grayscale-[0.8]" : "hover:border-white/20"
            )}
          >
            <div className="flex justify-between items-start mb-5">
              <div className="w-9 h-9 rounded-xl bg-white/[0.03] flex items-center justify-center">
                <Users size={16} className="text-white/30" />
              </div>
              <span className="text-[11px] font-black text-phantom-amber tracking-tighter">{player.odds}</span>
            </div>
            
            <h4 className="font-black text-[15px] mb-1.5 text-white tracking-tight uppercase">{player.name}</h4>
            <div className="flex items-center gap-2">
              <Target size={12} className="text-white/30" />
              <span className="text-[10px] font-black text-white/40 uppercase tracking-widest">{player.tokens} Tokens</span>
            </div>

            {player.status === 'alive' && (
              <div className="absolute top-4 right-4">
                <div className="w-1.5 h-1.5 bg-phantom-emerald rounded-full shadow-[0_0_8px_rgba(46,204,113,0.6)]" />
              </div>
            )}
          </motion.div>
        ))}
      </div>

      {/* Betting Panel - Sliding Entry */}
      <motion.div 
        initial={{ y: 40, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.3, duration: 0.3, ease: "easeOut" }}
        className="phantom-card rounded-[32px] overflow-hidden"
      >
        <div className="flex border-b border-white/5 bg-white/[0.02]">
          {BETTING_TABS.map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={cn(
                "flex-1 py-5 text-[11px] font-black tracking-[0.2em] transition-all",
                activeTab === tab ? "text-phantom-amber bg-white/[0.03]" : "text-white/20"
              )}
            >
              {tab}
            </button>
          ))}
        </div>
        
        <div className="p-8">
          <div className="flex items-center justify-between mb-8">
            <div>
              <p className="text-[10px] font-black text-white/20 tracking-[0.2em] uppercase mb-2">Potential Payout</p>
              <p className="text-3xl font-black text-white tracking-tighter">$14,250.00</p>
            </div>
            <div className="w-12 h-12 rounded-2xl bg-phantom-amber/10 flex items-center justify-center">
              <Zap className="text-phantom-amber animate-pulse" size={24} />
            </div>
          </div>

          <button 
            onClick={onSessionEnd}
            className="w-full h-[64px] bg-phantom-crimson text-white font-black tracking-[0.1em] text-[15px] rounded-[20px] active:scale-95 transition-all shadow-[0_10px_30px_rgba(192,57,43,0.3)] uppercase"
          >
            Place Prediction
          </button>
        </div>
      </motion.div>

      {/* Phantom Whisper - Delayed Fade-in */}
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.7, duration: 0.4 }}
        className="mt-10 py-4 px-6 bg-white/[0.03] rounded-full flex items-center gap-4 border border-white/5 overflow-hidden"
      >
        <span className="text-[10px] font-black text-phantom-amber uppercase tracking-[0.2em] whitespace-nowrap">Whisper:</span>
        <div className="text-[11px] text-white/40 font-bold uppercase tracking-tight whitespace-nowrap animate-marquee">
          Viper77 has acquired the Golden Token... 84 players remaining...
        </div>
      </motion.div>
    </motion.div>
  );
};
