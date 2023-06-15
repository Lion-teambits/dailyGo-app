import React from "react";
import { View, Text, TouchableOpacity } from "react-native";

const PreferencesScreen = ({ navigation }) => {
  const handleAnswer = () => {
    // Logic for handling the selected answer
    navigation.navigate("HomeScreen");
  };

  return (
    <View style={styles.container}>
      <Text style={styles.questionText}>
        How much do you think you walk on your daily basis?
      </Text>
      <TouchableOpacity style={styles.button} onPress={handleAnswer}>
        <Text style={styles.buttonText}>I don’t walk much</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.button} onPress={handleAnswer}>
        <Text style={styles.buttonText}>I walk a little bit</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.button} onPress={handleAnswer}>
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
