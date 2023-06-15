import React from "react";
import { Center, Box, Heading, Button } from "native-base";
import { Ionicons } from "@expo/vector-icons";
import Form from "../../components/forms/Form";

const LoginScreen = ({ navigation }) => {
  const handleLoginGmail = () => {
    // Logic for signing in with Gmail
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
