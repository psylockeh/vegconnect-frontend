import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  FlatList,
  TextInput,
  TouchableOpacity,
  Alert,
  Modal,
} from "react-native";
import { useAuth } from "@/context/AuthContext";
import axios from "axios";
import styles from "@/styles/Favoritos";
import { API_URL } from "@/config/api";

interface ListaFavorito {
  id: number;
  nome: string;
}

interface Postagem {
  id: number;
  titulo: string;
  conteudo: string;
}

export default function AppFavorito() {
  const { userToken, usuario } = useAuth();
  const userId = usuario?.id_user;
  const [listas, setListas] = useState<ListaFavorito[]>([]);
  const [novaLista, setNovaLista] = useState("");
  const [loading, setLoading] = useState(false);
  const [postagens, setPostagens] = useState<Postagem[]>([]);
  const [modalVisible, setModalVisible] = useState(false);
  const [listaSelecionada, setListaSelecionada] = useState<ListaFavorito | null>(null);

  const listasValidas = Array.isArray(listas) ? listas : [];

  // Listar listas criadas
  const carregarListas = async () => {
    try {
      if (!userToken || !userId) {
        Alert.alert("Erro", "Usuário não autenticado");
        return;
      }

      const config = {
        headers: {
          Authorization: `Bearer ${userToken}`,
        },
      };

      const res = await axios.get(
        `${API_URL}/usuario/listas`, 
        config
      );
      setListas(res.data);
    } catch (error: any) {
      console.error("Erro ao carregar listas:", error);
      Alert.alert("Erro", error.message || "Erro ao buscar listas.");
    }
  };

  // Criar listas
  const criarNovaLista = async () => {
    if (!novaLista.trim()) return;

    try {
      setLoading(true);
      if (!userToken || !userId) {
        Alert.alert("Erro", "Usuário não autenticado");
        return;
      }
      const config = {
        headers: {
          Authorization: `Bearer ${userToken}`,
        },
      };

      await axios.post(
        `${API_URL}/usuario/listas`, 
        { nome: novaLista },
        config
      );

      setNovaLista("");
      await carregarListas();
      Alert.alert("Sucesso", "Lista criada com sucesso!");
    } catch (error: any) {
      console.error("Erro ao criar lista:", error);
      Alert.alert("Erro", error.message || "Erro ao criar lista.");
    } finally {
      setLoading(false);
    }
  };

  // Listar favoritos da lista selecionada
  const abrirLista = async (lista: ListaFavorito) => {
    try {
      if (!userToken || !userId) {
        Alert.alert("Erro", "Usuário não autenticado");
        return;
      }

      const config = {
        headers: {
          Authorization: `Bearer ${userToken}`,
        },
      };

      const res = await axios.get(
        `${API_URL}/usuario/listas/${lista.id}`, 
        config
      );

      setPostagens(res.data);
      setListaSelecionada(lista);
      setModalVisible(true);
    } catch (error: any) {
      console.error("Erro ao abrir lista:", error);
      Alert.alert("Erro", "Erro ao carregar postagens da lista.");
    }
  };

  // Carregar listas ao abrir o componente
  useEffect(() => {
    if (userId) {
      carregarListas();
    }
  }, [userToken, userId]);

  return (
    <View style={styles.container}>
      <Text style={styles.titulo}>Minhas Listas de Favoritos</Text>

      <FlatList
        data={listasValidas} 
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={styles.itemLista}
            onPress={() => abrirLista(item)}
          >
            <Text style={styles.listaNome}>{item.nome}</Text>
          </TouchableOpacity>
        )}
        ListEmptyComponent={
          <Text style={styles.textoVazio}>Nenhuma lista encontrada.</Text>
        }
      />

      <TextInput
        placeholder="Nome da nova lista"
        value={novaLista}
        onChangeText={setNovaLista}
        style={styles.input}
      />
      <TouchableOpacity
        style={styles.botaoCriar}
        onPress={criarNovaLista}
        disabled={loading || !novaLista.trim()}
      >
        <Text style={styles.botaoTexto}>
          {loading ? "Criando..." : "Criar Lista"}
        </Text>
      </TouchableOpacity>

      {/* Exibição dos favoritos da lista */}
      <Modal visible={modalVisible} animationType="slide">
        <View style={styles.containerModal}>
          <Text style={styles.tituloModal}>{listaSelecionada?.nome}</Text>

          <FlatList
            data={postagens} 
            keyExtractor={(item) => item.id.toString()}
            renderItem={({ item }) => (
              <View style={styles.itemLista}>
                <Text style={styles.listaNome}>{item.titulo}</Text>
                <Text >{item.conteudo}</Text>
              </View>
            )}
            ListEmptyComponent={
              <Text style={styles.textoVazio}>Nenhuma postagem encontrada.</Text>
            }
          />

          <TouchableOpacity
            style={styles.botaoFechar}
            onPress={() => setModalVisible(false)}
          >
            <Text style={styles.botaoTexto}>Fechar</Text>
          </TouchableOpacity>
        </View>
      </Modal>
    </View>
  );
}
