import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import WelcomeScreen from "../screens/login/WelcomeScreen";
import LoginScreen from "../screens/login/LoginScreen";
import SignupScreen from "../screens/login/SignupScreen";
import OnboardingScreen from "../screens/login/OnboardingScreen";
import PreferencesScreen from "../screens/login/PreferencesScreen";
import TabStack from "./TabStack";
import ChallengeDetailScreen from "../screens/challenge/ChallengeDetailScreen";
import BadgeList from "../components/list/BadgeList";
import BadgeItem from "../components/listitems/BadgeItem";
import GroupChallengeScreen from "../screens/challenge/GroupChallengeScreen";
import CreateGroupChallengeScreen from "../screens/challenge/CreateGroupChallengeScreen";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { PRIMARY_DARK } from "../constants/colorCodes";

const Stack = createStackNavigator();

const backIconOptions = {
  headerBackImage: () => (
    <MaterialCommunityIcons
      name="keyboard-backspace"
      size={24}
      color={PRIMARY_DARK}
      style={{padding: 12}}
    />
  ),
  headerBackTitleVisible: false,
};

const AppStack = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="WelcomeScreen">
        <Stack.Screen
          name="Welcome"
          component={WelcomeScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Login"
          component={LoginScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Signup"
          component={SignupScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Onboarding"
          component={OnboardingScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Preferences"
          component={PreferencesScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="HomeScreen"
          component={TabStack}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="ChallengeDetail"
          component={ChallengeDetailScreen}
          options={backIconOptions}
        />

        <Stack.Screen
          name="CreateGroupChallenge"
          component={CreateGroupChallengeScreen}
          options={backIconOptions}
        />
        <Stack.Screen
          name="GroupChallenge"
          component={GroupChallengeScreen}
          options={backIconOptions}
        />
        <Stack.Screen
          name="BadgeList"
          component={BadgeList}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="BadgeItem"
          component={BadgeItem}
          options={{ headerShown: false }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default AppStack;
