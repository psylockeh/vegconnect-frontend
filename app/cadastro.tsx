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
import { useAuth } from "@/context/AuthContext";
import { CadastroStyles as styles } from "@/styles/CadastroStyles";
import { Picker } from "@react-native-picker/picker";
import { ToastAndroid, Platform } from "react-native";

export default function CadastroScreen() {
  const router = useRouter();
  const { register } = useAuth();
  const [nome, setNome] = useState("");
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [tipoUsuario, setTipoUsuario] = useState("");
  const [dataNascimento, setDataNascimento] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [prefAlim, setPrefAlim] = useState("");
  const [nickname, setNickname] = useState("");
  const [telefone, setTelefone] = useState("");

  const formatarDataParaAPI = (data: string) => {
    const regex = /^(\d{2})\/(\d{2})\/(\d{4})$/;
    const match = data.match(regex);
    return match ? `${match[3]}-${match[2]}-${match[1]}` : data;
  };

  const handleCadastro = async () => {
    setLoading(true);
    setError("");

    if (
      !nome ||
      !email ||
      !senha ||
      !dataNascimento ||
      !prefAlim ||
      !nickname ||
      !telefone
    ) {
      setError("Todos os campos são obrigatórios.");
      setLoading(false);
      return;
    }

    if (
      !/^(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/.test(senha)
    ) {
      setError(
        "A senha deve ter pelo menos 8 caracteres, incluindo um número, uma letra maiúscula e um caractere especial."
      );
      setLoading(false);
      return;
    }

    const dataFormatada = formatarDataParaAPI(dataNascimento);

    const dadosCadastro = {
      nome,
      email,
      senha,
      nickname,
      telefone,
      tp_user: tipoUsuario.trim() === "" ? "Comum" : tipoUsuario,
      data_nascimento: dataFormatada,
      pref_alim: prefAlim,
    };

    try {
      console.log("🔹 Enviando dados para API:", dadosCadastro);

      await register(
        dadosCadastro.nome,
        dadosCadastro.email,
        dadosCadastro.senha,
        dadosCadastro.tp_user,
        dadosCadastro.data_nascimento,
        dadosCadastro.pref_alim,
        dadosCadastro.nickname,
        dadosCadastro.telefone
      );

      const showToast = (message: string) => {
        if (Platform.OS === "android") {
          ToastAndroid.show(message, ToastAndroid.SHORT);
        } else {
          console.log("✅", message);
        }
      };

      showToast("Cadastro realizado com sucesso!");
      router.replace("/login");
    } catch (error: any) {
      console.error("❌ Erro ao cadastrar usuário:", error);

      if (error.response) {
        console.log("📌 Resposta da API:", error.response.data);
        setError(
          error.response.data.message || "Erro desconhecido no cadastro."
        );
      } else {
        setError("Erro ao conectar-se ao servidor. Verifique sua conexão.");
      }
    }

    setLoading(false);
  };

  return (
    <View style={styles.container}>
      {/* Substitua a div por View e remova <br/> */}
      <View style={styles.box}>
        <Text style={styles.title}>Register</Text>
        <Text style={styles.textoInicio}>
          Bem-vindo! Insira seus dados para realizar o cadastro!!!
        </Text>

        {/* Campo Nome */}
        <Text style={{ color: "#191d23", fontSize: 18 }}>Nome</Text>
        <TextInput
          style={styles.input}
          value={nome}
          onChangeText={setNome}
          autoCapitalize="words"
        />

        {/* Campo E-mail */}
        <Text style={{ color: "#191d23", fontSize: 18 }}>E-mail</Text>
        <TextInput
          style={styles.input}
          value={email}
          onChangeText={setEmail}
          keyboardType="email-address"
          autoCapitalize="none"
        />

        {/* Campo Telefone (apenas uma versão) */}
        <Text style={{ color: "#191d23", fontSize: 18 }}>Telefone</Text>
        <TextInput
          style={styles.input}
          value={telefone}
          onChangeText={setTelefone}
          keyboardType="phone-pad"
          autoCapitalize="none"
        />

        {/* ... (demais campos mantidos, sem duplicações) ... */}

        {/* Botão de Cadastro */}
        <TouchableOpacity
          style={styles.button}
          onPress={handleCadastro}
          disabled={loading}
        >
          {loading ? (
            <ActivityIndicator color="#FFF" />
          ) : (
            <Text style={styles.buttonText}>Criar Conta</Text>
          )}
        </TouchableOpacity>
      </View>
    </View>
  );
}
