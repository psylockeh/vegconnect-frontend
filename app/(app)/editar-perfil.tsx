import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  TextInput,
  Pressable,
  ActivityIndicator,
  Image,
  ScrollView,
} from "react-native";
import {
  formatarCNPJ,
  validarCNPJ,
  formatarTelefone,
} from "@/utils/formatadores";
import { MaskedTextInput } from "react-native-mask-text";
import * as ImagePicker from "expo-image-picker";
import { useAuth } from "@/context/AuthContext";
import { styles } from "@/styles/EditarPerfilStyles";
import { uploadImageToCloudinary } from "../../src/utils/cloudinary";
import axios from "axios";
import { API_URL } from "@/config/api";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Sidebar from "@/components/Sidebar";
import { MaterialIcons } from "@expo/vector-icons";
import LottieView from "lottie-react-native";
import { Picker } from "@react-native-picker/picker";
import { useRouter } from "expo-router";
import { useRef } from "react";

const dadosOriginais = useRef<Record<string, string | null>>({});

export default function EditarPerfilScreen() {
  const { carregarPerfil, perfilUsuario } = useAuth();
  const [nome, setNome] = useState("");
  const [nickname, setNickname] = useState("");
  const [bio, setBio] = useState("");
  const [telefone, setTelefone] = useState("");
  const [email, setEmail] = useState("");
  const [data_nascimento, setDataNascimento] = useState("");
  const [foto_perfil, setFotoPerfil] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [isCameraHovered, setIsCameraHovered] = useState(false);
  const [mensagemAlerta, setMensagemAlerta] = useState("");
  const [senha, setSenha] = useState("");
  const [confirmarSenha, setConfirmarSenha] = useState("");
  const [showSenha, setShowSenha] = useState(false);
  const [showConfirmarSenha, setShowConfirmarSenha] = useState(false);
  const router = useRouter();

  const tipo = perfilUsuario?.tp_user;

  // Comerciante
  const [nomeComercio, setNomeComercio] = useState("");
  const [telCom, setTelCom] = useState("");
  const [tipoProd, setTipoProd] = useState("");
  const [tipoCom, setTipoCom] = useState("");
  const [enderCom, setEnderCom] = useState("");
  const [cnpj, setCnpj] = useState("");
  const [cepCom, setCepCom] = useState("");
  const [logradouro, setLogradouro] = useState("");
  const [bairro, setBairro] = useState("");
  const [cidade, setCidade] = useState("");
  const [estado, setEstado] = useState("");
  const [numero, setNumero] = useState("");

  // Chef
  const [especialidade, setEspecialidade] = useState("");
  const [certificacoes, setCertificacoes] = useState("");

  // Comum
  const [prefAlim, setPrefAlim] = useState("");

  // Após os useState
  const dadosAtuais = {
    nome,
    nickname,
    email,
    telefone,
    data_nascimento,
    bio,
    foto_perfil,
    nome_com: nomeComercio,
    tel_com: telCom,
    tipo_prod: tipoProd,
    tipo_com: tipoCom,
    ender_com: enderCom,
    cnpj,
    cep_com: cepCom,
    especialidade,
    certificacoes,
    pref_alim: prefAlim,
  };

  const houveMudanca = Object.entries(dadosAtuais).some(
    ([campo, valor]) => dadosOriginais.current[campo] !== valor
  );

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
        alert("CEP não encontrado.");
        return;
      }

      setLogradouro(data.logradouro || "");
      setBairro(data.bairro || "");
      setCidade(data.localidade || "");
      setEstado(data.uf || "");
    } catch (error) {
      console.error("Erro ao buscar CEP:", error);
      alert("Erro ao buscar CEP.");
    }
  };

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

  useEffect(() => {
    carregarPerfil();
  }, []);

  useEffect(() => {
    dadosOriginais.current = {
      nome: perfilUsuario.nome || "",
      nickname: perfilUsuario.nickname || "",
      email: perfilUsuario.email || "",
      telefone: perfilUsuario.telefone || "",
      data_nascimento: perfilUsuario.data_nascimento || "",
      bio: perfilUsuario.bio || "",
      foto_perfil: perfilUsuario.foto_perfil || null,
      // comerciais
      nome_com: perfilUsuario.nome_com || "",
      tel_com: perfilUsuario.tel_com || "",
      tipo_prod: perfilUsuario.tipo_prod || "",
      tipo_com: perfilUsuario.tipo_com || "",
      ender_com: perfilUsuario.ender_com || "",
      cnpj: perfilUsuario.cnpj || "",
      cep_com: perfilUsuario.cep_com || "",
      // chef
      especialidade: perfilUsuario.especialidade || "",
      certificacoes: perfilUsuario.certificacoes || "",
      // comum
      pref_alim: perfilUsuario.pref_alim || "",
    };

    if (perfilUsuario) {
      setNome(perfilUsuario.nome || "");
      setNickname(perfilUsuario.nickname || "");
      setSenha(perfilUsuario.senha || "");
      setEmail(perfilUsuario.email || "");
      setBio(perfilUsuario.bio || "");
      setTelefone(perfilUsuario.telefone || "");
      setDataNascimento(perfilUsuario.data_nascimento || "");
      setFotoPerfil(perfilUsuario.foto_perfil || null);

      if (tipo === "Comerciante") {
        setNomeComercio(perfilUsuario.nome_com || "");
        setTelCom(perfilUsuario.tel_com || "");
        setTipoProd(perfilUsuario.tipo_prod || "");
        setTipoCom(perfilUsuario.tipo_com || "");
        setEnderCom(perfilUsuario.ender_com || "");
        setCnpj(perfilUsuario.cnpj || "");
        setCepCom(perfilUsuario.cep_com || "");
      }

      if (tipo === "Chef") {
        setEspecialidade(perfilUsuario.especialidade || "");
        setCertificacoes(perfilUsuario.certificacoes || "");
      }

      if (tipo === "Comum") {
        setPrefAlim(perfilUsuario.pref_alim || "");
      }
    }
  }, [perfilUsuario]);

  const escolherFoto = async () => {
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (status !== "granted") {
      alert("Permissão para acessar a galeria é necessária!");
      return;
    }

    const result = await ImagePicker.launchImageLibraryAsync({
      allowsEditing: true,
      quality: 1,
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
    });

    if (!result.canceled) {
      const uri = result.assets[0].uri;
      setLoading(true);
      const cloudUrl = await uploadImageToCloudinary(uri);
      if (cloudUrl) {
        setFotoPerfil(cloudUrl);
      } else {
        alert("Erro ao enviar imagem.");
      }
      setLoading(false);
    }
  };

  const validarCamposObrigatorios = () => {
    if (!nome || nome.length < 3)
      return "❗ O nome deve ter ao menos 3 letras.";
    if (!nickname || nickname.includes(" ") || nickname.length < 3)
      return "❗ O nickname deve ter ao menos 3 letras e não conter espaços.";
    if (!email || !/^\S+@\S+\.\S+$/.test(email)) return "📧 E-mail inválido.";
    if (!telefone || telefone.replace(/\D/g, "").length < 10)
      return "📞 Telefone inválido. Digite ao menos 10 números.";

    if (senha || confirmarSenha) {
      if (senha !== confirmarSenha) return "🔐 As senhas não coincidem.";
      if (
        !/^(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/.test(senha)
      )
        return "🔐 A senha deve ter no mínimo 8 caracteres, com 1 número, 1 letra maiúscula e 1 símbolo.";
    }

    if (tipo === "Comum" && !prefAlim)
      return "🌱 Informe sua preferência alimentar.";
    if (tipo === "Chef" && (!especialidade || !certificacoes))
      return "👨‍🍳 Preencha especialidade e certificações.";

    if (tipo === "Comerciante") {
      if (
        !nomeComercio ||
        !telCom ||
        !tipoProd ||
        !tipoCom ||
        !enderCom ||
        !cepCom ||
        !cnpj
      )
        return "🏪 Preencha todos os dados obrigatórios do comércio.";
      if (telCom.replace(/\D/g, "").length < 10)
        return "📞 Telefone do comércio inválido.";
      if (cepCom.replace(/\D/g, "").length !== 8)
        return "📍 CEP deve conter 8 dígitos.";
      if (cnpj.replace(/\D/g, "").length !== 14) return "📄 CNPJ inválido.";
    }

    return null;
  };

  const salvarPerfil = async () => {
    const dadosAtuais = {
      nome,
      nickname,
      email,
      telefone,
      data_nascimento,
      bio,
      foto_perfil,
      nome_com: nomeComercio,
      tel_com: telCom,
      tipo_prod: tipoProd,
      tipo_com: tipoCom,
      ender_com: enderCom,
      cnpj,
      cep_com: cepCom,
      especialidade,
      certificacoes,
      pref_alim: prefAlim,
    };

    setLoading(true);
    setMensagemAlerta("");

    const erroValidacao = validarCamposObrigatorios();
    if (erroValidacao) {
      setMensagemAlerta(erroValidacao);
      setLoading(false);
      return;
    }

    try {
      const formData: any = {
        nome,
        telefone,
        nickname,
        email,
        data_nascimento,
        bio,
        foto_perfil:
          foto_perfil &&
          typeof foto_perfil === "string" &&
          foto_perfil.startsWith("http")
            ? foto_perfil
            : null,
      };

      // Validação senha
      if (senha || confirmarSenha) {
        if (senha !== confirmarSenha) {
          setMensagemAlerta("🔐 As senhas não coincidem. Tente novamente.");
          setLoading(false);
          return;
        }

        if (
          !/^(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/.test(
            senha
          )
        ) {
          setMensagemAlerta(
            "🔐 A senha deve ter pelo menos 8 caracteres, incluindo um número, uma letra maiúscula e um caractere especial."
          );
          setLoading(false);
          return;
        }

        formData.senha = senha;
      }

      if (perfilUsuario.tp_user === "Comerciante") {
        formData.nome_com = nomeComercio;
        formData.tel_com = telCom;
        formData.tipo_com = tipoCom;
        formData.ender_com = enderCom;
        formData.cnpj = cnpj;
        formData.cep_com = cepCom;
        formData.tipo_prod = tipoProd;
      }

      if (perfilUsuario.tp_user === "Chef") {
        formData.especialidade = especialidade;
        formData.certificacoes = certificacoes;
      }

      if (perfilUsuario.tp_user === "Comum") {
        formData.pref_alim = prefAlim;
      }

      const token = await AsyncStorage.getItem("@token");

      await axios.put(`${API_URL}/usuario/perfil`, formData, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      console.log("Enviando dados:", formData);
      await carregarPerfil();
      setMensagemAlerta("🌱 Perfil atualizado com sucesso!");
      setTimeout(() => setMensagemAlerta(""), 3000);
    } catch (error: any) {
      console.error("Erro ao atualizar perfil:", error);

      const erroMsg =
        error?.response?.data?.erro ||
        error?.response?.data?.msg ||
        "❌ Erro ao atualizar o perfil!";

      setMensagemAlerta(erroMsg);
    }

    setLoading(false);
  };

  //Deletar dados do Perfil
  const deletarPerfil = async () => {
    try {
      const token = await AsyncStorage.getItem("@token");
      const userId = perfilUsuario?.id_user;

      if (!userId) {
        setMensagemAlerta("❌ ID de usuário não encontrado!");
        return;
      }

      await axios.delete(`${API_URL}/usuario/deletarPerfil/${userId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setMensagemAlerta("📌 Perfil deletado com sucesso!");
      setTimeout(async () => {
        await AsyncStorage.removeItem("@token");
        router.push("/login");
      }, 5000);
    } catch (error) {
      console.error("Erro ao deletar perfil:", error);
      setMensagemAlerta("❌ Erro ao deletar o perfil!");
    }
  };

  return (
    <View style={styles.container}>
      <Sidebar onPostPress={() => {}} />
      <View style={styles.mainContent}>
        <ScrollView showsVerticalScrollIndicator={false}>
          <View style={styles.cardEditarPerfil}>
            <View style={styles.headerUsuario}>
              <Pressable
                onPress={escolherFoto}
                onPressIn={() => setIsCameraHovered(true)}
                onPressOut={() => setIsCameraHovered(false)}
              >
                <View style={styles.avatarContainer}>
                  {foto_perfil &&
                  typeof foto_perfil === "string" &&
                  foto_perfil.startsWith("http") ? (
                    <Image
                      source={{ uri: foto_perfil }}
                      style={styles.avatar}
                      onError={() => setFotoPerfil(null)}
                    />
                  ) : (
                    <Image
                      source={{
                        uri: perfilUsuario.foto_perfil?.startsWith("http")
                          ? perfilUsuario.foto_perfil
                          : "https://res.cloudinary.com/dyhzz5baz/image/upload/v1746917561/default-avatar_jvqpsg.png",
                      }}
                      style={styles.avatar}
                    />
                  )}
                </View>
              </Pressable>
            </View>

            {/* Campos principais em colunas */}
            <View style={styles.linhaInputs}>
              <View style={styles.inputColuna}>
                <Text style={styles.label}>Nome Completo:</Text>
                <TextInput
                  style={styles.inputEditarPerfil}
                  placeholder="Digite seu nome"
                  value={nome}
                  onChangeText={setNome}
                />
              </View>

              <View style={styles.inputColuna}>
                <Text style={styles.label}>Nickname (único):</Text>
                <TextInput
                  style={styles.inputEditarPerfil}
                  placeholder="Digite seu nickname"
                  value={nickname}
                  onChangeText={setNickname}
                />
              </View>
            </View>

            <View style={styles.linhaInputs}>
              <View style={styles.inputColuna}>
                <Text style={styles.label}>E-mail:</Text>
                <TextInput
                  style={styles.inputEditarPerfil}
                  placeholder="Digite seu E-mail"
                  value={email}
                  onChangeText={setEmail}
                />
              </View>

              <View style={styles.inputColuna}>
                <Text style={styles.label}>Telefone:</Text>
                <TextInput
                  style={styles.inputEditarPerfil}
                  placeholder="Digite seu telefone"
                  value={formatarTelefone(telefone)}
                  autoCapitalize="none"
                  onChangeText={(text) => {
                    const somenteNumeros = text.replace(/\D/g, "").slice(0, 11);
                    setTelefone(somenteNumeros);
                  }}
                  keyboardType="phone-pad"
                />
              </View>
            </View>

            <View style={styles.linhaInputs}>
              <View style={styles.inputColuna}>
                <Text style={styles.label}>Data de Nascimento:</Text>
                <MaskedTextInput
                  mask="9999/99/99"
                  keyboardType="numeric"
                  onChangeText={(text) => setDataNascimento(text)}
                  value={data_nascimento}
                  placeholder="AAAA/MM/DD"
                  style={styles.inputEditarPerfil}
                />
              </View>

              {/* Senha com ícone */}
              <View style={styles.inputColuna}>
                <Text style={styles.label}>Senha:</Text>
                <View style={{ flexDirection: "row", alignItems: "center" }}>
                  <TextInput
                    style={[styles.inputEditarPerfil, { width: "100%" }]}
                    placeholder="Digite sua senha"
                    value={senha}
                    onChangeText={setSenha}
                    secureTextEntry={!showSenha}
                    autoCapitalize="none"
                  />
                  <Pressable
                    onPress={() => setShowSenha(!showSenha)}
                    style={{
                      position: "absolute",
                      right: 10,
                      marginBottom: 10,
                      padding: 5,
                    }}
                    hitSlop={10}
                  >
                    <MaterialIcons
                      name={showSenha ? "visibility" : "visibility-off"}
                      size={24}
                      color="gray"
                    />
                  </Pressable>
                </View>
              </View>
            </View>
            {/* Confirmar Senha com ícone */}
            <View style={styles.linhaInputs}>
              <View style={styles.inputColuna}>
                <Text style={styles.label}>Confirmar Senha:</Text>
                <View style={{ flexDirection: "row", alignItems: "center" }}>
                  <TextInput
                    style={[styles.inputEditarPerfil, { width: "100%" }]}
                    placeholder="Confirme sua senha"
                    value={confirmarSenha}
                    onChangeText={setConfirmarSenha}
                    secureTextEntry={!showConfirmarSenha}
                    autoCapitalize="none"
                  />
                  <Pressable
                    onPress={() => setShowConfirmarSenha(!showConfirmarSenha)}
                    style={{
                      position: "absolute",
                      right: 10,
                      marginBottom: 10,
                      padding: 5,
                    }}
                    hitSlop={10}
                  >
                    <MaterialIcons
                      name={
                        showConfirmarSenha ? "visibility" : "visibility-off"
                      }
                      size={24}
                      color="gray"
                    />
                  </Pressable>
                </View>
              </View>
            </View>

            {/* Campos adicionais por tipo */}
            {tipo === "Chef" && (
              <>
                <Text style={styles.label}>Especialidade:</Text>
                <Picker
                  selectedValue={especialidade}
                  onValueChange={(itemValue) => setEspecialidade(itemValue)}
                  style={styles.picker}
                >
                  <Picker.Item
                    label="Selecione uma especialidade..."
                    value=""
                  />
                  {especialidades.map((item: string) => (
                    <Picker.Item key={item} label={item} value={item} />
                  ))}
                </Picker>

                <Text style={styles.label}>Certificações:</Text>
                <Picker
                  selectedValue={certificacoes}
                  onValueChange={(itemValue) => setCertificacoes(itemValue)}
                  style={styles.picker}
                >
                  <Picker.Item label="Selecione uma certificação..." value="" />
                  {certificacoesDisponiveis.map((item: string) => (
                    <Picker.Item key={item} label={item} value={item} />
                  ))}
                </Picker>

                <Pressable
                  onPress={selecionarImagem}
                  style={styles.botaoImagem}
                >
                  <Text style={styles.textoBotao}>
                    Anexar imagem da certificação
                  </Text>
                </Pressable>

                {imagemCertificacao && (
                  <Image
                    source={{ uri: imagemCertificacao }}
                    style={{ width: 200, height: 200, marginTop: 10 }}
                    resizeMode="contain"
                  />
                )}
              </>
            )}

            {tipo === "Comerciante" && (
              <>
                <Text style={styles.label}>Nome do Comércio:</Text>
                <TextInput
                  style={styles.inputEditarPerfil}
                  placeholder="Nome do Comércio"
                  value={nomeComercio}
                  onChangeText={setNomeComercio}
                />

                <Text style={styles.label}>Telefone do Comércio:</Text>
                <TextInput
                  style={styles.inputEditarPerfil}
                  placeholder="Telefone do Comércio"
                  value={formatarTelefone(telCom)}
                  onChangeText={(text) => {
                    const somenteNumeros = text.replace(/\D/g, "").slice(0, 11);
                    setTelCom(somenteNumeros);
                  }}
                  keyboardType="phone-pad"
                />

                <View style={styles.inputColuna}>
                  <Text style={styles.label}>CNPJ:</Text>
                  <TextInput
                    style={styles.inputEditarPerfil}
                    value={formatarCNPJ(cnpj)}
                    placeholder="CNPJ"
                    onChangeText={(text) => {
                      const somenteNumeros = text.replace(/\D/g, "");
                      setCnpj(somenteNumeros);
                    }}
                    keyboardType="numeric"
                  />
                </View>

                <Text style={styles.label}>Tipo do Comércio:</Text>
                <Picker
                  selectedValue={tipoCom}
                  onValueChange={(itemValue) => setTipoCom(itemValue)}
                  style={styles.picker}
                >
                  <Picker.Item label="Selecione o tipo de comércio" value="" />
                  <Picker.Item label="Restaurante" value="restaurante" />
                  <Picker.Item label="Loja" value="loja" />
                  <Picker.Item label="Feira" value="feira" />
                  <Picker.Item label="Serviço" value="servico" />
                </Picker>

                <Text style={styles.label}>Tipo do Produto:</Text>
                <Picker
                  selectedValue={tipoProd}
                  onValueChange={(itemValue) => setTipoProd(itemValue)}
                  style={styles.picker}
                >
                  <Picker.Item label="Selecione o tipo de produto" value="" />
                  {tiposProduto.map((tipo) => (
                    <Picker.Item key={tipo} label={tipo} value={tipo} />
                  ))}
                </Picker>

                <Text style={styles.label}>Endereço do Comércio:</Text>
                <TextInput
                  style={styles.inputEditarPerfil}
                  placeholder="Endereço do Comércio"
                  value={enderCom}
                  editable={false}
                />

                {/* Campo de CEP do Comércio*/}
                {/* Campo de CEP */}
                <Text style={styles.label}>CEP do Comércio: </Text>
                <TextInput
                  style={styles.inputEditarPerfil}
                  placeholder="00000-000"
                  keyboardType="numeric"
                  value={cepCom}
                  maxLength={9}
                  onChangeText={async (text) => {
                    const formatted = text
                      .replace(/\D/g, "")
                      .replace(/^(\d{5})(\d)/, "$1-$2");
                    setCepCom(formatted);

                    const onlyDigits = formatted.replace(/\D/g, "");
                    if (onlyDigits.length === 8)
                      buscarEnderecoPorCep(onlyDigits);
                    if (cepCom.replace(/\D/g, "").length === 8) {
                      const response = await fetch(
                        `https://viacep.com.br/ws/${cepCom}/json/`
                      );
                      const data = await response.json();
                      setEnderCom(
                        `${data.logradouro}, ${data.bairro}, ${data.localidade} - ${data.uf}`
                      );
                    }
                  }}
                />

                {/* Campos preenchidos automaticamente */}
                <Text style={styles.label}>Logradouro: </Text>
                <TextInput
                  style={styles.inputEditarPerfil}
                  placeholder="Logradouro"
                  value={logradouro}
                  editable={false}
                />
                <Text style={styles.label}>Bairro: </Text>
                <TextInput
                  style={styles.inputEditarPerfil}
                  placeholder="Bairro"
                  value={bairro}
                  editable={false}
                />
                <Text style={styles.label}>Cidade: </Text>
                <TextInput
                  style={styles.inputEditarPerfil}
                  placeholder="Cidade"
                  value={cidade}
                  editable={false}
                />
                <Text style={styles.label}>Estado: </Text>
                <TextInput
                  style={styles.inputEditarPerfil}
                  placeholder="Estado"
                  value={estado}
                  editable={false}
                />

                {/* Campo Número - preenchido manualmente */}
                <Text style={styles.label}>Número: </Text>
                <TextInput
                  style={styles.inputEditarPerfil}
                  placeholder="Número"
                  value={numero}
                  onChangeText={setNumero}
                />
              </>
            )}

            {tipo === "Comum" && (
              <>
                <Text style={styles.label}>Sua preferência alimentar:</Text>
                <Picker
                  selectedValue={prefAlim}
                  onValueChange={(itemValue) => setPrefAlim(itemValue)}
                  style={styles.picker}
                >
                  <Picker.Item
                    label="Selecione sua preferência alimentar"
                    value=""
                  />
                  <Picker.Item label="Vegano" value="Vegano" />
                  <Picker.Item label="Vegetariano" value="Vegetariano" />
                  <Picker.Item
                    label="Dieta Restritiva"
                    value="Dieta restritiva"
                  />
                </Picker>
              </>
            )}

            <Text style={styles.label}>Biografia:</Text>
            <TextInput
              style={styles.inputEditarPerfil}
              placeholder="Digite uma breve descrição"
              value={bio}
              onChangeText={setBio}
              multiline
            />

            {/* Mensagem e Botões */}
            {mensagemAlerta !== "" && (
              <Text style={styles.error}>{mensagemAlerta}</Text>
            )}

            <Pressable
              style={[
                styles.botaoSalvarPerfil,
                !houveMudanca &&
                  !senha &&
                  !confirmarSenha && { backgroundColor: "#ccc" },
              ]}
              onPress={salvarPerfil}
              disabled={loading || (!houveMudanca && !senha && !confirmarSenha)}
            >
              {loading ? (
                <LottieView
                  source={require("..//../assets/animations/loading_anim.json")}
                  autoPlay
                  loop
                  style={{ width: 24, height: 24 }}
                />
              ) : (
                <Text style={styles.textoBotao}>Salvar</Text>
              )}
            </Pressable>

            <Pressable
              style={styles.botaoDeletarPerfil}
              onPress={deletarPerfil}
            >
              <Text style={styles.textoBotao}>Excluir Perfil</Text>
            </Pressable>
          </View>
        </ScrollView>
      </View>
    </View>
  );
}
