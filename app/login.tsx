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

      await login(email, senha, manterConectado);

      setTimeout(() => {
        router.replace("/home");
      }, 500);
    } catch (error: any) {
      setError("Credenciais inválidas ou erro de conexão.");
      console.error("❌ Erro ao fazer login:", error);
    }

    setLoading(false);
  };

  return (
    <View style={styles.container}>
      <div style={styles.box}>
        <Text style={styles.logo}>LOGO - VegConnect</Text><br /><br /><br />
        <Text style={styles.title}>User Login</Text><br /><br />
        <Text style={styles.bemVindo}>Bem-vindo! Insira suas credenciais para acessar sua conta.</Text><br /><br /><br />

        {/* Campo de E-mail */}
        <Text style={{ color: "#191d23", fontSize: 18 }}>
          E-mail<TextInput
            style={styles.input}
            value={email}
            onChangeText={setEmail}
            keyboardType="email-address"
            autoCapitalize="none"
          /></Text>

        {/* Campo de Senha */}
        <Text style={{ color: "#191d23", fontSize: 18 }}>
          Senha<TextInput
            style={styles.input}
            placeholder="Senha"
            value={senha}
            onChangeText={setSenha}
            secureTextEntry
          /></Text>

        {/* Link para recuperação de senha */}
        <TouchableOpacity onPress={() => router.push("/forgot-password")}>
          <Text style={{ color: "#166534", marginLeft: 250, textAlign: "center", fontSize: 15, fontWeight: "bold" }}>
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
        </View><br />

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
        </TouchableOpacity><br />


        {/* Link para Cadastro */}

        <TouchableOpacity onPress={() => router.push("/cadastro")}>
          <Text style={styles.link}>Não tem uma conta? <b>Criar uma conta</b></Text>
        </TouchableOpacity>
      </div>
    </View>
  );
}
