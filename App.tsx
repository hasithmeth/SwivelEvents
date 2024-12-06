import { NavigationContainer } from '@react-navigation/native';
import React from 'react';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import WelcomeStack from './src/navigation/WelcomeStack';

function App(): React.JSX.Element {
  return (
    <SafeAreaProvider>
      <NavigationContainer>
        <WelcomeStack />
      </NavigationContainer>
    </SafeAreaProvider>
  );
}

export default App;
