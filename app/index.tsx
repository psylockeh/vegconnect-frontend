import { useEffect } from "react";
import { useRouter, useNavigationContainerRef } from "expo-router";
import { View, ActivityIndicator } from "react-native";

export default function Index() {
  const router = useRouter();
  const navigationRef = useNavigationContainerRef();

  useEffect(() => {
    const timeout = setTimeout(() => {
      // Garante que o router está pronto
      if (navigationRef.isReady()) {
        router.replace("/(auth)/login");
      } else {
        // fallback se não estiver pronto ainda
        setTimeout(() => {
          router.replace("/(auth)/login");
        }, 200);
      }
    }, 10);

    return () => clearTimeout(timeout);
  }, []);

  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <ActivityIndicator size="large" color="#1A7F55" />
    </View>
  );
}
