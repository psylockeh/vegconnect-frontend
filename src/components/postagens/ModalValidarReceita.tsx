import React, { useEffect, useState } from "react";
import {
  Modal,
  View,
  Text,
  TextInput,
  Pressable,
  ScrollView,
  Image,
} from "react-native";
import { styles } from "@/styles/ModalValidarReceitaStyles";
import { uploadImageToCloudinary } from "@/utils/cloudinary";
import Toast from "react-native-toast-message";
import * as ImagePicker from "expo-image-picker";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { API_URL } from "@/config/api";
import { useAuth } from "@/context/AuthContext";

export default function ModalValidarReceita({
  visible,
  onClose,
  postagemId,
}: {
  visible: boolean;
  onClose: () => void;
  postagemId: number;
}) {
  const [descricao, setDescricao] = useState("");
  const [imagens, setImagens] = useState<string[]>([]);
  const [aprovado, setAprovado] = useState<boolean | null>(null);

  const [postagem, setPostagem] = useState<any>(null);
  const [houveIncoerencia, setHouveIncoerencia] = useState<boolean | null>(
    null
  );
  const [ingredientesSelecionados, setIngredientesSelecionados] = useState<
    string[]
  >([]);
  const [justificativas, setJustificativas] = useState<{
    [key: string]: string;
  }>({});
  const [faltaInstrucao, setFaltaInstrucao] = useState(false);
  const [faltaIngrediente, setFaltaIngrediente] = useState(false);
  const ingredientes = Array.isArray(postagem?.ingredientes)
    ? postagem.ingredientes
    : JSON.parse(postagem?.ingredientes || "[]");

  const instrucoes = Array.isArray(postagem?.instrucoes)
    ? postagem.instrucoes
    : JSON.parse(postagem?.instrucoes || "[]");

  const categoria = Array.isArray(postagem?.categoria)
    ? postagem.categoria
    : JSON.parse(postagem?.categoria || "[]");
  const [hovered, setHovered] = useState(false);

  const { userToken } = useAuth();

  useEffect(() => {
    const carregarPostagem = async () => {
      try {
        const token = await AsyncStorage.getItem("@token");
        const response = await axios.get(
          `${API_URL}/usuario/postagens/${postagemId}`,
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );
        setPostagem(response.data);
      } catch (err) {
        console.error("Erro ao carregar a receita:", err);
      }
    };
    if (visible) carregarPostagem();
  }, [visible]);

  const handlePickImage = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      quality: 0.7,
      allowsMultipleSelection: true,
    });

    if (!result.canceled) {
      const uploaded = await uploadImageToCloudinary(result.assets[0].uri);
      if (uploaded) setImagens((prev) => [...prev, uploaded]);
    }
  };

  const handleSubmit = async () => {
    if (!descricao || imagens.length === 0 || aprovado === null) {
      return Toast.show({
        type: "error",
        text1: "Preencha todos os campos obrigatórios.",
      });
    }

    try {
      await axios.post(
        `${API_URL}/usuario/receitas/${postagemId}/selo-confianca`,
        {
          descricao_teste: descricao,
          evidencias_urls: imagens,
          aprovado,
          houve_incoerencia: houveIncoerencia,
          ingredientes_incoerentes: ingredientesSelecionados,
          justificativas,
          falta_instrucao: faltaInstrucao,
          falta_ingrediente: faltaIngrediente,
        },
        {
          headers: { Authorization: `Bearer ${userToken}` },
        }
      );

      Toast.show({
        type: "success",
        text1: "Selo enviado com sucesso!",
      });
      onClose();
    } catch (err: any) {
      Toast.show({
        type: "error",
        text1: "Erro ao enviar selo",
        text2: err.response?.data?.msg || "Tente novamente",
      });
    }
  };

  return (
    <Modal visible={visible} animationType="slide" transparent>
      <View style={styles.overlay}>
        <View style={styles.modal}>
          <Text style={styles.titulo}>🧪 Validação da Receita</Text>

          <ScrollView>
            <View style={styles.secao}>
              <Text style={styles.subtitulo}>🏷️ Dieta declarada:</Text>
              <View style={{ flexDirection: "row", flexWrap: "wrap", gap: 8 }}>
                {categoria.map((tag: string, index: number) => (
                  <View
                    key={index}
                    style={{
                      backgroundColor: "#E8F5E9",
                      paddingHorizontal: 10,
                      paddingVertical: 4,
                      borderRadius: 12,
                      marginBottom: 6,
                    }}
                  >
                    <Text
                      style={{
                        color: "#2E7D32",
                        fontWeight: "600",
                        fontSize: 12,
                      }}
                    >
                      {tag}
                    </Text>
                  </View>
                ))}
              </View>
            </View>

            <View style={styles.secao}>
              <Text style={styles.subtitulo}>🍴 Ingredientes utilizados:</Text>
              {ingredientes.map((item: any, idx: number) => (
                <Text key={idx}>
                  • {item.nome} ({item.quantidade} {item.medida})
                </Text>
              ))}
            </View>

            <View style={styles.secao}>
              <Text style={styles.subtitulo}>📋 Modo de Preparo:</Text>

              {Array.isArray(instrucoes) && instrucoes.length > 0 ? (
                Object.entries(
                  instrucoes.reduce((acc: any, curr: any) => {
                    if (!acc[curr.secao]) acc[curr.secao] = [];
                    acc[curr.secao].push(curr.texto);
                    return acc;
                  }, {})
                ).map(([secao, textos], idx) => {
                  if (!Array.isArray(textos)) return null;
                  return (
                    <View key={idx} style={{ marginBottom: 12 }}>
                      <Text style={{ fontWeight: "bold", marginBottom: 4 }}>
                        {secao}
                      </Text>
                      {textos.map((txt, i) => (
                        <Text key={i}>
                          {i + 1}. {txt}
                        </Text>
                      ))}
                    </View>
                  );
                })
              ) : (
                <Text style={{ fontStyle: "italic", color: "#888" }}>
                  Nenhuma instrução cadastrada.
                </Text>
              )}
            </View>

            <View style={styles.secao}>
              <Text style={styles.subtitulo}>
                ❓ Houve incoerência entre ingredientes e dieta?
              </Text>
              <View style={{ flexDirection: "row", gap: 16 }}>
                <Pressable onPress={() => setHouveIncoerencia(true)}>
                  <Text
                    style={{
                      color: houveIncoerencia === true ? "#2ECC71" : "#888",
                    }}
                  >
                    {houveIncoerencia === true ? "🟢" : "⚪"} Sim
                  </Text>
                </Pressable>
                <Pressable onPress={() => setHouveIncoerencia(false)}>
                  <Text
                    style={{
                      color: houveIncoerencia === false ? "#E74C3C" : "#888",
                    }}
                  >
                    {houveIncoerencia === false ? "🔴" : "⚪"} Não
                  </Text>
                </Pressable>
              </View>

              {houveIncoerencia &&
                ingredientes.map((ing: any, idx: number) => (
                  <View key={idx} style={{ marginTop: 8 }}>
                    <Pressable
                      onPress={() => {
                        setIngredientesSelecionados((prev) =>
                          prev.includes(ing.nome)
                            ? prev.filter((i) => i !== ing.nome)
                            : [...prev, ing.nome]
                        );
                      }}
                    >
                      <Text style={{ fontWeight: "bold" }}>
                        {ingredientesSelecionados.includes(ing.nome)
                          ? "☑️"
                          : "⬜️"}{" "}
                        {ing.nome}
                      </Text>
                    </Pressable>

                    {ingredientesSelecionados.includes(ing.nome) && (
                      <View>
                        <Text>Motivo:</Text>
                        {[
                          "Animal derivado",
                          "Contém glúten",
                          "Ultra processado",
                          "Outro",
                        ].map((motivo) => (
                          <Pressable
                            key={motivo}
                            onPress={() =>
                              setJustificativas((prev) => ({
                                ...prev,
                                [ing.nome]: motivo,
                              }))
                            }
                          >
                            <Text
                              style={{
                                backgroundColor:
                                  justificativas[ing.nome] === motivo
                                    ? "#ccc"
                                    : "#eee",
                                padding: 4,
                                marginTop: 4,
                              }}
                            >
                              {motivo}
                            </Text>
                          </Pressable>
                        ))}
                        {justificativas[ing.nome] === "Outro" && (
                          <TextInput
                            placeholder="Descreva brevemente..."
                            maxLength={200}
                            onChangeText={(text) =>
                              setJustificativas((prev) => ({
                                ...prev,
                                [ing.nome]: `Outro: ${text}`,
                              }))
                            }
                            style={styles.textArea}
                          />
                        )}
                      </View>
                    )}
                  </View>
                ))}
            </View>

            <View style={styles.secao}>
              <Text style={styles.subtitulo}>
                ❗Faltam instruções ou ingredientes?
              </Text>
              <Pressable onPress={() => setFaltaInstrucao(!faltaInstrucao)}>
                <Text>{faltaInstrucao ? "☑️" : "⬜️"} Instruções</Text>
              </Pressable>
              <Pressable onPress={() => setFaltaIngrediente(!faltaIngrediente)}>
                <Text>{faltaIngrediente ? "☑️" : "⬜️"} Ingredientes</Text>
              </Pressable>
            </View>

            <View style={styles.secao}>
              <TextInput
                multiline
                placeholder="Descreva como foi o teste..."
                value={descricao}
                onChangeText={setDescricao}
                style={styles.textArea}
              />
            </View>

            <Pressable style={styles.botaoSecundario} onPress={handlePickImage}>
              <Text style={styles.botaoSecundarioTexto}>
                📸 Adicionar Imagem
              </Text>
            </Pressable>

            <ScrollView horizontal>
              {imagens.map((url, idx) => (
                <Image key={idx} source={{ uri: url }} style={styles.preview} />
              ))}
            </ScrollView>

            <View style={styles.botoesLinha}>
              <Pressable
                onPress={() => setAprovado(true)}
                style={[
                  styles.toggleBotao,
                  aprovado === true && styles.toggleAtivoVerde,
                ]}
              >
                <Text style={styles.toggleTexto}>✅ Aprovar</Text>
              </Pressable>

              <Pressable
                onPress={() => setAprovado(false)}
                style={[
                  styles.toggleBotao,
                  aprovado === false && styles.toggleAtivoVermelho,
                ]}
              >
                <Text style={styles.toggleTexto}>❌ Reprovar</Text>
              </Pressable>
            </View>

            <Pressable
              onPress={handleSubmit}
              onHoverIn={() => setHovered(true)}
              onHoverOut={() => setHovered(false)}
              style={[
                styles.enviar,
                hovered && {
                  backgroundColor: "#28B463",
                  transform: [{ scale: 1.02 }],
                },
              ]}
            >
              <Text style={styles.enviarTexto}>🚀 Enviar Validação</Text>
            </Pressable>

            <Pressable onPress={onClose}>
              <Text style={styles.fechar}>Fechar</Text>
            </Pressable>
          </ScrollView>
        </View>
      </View>
    </Modal>
  );
}
