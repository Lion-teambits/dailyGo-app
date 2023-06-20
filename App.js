import React, { useEffect } from 'react';
import { NativeBaseProvider } from 'native-base';
import AppStack from './src/stack/AppStack';
import startBackgroundTask from './src/services/startBackgroundTask';

const App = () => {
  useEffect(() => {
    // start background task after mounting
    startBackgroundTask();
  }, []);

  return (
    <NativeBaseProvider>
      <AppStack />
    </NativeBaseProvider>
  );
};

export default App;
