import { View, Text, Button } from "react-native";
import { Link } from "expo-router";

export default function HomeScreen() {
  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <Text>Bem-vindo ao VegConnect! 🚀</Text>
      <Link href="/login">
        <Button title="Fazer Login" />
      </Link>
    </View>
  );
}
