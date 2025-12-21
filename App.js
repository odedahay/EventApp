import { useEffect } from 'react';
import AppContextProvider from './store/appContext';
import RootNavigator from './navigation/rootNavigation';
import Toast from 'react-native-toast-message';

// Fonts
import { useFonts } from 'expo-font';
import * as SplashScreen from 'expo-splash-screen';


SplashScreen.preventAutoHideAsync();

export default function App() {
  const [loaded, error] = useFonts({
    'Pacifico':require('./assets/fonts/Pacifico.ttf'),
    'Anton':require('./assets/fonts/Anton.ttf'),
  })

  useEffect(() => {
    if (loaded || error) {
      SplashScreen.hideAsync();
    }
  }, [loaded, error]);

  if(!loaded && !error) { return null}

  return (
    <>
      <AppContextProvider>
        <RootNavigator/>
      </AppContextProvider>
      <Toast />
    </>
    
  );
}
