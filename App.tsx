import '@react-native-firebase/app';
import React from 'react';
import { StatusBar } from 'react-native';
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
          <StatusBar barStyle={'dark-content'} />
          <RootNavigator />
        </ToastProvider>
      </Provider>
    </SafeAreaProvider>
  );
}

export default App;
