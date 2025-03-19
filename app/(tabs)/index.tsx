import { useEffect } from "react";
import { useRouter } from "expo-router";
import { useAuth } from "@/context/AuthContext";
import { View, Text, Button } from "react-native";

export default function WelcomeScreen() {
  const router = useRouter();
  const { isAuthenticated } = useAuth();

  useEffect(() => {
    if (isAuthenticated) {
      router.replace("/(tabs)/home");
    }
  }, [isAuthenticated]);

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
