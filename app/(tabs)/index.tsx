import { View, Text, Button } from "react-native";
import { useRouter } from "expo-router";

export default function WelcomeScreen() {
  const router = useRouter();

  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <Text style={{ fontSize: 22, fontWeight: "bold" }}>
        Bem-vindo ao VegConnect
      </Text>

      {/* Botão de Login */}
      <Button title="Fazer Login" onPress={() => router.push("/login")} />

      {/* Botão de Cadastro */}
      <Button title="Cadastrar-se" onPress={() => router.push("/cadastro")} />
    </View>
  );
}
