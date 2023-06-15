import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";
import { NativeBaseProvider } from "native-base";
import AppStack from "./src/stack/AppStack";

export default function App() {
  return (
    <NativeBaseProvider>
      <AppStack />
      {/* <View style={styles.container}>
        <Text>🦁 DailyGo! 👺</Text>
        <StatusBar style="auto" />
      </View> */}
    </NativeBaseProvider>
  );
}

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: "#fff",
//     alignItems: "center",
//     justifyContent: "center",
//   },
// });
