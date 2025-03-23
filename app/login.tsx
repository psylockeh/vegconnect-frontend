import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ActivityIndicator,
} from "react-native";
import { useRouter } from "expo-router";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useAuth } from "@/context/AuthContext";
import { LoginStyles as styles } from "@/styles/LoginStyles";

export default function LoginScreen() {
  const router = useRouter();
  const { login } = useAuth();
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [manterConectado, setManterConectado] = useState(false);

  const handleLogin = async () => {
    setLoading(true);
    setError("");

    try {
      console.log("🔹 Enviando para API:", { email, senha });

      await login(email, senha, manterConectado); // 🔹 Passamos a opção para a função login

      setTimeout(() => {
        router.replace("/(tabs)/home");
      }, 500);
    } catch (error: any) {
      setError("Credenciais inválidas ou erro de conexão.");
      console.error("❌ Erro ao fazer login:", error);
    }

    setLoading(false);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Login</Text>

      {/* Campo de E-mail */}
      <TextInput
        style={styles.input}
        placeholder="E-mail"
        value={email}
        onChangeText={setEmail}
        keyboardType="email-address"
        autoCapitalize="none"
      />

      {/* Campo de Senha */}
      <TextInput
        style={styles.input}
        placeholder="Senha"
        value={senha}
        onChangeText={setSenha}
        secureTextEntry
      />

      {/* Link para recuperação de senha */}
      <TouchableOpacity onPress={() => router.push("/forgot-password")}>
        <Text style={{ color: "#3498db", marginTop: 10, textAlign: "center" }}>
          Esqueci minha senha
        </Text>
      </TouchableOpacity>

      {error ? <Text style={styles.error}>{error}</Text> : null}

      <View style={styles.checkboxContainer}>
        <TouchableOpacity
          onPress={() => setManterConectado(!manterConectado)}
          style={styles.checkbox}
        >
          {manterConectado && <Text style={styles.checkboxMark}>✔</Text>}
        </TouchableOpacity>
        <Text style={styles.checkboxLabel}>Manter-me conectado</Text>
      </View>

      {/* Botão de Login */}
      <TouchableOpacity
        style={styles.button}
        onPress={handleLogin}
        disabled={loading}
      >
        {loading ? (
          <ActivityIndicator color="#FFF" />
        ) : (
          <Text style={styles.buttonText}>Entrar</Text>
        )}
      </TouchableOpacity>

      {/* Link para Cadastro */}
      <TouchableOpacity onPress={() => router.push("/cadastro")}>
        <Text style={styles.link}>Criar uma conta</Text>
      </TouchableOpacity>
    </View>
  );
}
