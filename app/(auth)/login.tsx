import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  Pressable,
  Image,
  ActivityIndicator,
} from "react-native";
import { useRouter } from "expo-router";
import { useAuth } from "@/context/AuthContext";
import { LoginStyles as styles } from "@/styles/LoginStyles";
import LottieView from "lottie-react-native";
import BotaoComLoader from "@/components/BotaoComLoader";
import { MaterialIcons } from "@expo/vector-icons";


export default function LoginScreen() {
  const router = useRouter();
  const { login } = useAuth();
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [mostrarSenha, setMostrarSenha] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [manterConectado, setManterConectado] = useState(false);

  const handleLogin = async () => {
    setError("");

    // Validação de campos obrigatórios
    if (!email || !senha) {
      setError(
        "🌱 Por favor, preencha seu e-mail e senha para acessar o jardim da comunidade."
      );
      return;
    }

    setLoading(true);

    try {
      await login(email, senha, manterConectado);

      setTimeout(() => {
        router.replace("/(app)/feed");
      }, 600);
    } catch (error: any) {
      setError(
        "🥬 Eita! Credenciais inválidas. Verifique seu e-mail e senha e tente novamente."
      );
      console.error("❌ Erro ao fazer login:", error);
    }

    setLoading(false);
  };

  return (
    <View style={styles.container}>
      <View style={styles.box}>
        {/* Campo de Logo */}
        <View style={styles.logoContainer}>
          <Image
            source={require("..//../assets/logo.png")}
            style={styles.logo}
          />
          <Text style={styles.title}>VegConnect</Text>
        </View>
        <Text style={styles.bemVindo}>
          Bem-vindo! Insira suas credenciais para acessar sua conta.
        </Text>

        {/* Campo de E-mail */}

        <TextInput
          style={styles.input}
          placeholder="E-mail"
          value={email}
          onChangeText={setEmail}
          keyboardType="email-address"
          autoCapitalize="none"
        />

        {/* Campo de Senha com ícone MaterialIcons */}
        <View style={[{ flexDirection: "row", alignItems: "center" }]}>
          <TextInput
            style={styles.input}
            placeholder="Senha"
            value={senha}
            onChangeText={setSenha}
            secureTextEntry={!mostrarSenha}
          />
          <Pressable
            onPress={() => setMostrarSenha(!mostrarSenha)}
            style={{ position: "absolute", right: 10, marginBottom: 15, padding: 5 }}
            hitSlop={10}
          >
            <MaterialIcons
              name={mostrarSenha ? "visibility" : "visibility-off"}
              size={24}
              color="gray"
            />
          </Pressable>
        </View>

        {/* Link para recuperação de senha */}
        <Pressable onPress={() => router.push("/forgot-password")}>
          <Text style={styles.forgotPasswordText}>Esqueci minha senha</Text>
        </Pressable>

        {error ? <Text style={styles.error}>{error}</Text> : null}

        <View style={styles.checkboxContainer}>
          <Pressable
            onPress={() => setManterConectado(!manterConectado)}
            style={styles.checkbox}
          >
            {manterConectado && <Text style={styles.checkboxMark}>✔</Text>}
          </Pressable>
          <Text style={styles.checkboxLabel}>Manter-me conectado</Text>
        </View>

        <Pressable
          style={styles.button}
          onPress={handleLogin}
          disabled={loading}
        >
          {loading ? (
            <LottieView
              source={require("..//../assets/animations/loading_anim.json")}
              autoPlay
              loop
              style={{ width: 24, height: 24 }}
            />
          ) : (
            <Text style={styles.buttonText}>Entrar</Text>
          )}
        </Pressable>

        {/* Link para Cadastro */}
        <Pressable onPress={() => router.push("/cadastro")}>
          <Text style={styles.link}>
            Não tem uma conta?{" "}
            <Text style={{ fontWeight: "bold" }}>Criar uma Conta</Text>
          </Text>
        </Pressable>
      </View>
    </View>
  );
}
