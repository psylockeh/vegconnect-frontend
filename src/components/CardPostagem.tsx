import React, { useState } from "react";
import { View, Text, Image, Pressable } from "react-native";
import { FontAwesome, MaterialIcons } from "@expo/vector-icons";
import { styles } from "@/styles/CardPostagemStyles";
import { useRouter } from "expo-router";
import ModalCriarPostagemStyles from "@/styles/ModalCriarPostagemStyles";
import AvaliacaoPostagem from "@/components/acoesPostagem/AvaliacaoPostagem";
import OpcoesPostagem from "@/components/acoesPostagem/OpcoesPostagem";
import FavoritoBotao from "@/components/acoesPostagem/FavoritoBotao";
import { useAuth } from "@/context/AuthContext";


interface Props {
  postagem: any;
  avaliacaoAtual?: number;
  onPostagemExcluida?: () => void;
}

const CardPostagem = ({ postagem, onPostagemExcluida }: Props) => {
  const { tp_post, autor: usuario, createdAt, descricao_resumida } = postagem;
  const router = useRouter();
  const { id } = postagem;

  const [erroImagem, setErroImagem] = useState(false);
  const { usuario: usuarioLogado } = useAuth();
  const [mensagemExclusao, setMensagemExclusao] = useState("");

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

  const ehAutorDaPostagem = usuarioLogado?.id_user === usuario?.id_user;

  return (
    <Pressable onPress={() => router.push(`/postagem/${id}`)}>
      <View style={[styles.card, { borderColor: definirCorBorda() }]}>
        {/* Cabeçalho */}
        <View style={[styles.headerUsuario, { justifyContent: "space-between" }]}>
          <Pressable onPress={() => router.push(`/perfil/${usuario?.id_user}`)}>
            <View style={{ flexDirection: "row", alignItems: "center" }}>
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
          </Pressable>


          <View style={{ flexDirection: "column", alignItems: "flex-end", gap: 6 }}>
            {/* Botões */}
            <View style={{ flexDirection: "row", alignItems: "center", gap: 10 }}>
              {/* Botão avaliar postagem */}
              <AvaliacaoPostagem postagem={postagem} />

              {/* Botão Favoritar */}
              <FavoritoBotao postagemId={postagem.id} />
            </View>

            {/* Tag + Selo */}
            <View style={[styles.tagWrapper, { marginRight: 6 }]}>
              {tp_post === "receita" && postagem.selo_confianca && (
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
          </View>
        </View>

        {/* Tipo  de Postagem  */}
        <View style={[styles.tagTipoPost, { backgroundColor: "#2E7D32" }]}>
          <Text style={styles.tagTipoText}>{postagem.tp_post}</Text>
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


        {/* Conteúdo apenas para recado */}
        {tp_post === "recado" && postagem.conteudo && (
          <Text
            style={styles.descricaoResumida}
            numberOfLines={3}
            ellipsizeMode="tail"
          >
            {postagem.conteudo}
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

          {/* Botão opções Editar e Excluir */}
          {ehAutorDaPostagem && (
            <OpcoesPostagem
              postagemId={id}
              onEditar={() => {
              }}
              onPostagemExcluida={() => {
                if (onPostagemExcluida) {
                  onPostagemExcluida();
                  console.log("Lista atualizada após exclusão");
                }
                setMensagemExclusao("Postagem excluída com sucesso!");
              }}
            />
          )}
        </View>

        {/* Mensagem de Postagem Excluida */}
        {mensagemExclusao !== "" && (
          <Text style={styles.mensagemExclusao}>
            {mensagemExclusao}
          </Text>
        )}
      </View>
    </Pressable>
  );
};

export default CardPostagem;
