import React from "react";
import { Center, Box, Button, KeyboardAvoidingView } from "native-base";
import { View, StyleSheet, Image } from "react-native";
import Form from "../../components/forms/Form";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  updateProfile,
} from "@firebase/auth";
import { auth } from "../../config/firebaseConfig";
import { PRIMARY_MEDIUM, PRIMARY_DARK } from "../../constants/colorCodes";
import { WELCOME_MONSTER, WELCOME_LOGO } from "../../constants/imagePaths";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import Typography from "../../components/typography/typography";

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
      <Typography type="heading4" style={styles.welcomeText}>
        Daily walking towards your goals.
      </Typography>
      <Center flex={1}>
        <Box safeArea>
          <Button
            onPress={handleSignupGmail}
            borderRadius={24}
            maxHeight={10}
            variant="outline"
            borderColor={PRIMARY_MEDIUM}
          >
            <View style={{ flexDirection: "row", alignItems: "center" }}>
              <Image
                source={require("../../../assets/images/icons/google.png")}
                style={{ width: 20, height: 20 }}
              />
              <Typography
                type="button"
                style={{
                  marginLeft: 5,
                  color: PRIMARY_MEDIUM,
                }}
              >
                Sign up with Google
              </Typography>
            </View>
          </Button>

          <Typography type="button" style={styles.signupText}>
            Or create a new account
          </Typography>
          <KeyboardAvoidingView
            behavior={Platform.OS === "ios" ? "padding" : "height"}
          >
            <Form
              buttonText="Create new account"
              handleSubmit={handleSignupEmail}
              handleLink={handleLogin}
              linkText="Already have an account? "
              showNameField={true}
            />
          </KeyboardAvoidingView>
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
    alignSelf: "center",
    width: 148,
    height: 156.67,
    marginBottom: "2%",
  },
  welcomeText: {
    alignSelf: "center",
    textAlign: "center",
    color: PRIMARY_MEDIUM,
    width: "60%",
    marginBottom: "30%",
  },
  signupText: {
    textAlign: "center",
    color: PRIMARY_DARK,
    marginTop: "10%",
  },
});

export default SignupScreen;
