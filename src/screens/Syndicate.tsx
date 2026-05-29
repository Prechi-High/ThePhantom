import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Users, TrendingUp, Link as LinkIcon, UserPlus, Shield } from 'lucide-react';
import { cn } from '../utils/cn';
import { Odometer } from '../components/ui/Odometer';

const TABS = ['SYNDICATE HQ', 'PROGRESSION'];

const SQUAD_MEMBERS = [
  { id: 1, name: 'Viper77', winRate: '78%', contribution: '24.5k', isOnline: true },
  { id: 2, name: 'Ghost_X', winRate: '62%', contribution: '18.2k', isOnline: true },
  { id: 3, name: 'NeonPulse', winRate: '54%', contribution: '12.1k', isOnline: false },
  { id: 4, name: 'ShadowUnit', winRate: '81%', contribution: '32.8k', isOnline: true },
  { id: 5, name: 'Cipher', winRate: '49%', contribution: '8.4k', isOnline: false },
];

export const Syndicate = () => {
  const [activeTab, setActiveTab] = useState('SYNDICATE HQ');

  const containerVariants = {
    initial: { scale: 0.7, opacity: 0 },
    animate: { 
      scale: 1, 
      opacity: 1,
      transition: { 
        type: "spring",
        stiffness: 300,
        damping: 18,
        duration: 0.4
      }
    }
  };

  const listVariants = {
    animate: {
      transition: {
        staggerChildren: 0.08
      }
    }
  };

  const itemVariants = {
    initial: { y: 20, opacity: 0 },
    animate: { 
      y: 0, 
      opacity: 1,
      transition: { duration: 0.3, ease: "easeOut" }
    }
  };

  return (
    <motion.div 
      className="px-6 pt-12 pb-24 min-h-screen bg-[#07070E] relative overflow-x-hidden"
      variants={containerVariants}
      initial="initial"
      animate="animate"
    >
      <header className="mb-10">
        <h2 className="text-white/40 text-[11px] font-black tracking-[0.3em] uppercase mb-1">Team Command</h2>
        <h1 className="text-3xl font-black tracking-tight text-white uppercase">Syndicate</h1>
      </header>

      {/* Internal Tabs */}
      <div className="flex bg-white/[0.03] p-1.5 rounded-[18px] mb-10 border border-white/5">
        {TABS.map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={cn(
              "flex-1 py-2.5 text-[10px] font-black tracking-[0.2em] rounded-xl transition-all uppercase",
              activeTab === tab ? "bg-white text-black shadow-lg" : "text-white/30"
            )}
          >
            {tab}
          </button>
        ))}
      </div>

      <AnimatePresence mode="wait">
        {activeTab === 'SYNDICATE HQ' ? (
          <motion.div
            key="hq"
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 10 }}
            className="space-y-8"
          >
            {/* Collective Vault */}
            <div className="phantom-card p-8 rounded-[32px] bg-gradient-to-br from-phantom-amber/[0.05] to-transparent border-phantom-amber/20 relative overflow-hidden">
              <div className="absolute -right-10 -top-10 w-32 h-32 bg-phantom-amber/5 rounded-full blur-[60px]" />
              <div className="flex items-center justify-between mb-6">
                <p className="text-[11px] font-black text-phantom-amber tracking-[0.3em] uppercase">Collective Vault</p>
                <TrendingUp size={18} className="text-phantom-amber" />
              </div>
              <div className="flex items-baseline gap-2">
                <span className="text-3xl font-black text-white/40">$</span>
                <span className="text-5xl font-black text-white tracking-tighter tabular-nums">
                  <Odometer value={1240500} />
                </span>
              </div>
              <div className="mt-6 pt-6 border-t border-white/5">
                <p className="text-[10px] text-white/30 font-black uppercase tracking-widest">
                  Survival Dividend: <span className="text-phantom-emerald ml-1">12.5%</span>
                </p>
              </div>
            </div>

            {/* Killer Roster with Staggered Entry */}
            <motion.div variants={listVariants} initial="initial" animate="animate" className="space-y-4">
              <h4 className="text-[11px] font-black text-white/30 tracking-[0.3em] uppercase px-1">Killer Roster</h4>
              <div className="space-y-3">
                {SQUAD_MEMBERS.map((member) => (
                  <motion.div
                    key={member.id}
                    variants={itemVariants}
                    className="phantom-card p-5 rounded-[24px] flex items-center justify-between group hover:bg-white/[0.02] transition-all"
                  >
                    <div className="flex items-center gap-4">
                      <div className="relative">
                        <div className="w-11 h-11 rounded-full p-[1px] bg-white/10">
                          <div className="w-full h-full rounded-full bg-black overflow-hidden">
                             <img src={`https://i.pravatar.cc/100?img=${member.id+40}`} className="w-full h-full object-cover grayscale-[0.2]" />
                          </div>
                        </div>
                        {member.isOnline && (
                          <div className="absolute bottom-0 right-0 w-3 h-3 bg-phantom-emerald rounded-full border-[2.5px] border-[#07070E] shadow-[0_0_8px_rgba(46,204,113,0.6)]" />
                        )}
                      </div>
                      <div>
                        <p className="text-[15px] font-black text-white tracking-tight">{member.name}</p>
                        <p className="text-[10px] text-white/20 uppercase font-black tracking-widest mt-0.5">
                          Win Rate: <span className="text-white/40">{member.winRate}</span>
                        </p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="text-[14px] font-black text-white tracking-tight">${member.contribution}</p>
                      <p className="text-[9px] text-white/20 uppercase font-black tracking-widest mt-0.5">Contribution</p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </motion.div>
        ) : (
          <motion.div
            key="progression"
            initial={{ opacity: 0, x: 10 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -10 }}
            className="space-y-8"
          >
            {/* Ascension Rampart */}
            <div className="phantom-card p-10 rounded-[40px] text-center relative overflow-hidden">
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_rgba(212,175,55,0.05)_0%,_transparent_70%)]" />
              <div className="w-24 h-24 bg-phantom-amber/10 rounded-full flex items-center justify-center mx-auto mb-8 border border-phantom-amber/20 shadow-[0_0_40px_rgba(243,156,18,0.1)] relative z-10">
                <Shield size={40} className="text-phantom-amber" />
              </div>
              <h3 className="text-2xl font-black mb-3 tracking-tight text-white uppercase relative z-10">Bronze Syndicate</h3>
              <p className="text-[12px] text-white/40 mb-10 max-w-[220px] mx-auto font-bold uppercase tracking-widest leading-relaxed relative z-10">
                Ascend through the ranks to unlock Phantom Elite status.
              </p>
              
              <div className="relative h-2.5 bg-white/5 rounded-full overflow-hidden mb-4 p-[1px] relative z-10">
                <motion.div 
                  initial={{ width: 0 }}
                  animate={{ width: '78%' }}
                  transition={{ duration: 1.2, delay: 0.5, ease: "circOut" }}
                  className="absolute inset-y-0 left-0 bg-phantom-amber shadow-[0_0_15px_rgba(243,156,18,0.5)] rounded-full"
                />
              </div>
              <div className="flex justify-between items-center text-[10px] font-black tracking-[0.2em] text-white/20 uppercase relative z-10">
                <span>Bronze</span>
                <span className="text-phantom-amber">78% Progress</span>
                <span>Silver</span>
              </div>
            </div>

            {/* Actions Grid */}
            <div className="grid grid-cols-2 gap-4">
              <motion.button whileTap={{ scale: 0.96 }} className="phantom-card p-8 rounded-[28px] flex flex-col items-center justify-center gap-4 group active:bg-white/[0.02]">
                <div className="w-12 h-12 rounded-2xl bg-white/[0.03] flex items-center justify-center group-hover:text-white transition-colors">
                  <LinkIcon size={24} className="text-white/30" />
                </div>
                <span className="text-[10px] font-black tracking-[0.3em] uppercase text-white/40">Invite Link</span>
              </motion.button>
              <motion.button whileTap={{ scale: 0.96 }} className="phantom-card p-8 rounded-[28px] flex flex-col items-center justify-center gap-4 group active:bg-white/[0.02]">
                <div className="w-12 h-12 rounded-2xl bg-white/[0.03] flex items-center justify-center group-hover:text-white transition-colors relative">
                  <UserPlus size={24} className="text-white/30" />
                  <div className="absolute -top-1 -right-1 w-2.5 h-2.5 bg-phantom-amber rounded-full border-2 border-[#07070E]" />
                </div>
                <span className="text-[10px] font-black tracking-[0.3em] uppercase text-white/40">Petitioners</span>
              </motion.button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};
