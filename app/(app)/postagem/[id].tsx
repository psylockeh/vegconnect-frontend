import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  ScrollView,
  Image,
  ActivityIndicator,
  Pressable,
} from "react-native";
import { useLocalSearchParams, useRouter } from "expo-router";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { API_URL } from "@/config/api";
import { styles } from "@/styles/CardPostagemStyles";
import ModalCriarPostagemStyles from "@/styles/ModalCriarPostagemStyles";
import VisualizacaoReceita from "@/components/postagens/VisualizacaoReceita";
import VisualizacaoEstabelecimento from "@/components/postagens/VisualizacaoEstabelecimento";
import VisualizacaoPromocao from "@/components/postagens/VisualizacaoPromocao";
import VisualizacaoEvento from "@/components/postagens/VisualizacaoEvento";
import VisualizacaoRecado from "@/components/postagens/VisualizacaoRecado";
import ModalValidarReceita from "@/components/postagens/ModalValidarReceita";
import { useAuth } from "@/context/AuthContext";
import FavoritarBotao from "@/components/acoesPostagem/FavoritoBotao";
import AvaliacaoPostagem from "@/components/acoesPostagem/AvaliacaoPostagem";
import Sidebar from "@/components/Sidebar";
import OpcoesPostagem from "@/components/acoesPostagem/OpcoesPostagem";

export default function DetalhesPostagem() {
  const { id } = useLocalSearchParams();
  const [postagem, setPostagem] = useState<any>(null);
  const [carregando, setCarregando] = useState(true);
  const [modalVisivel, setModalVisivel] = useState(false);
  const { perfilUsuario } = useAuth();
  const router = useRouter();

  useEffect(() => {
    const carregarPostagem = async () => {
      try {
        if (!id) return;

        const token = await AsyncStorage.getItem("@token");
        const res = await axios.get(`${API_URL}/usuario/postagens/${id}`, {
          headers: { Authorization: `Bearer ${token}` },
        });

        if (!res.data || !res.data.tp_post) {
          console.warn("⚠️ Postagem inválida:", res.data);
          setPostagem(null);
        } else {
          setPostagem(res.data);
        }
      } catch (err: any) {
        console.error(
          "❌ Erro ao buscar detalhes da postagem:",
          err.response?.data || err.message
        );
        setPostagem(null);
      } finally {
        setCarregando(false);
      }
    };

    carregarPostagem();
  }, [id]);

  if (carregando) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <ActivityIndicator size="large" color="#2E7D32" />
        <Text style={{ marginTop: 10 }}>Carregando postagem...</Text>
      </View>
    );
  }

  if (!postagem) {
    return (
      <View style={{ padding: 20 }}>
        <Text style={{ color: "red" }}>Erro ao carregar a postagem.</Text>
      </View>
    );
  }

  const tipoVisualizacao =
    postagem.tp_post === "repost" && postagem.postagemOriginal
      ? postagem.postagemOriginal.tp_post
      : postagem.tp_post;

  const dadosParaVisualizacao =
    postagem.tp_post === "repost" && postagem.postagemOriginal
      ? postagem.postagemOriginal
      : postagem;

  const usuario = postagem.autor;

  const renderVisualizacaoTipo = () => {
    switch (tipoVisualizacao) {
      case "receita":
        return (
          <VisualizacaoReceita
            postagem={dadosParaVisualizacao}
            perfilUsuario={perfilUsuario}
            setModalVisivel={setModalVisivel}
            autor={dadosParaVisualizacao.autor}
            verificadoPor={dadosParaVisualizacao.verificado_por}
          />
        );
      case "evento":
        return <VisualizacaoEvento postagem={dadosParaVisualizacao} />;
      case "promocao":
        return <VisualizacaoPromocao postagem={dadosParaVisualizacao} />;
      case "estabelecimento":
        return <VisualizacaoEstabelecimento postagem={dadosParaVisualizacao} />;
      case "recado":
        return <VisualizacaoRecado postagem={dadosParaVisualizacao} />;
      default:
        return <Text>Tipo de postagem não reconhecido.</Text>;
    }
  };

  return (
    <View style={styles.container}>
      <Sidebar onPostPress={() => {}} />
      <ScrollView contentContainerStyle={{ padding: 16 }}>
        <View style={[styles.card, { borderColor: "#ccc" }]}>
          {/* Header do usuário */}
          <View
            style={[styles.headerUsuario, { justifyContent: "space-between" }]}
          >
            <Pressable
              onPress={() => router.push(`/perfil/${usuario?.id_user}`)}
            >
              <View style={{ flexDirection: "row", alignItems: "center" }}>
                <Image
                  source={{
                    uri: usuario?.foto_perfil?.startsWith("http")
                      ? usuario.foto_perfil
                      : "https://res.cloudinary.com/dyhzz5baz/image/upload/v1746917561/default-avatar_jvqpsg.png",
                  }}
                  style={ModalCriarPostagemStyles.avatar}
                />
                <View>
                  <Text style={styles.nomeUsuario}>{usuario?.nome}</Text>
                  <Text style={styles.nickname}>@{usuario?.nickname}</Text>
                </View>
              </View>
            </Pressable>

            {/* Botões alinhados à direita */}
            <View
              style={{
                flexDirection: "column",
                alignItems: "flex-end",
                gap: 6,
              }}
            >
              <AvaliacaoPostagem postagem={postagem} />
              <FavoritarBotao postagemId={postagem.id} />
              {perfilUsuario?.id_user === usuario?.id_user && (
                <OpcoesPostagem
                  postagemId={postagem.id}
                  createdAt={postagem.createdAt}
                  usuarioId={postagem.usuario_id}
                  onEditar={() => router.push(`/editar/${postagem.id}`)}
                  onPostagemExcluida={() => router.push("/feed")}
                />
              )}
            </View>
          </View>

          {/* Título e conteúdo */}
          {postagem.titulo && (
            <Text style={styles.titulo}>{postagem.titulo}</Text>
          )}
          {postagem.tp_post !== "receita" && postagem.conteudo && (
            <View style={styles.cardRecado}>
              <Text style={styles.conteudo}>{postagem.conteudo}</Text>
            </View>
          )}

          {/* Visualização tipo */}
          {renderVisualizacaoTipo()}

          <Text style={styles.data}>
            Publicado em:{" "}
            {new Date(postagem.createdAt).toLocaleDateString("pt-BR")}
          </Text>
        </View>

        {modalVisivel && (
          <ModalValidarReceita
            visible={modalVisivel}
            postagemId={postagem.id}
            onClose={() => setModalVisivel(false)}
          />
        )}
      </ScrollView>
    </View>
  );
}