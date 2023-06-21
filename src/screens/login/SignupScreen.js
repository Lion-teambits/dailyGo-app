import React from "react";
import { Center, Box, Heading, Button } from "native-base";
import { View, Text } from 'react-native';
import { Ionicons } from "@expo/vector-icons";
import Form from "../../components/forms/Form";

const SignupScreen = ({ navigation }) => {
  const handleSignupGmail = () => {
    // Logic for signing up with Gmail
  };

  const handleSignupEmail = () => {
    // Logic for signing up with email and password
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
