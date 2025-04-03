import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Ionicons } from "@expo/vector-icons";

import LoginScreen from "../screens/LoginScreen"; // Ensure correct import

const Tab = createBottomTabNavigator();

export default function AppTabs() {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ color, size }) => {
          let iconName: "home" | "log-in" = route.name === "Home" ? "home" : "log-in";
          return <Ionicons name={iconName} size={size} color={color} />;
          
        },
        tabBarActiveTintColor: "#007AFF",
        tabBarInactiveTintColor: "gray",
        headerShown: false,
      })}
    >
      
      <Tab.Screen name="Login" component={LoginScreen} />
    </Tab.Navigator>
  );
}
