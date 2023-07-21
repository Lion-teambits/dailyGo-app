import AsyncStorage from "@react-native-async-storage/async-storage";
import React, { useState } from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { createUserInfo } from "../../api/userService";
import { useNavigation } from "@react-navigation/native";
import { AVATAR_6 } from "../../constants/imagePaths";
import {
  SECONDARY_MEDIUM,
  TXT_DARK_BG,
  PRIMARY_DARK,
  PRIMARY_MEDIUM,
} from "../../constants/colorCodes";

const name = "Mufasa";
const photo = AVATAR_6;

const PreferencesScreen = ({ route }) => {
  const navigation = useNavigation();
  const userInfo = route.params.userInfo.user;
  const [selectedSteps, setSelectedSteps] = useState(0);
  const [selectedButtonIndex, setSelectedButtonIndex] = useState(-1);

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

  const submitButton = () => {
    handleAnswer(selectedSteps);
  };

  const isSubmitDisabled = selectedSteps === 0;

  return (
    <View style={styles.container}>
      <Text style={styles.questionText}>
        How much do you think you walk per day?
      </Text>
      <TouchableOpacity
        style={[
          styles.button,
          selectedButtonIndex === 0 && styles.selectedButton,
        ]}
        onPress={() => {
          setSelectedSteps(3000);
          setSelectedButtonIndex(0);
        }}
      >
        <Text
          style={[
            styles.buttonText,
            selectedButtonIndex === 0 && styles.selectedButtonText,
          ]}
        >
          I don’t walk much
        </Text>
        <Text
          style={[
            styles.buttonSmallText,
            selectedButtonIndex === 0 && styles.selectedButtonText,
          ]}
        >
          You just walk inside your house to grab some food and go to the
          bathroom.
        </Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={[
          styles.button,
          selectedButtonIndex === 1 && styles.selectedButton,
        ]}
        onPress={() => {
          setSelectedSteps(5000);
          setSelectedButtonIndex(1);
        }}
      >
        <Text
          style={[
            styles.buttonText,
            selectedButtonIndex === 1 && styles.selectedButtonText,
          ]}
        >
          I walk a little bit
        </Text>
        <Text
          style={[
            styles.buttonSmallText,
            selectedButtonIndex === 1 && styles.selectedButtonText,
          ]}
        >
          Although you spend most of the time seated, you go to some places near
          you on foot.
        </Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={[
          styles.button,
          selectedButtonIndex === 2 && styles.selectedButton,
        ]}
        onPress={() => {
          setSelectedSteps(8000);
          setSelectedButtonIndex(2);
        }}
      >
        <Text
          style={[
            styles.buttonText,
            selectedButtonIndex === 2 && styles.selectedButtonText,
          ]}
        >
          I usually walk, but I want a challenge
        </Text>
        <Text
          style={[
            styles.buttonSmallText,
            selectedButtonIndex === 2 && styles.selectedButtonText,
          ]}
        >
          You are very close to have a more active lifestyle, but without goals
          and consistency.
        </Text>
      </TouchableOpacity>
      <Text style={styles.normalText}>
        Don’t worry, you can change your preferences later.
      </Text>
      <TouchableOpacity
        style={[styles.submitButton, isSubmitDisabled && styles.disabledButton]}
        onPress={submitButton}
        disabled={isSubmitDisabled}
      >
        <Text style={styles.submitButtonText}>I'm ready for my challenge!</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = {
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "white",
  },
  questionText: {
    fontSize: 24,
    fontWeight: "bold",
    color: PRIMARY_MEDIUM,
    margin: 50,
    textAlign: "center",
  },
  button: {
    backgroundColor: "white",
    padding: 15,
    marginVertical: 10,
    shadowOffset: { width: 4, height: 4 },
    shadowColor: PRIMARY_DARK,
    shadowOpacity: 0.17,
    shadowRadius: 12,
    width: 358,
    height: 89,
    borderRadius: 8,
  },
  selectedButton: {
    backgroundColor: PRIMARY_MEDIUM,
  },
  buttonText: {
    fontSize: 16,
    color: PRIMARY_MEDIUM,
    fontWeight: "bold",
    paddingTop: 5,
    paddingBottom: 5,
  },
  selectedButtonText: {
    color: TXT_DARK_BG,
  },
  buttonSmallText: {
    fontSize: 12,
    color: PRIMARY_MEDIUM,
  },
  normalText: {
    fontSize: 16,
    color: PRIMARY_DARK,
    textAlign: "center",
    padding: 50,
  },
  submitButton: {
    backgroundColor: SECONDARY_MEDIUM,
    width: "87%",
    height: 40,
    padding: 10,
    marginBottom: 8,
    borderRadius: 24,
  },
  submitButtonText: {
    fontSize: 16,
    fontWeight: "bold",
    textAlign: "center",
    color: TXT_DARK_BG,
  },
  disabledButton: {
    backgroundColor: "rgba(0, 0, 0, 0.15)",
  },
};

export default PreferencesScreen;
