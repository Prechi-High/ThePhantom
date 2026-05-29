import React, { useCallback, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { cn } from '../../utils/cn';

// --- Sound Utility ---
const playPhantomSound = (frequency: number, type: 'sine' | 'square' | 'sawtooth' | 'triangle' = 'sine', duration = 0.06, volume = 0.1) => {
  try {
    const audioCtx = new (window.AudioContext || (window as any).webkitAudioContext)();
    const oscillator = audioCtx.createOscillator();
    const gainNode = audioCtx.createGain();

    oscillator.type = type;
    oscillator.frequency.setValueAtTime(frequency, audioCtx.currentTime);
    
    gainNode.gain.setValueAtTime(volume, audioCtx.currentTime);
    gainNode.gain.exponentialRampToValueAtTime(0.01, audioCtx.currentTime + duration);

    oscillator.connect(gainNode);
    gainNode.connect(audioCtx.destination);

    oscillator.start();
    oscillator.stop(audioCtx.currentTime + duration);
  } catch (e) {
    console.warn('Audio feedback blocked by browser policy');
  }
};

const playSyndicateChord = () => {
  [280, 300, 320, 340, 360].forEach((freq, i) => {
    setTimeout(() => playPhantomSound(freq, 'sine', 0.1, 0.05), i * 40);
  });
};

// --- Haptic Utility ---
const triggerHaptic = (intensity: 'light' | 'medium') => {
  if (window.navigator.vibrate) {
    window.navigator.vibrate(intensity === 'light' ? 10 : 20);
  }
};

// --- Icons Components ---

const HomeIcon = ({ active }: { active: boolean }) => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M12 4L4 10V20H20V10L12 4Z" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
    <path d="M12 14V17" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" />
  </svg>
);

const SessionsIcon = ({ active }: { active: boolean }) => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <motion.rect x="4" y="16" width="16" height="4" rx="1" fill="currentColor" 
      animate={active ? { opacity: [0.3, 1, 0.3] } : { opacity: 1 }} 
      transition={active ? { duration: 2.4, repeat: Infinity, times: [0, 0.33, 1] } : {}} />
    <motion.rect x="6" y="10" width="12" height="4" rx="1" fill="currentColor" 
      animate={active ? { opacity: [0.3, 1, 0.3] } : { opacity: 1 }} 
      transition={active ? { duration: 2.4, repeat: Infinity, times: [0.33, 0.66, 1], delay: 0.8 } : {}} />
    <motion.rect x="8" y="4" width="8" height="4" rx="1" fill="currentColor" 
      animate={active ? { opacity: [0.3, 1, 0.3] } : { opacity: 1 }} 
      transition={active ? { duration: 2.4, repeat: Infinity, times: [0.66, 1, 1], delay: 1.6 } : {}} />
  </svg>
);

const ArenaIcon = ({ active, isLive }: { active: boolean; isLive: boolean }) => (
  <motion.svg 
    width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"
    animate={active ? { rotate: 360 } : {}}
    transition={active ? { duration: isLive ? 3 : 8, repeat: Infinity, ease: "linear" } : {}}
  >
    <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="1.2" />
    <path d="M12 6L15 11H9L12 6Z" fill="currentColor" />
  </motion.svg>
);

const SyndicateIcon = ({ active }: { active: boolean }) => {
  const points = [
    { x: 12, y: 5 }, { x: 19, y: 10 }, { x: 16, y: 18 }, { x: 8, y: 18 }, { x: 5, y: 10 }
  ];
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      {points.map((p, i) => (
        <React.Fragment key={i}>
          <motion.circle 
            cx={p.x} cy={p.y} r={i === 0 ? 2.5 : 2} 
            fill="currentColor"
            animate={active ? { scale: [1, 1.3, 1] } : {}}
            transition={active ? { duration: 0.12, delay: i * 0.04, repeat: 0 } : {}}
          />
          {i < points.length && (
            <line x1={p.x} y1={p.y} x2={points[(i+1)%5].x} y2={points[(i+1)%5].y} stroke="currentColor" strokeWidth="0.5" opacity="0.3" />
          )}
        </React.Fragment>
      ))}
    </svg>
  );
};

const DossierIcon = ({ active, isMember }: { active: boolean; isMember: boolean }) => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    {isMember && (
      <motion.path 
        d="M12 2L14 5H10L12 2Z" fill="#D4AF37" 
        animate={active ? { y: [0, -2, 0] } : {}} 
        transition={{ duration: 2, repeat: Infinity }} 
      />
    )}
    <path d="M12 22C12 22 20 18 20 12V5L12 2L4 5V12C4 18 12 22 12 22Z" stroke="currentColor" strokeWidth="1.2" />
    <text x="12" y="15" textAnchor="middle" fontSize="8" fontWeight="bold" fill="currentColor">V</text>
  </svg>
);

// --- Main Components ---

interface NavItemProps {
  id: string;
  label: string;
  isActive: boolean;
  onClick: () => void;
  isLocked?: boolean;
  isLive?: boolean;
  isMember?: boolean;
}

const NavItem: React.FC<NavItemProps> = ({ 
  id, label, isActive, onClick, isLocked, isLive, isMember 
}) => {
  const handleInteraction = () => {
    if (isLocked) return;
    
    // Sounds & Haptics per spec
    triggerHaptic(id === 'arena' && isLive ? 'medium' : 'light');
    
    if (id === 'syndicate') playSyndicateChord();
    else if (id === 'home') playPhantomSound(280);
    else if (id === 'sessions') playPhantomSound(320);
    else if (id === 'arena') playPhantomSound(isLive ? 380 : 320, isLive ? 'square' : 'sine');
    else if (id === 'dossier') playPhantomSound(240, 'sine', 0.08, 0.15);

    onClick();
  };

  const getIcon = () => {
    switch (id) {
      case 'home': return <HomeIcon active={isActive} />;
      case 'sessions': return <SessionsIcon active={isActive} />;
      case 'arena': return <ArenaIcon active={isActive} isLive={!!isLive} />;
      case 'syndicate': return <SyndicateIcon active={isActive} />;
      case 'dossier': return <DossierIcon active={isActive} isMember={!!isMember} />;
      default: return null;
    }
  };

  return (
    <motion.button
      onClick={handleInteraction}
      disabled={isLocked}
      className={cn(
        "relative flex flex-col items-center justify-center w-full h-full outline-none",
        isLocked ? "opacity-10 pointer-events-none" : "opacity-100",
        isActive 
          ? (id === 'arena' && isLive ? "text-phantom-crimson" : "text-phantom-amber") 
          : "text-[#E8E8F0]/30"
      )}
      whileTap={{ scale: 0.88 }}
      transition={{ type: "spring", stiffness: 400, damping: 20 }}
    >
      <div className="relative z-10 flex flex-col items-center">
        <div className="mb-1 relative">
          {getIcon()}
          {isActive && (
            <motion.div 
              className="absolute inset-0 blur-[8px] bg-current opacity-40 rounded-full"
              initial={{ scale: 0 }}
              animate={{ scale: 1.5 }}
            />
          )}
          {id === 'sessions' && isLive && (
            <div className="absolute -top-1 -right-1 w-2 h-2 bg-phantom-crimson rounded-full animate-pulse shadow-[0_0_8px_rgba(192,57,43,0.8)]" />
          )}
        </div>
        <span className="text-[9px] font-black tracking-[0.15em] uppercase">
          {label}
        </span>
      </div>

      <AnimatePresence>
        {isActive && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className={cn(
              "absolute bottom-0 w-5 h-[3px] rounded-t-full shadow-lg",
              id === 'arena' && isLive ? "bg-phantom-crimson" : "bg-phantom-amber"
            )}
          />
        )}
      </AnimatePresence>
    </motion.button>
  );
};

interface BottomNavProps {
  activeTab: string;
  onTabChange: (tab: string) => void;
  isLocked?: boolean;
}

export const BottomNav: React.FC<BottomNavProps> = ({ activeTab, onTabChange, isLocked = false }) => {
  const navItems = [
    { id: 'home', label: 'HOME' },
    { id: 'sessions', label: 'SESSIONS', isLive: true },
    { id: 'arena', label: 'ARENA', isLive: true },
    { id: 'syndicate', label: 'SYNDICATE' },
    { id: 'dossier', label: 'DOSSIER', isMember: true },
  ];

  return (
    <motion.nav
      initial={{ y: 20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.36, ease: [0.22, 1, 0.36, 1] }}
      className="fixed bottom-0 left-0 right-0 z-50 h-[72px] bg-[#07070E]/96 backdrop-blur-md border-t border-white/5 px-2 pb-safe flex items-center justify-around"
    >
      {navItems.map((item) => (
        <NavItem
          key={item.id}
          id={item.id}
          label={item.label}
          isActive={activeTab === item.id}
          isLocked={isLocked}
          isLive={item.isLive}
          isMember={item.isMember}
          onClick={() => onTabChange(item.id)}
        />
      ))}
    </motion.nav>
  );
};
