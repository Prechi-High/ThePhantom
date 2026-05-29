import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Heart, Shield, Zap, AlertCircle, Timer, Users, ChevronRight } from 'lucide-react';
import { cn } from '../utils/cn';

interface ResurrectionProps {
  eliminatedUser: {
    name: string;
    avatar: string;
    tokens: number;
  };
  onRevived: () => void;
  onFailed: () => void;
}

export const Resurrection = ({ eliminatedUser, onRevived, onFailed }: ResurrectionProps) => {
  const [timeLeft, setTimeLeft] = useState(30);
  const [contribution, setContribution] = useState(0);
  const targetContribution = 5; // Tokens needed for revival

  useEffect(() => {
    if (timeLeft > 0) {
      const timer = setInterval(() => setTimeLeft(prev => prev - 1), 1000);
      return () => clearInterval(timer);
    } else if (contribution < targetContribution) {
      onFailed();
    }
  }, [timeLeft, contribution]);

  const handleContribute = () => {
    if (contribution < targetContribution) {
      setContribution(prev => prev + 1);
      if (contribution + 1 >= targetContribution) {
        setTimeout(onRevived, 1000);
      }
    }
  };

  return (
    <div className="px-6 flex flex-col min-h-screen bg-[#07070E] relative overflow-hidden">
      {/* Cinematic Glitch Background */}
      <div className="absolute inset-0 z-0">
         <div className="absolute inset-0 bg-phantom-crimson/10 mix-blend-overlay opacity-30 animate-pulse" />
         <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full bg-phantom-crimson/5 blur-[120px]" />
      </div>

      <header className="pt-16 mb-12 text-center relative z-10">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-phantom-crimson/20 border border-phantom-crimson/30 mb-6">
           <AlertCircle size={14} className="text-phantom-crimson" />
           <span className="text-[10px] font-black text-phantom-crimson uppercase tracking-[0.2em]">SQUAD CRITICAL</span>
        </div>
        <h1 className="text-3xl font-black text-white uppercase italic tracking-tighter mb-2">Resurrection Protocol</h1>
        <p className="text-white/40 text-[11px] font-bold uppercase tracking-widest">A teammate has been liquidated.</p>
      </header>

      {/* Eliminated Player HUD */}
      <div className="relative z-10 mb-12">
        <div className="phantom-card p-8 rounded-[40px] border-phantom-crimson/30 bg-phantom-crimson/[0.03] text-center relative overflow-hidden">
           <div className="absolute top-0 left-0 w-full h-1 bg-phantom-crimson/20" />
           
           <div className="relative mb-6">
              <div className="w-24 h-24 rounded-full border-4 border-[#0D0D0D] bg-[#1A1A1A] overflow-hidden mx-auto grayscale shadow-[0_0_30px_rgba(192,57,43,0.3)]">
                 <img src={`https://i.pravatar.cc/100?img=${eliminatedUser.avatar}`} className="w-full h-full object-cover" />
              </div>
              <div className="absolute bottom-0 left-1/2 -translate-x-1/2 translate-y-1/2 bg-black border border-phantom-crimson/40 px-3 py-1 rounded-full">
                 <span className="text-[10px] font-black text-phantom-crimson uppercase">OFFLINE</span>
              </div>
           </div>

           <h3 className="text-2xl font-black text-white uppercase tracking-tight mb-2">@{eliminatedUser.name}</h3>
           <p className="text-[11px] font-black text-white/30 uppercase tracking-[0.3em] mb-8">Lost {eliminatedUser.tokens} Tokens</p>

           {/* Progress Ring */}
           <div className="relative w-48 h-48 mx-auto mb-8 flex items-center justify-center">
              <svg className="w-full h-full -rotate-90">
                 <circle 
                    cx="96" cy="96" r="88" 
                    className="stroke-white/5 fill-none" 
                    strokeWidth="8" 
                 />
                 <motion.circle 
                    cx="96" cy="96" r="88" 
                    className="stroke-phantom-crimson fill-none" 
                    strokeWidth="8" 
                    strokeLinecap="round"
                    initial={{ strokeDasharray: "553", strokeDashoffset: "553" }}
                    animate={{ strokeDashoffset: 553 - (553 * (contribution / targetContribution)) }}
                    transition={{ type: "spring", damping: 20 }}
                 />
              </svg>
              <div className="absolute inset-0 flex flex-col items-center justify-center">
                 <Heart className={cn("mb-2 transition-colors", contribution > 0 ? "text-phantom-crimson fill-phantom-crimson" : "text-white/10")} size={32} />
                 <span className="text-3xl font-black text-white tabular-nums">{contribution}/{targetContribution}</span>
                 <span className="text-[9px] font-black text-white/20 uppercase tracking-widest">Contributions</span>
              </div>
           </div>

           <div className="flex items-center justify-center gap-6">
              <div className="text-center">
                 <Timer size={18} className="text-phantom-crimson mb-1 mx-auto" />
                 <p className="text-[14px] font-black text-white tabular-nums">{timeLeft}s</p>
                 <p className="text-[8px] font-black text-white/20 uppercase">Remaining</p>
              </div>
              <div className="w-[1px] h-8 bg-white/10" />
              <div className="text-center">
                 <Users size={18} className="text-phantom-emerald mb-1 mx-auto" />
                 <p className="text-[14px] font-black text-white">03/05</p>
                 <p className="text-[8px] font-black text-white/20 uppercase">Squad Help</p>
              </div>
           </div>
        </div>
      </div>

      {/* Action Area */}
      <div className="fixed bottom-12 left-6 right-6 z-20">
         <motion.button 
           whileTap={{ scale: 0.96 }}
           onClick={handleContribute}
           disabled={contribution >= targetContribution}
           className={cn(
             "w-full h-20 rounded-2xl flex flex-col items-center justify-center gap-1 transition-all duration-500 shadow-2xl",
             contribution >= targetContribution 
              ? "bg-phantom-emerald text-black" 
              : "bg-white text-black"
           )}
         >
            <span className="text-[18px] font-black uppercase tracking-tighter">
              {contribution >= targetContribution ? 'INITIATING RECALL' : 'CONTRIBUTE 1 TOKEN'}
            </span>
            {contribution < targetContribution && (
              <span className="text-[9px] font-bold uppercase opacity-60">Sacrifice to Save Teammate</span>
            )}
         </motion.button>
         
         <button 
           onClick={onFailed}
           className="w-full py-4 mt-4 text-[11px] font-black text-white/20 uppercase tracking-[0.3em] hover:text-white/40 transition-colors"
         >
            Abandon Unit
         </button>
      </div>
    </div>
  );
};
