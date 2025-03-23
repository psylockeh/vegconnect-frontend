import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ActivityIndicator,
} from "react-native";
import { useRouter } from "expo-router";
import axios from "axios";
import { API_URL } from "@/config/api";
import { styles } from "@/styles/AuthStyles";

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
      <Text style={styles.title}>Recuperar Senha</Text>

      <TextInput
        style={styles.input}
        placeholder="Digite seu e-mail"
        value={email}
        onChangeText={setEmail}
        keyboardType="email-address"
        autoCapitalize="none"
      />

      {mensagem ? <Text style={styles.message}>{mensagem}</Text> : null}

      <TouchableOpacity
        style={styles.button}
        onPress={handleRecuperarSenha}
        disabled={loading}
      >
        {loading ? (
          <ActivityIndicator color="#FFF" />
        ) : (
          <Text style={styles.buttonText}>Enviar Link</Text>
        )}
      </TouchableOpacity>

      <TouchableOpacity onPress={() => router.push("/login")}>
        <Text style={styles.link}>Voltar para o Login</Text>
      </TouchableOpacity>
    </View>
  );
}
