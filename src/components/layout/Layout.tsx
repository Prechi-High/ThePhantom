import React from 'react';
import { BottomNav } from '../navigation/BottomNav';

interface LayoutProps {
  children: React.ReactNode;
  activeTab: string;
  onTabChange: (tab: string) => void;
  showNav?: boolean;
}

export const Layout: React.FC<LayoutProps> = ({ children, activeTab, onTabChange, showNav = true }) => {
  return (
    <div className="relative min-h-screen bg-phantom-navy overflow-hidden">
      {/* Background Atmosphere */}
      <div className="fixed inset-0 pointer-events-none">
        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-phantom-amber/5 rounded-full blur-[120px]" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-phantom-crimson/5 rounded-full blur-[120px]" />
      </div>

      {/* Main Content Area */}
      <main className={`relative z-10 ${showNav ? 'pb-[84px]' : 'pb-0'}`}>
        {children}
      </main>

      {/* Bottom Navigation */}
      {showNav && <BottomNav activeTab={activeTab} onTabChange={onTabChange} />}
    </div>
  );
};
