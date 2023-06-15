import { NativeBaseProvider } from "native-base";
import AppStack from "./src/stack/AppStack";

export default function App() {
  return (
    <NativeBaseProvider>
      <AppStack />
    </NativeBaseProvider>
  );
}
