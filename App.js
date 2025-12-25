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
    'Montserrat-Medium':require('./assets/fonts/Montserrat-Medium.ttf'),
    'Roboto_Condensed-SemiBold':require('./assets/fonts/Roboto_Condensed-SemiBold.ttf'),
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
