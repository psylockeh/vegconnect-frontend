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
import { styles } from "@/styles/PerfilStyles";
import { uploadImageToCloudinary } from "../src/utils/cloudinary";
import axios from "axios";
import { API_URL } from "@/config/api";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function EditarPerfilScreen() {
  const { carregarPerfil, perfilUsuario } = useAuth();

  const [nome, setNome] = useState("");
  const [nickname, setNickname] = useState("");
  const [bio, setBio] = useState("");
  const [telefone, setTelefone] = useState("");
  const [foto_perfil, setFotoPerfil] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

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

  // Administrador
  const [cargo, setCargo] = useState("");
  const [matricula, setMatricula] = useState("");

  // Comum
  const [prefAlim, setPrefAlim] = useState("");

  const tipo = perfilUsuario?.tp_user;

  useEffect(() => {
    carregarPerfil();
  }, []);

  useEffect(() => {
    if (perfilUsuario) {
      setNome(perfilUsuario.nome || "");
      setNickname(perfilUsuario.nickname || "");
      setBio(perfilUsuario.bio || "");
      setTelefone(perfilUsuario.telefone || "");
      setFotoPerfil(perfilUsuario.foto_perfil || null);

      if (tipo === "Comerciante") {
        setNomeComercio(perfilUsuario.nome_comercio || "");
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

      const token = await AsyncStorage.getItem("@token");
      await axios.put(`${API_URL}/usuario/perfil`, formData, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      console.log("Enviando dados:", formData);
      await carregarPerfil();
      alert("Perfil atualizado com sucesso!");
    } catch (error) {
      console.error("Erro ao atualizar perfil:", error);
      alert("Erro ao atualizar o perfil.");
    }

    setLoading(false);
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <TouchableOpacity onPress={escolherFoto}>
        {foto_perfil ? (
          <Image source={{ uri: foto_perfil }} style={styles.avatar} />
        ) : (
          <View style={styles.avatarPlaceholder}>
            <Text style={styles.avatarText}>Adicionar Foto</Text>
          </View>
        )}
      </TouchableOpacity>

      <TextInput
        style={styles.input}
        placeholder="Nome completo"
        value={nome}
        onChangeText={setNome}
      />

      <TextInput
        style={styles.input}
        placeholder="Telefone"
        value={telefone}
        onChangeText={setTelefone}
        keyboardType="phone-pad"
      />

      <TextInput
        style={styles.input}
        placeholder="Nickname (único)"
        value={nickname}
        onChangeText={setNickname}
      />

      <TextInput
        style={styles.input}
        placeholder="Biografia"
        value={bio}
        onChangeText={setBio}
        multiline
      />

      {tipo === "Comerciante" && (
        <>
          <TextInput
            style={styles.input}
            placeholder="Nome do comércio"
            value={nomeComercio}
            onChangeText={setNomeComercio}
          />
          <TextInput
            style={styles.input}
            placeholder="Telefone comercial"
            value={telCom}
            onChangeText={setTelCom}
            keyboardType="phone-pad"
          />
          <TextInput
            style={styles.input}
            placeholder="Tipo de produto"
            value={tipoProd}
            onChangeText={setTipoProd}
          />
          <TextInput
            style={styles.input}
            placeholder="Tipo de comércio"
            value={tipoCom}
            onChangeText={setTipoCom}
          />
          <TextInput
            style={styles.input}
            placeholder="Endereço do comércio"
            value={enderCom}
            onChangeText={setEnderCom}
          />
          <TextInput
            style={styles.input}
            placeholder="CNPJ"
            value={cnpj}
            onChangeText={setCnpj}
          />
          <TextInput
            style={styles.input}
            placeholder="CEP do comércio"
            value={cepCom}
            onChangeText={setCepCom}
          />
        </>
      )}

      {tipo === "Chef" && (
        <>
          <TextInput
            style={styles.input}
            placeholder="Especialidade"
            value={especialidade}
            onChangeText={setEspecialidade}
          />
          <TextInput
            style={styles.input}
            placeholder="Certificações"
            value={certificacoes}
            onChangeText={setCertificacoes}
            multiline
          />
        </>
      )}

      {tipo === "Administrador" && (
        <>
          <TextInput
            style={styles.input}
            placeholder="Cargo"
            value={cargo}
            onChangeText={setCargo}
          />
          <TextInput
            style={styles.input}
            placeholder="Matrícula"
            value={matricula}
            onChangeText={setMatricula}
          />
        </>
      )}

      {tipo === "Comum" && (
        <TextInput
          style={styles.input}
          placeholder="Preferência alimentar"
          value={prefAlim}
          onChangeText={setPrefAlim}
        />
      )}

      <TouchableOpacity style={styles.button} onPress={salvarPerfil}>
        {loading ? (
          <ActivityIndicator color="#fff" />
        ) : (
          <Text style={styles.buttonText}>Salvar</Text>
        )}
      </TouchableOpacity>
    </ScrollView>
  );
}
