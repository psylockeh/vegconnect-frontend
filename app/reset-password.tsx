import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ActivityIndicator,
} from "react-native";
import { useRouter, useLocalSearchParams } from "expo-router";
import { styles } from "@/styles/AuthStyles";
import { useAuth } from "@/context/AuthContext";

export default function ResetPasswordScreen() {
  const router = useRouter();
  const { token } = useLocalSearchParams();
  const { resetPassword } = useAuth();

  const [novaSenha, setNovaSenha] = useState("");
  const [confirmSenha, setConfirmSenha] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  const handleReset = async () => {
    if (!novaSenha || !confirmSenha) {
      return setMessage("Preencha todos os campos.");
    }

    if (novaSenha !== confirmSenha) {
      return setMessage("As senhas não coincidem.");
    }

    setLoading(true);
    try {
      await resetPassword(token as string, novaSenha);
      setMessage("Senha redefinida com sucesso!");
      setTimeout(() => router.replace("/login"), 1500);
    } catch (err) {
      setMessage("Erro ao redefinir senha. Tente novamente.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Redefinir Senha</Text>

      <TextInput
        style={styles.input}
        placeholder="Nova Senha"
        secureTextEntry
        value={novaSenha}
        onChangeText={setNovaSenha}
      />
      <TextInput
        style={styles.input}
        placeholder="Confirme a Nova Senha"
        secureTextEntry
        value={confirmSenha}
        onChangeText={setConfirmSenha}
      />

      {message ? <Text style={styles.message}>{message}</Text> : null}

      <TouchableOpacity
        style={styles.button}
        onPress={handleReset}
        disabled={loading}
      >
        {loading ? (
          <ActivityIndicator color="#fff" />
        ) : (
          <Text style={styles.buttonText}>Redefinir</Text>
        )}
      </TouchableOpacity>
    </View>
  );
}
