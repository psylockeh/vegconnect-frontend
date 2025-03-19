import { Stack, useRouter } from "expo-router";
import { useAuth } from "@/context/AuthContext";

export default function Layout() {
  const { isAuthenticated } = useAuth();
  const router = useRouter();

  return (
    <Stack screenOptions={{ headerShown: false }}>
      {isAuthenticated ? (
        // Se estiver autenticado, carrega a navegação principal (abas)
        <Stack.Screen name="(tabs)" />
      ) : (
        // Se NÃO estiver autenticado, carrega Login, Cadastro e Recuperação de Senha
        <>
          <Stack.Screen name="index" />
          <Stack.Screen name="login" />
          <Stack.Screen name="cadastro" />
        </>
      )}
    </Stack>
  );
}
