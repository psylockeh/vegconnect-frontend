import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ActivityIndicator,
  Alert,
  ScrollView,
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
  const [especialidade, setEspecialidade] = useState("");
  const [certificacoes, setCertificacoes] = useState("");
  const [tipoProduto, setTipoProduto] = useState("");
  const [tipoComercio, setTipoComercio] = useState("");
  const [nomeComercio, setNomeComercio] = useState("");
  const [enderecoComercio, setEnderecoComercio] = useState("");
  const [cnpj, setCnpj] = useState("");
  const [cepComercio, setCepComercio] = useState("");
  const [telefoneComercio, setTelefoneComercio] = useState("");

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
      especialidade: especialidade,
      certificacoes: certificacoes,
      tipo_prod: tipoProduto,
      tipo_com: tipoComercio,
      nome_com: nomeComercio,
      ender_com: enderecoComercio,
      cnpj: cnpj,
      cep_com: cepComercio,
      tel_com: telefoneComercio,
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
        dadosCadastro.telefone,
        dadosCadastro.especialidade,
        dadosCadastro.certificacoes,
        dadosCadastro.tipo_prod,
        dadosCadastro.tipo_com,
        dadosCadastro.nome_com,
        dadosCadastro.ender_com,
        dadosCadastro.cnpj,
        dadosCadastro.cep_com,
        dadosCadastro.tel_com
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
    <ScrollView
      contentContainerStyle={{
        flexGrow: 1,
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      {" "}
      <View style={styles.box}>
        <Text style={styles.title}>Register</Text>
        <Text style={styles.textoInicio}>
          Bem-vindo! Insira seus dados para realizar o cadastro.
        </Text>

        <Text style={{ color: "#191d23", fontSize: 18 }}>Nome</Text>
        <TextInput
          style={styles.input}
          value={nome}
          onChangeText={setNome}
          autoCapitalize="words"
        />

        <TextInput
          style={styles.input}
          placeholder="E-mail"
          value={email}
          onChangeText={setEmail}
          keyboardType="email-address"
          autoCapitalize="none"
        />

        <TextInput
          style={styles.input}
          placeholder="Nickname"
          value={nickname}
          onChangeText={setNickname}
          keyboardType="default"
          autoCapitalize="none"
        />

        <TextInput
          style={styles.input}
          placeholder="Telefone"
          value={telefone}
          onChangeText={setTelefone}
          keyboardType="phone-pad"
          autoCapitalize="none"
        />

        <Text style={{ color: "#191d23", fontSize: 18 }}>Senha</Text>
        <TextInput
          style={styles.input}
          value={senha}
          onChangeText={setSenha}
          secureTextEntry
        />

        <Text style={{ color: "#191d23", fontSize: 18 }}>
          Data de Nascimento
        </Text>
        <TextInput
          style={styles.input}
          placeholder="Ex. (DD/MM/AAAA)"
          value={dataNascimento}
          onChangeText={setDataNascimento}
          keyboardType="numeric"
        />

        <Text style={styles.infoText}>
          Você é um comerciante ou Chef? Não obrigatório
        </Text>
        <Picker
          selectedValue={tipoUsuario}
          onValueChange={(itemValue) => setTipoUsuario(itemValue)}
          style={styles.picker}
        >
          <Picker.Item label="Selecione um tipo de usuário" value="" />
          <Picker.Item label="Comerciante" value="comerciante" />
          <Picker.Item label="Chef" value="chef" />
        </Picker>

        {tipoUsuario === "chef" && (
          <>
            <Text style={styles.label}>Especialidade</Text>
            <TextInput
              style={styles.input}
              value={especialidade}
              onChangeText={setEspecialidade}
            />
            <Text style={styles.label}>Certificações</Text>
            <TextInput
              style={styles.input}
              value={certificacoes}
              onChangeText={setCertificacoes}
            />
          </>
        )}

        {tipoUsuario === "comerciante" && (
          <>
            <Text style={styles.label}>Tipo do Produto</Text>
            <TextInput
              style={styles.input}
              value={tipoProduto}
              onChangeText={setTipoProduto}
            />
            <Text style={styles.label}>Tipo de Comércio</Text>
            <TextInput
              style={styles.input}
              value={tipoComercio}
              onChangeText={setTipoComercio}
            />
            <Text style={styles.label}>Nome do Comércio</Text>
            <TextInput
              style={styles.input}
              value={nomeComercio}
              onChangeText={setNomeComercio}
            />
            <Text style={styles.label}>Endereço do Comércio</Text>
            <TextInput
              style={styles.input}
              value={enderecoComercio}
              onChangeText={setEnderecoComercio}
            />
            <Text style={styles.label}>CNPJ</Text>
            <TextInput
              style={styles.input}
              value={cnpj}
              onChangeText={setCnpj}
            />
            <Text style={styles.label}>CEP do Comércio</Text>
            <TextInput
              style={styles.input}
              value={cepComercio}
              onChangeText={setCepComercio}
            />
            <Text style={styles.label}>Telefone do Comércio</Text>
            <TextInput
              style={styles.input}
              value={telefoneComercio}
              onChangeText={setTelefoneComercio}
            />
          </>
        )}

        {error ? <Text style={styles.error}>{error}</Text> : null}

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

        <TouchableOpacity onPress={() => router.push("/login")}>
          <Text style={styles.link}>Já tem conta? Faça Login</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}
