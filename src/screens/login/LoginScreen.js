import React, { useEffect, useState } from "react";
import { Center, Box, Button, KeyboardAvoidingView } from "native-base";
import { View, Text, StyleSheet, Image } from "react-native";
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
import { PRIMARY_MEDIUM, PRIMARY_DARK } from "../../constants/colorCodes";
import { WELCOME_MONSTER, WELCOME_LOGO } from "../../constants/imagePaths";
import { MaterialCommunityIcons } from "@expo/vector-icons";

WebBrowser.maybeCompleteAuthSession();

const LoginScreen = ({ navigation }) => {
  const [userInfo, setUserInfo] = useState();
  const [request, response, promptAsync] = Google.useAuthRequest({
    iosClientId: IOS_CLIENT_ID,
    androidClientId: ANDROID_CLIENT_ID,
  });

  useEffect(() => {
    if (response?.type == "success") {
      const { id_token } = response.params;
      const credential = GoogleAuthProvider.credential(id_token);
      signInWithCredential(auth, credential);
    }
  }, [response]);

  const moveToNextPage = async (user) => {
    if (user) {
      try {
        await AsyncStorage.setItem("@uid", user.uid);
        await AsyncStorage.setItem("@accessToken", user.accessToken);
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
        <Box safeArea>
          <Button
            onPress={handleLoginGmail}
            title="Login with Google"
            accessibilityLabel="Login with Google"
            borderRadius={24}
            maxHeight={10}
            marginBottom={20}
            variant="outline"
            borderColor={PRIMARY_MEDIUM}
          >
            <View style={{ flexDirection: "row", alignItems: "center" }}>
              <Image
                source={require("../../../assets/images/icons/google.png")}
                style={{ width: 20, height: 20 }}
              />
              <Text
                style={{
                  marginLeft: 5,
                  color: PRIMARY_MEDIUM,
                  fontWeight: "bold",
                }}
              >
                Login with Google
              </Text>
            </View>
          </Button>
          <Text style={styles.loginText}>Or login with your email</Text>

          <KeyboardAvoidingView
            behavior={Platform.OS === "ios" ? "padding" : "height"}
          >
            <Form
              buttonText="Login with Email"
              handleSubmit={handleLoginEmail}
              style={styles.formButton}
              handleLink={handleSignup}
              linkText="Don't have an account? "
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
    marginBottom: "10%",
  },
  loginText: {
    fontSize: 14,
    fontWeight: "bold",
    textAlign: "center",
    color: PRIMARY_DARK,
  },
});

export default LoginScreen;
