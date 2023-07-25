import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import HomeScreen from "../screens/tabnav/HomeScreen";
import ChallengesScreen from "../screens/tabnav/ChallengesScreen";
import AchievementsScreen from "../screens/tabnav/AchievementsScreen";
import ProfileScreen from "../screens/tabnav/ProfileScreen";
import { AnimatedTabBar } from "../styles/tabStackStyles";
import { ACCENT_MEDIUM } from "../constants/colorCodes";
import {
  TabAchievements,
  TabChallenges,
  TabHome,
  TabProfile,
} from "../../assets/images/icons/tabIcons";

const Tab = createBottomTabNavigator();

const TabStack = () => {
  return (
    <Tab.Navigator tabBar={(props) => <AnimatedTabBar {...props} />}>
      <Tab.Screen
        name="Home"
        component={HomeScreen}
        initialParams={{ challengeProgressID: null }}
        options={{
          headerShown: false,
          tabBarIcon: ({ active }) => (
            <TabHome fillColor={active ? ACCENT_MEDIUM : "white"} />
          ),
        }}
      />
      <Tab.Screen
        name="Challenges"
        component={ChallengesScreen}
        options={{
          tabBarIcon: ({ active }) => (
            <TabChallenges fillColor={active ? ACCENT_MEDIUM : "white"} />
          ),
        }}
      />
      <Tab.Screen
        name="Achievements"
        component={AchievementsScreen}
        options={{
          headerShown: false,
          tabBarIcon: ({ active }) => (
            <TabAchievements fillColor={active ? ACCENT_MEDIUM : "white"} />
          ),
        }}
      />
      <Tab.Screen
        name="Profile"
        component={ProfileScreen}
        options={{
          headerShown: false,
          tabBarIcon: ({ active }) => (
            <TabProfile fillColor={active ? ACCENT_MEDIUM : "white"} />
          ),
        }}
      />
    </Tab.Navigator>
  );
};

export default TabStack;
