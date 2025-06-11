import React, { useState, useEffect } from "react";
import {
  View,
  TouchableOpacity,
  Text,
  Modal,
  TextInput,
  FlatList,
} from "react-native";
import axios from "axios";
import styles from "@/styles/FavoritoBotao";
import { FontAwesome } from "@expo/vector-icons";
import { API_URL } from "@/config/api";
import { useAuth } from "@/context/AuthContext";

interface FavoritoBotaoProps {
  postagemId: number;
  isFavoritadoInicial?: boolean;
}

interface ListaFavorito {
  id: number;
  nome: string;
}

const FavoritoBotao: React.FC<FavoritoBotaoProps> = ({
  postagemId,
  isFavoritadoInicial = false,
}) => {
  const { userToken } = useAuth();
  const [isFavoritado, setIsFavoritado] = useState(isFavoritadoInicial);
  const [listaIdFavoritada, setListaIdFavoritada] = useState<number | null>(null);
  const [modalVisible, setModalVisible] = useState(false);
  const [listas, setListas] = useState<ListaFavorito[]>([]);
  const [novaLista, setNovaLista] = useState("");
  const [loading, setLoading] = useState(false);

  // Função para retornar o header com token de autenticação
  const getAuthHeader = () => {
    if (!userToken) {
      console.warn("Token não disponível no contexto!");
      return {};
    }
    return { headers: { Authorization: `Bearer ${userToken}` } };
  };

  // Função para buscar se a postagem já está favoritada e em qual lista
  const fetchStatusFavorito = async () => {
    try {
      const config = getAuthHeader();
      const res = await axios.get(
        `${API_URL}/usuario/listas/status/${postagemId}`,
        config
      );
      setIsFavoritado(res.data.favoritado);
      setListaIdFavoritada(res.data.listaId);
    } catch (error) {
      console.error("Erro ao buscar status de favorito:", error);
      setIsFavoritado(false);
      setListaIdFavoritada(null);
    }
  };

  useEffect(() => {
    fetchStatusFavorito();
  }, [postagemId]);

  // Listar listas criadas
  const fetchListas = async () => {
    try {
      const config = getAuthHeader();
      const res = await axios.get(`${API_URL}/usuario/listas`, config);
      setListas(res.data);
    } catch (error) {
      console.error("Erro ao buscar listas:", error);
    }
  };

  // Favoritar uma postagem em uma lista
  const favoritar = async (listaId: number) => {
    try {
      const config = getAuthHeader();
      await axios.post(
        `${API_URL}/usuario/listas/${listaId}/postagens/${postagemId}`,
        { lista_id: listaId },
        config
      );
      setIsFavoritado(true);
      setListaIdFavoritada(listaId);
      setModalVisible(false);
    } catch (error: any) {
      console.error("Erro ao favoritar:", error.response || error);
      if (
        error.response?.data?.erro === "Postagem já favoritada." ||
        error.response?.data?.erro === "Já favoritada."
      ) {
        console.error("Aviso", "Esta postagem já está na lista.");
        setIsFavoritado(true);
        setListaIdFavoritada(listaId);
        setModalVisible(false);
      } else {
         console.error("Erro", "Erro ao favoritar.");
      }
    }
  };

  // Desfavoritar a postagem da lista em que foi favoritada
  const desfavoritar = async () => {
    if (!listaIdFavoritada) {
      console.warn("ID da lista não definido para desfavoritar.");
      return;
    }
    try {
      const config = getAuthHeader();
      await axios.delete(
        `${API_URL}/usuario/listas/${listaIdFavoritada}/postagens/${postagemId}`,
        config
      );
      setIsFavoritado(false);
      setListaIdFavoritada(null);
    } catch (error) {
      console.error("Erro ao desfavoritar:", error);
    }
  };

  // Criar nova lista e já favoritar nela
  const criarLista = async () => {
    if (!novaLista.trim()) return;
    setLoading(true);
    try {
      const config = getAuthHeader();
      const res = await axios.post(
        `${API_URL}/usuario/listas`,
        { nome: novaLista },
        config
      );
      await favoritar(res.data.id);
    } catch (error: any) {
      console.error("Erro ao criar lista:", error.response || error);
    } finally {
      setNovaLista("");
      setLoading(false);
    }
  };

  // Ao clicar no botão para favoritar, abre modal para escolher lista
  const handleFavoritar = () => {
    fetchListas();
    setModalVisible(true);
  };

  return (
    <View>
      <TouchableOpacity
        style={styles.botao}
        onPress={isFavoritado ? desfavoritar : handleFavoritar}
      >
        <FontAwesome
          name={isFavoritado ? "heart" : "heart-o"}
          size={24}
          color={isFavoritado ? "red" : "gray"}
        />
      </TouchableOpacity>

      <Modal visible={modalVisible} transparent animationType="slide">
        <View style={styles.sobrePosicao}>
          <View style={styles.containerModal}>
            <Text style={styles.titulo}>Adicionar à lista</Text>

            {/* Listas*/}
            <View style={[styles.formularioContainer, { maxHeight: 200 }]}>
              <FlatList
                data={listas}
                keyExtractor={(item) => item.id.toString()}
                renderItem={({ item }) => (
                  <TouchableOpacity
                    style={styles.itemLista}
                    onPress={() => favoritar(item.id)}
                  >
                    <Text style={styles.listaNome}>{item.nome}</Text>
                  </TouchableOpacity>
                )}
                ListEmptyComponent={
                  <Text style={styles.textoVazio}>Nenhuma lista encontrada.</Text>
                }
                showsVerticalScrollIndicator={false}
                contentContainerStyle={{ paddingBottom: 10 }}
              />
            </View>

            <TextInput
              placeholder="Nova lista"
              style={styles.input}
              value={novaLista}
              onChangeText={setNovaLista}
              editable={!loading}
            />

            <TouchableOpacity
              style={styles.criarBotao}
              onPress={criarLista}
              disabled={loading}
            >
              <Text style={styles.criarBotaoTexto}>
                Criar Lista e Adicionar Favorito
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              onPress={() => setModalVisible(false)}
              style={styles.cancelar}
            >
              <Text style={styles.cancelarTexto}>Cancelar</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  );
};

export default FavoritoBotao;
