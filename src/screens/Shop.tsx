import React from 'react';
import { motion } from 'framer-motion';
import { ChevronLeft, Zap, ShoppingCart, ShieldCheck, Target, Zap as ZapIcon, Shield } from 'lucide-react';
import { cn } from '../utils/cn';

interface ShopItem {
  id: string;
  name: string;
  description: string;
  price: number;
  icon: React.ElementType;
  color: string;
  rarity: 'common' | 'rare' | 'epic' | 'legendary';
}

const SHOP_ITEMS: ShopItem[] = [
  {
    id: 'phantom-shroud',
    name: 'Phantom Shroud',
    description: 'Invisible to rivals for 60 seconds.',
    price: 450,
    icon: Shield,
    color: 'phantom-emerald',
    rarity: 'rare'
  },
  {
    id: 'kinetic-burst',
    name: 'Kinetic Burst',
    description: '3x speed multiplier for next round.',
    price: 800,
    icon: ZapIcon,
    color: 'phantom-amber',
    rarity: 'epic'
  },
  {
    id: 'neural-target',
    name: 'Neural Target',
    description: 'Auto-lock on highest token targets.',
    price: 1200,
    icon: Target,
    color: 'phantom-crimson',
    rarity: 'legendary'
  },
  {
    id: 'basic-shield',
    name: 'Armor Plate',
    description: 'Absorbs 50% damage from one strike.',
    price: 150,
    icon: ShieldCheck,
    color: 'white/40',
    rarity: 'common'
  }
];

interface ShopProps {
  onBack: () => void;
  onPurchaseComplete?: () => void;
}

export const Shop = ({ onBack, onPurchaseComplete }: ShopProps) => {
  const containerVariants = {
    initial: { opacity: 0 },
    animate: { 
      opacity: 1,
      transition: { staggerChildren: 0.1 }
    }
  };

  const itemVariants = {
    initial: { y: 20, opacity: 0 },
    animate: { y: 0, opacity: 1 }
  };

  return (
    <motion.div 
      className="px-6 pt-12 pb-32 min-h-screen bg-[#07070E] relative overflow-x-hidden"
      variants={containerVariants}
      initial="initial"
      animate="animate"
    >
      {/* Background HUD Grid */}
      <div className="absolute inset-0 opacity-[0.03] pointer-events-none" 
           style={{ backgroundImage: 'linear-gradient(#fff 1px, transparent 1px), linear-gradient(90deg, #fff 1px, transparent 1px)', backgroundSize: '40px 40px' }} />

      <header className="mb-10 flex items-center justify-between">
        <button 
          onClick={onBack}
          className="w-10 h-10 rounded-full glass-panel flex items-center justify-center border-white/5 active:scale-95 transition-transform"
        >
          <ChevronLeft size={20} className="text-white/40" />
        </button>
        <div className="text-center">
          <h2 className="text-phantom-gold text-[10px] font-black tracking-[0.4em] uppercase mb-1">Armory</h2>
          <h1 className="text-2xl font-black tracking-tight text-white uppercase">The Shop</h1>
        </div>
        <div className="w-10 h-10 rounded-full glass-panel flex items-center justify-center border-phantom-gold/20">
          <ShoppingCart size={18} className="text-phantom-gold" />
        </div>
      </header>

      {/* Balance HUD */}
      <motion.div variants={itemVariants} className="phantom-card p-6 mb-8 border-phantom-gold/20 bg-phantom-gold/[0.02] flex justify-between items-center">
        <div>
          <p className="text-[10px] font-black text-white/20 uppercase tracking-widest mb-1">Available Capital</p>
          <p className="text-3xl font-black text-white">$4,820.00</p>
        </div>
        <div className="h-12 w-[1px] bg-white/10" />
        <div className="text-right">
          <p className="text-[10px] font-black text-phantom-emerald uppercase tracking-widest mb-1">Session Profit</p>
          <p className="text-lg font-black text-phantom-emerald">+$1,240</p>
        </div>
      </motion.div>

      {/* Item Categories */}
      <motion.div variants={itemVariants} className="flex gap-4 mb-8 overflow-x-auto no-scrollbar pb-2">
        {['All Items', 'Tactical', 'Offense', 'Defense'].map((cat, i) => (
          <button 
            key={cat}
            className={cn(
              "px-6 py-3 rounded-full text-[10px] font-black uppercase tracking-widest whitespace-nowrap transition-all",
              i === 0 ? "bg-white text-black" : "bg-white/5 text-white/40 border border-white/5"
            )}
          >
            {cat}
          </button>
        ))}
      </motion.div>

      {/* Items Grid */}
      <div className="grid grid-cols-1 gap-4">
        {SHOP_ITEMS.map((item) => (
          <motion.div 
            key={item.id}
            variants={itemVariants}
            whileTap={{ scale: 0.98 }}
            className="phantom-card p-5 rounded-[28px] border-white/5 hover:border-white/10 transition-colors cursor-pointer flex items-center gap-5"
          >
            <div className={cn(
              "w-16 h-16 rounded-2xl flex items-center justify-center relative overflow-hidden",
              `bg-${item.color}/10 border border-${item.color}/20`
            )}>
              <item.icon className={cn("z-10", `text-${item.color}`)} size={28} />
              <div className={cn("absolute inset-0 opacity-20 blur-xl", `bg-${item.color}`)} />
            </div>

            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2 mb-1">
                <h3 className="text-[13px] font-black text-white uppercase truncate">{item.name}</h3>
                <span className={cn(
                  "text-[8px] font-black uppercase px-2 py-0.5 rounded-full",
                  item.rarity === 'legendary' ? "bg-phantom-crimson text-white" :
                  item.rarity === 'epic' ? "bg-phantom-amber text-black" :
                  item.rarity === 'rare' ? "bg-phantom-emerald text-black" : "bg-white/10 text-white/60"
                )}>
                  {item.rarity}
                </span>
              </div>
              <p className="text-[11px] font-bold text-white/40 leading-tight line-clamp-1">{item.description}</p>
            </div>

            <div className="text-right">
              <p className="text-[14px] font-black text-white mb-1">${item.price}</p>
              <button className="text-[9px] font-black text-phantom-gold uppercase tracking-widest">Buy Now</button>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Fixed Bottom Action */}
      <div className="fixed bottom-10 left-6 right-6 z-40">
        <motion.button 
          whileTap={{ scale: 0.96 }}
          onClick={onPurchaseComplete}
          className="w-full h-16 bg-white text-black rounded-2xl flex items-center justify-center gap-3 shadow-[0_10px_40px_rgba(255,255,255,0.1)]"
        >
          <Zap size={20} fill="currentColor" />
          <span className="text-[16px] font-black uppercase tracking-tight">Ready for Deployment</span>
        </motion.button>
      </div>
    </motion.div>
  );
};
