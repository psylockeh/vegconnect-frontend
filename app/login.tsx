import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ActivityIndicator,
  Alert,
} from "react-native";
import { useRouter } from "expo-router";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { LoginStyles as styles } from "@/styles/LoginStyles";

export default function LoginScreen() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [senha, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleLogin = async () => {
    setLoading(true);
    setError("");

    try {
      const response = await fetch("http://localhost:28147/auth/signin", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, senha }),
      });

      const data = await response.json();

      if (response.ok) {
        await AsyncStorage.setItem("token", data.token);

        console.log("✅ Token JWT recebido:", data.token);
        Alert.alert("✅ Sucesso", "Token recebido e armazenado com sucesso!");

        // Remova temporariamente a navegação abaixo para apenas testar a autenticação
        // router.push("/home");
      } else {
        setError(data.message || "Credenciais inválidas.");
        console.log("Erro na resposta da API:", data);
      }
    } catch (error) {
      console.error("Erro ao conectar ao servidor:", error);
      setError("Erro ao conectar ao servidor.");
    }

    setLoading(false);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.logo}>🌱 VegConnect</Text>
      <Text style={styles.subtitle}>
        Bem-vindo! Insira suas credenciais para acessar sua conta.
      </Text>

      <Text style={styles.label}>E-mail</Text>
      <TextInput
        style={styles.input}
        placeholder="Seu e-mail"
        keyboardType="email-address"
        autoCapitalize="none"
        value={email}
        onChangeText={setEmail}
      />

      <Text style={styles.label}>Senha</Text>
      <TextInput
        style={styles.input}
        placeholder="Sua senha"
        secureTextEntry
        autoCapitalize="none"
        value={senha}
        onChangeText={setPassword}
      />

      {error ? <Text style={styles.errorMessage}>{error}</Text> : null}

      <TouchableOpacity
        style={styles.loginButton}
        onPress={handleLogin}
        disabled={loading}
      >
        {loading ? (
          <ActivityIndicator color="white" />
        ) : (
          <Text style={styles.loginButtonText}>Entrar</Text>
        )}
      </TouchableOpacity>
    </View>
  );
}
