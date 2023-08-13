import React, { useCallback, useEffect, useState } from "react";
import { NativeBaseProvider } from "native-base";
import AppStack from "./src/stack/AppStack";
import startBackgroundTask from "./src/services/startBackgroundTask";
import { LogBox, StyleSheet, View } from "react-native";
import { BUILD_MODE } from "./src/constants/buildOptions";
import * as SplashScreen from "expo-splash-screen";
import LottieView from "lottie-react-native";

const App = () => {
  const [appIsReady, setAppIsReady] = useState(false);

  useEffect(() => {
    if (BUILD_MODE == "release") {
      LogBox.ignoreLogs(["Warning: ..."]); // Ignore log notification by message
      LogBox.ignoreAllLogs(); //Ignore all log notifications
    }
  }, []);

  if (!appIsReady) {
    return (
      <View style={styles.splashContainer}>
        <LottieView
          source={require("./assets/images/Splashscreen_DailyGo.json")}
          autoPlay
          loop={false}
          onAnimationFinish={() => {
            console.log("animation finished");
            setAppIsReady(true);
          }}
        />
      </View>
    );
  } else {
    return (
      <NativeBaseProvider>
        <AppStack />
      </NativeBaseProvider>
    );
  }
};

export default App;

const styles = StyleSheet.create({
  splashContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "white",
  },
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
});
