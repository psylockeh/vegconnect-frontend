import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  Pressable,
  Image,
  ActivityIndicator,
} from "react-native";
import { useRouter, useLocalSearchParams } from "expo-router";
import { styles } from "@/styles/AuthStyles";
import { useAuth } from "@/context/AuthContext";
import { MaterialIcons } from "@expo/vector-icons";


export default function ResetPasswordScreen() {
  const router = useRouter();
  const { token } = useLocalSearchParams();
  const { resetPassword } = useAuth();
  const [mostrarNovaSenha, setMostrarNovaSenha] = useState(false);
  const [mostrarConfirmSenha, setMostrarConfirmSenha] = useState(false);
  const [novaSenha, setNovaSenha] = useState("");
  const [confirmSenha, setConfirmSenha] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  const handleReset = async () => {
    if (!novaSenha || !confirmSenha) {
      return setMessage("📌 Preencha todos os campos.");
    }

    if (novaSenha !== confirmSenha) {
      return setMessage("🥬 As senhas não coincidem.");
    }

    setLoading(true);
    try {
      await resetPassword(token as string, novaSenha);
      setMessage("🌱 Senha redefinida com sucesso!");
      setTimeout(() => router.replace("/login"), 1500);
    } catch (err) {
      setMessage("❌ Erro ao redefinir senha. Tente novamente.");
    } finally {
      setLoading(false);
    }
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
          Insira a nova credencial para Redefinir Senha
        </Text>

        {/* Nova Senha com ícone */}
        <View style={[{ flexDirection: "row", alignItems: "center" }]}>
          <TextInput
            style={styles.input}
            placeholder="Nova Senha"
            secureTextEntry={!mostrarNovaSenha}
            value={novaSenha}
            onChangeText={setNovaSenha}
          />
          <Pressable
            onPress={() => setMostrarNovaSenha(!mostrarNovaSenha)}
            style={{ position: "absolute", right: 10, marginBottom: 15, padding: 5 }}
            hitSlop={10}
          >
            <MaterialIcons
              name={mostrarNovaSenha ? "visibility" : "visibility-off"}
              size={24}
              color="gray"
            />
          </Pressable>
        </View>

        {/* Confirmação da Nova Senha com ícone */}
        <View style={[{ flexDirection: "row", alignItems: "center" }]}>
          <TextInput
            style={styles.input}
            placeholder="Confirme a Nova Senha"
            secureTextEntry={!mostrarConfirmSenha}
            value={confirmSenha}
            onChangeText={setConfirmSenha}
          />
          <Pressable
            onPress={() => setMostrarConfirmSenha(!mostrarConfirmSenha)}
            style={{ position: "absolute", right: 10, marginBottom: 15, padding: 5 }}
            hitSlop={10}
          >
            <MaterialIcons
              name={mostrarConfirmSenha ? "visibility" : "visibility-off"}
              size={24}
              color="gray"
            />
          </Pressable>
        </View>
        {message ? <Text style={styles.message}>{message}</Text> : null}

        <Pressable
          style={styles.button}
          onPress={handleReset}
          disabled={loading}
        >
          {loading ? (
            <ActivityIndicator color="#fff" />
          ) : (
            <Text style={styles.buttonText}>Redefinir Senha</Text>
          )}
        </Pressable>

        {/* Campo de votar ao Login */}
        <Pressable onPress={() => router.push("/login")}>
          <Text style={styles.link}>
            {" "}
            <Text style={{ fontWeight: "bold" }}>Voltar para o Login</Text>
          </Text>
        </Pressable>
      </View>
    </View>
  );
}
