import { useEffect, useState } from "react";
import { useRouter, useNavigationContainerRef } from "expo-router";
import { useAuth } from "@/context/AuthContext";
import { View, ActivityIndicator } from "react-native";

export default function Index() {
  const { isAuthenticated, isLoading } = useAuth();
  const router = useRouter();
  const navigationRef = useNavigationContainerRef();
  const [layoutReady, setLayoutReady] = useState(false);

  useEffect(() => {
    const waitForRouter = setTimeout(() => {
      setLayoutReady(true);
    }, 100);

    return () => clearTimeout(waitForRouter);
  }, []);

  useEffect(() => {
    if (!isLoading && layoutReady) {
      router.replace(isAuthenticated ? "/(app)/feed" : "/(auth)/login");
    }
  }, [isLoading, layoutReady, isAuthenticated]);

  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <ActivityIndicator size="large" color="#1A7F55" />
    </View>
  );
}
