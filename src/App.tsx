import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Layout } from './components/layout/Layout';
import { TheDescent } from './screens/TheDescent';
import { CommandCenter } from './screens/CommandCenter';
import { PhantomVault } from './screens/PhantomVault';
import { Sessions } from './screens/Sessions';
import { Arena } from './screens/Arena';
import { Syndicate } from './screens/Syndicate';
import { Dossier } from './screens/Dossier';
import { MembershipVault } from './screens/MembershipVault';
import { Lobby } from './screens/Lobby';
import { Shop } from './screens/Shop';
import { RoundTarget } from './screens/RoundTarget';
import { SpinPhase } from './screens/SpinPhase';
import { StealPhase } from './screens/StealPhase';
import { Resurrection } from './screens/Resurrection';
import { DeathScreen } from './screens/DeathScreen';
import { WinnerScreen } from './screens/WinnerScreen';
import { SpectatorVantage } from './screens/SpectatorVantage';
import { Recap } from './screens/Recap';
import { useNavigation, type ScreenId } from './hooks/useNavigation';

function App() {
  const [hasOnboarded, setHasOnboarded] = useState(false);
  const { currentScreen, navigateTo } = useNavigation();

  const renderScreen = () => {
    switch (currentScreen) {
      case 'home':
        return (
          <CommandCenter 
            onOpenVault={() => navigateTo('vault')} 
            onOpenMembership={() => navigateTo('membership')}
          />
        );
      case 'vault':
        return <PhantomVault onBack={() => navigateTo('home')} />;
      case 'sessions':
        return <Sessions onEnterZone={() => navigateTo('lobby')} />;
      case 'arena':
        return <Arena onSessionEnd={() => navigateTo('spin')} />;
      case 'syndicate':
        return <Syndicate />;
      case 'dossier':
        return <Dossier />;
      case 'membership':
        return <MembershipVault onBack={() => navigateTo('home')} />;
      case 'lobby':
        return <Lobby onBack={() => navigateTo('sessions')} onCommence={() => navigateTo('shop')} />;
      case 'shop':
        return <Shop onBack={() => navigateTo('lobby')} onPurchaseComplete={() => navigateTo('round')} />;
      case 'round':
        return <RoundTarget onContinue={() => navigateTo('arena')} />;
      case 'spin':
        return <SpinPhase onComplete={() => navigateTo('steal')} />;
      case 'steal':
        return <StealPhase onComplete={() => navigateTo('arena')} />;
      case 'resurrection':
        return (
          <Resurrection 
            eliminatedUser={{ name: 'Ghost_X', avatar: '12', tokens: 15 }} 
            onRevived={() => navigateTo('arena')} 
            onFailed={() => navigateTo('death')} 
          />
        );
      case 'death':
        return (
          <DeathScreen 
            stats={{ placement: 14, tokens: 42, eliminatedBy: 'Viper77', round: 8 }} 
            onRestart={() => navigateTo('sessions')} 
            onHome={() => navigateTo('home')} 
          />
        );
      case 'winner':
        return (
          <WinnerScreen 
            stats={{ prize: '$1,240.00', tokens: 152, eliminations: 8, reputation: 450 }} 
            onHome={() => navigateTo('home')} 
          />
        );
      case 'spectator':
        return <SpectatorVantage />;
      case 'recap':
        return <Recap onHome={() => navigateTo('home')} />;
      default:
        return <CommandCenter onOpenVault={() => navigateTo('vault')} onOpenMembership={() => navigateTo('membership')} />;
    }
  };

  // Bottom navigation only visible on primary screens
  const showNav = ['home', 'sessions', 'arena', 'syndicate', 'dossier'].includes(currentScreen);

  return (
    <AnimatePresence mode="wait">
      {!hasOnboarded ? (
        <TheDescent key="onboarding" onComplete={() => setHasOnboarded(true)} />
      ) : (
        <Layout 
          key="main" 
          activeTab={['vault', 'membership'].includes(currentScreen) ? 'home' : currentScreen} 
          onTabChange={(tab) => navigateTo(tab as ScreenId)}
          showNav={showNav}
        >
          <AnimatePresence mode="wait">
            <motion.div
              key={currentScreen}
              initial={{ opacity: 0, x: 10 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -10 }}
              transition={{ duration: 0.3 }}
            >
              {renderScreen()}
            </motion.div>
          </AnimatePresence>
        </Layout>
      )}
    </AnimatePresence>
  );
}

export default App;
