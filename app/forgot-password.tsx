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
import { CadastroStyles as styles } from "@/styles/CadastroStyles";

export default function RecuperarSenhaScreen() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  const handleRecuperacao = async () => {
    setLoading(true);
    setMessage("");

    try {
      const response = await axios.post(`${API_URL}/auth/forgot-password`, {
        email,
      });

      if (response.status === 200) {
        setMessage("📩 Verifique seu e-mail para redefinir sua senha.");
      } else {
        setMessage("⚠️ E-mail não encontrado.");
      }
    } catch (error) {
      console.error("❌ Erro ao recuperar senha:", error);
      setMessage("Erro ao processar solicitação. Tente novamente.");
    }

    setLoading(false);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Recuperar Senha</Text>

      {/* Campo E-mail */}
      <TextInput
        style={styles.input}
        placeholder="Digite seu e-mail"
        value={email}
        onChangeText={setEmail}
        keyboardType="email-address"
        autoCapitalize="none"
      />

      {/* Mensagem de Feedback */}
      {message ? <Text style={styles.success}>{message}</Text> : null}

      {/* Botão de Recuperação */}
      <TouchableOpacity
        style={styles.button}
        onPress={handleRecuperacao}
        disabled={loading}
      >
        {loading ? (
          <ActivityIndicator color="#FFF" />
        ) : (
          <Text style={styles.buttonText}>Recuperar Senha</Text>
        )}
      </TouchableOpacity>

      {/* Voltar para Login */}
      <TouchableOpacity onPress={() => router.replace("/login")}>
        <Text style={styles.link}>Voltar para o Login</Text>
      </TouchableOpacity>
    </View>
  );
}
