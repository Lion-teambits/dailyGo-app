import React, { useEffect } from 'react';
import { NativeBaseProvider } from 'native-base';
import AppStack from './src/stack/AppStack';
import startBackgroundTask from './utils/startBackgroundTask';

const App = () => {
  useEffect(() => {
    // start background task after mount
    startBackgroundTask();
  }, []);

  return (
    <NativeBaseProvider>
      <AppStack />
    </NativeBaseProvider>
  );
};

export default App;
