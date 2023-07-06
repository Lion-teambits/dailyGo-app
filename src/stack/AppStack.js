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

const Stack = createStackNavigator();

const AppStack = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="WelcomeScreen">
        <Stack.Screen
          name="Welcome"
          component={WelcomeScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen name="Login" component={LoginScreen} />
        <Stack.Screen name="Signup" component={SignupScreen} />
        <Stack.Screen name="Onboarding" component={OnboardingScreen} />
        <Stack.Screen name="Preferences" component={PreferencesScreen} />
        <Stack.Screen
          name="HomeScreen"
          component={TabStack}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="ChallengeDetail"
          component={ChallengeDetailScreen}
        />
        <Stack.Screen name="GroupChallenge" component={GroupChallengeScreen} />
        <Stack.Screen name="BadgeList" component={BadgeList} />
        <Stack.Screen name="BadgeItem" component={BadgeItem} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default AppStack;
