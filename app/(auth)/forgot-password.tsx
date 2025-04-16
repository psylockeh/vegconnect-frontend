import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Image,
  ActivityIndicator,
} from "react-native";
import { useRouter } from "expo-router";
import axios from "axios";
import { API_URL } from "@/config/api";
import { styles } from "@/styles/ForgotPasswordStyles";
import LottieView from "lottie-react-native";

export default function ForgotPasswordScreen() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [mensagem, setMensagem] = useState("");

  const handleRecuperarSenha = async () => {
    setLoading(true);
    setMensagem("");

    try {
      const response = await axios.post(`${API_URL}/auth/recuperar-senha`, {
        email,
      });
      if (response.status === 200) {
        setMensagem("Enviamos um link de recuperação para seu e-mail.");
      }
    } catch (error: any) {
      console.error("Erro ao recuperar senha:", error);
      setMensagem(
        "Não foi possível enviar o link de recuperação. Verifique o e-mail."
      );
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

        <Text style={styles.instrucoesInicio}>
          Insira o e-mail cadastrado para recuperar a senha.
        </Text>

        {/* Campo de Recuperar E-mail */}
        <TextInput
          style={styles.input}
          placeholder="E-mail"
          value={email}
          onChangeText={setEmail}
          keyboardType="email-address"
          autoCapitalize="none"
        />

        {mensagem ? <Text style={styles.message}>{mensagem}</Text> : null}

        {/* Campo de Button */}
        <TouchableOpacity
          style={styles.button}
          onPress={handleRecuperarSenha}
          disabled={loading}
        >
          {/* Animação de Login */}
          {loading ? (
            <LottieView
              source={require("..//../assets/animations/loading_anim.json")} // Caminho da animação
              autoPlay
              loop
              style={styles.loadingAnimation}
            />
          ) : (
            <Text style={styles.buttonText}>Recuperar Senha</Text>
          )}
        </TouchableOpacity>
        <br />

        {/* Link para Cadastro */}
        <TouchableOpacity onPress={() => router.push("/cadastro")}>
          <Text style={styles.link}>
            Não tem uma conta? <b>Criar uma Conta</b>
          </Text>
        </TouchableOpacity>

        {/* Campo de votar ao Login */}
        <TouchableOpacity onPress={() => router.push("/login")}>
          <Text style={styles.link}>
            <b>Voltar para o Login</b>
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}
