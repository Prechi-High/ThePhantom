import { useState, useCallback } from 'react';

export type ScreenId = 
  | 'home' 
  | 'sessions' 
  | 'arena' 
  | 'syndicate' 
  | 'dossier' 
  | 'vault' 
  | 'membership' 
  | 'lobby' 
  | 'shop' 
  | 'round' 
  | 'spin' 
  | 'steal' 
  | 'resurrection' 
  | 'death' 
  | 'winner'
  | 'spectator'
  | 'recap';

export function useNavigation() {
  const [currentScreen, setCurrentScreen] = useState<ScreenId>('home');

  const navigateTo = useCallback((screen: ScreenId) => {
    setCurrentScreen(screen);
  }, []);

  return {
    currentScreen,
    navigateTo
  };
}
