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
<<<<<<< HEAD
import {
  formatarCNPJ,
  validarCNPJ,
  formatarTelefone,
} from "@/utils/formatadores";
import * as ImagePicker from "expo-image-picker";
import { Button } from "react-native";
=======
import { MaterialIcons } from "@expo/vector-icons";
>>>>>>> e2c863f1ec9bad71593cf2726bffd682816b1b2f

export default function CadastroScreen() {
  const [erroCnpj, setErroCnpj] = useState(false);
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
<<<<<<< HEAD
  const [cep, setCep] = useState("");
  const [logradouro, setLogradouro] = useState("");
  const [bairro, setBairro] = useState("");
  const [cidade, setCidade] = useState("");
  const [estado, setEstado] = useState("");
  const [numero, setNumero] = useState("");
  const [certificacaoSelecionada, setCertificacaoSelecionada] =
    useState<string>("");

  const selecionarImagem = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 0.8,
    });

    if (!result.canceled) {
      setImagemCertificacao(result.assets[0].uri);
    }
  };

  const certificacoesDisponiveis = [
    "SENAC – Cozinha Profissional",
    "SENAI – Alimentos e Bebidas",
    "Escola Wilma Kövesi de Cozinha",
    "Natural Chef – Nutrição e Gastronomia",
    "Le Cordon Bleu (Brasil)",
    "Instituto Gastronômico das Américas (IGA)",
    "Autodeclaração com Prova de Experiência",
  ];

  const [imagemCertificacao, setImagemCertificacao] = useState<string | null>(
    null
  );

  const especialidades = [
    "Cozinha Vegana",
    "Cozinha Vegetariana",
    "Cozinha Natural",
    "Panificação Vegana",
    "Confeitaria Sem Leite/Ovos",
    "Comida Brasileira",
    "Comida Internacional",
  ];

  const buscarEnderecoPorCep = async (cepLimpo: string) => {
    try {
      const response = await fetch(
        `https://viacep.com.br/ws/${cepLimpo}/json/`
      );
      const data = await response.json();

      if (data.erro) {
        Alert.alert("CEP não encontrado.");
        return;
      }

      setLogradouro(data.logradouro || "");
      setBairro(data.bairro || "");
      setCidade(data.localidade || "");
      setEstado(data.uf || "");
    } catch (error) {
      console.error("Erro ao buscar CEP:", error);
      Alert.alert("Erro ao buscar CEP.");
    }
  };
=======
  const [showSenha, setShowSenha] = useState(false);
  const [showConfirmarSenha, setShowConfirmarSenha] = useState(false);

>>>>>>> e2c863f1ec9bad71593cf2726bffd682816b1b2f

  const formatarDataParaAPI = (data: string) => {
    const regex = /^(\d{2})\/(\d{2})\/(\d{4})$/;
    const match = data.match(regex);
    return match ? `${match[3]}-${match[2]}-${match[1]}` : data;
  };

  const tiposProduto = [
    "Alimentos",
    "Bebidas",
    "Higiene",
    "Cosméticos",
    "Limpeza",
    "Outros",
  ];

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

    const handleSelecionarImagem = async () => {
      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        quality: 0.8,
      });

      if (!result.canceled) {
        setImagemCertificacao(result.assets[0].uri);
      }
    };

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

        {/* Senha com ícone */}
        <View style={[{ flexDirection: "row", alignItems: "center" }]}>
          <TextInput
            style={styles.input}
            placeholder="Senha"
            value={senha}
            onChangeText={setSenha}
            secureTextEntry={!showSenha}
          />
          <Pressable onPress={() => setShowSenha(!showSenha)}
            style={{ position: "absolute", right: 10, marginBottom: 15, padding: 5 }}
            hitSlop={10}>
            <MaterialIcons
              name={showSenha ? "visibility" : "visibility-off"}
              size={24}
              color="gray"
            />
          </Pressable>
        </View>

        {/* Confirmar Senha com ícone */}
        <View style={[{ flexDirection: "row", alignItems: "center" }]}>
          <TextInput
            style={styles.input}
            placeholder="Confirmar Senha"
            value={confirmarSenha}
            onChangeText={setConfirmarSenha}
            secureTextEntry={!showConfirmarSenha}
          />
          <Pressable onPress={() => setShowConfirmarSenha(!showConfirmarSenha)}
            style={{ position: "absolute", right: 10, marginBottom: 15, padding: 5 }}
            hitSlop={10}>
            <MaterialIcons
              name={showConfirmarSenha ? "visibility" : "visibility-off"}
              size={24}
              color="gray"
            />
          </Pressable>
        </View>

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
            {/* Campo de Especialidade */}
            <Text style={styles.label}>Especialidade</Text>
            <Picker
              selectedValue={especialidade}
              onValueChange={(itemValue) => setEspecialidade(itemValue)}
              style={styles.picker}
            >
              <Picker.Item label="Selecione uma especialidade..." value="" />
              {especialidades.map((item: string) => (
                <Picker.Item key={item} label={item} value={item} />
              ))}
            </Picker>

            {/* Campo de Certificação */}
            <Text style={styles.label}>Certificação em Gastronomia</Text>
            <Picker
              selectedValue={certificacaoSelecionada}
              onValueChange={(itemValue) =>
                setCertificacaoSelecionada(itemValue)
              }
              style={styles.picker}
            >
              <Picker.Item label="Selecione uma certificação..." value="" />
              {certificacoesDisponiveis.map((item: string) => (
                <Picker.Item key={item} label={item} value={item} />
              ))}
            </Picker>

            <Button
              title="Anexar imagem da certificação"
              onPress={selecionarImagem}
              color="#2196F3"
            />

            {imagemCertificacao && (
              <Image
                source={{ uri: imagemCertificacao }}
                style={{ width: 200, height: 200, marginTop: 10 }}
                resizeMode="contain"
              />
            )}
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

            {/* Campo de CNPJ */}
            <TextInput
              style={styles.input}
              placeholder="CNPJ"
              value={formatarCNPJ(cnpj)} // aqui aplicamos a máscara apenas na exibição
              onChangeText={(text) => {
                const somenteNumeros = text.replace(/\D/g, "");
                setCnpj(somenteNumeros); // armazenamos apenas os números
              }}
              keyboardType="numeric"
            />

            {/* Campo Telefone do Comércio */}
            <TextInput
              style={styles.input}
              placeholder="Telefone do Comércio"
              value={formatarTelefone(telefoneComercio)}
              onChangeText={(text) => {
                const somenteNumeros = text.replace(/\D/g, "").slice(0, 11);
                setTelefoneComercio(somenteNumeros);
              }}
              keyboardType="phone-pad"
            />

            {/* Campo de Tipo de Comércio*/}
            <TextInput
              style={styles.input}
              placeholder="Tipo do Comércio"
              value={tipoComercio}
              onChangeText={setTipoComercio}
            />

            {/* Campo de Tipo do Produto*/}
            <Text style={styles.label}>Tipo de Produto</Text>
            <Picker
              selectedValue={tipoProduto}
              onValueChange={(itemValue) => setTipoProduto(itemValue)}
              style={styles.picker}
            >
              <Picker.Item label="Selecione o tipo de produto" value="" />
              {tiposProduto.map((tipo) => (
                <Picker.Item key={tipo} label={tipo} value={tipo} />
              ))}
            </Picker>

            {/* Campo de Endereço de Comércio*/}
            <TextInput
              style={styles.input}
              placeholder="Endereço do Comércio"
              value={enderecoComercio}
              onChangeText={setEnderecoComercio}
            />

            {/* Campo de CEP do Comércio*/}
            {/* Campo de CEP */}
            <Text style={styles.label}>CEP do Comércio</Text>
            <TextInput
              style={styles.input}
              placeholder="00000-000"
              keyboardType="numeric"
              value={cep}
              maxLength={9}
              onChangeText={(text) => {
                const formatted = text
                  .replace(/\D/g, "")
                  .replace(/^(\d{5})(\d)/, "$1-$2");
                setCep(formatted);

                const onlyDigits = formatted.replace(/\D/g, "");
                if (onlyDigits.length === 8) buscarEnderecoPorCep(onlyDigits);
              }}
            />

            {/* Campos preenchidos automaticamente */}
            <TextInput
              style={styles.input}
              placeholder="Logradouro"
              value={logradouro}
              editable={false}
            />
            <TextInput
              style={styles.input}
              placeholder="Bairro"
              value={bairro}
              editable={false}
            />
            <TextInput
              style={styles.input}
              placeholder="Cidade"
              value={cidade}
              editable={false}
            />
            <TextInput
              style={styles.input}
              placeholder="Estado"
              value={estado}
              editable={false}
            />

            {/* Campo Número - preenchido manualmente */}
            <TextInput
              style={styles.input}
              placeholder="Número"
              value={numero}
              onChangeText={setNumero}
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
