import { Tabs } from "expo-router";

export default function TabsLayout() {
  return (
    <Tabs>
      <Tabs.Screen name="home" options={{ title: "Início" }} />
      <Tabs.Screen name="perfil" options={{ title: "Perfil" }} />
      <Tabs.Screen name="configuracoes" options={{ title: "Config" }} />
    </Tabs>
  );
}
