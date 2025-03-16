import { View, Text, Button } from "react-native";
import { useRouter } from "expo-router";

export default function CadastroScreen() {
  const router = useRouter();

  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <Text style={{ fontSize: 22, fontWeight: "bold" }}>
        Cadastro no VegConnect
      </Text>
      <Button
        title="Já tem conta? Faça Login"
        onPress={() => router.push("/login")}
      />
    </View>
  );
}
