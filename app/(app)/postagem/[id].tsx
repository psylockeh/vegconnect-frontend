import { View, Text, ScrollView, Image, ActivityIndicator } from "react-native";
import { useLocalSearchParams } from "expo-router";
import { useEffect, useState } from "react";
import axios from "axios";
import { API_URL } from "@/config/api";
import { styles } from "@/styles/CardPostagemStyles";
import AsyncStorage from "@react-native-async-storage/async-storage";

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
      const response = await axios.get(`${API_URL}/usuario/postagens/${id}`, config);
      setPostagem(response.data);
    } catch (error) {
      console.error("Erro ao buscar detalhes da postagem:", error);
    } finally {
      setCarregando(false);
    }
  };

  useEffect(() => {
    console.log("ID recebido:", id);
    carregarPostagem();
  }, []);
  
  const renderCamposEspecificos = () => {
    if (!postagem) return null;
    const { tp_post } = postagem;

    switch (tp_post) {
      case "evento":
        return (
          <>
            <Text style={styles.subTitulo}>Local: {postagem.localizacao}</Text>
            <Text style={styles.campo}>Valor: R$ {postagem.valor}</Text>
            <Text style={styles.campo}>Links: {postagem.links}</Text>
          </>
        );
      case "receita":
        return (
          <>
            <Text style={styles.subTitulo}>
              Nome da Receita: {postagem.nome_receita}
            </Text>
            <Text style={styles.campo}>
              Ingredientes: {postagem.ingredientes}
            </Text>
            <Text style={styles.campo}>Instruções: {postagem.instrucoes}</Text>
            <Text style={styles.campo}>
              Tempo de Preparo: {postagem.temp_prep}
            </Text>
          </>
        );
      case "estabelecimento":
        return (
          <>
            <Text style={styles.subTitulo}>
              Comércio: {postagem.nome_comercio}
            </Text>
            <Text style={styles.campo}>
              Descrição: {postagem.descricao_comercio}
            </Text>
            <Text style={styles.campo}>
              Tipo de Comida: {postagem.tp_comida}
            </Text>
            <Text style={styles.campo}>
              Horário: {postagem.hora_abertura} - {postagem.hora_fechamento}
            </Text>
            <Text style={styles.campo}>
              Endereço: {postagem.endereco}, CEP {postagem.cep}
            </Text>
          </>
        );
      default:
        return null;
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

  // ✅ Definindo foto de perfil com fallback
  const fotoPerfilUrl = postagem?.usuario?.foto_perfil?.startsWith("http")
    ? postagem.usuario.foto_perfil
    : "https://res.cloudinary.com/demo/image/upload/v1682620184/default-profile.png";

  return (
    <ScrollView contentContainerStyle={{ padding: 16 }}>
      <View style={[styles.card, { borderColor: "#ccc" }]}>
        <View style={styles.headerUsuario}>
          <Image source={{ uri: fotoPerfilUrl }} style={styles.fotoPerfil} />
          <View>
            <Text style={styles.nomeUsuario}>{postagem.usuario?.nome}</Text>
            <Text style={styles.nickname}>@{postagem.usuario?.nickname}</Text>
          </View>
        </View>

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

        {postagem.titulo && (
          <Text style={styles.titulo}>{postagem.titulo}</Text>
        )}
        <Text style={styles.conteudo}>{postagem.conteudo}</Text>

        {renderCamposEspecificos()}

        <View>
          <Text style={styles.data}>
            Publicado em:{" "}
            {new Date(postagem.createdAt).toLocaleDateString("pt-BR")}
          </Text>
        </View>
      </View>
    </ScrollView>
  );
}
