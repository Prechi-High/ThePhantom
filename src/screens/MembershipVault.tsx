import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Crown, Check, ChevronRight, Star, Shield, Zap, Award } from 'lucide-react';
import { cn } from '../utils/cn';

const TIERS = [
  {
    id: 'starter',
    name: 'Starter',
    price: 'Free',
    color: 'white/40',
    perks: ['Basic Session Entry', 'Standard Rewards', 'Community Access'],
    glow: 'rgba(255,255,255,0.05)'
  },
  {
    id: 'pro',
    name: 'Pro',
    price: '$9.99/mo',
    color: 'phantom-emerald',
    perks: ['Priority Matchmaking', '1.5x Reward Multiplier', 'Advanced Stats', 'Custom Avatar Borders'],
    glow: 'rgba(46,204,113,0.1)'
  },
  {
    id: 'elite',
    name: 'Phantom Elite',
    price: '$24.99/mo',
    color: 'phantom-gold',
    perks: ['Zero Session Fees', '2.5x Reward Multiplier', 'Syndicate Leadership', 'Exclusive Ghost Taunts', 'VIP Support'],
    glow: 'rgba(212,175,55,0.15)',
    isPopular: true
  }
];

const PERKS_LIST = [
  { icon: Zap, label: 'Instant Session Entry', desc: 'Skip the lobby queue for all tiers.' },
  { icon: Award, label: 'Multiplier Bonus', desc: 'Earn 2.5x more on every victory.' },
  { icon: Shield, label: 'Rivalry Protection', desc: 'Hidden status from lower-tier rivals.' },
  { icon: Star, label: 'Elite Badge', desc: 'Canonical membership signal on your Dossier.' },
];

export const MembershipVault = () => {
  const [activeView, setActiveView] = useState<'selection' | 'active'>('selection');
  const [selectedTier, setSelectedTier] = useState('elite');

  const containerVariants = {
    initial: { opacity: 0, y: 20 },
    animate: { 
      opacity: 1, 
      y: 0,
      transition: { duration: 0.5, staggerChildren: 0.1 }
    }
  };

  const itemVariants = {
    initial: { opacity: 0, scale: 0.95 },
    animate: { opacity: 1, scale: 1 }
  };

  return (
    <motion.div 
      className="px-6 pt-12 pb-24 min-h-screen bg-[#07070E] relative overflow-x-hidden"
      variants={containerVariants}
      initial="initial"
      animate="animate"
    >
      {/* Background Grid */}
      <div className="absolute inset-0 opacity-[0.02] pointer-events-none" 
           style={{ backgroundImage: 'linear-gradient(#fff 1px, transparent 1px), linear-gradient(90deg, #fff 1px, transparent 1px)', backgroundSize: '40px 40px' }} />

      <header className="mb-10 flex items-center justify-between">
        <div>
          <h2 className="text-white/40 text-[11px] font-black tracking-[0.3em] uppercase mb-1">Membership Vault</h2>
          <h1 className="text-3xl font-black tracking-tight text-white uppercase">
            {activeView === 'selection' ? 'Choose Tier' : 'Active Status'}
          </h1>
        </div>
        <button 
          onClick={() => setActiveView(activeView === 'selection' ? 'active' : 'selection')}
          className="w-12 h-12 rounded-full glass-panel flex items-center justify-center border-phantom-gold/20 text-phantom-gold"
        >
          <Crown size={24} />
        </button>
      </header>

      <AnimatePresence mode="wait">
        {activeView === 'selection' ? (
          <motion.div 
            key="selection"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 20 }}
            className="space-y-6"
          >
            {TIERS.map((tier) => (
              <motion.div
                key={tier.id}
                variants={itemVariants}
                onClick={() => setSelectedTier(tier.id)}
                className={cn(
                  "phantom-card p-8 rounded-[32px] relative overflow-hidden transition-all duration-500 cursor-pointer",
                  selectedTier === tier.id ? `border-${tier.color}/60 bg-${tier.color}/5` : "border-white/5 opacity-60 grayscale-[0.5]"
                )}
                style={{ boxShadow: selectedTier === tier.id ? `0 0 30px ${tier.glow}` : 'none' }}
              >
                {tier.isPopular && (
                  <div className="absolute top-0 right-8 bg-phantom-gold px-3 py-1 rounded-b-xl">
                    <span className="text-[9px] font-black text-black uppercase tracking-widest">Most Popular</span>
                  </div>
                )}
                
                <div className="flex justify-between items-start mb-6">
                  <div>
                    <h3 className={cn("text-2xl font-black uppercase tracking-tight", selectedTier === tier.id ? `text-${tier.color}` : "text-white")}>
                      {tier.name}
                    </h3>
                    <p className="text-sm font-bold text-white/40 mt-1">{tier.price}</p>
                  </div>
                  <div className={cn(
                    "w-6 h-6 rounded-full border-2 flex items-center justify-center transition-colors",
                    selectedTier === tier.id ? `border-${tier.color} bg-${tier.color}` : "border-white/10"
                  )}>
                    {selectedTier === tier.id && <Check size={14} className="text-black font-bold" />}
                  </div>
                </div>

                <ul className="space-y-3 mb-8">
                  {tier.perks.map((perk, i) => (
                    <li key={i} className="flex items-center gap-3 text-sm font-medium text-white/60">
                      <div className={cn("w-1.5 h-1.5 rounded-full", selectedTier === tier.id ? `bg-${tier.color}` : "bg-white/20")} />
                      {perk}
                    </li>
                  ))}
                </ul>

                <button className={cn(
                  "w-full h-14 rounded-2xl font-black text-sm uppercase transition-all",
                  selectedTier === tier.id ? "gold-button" : "bg-white/5 text-white/20"
                )}>
                  {selectedTier === tier.id ? 'Select Plan' : 'View Plan'}
                </button>
              </motion.div>
            ))}
          </motion.div>
        ) : (
          <motion.div 
            key="active"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            className="space-y-8"
          >
            {/* Active Membership Status */}
            <div className="phantom-card p-10 rounded-[40px] text-center relative overflow-hidden border-phantom-gold/30">
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_rgba(212,175,55,0.1)_0%,_transparent_70%)]" />
              <div className="relative z-10">
                <div className="w-24 h-24 bg-phantom-gold/10 rounded-full flex items-center justify-center mx-auto mb-6 border border-phantom-gold/30 shadow-[0_0_40px_rgba(212,175,55,0.2)]">
                  <Crown size={48} className="text-phantom-gold" fill="currentColor" />
                </div>
                <h3 className="gold-text text-3xl font-black tracking-tight mb-2 uppercase">Phantom Elite</h3>
                <p className="text-[11px] font-black text-phantom-gold tracking-[0.3em] uppercase mb-8">Active Since May 2026</p>
                
                <div className="bg-white/5 rounded-2xl p-4 flex justify-between items-center mb-6">
                  <div className="text-left">
                    <p className="text-[10px] font-black text-white/20 uppercase tracking-widest mb-1">Next Renewal</p>
                    <p className="text-sm font-black text-white">June 28, 2026</p>
                  </div>
                  <button className="text-[10px] font-black text-phantom-gold uppercase tracking-widest border border-phantom-gold/30 px-3 py-1.5 rounded-lg">
                    Manage
                  </button>
                </div>
              </div>
            </div>

            {/* Perks Grid */}
            <div className="space-y-4">
              <h4 className="text-[11px] font-black text-white/30 tracking-[0.3em] uppercase px-1">Active Perks</h4>
              <div className="grid grid-cols-1 gap-3">
                {PERKS_LIST.map((perk, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.1 }}
                    className="phantom-card p-5 rounded-[24px] flex items-center gap-5 group hover:bg-white/[0.02]"
                  >
                    <div className="w-12 h-12 rounded-[18px] bg-phantom-gold/10 flex items-center justify-center text-phantom-gold border border-phantom-gold/10 group-hover:border-phantom-gold/30 transition-colors">
                      <perk.icon size={24} />
                    </div>
                    <div>
                      <h5 className="text-[15px] font-black text-white tracking-tight uppercase">{perk.label}</h5>
                      <p className="text-[11px] text-white/40 font-bold tracking-tight mt-0.5">{perk.desc}</p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>

            <button className="w-full py-5 text-phantom-crimson font-black text-[11px] tracking-[0.3em] uppercase border border-phantom-crimson/20 rounded-2xl active:scale-95 transition-all">
              Cancel Membership
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};
