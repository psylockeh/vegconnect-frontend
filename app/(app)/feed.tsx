import {
  View,
  Text,
  FlatList,
  Pressable,
  TextInput,
  ScrollView,
  Image,
} from "react-native";
import { useRouter } from "expo-router";
import { useEffect, useState, useMemo } from "react";
import axios from "axios";
import feedStyles from "@/styles/FeedStyles";
import Sidebar from "@/components/Sidebar";
import ModalCriarPostagem from "@/components/ModalCriarPostagem";
import { API_URL } from "@/config/api";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useAuth } from "@/context/AuthContext";
import * as ImagePicker from "expo-image-picker";
import { MaterialIcons, FontAwesome } from "@expo/vector-icons";
import Toast from "react-native-toast-message";
import { uploadImageToCloudinary } from "@/utils/cloudinary";
import { enviarPostagem } from "@/services/postagemService";
import CardPostagem from "@/components/CardPostagem";
import { useContext } from "react";
import { AuthContext } from "@/context/AuthContext";
import { AuthContextProps } from "@/context/AuthContext";
import { useRef } from "react";
import InputRecado from "@/components/postagens/InputRecado";

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

const permissoesPorTipoUsuario: Record<string, string[]> = {
  Comum: ["recado", "receita", "evento"],
  Chef: ["recado", "receita", "evento"],
  Comerciante: ["recado", "receita", "evento", "estabelecimento", "promocao"],
};

export default function Feed() {
  const { usuario } = useContext(AuthContext) as AuthContextProps;
  const router = useRouter();
  const [postagens, setPostagens] = useState<Postagem[]>([]);
  const [mostrarModal, setMostrarModal] = useState(false);
  const [tpPost, setTpPost] = useState<string>("");
  const [recadoTexto, setRecadoTexto] = useState("");
  const [midiasSelecionadas, setMidiasSelecionadas] = useState<string[]>([]);
  const { perfilUsuario } = useAuth();
  const recadoTextoRef = useRef("");
  const [contador, setContador] = useState(0);

  const carregarPostagens = async () => {
    try {
      const token = await AsyncStorage.getItem("@token");
      if (!token || !usuario?.tp_user) return;

      const response = await axios.get(`${API_URL}/usuario/postagens`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      const permissoes = permissoesPorTipoUsuario[usuario.tp_user] || [];

      const postagensFiltradas = response.data.filter((post: any) =>
        permissoes.includes(post.tp_post)
      );

      setPostagens(postagensFiltradas);
    } catch (error) {
      console.error("Erro ao carregar postagens:", error);
    }
  };

  useEffect(() => {
    if (usuario?.tp_user) {
      carregarPostagens();
    }
  }, [usuario?.tp_user]);

  const abrirModal = (tipo: string) => {
    setTpPost(tipo.toLowerCase());
    setMostrarModal(true);
  };

  const getContadorColor = (qtd: number) => {
    if (qtd >= 500) return "#E74C3C";
    if (qtd >= 400) return "#F39C12";
    return "#888";
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

  const publicarRecado = async (texto: string) => {
    if (!texto.trim()) return;

    try {
      const midia_urls: string[] = [];
      for (const uri of midiasSelecionadas) {
        const url = await uploadImageToCloudinary(uri);
        if (url) midia_urls.push(url);
      }

      await enviarPostagem({
        tp_post: "recado",
        conteudo: texto.trim(),
        midia_urls,
      });

      Toast.show({ type: "success", text1: "Recado publicado!" });
      recadoTextoRef.current = "";
      setContador(0);
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
      <Sidebar onPostPress={() => {}} />

      <View style={feedStyles.mainContent}>
        <FlatList
          data={postagens}
          keyExtractor={(item) => item.id.toString()}
          ListHeaderComponent={
            <View style={feedStyles.cardCriarPost}>
              {/* Header do usuário */}
              <View style={feedStyles.headerUsuario}>
                {perfilUsuario?.foto_perfil ? (
                  <Image
                    source={{ uri: perfilUsuario.foto_perfil }}
                    style={feedStyles.avatar}
                  />
                ) : (
                  <View style={feedStyles.avatar}>
                    <Text
                      style={{ color: "#000", fontSize: 10, marginTop: 15 }}
                    >
                      Sem foto
                    </Text>
                  </View>
                )}

                <View>
                  <Text style={feedStyles.nomeUsuario}>
                    {perfilUsuario?.nome || "Usuário"}
                  </Text>
                  <Text style={feedStyles.tipoUsuario}>
                    <FontAwesome
                      name="leaf"
                      style={{
                        color: "#67b26f",
                        fontSize: 20,
                        marginRight: 8,
                      }}
                    />
                    {perfilUsuario?.tp_user || "Público"}
                  </Text>
                </View>
              </View>

              {/* Campo e botão de recado */}
              <InputRecado onSubmit={publicarRecado} />

              {/* Imagens selecionadas */}
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
                      <Pressable
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
                      </Pressable>
                    </View>
                  ))}
                </ScrollView>
              )}

              <Text style={feedStyles.ouLabel}>ou</Text>

              {/* Botões de tipo de postagem */}
              <View style={feedStyles.cardLinhaPostagem}>
                <View style={feedStyles.botoesTipoPostagem}>
                  {["Receita", "Evento", "Estabelecimento", "Promoção"]
                    .filter((tipo) => {
                      const tipoMin = tipo.toLowerCase();
                      const permissoes =
                        permissoesPorTipoUsuario[
                          usuario?.tp_user as keyof typeof permissoesPorTipoUsuario
                        ] || [];
                      return permissoes.includes(tipoMin);
                    })
                    .map((tipo: string) => (
                      <Pressable
                        key={tipo}
                        style={feedStyles.botaoTipo}
                        onPress={() => abrirModal(tipo)}
                      >
                        <Text style={feedStyles.textoBotaoTipo}>{tipo}</Text>
                      </Pressable>
                    ))}
                </View>

                <View style={feedStyles.iconesAcoes}>
                  <Pressable onPress={selecionarImagem}>
                    <MaterialIcons name="image" size={22} color="#3C6E47" />
                  </Pressable>
                  <Pressable>
                    <MaterialIcons name="group" size={22} color="#3C6E47" />
                  </Pressable>
                </View>
              </View>
            </View>
          }
          renderItem={({ item }) => (
            <Pressable onPress={() => router.push(`/postagem/${item.id}`)}>
              <CardPostagem postagem={item} />
            </Pressable>
          )}
          onEndReachedThreshold={0.2}
          onEndReached={carregarPostagens}
        />
      </View>

      <ModalCriarPostagem
        visivel={mostrarModal}
        fechar={() => setMostrarModal(false)}
        tp_post={tpPost}
        onPostagemCriada={carregarPostagens}
      />
    </View>
  );
}
