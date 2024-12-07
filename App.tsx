import React from 'react';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { Provider } from 'react-redux';
import ToastProvider from './src/components/toast/ToastProvider';
import RootNavigator from './src/navigation/RootNavigator';
import { store } from './src/store/store';

function App(): React.JSX.Element {
  return (
    <SafeAreaProvider>
      <Provider store={store}>
        <ToastProvider>
          <RootNavigator />
        </ToastProvider>
      </Provider>
    </SafeAreaProvider>
  );
}

export default App;
