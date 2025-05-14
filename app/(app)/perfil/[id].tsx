import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  ScrollView,
  Image,
  ActivityIndicator,
  TouchableOpacity,
} from "react-native";
import { useRouter, useLocalSearchParams } from "expo-router";
import axios from "axios";
import { API_URL } from "@/config/api";
import Sidebar from "@/components/Sidebar";
import { FontAwesome, MaterialIcons } from "@expo/vector-icons";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { styles } from "@/styles/PerfilStyles";

export default function PerfilUsuario() {
  const router = useRouter();
  const { id } = useLocalSearchParams(); // Pegar ID do usuário da URL
  const [usuario, setUsuario] = useState<any>(null);
  const [carregando, setCarregando] = useState(true);
  const [erroImagem, setErroImagem] = useState(false);
  const [showInfo, setShowInfo] = useState(false);
  const [usuarioAutenticadoId, setUsuarioAutenticadoId] = useState<
    string | null
  >(null);
  // const [abaSelecionada, setAbaSelecionada] = useState("postagens"); // 'postagens' ou 'favoritos'
  const [filtroSelecionado, setFiltroSelecionado] = useState("recado");

  const carregarPerfil = async () => {
    try {
      const token = await AsyncStorage.getItem("@token");

      const idUsuarioLogado = await AsyncStorage.getItem("@usuario_id"); // recuperar id
      setUsuarioAutenticadoId(idUsuarioLogado);

      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };
      const response = await axios.get(
        `${API_URL}/usuario/perfil/${id}`,
        config
      );
      setUsuario(response.data);
    } catch (error) {
      console.error("Erro ao carregar perfil do usuário:", error);
    } finally {
      setCarregando(false);
    }
  };

  useEffect(() => {
    if (id) {
      carregarPerfil();
    }
  }, [id]);

  const toggleInfo = () => {
    setShowInfo(!showInfo);
  };

  if (carregando) {
    return (
      <ActivityIndicator
        size="large"
        color="#3C6E47"
        style={{ marginTop: 100 }}
      />
    );
  }

  if (!usuario) {
    return (
      <Text style={{ marginTop: 100, textAlign: "center", color: "#D32F2F" }}>
        Perfil não encontrado.
      </Text>
    );
  }

  const fotoPerfilUrl = usuario?.foto_perfil?.startsWith("http")
    ? usuario.foto_perfil
    : null;

  return (
    <View style={styles.container}>
      <Sidebar onPostPress={() => {}} />
      <View style={styles.mainContent}>
        <ScrollView showsVerticalScrollIndicator={false}>
          <View style={styles.cardPerfil}>
            <View style={styles.headerUsuario}>
              {fotoPerfilUrl && !erroImagem ? (
                <Image
                  source={{ uri: fotoPerfilUrl }}
                  style={styles.avatar}
                  onError={() => setErroImagem(true)}
                />
              ) : (
                <Image
                  source={{
                    uri: usuario.foto_perfil?.startsWith("http")
                      ? usuario.foto_perfil
                      : "https://res.cloudinary.com/dyhzz5baz/image/upload/v1746917561/default-avatar_jvqpsg.png",
                  }}
                  style={styles.avatar}
                />
              )}

              <View>
                <Text style={styles.nomeUsuario}>
                  {usuario?.nome || "Usuário"}
                </Text>
                <Text style={styles.nickname}>
                  @{usuario?.nickname || "usuário"}
                </Text>
                <Text style={styles.tpUser}>
                  <FontAwesome
                    name="leaf"
                    style={{ color: "#67b26f", fontSize: 20, marginRight: 8 }}
                  />
                  {usuario?.tp_user || "Público"}
                </Text>

                {/* Botão de alternância para exibir as informações de comércio */}
                {usuario?.tp_user === "Comerciante" && (
                  <TouchableOpacity onPress={toggleInfo}>
                    <View style={styles.infoContainer}>
                      <MaterialIcons
                        name={
                          showInfo ? "keyboard-arrow-up" : "keyboard-arrow-down"
                        }
                        style={styles.iconInfoCom}
                      />
                      <Text style={styles.info}>
                        Exibir Informações do Comércio
                      </Text>
                    </View>
                  </TouchableOpacity>
                )}

                {usuario?.tp_user === "Chef" && (
                  <>
                    <Text style={styles.info}>
                      Especialidade: {usuario?.especialidade}
                    </Text>
                    <Text style={styles.info}>
                      Certificações: {usuario?.certificacoes}
                    </Text>
                  </>
                )}

                {usuario?.tp_user === "Comum" && (
                  <Text style={styles.info}>
                    Preferência alimentar: {usuario?.pref_alim}
                  </Text>
                )}
              </View>
            </View>

            {/* Exibir as informações de comércio fora do headerUsuario */}
            {showInfo && usuario?.tp_user === "Comerciante" && (
              <View style={styles.contInfoComercio}>
                <Text style={styles.infoComer}>
                  Nome do Comércio: {usuario?.nome_com}
                </Text>
                <Text style={styles.infoComer}>
                  Tipo do Comércio: {usuario?.tipo_com}
                </Text>
                <Text style={styles.infoComer}>
                  Telefone: {usuario?.tel_com}
                </Text>
                <Text style={styles.infoComer}>
                  Tipo de Produto: {usuario?.tipo_prod}
                </Text>
                <Text style={styles.infoComer}>
                  Endereço do Comércio: {usuario?.ender_com}
                </Text>
                <Text style={styles.infoComer}>CEP: {usuario?.cep_com}</Text>
                <Text style={styles.infoComer}>CNPJ: {usuario?.cnpj}</Text>
              </View>
            )}

            {typeof usuario?.bio === "string" &&
              usuario.bio.trim().length > 0 && (
                <Text style={styles.bio}>{usuario.bio}</Text>
              )}

            {/* Botão de editar perfil */}
            {/* {usuarioAutenticadoId === String(id) && ( */}
            <TouchableOpacity
              onPress={() => router.push("/editar-perfil")}
              style={styles.botaoAlterarPerfil}
            >
              <Text style={styles.textoBotaoAlterar}>Editar Perfil</Text>
            </TouchableOpacity>
            {/* )} */}

            {/* Mural do usuario */}
            <View style={styles.postagensFavoritosContainer}>
              {[
                "recado",
                "receita",
                "estabelecimento",
                "evento",
                "promoção",
              ].map((item) => (
                <TouchableOpacity
                  key={item}
                  onPress={() => setFiltroSelecionado(item)}
                  style={[
                    styles.posteOpRow,
                    filtroSelecionado === item && styles.posteOpSelecionadoRow,
                  ]}
                >
                  <MaterialIcons
                    name={
                      item === "recado"
                        ? "message"
                        : item === "receita"
                          ? "restaurant-menu"
                          : item === "estabelecimento"
                            ? "store"
                            : item === "evento"
                              ? "event"
                              : "local-offer"
                    }
                    size={20}
                    color={filtroSelecionado === item ? "#fff" : "#3C6E47"}
                  />
                  <Text
                    style={[
                      styles.posteOpTexto,
                      filtroSelecionado === item && { color: "#fff" },
                    ]}
                  >
                    {item.charAt(0).toUpperCase() + item.slice(1)}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>
          </View>
        </ScrollView>
      </View>
    </View>
  );
}
