import React from 'react';
import { Text } from 'react-native'
import Auth from './src/screens/Auth';
import { useFonts, Lato_400Regular } from '@expo-google-fonts/lato';

export default function App() {
  const [fontsLoaded] = useFonts({
    Lato_400Regular
  });

  if (!fontsLoaded)
    return <Text>Loading...</Text>

  return (
    <Auth />
  );
}