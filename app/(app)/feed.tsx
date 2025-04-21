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
import CardPostagem from "@/components/CardPostagem"; // ✅ novo import

type Postagem = {
  id: number;
  tp_post: string;
  titulo?: string;
  conteudo?: string;
  createdAt: string;
  autor: {
    nome: string;
    nickname?: string;
    foto_perfil?: string;
  };
};

export default function Feed() {
  const router = useRouter();
  const [postagens, setPostagens] = useState<Postagem[]>([]);
  const [mostrarModal, setMostrarModal] = useState(false);
  const [tpPost, setTpPost] = useState<string>("");
  const [recadoTexto, setRecadoTexto] = useState("");
  const [midiasSelecionadas, setMidiasSelecionadas] = useState<string[]>([]);
  const { logout, perfilUsuario } = useAuth();

  const carregarPostagens = async () => {
    try {
      const token = await AsyncStorage.getItem("@token");
      if (!token) return;

      const response = await axios.get(`${API_URL}/usuario/postagens`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      setPostagens(response.data);
    } catch (error) {
      console.error("Erro ao carregar postagens:", error);
    }
  };

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
    setMidiasSelecionadas((prev) => prev.filter((m) => m !== uri));
  };

  const publicarRecado = async () => {
    if (!recadoTexto.trim()) return;

    try {
      const midia_urls: string[] = [];
      for (const uri of midiasSelecionadas) {
        const url = await uploadImageToCloudinary(uri);
        if (url) midia_urls.push(url);
      }

      await enviarPostagem({
        tp_post: "recado",
        conteudo: recadoTexto.trim(),
        midia_urls,
      });

      Toast.show({ type: "success", text1: "Recado publicado!" });
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
  };
  console.log("📷 URL da foto:", perfilUsuario?.foto_perfil);

  return (
    <View style={feedStyles.container}>
      <Sidebar onPostPress={() => { }} />

      <View style={feedStyles.mainContent}>
        
        <ScrollView showsVerticalScrollIndicator={false}>
          {/* Card de criação de recado */}
          <View style={feedStyles.cardCriarPost}>
            <View style={feedStyles.headerUsuario}>
              {perfilUsuario?.foto_perfil ? (
                <Image
                  source={{ uri: perfilUsuario.foto_perfil }}
                  style={feedStyles.avatar}
                />
              ) : (
                <View style={feedStyles.avatar}>
                  <Text style={{ color: "#black", fontSize: 10, textAlign:"auto", marginTop: 15, paddingLeft: 5}}>Sem foto</Text>
                </View>
              )}

              <View>
                <Text style={feedStyles.nomeUsuario}>
                  {perfilUsuario?.nome || "Usuário"}
                </Text>
                <Text style={feedStyles.tipoUsuario}>
                  {perfilUsuario?.tp_user || "Público"}
                </Text>
              </View>

              {/* Botão Sair */}
              <View style={{ flex: 1,  justifyContent: "center", alignItems: "flex-end", padding: 8 }}>
                <TouchableOpacity
                  onPress={logout}
                  style={{
                    backgroundColor: "#D33",
                    paddingHorizontal: 12,
                    paddingVertical: 6,
                    borderRadius: 6,
                  }}
                >
                  <Text style={{ color: "#fff", fontWeight: "bold" }}>Sair</Text>
                </TouchableOpacity>
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
              <Text style={feedStyles.ouLabel}> </Text>
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
            scrollEnabled={true}
            renderItem={({ item }) => (
              <TouchableOpacity
                onPress={() => router.push(`/postagem/${item.id}`)}
              >
                <CardPostagem postagem={item} />
              </TouchableOpacity>
            )}
          />
        </ScrollView>
      </View>

      {/* Modal para outras postagens */}
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
