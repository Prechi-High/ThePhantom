import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Send } from 'lucide-react';

const ONBOARDING_STEPS = [
  {
    title: "THE BOARD IS SET.",
    description: "The Phantom isn't a game that makes money. It's a community that plays a game. Real stakes. No point abstractions. Welcome to the floor.",
    cite: "cite: source: 98, 4",
  },
  {
    title: "THE SURVIVOR.",
    description: "Reach the top 25% and your entry fee is fully returned. The system stores rivalry history and prioritizes future rematches.",
    cite: "cite: source: 102, 12",
  },
  {
    title: "THE ORACLE.",
    description: "Intelligence is power. Watch or bet when you are not playing. Every single session touches all five navigation items.",
    cite: "cite: source: 45, 2",
  }
];

export const TheDescent: React.FC<{ onComplete: () => void }> = ({ onComplete }) => {
  const [step, setStep] = useState(0);
  const [isSplash, setIsSplash] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setIsSplash(false), 2500);
    return () => clearTimeout(timer);
  }, []);

  if (isSplash) {
    return (
      <div className="fixed inset-0 z-[100] bg-[#07070E] flex flex-col items-center justify-center overflow-hidden">
        {/* Background Atmosphere */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_rgba(212,175,55,0.08)_0%,_transparent_70%)]" />
        
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 1.5, ease: [0.22, 1, 0.36, 1] }}
          className="relative z-10 flex flex-col items-center"
        >
          {/* Central Logo Reconstruction */}
          <div className="relative w-56 h-56 mb-12">
            {/* Outer Glows */}
            <div className="absolute inset-0 bg-phantom-gold/20 rounded-full blur-[80px] animate-pulse" />
            
            {/* Logo Structure (Simplified CSS version of the complex logo) */}
            <div className="relative w-full h-full flex items-center justify-center">
              <div className="absolute inset-0 border-[3px] border-phantom-gold/30 rounded-full" />
              <div className="absolute inset-4 border border-phantom-gold/50 rounded-full bg-gradient-to-b from-black to-[#1A1A1A]" />
              <div className="relative z-20 text-7xl font-serif text-phantom-gold drop-shadow-[0_0_20px_rgba(212,175,55,0.6)] select-none">
                Ψ
              </div>
              
              {/* Particle Sparks Placeholder */}
              {[...Array(20)].map((_, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, scale: 0 }}
                  animate={{ 
                    opacity: [0, 1, 0],
                    scale: [0, 1, 0],
                    x: (Math.random() - 0.5) * 300,
                    y: (Math.random() - 0.5) * 300
                  }}
                  transition={{ 
                    duration: 2 + Math.random() * 2,
                    repeat: Infinity,
                    delay: Math.random() * 2
                  }}
                  className="absolute w-1 h-1 bg-phantom-gold rounded-full"
                />
              ))}
            </div>
          </div>

          <motion.div
            initial={{ y: 30, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.6, duration: 0.8 }}
            className="text-center"
          >
            <h1 className="text-4xl font-black tracking-[0.6em] text-white mb-4 drop-shadow-[0_0_10px_rgba(255,255,255,0.2)]">
              THE PHANTOM
            </h1>
            <p className="text-[11px] tracking-[0.4em] text-white/40 uppercase font-bold">
              Only one leaves.
            </p>
            <p className="text-[9px] font-mono text-white/20 mt-6 uppercase tracking-widest">
              [cite: source: 143-144]
            </p>
          </motion.div>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="fixed inset-0 z-[90] bg-[#07070E] overflow-hidden flex flex-col">
      {/* Visual Asset Section (Coin/Target/Oracle) */}
      <div className="flex-[1.2] flex items-center justify-center px-6 relative">
        {/* Background Grid Pattern - Pixel Level Detail */}
        <div className="absolute inset-0 opacity-[0.03]" 
             style={{ backgroundImage: 'linear-gradient(#fff 1px, transparent 1px), linear-gradient(90deg, #fff 1px, transparent 1px)', backgroundSize: '40px 40px' }} />
        
        <AnimatePresence mode="wait">
          <motion.div
            key={step}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 1.1 }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
            className="relative w-72 h-72"
          >
            <div className="absolute inset-0 bg-phantom-gold/10 rounded-full blur-[100px]" />
            
            {/* Dynamic Asset Reconstruction */}
            <div className="relative w-full h-full flex items-center justify-center">
               {step === 0 && (
                 <div className="relative w-64 h-64 flex items-center justify-center">
                    <div className="absolute inset-0 border-[6px] border-[#222] rounded-full shadow-2xl" />
                    <div className="absolute inset-[8px] border-[2px] border-phantom-gold/40 rounded-full" />
                    <div className="absolute inset-0 rounded-full bg-gradient-to-br from-[#1A1A1A] to-black" />
                    <div className="relative z-10 w-48 h-48 rounded-full gold-border-glow bg-gradient-to-b from-phantom-gold/20 to-transparent flex items-center justify-center overflow-hidden">
                       <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_rgba(212,175,55,0.4)_0%,_transparent_70%)] animate-pulse" />
                       <div className="text-6xl font-serif text-phantom-gold/60">Ψ</div>
                    </div>
                    {/* Floating gold particles */}
                    {[...Array(12)].map((_, i) => (
                      <motion.div
                        key={i}
                        animate={{ 
                          y: [0, -100],
                          opacity: [0, 1, 0],
                          x: (i - 6) * 20
                        }}
                        transition={{ 
                          duration: 3 + Math.random() * 2,
                          repeat: Infinity,
                          delay: Math.random() * 2
                        }}
                        className="absolute w-1 h-1 bg-phantom-gold/40 rounded-full"
                      />
                    ))}
                 </div>
               )}
               {step === 1 && (
                 <div className="relative w-64 h-64 flex items-center justify-center">
                    <div className="absolute w-full h-1 bg-phantom-crimson/40" />
                    <div className="absolute h-full w-1 bg-phantom-crimson/40" />
                    <div className="absolute inset-0 border-[4px] border-phantom-crimson/30 rounded-full" />
                    <div className="w-16 h-16 rounded-full bg-phantom-gold shadow-[0_0_30px_rgba(212,175,55,0.6)]" />
                 </div>
               )}
               {step === 2 && (
                 <div className="relative w-64 h-64 flex items-center justify-center">
                    <div className="w-48 h-32 bg-[#0D0D0D] border-2 border-cyan-500/40 rounded-xl shadow-[0_0_40px_rgba(6,182,212,0.3)] flex flex-col p-4 gap-2">
                       <div className="h-2 w-full bg-cyan-500/20 rounded" />
                       <div className="h-2 w-2/3 bg-cyan-500/20 rounded" />
                       <div className="flex-1 flex items-center justify-center">
                          <div className="w-12 h-12 rounded-full border-2 border-cyan-500/60 animate-ping" />
                       </div>
                    </div>
                 </div>
               )}
            </div>
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Content Section - Exact Card Design */}
      <div className="flex-1 px-6 pb-12 flex flex-col justify-end">
        <AnimatePresence mode="wait">
          <motion.div
            key={step}
            initial={{ y: 40, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: -40, opacity: 0 }}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
            className="phantom-card p-10 text-center relative z-20 mb-12 shadow-[0_-20px_50px_rgba(0,0,0,0.8)]"
          >
            {/* Header Text - Gold Gradient */}
            <h2 className="gold-text text-3xl font-black tracking-tight mb-6 uppercase">
              {ONBOARDING_STEPS[step].title}
            </h2>
            
            <p className="text-white/60 text-[15px] leading-relaxed mb-6 font-medium px-2">
              {ONBOARDING_STEPS[step].description}
            </p>

            <p className="text-[10px] text-white/20 font-mono tracking-widest uppercase mb-10">
              [{ONBOARDING_STEPS[step].cite}]
            </p>

            {/* Telegram Button Reconstruction - Pixel Level Detail */}
            <motion.button
              whileTap={{ scale: 0.96 }}
              onClick={() => {
                if (step < ONBOARDING_STEPS.length - 1) {
                  setStep(step + 1);
                } else {
                  onComplete();
                }
              }}
              className="w-full h-[72px] rounded-full p-[1.5px] bg-gradient-to-r from-phantom-gold/60 via-phantom-gold/20 to-phantom-gold/60 overflow-hidden relative"
            >
              <div className="w-full h-full rounded-full bg-[#0D0D0D] flex items-center px-2.5">
                {/* Icon Container with Gold Gradient */}
                <div className="w-14 h-14 rounded-full bg-gradient-to-b from-[#F5E6AD] via-[#D4AF37] to-[#8A6D3B] flex items-center justify-center shadow-lg">
                  <Send size={24} className="text-black ml-0.5" fill="currentColor" />
                </div>
                
                {/* Label Container */}
                <div className="flex-1 text-left ml-5">
                  <p className="text-[11px] font-black tracking-[0.2em] text-phantom-gold uppercase leading-none mb-1.5">
                    {step === ONBOARDING_STEPS.length - 1 ? "Initialize" : "Secure Entry"}
                  </p>
                  <p className="text-[16px] font-black text-white leading-none tracking-tight">
                    WITH TELEGRAM
                  </p>
                </div>
              </div>
            </motion.button>
          </motion.div>
        </AnimatePresence>

        {/* Pagination Reconstruction */}
        <div className="flex justify-center gap-4">
          {ONBOARDING_STEPS.map((_, i) => (
            <div 
              key={i}
              className={cn(
                "h-[5px] rounded-full transition-all duration-700 ease-[0.22, 1, 0.36, 1]",
                step === i ? "w-12 bg-phantom-gold shadow-[0_0_15px_rgba(212,175,55,0.6)]" : "w-3 bg-white/10"
              )}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

const cn = (...classes: any[]) => classes.filter(Boolean).join(' ');
