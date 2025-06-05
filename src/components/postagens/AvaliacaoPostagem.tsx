import React, { useState, useEffect } from "react";
import { View, Text, Button, TextInput, TouchableOpacity, Modal, TouchableWithoutFeedback, Keyboard } from "react-native";
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

  // Função para enviar avaliação e atualizar média depois
  const enviarAvaliacao = async () => {
    if (avaliacao < 1 || avaliacao > 5) {
      alert("Por favor, selecione uma avaliação entre 1 e 5 estrelas.");
      return;
    }
    if (jaAvaliou) {
      alert("Você já avaliou esta postagem. Sua avaliação será atualizada.");
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
      alert("Avaliação enviada com sucesso!");
      setModalAberta(false);
      setMostrarFormulario(false);
      setAvaliacao(0);
      setPontosPositivos("");
      setPontosNegativos("");
      setJaAvaliou(true);
      fetchMediaAvaliacoes();
    } catch (error) {
      console.error("Erro ao enviar avaliação:", error);
      alert("Erro ao enviar avaliação.");
    }
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
          <View style={styles.modalBackground}>
            <TouchableWithoutFeedback onPress={() => { }}>
              <View style={styles.modalContainer}>
                {!mostrarFormulario ? (
                  <>
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
                    <Text style={styles.label}>Sua Avaliação:</Text>
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
