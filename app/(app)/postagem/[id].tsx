import { View, Text, ScrollView, Image, ActivityIndicator } from "react-native";
import { useLocalSearchParams } from "expo-router";
import { useEffect, useState } from "react";
import axios from "axios";
import { API_URL } from "@/config/api";
import { styles } from "@/styles/CardPostagemStyles";
import AsyncStorage from "@react-native-async-storage/async-storage";

import VisualizacaoReceita from "@/components/postagens/VisualizacaoReceita";
import VisualizacaoEstabelecimento from "@/components/postagens/VisualizacaoEstabelecimento";
import VisualizacaoPromocao from "@/components/postagens/VisualizacaoPromocao";
import VisualizacaoEvento from "@/components/postagens/VisualizacaoEvento";

export default function DetalhesPostagem() {
  const { id } = useLocalSearchParams();
  const [postagem, setPostagem] = useState<any>(null);
  const [carregando, setCarregando] = useState(true);

  const carregarPostagem = async () => {
    try {
      const token = await AsyncStorage.getItem("@token");
      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };
      const response = await axios.get(
        `${API_URL}/usuario/postagens/${id}`,
        config
      );
      setPostagem(response.data);
    } catch (error) {
      console.error("Erro ao buscar detalhes da postagem:", error);
    } finally {
      setCarregando(false);
    }
  };

  useEffect(() => {
    carregarPostagem();
  }, []);

  const renderVisualizacaoTipo = () => {
    if (!postagem) return null;
    switch (postagem.tp_post) {
      case "receita":
        return <VisualizacaoReceita postagem={postagem} />;
      case "evento":
        return <VisualizacaoEvento postagem={postagem} />;
      case "promocao":
        return <VisualizacaoPromocao postagem={postagem} />;
      case "estabelecimento":
        return <VisualizacaoEstabelecimento postagem={postagem} />;
    }
  };

  if (carregando) {
    return <ActivityIndicator size="large" style={{ marginTop: 100 }} />;
  }

  if (!postagem) {
    return (
      <Text style={{ marginTop: 100, textAlign: "center" }}>
        Postagem não encontrada.
      </Text>
    );
  }

  const usuario = postagem.autor;
  const fotoPerfilUrl = usuario?.foto_perfil?.startsWith("http")
    ? usuario.foto_perfil
    : "https://res.cloudinary.com/demo/image/upload/v1682620184/default-profile.png";

  return (
    <ScrollView contentContainerStyle={{ padding: 16 }}>
      <View style={[styles.card, { borderColor: "#ccc" }]}>
        {/* Cabeçalho */}
        <View style={styles.headerUsuario}>
          <Image source={{ uri: fotoPerfilUrl }} style={styles.fotoPerfil} />
          <View>
            <Text style={styles.nomeUsuario}>{usuario?.nome}</Text>
            <Text style={styles.nickname}>@{usuario?.nickname}</Text>
          </View>
        </View>

        {/* Tag do tipo da postagem */}
        <View
          style={[
            styles.tagTipoPost,
            {
              backgroundColor:
                postagem.tp_post === "receita"
                  ? "#CB997E"
                  : postagem.tp_post === "evento"
                    ? "#D4A373"
                    : postagem.tp_post === "promocao"
                      ? "#B7B7A4"
                      : postagem.tp_post === "estabelecimento"
                        ? "#DDB892"
                        : "#A5A58D",
            },
          ]}
        >
          <Text style={styles.tagTipoText}>
            {postagem.tp_post.charAt(0).toUpperCase() +
              postagem.tp_post.slice(1)}
          </Text>
        </View>

        {/* Título e conteúdo comum */}

        {postagem.titulo && (
          <Text style={styles.titulo}>{postagem.titulo}</Text>
        )}
        {postagem.tp_post !== "receita" && postagem.conteudo && (
          <Text style={styles.conteudo}>{postagem.conteudo}</Text>
        )}

        {/* Conteúdo específico por tipo */}
        {renderVisualizacaoTipo()}

        {/* Data */}
        <Text style={styles.data}>
          Publicado em:{" "}
          {new Date(postagem.createdAt).toLocaleDateString("pt-BR")}
        </Text>
      </View>
    </ScrollView>
  );
}
