import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  Image,
  Pressable,
  TextInput,
  TouchableWithoutFeedback,
} from "react-native";
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
import axios from "axios";
import { API_URL } from "@/config/api";
import AsyncStorage from "@react-native-async-storage/async-storage";

interface Props {
  postagem: any;
  avaliacaoAtual?: number;
  onPostagemExcluida?: () => void;
}

const CardPostagem = ({ postagem, onPostagemExcluida }: Props) => {
  const { tp_post, autor: usuario, createdAt, descricao_resumida } = postagem;
  const router = useRouter();

  const { id } = postagem;
  const postagemId = Number(postagem?.id);
  type Comentario = {
    conteudo: string;
    usuario?: {
      nickname?: string;
    };
  };

  const [comentarios, setComentarios] = useState<Comentario[]>([]);
  const [mostrarComentario, setMostrarComentario] = useState(false);
  const [textoComentario, setTextoComentario] = useState("");
  const [erroImagem, setErroImagem] = useState(false);
  const { usuario: usuarioLogado } = useAuth();
  const [mensagemExclusao, setMensagemExclusao] = useState("");
  const { userToken } = useAuth();
  const [curtido, setCurtido] = useState(false);
  const [likes, setLikes] = useState(postagem.likes ?? 0);
  const [postagemOriginalManual, setPostagemOriginalManual] =
    useState<any>(null);
  const postagemOriginal = postagem?.postagemOriginal || postagemOriginalManual;
  const isRepost = tp_post === "repost" && postagemOriginal;

  const listarComentarios = async (postagemId: number) => {
    const token = await AsyncStorage.getItem("@token");
    return axios.get(`${API_URL}/comentarios/${postagemId}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  };

  const categoriaFinal = isRepost
    ? postagemOriginal?.categoria
    : postagem?.categoria;

  const [verTodosComentarios, setVerTodosComentarios] = useState(false);
  const fotoAutorOriginal = postagemOriginal?.autor?.foto_perfil?.startsWith(
    "http"
  )
    ? { uri: postagemOriginal.autor.foto_perfil }
    : {
      uri: "https://res.cloudinary.com/dyhzz5baz/image/upload/v1746917561/default-avatar_jvqpsg.png",
    };

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
  const handleTouch = (e: any) => {
    e.stopPropagation();
    e.preventDefault();
    return true;
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

  const ehAutorDaPostagem = usuarioLogado?.id_user === usuario?.id_user;

  const jaRepostou = postagem.reposts?.some(
    (r: any) => r.usuario_id === usuarioLogado?.id_user
  );

  useEffect(() => {
    const verificarCurtida = async () => {
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

  useEffect(() => {
    const buscarPostagemOriginal = async () => {
      try {
        if (tp_post === "repost" && postagem.repost_de && !postagemOriginal) {
          const res = await axios.get(
            `${API_URL}/usuario/postagens/${postagem.repost_de}`,
            {
              headers: { Authorization: `Bearer ${userToken}` },
            }
          );
          setPostagemOriginalManual(res.data);
        }
      } catch (error) {
        console.warn("⚠️ Erro ao buscar postagem original:", error);
      }
    };

    buscarPostagemOriginal();
  }, [tp_post, postagem.repost_de, userToken]);

  useEffect(() => {
    const listarComentarios = async (postagemId: number) => {
      try {
        const token = await AsyncStorage.getItem("@token");
        const response = await axios.get(
          `${API_URL}/comentarios/${postagemId}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
            validateStatus: (status) => status < 500,
          }
        );
        return response.data;
      } catch (error) {
        console.error("Erro ao buscar comentários:", error);
        return [];
      }
    };

    if (mostrarComentario) {
      listarComentarios(postagemId);
    }
  }, [mostrarComentario]);

  return (
    <>
      <View
        onStartShouldSetResponder={() => true}
        onResponderTerminationRequest={() => false}
      ></View>
      <View style={[styles.card, { borderColor: definirCorBorda() }]}>
        {/* Cabeçalho */}
        <View
          style={[styles.headerUsuario, { justifyContent: "space-between" }]}
        >
          <Pressable
            onPress={() => router.push(`/perfil/${usuario?.id_user}`)}
            hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
          >
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
            <View
              style={{ flexDirection: "row", alignItems: "center", gap: 10 }}
            >
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

        {/* Conteúdo */}
        <TouchableWithoutFeedback
          onPress={() => router.push(`/postagem/${id}`)}
        >
          <View>
            {isRepost ? (
              <>
                <Text style={{ color: "#777", fontSize: 12, marginBottom: 4 }}>
                  🔁 Repostado por @{usuario.nickname}
                </Text>

                <View
                  style={{
                    backgroundColor: "#f5f5f5",
                    padding: 10,
                    borderRadius: 8,
                    borderWidth: 1,
                    borderColor: "#ccc",
                  }}
                >
                  <View
                    style={{
                      flexDirection: "row",
                      alignItems: "center",
                      marginBottom: 6,
                    }}
                  >
                    <Image
                      source={fotoAutorOriginal}
                      style={{
                        width: 28,
                        height: 28,
                        borderRadius: 14,
                        marginRight: 8,
                      }}
                    />
                    <View>
                      <Text style={{ fontWeight: "bold", fontSize: 14 }}>
                        {postagemOriginal.autor.nome}
                      </Text>
                      <Text style={{ color: "#666", fontSize: 12 }}>
                        @{postagemOriginal.autor.nickname}
                      </Text>
                      <View
                        style={{
                          backgroundColor: "#2E7D32",
                          paddingHorizontal: 10,
                          paddingVertical: 4,
                          borderRadius: 20,
                          alignSelf: "flex-start",
                          marginBottom: 6,
                        }}
                      >
                        <Text
                          style={{
                            color: "#fff",
                            fontWeight: "bold",
                            fontSize: 12,
                          }}
                        >
                          {postagemOriginal.tp_post}
                        </Text>
                      </View>
                    </View>
                  </View>

                  {postagemOriginal.titulo && (
                    <Text
                      style={{
                        fontSize: 16,
                        fontWeight: "600",
                        marginBottom: 4,
                      }}
                    >
                      {postagemOriginal.titulo}
                    </Text>
                  )}
                  <Text style={{ fontSize: 14, color: "#444" }}>
                    {postagemOriginal.conteudo}
                  </Text>
                  <Text style={{ color: "#999", fontSize: 12, marginTop: 6 }}>
                    {formatarDataHora(postagemOriginal.createdAt)}
                  </Text>
                </View>
              </>
            ) : (
              <>
                <View
                  style={[styles.tagTipoPost, { backgroundColor: "#2E7D32" }]}
                >
                  <Text style={styles.tagTipoText}>{postagem.tp_post}</Text>
                </View>

                {postagem.titulo && (
                  <Text style={styles.titulo} numberOfLines={2}>
                    {postagem.titulo}
                  </Text>
                )}

                {descricao_resumida ? (
                  <Text
                    style={styles.descricaoResumida}
                    numberOfLines={3}
                    ellipsizeMode="tail"
                  >
                    {descricao_resumida}
                  </Text>
                ) : tp_post === "recado" && postagem.conteudo ? (
                  <Text
                    style={styles.descricaoResumida}
                    numberOfLines={3}
                    ellipsizeMode="tail"
                  >
                    {postagem.conteudo}
                  </Text>
                ) : null}

                <Text style={styles.data}>{formatarDataHora(createdAt)}</Text>
              </>
            )}
          </View>
        </TouchableWithoutFeedback>

        {/* Ações estilo LinkedIn */}
        <View
          style={{ borderTopWidth: 1, borderTopColor: "#eee", marginTop: 10 }}
        >
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-around",
              paddingVertical: 8,
            }}
          >
            <Pressable
              onPress={(e) => {
                handleTouch(e);
                setMostrarComentario(!mostrarComentario);
              }}
              style={{ flexDirection: "row", alignItems: "center", gap: 4 }}
              hitSlop={{ top: 15, bottom: 15, left: 15, right: 15 }}
            >
              <FontAwesome name="comment-o" size={18} color="#555" />
              <Text style={{ color: "#444", fontSize: 14 }}>Comentar</Text>
            </Pressable>

            <Pressable
              onPress={handleCurtir}
              style={{ flexDirection: "row", alignItems: "center", gap: 6 }}
              hitSlop={{ top: 15, bottom: 15, left: 15, right: 15 }}
            >
              <FontAwesome
                name="leaf"
                size={18}
                color={curtido ? "#2E7D32" : "#666"}
              />
              <Text style={{ color: "#444", fontSize: 14 }}>{likes}</Text>
            </Pressable>

            {postagem.usuario_id !== usuarioLogado?.id_user && (
              <Pressable
                onPress={() => repostarPostagem(postagem.id)}
                hitSlop={{ top: 15, bottom: 15, left: 15, right: 15 }}
              >
                <MaterialIcons name="repeat" size={20} color="#3C6E47" />
              </Pressable>
            )}

            {ehAutorDaPostagem && (
              <OpcoesPostagem
                postagemId={id}
                createdAt={createdAt}
                usuarioId={usuario?.id_user}
                onEditar={() => { }}
                onPostagemExcluida={() => {
                  onPostagemExcluida?.();
                  setMensagemExclusao("Postagem excluída com sucesso!");
                }}
              />

            )}
          </View>
        </View>

        {/* Comentários */}
        {mostrarComentario && (
          <View
            onStartShouldSetResponder={() => true}
            onResponderGrant={() => true}
            onResponderReject={() => true}
            onTouchStart={(e) => {
              e.stopPropagation();
              e.preventDefault();
            }}
            onTouchEnd={(e) => {
              e.stopPropagation();
              e.preventDefault();
            }}
            style={{
              marginTop: 12,
              backgroundColor: "#f9f9f9",
              padding: 10,
              borderRadius: 8,
            }}
          >
            {comentarios.length === 0 ? (
              <Text style={{ color: "#666", marginBottom: 10 }}>
                Ainda não há comentários. Seja o primeiro a comentar!
              </Text>
            ) : (
              <>
                {(verTodosComentarios
                  ? comentarios
                  : comentarios.slice(0, 2)
                ).map((c, idx) => (
                  <Text
                    key={idx}
                    style={{
                      fontSize: 14,
                      marginBottom: 6,
                      lineHeight: 18,
                      color: "#333",
                    }}
                  >
                    <Text style={{ fontWeight: "bold" }}>
                      @{c.usuario?.nickname || "usuário"}:
                    </Text>{" "}
                    {c.conteudo}
                  </Text>
                ))}

                {comentarios.length > 2 && (
                  <Pressable
                    onPress={() => setVerTodosComentarios(!verTodosComentarios)}
                    hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
                  >
                    <Text
                      style={{
                        color: "#3C6E47",
                        fontWeight: "bold",
                        marginBottom: 8,
                      }}
                    >
                      {verTodosComentarios ? "Ver menos" : "Ver todos"}
                    </Text>
                  </Pressable>
                )}
              </>
            )}

            <View>
              <TouchableWithoutFeedback onPress={() => { }}>
                {/* <View
              onStartShouldSetResponder={() => true}
              onResponderTerminationRequest={() => false}
            > */}
                <TextInput
                  placeholder="Escreva um comentário..."
                  value={textoComentario}
                  onChangeText={setTextoComentario}
                  onPressIn={(e) => {
                    e.stopPropagation();
                    e.preventDefault();
                  }}
                  onTouchStart={(e) => {
                    e.stopPropagation();
                    e.preventDefault();
                  }}
                  onTouchEnd={(e) => {
                    e.stopPropagation();
                    e.preventDefault();
                  }}
                  multiline
                  style={{
                    borderWidth: 1,
                    borderColor: "#ccc",
                    borderRadius: 8,
                    padding: 10,
                    backgroundColor: "#fff",
                    fontSize: 14,
                    marginTop: 6,
                  }}
                />
              </TouchableWithoutFeedback>
            </View>
            <Pressable
              disabled={comentarios.length >= 20}
              onPress={async (e) => {
                e?.stopPropagation && e.stopPropagation();
                if (!textoComentario.trim()) return;
                try {
                  await comentarPostagem(postagemId, textoComentario);
                  setTextoComentario("");
                  const res = await listarComentarios(postagemId);
                  setComentarios(res.data);
                } catch (err) {
                  console.error("Erro ao comentar:", err);
                }
              }}
              style={{
                backgroundColor: "#3C6E47",
                marginTop: 8,
                paddingVertical: 6,
                paddingHorizontal: 14,
                alignSelf: "flex-end",
                borderRadius: 6,
              }}
              hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
            >
              <Text style={{ color: "#fff", fontSize: 14 }}>Comentar</Text>
            </Pressable>
          </View>
        )}
        {mensagemExclusao !== "" && (
          <Text style={styles.mensagemExclusao}>{mensagemExclusao}</Text>
        )}
      </View>
    </>
  );
};

export default CardPostagem;