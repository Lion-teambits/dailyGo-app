import React from "react";
import { Center, Box, Heading, Button } from "native-base";
import { View, Text, StyleSheet, Image } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import Form from "../../components/forms/Form";
import { createUserWithEmailAndPassword, updateProfile } from "@firebase/auth";
import { auth } from "../../config/firebaseConfig";
import {
  SECONDARY_MEDIUM,
  PRIMARY_MEDIUM,
  PRIMARY_DARK,
} from "../../constants/colorCodes";
import { WELCOME_MONSTER, WELCOME_LOGO } from "../../constants/imagePaths";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";

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
    <View style={styles.container}>
      <View style={styles.welcomeHeader}>
        <MaterialCommunityIcons
          name="keyboard-backspace"
          size={24}
          color={PRIMARY_DARK}
          onPress={() => navigation.goBack()}
        />
        <Image source={WELCOME_LOGO} style={styles.welcomeLogo} />
      </View>
      <Image source={WELCOME_MONSTER} style={styles.welcomeImage} />
      <Text style={styles.welcomeText}>Daily walking towards your goals.</Text>
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
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    backgroundColor: "white",
  },
  welcomeHeader: {
    alignItems: "center",
    paddingTop: 60,
    marginBottom: "5%",
    flexDirection: "row",
    justifyContent: "flex-start",
    marginHorizontal: "4%",
  },

  welcomeLogo: {
    flex: 1,
    resizeMode: "contain",
    alignSelf: "center",
    width: 148,
    height: 46,
    marginRight: "7%",
  },

  welcomeImage: {
    width: 148,
    height: 156.67,
    marginBottom: "2%",
  },
  welcomeText: {
    fontSize: 24,
    fontWeight: "bold",
    textAlign: "center",
    color: PRIMARY_MEDIUM,
    width: "60%",
    // marginBottom: "10%",
  },
  button: {
    width: "87%",
    height: 40,
    padding: 10,
    marginBottom: 8,
    borderRadius: 24,
    backgroundColor: SECONDARY_MEDIUM,
  },
  formButton: {
    width: "87%",
    height: 40,
    padding: 10,
    marginBottom: 8,
    borderRadius: 24,
    backgroundColor: SECONDARY_MEDIUM,
  },
});

export default SignupScreen;
