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
    if (!data_nascimento || !/^\d{4}-\d{2}-\d{2}$/.test(data_nascimento))
      return "📅 Use o formato de data: AAAA-MM-DD.";

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
      if (cnpj.replace(/\D/g, "").length !== 14)
        return "📄 CNPJ deve conter 14 dígitos numéricos.";
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
      <Sidebar onPostPress={() => { }} />
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
                  value={telefone}
                  onChangeText={setTelefone}
                  keyboardType="phone-pad"
                />
              </View>
            </View>

            <View style={styles.linhaInputs}>
              <View style={styles.inputColuna}>
                <Text style={styles.label}>Data de Nascimento:</Text>
                <TextInput
                  style={styles.inputEditarPerfil}
                  placeholder="Digite sua data de nascimento"
                  value={data_nascimento}
                  onChangeText={setDataNascimento}
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
                  <Pressable onPress={() => setShowSenha(!showSenha)}
                    style={{ position: "absolute", right: 10, marginBottom: 10, padding: 5 }}
                    hitSlop={10}>
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
                  <Pressable onPress={() => setShowConfirmarSenha(!showConfirmarSenha)}
                    style={{ position: "absolute", right: 10, marginBottom: 10, padding: 5 }}
                    hitSlop={10}>
                    <MaterialIcons
                      name={showConfirmarSenha ? "visibility" : "visibility-off"}
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
                <TextInput
                  style={styles.inputEditarPerfil}
                  placeholder="Especialidade"
                  value={especialidade}
                  onChangeText={setEspecialidade}
                />

                <Text style={styles.label}>Certificações:</Text>
                <TextInput
                  style={styles.inputEditarPerfil}
                  placeholder="Certificações"
                  value={certificacoes}
                  onChangeText={setCertificacoes}
                />
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
                  value={telCom}
                  onChangeText={setTelCom}
                />

                <Text style={styles.label}>CNPJ:</Text>
                <TextInput
                  style={styles.inputEditarPerfil}
                  placeholder="CNPJ"
                  value={cnpj}
                  onChangeText={setCnpj}
                />

                <Text style={styles.label}>Tipo do Comércio:</Text>
                <TextInput
                  style={styles.inputEditarPerfil}
                  placeholder="Tipo do Comércio"
                  value={tipoCom}
                  onChangeText={setTipoCom}
                />

                <Text style={styles.label}>Tipo do Produto:</Text>
                <TextInput
                  style={styles.inputEditarPerfil}
                  placeholder="Tipo do Produto"
                  value={tipoProd}
                  onChangeText={setTipoProd}
                />

                <Text style={styles.label}>Endereço do Comércio:</Text>
                <TextInput
                  style={styles.inputEditarPerfil}
                  placeholder="Endereço do Comércio"
                  value={enderCom}
                  onChangeText={setEnderCom}
                />

                <Text style={styles.label}>CEP do Comércio:</Text>
                <TextInput
                  style={styles.inputEditarPerfil}
                  placeholder="CEP do Comércio"
                  value={cepCom}
                  onChangeText={setCepCom}
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
