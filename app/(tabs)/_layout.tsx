import { Slot } from "expo-router";
import { View } from "react-native";

export default function TabsLayout() {
  return (
    <View style={{ flex: 1, backgroundColor: "#FDF6E3" }}>
      <Slot />
    </View>
  );
}
