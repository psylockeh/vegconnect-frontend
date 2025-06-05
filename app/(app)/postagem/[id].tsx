import React, { useEffect, useState } from "react";
import { View, Text, ScrollView, Image, ActivityIndicator } from "react-native";
import { useLocalSearchParams } from "expo-router";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { API_URL } from "@/config/api";
import { styles } from "@/styles/CardPostagemStyles";
import ModalCriarPostagemStyles from "@/styles/ModalCriarPostagemStyles";
import VisualizacaoReceita from "@/components/postagens/VisualizacaoReceita";
import VisualizacaoEstabelecimento from "@/components/postagens/VisualizacaoEstabelecimento";
import VisualizacaoPromocao from "@/components/postagens/VisualizacaoPromocao";
import VisualizacaoEvento from "@/components/postagens/VisualizacaoEvento";
import ModalValidarReceita from "@/components/postagens/ModalValidarReceita";
import { useAuth } from "@/context/AuthContext";
import FavoritarBotao from "@/components/gerenciamento/FavoritoBotao";
import AvaliacaoPostagem from "@/components/postagens/AvaliacaoPostagem";

const { perfilUsuario } = useAuth();

export default function DetalhesPostagem() {
  const { id } = useLocalSearchParams();
  const [postagem, setPostagem] = useState<any>(null);
  const [carregando, setCarregando] = useState(true);
  const [modalVisivel, setModalVisivel] = useState(false);
  const { perfilUsuario } = useAuth();

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

  if (carregando) {
    return <ActivityIndicator size="large" style={{ marginTop: 100 }} />;
  }

  if (!postagem) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <Text>Carregando postagem...</Text>
      </View>
    );
  }

  const usuario = postagem.autor;

  const renderVisualizacaoTipo = () => {
    switch (postagem.tp_post) {
      case "receita":
        return (
          <VisualizacaoReceita
            postagem={postagem}
            perfilUsuario={perfilUsuario}
            setModalVisivel={setModalVisivel}
            autor={postagem.autor}
            verificadoPor={postagem.verificado_por}
          />
        );
      case "evento":
        return <VisualizacaoEvento postagem={postagem} />;
      case "promocao":
        return <VisualizacaoPromocao postagem={postagem} />;
      case "estabelecimento":
        return <VisualizacaoEstabelecimento postagem={postagem} />;
      default:
        return <Text>Tipo de postagem não reconhecido.</Text>;
    }
  };

  return (
    <ScrollView contentContainerStyle={{ padding: 16 }}>
      <View style={[styles.card, { borderColor: "#ccc" }]}>
        {/* Header do usuário */}
        <View style={styles.headerUsuario}>
          <Image
            source={{
              uri: usuario?.foto_perfil?.startsWith("http")
                ? usuario.foto_perfil
                : "https://res.cloudinary.com/dyhzz5baz/image/upload/v1746917561/default-avatar_jvqpsg.png",
            }}
            style={ModalCriarPostagemStyles.avatar}
            onError={() => console.log("❌ Erro ao carregar imagem de perfil")}
          />

          <View>
            <Text style={styles.nomeUsuario}>{usuario?.nome}</Text>
            <Text style={styles.nickname}>@{usuario?.nickname}</Text>
          </View>

          {/* Botões alinhados à direita, um abaixo do outro */}
          <View style={{ flexDirection: "row", alignItems: "flex-start", justifyContent: "flex-end", width: '90%' }}>
            <AvaliacaoPostagem postagem={postagem} />
            <FavoritarBotao postagemId={postagem.id} />
          </View>
        </View>

        {/* Título e conteúdo */}
        {postagem.titulo && (
          <Text style={styles.titulo}>{postagem.titulo}</Text>
        )}
        {postagem.tp_post !== "receita" && postagem.conteudo && (
          <Text style={styles.conteudo}>{postagem.conteudo}</Text>
        )}

        {/* Visualização do tipo de postagem */}
        {renderVisualizacaoTipo()}

        {/* Data */}
        <Text style={styles.data}>
          Publicado em:{" "}
          {new Date(postagem.createdAt).toLocaleDateString("pt-BR")}
        </Text>
      </View>

      {/* Modal para validação */}
      {modalVisivel && (
        <ModalValidarReceita
          visible={modalVisivel}
          postagemId={postagem.id}
          onClose={() => setModalVisivel(false)}
        />
      )}
    </ScrollView>
  );
}
