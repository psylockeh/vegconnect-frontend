import { Stack } from "expo-router";
import { useAuth } from "@/context/AuthContext";

export default function RootLayout() {
  const { isAuthenticated } = useAuth();

  return (
    <Stack screenOptions={{ headerShown: false }}>
      {isAuthenticated ? (
        <Stack.Screen name="(tabs)" />
      ) : (
        <>
          <Stack.Screen name="login" />
          <Stack.Screen name="cadastro" />
        </>
      )}
    </Stack>
  );
}
