import React from 'react';
import { motion } from 'framer-motion';
import { Wallet, ChevronLeft, Award, Zap, Clock } from 'lucide-react';
import { cn } from '../utils/cn';

const TRANSACTION_HISTORY = [
  { id: 1, type: 'win', label: 'Rush Hour Victory', amount: '+4.20', time: 'Just Now', status: 'Swept' },
  { id: 2, type: 'fee', label: 'Morning Grind Entry', amount: '-1.00', time: '2h ago', status: 'Paid' },
  { id: 3, type: 'win', label: 'Death Hour Payout', amount: '+12.50', time: 'Yesterday', status: 'Swept' },
];

interface PhantomVaultProps {
  onBack: () => void;
}

export const PhantomVault: React.FC<PhantomVaultProps> = ({ onBack }) => {
  return (
    <div className="px-6 pt-12 pb-24 min-h-screen bg-[#07070E] relative overflow-x-hidden">
      {/* Background Grid Pattern */}
      <div className="absolute inset-0 opacity-[0.02] pointer-events-none" 
           style={{ backgroundImage: 'linear-gradient(#fff 1px, transparent 1px), linear-gradient(90deg, #fff 1px, transparent 1px)', backgroundSize: '40px 40px' }} />

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <header className="mb-8 flex items-center gap-4">
          <button onClick={onBack} className="w-10 h-10 rounded-full glass-panel flex items-center justify-center border-white/5 active:scale-90 transition-transform">
            <ChevronLeft size={20} className="text-white/40" />
          </button>
          <div>
            <p className="text-white/40 text-[10px] font-black tracking-[0.3em] uppercase mb-1">Vault Management</p>
            <h1 className="text-3xl font-black text-white tracking-tight">PHANTOM VAULT</h1>
          </div>
        </header>

        {/* Balance Card */}
        <div className="glass-panel p-8 rounded-[32px] mb-8 relative overflow-hidden bg-gradient-to-br from-phantom-gold/10 to-transparent border-phantom-gold/20">
           <div className="absolute top-0 right-0 p-6 opacity-10">
              <Wallet size={120} className="text-phantom-gold" />
           </div>
           
           <p className="text-white/40 text-[10px] font-black tracking-widest uppercase mb-2">Available Capital</p>
           <div className="flex items-baseline gap-2 mb-8">
              <span className="text-2xl font-black text-phantom-gold">$</span>
              <span className="text-6xl font-black text-white tracking-tighter">247.50</span>
           </div>

           <div className="grid grid-cols-2 gap-4">
              <button className="h-14 gold-button rounded-2xl font-black text-xs uppercase shadow-[0_0_20px_rgba(212,175,55,0.3)] active:scale-95 transition-transform">
                Quick Deposit
              </button>
              <button className="h-14 glass-panel rounded-2xl font-black text-xs text-white uppercase active:scale-95 transition-transform">
                Withdraw
              </button>
           </div>
        </div>

        {/* Stats Row */}
        <div className="grid grid-cols-2 gap-4 mb-8">
           <div className="glass-panel p-5 rounded-[24px]">
              <div className="flex items-center gap-2 mb-2">
                 <Award size={14} className="text-phantom-gold" />
                 <p className="text-[10px] font-black text-white/40 uppercase">Total Won</p>
              </div>
              <p className="text-xl font-black text-white">$1,240.80</p>
           </div>
           <div className="glass-panel p-5 rounded-[24px]">
              <div className="flex items-center gap-2 mb-2">
                 <Zap size={14} className="text-phantom-emerald" />
                 <p className="text-[10px] font-black text-white/40 uppercase">Efficiency</p>
              </div>
              <p className="text-xl font-black text-white">84%</p>
           </div>
        </div>

        {/* Transaction History */}
        <div className="space-y-4">
           <h3 className="text-[10px] font-black text-white/20 tracking-[0.3em] uppercase px-1">Tactical Ledger</h3>
           <div className="space-y-2">
              {TRANSACTION_HISTORY.map((tx, i) => (
                <motion.div 
                  key={tx.id}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.1 }}
                  className="glass-panel p-5 rounded-2xl flex items-center justify-between group hover:bg-white/5 transition-colors"
                >
                   <div className="flex items-center gap-4">
                      <div className={cn(
                        "w-10 h-10 rounded-xl flex items-center justify-center",
                        tx.type === 'win' ? "bg-phantom-emerald/10 text-phantom-emerald" : "bg-white/5 text-white/40"
                      )}>
                        {tx.type === 'win' ? <Zap size={18} /> : <Clock size={18} />}
                      </div>
                      <div>
                         <p className="text-sm font-bold text-white mb-0.5">{tx.label}</p>
                         <p className="text-[10px] font-bold text-white/20 uppercase tracking-tighter">{tx.time}</p>
                      </div>
                   </div>
                   <div className="text-right">
                      <p className={cn(
                        "text-sm font-black",
                        tx.type === 'win' ? "text-phantom-emerald" : "text-white"
                      )}>
                        {tx.amount}
                      </p>
                      <p className="text-[9px] font-black text-white/10 uppercase">{tx.status}</p>
                   </div>
                </motion.div>
              ))}
           </div>
        </div>
      </motion.div>
    </div>
  );
};
