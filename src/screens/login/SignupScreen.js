import React from "react";
import { Center, Box, Heading, Button } from "native-base";
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
        <Heading
          size="lg"
          fontWeight="600"
          color="coolGray"
          _dark={{ color: "warmGray" }}
        >
          Sign Up
        </Heading>

        <Button
          variant="outline"
          colorScheme="black"
          onPress={handleSignupGmail}
          startIcon={<Ionicons name="logo-google" />}
        >
          Sign Up with Gmail
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
