import React, { useState } from "react";
import {
  Modal,
  View,
  Text,
  TextInput,
  Pressable,
  ScrollView,
} from "react-native";
import { styles } from "@/styles/ModalValidarReceitaStyles";
import { uploadImageToCloudinary } from "@/utils/cloudinary";
import Toast from "react-native-toast-message";
import * as ImagePicker from "expo-image-picker";
import axios from "axios";
import { useAuth } from "@/context/AuthContext";
import { Image } from "react-native";

export default function ModalValidarReceita({
  visible,
  onClose,
  postagemId,
}: {
  visible: boolean;
  onClose: () => void;
  postagemId: number;
}) {
  const [descricao, setDescricao] = useState("");
  const [imagens, setImagens] = useState<string[]>([]);
  const [aprovado, setAprovado] = useState<boolean | null>(null);
  const { userToken } = useAuth();

  const handlePickImage = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      quality: 0.7,
      allowsMultipleSelection: true,
    });

    if (!result.canceled) {
      const uploaded = await uploadImageToCloudinary(result.assets[0].uri);
      if (uploaded) setImagens((prev) => [...prev, uploaded]);
    }
  };

  const handleSubmit = async () => {
    if (!descricao || imagens.length === 0 || aprovado === null) {
      return Toast.show({
        type: "error",
        text1: "Preencha todos os campos obrigatórios.",
      });
    }

    try {
      await axios.post(
        `/usuario/receitas/${postagemId}/selo-confianca`,
        {
          descricao_teste: descricao,
          evidencias_urls: imagens,
          aprovado,
        },
        {
          headers: { Authorization: `Bearer ${userToken}` },
        }
      );

      Toast.show({
        type: "success",
        text1: "Selo enviado com sucesso!",
      });
      onClose();
    } catch (err: any) {
      Toast.show({
        type: "error",
        text1: "Erro ao enviar selo",
        text2: err.response?.data?.msg || "Tente novamente",
      });
    }
  };

  return (
    <Modal visible={visible} animationType="slide" transparent>
      <View style={styles.overlay}>
        <View style={styles.modal}>
          <Text style={styles.titulo}>🧪 Validação da Receita</Text>

          <TextInput
            multiline
            placeholder="Descreva como foi o teste..."
            value={descricao}
            onChangeText={setDescricao}
            style={styles.textArea}
          />

          <Pressable style={styles.botao} onPress={handlePickImage}>
            <Text style={styles.botaoTexto}>📸 Adicionar Imagem/Vídeo</Text>
          </Pressable>

          <ScrollView horizontal>
            {imagens.map((url, idx) => (
              <Image key={idx} source={{ uri: url }} style={styles.preview} />
            ))}
          </ScrollView>

          <View style={styles.botoesAprovacao}>
            <Pressable onPress={() => setAprovado(true)} style={styles.aprovar}>
              <Text style={styles.textoAprovacao}>✅ Aprovar</Text>
            </Pressable>
            <Pressable
              onPress={() => setAprovado(false)}
              style={styles.reprovar}
            >
              <Text style={styles.textoAprovacao}>❌ Reprovar</Text>
            </Pressable>
          </View>

          <Pressable style={styles.enviar} onPress={handleSubmit}>
            <Text style={styles.enviarTexto}>🚀 Enviar Validação</Text>
          </Pressable>

          <Pressable onPress={onClose}>
            <Text style={styles.fechar}>Fechar</Text>
          </Pressable>
        </View>
      </View>
    </Modal>
  );
}
