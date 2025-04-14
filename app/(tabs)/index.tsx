import { useRouter } from "expo-router";
import { useEffect } from "react";
import { useAuth } from "@/context/AuthContext";
import { View, ActivityIndicator } from "react-native";

export default function Index() {
  const { isAuthenticated, userToken, isLoading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!isLoading && userToken !== null) {
      router.replace(isAuthenticated ? "/feed" : "/login");
    }
  }, [isLoading, isAuthenticated, userToken]);

  if (isLoading || userToken === null) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <ActivityIndicator size="large" color="#1A7F55" />
      </View>
    );
  }

  return null;
}
