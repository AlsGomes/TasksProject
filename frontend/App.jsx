import { Lato_400Regular, useFonts } from '@expo-google-fonts/lato';
import React from 'react';
import { Text } from 'react-native';
import Navigator from './src/routes/Navigator';

export default function App() {
  const [fontsLoaded] = useFonts({
    Lato_400Regular
  });
  
  if (!fontsLoaded)
    return <Text></Text>

  return (
    <Navigator />
  );
}