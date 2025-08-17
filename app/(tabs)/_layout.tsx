// app/(tabs)/_layout.tsx
import React from "react";
import { Tabs } from "expo-router";
import { Platform } from "react-native";
import {
  Home,
  Salad,
  Dumbbell,
  CalendarDays,
  Settings as SettingsIcon,
} from "lucide-react-native";
import { colors } from "../../theme";

const ICON_SIZE = 22;

export default function TabsLayout() {
  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: colors.primary,
        tabBarInactiveTintColor: "#9ca3af", // เทาอ่อน
        tabBarStyle: {
          backgroundColor: "#fff",
          borderTopColor: "#e5e7eb",
          height: Platform.select({ ios: 80, android: 80 }),
          paddingBottom: Platform.select({ ios: 8, android: 8 }),
        },
        tabBarLabelStyle: {
          fontSize: 12,
          marginBottom: 4,
        },
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: "Home",
          tabBarIcon: ({ color }) => (
            <Home color={color} size={ICON_SIZE} strokeWidth={2} />
          ),
        }}
      />

      <Tabs.Screen
        name="meals"
        options={{
          title: "Meals",
          tabBarIcon: ({ color }) => (
            <Salad color={color} size={ICON_SIZE} strokeWidth={2} />
          ),
        }}
      />

      <Tabs.Screen
        name="workout"
        options={{
          title: "Workout",
          tabBarIcon: ({ color }) => (
            <Dumbbell color={color} size={ICON_SIZE} strokeWidth={2} />
          ),
        }}
      />

      <Tabs.Screen
        name="planner"
        options={{
          title: "Planner",
          tabBarIcon: ({ color }) => (
            <CalendarDays color={color} size={ICON_SIZE} strokeWidth={2} />
          ),
        }}
      />

      {/* ถ้ามีหน้า Settings ใน Phase 1 */}
      <Tabs.Screen
        name="settings"
        options={{
          title: "Settings",
          tabBarIcon: ({ color }) => (
            <SettingsIcon color={color} size={ICON_SIZE} strokeWidth={2} />
          ),
        }}
      />
    </Tabs>
  );
}
