import React from "react";
import { Center, Box, Heading, Button, KeyboardAvoidingView } from "native-base";
import { View, Text } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import Form from "../../components/forms/Form";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  updateProfile,
} from "@firebase/auth";
import { auth } from "../../config/firebaseConfig";
import AsyncStorage from "@react-native-async-storage/async-storage";

const SignupScreen = ({ navigation }) => {
  const handleSignupGmail = () => {
    // Logic for signing up with Gmail
  };

  const handleSignupEmail = async (name, email, password) => {
    // Logic for signing up with email and password
    try {
      const { user } = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      await updateProfile(user, {
        displayName: name,
      });
      const emailUser = await signInWithEmailAndPassword(auth, email, password);
      await AsyncStorage.setItem("@uid", emailUser.user.uid);
      await AsyncStorage.setItem("@accessToken", emailUser.user.accessToken);
      navigation.navigate("Onboarding", { user });
    } catch (error) {
      console.log("There was a problem creating account: ", error);
    }
  };

  const handleLogin = () => {
    navigation.navigate("Login");
  };

  return (
    <Center flex={1}>
      <Box
        safeArea
        p="2"
        py="8"
        w="90%"
        maxW="290"
      >
        <Heading>Sign Up</Heading>

        <Button onPress={handleSignupGmail}>
          <View style={{ flexDirection: "row", alignItems: "center" }}>
            <Ionicons name="logo-google" />
            <Text style={{ marginLeft: 5 }}>Login with Gmail</Text>
          </View>
        </Button>
        <KeyboardAvoidingView
          behavior={Platform.OS === "ios" ? "padding" : "height"}
        >
          <Form
            buttonText="Sign Up"
            handleSubmit={handleSignupEmail}
            handleLink={handleLogin}
            linkText="Already have an account? "
            showNameField={true}
          />
        </KeyboardAvoidingView>
      </Box>
    </Center>
  );
};

export default SignupScreen;
