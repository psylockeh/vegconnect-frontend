import { Tabs } from "expo-router";
import React from "react";
import { Platform } from "react-native";

import { HapticTab } from "@/components/HapticTab"; // ✅ Esse agora está correto

// Removendo imports quebrados
// import { IconSymbol } from "@/components/ui/IconSymbol";
// import TabBarBackground from "@/components/ui/TabBarBackground";
// import { Colors } from "@/constants/Colors";
// import { useColorScheme } from "@/hooks/useColorScheme";

// Definindo valores padrão para evitar erro
const TabBarBackground = undefined;
const Colors = { light: { tint: "#2f95dc" }, dark: { tint: "#fff" } }; // Cor padrão
const useColorScheme = () => "light"; // Usa tema claro como padrão

export default function TabLayout() {
  const colorScheme = useColorScheme();

  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: Colors[colorScheme as "light" | "dark"].tint,
        headerShown: false,
        tabBarButton: HapticTab,
        tabBarBackground: TabBarBackground,
        tabBarStyle: Platform.select({
          ios: { position: "absolute" },
          default: {},
        }),
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: "Home",
          tabBarIcon: ({ color }) => null, // Se remover `IconSymbol`, substituímos por `null`
        }}
      />
      <Tabs.Screen
        name="explore"
        options={{
          title: "Explore",
          tabBarIcon: ({ color }) => null, // Se remover `IconSymbol`, substituímos por `null`
        }}
      />
    </Tabs>
  );
}
