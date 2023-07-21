import React, { useEffect } from "react";
import { NativeBaseProvider } from "native-base";
import AppStack from "./src/stack/AppStack";
import startBackgroundTask from "./src/services/startBackgroundTask";
import { LogBox } from "react-native";
import { BUILD_MODE } from "./src/constants/buildOptions";

const App = () => {
  useEffect(() => {
    // start background task after mounting
    startBackgroundTask();

    if (BUILD_MODE == "release") {
      LogBox.ignoreLogs(["Warning: ..."]); // Ignore log notification by message
      LogBox.ignoreAllLogs(); //Ignore all log notifications
    }
  }, []);

  return (
    <NativeBaseProvider>
      <AppStack />
    </NativeBaseProvider>
  );
};

export default App;
