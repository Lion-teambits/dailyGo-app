import React, { useEffect, useState } from "react";
import { Center, Box, Heading, Button } from "native-base";
import { View, Text } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import Form from "../../components/forms/Form";
import * as Google from "expo-auth-session/providers/google";
import * as WebBrowser from "expo-web-browser";
import {
  GoogleAuthProvider,
  onAuthStateChanged,
  signInWithCredential,
  signInWithEmailAndPassword,
} from "firebase/auth";
import { auth } from "../../config/firebaseConfig";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { IOS_CLIENT_ID, ANDROID_CLIENT_ID } from "@env";
import { retrieveUserInfo } from "../../api/userService";

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

  const moveToNextPage = async (user) => {
    if (user) {
      try {
        await AsyncStorage.setItem("@uid", user.uid);
        const userInfo = await retrieveUserInfo(user.uid);
        if (userInfo == null) {
          navigation.navigate("Onboarding", { user });
        } else {
          navigation.navigate("HomeScreen");
        }
      } catch (error) {
        if (user) {
          navigation.navigate("Onboarding", { user });
        } else {
          console.log("Login Fail. ", error);
        }
      }
    }
  };

  useEffect(() => {
    onAuthStateChanged(auth, async (user) => {
      moveToNextPage(user);
    });
  }, []);

  const handleLoginGmail = () => {
    // Logic for signing in with Gmail
    promptAsync();
  };

  const handleLoginEmail = async (email, password) => {
    try {
      const { user } = await signInWithEmailAndPassword(auth, email, password);
      moveToNextPage(user);
    } catch (error) {
      console.log("Login Fail. ", error);
    }
  };

  const handleSignup = () => {
    navigation.navigate("Signup");
  };

  return (
    <Center flex={1}>
      <Box safeArea p="2" py="8" w="90%" maxW="290">
        <Heading>Login</Heading>
        <Button onPress={handleLoginGmail}>
          <View style={{ flexDirection: "row", alignItems: "center" }}>
            <Ionicons name="logo-google" />
            <Text style={{ marginLeft: 5 }}>Login with Gmail</Text>
          </View>
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
