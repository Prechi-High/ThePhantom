import React from 'react';
import { motion } from 'framer-motion';
import { Clock, Zap, Skull, ChevronRight } from 'lucide-react';
import { cn } from '../utils/cn';

const SESSIONS = [
  {
    id: 1,
    name: "MORNING GRIND",
    tier: "Tier I",
    fee: "$1 Entry",
    time: "09:00 - 11:00",
    rounds: "7 Rounds",
    status: "closed",
    icon: Clock
  },
  {
    id: 2,
    name: "RUSH HOUR",
    tier: "Tier II",
    fee: "$5 Entry",
    time: "17:00 - 19:00",
    rounds: "10 Rounds",
    status: "active",
    icon: Zap
  },
  {
    id: 3,
    name: "DEATH HOUR",
    tier: "Tier III",
    fee: "$10 Entry",
    time: "22:00 - 00:00",
    rounds: "14 Rounds",
    status: "upcoming",
    icon: Skull
  }
];

interface SessionsProps {
  onEnterZone: () => void;
}

export const Sessions: React.FC<SessionsProps> = ({ onEnterZone }) => {
  const containerVariants = {
    initial: { opacity: 0 },
    animate: {
      opacity: 1,
      transition: {
        staggerChildren: 0.08
      }
    }
  };

  const cardVariants = (index: number) => {
    let initial = {};
    if (index === 0) initial = { x: -24, opacity: 0 };
    else if (index === 1) initial = { y: 16, opacity: 0 };
    else if (index === 2) initial = { x: 24, opacity: 0 };

    return {
      initial,
      animate: { 
        x: 0, 
        y: 0, 
        opacity: 1,
        transition: { 
          duration: 0.28, 
          ease: "easeOut"
        }
      }
    };
  };

  return (
    <motion.div 
      className="px-6 pt-12 pb-24 min-h-screen bg-[#07070E] relative overflow-x-hidden"
      variants={containerVariants}
      initial="initial"
      animate="animate"
    >
      <header className="mb-10">
        <h2 className="text-white/40 text-[11px] font-black tracking-[0.3em] uppercase mb-1">Active Zones</h2>
        <h1 className="text-3xl font-black tracking-tight text-white uppercase">Sessions</h1>
      </header>

      <div className="space-y-6">
        {SESSIONS.map((session, i) => (
          <motion.div
            key={session.id}
            variants={cardVariants(i)}
            className={cn(
              "phantom-card p-7 rounded-[32px] relative overflow-hidden group transition-all duration-500",
              session.status === 'active' ? "border-phantom-amber/30 bg-phantom-amber/[0.02]" : "opacity-60 grayscale-[0.4]"
            )}
          >
            {/* Status Header */}
            <div className="flex items-center justify-between mb-8">
              <div className="flex items-center gap-4">
                <div className={cn(
                  "w-12 h-12 rounded-[18px] flex items-center justify-center relative",
                  session.status === 'active' ? "bg-phantom-amber text-black shadow-[0_0_20px_rgba(243,156,18,0.4)]" : "bg-white/5 text-white/40"
                )}>
                  <session.icon size={22} />
                  {session.status === 'active' && (
                    <motion.div 
                      className="absolute inset-0 rounded-[18px] bg-white opacity-20"
                      animate={{ scale: [1, 1.2, 1] }}
                      transition={{ duration: 1.5, repeat: Infinity }}
                    />
                  )}
                </div>
                <div>
                  <h3 className="font-black text-[18px] tracking-tight text-white uppercase">{session.name}</h3>
                  <p className="text-[11px] text-white/40 font-black tracking-widest uppercase">{session.tier} • {session.fee}</p>
                </div>
              </div>
              
              {session.status === 'active' ? (
                <div className="bg-phantom-amber/10 px-3 py-1.5 rounded-full border border-phantom-amber/20">
                  <span className="text-[10px] font-black text-phantom-amber tracking-widest uppercase animate-pulse">Live</span>
                </div>
              ) : (
                <span className="text-[10px] font-black text-white/10 tracking-widest uppercase">{session.status}</span>
              )}
            </div>

            <div className="flex items-end justify-between relative z-10">
              <div className="flex gap-8">
                <div>
                  <p className="text-[10px] font-black text-white/20 tracking-widest uppercase mb-1.5">Window</p>
                  <p className="text-sm font-black text-white/60 tabular-nums">{session.time}</p>
                </div>
                <div>
                  <p className="text-[10px] font-black text-white/20 tracking-widest uppercase mb-1.5">Structure</p>
                  <p className="text-sm font-black text-white/60">{session.rounds}</p>
                </div>
              </div>
              
              <button 
                onClick={session.status === 'active' ? onEnterZone : undefined}
                className={cn(
                  "flex items-center gap-1.5 text-[11px] font-black tracking-widest uppercase group-hover:gap-2.5 transition-all",
                  session.status === 'active' ? "text-phantom-amber" : "text-white/20"
                )}
              >
                {session.status === 'active' ? "Enter Zone" : "Details"}
                <ChevronRight size={14} />
              </button>
            </div>

            {/* Background Atmosphere for active session */}
            {session.status === 'active' && (
              <div className="absolute -right-16 -top-16 w-40 h-40 bg-phantom-amber/5 rounded-full blur-[80px] pointer-events-none" />
            )}
          </motion.div>
        ))}
      </div>

      {/* Rival Notification Ticker */}
      <div className="mt-12 py-4 border-t border-white/5 relative overflow-hidden">
        <div className="flex items-center gap-4 whitespace-nowrap animate-marquee">
          <span className="text-phantom-crimson text-[10px] font-black tracking-widest uppercase">Alert:</span>
          <span className="text-white/40 text-[11px] font-bold uppercase tracking-tight">@Viper77 just registered for Rush Hour...</span>
          <span className="text-white/10 text-[11px] font-bold mx-8">|</span>
          <span className="text-phantom-amber text-[10px] font-black tracking-widest uppercase">Info:</span>
          <span className="text-white/40 text-[11px] font-bold uppercase tracking-tight">Pot currently at $1,240 and growing...</span>
        </div>
      </div>
    </motion.div>
  );
};
