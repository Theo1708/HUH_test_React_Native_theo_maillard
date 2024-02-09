import { SafeAreaProvider } from 'react-native-safe-area-context';
import { StatusBar } from 'expo-status-bar';

import MainPage from './views/MainPage';

import Colors from './styles/colors';

export default function App() {
  return (
    <>
      <SafeAreaProvider style={{backgroundColor : Colors.CARD_BACKGROUND}}>
        <MainPage />
      </SafeAreaProvider>
      <StatusBar style="auto" />
    </>
  );
}