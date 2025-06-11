import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Modal, Image, ScrollView,
  TouchableWithoutFeedback,
  Keyboard, FlatList, ActivityIndicator
} from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import axios from "axios";
import { API_URL } from "@/config/api";
import { useAuth } from "@/context/AuthContext";
import type { Postagem } from "@/types";
import styles from "@/styles/AvaliacaoPostagem";

type Props = {
  postagem: Postagem;
  avaliacaoAtual?: number;
};

interface Usuario {
  id_user: number;
  nome: string;
  tp_user: string;
  foto_perfil: string;
  nickname: string;
}

interface Avaliacao {
  id: number;
  estrelas: number;
  comentario_positivo: string;
  comentario_negativo: string;
  autor: Usuario;
}

const AvaliacaoPostagem: React.FC<Props> = ({ postagem, avaliacaoAtual = 0 }) => {
  const { userToken } = useAuth();
  const [modalAberta, setModalAberta] = useState(false);
  const [mostrarFormulario, setMostrarFormulario] = useState(false);
  const [avaliacao, setAvaliacao] = useState(0);
  const [pontosPositivos, setPontosPositivos] = useState("");
  const [pontosNegativos, setPontosNegativos] = useState("");
  const [mediaAvaliacoes, setMediaAvaliacoes] = useState(0);
  const [totalAvaliacoes, setTotalAvaliacoes] = useState(0);
  const [jaAvaliou, setJaAvaliou] = useState(false);
  const [avaliacoes, setAvaliacoes] = useState<Avaliacao[]>([]);
  const [loading, setLoading] = useState(false);
  const [erroImagem, setErroImagem] = useState(false);

  // Função para buscar média
  const fetchMediaAvaliacoes = async () => {
    try {
      const response = await axios.get(`${API_URL}/usuario/avaliacao/media/${postagem.id}`, {
        headers: { Authorization: `Bearer ${userToken}` },
      });
      const { media, total } = response.data;
      setMediaAvaliacoes(media);
      setTotalAvaliacoes(total);
    } catch (error) {
      console.error("Erro ao buscar média das avaliações:", error);
    }
  };

  useEffect(() => {
    if (postagem.tp_post !== "recado") {
      fetchMediaAvaliacoes();
    }
  }, [postagem]);

  // Função para buscar status da avaliação 
  const buscarStatusAvaliacao = async () => {
    try {
      const response = await axios.get(`${API_URL}/usuario/avaliacao/${postagem.id}`, {
        headers: { Authorization: `Bearer ${userToken}` },
      });

      if (response.data.avaliou) {
        const { estrelas, comentario_positivo, comentario_negativo } = response.data.avaliacao;
        setAvaliacao(estrelas);
        setPontosPositivos(comentario_positivo || "");
        setPontosNegativos(comentario_negativo || "");
        setJaAvaliou(true);
      } else {
        setAvaliacao(0);
        setPontosPositivos("");
        setPontosNegativos("");
        setJaAvaliou(false);
      }

      setMostrarFormulario(true);
    } catch (error) {
      console.error("Erro ao buscar status da avaliação:", error);
      setMostrarFormulario(true);
    }
  };

  //Listar Avaliações
  const buscarAvaliacoes = async () => {
    try {
      setLoading(true);
      const response = await axios.get(`${API_URL}/usuario/listaravaliacoes/${postagem.id}`, {
        headers: { Authorization: `Bearer ${userToken}` },
      });
       console.log("Avaliações recebidas:", response.data); // <- verifique se tem Usuario dentro
      setAvaliacoes(response.data.avaliacoes || []);
    } catch (error) {
      console.error("Erro ao buscar avaliações:", error);
    } finally {
      setLoading(false);
    }
  };

  // Função para enviar avaliação e atualizar média depois
  const enviarAvaliacao = async () => {
    if (avaliacao < 1 || avaliacao > 5) {
      console.error("Por favor, selecione uma avaliação entre 1 e 5 estrelas.");
      return;
    }
    if (jaAvaliou) {
      console.error("Você já avaliou esta postagem. Sua avaliação será atualizada.");
    }
    try {
      await axios.post(
        `${API_URL}/usuario/avaliar`,
        {
          postagem_id: postagem.id,
          estrelas: avaliacao,
          comentario_positivo: pontosPositivos,
          comentario_negativo: pontosNegativos,
        },
        {
          headers: { Authorization: `Bearer ${userToken}` },
        }
      );
      console.error("Avaliação enviada com sucesso!");
      setModalAberta(false);
      setMostrarFormulario(false);
      setAvaliacao(0);
      setPontosPositivos("");
      setPontosNegativos("");
      setJaAvaliou(true);
      fetchMediaAvaliacoes();
    } catch (error) {
      console.error("Erro ao enviar avaliação:", error);
    }
  };

  const fotoPerfilFinal = (fotoPerfil: string | null | undefined) =>
    fotoPerfil?.startsWith("http") && !erroImagem
      ? { uri: fotoPerfil }
      : {
        uri: "https://res.cloudinary.com/dyhzz5baz/image/upload/v1746917561/default-avatar_jvqpsg.png",
      };

  // Renderiza estrelas coloridas de acordo com a média
  const renderStars = (media: number) => {
    const stars = [];
    for (let i = 1; i <= 5; i++) {
      let color = "#999"; // cinza padrão
      if (media >= i) {
        color = "#FFD700"; // amarelo estrela cheia
      } else if (media > i - 1 && media < i) {
        // estrela parcialmente preenchida
        color = "#FFD700";
      }
      stars.push(
        <MaterialIcons key={i} name={media >= i ? "star" : "star-border"} size={20} color={color} />
      );
    }
    return stars;
  };

  if (postagem.tp_post === "recado") return null;

  return (
    <View style={styles.container}>
      {/* Estrelas e média ao lado */}
      <View style={{ flexDirection: "row", }}>
        <TouchableOpacity
          style={styles.containerEstrela}
          onPress={() => {
            setModalAberta(true);
            setMostrarFormulario(false);
            buscarAvaliacoes();
          }}
          activeOpacity={0.7}
        >
          {renderStars(mediaAvaliacoes)}
        </TouchableOpacity>

        <Text
          style={styles.media}> {mediaAvaliacoes.toFixed(1)} </Text>
      </View>

      {/* Modal de avaliação */}
      <Modal
        visible={modalAberta}
        animationType="slide"
        transparent={true}
        onRequestClose={() => {
          setModalAberta(false);
          setMostrarFormulario(false);
        }}
      >
        {/* Listar avaliações e botão de avaliar */}
        <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
          <View style={styles.sobrePosicao}>
            <TouchableWithoutFeedback onPress={() => { }}>
              <View style={styles.modalContainer}>
                {!mostrarFormulario ? (
                  <>
                    {/* Lista de Avaliações */}
                    {loading ? (
                      <View style={{ padding: 10 }}>
                        <ActivityIndicator size={20} color="#3C6E47" />
                      </View>
                    ) : (
                      <View style={{ maxHeight: 400 }}>
                        <Text style={styles.labelTitulo}>Avaliações</Text>
                        <ScrollView style={styles.formularioContainer} showsVerticalScrollIndicator={false}>
                          <FlatList
                            data={avaliacoes}
                            keyExtractor={(item) => item.id.toString()}
                            renderItem={({ item }) => (
                              <View style={styles.avaliacaoItem}>
                                {/* Cabeçalho */}
                                <View style={[styles.headerUsuario, { justifyContent: "space-between" }]}>
                                  <View style={{ flexDirection: "row", alignItems: "center" }}>
                                    <Image
                                      source={fotoPerfilFinal(item.autor?.foto_perfil)}
                                      style={styles.avatar}
                                      onError={() => setErroImagem(true)}
                                    />
                                    <View>
                                      <Text style={styles.nomeUsuario}>{item.autor?.nome}</Text>
                                      <Text style={styles.nickname}>@{item.autor?.nickname}</Text>
                                    </View>
                                  </View>
                                </View>

                                <View style={{ flexDirection: "row", marginVertical: 4 }}>
                                  {[1, 2, 3, 4, 5].map((star) => (
                                    <MaterialIcons
                                      key={star}
                                      name={item.estrelas >= star ? "star" : "star-border"}
                                      size={18}
                                      color="#FFD700"
                                    />
                                  ))}
                                </View>
                                {item.comentario_positivo ? (
                                  <Text style={styles.comentario}>👍: {item.comentario_positivo}</Text>
                                ) : null}
                                {item.comentario_negativo ? (
                                  <Text style={styles.comentario}>👎: {item.comentario_negativo}</Text>
                                ) : null}
                              </View>
                            )}
                            ListEmptyComponent={
                              <Text style={styles.textoVazio}>📌 Nenhuma avaliação registrada.</Text>
                            }
                          />
                        </ScrollView>
                      </View>
                    )}

                    <TouchableOpacity
                      style={styles.botaoAvaliacao}
                      onPress={buscarStatusAvaliacao}>
                      <Text style={styles.textoBotao}>Escreva uma avaliação</Text>
                    </TouchableOpacity>

                    <TouchableOpacity
                      onPress={() => {
                        setModalAberta(false);
                        setMostrarFormulario(false);
                      }}
                      style={styles.botaoCancelar}
                    >
                      <Text style={styles.textoBotaoCancelar}>Fechar</Text>
                    </TouchableOpacity>
                  </>
                ) : (
                  <>
                    <Text style={styles.labelTitulo}>Sua Avaliação</Text>
                    <View style={styles.formularioContainer}>
                      <View style={styles.containerEstrela}>
                        {[1, 2, 3, 4, 5].map((star) => (
                          <TouchableOpacity
                            key={star}
                            onPress={() => setAvaliacao(star)}
                            activeOpacity={0.7}
                            disabled={jaAvaliou}
                          >
                            <MaterialIcons
                              name={avaliacao >= star ? "star" : "star-border"}
                              size={32}
                              color="#FFD700"
                            />
                          </TouchableOpacity>
                        ))}
                      </View>

                      <Text style={styles.label}>Pontos Positivos:</Text>
                      <TextInput
                        style={styles.input}
                        value={pontosPositivos}
                        onChangeText={setPontosPositivos}
                        placeholder="Descreva os pontos positivos"
                        multiline
                        editable={!jaAvaliou}
                      />

                      <Text style={styles.label}>Pontos Negativos:</Text>
                      <TextInput
                        style={styles.input}
                        value={pontosNegativos}
                        onChangeText={setPontosNegativos}
                        placeholder="Descreva os pontos negativos"
                        multiline
                        editable={!jaAvaliou}
                      />
                    </View>

                    <TouchableOpacity
                      style={styles.botaoAvaliacao}
                      onPress={enviarAvaliacao}
                      disabled={avaliacao === 0 || jaAvaliou}
                    >
                      <Text style={styles.textoBotao}>Enviar Avaliação</Text>
                    </TouchableOpacity>

                    <TouchableOpacity
                      style={styles.botaoCancelar}
                      onPress={() => {
                        setModalAberta(false);
                        setMostrarFormulario(false);
                      }}
                    >
                      <Text style={styles.textoBotaoCancelar}>Cancelar</Text>
                    </TouchableOpacity>
                  </>
                )}
              </View>
            </TouchableWithoutFeedback>
          </View>
        </TouchableWithoutFeedback>
      </Modal>
    </View>
  );
};

export default AvaliacaoPostagem;
