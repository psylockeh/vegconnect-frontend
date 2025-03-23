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
  const [telefone, setTelefone] = useState("");
  const [nickname, setNickname] = useState("");
  const [bio, setBio] = useState("");
  const [fotoPerfil, setFotoPerfil] = useState<string | null>(null);
  const [especialidade, setEspecialidade] = useState("");
  const [nomeComercio, setNomeComercio] = useState("");
  const [telCom, setTelCom] = useState("");
  const [prefAlim, setPrefAlim] = useState("");
  const [loading, setLoading] = useState(false);

  const tipo = perfilUsuario?.tp_user;

  useEffect(() => {
    carregarPerfil();
  }, []);

  useEffect(() => {
    if (perfilUsuario) {
      setNome(perfilUsuario.nome);
      setNickname(perfilUsuario.nickname || "");
      setBio(perfilUsuario.bio || "");
      setTelefone(perfilUsuario.telefone || "");
      setFotoPerfil(perfilUsuario.foto_perfil || null);

      if (tipo === "Comerciante") {
        setNomeComercio(perfilUsuario.nome_comercio || "");
        setTelCom(perfilUsuario.tel_com || "");
      }

      if (tipo === "Chef") {
        setEspecialidade(perfilUsuario.especialidade || "");
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
      const formData = {
        nome,
        telefone,
        nickname,
        bio,
        foto_perfil: fotoPerfil,
        ...(tipo === "Comerciante" && {
          nome_comercio: nomeComercio,
          tel_com: telCom,
        }),
        ...(tipo === "Chef" && {
          especialidade,
        }),
        ...(tipo === "Comum" && {
          pref_alim: prefAlim,
        }),
      };

      const token = await AsyncStorage.getItem("@token");
      await axios.put(`${API_URL}/usuario/perfil`, formData, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

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
        {fotoPerfil ? (
          <Image source={{ uri: fotoPerfil }} style={styles.avatar} />
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
        </>
      )}

      {tipo === "Chef" && (
        <TextInput
          style={styles.input}
          placeholder="Especialidade"
          value={especialidade}
          onChangeText={setEspecialidade}
        />
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
