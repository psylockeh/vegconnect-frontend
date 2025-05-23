import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  Pressable,
  ActivityIndicator,
  Alert,
  Image,
  ScrollView,
} from "react-native";
import { useRouter } from "expo-router";
import { useAuth } from "@/context/AuthContext";
import { CadastroStyles as styles } from "@/styles/CadastroStyles";
import { Picker } from "@react-native-picker/picker";
import { ToastAndroid, Platform } from "react-native";
import LottieView from "lottie-react-native";
import { MaskedTextInput } from "react-native-mask-text";

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
  const [confirmarSenha, setConfirmarSenha] = useState("");

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
      !confirmarSenha ||
      !dataNascimento ||
      !prefAlim ||
      !nickname ||
      !telefone
    ) {
      setError("📌 Ops! Todos os campos são obrigatórios.");
      setLoading(false);
      return;
    }
    if (senha !== confirmarSenha) {
      setError("🔐 As senhas não coincidem. Tente novamente.");
      setLoading(false);
      return;
    }
    if (tipoUsuario === "chef" && (!especialidade || !certificacoes)) {
      setError("📌 Ops! Todos os campos são obrigatórios.");
      setLoading(false);
      return;
    }
    if (
      tipoUsuario === "comerciante" &&
      (!nomeComercio ||
        !cnpj ||
        !telefoneComercio ||
        !tipoComercio ||
        !tipoProduto ||
        !enderecoComercio ||
        !cepComercio)
    ) {
      setError("📌 Ops! Todos os campos são obrigatórios.");
      setLoading(false);
      return;
    }
    if (
      !/^(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/.test(senha)
    ) {
      setError(
        "🔐 A senha deve ter pelo menos 8 caracteres, incluindo um número, uma letra maiúscula e um caractere especial."
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

      showToast("🌱 Cadastro realizado com sucesso!");
      router.replace("/feed");
    } catch (error: any) {
      console.error("❌ Erro ao cadastrar usuário:", error);

      if (error.response) {
        console.log("📌 Resposta da API:", error.response.data);
        setError(
          error.response.data.message || "Erro desconhecido no cadastro."
        );
      } else {
        setError("❌ Usuário já cadastrado. Verifique seus dados.");
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
        backgroundColor: "#fff6da",
      }}
    >
      <View style={styles.box}>
        {/* Campo de Logo */}
        <View style={styles.logoContainer}>
          <Image
            source={{
              uri: "https://res.cloudinary.com/dyhzz5baz/image/upload/v1747613147/Imagem_do_WhatsApp_de_2025-05-08_%C3%A0_s_13.08.26_a421e819_dkrthf.jpg",
            }}
            style={styles.logo}
            resizeMode="contain"
          />
          <Text style={styles.title}>VegConnect</Text>
        </View>

        <Text style={styles.instrucoesInicio}>
          Bem-vindo! Insira seus dados para realizar o Cadastro.
        </Text>

        {/* Campo de Nome */}
        <TextInput
          style={styles.input}
          placeholder="Nome"
          value={nome}
          onChangeText={setNome}
          autoCapitalize="words"
        />

        {/* Campo de Nikename */}
        <TextInput
          style={styles.input}
          placeholder="Apelido"
          value={nickname}
          onChangeText={setNickname}
          keyboardType="default"
          autoCapitalize="none"
        />

        {/* Campo de E-mail */}
        <TextInput
          style={styles.input}
          placeholder="E-mail"
          value={email}
          onChangeText={setEmail}
          keyboardType="email-address"
          autoCapitalize="none"
        />

        {/* Campo de Telefone */}
        <TextInput
          style={styles.input}
          placeholder="Telefone"
          value={telefone}
          onChangeText={setTelefone}
          keyboardType="phone-pad"
          autoCapitalize="none"
        />

        {/* Campo de Data de Nascimento */}
        <MaskedTextInput
          mask="99/99/9999"
          keyboardType="numeric"
          onChangeText={(text) => setDataNascimento(text)}
          value={dataNascimento}
          placeholder="DD/MM/AAAA"
          style={styles.input}
        />

        {/* Campo de Senha */}
        <TextInput
          style={styles.input}
          placeholder="Senha"
          value={senha}
          onChangeText={setSenha}
          secureTextEntry
        />

        <TextInput
          style={styles.input}
          placeholder="Confirmar Senha"
          value={confirmarSenha}
          onChangeText={setConfirmarSenha}
          secureTextEntry
        />

        {/* Campo de Tipo de Usuario*/}
        <Text style={styles.label}>
          Você é um comerciante ou Chef ? Não obrigatório
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

        {/* Campo de Usuario Chef*/}
        {tipoUsuario === "chef" && (
          <>
            {/* Campo de Especialidade*/}
            <TextInput
              style={styles.input}
              placeholder="Especialidade"
              value={especialidade}
              onChangeText={setEspecialidade}
            />

            {/* Campo de Certificações*/}
            <TextInput
              style={styles.input}
              placeholder="Certificações"
              value={certificacoes}
              onChangeText={setCertificacoes}
            />
          </>
        )}

        {/* Campo de Usuario Comerciante*/}
        {tipoUsuario === "comerciante" && (
          <>
            {/* Campo de Nome de Comércio*/}
            <TextInput
              style={styles.input}
              placeholder="Nome do Comércio"
              value={nomeComercio}
              onChangeText={setNomeComercio}
            />

            {/* Campo de CNPJ*/}
            <TextInput
              style={styles.input}
              placeholder="CNPJ"
              value={cnpj}
              onChangeText={setCnpj}
            />

            {/* Campo de Telefone do Comércio*/}
            <TextInput
              style={styles.input}
              placeholder="Telefone do Comércio"
              value={telefoneComercio}
              onChangeText={setTelefoneComercio}
            />

            {/* Campo de Tipo de Comércio*/}
            <TextInput
              style={styles.input}
              placeholder="Tipo do Comércio"
              value={tipoComercio}
              onChangeText={setTipoComercio}
            />

            {/* Campo de Tipo do Produto*/}
            <TextInput
              style={styles.input}
              placeholder="Tipo do Produto"
              value={tipoProduto}
              onChangeText={setTipoProduto}
            />

            {/* Campo de Endereço de Comércio*/}
            <TextInput
              style={styles.input}
              placeholder="Endereço do Comércio"
              value={enderecoComercio}
              onChangeText={setEnderecoComercio}
            />

            {/* Campo de CEP do Comércio*/}
            <TextInput
              style={styles.input}
              placeholder="CEP do Comércio"
              value={cepComercio}
              onChangeText={setCepComercio}
            />
          </>
        )}
        {/* Campo de Preferência Alimentar*/}
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

        {error ? <Text style={styles.error}>{error}</Text> : null}

        {/* Campo de Button*/}
        <Pressable
          style={styles.button}
          onPress={handleCadastro}
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
            <Text style={styles.buttonText}>Criar Conta</Text>
          )}
        </Pressable>

        {/* Campo de Voltar Login*/}
        <Pressable onPress={() => router.push("/login")}>
          <Text style={styles.link}>
            Já tem conta? <Text style={{ fontWeight: "bold" }}>Faça Login</Text>
          </Text>
        </Pressable>
      </View>
    </ScrollView>
  );
}
