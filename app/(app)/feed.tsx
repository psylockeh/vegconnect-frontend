import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  TextInput,
  ScrollView,
  Image,
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
import Toast from "react-native-toast-message";
import { uploadImageToCloudinary } from "@/utils/cloudinary";
import { enviarPostagem } from "@/services/postagemService";

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
  const [recadoTexto, setRecadoTexto] = useState("");
  const [midiasSelecionadas, setMidiasSelecionadas] = useState<string[]>([]);
  // força logout - temporario
  const { logout } = useAuth();

  const { perfilUsuario } = useAuth();

  async function carregarPostagens() {
    try {
      const token = await AsyncStorage.getItem("@token");
      if (!token) return;

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

  useEffect(() => {
    carregarPostagens();
  }, []);

  const abrirModal = (tipo: string) => {
    setTpPost(tipo.toLowerCase());
    setMostrarModal(true);
  };

  const selecionarImagem = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsMultipleSelection: true,
      quality: 0.7,
    });

    if (!result.canceled) {
      const uris = result.assets.map((a) => a.uri);
      setMidiasSelecionadas((prev) => [...prev, ...uris]);
    }
  };
  const removerImagem = (uri: string) => {
    setMidiasSelecionadas((prev: string[]) => prev.filter((m) => m !== uri));
  };

  const publicarRecado = async () => {
    if (!recadoTexto.trim()) return;

    try {
      const midia_urls: string[] = [];
      for (const uri of midiasSelecionadas) {
        const url = await uploadImageToCloudinary(uri);
        if (url) midia_urls.push(url);
      }

      const dados = {
        tp_post: "recado",
        conteudo: recadoTexto.trim(),
        midia_urls,
      };

      await enviarPostagem(dados);
      Toast.show({
        type: "success",
        text1: "Recado publicado!",
      });

      setRecadoTexto("");
      setMidiasSelecionadas([]);
      carregarPostagens();
    } catch (err: any) {
      Toast.show({
        type: "error",
        text1: "Erro ao publicar recado",
        text2: err.message || "Tente novamente.",
      });
    }

    try {
      const token = await AsyncStorage.getItem("@token");
      if (!token) return;

      const midia_urls: string[] = [];

      for (const uri of midiasSelecionadas) {
        const uploaded = await uploadImageToCloudinary(uri);
        if (uploaded) midia_urls.push(uploaded);
      }

      const response = await axios.post(
        `${API_URL}/usuario/postagens`,
        {
          tp_post: "recado",
          conteudo: recadoTexto,
          midia_urls,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      Toast.show({
        type: "success",
        text1: "Recado publicado!",
        text2: "Sua mensagem foi enviada com sucesso.",
      });

      setRecadoTexto("");
      setMidiasSelecionadas([]);
      carregarPostagens();
    } catch (err) {
      Toast.show({
        type: "error",
        text1: "Erro ao publicar",
        text2: "Verifique sua conexão ou tente novamente.",
      });
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
              value={recadoTexto}
              onChangeText={setRecadoTexto}
              multiline
            />
            <TouchableOpacity
              onPress={async () => {
                await logout();
                router.replace("/login"); // ou "/(auth)/login" conforme seu roteamento
              }}
              style={{
                padding: 10,
                backgroundColor: "#D33",
                borderRadius: 8,
                alignSelf: "flex-end",
                margin: 10,
              }}
            >
              <Text style={{ color: "white", fontWeight: "bold" }}>Sair</Text>
            </TouchableOpacity>
            {midiasSelecionadas.length > 0 && (
              <ScrollView horizontal style={{ marginTop: 10 }}>
                {midiasSelecionadas.map((uri, index) => (
                  <View
                    key={index}
                    style={{ position: "relative", marginRight: 8 }}
                  >
                    <Image
                      source={{ uri }}
                      style={{ width: 90, height: 90, borderRadius: 8 }}
                    />
                    <TouchableOpacity
                      onPress={() => removerImagem(uri)}
                      style={{
                        position: "absolute",
                        top: -6,
                        right: -6,
                        backgroundColor: "#f32",
                        width: 20,
                        height: 20,
                        borderRadius: 10,
                        justifyContent: "center",
                        alignItems: "center",
                      }}
                    >
                      <Text style={{ color: "#fff", fontSize: 12 }}>X</Text>
                    </TouchableOpacity>
                  </View>
                ))}
              </ScrollView>
            )}

            <Text style={feedStyles.ouLabel}>ou</Text>

            <View style={feedStyles.cardLinhaPostagem}>
              <View style={feedStyles.botoesTipoPostagem}>
                {["Receita", "Evento", "Estabelecimento", "Promoção"].map(
                  (tipo: string) => (
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
              onPress={publicarRecado}
              disabled={!recadoTexto.trim()}
              style={[
                feedStyles.botaoPublicar,
                { backgroundColor: recadoTexto.trim() ? "#3C6E47" : "#ccc" },
              ]}
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

      {/* Modal para outros tipos de postagem */}
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
