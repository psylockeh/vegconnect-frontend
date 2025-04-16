import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  TextInput,
  ScrollView,
} from "react-native";
import { useRouter } from "expo-router";
import { useEffect, useState } from "react";
import axios from "axios";
import feedStyles from "@/styles/FeedStyles";
import Sidebar from "@/components/Sidebar";
import ModalCriarPostagem from "@/components/ModalCriarPostagem";
import { API_URL } from "@/config/api";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useAuth } from "@/context/AuthContext";
import * as ImagePicker from "expo-image-picker";
import { MaterialIcons } from "@expo/vector-icons";

type Postagem = {
  autor: { nome: string };
  tp_post: string;
  createdAt: string;
  id: number;
  titulo: string;
  conteudo: string;
};

export default function Feed() {
  const router = useRouter();
  const [postagens, setPostagens] = useState<Postagem[]>([]);
  const [mostrarModal, setMostrarModal] = useState(false);
  const [tpPost, setTpPost] = useState<string>("");

  const { perfilUsuario } = useAuth();

  async function carregarPostagens() {
    try {
      const token = await AsyncStorage.getItem("@token");

      if (!token) {
        console.error("🔒 Token ausente.");
        return;
      }

      const response = await axios.get(`${API_URL}/usuario/postagens`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setPostagens(response.data);
    } catch (error) {
      console.error("Erro ao carregar postagens:", error);
    }
  }

  const abrirModal = (tipo: string) => {
    setTpPost(tipo.toLowerCase());
    setMostrarModal(true);
  };

  const selecionarImagem = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsMultipleSelection: false,
    });

    if (!result.canceled) {
      alert("📷 Imagem selecionada com sucesso!");
    }
  };

  return (
    <View style={feedStyles.container}>
      <Sidebar onPostPress={() => {}} />

      <View style={feedStyles.mainContent}>
        <ScrollView showsVerticalScrollIndicator={false}>
          {/* Card sempre visível */}
          <View style={feedStyles.cardCriarPost}>
            <View style={feedStyles.headerUsuario}>
              <View style={feedStyles.avatar} />
              <View>
                <Text style={feedStyles.nomeUsuario}>Kamala da Silva</Text>
                <Text style={feedStyles.tipoUsuario}>Público</Text>
              </View>
            </View>

            <TextInput
              placeholder="Sobre o que você quer falar?"
              placeholderTextColor="#888"
              style={feedStyles.inputPost}
            />

            <Text style={feedStyles.ouLabel}>ou</Text>

            <View style={feedStyles.cardLinhaPostagem}>
              <View style={feedStyles.botoesTipoPostagem}>
                {["Receita", "Evento", "Estabelecimento", "Promoção"].map(
                  (tipo) => (
                    <TouchableOpacity
                      key={tipo}
                      style={feedStyles.botaoTipo}
                      onPress={() => abrirModal(tipo)}
                    >
                      <Text style={feedStyles.textoBotaoTipo}>{tipo}</Text>
                    </TouchableOpacity>
                  )
                )}
              </View>

              <View style={feedStyles.iconesAcoes}>
                <TouchableOpacity onPress={selecionarImagem}>
                  <MaterialIcons name="image" size={22} color="#3C6E47" />
                </TouchableOpacity>
                <TouchableOpacity>
                  <MaterialIcons name="group" size={22} color="#3C6E47" />
                </TouchableOpacity>
              </View>
            </View>

            <TouchableOpacity
              onPress={() => abrirModal("receita")} // ou abrir um menu de escolha
              style={feedStyles.botaoPublicar}
            >
              <Text style={feedStyles.textoBotaoPublicar}>Publicar</Text>
            </TouchableOpacity>
          </View>

          {/* Lista de postagens */}
          <FlatList
            data={postagens}
            keyExtractor={(item) => item.id.toString()}
            scrollEnabled={false}
            renderItem={({ item }) => (
              <TouchableOpacity
                onPress={() => router.push(`/postagem/${item.id}`)}
              >
                <View style={feedStyles.cardPost}>
                  <Text style={feedStyles.titulo}>{item.titulo}</Text>
                  <Text style={feedStyles.tipoLabel}>
                    {item.tp_post.charAt(0).toUpperCase() +
                      item.tp_post.slice(1)}
                  </Text>
                  <Text style={feedStyles.conteudo}>{item.conteudo}</Text>
                  <View style={feedStyles.rodapePost}>
                    <Text style={feedStyles.autor}>{item.autor?.nome}</Text>
                    <Text style={feedStyles.data}>
                      {new Date(item.createdAt).toLocaleDateString("pt-BR")}
                    </Text>
                  </View>
                </View>
              </TouchableOpacity>
            )}
          />
        </ScrollView>
      </View>

      {/* Modal */}
      <ModalCriarPostagem
        visivel={mostrarModal}
        tp_post={tpPost}
        fechar={() => {
          setMostrarModal(false);
          setTpPost("");
        }}
      />
    </View>
  );
}
