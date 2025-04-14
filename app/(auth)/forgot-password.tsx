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
      <div style={styles.box}>
        <Text style={styles.logo}>LOGO - VegConnect</Text>
        <br />
        <br />
        <br />
        <Text style={styles.title}>Forgot password</Text>
        <br />
        <br />
        <Text style={styles.textoInicio}>Insira seu e-mail cadastrado</Text>
        <br />
        <br />
        <br />

        <Text style={{ color: "#191d23", fontSize: 18 }}>
          E-mai
          <TextInput
            style={styles.input}
            value={email}
            onChangeText={setEmail}
            keyboardType="email-address"
            autoCapitalize="none"
          />
        </Text>
        <br />
        <br />
        {mensagem ? <Text style={styles.message}>{mensagem}</Text> : null}

        <br />
        <br />
        <TouchableOpacity
          style={styles.button}
          onPress={handleRecuperarSenha}
          disabled={loading}
        >
          {loading ? (
            <ActivityIndicator color="#FFF" />
          ) : (
            <Text style={styles.buttonText}>Enviar</Text>
          )}
        </TouchableOpacity>
        <br />
        <br />
        <TouchableOpacity onPress={() => router.push("/login")}>
          <Text style={styles.link}>Voltar para o Login</Text>
        </TouchableOpacity>
      </div>
    </View>
  );
}
