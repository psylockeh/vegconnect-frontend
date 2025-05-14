import React from "react";
import { View, Text, Image, TouchableOpacity } from "react-native";
import { FontAwesome, MaterialIcons } from "@expo/vector-icons";
import { styles } from "@/styles/CardPostagemStyles";
import { useRouter } from "expo-router";
import { useState } from "react";
import ModalCriarPostagemStyles from "@/styles/ModalCriarPostagemStyles";

interface Props {
  postagem: any;
}

const CardPostagem = ({ postagem }: Props) => {
  const { tp_post, autor: usuario, createdAt, descricao_resumida } = postagem;
  const router = useRouter();
  const { id } = postagem;

  const [erroImagem, setErroImagem] = useState(false);

  const fotoPerfilFinal =
    usuario?.foto_perfil?.startsWith("http") && !erroImagem
      ? { uri: usuario.foto_perfil }
      : {
          uri: "https://res.cloudinary.com/dyhzz5baz/image/upload/v1746917561/default-avatar_jvqpsg.png",
        };

  const fotoPerfilUrl =
    usuario?.foto_perfil && usuario.foto_perfil.startsWith("http")
      ? usuario.foto_perfil
      : "https://res.cloudinary.com/demo/image/upload/v1682620184/default-profile.png";

  const definirCorBorda = () => {
    switch (tp_post) {
      case "recado":
        return "#A5A58D";
      case "receita":
        return "#CB997E";
      case "evento":
        return "#D4A373";
      case "promocao":
        return "#B7B7A4";
      case "estabelecimento":
        return "#DDB892";
      default:
        return "#EDEDE9";
    }
  };

  const formatarDataHora = (data: string) => {
    const dateObj = new Date(data);
    return `${dateObj.toLocaleDateString("pt-BR")} às ${dateObj.toLocaleTimeString(
      "pt-BR",
      {
        hour: "2-digit",
        minute: "2-digit",
      }
    )}`;
  };

  return (
    <TouchableOpacity
      onPress={() => router.push(`/postagem/${id}`)}
      activeOpacity={0.7}
    >
      <View style={[styles.card, { borderColor: definirCorBorda() }]}>
        {/* Cabeçalho */}
        <View style={styles.headerUsuario}>
          {usuario?.foto_perfil?.startsWith("http") ? (
            <Image
              source={{ uri: usuario.foto_perfil }}
              style={styles.fotoPerfil}
              onError={() =>
                console.log("❌ Erro ao carregar imagem de perfil")
              }
            />
          ) : (
            <Image
              source={fotoPerfilFinal}
              style={ModalCriarPostagemStyles.avatar}
              onError={() => setErroImagem(true)}
            />
          )}

          <View>
            <Text style={styles.nomeUsuario}>{usuario?.nome}</Text>
            <Text style={styles.nickname}>@{usuario?.nickname}</Text>
          </View>
        </View>

        {/* Tipo de Post */}
        <View
          style={[styles.tagTipoPost, { backgroundColor: definirCorBorda() }]}
        >
          <Text style={styles.tagTipoText}>
            {tp_post.charAt(0).toUpperCase() + tp_post.slice(1)}
          </Text>
        </View>

        {/* Descrição resumida */}
        {descricao_resumida && (
          <Text
            style={styles.descricaoResumida}
            numberOfLines={3}
            ellipsizeMode="tail"
          >
            {descricao_resumida}
          </Text>
        )}

        {/* Data e hora */}
        <Text style={styles.data}>{formatarDataHora(createdAt)}</Text>

        {/* Ações */}
        <View style={styles.interacoes}>
          <TouchableOpacity style={styles.botaoInteracao}>
            <FontAwesome name="comment-o" size={18} color="#555" />
            <Text style={styles.textoInteracao}>Comentar</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.botaoInteracao}>
            <FontAwesome name="heart-o" size={18} color="#555" />
            <Text style={styles.textoInteracao}>Curtir</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.botaoInteracao}>
            <MaterialIcons name="repeat" size={18} color="#555" />
            <Text style={styles.textoInteracao}>Repost</Text>
          </TouchableOpacity>
        </View>
      </View>
    </TouchableOpacity>
  );
};

export default CardPostagem;
