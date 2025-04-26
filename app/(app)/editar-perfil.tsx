import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
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

  useEffect(() => {
    carregarPerfil();
  }, []);

  useEffect(() => {
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

  const salvarPerfil = async () => {
    setLoading(true);

    try {
      const formData: any = {
        nome,
        telefone,
        nickname,
        senha,
        email,
        data_nascimento,
        bio,
        foto_perfil,
      };

      if (tipo === "Comerciante") {
        formData.nome_com = nomeComercio;
        formData.tel_com = telCom;
        formData.tipo_com = tipoCom;
        formData.ender_com = enderCom;
        formData.cnpj = cnpj;
        formData.cep_com = cepCom;
        formData.tipo_prod = tipoProd;
      }

      if (tipo === "Chef") {
        formData.especialidade = especialidade;
        formData.certificacoes = certificacoes;
      }

      if (tipo === "Comum") {
        formData.pref_alim = prefAlim;
      }
      if (senha !== confirmarSenha) {
        setMensagemAlerta("🔐 As senhas não coincidem. Tente novamente.");
        setLoading(false);
        return;
      }
      if (
        !/^(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/.test(senha)
      ) {
        setMensagemAlerta(
          "🔐 A senha deve ter pelo menos 8 caracteres, incluindo um número, uma letra maiúscula e um caractere especial."
        );
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
    } catch (error) {
      console.error("Erro ao atualizar perfil:", error);
      setMensagemAlerta("❌ Erro ao atualizar o perfil!!");
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
              <TouchableOpacity
                onPress={escolherFoto}
                onPressIn={() => setIsCameraHovered(true)}
                onPressOut={() => setIsCameraHovered(false)}
                activeOpacity={0.7}
              >
                <View style={styles.avatarContainer}>
                  {perfilUsuario?.foto_perfil ? (
                    <Image
                      source={{ uri: perfilUsuario.foto_perfil }}
                      style={styles.avatar}
                    />
                  ) : (
                    <View style={styles.avatar}>
                      <Text style={{ color: "#black", fontSize: 16, textAlign: "center", marginTop: 35 }}>Sem foto</Text>
                      <MaterialIcons style={{ alignSelf: "flex-end", marginTop: 30 }} name="add-a-photo" size={24} color="black" />
                    </View>
                  )}
                </View>
              </TouchableOpacity>

              <View>
                <Text style={styles.label}>Nome Completo:</Text>
                <TextInput
                  style={styles.inputEditarPerfil}
                  placeholder="Digite seu nome"
                  value={nome}
                  onChangeText={setNome}
                />

                <Text style={styles.label}>Nickname (único):</Text>
                <TextInput
                  style={styles.inputEditarPerfil}
                  placeholder="Digite seu nickname"
                  value={nickname}
                  onChangeText={setNickname}
                />

                <Text style={styles.label}>E-mail: (único):</Text>
                <TextInput
                  style={styles.inputEditarPerfil}
                  placeholder="Digite seu E-mail"
                  value={email}
                  onChangeText={setEmail}
                />

                <Text style={styles.label}>Telefone:</Text>
                <TextInput
                  style={styles.inputEditarPerfil}
                  placeholder="Digite seu telefone"
                  value={telefone}
                  onChangeText={setTelefone}
                  keyboardType="phone-pad"
                />

                <Text style={styles.label}>Data de Nascimento:</Text>
                <TextInput
                  style={styles.inputEditarPerfil}
                  placeholder="Digite seu Data de Nascimento"
                  value={data_nascimento}
                  onChangeText={setDataNascimento}
                />

                <Text style={styles.label}>Senha:</Text>
                <TextInput
                  style={styles.inputEditarPerfil}
                  placeholder="Senha"
                  value={senha}
                  onChangeText={setSenha}
                  secureTextEntry
                />

                <Text style={styles.label}>Confirmar Senha:</Text>
                <TextInput
                  style={styles.inputEditarPerfil}
                  placeholder="Confirmar Senha"
                  value={confirmarSenha}
                  onChangeText={setConfirmarSenha}
                  secureTextEntry
                />


                {/* Campo de Usuario Chef*/}
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

                {/* Campo de Usuario Comerciante*/}
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
              </View>
            </View>

            {mensagemAlerta !== "" && (
              <Text style={styles.error}>
                {mensagemAlerta}
              </Text>
            )}

            <TouchableOpacity
              style={styles.botaoSalvarPerfil}
              onPress={salvarPerfil}
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
                <Text style={styles.textoBotao}>Salvar</Text>
              )}
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.botaoDeletarPerfil}
              onPress={deletarPerfil}
            >
              <Text style={styles.textoBotao}>Excluir Perfil</Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </View >
    </View >
  );
}
