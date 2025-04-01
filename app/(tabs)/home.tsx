import { useEffect, useState } from "react";
import { View, Text, Button } from "react-native";
import { useRouter } from "expo-router";
import { useAuth } from "@/context/AuthContext";
import { styles } from "@/styles/HomeStyles";

export default function HomeScreen() {
  const router = useRouter();
  const { logout } = useAuth();
  const [isReady, setIsReady] = useState(false);

  const handleLogout = async () => {
    await logout();
    router.replace("/login");
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsReady(true);
    }, 0);
    return () => clearTimeout(timer);
  }, []);

  if (!isReady) {
    return null;
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>🏡 Home do VegConnect</Text>
      <Button title="Meu Perfil" onPress={() => router.push("/perfil")} />
      <Button title="Sair" onPress={handleLogout} />
    </View>
  );
}
