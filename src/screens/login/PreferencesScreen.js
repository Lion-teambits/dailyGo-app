import AsyncStorage from "@react-native-async-storage/async-storage";
import React from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { createUserInfo } from "../../api/userService";
import { useNavigation } from "@react-navigation/native";
import { AVATAR_6 } from "../../constants/imagePaths";

const name = "Mufasa";
const photo = AVATAR_6;

const PreferencesScreen = ({ route }) => {
  const navigation = useNavigation();
  const userInfo = route.params.userInfo.user;
  const handleAnswer = async (steps) => {
    try {
      const uid = await AsyncStorage.getItem("@uid");
      if (!(uid === null)) {
        if (userInfo) {
          await createUserInfo(userInfo.displayName, photo, steps, uid);
        } else {
          await createUserInfo(name, photo, steps, uid);
        }
      }
      navigation.navigate("HomeScreen");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.questionText}>
        How much do you think you walk on your daily basis?
      </Text>
      <TouchableOpacity
        style={styles.button}
        onPress={() => handleAnswer(3000)}
      >
        <Text style={styles.buttonText}>I don’t walk much</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.button}
        onPress={() => handleAnswer(5000)}
      >
        <Text style={styles.buttonText}>I walk a little bit</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.button}
        onPress={() => handleAnswer(8000)}
      >
        <Text style={styles.buttonText}>
          I usually walk, but I want a challenge
        </Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = {
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  questionText: {
    fontSize: 25,
    fontWeight: "bold",
    margin: 50,
    textAlign: "center",
  },
  button: {
    backgroundColor: "#eaeaea",
    padding: 10,
    marginVertical: 10,
  },
  buttonText: {
    fontSize: 16,
    fontWeight: "bold",
  },
};

export default PreferencesScreen;
