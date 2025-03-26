import { useEffect } from "react";
import { View, Text, Button } from "react-native";
import { useRouter } from "expo-router";
import { useAuth } from "@/context/AuthContext";
import { styles } from "@/styles/HomeStyles";

export default function HomeScreen() {
  const router = useRouter();
  const { isAuthenticated, logout } = useAuth();

  useEffect(() => {
    if (!isAuthenticated) {
      router.replace("/login");
    }
  }, [isAuthenticated, router]);

  if (!isAuthenticated) {
    return null;
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>🏡 Home do VegConnect</Text>

      <Button title="Meu Perfil" onPress={() => router.push("/perfil")} />
      <Button title="Sair" onPress={logout} />
    </View>
  );
}
