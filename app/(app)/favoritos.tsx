import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  FlatList,
  TextInput,
  TouchableOpacity,
  Alert,
  Modal,
  ActivityIndicator,
} from "react-native";
import { useAuth } from "@/context/AuthContext";
import axios from "axios";
import styles from "@/styles/Favoritos";
import { API_URL } from "@/config/api";
import CardPostagem from "@/components/CardPostagem";
import { MaterialIcons } from "@expo/vector-icons";
import Sidebar from "@/components/Sidebar";

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
  const [loadingPostagens, setLoadingPostagens] = useState(false);
  const [opcoesVisiveis, setOpcoesVisiveis] = useState(false);
  const [listaOpcoes, setListaOpcoes] = useState<ListaFavorito | null>(null);
  const [novoNomeLista, setNovoNomeLista] = useState("");

  const listasValidas = Array.isArray(listas) ? listas : [];

  const getAuthConfig = () => ({
    headers: {
      Authorization: `Bearer ${userToken}`,
    },
  });

  // Carrega as listas de favoritos do usuário
  const carregarListas = async () => {
    try {
      if (!userToken || !userId) {
        Alert.alert("Erro", "Usuário não autenticado");
        return;
      }

      const res = await axios.get(`${API_URL}/usuario/listas`, getAuthConfig());
      setListas(res.data);
    } catch (error: any) {
      const msg = error.response?.data?.message || error.message || "Erro ao buscar listas.";
      Alert.alert("Erro", msg);
    }
  };

  // Cria nova lista
  const criarNovaLista = async () => {
    if (!novaLista.trim()) return;

    try {
      setLoading(true);
      if (!userToken || !userId) {
        Alert.alert("Erro", "Usuário não autenticado");
        return;
      }

      await axios.post(`${API_URL}/usuario/listas`, { nome: novaLista }, getAuthConfig());

      setNovaLista("");
      await carregarListas();
      Alert.alert("Sucesso", "Lista criada com sucesso!");
    } catch (error: any) {
      const msg = error.response?.data?.message || error.message || "Erro ao criar lista.";
      Alert.alert("Erro", msg);
    } finally {
      setLoading(false);
    }
  };

  // Listar as postagens favoritadas de uma lista
  const abrirLista = async (lista: ListaFavorito) => {
    try {
      setLoadingPostagens(true);

      if (!userToken || !userId) {
        Alert.alert("Erro", "Usuário não autenticado");
        return;
      }

      const res = await axios.get(`${API_URL}/usuario/listas/${lista.id}`, getAuthConfig());

      setPostagens(res.data);
      setListaSelecionada(lista);
      setModalVisible(true);
    } catch (error: any) {
      const msg = error.response?.data?.message || error.message || "Erro ao carregar postagens.";
      Alert.alert("Erro", msg);
    } finally {
      setLoadingPostagens(false);
    }
  };

  // Atualiza o nome da lista
  const atualizarNomeLista = async () => {
    if (!listaOpcoes || !novoNomeLista.trim()) return;
    try {
      await axios.put(
        `${API_URL}/usuario/listas/${listaOpcoes.id}`,
        {
          novo_nome: novoNomeLista,
        },
        getAuthConfig()

      );
      Alert.alert("Sucesso", "Nome da lista atualizado.");
      setOpcoesVisiveis(false);
      carregarListas();
    } catch (error: any) {
      Alert.alert("Erro", "Erro ao atualizar nome da lista.");
    }
  };

  // Exclui uma lista
  const excluirLista = async () => {
    if (!listaOpcoes) return;
    try {
      await axios.delete(`${API_URL}/usuario/listas/${listaOpcoes.id}`, getAuthConfig());
      Alert.alert("Sucesso", "Lista excluída.");
      setOpcoesVisiveis(false);
      carregarListas();
    } catch (error: any) {
      Alert.alert("Erro", "Erro ao excluir lista.");
    }
  };

  useEffect(() => {
    if (userId) {
      carregarListas();
    }
  }, [userToken, userId]);

  return (
    <View style={styles.container}>
      <Sidebar onPostPress={() => { }} />
      <View style={styles.mainContent}>

        <Text style={styles.titulo}>Minhas Listas de Favoritos</Text>
        {/* Lista criadas */}
        <FlatList
          data={listasValidas}
          keyExtractor={(item) => item.id.toString()}
          renderItem={({ item }) => (
            <View style={styles.itemLista}>
              <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
                <Text style={{ fontSize: 12, color: "#888", }}>ID: {item.id}</Text>
                <TouchableOpacity
                  onPress={() => {
                    setListaOpcoes(item);
                    setNovoNomeLista(item.nome);
                    setOpcoesVisiveis(true);
                  }}
                >
                  <MaterialIcons name="more-vert" size={24} color="#000" />
                </TouchableOpacity>
              </View>

              <TouchableOpacity
                onPress={() => abrirLista(item)}
                accessibilityLabel={`Abrir lista ${item.nome}`}
                testID={`botao-lista-${item.id}`}
              >
                <Text style={styles.listaNome}>{item.nome}</Text>
              </TouchableOpacity>

              <Text style={{ fontSize: 12, color: "#888", marginTop: 5 }}>
                Criada em: {new Date().toLocaleDateString("pt-BR")}
              </Text>
            </View>
          )}
          showsVerticalScrollIndicator={false}

          ListEmptyComponent={
            <Text style={styles.textoVazio}>📌 Nenhuma lista encontrada.</Text>
          }
        />

        <TextInput
          placeholder="Nome da nova lista"
          value={novaLista}
          onChangeText={setNovaLista}
          style={styles.input}
          accessibilityLabel="Campo para nome da nova lista"
        />
        <TouchableOpacity
          style={styles.botaoCriarSalvar}
          onPress={criarNovaLista}
          disabled={loading || !novaLista.trim()}
          accessibilityLabel="Botão criar nova lista"
          testID="botao-criar-lista"
        >
          <Text style={styles.botaoTexto}>
            {loading ? "Criando..." : "Criar Lista"}
          </Text>
        </TouchableOpacity>

        {/* Modal de Postagens da Lista */}
        <Modal visible={modalVisible} animationType="slide">
          <View style={styles.containerModal}>
            <Text style={styles.tituloModal}>{listaSelecionada?.nome}</Text>

            {loadingPostagens ? (
              <ActivityIndicator />
            ) : (
              <FlatList
                data={postagens}
                keyExtractor={(item) => item.id.toString()}
                renderItem={({ item }) => <CardPostagem postagem={item} />}
                showsVerticalScrollIndicator={false}
                ListEmptyComponent={
                  <Text style={styles.textoVazio}>📌 Nenhuma postagem encontrada.</Text>
                }
              />
            )}

            <TouchableOpacity
              style={styles.botaoFecharExcluir}
              onPress={() => setModalVisible(false)}
              accessibilityLabel="Fechar modal"
            >
              <Text style={styles.botaoTexto}>Fechar</Text>
            </TouchableOpacity>
          </View>
        </Modal>

        {/* Modal de Opções (Alterar/Excluir) */}
        <Modal visible={opcoesVisiveis} transparent animationType="slide">
          <View style={styles.alterarExcluir}>
            <View style={styles.modalAlterarExcluir}>
              <Text style={styles.tituloModal}>Editar Lista</Text>
              <TextInput
                value={novoNomeLista}
                onChangeText={setNovoNomeLista}
                style={styles.input}
                placeholder="Novo nome da lista"
              />
              <TouchableOpacity style={styles.botaoCriarSalvar} onPress={atualizarNomeLista}>
                <Text style={styles.botaoTexto}>Salvar</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.botaoFecharExcluir} onPress={excluirLista}>
                <Text style={styles.botaoTexto}>Excluir Lista</Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={() => setOpcoesVisiveis(false)}>
                <Text style={styles.cancelarTexto}>Cancelar</Text>
              </TouchableOpacity>
            </View>
          </View>
        </Modal>
      </View>
    </View>
  );
}
