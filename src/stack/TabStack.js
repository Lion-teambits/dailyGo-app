import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import HomeScreen from "../screens/tabnav/HomeScreen";
import ChallengesScreen from "../screens/tabnav/ChallengesScreen";
import AchievementsScreen from "../screens/tabnav/AchievementsScreen";
import ProfileScreen from "../screens/tabnav/ProfileScreen";

const Tab = createBottomTabNavigator();

const TabStack = () => {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;

          if (route.name === "Home") {
            iconName = focused ? "home" : "home-outline";
          } else if (route.name === "Challenges") {
            iconName = focused ? "sword-cross" : "sword-cross";
          } else if (route.name === "Achievements") {
            iconName = focused ? "star-circle" : "star-circle-outline";
          } else if (route.name === "Profile") {
            iconName = focused ? "face-man-profile" : "face-man-profile";
          }

          return (
            <MaterialCommunityIcons name={iconName} size={size} color={color} />
          );
        },
      })}
    >
      <Tab.Screen
        name="Home"
        component={HomeScreen}
        initialParams={{ challengeProgressID: null }}
      />
      <Tab.Screen name="Challenges" component={ChallengesScreen} />
      <Tab.Screen
        name="Achievements"
        component={AchievementsScreen}
        options={{ headerShown: false }}
      />
      <Tab.Screen name="Profile" component={ProfileScreen} />
    </Tab.Navigator>
  );
};

export default TabStack;
