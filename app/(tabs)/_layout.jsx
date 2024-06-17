import { View, Text } from "react-native";
import React from "react";
import { Tabs } from "expo-router";

const TabLayout = () => {
  return (
    <Tabs>
      <Tabs.Screen
        name="Home"
        options={{
          title: "Home",
          headerShown: false,
          tabBarIcon: ({ color, focused }) => (
            <Text style={{ color }}>{focused ? "🏠" : "🏠"}</Text>
          ),
        }}
      />
      <Tabs.Screen
        name="Profile"
        options={{
          title: "Profile",
          //   headerShown: false,
          tabBarIcon: ({ color, focused }) => (
            <Text style={{ color }}>{focused ? "👤" : "👤"}</Text>
          ),
        }}
      />
      <Tabs.Screen
        name="Session"
        options={{
          title: "Settings",
          //   headerShown: false,
          tabBarIcon: ({ color, focused }) => (
            <Text style={{ color }}>{focused ? "⚙️" : "⚙️"}</Text>
          ),
        }}
      />
      <Tabs.Screen
        name="Schedule"
        options={{
          title: "Settings",
          //   headerShown: false,
          tabBarIcon: ({ color, focused }) => (
            <Text style={{ color }}>{focused ? "⚙️" : "⚙️"}</Text>
          ),
        }}
      />
    </Tabs>
  );
};

export default TabLayout;
