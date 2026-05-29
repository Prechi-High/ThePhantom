import React from 'react';
import { motion } from 'framer-motion';
import { Wallet, Shield, ChevronRight } from 'lucide-react';

interface CommandCenterProps {
  onOpenVault: () => void;
  onOpenMembership: () => void;
}

export const CommandCenter: React.FC<CommandCenterProps> = ({ onOpenVault, onOpenMembership }) => {
  const containerVariants = {
    initial: { opacity: 0, y: 12 },
    animate: { 
      opacity: 1, 
      y: 0,
      transition: {
        duration: 0.32,
        ease: [0.22, 1, 0.36, 1],
        staggerChildren: 0.06
      }
    }
  };

  const itemVariants = {
    initial: { opacity: 0, y: 16 },
    animate: { 
      opacity: 1, 
      y: 0,
      transition: { duration: 0.32, ease: "easeOut" }
    }
  };

  return (
    <motion.div 
      className="px-6 pt-12 pb-24 min-h-screen bg-[#07070E] relative overflow-x-hidden"
      variants={containerVariants}
      initial="initial"
      animate="animate"
    >
      {/* Background Grid Pattern */}
      <div className="absolute inset-0 opacity-[0.02] pointer-events-none" 
           style={{ backgroundImage: 'linear-gradient(#fff 1px, transparent 1px), linear-gradient(90deg, #fff 1px, transparent 1px)', backgroundSize: '40px 40px' }} />

      {/* Header Section */}
      <motion.header variants={itemVariants} className="flex items-center justify-between mb-10">
        <div className="flex items-center gap-4">
          <button onClick={onOpenMembership} className="w-14 h-14 rounded-full p-[1.5px] bg-gradient-to-b from-[#F5E6AD] via-[#D4AF37] to-[#8A6D3B] active:scale-90 transition-transform">
            <div className="w-full h-full rounded-full overflow-hidden bg-black">
              <img 
                src="https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&q=80&w=100" 
                alt="Avatar" 
                className="w-full h-full object-cover grayscale-[0.2]"
              />
            </div>
          </button>
          <div>
            <p className="text-white/40 text-[11px] font-black tracking-[0.2em] uppercase mb-1">Welcome back,</p>
            <div className="flex flex-col">
              <h2 className="text-[16px] font-black text-white tracking-tight">@GeminiDesigner.</h2>
              <button onClick={onOpenMembership} className="flex items-center gap-1.5 mt-0.5 active:scale-95 transition-transform">
                 <div className="w-4 h-4 border border-phantom-gold/40 rounded-full flex items-center justify-center text-[10px] text-phantom-gold font-serif">Ψ</div>
                 <span className="text-phantom-gold text-[10px] font-black tracking-[0.3em] uppercase">Phantom Elite</span>
              </button>
            </div>
          </div>
        </div>
        
        <button 
          onClick={onOpenVault}
          className="phantom-card px-5 py-3.5 text-right group active:scale-95 transition-all relative overflow-hidden"
        >
          <p className="text-2xl font-black text-white leading-none tracking-tighter">$247.50</p>
          <div className="flex items-center justify-end gap-1 mt-1.5">
            <span className="text-[10px] font-black text-white/20 uppercase tracking-widest group-hover:text-phantom-gold transition-colors">Manage Wallet</span>
            <ChevronRight size={12} className="text-white/20 group-hover:text-phantom-gold transition-colors" />
          </div>
        </button>
      </motion.header>

      {/* The Next Descent Card */}
      <motion.div variants={itemVariants}
        className="relative mb-10 p-[1px] rounded-[36px] bg-gradient-to-b from-phantom-emerald/40 via-phantom-emerald/10 to-transparent"
        whileHover={{ scale: 1.01 }}
        transition={{ type: "spring", stiffness: 300, damping: 20 }}
      >
        <div className="bg-[#0A0A0A]/95 backdrop-blur-2xl p-9 rounded-[35px] overflow-hidden relative border border-white/5">
           <div className="text-center mb-8">
              <p className="text-white/40 text-[11px] font-black tracking-[0.4em] uppercase mb-3">The Next Descent</p>
              <h1 className="text-[72px] font-black tracking-tighter text-white leading-none mb-4 tabular-nums">00:14:28</h1>
              <p className="text-white/30 text-[11px] font-bold max-w-[240px] mx-auto leading-relaxed uppercase tracking-widest">
                Contextual session breakdown pulse rhymon lims
              </p>
           </div>

           <div className="mb-8">
              <div className="flex justify-between items-end mb-3 px-1">
                 <div>
                    <p className="text-[11px] font-black text-white/40 uppercase tracking-widest mb-1">Live Capacity</p>
                    <p className="text-sm font-black text-white">
                      <span className="text-phantom-emerald">74</span> <span className="text-white/20">/</span> 100 <span className="text-white/40">Seats Claimed</span>
                    </p>
                 </div>
                 <div className="flex items-center gap-1.5 mb-0.5">
                    <div className="flex -space-x-2.5 mr-2">
                       {[1, 2, 3, 4].map(i => (
                         <div key={i} className="w-7 h-7 rounded-full border-2 border-[#0A0A0A] bg-[#1A1A1A] overflow-hidden shadow-lg">
                            <img src={`https://i.pravatar.cc/100?img=${i+15}`} className="w-full h-full object-cover grayscale-[0.2]" />
                         </div>
                       ))}
                    </div>
                 </div>
              </div>
              <div className="h-2 bg-white/5 rounded-full overflow-hidden p-[1px]">
                 <motion.div 
                  initial={{ width: 0 }}
                  animate={{ width: '74%' }}
                  transition={{ duration: 1.5, ease: "easeOut" }}
                  className="h-full bg-phantom-emerald rounded-full shadow-[0_0_20px_rgba(46,204,113,0.4)]" 
                 />
              </div>
           </div>

           <motion.button 
             whileTap={{ scale: 0.97 }}
             className="w-full h-[68px] gold-button rounded-[20px] font-black tracking-tight text-[16px] uppercase shadow-[0_10px_30px_rgba(212,175,55,0.2)]"
           >
              Lock My Seat ($5.00)
           </motion.button>
        </div>
      </motion.div>

      {/* Sessions Horizontal Scroll */}
      <motion.div variants={itemVariants} className="mb-10">
         <div className="flex items-center justify-between mb-4 px-1">
            <h3 className="text-[11px] font-black text-white/30 tracking-[0.3em] uppercase">Tactical Zones</h3>
         </div>
         <div className="flex gap-4 overflow-x-auto pb-4 no-scrollbar">
            {[
              { id: 1, name: 'Morning Grind', fee: '$1 Entry', result: 'Placed 14th / 100. +$4.20 swept.' },
              { id: 2, name: 'Rush Hour', fee: '$5 Entry', active: true, result: 'Live prize pool tracking at $500+.' },
              { id: 3, name: 'Death Hour', fee: '$10 Entry', result: '21:00 Start. 14 Rounds. Pure friction.' }
            ].map(s => (
              <div key={s.id} className="phantom-card min-w-[160px] p-6 relative group flex flex-col justify-between h-48">
                 <div>
                    <p className="text-[11px] font-black text-white/20 mb-3">{s.id}</p>
                    <h3 className="text-sm font-black text-white leading-tight mb-1 uppercase tracking-tight">{s.name}</h3>
                    <p className="text-[10px] font-black text-white/40 mb-4">{s.fee}</p>
                 </div>
                 <p className="text-[10px] text-white/30 leading-relaxed font-bold uppercase tracking-tight">
                   {s.result}
                 </p>
              </div>
            ))}
         </div>
      </motion.div>

      {/* Bottom Widgets */}
      <motion.div variants={itemVariants} className="grid grid-cols-2 gap-4">
         <div className="phantom-card p-6 flex flex-col justify-between h-56">
            <h4 className="text-[11px] font-black text-white tracking-[0.2em] uppercase">The Outlaws</h4>
            <div className="flex gap-2.5 mb-5">
               {[1, 2, 3].map(i => (
                  <div key={i} className="w-9 h-9 rounded-full p-[1.5px] bg-gradient-to-b from-phantom-emerald/60 to-transparent">
                     <div className="w-full h-full rounded-full overflow-hidden bg-black border border-black">
                        <img src={`https://i.pravatar.cc/100?img=${i+25}`} className="w-full h-full rounded-full object-cover grayscale-[0.2]" />
                     </div>
                  </div>
               ))}
            </div>
            <p className="text-[10px] text-white/30 leading-relaxed uppercase font-black tracking-tight">
              Mists, Trish, and Bruno are standing by.
            </p>
         </div>

         <div className="phantom-card p-6 flex flex-col justify-between h-56">
            <h4 className="text-[11px] font-black text-white tracking-[0.2em] uppercase mb-5">Rival Tracker</h4>
            <div className="bg-phantom-crimson/[0.08] p-3 rounded-2xl border border-phantom-crimson/20">
               <div className="flex items-center gap-3">
                  <div className="w-7 h-7 rounded-full overflow-hidden border border-phantom-crimson/40">
                     <img src="https://i.pravatar.cc/100?img=11" className="w-full h-full object-cover grayscale-[0.3]" />
                  </div>
                  <span className="text-[11px] font-black text-phantom-crimson tracking-tight">@Viper77</span>
               </div>
            </div>
            <p className="text-[10px] text-white/30 leading-relaxed uppercase font-black tracking-tight">
              Registered for Rush Hour.
            </p>
         </div>
      </motion.div>
    </motion.div>
  );
};
