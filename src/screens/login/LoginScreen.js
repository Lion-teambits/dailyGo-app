import React, { useEffect, useState } from "react";
import { Center, Box, Heading, Button } from "native-base";
import { Ionicons } from "@expo/vector-icons";
import Form from "../../components/forms/Form";
import * as Google from "expo-auth-session/providers/google";
import * as WebBrowser from "expo-web-browser";
import {
  GoogleAuthProvider,
  onAuthStateChanged,
  signInWithCredential,
} from "firebase/auth";
import { auth } from "../../config/firebaseConfig";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { IOS_CLIENT_ID, ANDROID_CLIENT_ID } from "@env";

WebBrowser.maybeCompleteAuthSession();

const LoginScreen = ({ navigation }) => {
  const [userInfo, setUserInfo] = useState();
  const [request, response, promptAsync] = Google.useAuthRequest({
    iosClientId: IOS_CLIENT_ID,
    androidClientId: ANDROID_CLIENT_ID,
  });

  useEffect(() => {
    if (response?.type == "success") {
      console.log("[dev]Google Login: ", response);
      const { id_token } = response.params;
      const credential = GoogleAuthProvider.credential(id_token);
      signInWithCredential(auth, credential);
    }
  }, [response]);

  const handleLoginGmail = () => {
    // Logic for signing in with Gmail
    promptAsync();
  };

  const handleLoginEmail = () => {
    // Logic for signing in with email and password
    navigation.navigate("Onboarding");
  };

  const handleSignup = () => {
    navigation.navigate("Signup");
  };

  return (
    <Center flex={1}>
      <Box safeArea p="2" py="8" w="90%" maxW="290">
        <Heading
          size="lg"
          fontWeight="600"
          color="coolGray"
          _dark={{ color: "warmGray" }}
        >
          Login
        </Heading>
        <Button
          variant="outline"
          colorScheme="black"
          onPress={handleLoginGmail}
          startIcon={<Ionicons name="logo-google" />}
        >
          Login with Gmail
        </Button>

        <Form
          buttonText="Login"
          handleSubmit={handleLoginEmail}
          handleLink={handleSignup}
          linkText="Don't have an account? "
        />
      </Box>
    </Center>
  );
};

export default LoginScreen;
