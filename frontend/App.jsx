import { Lato_400Regular, useFonts } from '@expo-google-fonts/lato';
import React from 'react';
import { Text } from 'react-native';
import Navigator from './src/routes/Navigator';
import { Provider } from 'react-redux'
import storeConfig from './src/store/storeConfig'

const store = storeConfig()
const Redux = () => (
  <Provider store={store}>
    <Navigator />
  </Provider>
)

export default function App() {
  const [fontsLoaded] = useFonts({
    Lato_400Regular
  });

  if (!fontsLoaded)
    return <Text></Text>

  return (
    <Redux />
  )

}