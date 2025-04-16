import { Stack, Redirect, useRouter } from "expo-router";
import { useAuth } from "@/context/AuthContext";
import { View, Text, TouchableOpacity, ActivityIndicator } from "react-native";
import Toast from "react-native-toast-message";

export default function ProtectedLayout() {
  const { isAuthenticated, isLoading } = useAuth();
  const router = useRouter();

  if (isLoading) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <ActivityIndicator size="large" color="#54C6A5" />
      </View>
    );
  }

  if (!isAuthenticated) {
    return (
      <View
        style={{
          flex: 1,
          justifyContent: "center",
          alignItems: "center",
          padding: 24,
        }}
      >
        <Text
          style={{
            fontSize: 20,
            fontWeight: "bold",
            marginBottom: 10,
            color: "#333",
          }}
        >
          🌱 Opa! A horta ainda está trancada.
        </Text>
        <Text style={{ textAlign: "center", color: "#666", marginBottom: 24 }}>
          Para colher os melhores conteúdos da comunidade VegConnect, você
          precisa fazer login primeiro.
        </Text>
        <TouchableOpacity
          onPress={() => router.replace("/login")}
          style={{
            backgroundColor: "#54C6A5",
            paddingVertical: 12,
            paddingHorizontal: 32,
            borderRadius: 12,
          }}
        >
          <Text style={{ color: "#fff", fontSize: 16, fontWeight: "bold" }}>
            Entrar na Comunidade 🌿
          </Text>
        </TouchableOpacity>
      </View>
    );
  }

  return <Stack />;
}
