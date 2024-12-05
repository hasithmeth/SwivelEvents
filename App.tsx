import { NavigationContainer } from '@react-navigation/native';
import React from 'react';

import WelcomeStack from './src/navigation/WelcomeStack';

function App(): React.JSX.Element {
  return (
    <NavigationContainer>
      <WelcomeStack />
    </NavigationContainer>
  );
}

export default App;
