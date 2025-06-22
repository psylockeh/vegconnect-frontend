import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  ScrollView,
  Image,
  ActivityIndicator,
  Pressable,
} from "react-native";
import { useRouter, useLocalSearchParams } from "expo-router";
import axios from "axios";
import { API_URL } from "@/config/api";
import Sidebar from "@/components/Sidebar";
import { FontAwesome, MaterialIcons } from "@expo/vector-icons";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { styles } from "@/styles/PerfilStyles";
import { AuthContext } from "@/context/AuthContext";
import { useContext } from "react";
import GerenciamentoMural from "@/components/acoesPostagem/PostagemPerfil";

export default function PerfilUsuario() {
  const router = useRouter();
  const { id } = useLocalSearchParams();
  const [usuario, setUsuario] = useState<any>(null);
  const [carregando, setCarregando] = useState(true);
  const [erroImagem, setErroImagem] = useState(false);
  const [showInfo, setShowInfo] = useState(false);
  const [filtroSelecionado, setFiltroSelecionado] = useState("receita");
  const { usuario: usuarioLogado } = useContext(AuthContext);

  const carregarPerfil = async () => {
    try {
      const token = await AsyncStorage.getItem("@token");

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
    carregarPerfil();
  }, []);

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
            {/* Seção: Cabeçalho do perfil */}
            <View style={styles.headerUsuario}>
              <Image
                source={{
                  uri:
                    fotoPerfilUrl && !erroImagem
                      ? fotoPerfilUrl
                      : "https://res.cloudinary.com/dyhzz5baz/image/upload/v1746917561/default-avatar_jvqpsg.png",
                }}
                style={styles.avatar}
                onError={() => setErroImagem(true)}
              />
              <View>
                <Text style={styles.nomeUsuario}>
                  {usuario?.nome || "Usuário"}
                </Text>
                <Text style={styles.nickname}>@{usuario?.nickname}</Text>
                <Text style={styles.tpUser}>
                  <FontAwesome name="leaf" style={styles.iconeUser} />
                  {usuario?.tp_user || "Público"}
                </Text>
              </View>
            </View>

            {/* Seção: Detalhes do perfil */}
            <View style={styles.secao}>
              <Text style={styles.tituloSecao}>Informações</Text>

              {usuario?.tp_user === "Chef" && (
                <>
                  <Text style={styles.itemInfo}>
                    <Text style={styles.labelInfo}>Especialidade: </Text>
                    {usuario?.especialidade}
                  </Text>
                  <Text style={styles.itemInfo}>
                    <Text style={styles.labelInfo}>Certificações: </Text>
                    {usuario?.certificacoes}
                  </Text>
                </>
              )}

              {usuario?.tp_user === "Comum" && (
                <Text style={styles.itemInfo}>
                  <Text style={styles.labelInfo}>Preferência alimentar: </Text>
                  {usuario?.pref_alim}
                </Text>
              )}

              {usuario?.tp_user === "Comerciante" && (
                <>
                  <Pressable
                    onPress={toggleInfo}
                    style={styles.botaoToggleInfo}
                  >
                    <MaterialIcons
                      name={showInfo ? "expand-less" : "expand-more"}
                      size={20}
                      color="#3C6E47"
                    />
                    <Text style={styles.textoToggleInfo}>
                      Informações do Comércio
                    </Text>
                  </Pressable>
                  {showInfo && (
                    <View style={styles.cardInfoComercio}>
                      <Text style={styles.itemInfo}>
                        <Text style={styles.labelInfo}>Nome do Comércio: </Text>
                        {usuario?.nome_com}
                      </Text>
                      <Text style={styles.itemInfo}>
                        <Text style={styles.labelInfo}>Tipo: </Text>
                        {usuario?.tipo_com}
                      </Text>
                      <Text style={styles.itemInfo}>
                        <Text style={styles.labelInfo}>Telefone: </Text>
                        {usuario?.tel_com}
                      </Text>
                      <Text style={styles.itemInfo}>
                        <Text style={styles.labelInfo}>Endereço: </Text>
                        {usuario?.ender_com}
                      </Text>
                      <Text style={styles.itemInfo}>
                        <Text style={styles.labelInfo}>CEP: </Text>
                        {usuario?.cep_com}
                      </Text>
                      <Text style={styles.itemInfo}>
                        <Text style={styles.labelInfo}>CNPJ: </Text>
                        {usuario?.cnpj}
                      </Text>
                    </View>
                  )}
                </>
              )}
            </View>

            {/* Seção: Biografia */}
            {typeof usuario?.bio === "string" &&
              usuario.bio.trim().length > 0 && (
                <View style={styles.secao}>
                  <Text style={styles.tituloSecao}>Biografia</Text>
                  <View style={styles.caixaBio}>
                    <Text style={styles.textoBio}>{usuario.bio.trim()}</Text>
                  </View>
                </View>
              )}

            {/* Botões de ação */}
            {usuarioLogado?.id_user === Number(id) && (
              <View style={styles.containerBotoes}>
                <Pressable
                  onPress={() => router.push("/editar-perfil")}
                  style={({ pressed }) => [
                    styles.botaoAlterarPerfil,
                    pressed && styles.botaoPressionado,
                  ]}
                >
                  <Text style={styles.textoBotaoAlterar}>Editar Perfil</Text>
                </Pressable>

                <Pressable
                  onPress={() => router.push("/favoritos")}
                  style={({ pressed }) => [
                    styles.botaoGerenciarFavoritos,
                    pressed && styles.botaoPressionado,
                  ]}
                >
                  <Text style={styles.textoBotaoAlterar}>
                    Gerenciar Favoritos
                  </Text>
                </Pressable>
              </View>
            )}

            {/* Mural de postagens */}
            <GerenciamentoMural
              idUser={Number(id)}
              tipoUsuario={
                usuario?.tp_user
                  ? (usuario.tp_user.toLowerCase() as
                      | "comum"
                      | "chef"
                      | "comerciante")
                  : "comum"
              }
            />
          </View>
        </ScrollView>
      </View>
    </View>
  );
}
