import React, { useState, useEffect } from "react";
import { View, Text, Image, Pressable, TextInput } from "react-native";
import { FontAwesome, MaterialIcons } from "@expo/vector-icons";
import { styles } from "@/styles/CardPostagemStyles";
import { useRouter } from "expo-router";
import ModalCriarPostagemStyles from "@/styles/ModalCriarPostagemStyles";
import AvaliacaoPostagem from "@/components/acoesPostagem/AvaliacaoPostagem";
import OpcoesPostagem from "@/components/acoesPostagem/OpcoesPostagem";
import FavoritoBotao from "@/components/acoesPostagem/FavoritoBotao";
import { useAuth } from "@/context/AuthContext";
import {
  comentarPostagem,
  curtirPostagem,
  repostarPostagem,
} from "@/services/interacoesPostagem";
const [mostrarComentario, setMostrarComentario] = useState(false);
const [textoComentario, setTextoComentario] = useState("");
import axios from "axios";
import { API_URL } from "@/config/api";
import { TouchableOpacity } from "react-native-gesture-handler";
import { GestureResponderEvent } from "react-native";

interface Props {
  postagem: any;
  avaliacaoAtual?: number;
  onPostagemExcluida?: () => void;
  onPostagemAtualizada?: () => void;
}

const CardPostagem = ({ postagem, onPostagemExcluida, onPostagemAtualizada }: Props) => {
  const { tp_post, autor: usuario, createdAt, descricao_resumida } = postagem;
  const router = useRouter();
  const { id } = postagem;
  const postagemId = Number(postagem?.id);
  const [foiExcluida, setFoiExcluida] = useState(false);
  const [mensagemFeedback, setMensagemFeedback] = useState("");

  const [erroImagem, setErroImagem] = useState(false);
  const { usuario: usuarioLogado } = useAuth();
  const [mensagemExclusao, setMensagemExclusao] = useState("");
  const { userToken } = useAuth();
  const [curtido, setCurtido] = useState(false);
  const [likes, setLikes] = useState(postagem.likes ?? 0);

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

  const handleCurtir = async () => {
    try {
      if (!curtido && postagemId) {
        await axios.post(`${API_URL}/curtidas/${postagemId}`, null, {
          headers: { Authorization: `Bearer ${userToken}` },
        });
        setLikes(likes + 1);
      } else {
        await axios.delete(`${API_URL}/curtidas/${postagemId}`, {
          headers: { Authorization: `Bearer ${userToken}` },
        });

        setLikes(likes - 1);
      }
      setCurtido(!curtido);
    } catch (error) {
      console.error("Erro ao curtir:", error);
    }
  };

  const mostrarMensagemTemporaria = (msg: string, duracao = 3000) => {
    setMensagemFeedback(msg);
    setTimeout(() => {
      setMensagemFeedback("");
    }, duracao);
  };

  const ehAutorDaPostagem = usuarioLogado?.id_user === usuario?.id_user;

  useEffect(() => {
    const verificarCurtida = async () => {
      console.log("🧪 ID da postagem para verificar curtida:", postagemId);

      try {
        const res = await axios.get(`${API_URL}/curtidas/${postagemId}`, {
          headers: { Authorization: `Bearer ${userToken}` },
        });
        setCurtido(res.data.curtido);
        setLikes(res.data.total);
      } catch (error) {
        console.error("Erro ao carregar curtidas:", error);
      }
    };

    if (postagemId) {
      verificarCurtida();
    }
  }, [postagemId]);

  return (
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

        <View
          style={{ flexDirection: "column", alignItems: "flex-end", gap: 6 }}
        >
          <View style={{ flexDirection: "row", alignItems: "center", gap: 10 }}>
            <AvaliacaoPostagem postagem={postagem} />
            <FavoritoBotao postagemId={postagem.id} />
          </View>

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

      {/* Conteúdo clicável (navega para os detalhes) */}
      <Pressable onPress={() => router.push(`/postagem/${id}`)}>
        <View>
          <View style={[styles.tagTipoPost, { backgroundColor: "#2E7D32" }]}>
            <Text style={styles.tagTipoText}>{postagem.tp_post}</Text>
          </View>

          {postagem.titulo && (
            <Text style={styles.titulo} numberOfLines={2}>
              {postagem.titulo}
            </Text>
          )}

          {descricao_resumida && (
            <Text
              style={styles.descricaoResumida}
              numberOfLines={3}
              ellipsizeMode="tail"
            >
              {descricao_resumida}
            </Text>
          )}

          {tp_post === "recado" && postagem.conteudo && (
            <Text
              style={styles.descricaoResumida}
              numberOfLines={3}
              ellipsizeMode="tail"
            >
              {postagem.conteudo}
            </Text>
          )}

          <Text style={styles.data}>{formatarDataHora(createdAt)}</Text>
        </View>
      </Pressable>

      {/* Ações */}
      <View style={styles.interacoes}>
        <Pressable
          style={styles.botaoInteracao}
          onPress={() => setMostrarComentario(!mostrarComentario)}
        >
          <FontAwesome name="comment-o" size={18} color="#555" />
          <Text style={styles.textoInteracao}>Comentar</Text>
        </Pressable>

        <View style={{ flexDirection: "row", gap: 12, marginTop: 8 }}>
          <Pressable
            onPress={handleCurtir}
            style={{
              flexDirection: "row",
              alignItems: "center",
              padding: 6,
              borderRadius: 8,
            }}
          >
            <FontAwesome
              name="leaf"
              size={20}
              color={curtido ? "#2E7D32" : "#666"}
            />
            <Text style={{ marginLeft: 6, color: "#444", fontSize: 14 }}>
              {likes}
            </Text>
          </Pressable>

          <Pressable onPress={() => repostarPostagem(postagem.id)}>
            <MaterialIcons name="repeat" size={20} color="#3C6E47" />
          </Pressable>

          {mostrarComentario && (
            <View style={{ marginTop: 8 }}>
              <TextInput
                placeholder="Escreva um comentário..."
                value={textoComentario}
                onChangeText={setTextoComentario}
                multiline
                style={{
                  borderWidth: 1,
                  borderColor: "#ccc",
                  borderRadius: 8,
                  padding: 8,
                  backgroundColor: "#fff",
                }}
              />
              <Pressable
                onPress={async () => {
                  if (!textoComentario.trim()) return;
                  try {
                    await comentarPostagem(postagem.id, textoComentario);
                    setTextoComentario("");
                    setMostrarComentario(false);
                  } catch (err) {
                    console.error("Erro ao comentar:", err);
                  }
                }}
                style={{
                  backgroundColor: "#3C6E47",
                  paddingVertical: 6,
                  paddingHorizontal: 12,
                  borderRadius: 6,
                  alignSelf: "flex-end",
                  marginTop: 6,
                }}
              >
                <Text style={{ color: "#fff" }}>Comentar</Text>
              </Pressable>
            </View>
          )}

          {ehAutorDaPostagem && (
            <OpcoesPostagem
              postagemId={id}
              onPostagemExcluida={() => {
                setFoiExcluida(true);
                onPostagemExcluida?.();
                mostrarMensagemTemporaria("Postagem excluída com sucesso!");
              }}
              onPostagemAtualizada={() => {
                onPostagemAtualizada?.();
                mostrarMensagemTemporaria("Postagem atualizada com sucesso!");
              }}
            />
          )}
        </View>
      </View>

      {mensagemFeedback !== "" && (
        <Text style={styles.mensagemExclusao}>{mensagemFeedback}</Text>
      )}
    </View>
  );
};

export default CardPostagem;
