import { View, Text, ActivityIndicator } from "react-native";
import { useLocalSearchParams } from "expo-router";
import { useEffect, useState } from "react";
import axios from "axios";

export default function DetalhesPostagem() {
  const { id } = useLocalSearchParams();
  const [postagem, setPostagem] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function buscarPostagem() {
      try {
        const response = await axios.get(
          `http:// 172.20.10.11:3000/usuario/postagens/${id}`
        );
        setPostagem(response.data);
      } catch (error) {
        console.error("Erro ao carregar a postagem:", error);
      } finally {
        setLoading(false);
      }
    }

    buscarPostagem();
  }, [id]);

  if (loading) {
    return <ActivityIndicator style={{ flex: 1 }} />;
  }

  if (!postagem) {
    return (
      <View style={{ padding: 16 }}>
        <Text>Postagem não encontrada.</Text>
      </View>
    );
  }

  return (
    <View style={{ padding: 16 }}>
      <Text style={{ fontSize: 24, fontWeight: "bold" }}>
        {postagem.titulo}
      </Text>
      <Text style={{ color: "#666", marginVertical: 4 }}>
        {postagem.autor?.nome} — {postagem.tp_post}
      </Text>
      <Text>{postagem.conteudo}</Text>
    </View>
  );
}
