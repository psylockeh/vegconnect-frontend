import { View, Text, Button } from "react-native";
import { Link } from "expo-router";

export default function LoginScreen() {
  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <Text>Tela de Login</Text>
      <Link href="/">
        {" "}
        {/* Volta para a tela inicial */}
        <Button title="Voltar para Home" />
      </Link>
    </View>
  );
}
