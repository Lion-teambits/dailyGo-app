import AsyncStorage from "@react-native-async-storage/async-storage";
import React from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { createUserInfo } from "../../api/userService";

const name = "Mufasa";
const photo =
  "https://cdn.pixabay.com/photo/2021/05/15/10/59/lion-6255523_1280.jpg";

const PreferencesScreen = ({ navigation }) => {
  const handleAnswer = async (steps) => {
    try {
      const uid = await AsyncStorage.getItem("@uid");
      if (!(uid === null)) {
        await createUserInfo(name, photo, steps, uid);
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
