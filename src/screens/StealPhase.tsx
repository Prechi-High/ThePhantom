import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Zap, Target, Shield, AlertTriangle, ChevronRight, Crosshair, Users } from 'lucide-react';
import { cn } from '../utils/cn';

type StealSubPhase = 'DEPLOY' | 'TARGET' | 'ACTION' | 'RESOLUTION';

interface StealPhaseProps {
  onComplete: () => void;
}

export const StealPhase = ({ onComplete }: StealPhaseProps) => {
  const [phase, setPhase] = useState<StealSubPhase>('DEPLOY');
  const [selectedTarget, setSelectedTarget] = useState<number | null>(null);

  // Auto-advance phases for demo purposes, or wait for user action
  useEffect(() => {
    if (phase === 'DEPLOY') {
      const timer = setTimeout(() => setPhase('TARGET'), 2000);
      return () => clearTimeout(timer);
    }
    if (phase === 'ACTION') {
      const timer = setTimeout(() => setPhase('RESOLUTION'), 3000);
      return () => clearTimeout(timer);
    }
  }, [phase]);

  const containerVariants = {
    initial: { opacity: 0 },
    animate: { opacity: 1 },
    exit: { opacity: 0 }
  };

  const renderDeploy = () => (
    <motion.div 
      key="deploy"
      variants={containerVariants}
      initial="initial"
      animate="animate"
      exit="exit"
      className="flex flex-col items-center justify-center min-h-screen text-center px-8"
    >
      <div className="relative mb-12">
        <div className="w-32 h-32 rounded-3xl border-2 border-phantom-amber/30 flex items-center justify-center relative rotate-45 overflow-hidden">
          <div className="absolute inset-0 bg-phantom-amber/5 animate-pulse" />
          <Zap className="text-phantom-amber -rotate-45" size={48} />
        </div>
        <motion.div 
          animate={{ scale: [1, 1.2, 1] }}
          transition={{ repeat: Infinity, duration: 2 }}
          className="absolute -bottom-4 left-1/2 -translate-x-1/2 bg-phantom-amber px-4 py-1 rounded-full shadow-[0_0_20px_rgba(243,156,18,0.4)]"
        >
          <span className="text-[10px] font-black text-black uppercase tracking-widest">Deploying</span>
        </motion.div>
      </div>
      <h2 className="text-phantom-amber text-[12px] font-black tracking-[0.6em] uppercase mb-4">Steal Protocol</h2>
      <h1 className="text-4xl font-black text-white uppercase italic tracking-tighter mb-6">Initializing Phantom Link</h1>
      <p className="text-white/40 text-sm font-medium leading-relaxed max-w-[280px]">
        Synching neural interface for tactical asset extraction. Stand by for target acquisition.
      </p>
    </motion.div>
  );

  const renderTarget = () => (
    <motion.div 
      key="target"
      variants={containerVariants}
      initial="initial"
      animate="animate"
      exit="exit"
      className="pt-16 pb-32 px-6 min-h-screen flex flex-col"
    >
      <header className="mb-10 text-center">
        <h2 className="text-phantom-crimson text-[10px] font-black tracking-[0.4em] uppercase mb-1">Target Selection</h2>
        <h1 className="text-2xl font-black text-white uppercase italic">Choose Your Mark</h1>
      </header>

      <div className="grid grid-cols-1 gap-4 flex-1">
        {[
          { id: 1, name: 'Viper77', tokens: 42, risk: 'HIGH', avatar: '11' },
          { id: 2, name: 'Ghost_X', tokens: 15, risk: 'LOW', avatar: '12' },
          { id: 3, name: 'NeonPulse', tokens: 28, risk: 'MED', avatar: '13' },
        ].map((t) => (
          <motion.div 
            key={t.id}
            whileTap={{ scale: 0.98 }}
            onClick={() => {
              setSelectedTarget(t.id);
              setPhase('ACTION');
            }}
            className={cn(
              "phantom-card p-6 rounded-[28px] border-white/5 flex items-center gap-5 transition-all",
              selectedTarget === t.id ? "border-phantom-crimson bg-phantom-crimson/5" : "hover:border-white/20"
            )}
          >
            <div className="relative">
              <div className="w-16 h-16 rounded-2xl overflow-hidden border border-white/10">
                <img src={`https://i.pravatar.cc/100?img=${t.avatar}`} className="w-full h-full object-cover grayscale-[0.3]" />
              </div>
              <div className="absolute -top-2 -right-2 bg-black border border-white/10 rounded-full p-1.5">
                <Crosshair size={12} className="text-phantom-crimson" />
              </div>
            </div>
            <div className="flex-1">
               <h3 className="text-lg font-black text-white uppercase tracking-tight mb-1">@{t.name}</h3>
               <div className="flex items-center gap-3">
                  <span className="text-[10px] font-black text-white/40 uppercase tracking-widest">{t.tokens} Tokens</span>
                  <div className="w-1 h-1 rounded-full bg-white/10" />
                  <span className={cn(
                    "text-[10px] font-black uppercase tracking-widest",
                    t.risk === 'HIGH' ? 'text-phantom-crimson' : t.risk === 'MED' ? 'text-phantom-amber' : 'text-phantom-emerald'
                  )}>{t.risk} RISK</span>
               </div>
            </div>
            <ChevronRight className="text-white/20" size={20} />
          </motion.div>
        ))}
      </div>

      <div className="mt-8 p-6 phantom-card bg-white/[0.02] border-white/5 rounded-[24px]">
         <div className="flex items-center gap-3 mb-3">
            <AlertTriangle className="text-phantom-amber" size={16} />
            <span className="text-[10px] font-black text-phantom-amber uppercase tracking-widest">Tactical Note</span>
         </div>
         <p className="text-[11px] font-bold text-white/40 leading-relaxed uppercase">
           Stealing from high-risk targets yields 2x tokens but increases your exposure to immediate counter-steals.
         </p>
      </div>
    </motion.div>
  );

  const renderAction = () => (
    <motion.div 
      key="action"
      variants={containerVariants}
      initial="initial"
      animate="animate"
      exit="exit"
      className="flex flex-col items-center justify-center min-h-screen px-8 relative overflow-hidden"
    >
      {/* Dynamic Background Effects */}
      <div className="absolute inset-0 z-0">
         <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full bg-phantom-crimson/5 animate-pulse rounded-full blur-[120px]" />
      </div>

      <div className="relative z-10 text-center">
        <motion.div 
          animate={{ 
            rotate: [0, 90, 180, 270, 360],
            scale: [1, 1.1, 1]
          }}
          transition={{ repeat: Infinity, duration: 3, ease: "linear" }}
          className="w-48 h-48 border-4 border-dashed border-phantom-crimson/40 rounded-full flex items-center justify-center mb-12 mx-auto"
        >
          <div className="w-32 h-32 bg-phantom-crimson rounded-full flex items-center justify-center shadow-[0_0_50px_rgba(192,57,43,0.4)]">
            <Zap className="text-white" size={48} fill="white" />
          </div>
        </motion.div>
        
        <h2 className="text-phantom-crimson text-[14px] font-black tracking-[0.8em] uppercase mb-4">Action Phase</h2>
        <h1 className="text-5xl font-black text-white uppercase italic tracking-tighter mb-8">Extracting Assets</h1>
        
        <div className="w-full max-w-xs h-3 bg-white/5 rounded-full overflow-hidden p-[1px] mb-4">
           <motion.div 
            initial={{ width: 0 }}
            animate={{ width: '100%' }}
            transition={{ duration: 3, ease: "linear" }}
            className="h-full bg-phantom-crimson rounded-full" 
           />
        </div>
        <p className="text-[11px] font-black text-white/40 uppercase tracking-widest">Bypassing Encryption...</p>
      </div>
    </motion.div>
  );

  const renderResolution = () => (
    <motion.div 
      key="resolution"
      variants={containerVariants}
      initial="initial"
      animate="animate"
      exit="exit"
      className="flex flex-col items-center justify-center min-h-screen px-8 text-center"
    >
      <div className="mb-12">
        <div className="w-24 h-24 rounded-full bg-phantom-emerald/10 border border-phantom-emerald/30 flex items-center justify-center mx-auto mb-6">
          <Shield className="text-phantom-emerald" size={40} />
        </div>
        <h2 className="text-phantom-emerald text-[12px] font-black tracking-[0.6em] uppercase mb-4">Extraction Complete</h2>
        <h1 className="text-6xl font-black text-white italic tracking-tighter mb-4">+12</h1>
        <p className="text-white/40 text-[11px] font-black uppercase tracking-[0.3em]">Tokens Swept From @Viper77</p>
      </div>

      <div className="grid grid-cols-2 gap-4 w-full max-w-sm mb-16">
         <div className="phantom-card p-6 border-white/5 bg-white/[0.02]">
            <p className="text-[10px] font-black text-white/20 uppercase tracking-widest mb-1">New Balance</p>
            <p className="text-2xl font-black text-white">42</p>
         </div>
         <div className="phantom-card p-6 border-white/5 bg-white/[0.02]">
            <p className="text-[10px] font-black text-white/20 uppercase tracking-widest mb-1">Session Rank</p>
            <p className="text-2xl font-black text-phantom-gold italic">#04</p>
         </div>
      </div>

      <motion.button 
        whileTap={{ scale: 0.96 }}
        onClick={onComplete}
        className="w-full max-w-xs h-16 bg-white text-black rounded-2xl flex items-center justify-center gap-3 font-black uppercase tracking-tight"
      >
        Continue To Intermission
      </motion.button>
    </motion.div>
  );

  return (
    <AnimatePresence mode="wait">
      {phase === 'DEPLOY' && renderDeploy()}
      {phase === 'TARGET' && renderTarget()}
      {phase === 'ACTION' && renderAction()}
      {phase === 'RESOLUTION' && renderResolution()}
    </AnimatePresence>
  );
};
