import React from "react";
import { Center, Box, Heading, Button } from "native-base";
import { View, Text } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import Form from "../../components/forms/Form";
import { createUserWithEmailAndPassword, updateProfile } from "@firebase/auth";
import { auth } from "../../config/firebaseConfig";

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
      navigation.navigate("Login");
    } catch (error) {
      console.log("There was a problem creating account: ", error);
    }
  };

  const handleLogin = () => {
    navigation.navigate("Login");
  };

  return (
    <Center flex={1}>
      <Box safeArea p="2" py="8" w="90%" maxW="290">
        <Heading>Sign Up</Heading>

        <Button onPress={handleSignupGmail}>
          <View style={{ flexDirection: "row", alignItems: "center" }}>
            <Ionicons name="logo-google" />
            <Text style={{ marginLeft: 5 }}>Login with Gmail</Text>
          </View>
        </Button>

        <Form
          buttonText="Sign Up"
          handleSubmit={handleSignupEmail}
          handleLink={handleLogin}
          linkText="Already have an account? "
          showNameField={true}
        />
      </Box>
    </Center>
  );
};

export default SignupScreen;
