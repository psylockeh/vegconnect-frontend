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
      <Text style={styles.title}>Cadastro</Text>

      {/* Campo Nome */}
      <TextInput
        style={styles.input}
        placeholder="Nome"
        value={nome}
        onChangeText={setNome}
        autoCapitalize="words"
      />

      {/* Campo E-mail */}
      <TextInput
        style={styles.input}
        placeholder="E-mail"
        value={email}
        onChangeText={setEmail}
        keyboardType="email-address"
        autoCapitalize="none"
      />

      {/* Campo Senha */}
      <TextInput
        style={styles.input}
        placeholder="Senha"
        value={senha}
        onChangeText={setSenha}
        secureTextEntry
      />

      {/* Campo Telefone */}
      <TextInput
        style={styles.input}
        placeholder="Telefone"
        value={telefone}
        onChangeText={setTelefone}
        keyboardType="phone-pad"
        autoCapitalize="none"
      />

      {/* Campo Nickname */}
      <TextInput
        style={styles.input}
        placeholder="Nickname"
        value={nickname}
        onChangeText={setNickname}
        keyboardType="default"
        autoCapitalize="none"
      />

      {/* Campo Data de Nascimento */}
      <TextInput
        style={styles.input}
        placeholder="Data de Nascimento (DD/MM/AAAA)"
        value={dataNascimento}
        onChangeText={setDataNascimento}
        keyboardType="numeric"
      />

      {/* Mensagem antes da seleção do tipo de usuário */}
      <Text style={styles.infoText}>
        Você é um comerciante ou Chef? Conta pra gente selecionando abaixo! Se
        não, este campo não precisa ser preenchido
      </Text>

      {/* Campo Tipo de Usuário */}
      <Picker
        selectedValue={tipoUsuario}
        onValueChange={(itemValue) => setTipoUsuario(itemValue)}
        style={styles.picker}
      >
        <Picker.Item label="Selecione um tipo de usuário" value="" />
        <Picker.Item label="Comerciante" value="comerciante" />
        <Picker.Item label="Chef" value="chef" />
      </Picker>

      {error ? <Text style={styles.error}>{error}</Text> : null}

      {/* Seleção de Preferência Alimentar */}
      <Text style={styles.label}>Sua preferência alimentar:</Text>
      <Picker
        selectedValue={prefAlim}
        onValueChange={(itemValue) => setPrefAlim(itemValue)}
        style={styles.picker}
      >
        <Picker.Item label="Selecione sua preferência alimentar" value="" />
        <Picker.Item label="Vegano" value="Vegano" />
        <Picker.Item label="Vegetariano" value="Vegetariano" />
        <Picker.Item label="Dieta Restritiva" value="Dieta restritiva" />
      </Picker>

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

      {/* Link para Login */}
      <TouchableOpacity onPress={() => router.push("/login")}>
        <Text style={styles.link}>Já tem conta? Faça Login</Text>
      </TouchableOpacity>
    </View>
  );
}
