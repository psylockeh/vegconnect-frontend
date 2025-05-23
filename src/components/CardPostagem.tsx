import React, { useState } from "react";
import { View, Text, Image, Pressable } from "react-native";
import { FontAwesome, MaterialIcons } from "@expo/vector-icons";
import { styles } from "@/styles/CardPostagemStyles";
import { useRouter } from "expo-router";
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
    <Pressable onPress={() => router.push(`/postagem/${id}`)}>
      <View style={[styles.card, { borderColor: definirCorBorda() }]}>
        {/* Cabeçalho */}
        <View style={styles.headerUsuario}>
          <Image
            source={fotoPerfilFinal}
            style={ModalCriarPostagemStyles.avatar}
            onError={() => setErroImagem(true)}
          />
          <View>
            <Text style={styles.nomeUsuario}>{usuario?.nome}</Text>
            <Text style={styles.nickname}>@{usuario?.nickname}</Text>
          </View>
        </View>

        {/* Tag + Selo */}
        <View style={styles.tagWrapper}>
          <View style={[styles.tagTipoPost, { backgroundColor: "#2E7D32" }]}>
            <Text style={styles.tagTipoText}>Receita</Text>
          </View>
          {postagem.selo_confianca && (
            <View style={styles.verificadoWrapper}>
              <Image
                source={{
                  uri: "https://res.cloudinary.com/dyhzz5baz/image/upload/v1747699449/verified_30dp_314D1C_FILL0_wght400_GRAD0_opsz24_mvxkh2.png",
                }}
                style={styles.verificadoIcon}
              />
              <Text style={styles.verificadoTexto}>
                {postagem.verificado_por?.nickname
                  ? `Verificada por @${postagem.verificado_por.nickname}`
                  : postagem.autor?.tp_user === "Chef"
                    ? `Receita criada por Chef verificado`
                    : ""}
              </Text>
            </View>
          )}
        </View>

        {/* Título */}
        {postagem.titulo && (
          <Text style={styles.titulo} numberOfLines={2}>
            {postagem.titulo}
          </Text>
        )}

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
          <Pressable style={styles.botaoInteracao}>
            <FontAwesome name="comment-o" size={18} color="#555" />
            <Text style={styles.textoInteracao}>Comentar</Text>
          </Pressable>
          <Pressable style={styles.botaoInteracao}>
            <FontAwesome name="heart-o" size={18} color="#555" />
            <Text style={styles.textoInteracao}>Curtir</Text>
          </Pressable>
          <Pressable style={styles.botaoInteracao}>
            <MaterialIcons name="repeat" size={18} color="#555" />
            <Text style={styles.textoInteracao}>Repost</Text>
          </Pressable>
        </View>
      </View>
    </Pressable>
  );
};

export default CardPostagem;
