import React, { useState, useEffect } from 'react';
import { motion, useAnimation, AnimatePresence } from 'framer-motion';
import { Zap, Trophy, Star, Shield, Ghost, AlertTriangle } from 'lucide-react';
import { cn } from '../utils/cn';

const WHEEL_SECTORS = [
  { id: 1, label: '2x MULTI', color: '#2ECC71', icon: Zap, value: '2x' },
  { id: 2, label: 'SHIELD', color: '#3498DB', icon: Shield, value: '🛡️' },
  { id: 3, label: 'GHOST', color: '#9B59B6', icon: Ghost, value: '👻' },
  { id: 4, label: 'JACKPOT', color: '#D4AF37', icon: Trophy, value: '🏆' },
  { id: 5, label: 'SKULL', color: '#E74C3C', icon: AlertTriangle, value: '💀' },
  { id: 6, label: '50 TOKENS', color: '#F1C40F', icon: Star, value: '50' },
  { id: 7, label: '3x MULTI', color: '#2ECC71', icon: Zap, value: '3x' },
  { id: 8, label: 'JACKPOT', color: '#D4AF37', icon: Trophy, value: '🏆' },
];

interface SpinPhaseProps {
  onComplete: (result: string) => void;
}

export const SpinPhase = ({ onComplete }: SpinPhaseProps) => {
  const [isSpinning, setIsSpinning] = useState(false);
  const [result, setResult] = useState<typeof WHEEL_SECTORS[0] | null>(null);
  const controls = useAnimation();

  const handleSpin = async () => {
    if (isSpinning) return;
    
    setIsSpinning(true);
    setResult(null);

    // Cinematic spin: 5-8 full rotations + random offset
    const rotations = 5 + Math.floor(Math.random() * 3);
    const sectorIndex = Math.floor(Math.random() * WHEEL_SECTORS.length);
    const sectorAngle = 360 / WHEEL_SECTORS.length;
    const finalAngle = (rotations * 360) + (sectorIndex * sectorAngle);

    await controls.start({
      rotate: finalAngle,
      transition: { 
        duration: 5, 
        ease: [0.15, 0, 0.15, 1], // Custom cinematic deceleration
      }
    });

    setIsSpinning(false);
    const wonSector = WHEEL_SECTORS[(WHEEL_SECTORS.length - sectorIndex) % WHEEL_SECTORS.length];
    setResult(wonSector);

    // Wait and then complete
    setTimeout(() => {
      onComplete(wonSector.value);
    }, 2000);
  };

  return (
    <div className="px-6 flex flex-col items-center justify-center min-h-screen bg-[#07070E] relative overflow-hidden">
      {/* Cinematic Lighting */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full pointer-events-none">
        <div className="absolute inset-0 bg-phantom-gold/5 rounded-full blur-[120px]" />
      </div>

      <header className="absolute top-12 left-0 right-0 text-center">
        <h2 className="text-phantom-gold text-[12px] font-black tracking-[0.6em] uppercase mb-2">The Phantom Wheel</h2>
        <h1 className="text-3xl font-black text-white uppercase italic">Spin For Survival</h1>
      </header>

      {/* The Wheel Assembly */}
      <div className="relative w-80 h-80 mb-16">
        {/* Pointer */}
        <div className="absolute -top-4 left-1/2 -translate-x-1/2 z-30 w-8 h-10 bg-white shadow-2xl clip-path-pointer flex items-center justify-center">
          <div className="w-1 h-6 bg-phantom-gold rounded-full" />
        </div>

        {/* Outer Glow Ring */}
        <div className="absolute inset-[-20px] rounded-full border border-white/5 bg-white/[0.02] shadow-[inset_0_0_50px_rgba(255,255,255,0.05)]" />

        {/* The Rotating Wheel */}
        <motion.div 
          animate={controls}
          className="w-full h-full rounded-full border-8 border-[#1A1A1A] relative overflow-hidden shadow-2xl"
          style={{ background: '#0D0D0D' }}
        >
          {WHEEL_SECTORS.map((sector, i) => {
            const angle = 360 / WHEEL_SECTORS.length;
            const rotation = i * angle;
            
            return (
              <div 
                key={sector.id}
                className="absolute top-0 left-1/2 w-1/2 h-full origin-left"
                style={{ 
                  transform: `rotate(${rotation}deg)`,
                }}
              >
                <div 
                  className="w-full h-full flex items-center justify-center"
                  style={{
                    clipPath: 'polygon(0 0, 100% 0, 100% 100%, 0 100%)',
                    background: i % 2 === 0 ? 'rgba(255,255,255,0.02)' : 'transparent',
                    transform: `rotate(${angle / 2}deg)`,
                  }}
                >
                  <div className="flex flex-col items-center gap-2 -rotate-90 translate-x-12">
                    <sector.icon size={24} style={{ color: sector.color }} />
                    <span className="text-[9px] font-black text-white/40 uppercase whitespace-nowrap tracking-widest">
                      {sector.label}
                    </span>
                  </div>
                </div>
              </div>
            );
          })}

          {/* Center Cap */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-16 h-16 rounded-full bg-[#1A1A1A] border-4 border-[#222] shadow-2xl flex items-center justify-center z-20">
            <div className="w-8 h-8 rounded-full bg-phantom-gold flex items-center justify-center shadow-[0_0_20px_rgba(212,175,55,0.4)]">
              <span className="text-black font-black text-lg italic">Ψ</span>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Result Announcement */}
      <div className="h-24 flex items-center justify-center">
        <AnimatePresence mode="wait">
          {result && (
            <motion.div
              initial={{ opacity: 0, y: 20, scale: 0.8 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, scale: 1.1 }}
              className="text-center"
            >
              <p className="text-[10px] font-black text-phantom-gold uppercase tracking-[0.4em] mb-2">Outcome Secured</p>
              <h3 className="text-4xl font-black text-white uppercase italic tracking-tighter flex items-center gap-3">
                <result.icon size={32} style={{ color: result.color }} />
                {result.label}
              </h3>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Spin Button */}
      <div className="fixed bottom-12 left-6 right-6">
        <motion.button 
          whileTap={{ scale: 0.96 }}
          disabled={isSpinning || !!result}
          onClick={handleSpin}
          className={cn(
            "w-full h-20 rounded-2xl flex flex-col items-center justify-center gap-1 transition-all duration-500",
            isSpinning || !!result 
              ? "bg-white/5 border border-white/5 text-white/20" 
              : "bg-phantom-gold text-black shadow-[0_10px_40px_rgba(212,175,55,0.3)]"
          )}
        >
          <span className="text-[18px] font-black uppercase tracking-tighter">
            {isSpinning ? 'SPINNING...' : result ? 'REWARD LOCKED' : 'RELEASE THE PHANTOM'}
          </span>
          {!isSpinning && !result && (
            <span className="text-[9px] font-bold uppercase opacity-60">Cost: 1 Spin Credit</span>
          )}
        </motion.button>
      </div>

      <style>{`
        .clip-path-pointer {
          clip-path: polygon(0% 0%, 100% 0%, 50% 100%);
        }
      `}</style>
    </div>
  );
};
