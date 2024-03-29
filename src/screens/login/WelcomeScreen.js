import React from "react";
import { ScrollView, View, Text, TouchableOpacity, Image } from "react-native";
import {
  TXT_DARK_BG,
  PRIMARY_MEDIUM,
  SECONDARY_MEDIUM,
} from "../../constants/colorCodes";
import { WELCOME_MONSTER, WELCOME_LOGO } from "../../constants/imagePaths";
import Typography from "../../components/typography/typography";

const WelcomePage = ({ navigation }) => {
  const handleLogin = () => {
    navigation.navigate("Login");
  };

  const handleSignup = () => {
    navigation.navigate("Signup");
  };

  return (
    <ScrollView style={styles.scrollContainer}>
      <View style={styles.container}>
        <View style={styles.welcomeHeader}>
          <Image source={WELCOME_LOGO} style={styles.welcomeLogo} />
        </View>
        <Image source={WELCOME_MONSTER} style={styles.welcomeImage} />
        <Typography type="heading4" style={styles.welcomeText}>
          Daily walking towards your goals.
        </Typography>
        <TouchableOpacity style={styles.signupButton} onPress={handleSignup}>
          <Typography type="button" style={styles.signupButtonText}>
            Sign up on DailyGo
          </Typography>
        </TouchableOpacity>
        <TouchableOpacity style={styles.loginButton} onPress={handleLogin}>
          <Typography type="button" style={styles.loginButtonText}>
            Login with your account
          </Typography>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

const styles = {
  scrollContainer: {
    backgroundColor: "white",
  },
  container: {
    flex: 1,
    alignItems: "center",
    backgroundColor: "white",
  },
  welcomeHeader: {
    alignItems: "center",
    paddingTop: 60,
    marginBottom: "25%",
  },

  welcomeLogo: {
    width: 148,
    height: 46,
  },

  welcomeImage: {
    width: 222,
    height: 235,
    marginBottom: "10%",
  },
  welcomeText: {
    textAlign: "center",
    color: PRIMARY_MEDIUM,
    width: "60%",
    marginBottom: "30%",
  },
  signupButton: {
    backgroundColor: TXT_DARK_BG,
    width: "87%",
    height: 40,
    padding: 10,
    marginBottom: 16,
    borderRadius: 24,
    borderColor: PRIMARY_MEDIUM,
    borderWidth: 1,
  },
  signupButtonText: {
    textAlign: "center",
    color: PRIMARY_MEDIUM,
  },
  loginButton: {
    backgroundColor: SECONDARY_MEDIUM,
    width: "87%",
    height: 40,
    padding: 10,
    marginBottom: 8,
    borderRadius: 24,
  },
  loginButtonText: {
    textAlign: "center",
    color: TXT_DARK_BG,
  },
};

export default WelcomePage;
