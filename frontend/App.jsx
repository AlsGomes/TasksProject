import { Lato_400Regular, useFonts } from '@expo-google-fonts/lato';
import AppLoading from 'expo-app-loading';
import React from 'react';
import { Provider } from 'react-redux';
import Navigator from './src/routes/Navigator';
import storeConfig from './src/store/storeConfig';

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
    return <AppLoading />

  return (
    <Redux />
  )

}