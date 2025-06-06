import React, { useState } from "react";
import {
  View,
  TextInput,
  Text,
  Pressable,
  FlatList,
  ActivityIndicator,
  Image,
} from "react-native";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { API_URL } from "@/config/api";
import pesquisarStyles from "@/styles/PesquisaStyles";
import Sidebar from "@/components/Sidebar";
import CardPostagem from "@/components/CardPostagem";
import { useRouter } from "expo-router";
import { FontAwesome } from "@expo/vector-icons";

const PesquisaGeral = () => {
  const [termo, setTermo] = useState("");
  const [tipo, setTipo] = useState("usuario");
  const [resultados, setResultados] = useState<any[]>([]);
  const [carregando, setCarregando] = useState(false);
  const [erro, setErro] = useState("");
  const router = useRouter();

  const opcoes = [
    { label: "Perfil", valor: "usuario" },
    { label: "Recado", valor: "recado" },
    { label: "Receita", valor: "receita" },
    { label: "Estabelecimento", valor: "estabelecimento" },
    { label: "Evento", valor: "evento" },
    { label: "Promoção", valor: "promocao" },
  ];

  const pesquisar = async (tipoSelecionado: string = tipo) => {
    if (!termo.trim()) {
      setErro("📌 Digite o que deseja pesquisar!!");
      return;
    }

    setErro("");
    setCarregando(true);
    setResultados([]);

    try {
      const token = await AsyncStorage.getItem("@token");
      if (!token) {
        setErro("❌ Token não encontrado!");
        return;
      }

      const response = await axios.get(
        `${API_URL}/usuario/pesquisaGeral?tipo=${tipoSelecionado}&pesquisa=${encodeURIComponent(termo)}`,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      setResultados(response.data);
    } catch (err: any) {
      setErro(
        err.response?.data?.msg ||
        err.message ||
        "❌ Erro ao realizar pesquisa!!"
      );
    } finally {
      setCarregando(false);
    }
  };

  const handleFiltroClick = (novoTipo: string) => {
    setTipo(novoTipo);
    pesquisar(novoTipo);
  };

  return (
    <View style={pesquisarStyles.container}>
      <Sidebar onPostPress={() => { }} />

      <View style={pesquisarStyles.mainContent}>
        <View style={pesquisarStyles.cardPesquisa}>
          {/* Campo de texto para pesquisa */}
          <TextInput
            value={termo}
            onChangeText={setTermo}
            placeholder="Pesquisar..."
            onSubmitEditing={() => pesquisar()}
            style={pesquisarStyles.inputPesquisar}
          />

          {/* Menu de filtros */}
          <View style={pesquisarStyles.menuFiltro}>
            {opcoes.map((opcao) => {
              const selecionado = tipo === opcao.valor;
              return (
                <Pressable
                  key={opcao.valor}
                  onPress={() => handleFiltroClick(opcao.valor)}
                  style={[
                    pesquisarStyles.botaoFiltro,
                    selecionado && pesquisarStyles.botaoFiltroSelecionado,
                  ]}
                >
                  <Text
                    style={[
                      pesquisarStyles.textoBotao,
                      selecionado && pesquisarStyles.textoBotaoSelecionado,
                    ]}
                  >
                    {opcao.label}
                  </Text>
                </Pressable>
              );
            })}
          </View>
        </View>

        {carregando && (
          <ActivityIndicator
            size="large"
            color="#3C6E47"
            style={pesquisarStyles.carregando}
          />
        )}

        <Text style={pesquisarStyles.erro}>{erro}</Text>

        {/* Exibição dos resultados da pesquisa */}
        <FlatList
          data={resultados}
          keyExtractor={(item, index) => index.toString()}
          renderItem={({ item }) => (
            <Pressable
              onPress={() => {
                if (tipo === "usuario") {
                  router.push(`/perfil/${item.id_user}`);
                } else {
                  router.push(`/postagem/${item.id}`);
                }
              }}
            >
              {tipo === "usuario" ? (
                <View style={pesquisarStyles.cardResultado}>
                  <View style={pesquisarStyles.headerUsuario}>
                    {item.foto_perfil ? (
                      <Image
                        source={{ uri: item.foto_perfil }}
                        style={pesquisarStyles.fotoPerfil}
                      />
                    ) : (
                      <Image
                        source={{
                          uri: item.foto_perfil?.startsWith("http")
                            ? item.foto_perfil
                            : "https://res.cloudinary.com/dyhzz5baz/image/upload/v1746917561/default-avatar_jvqpsg.png",
                        }}
                        style={pesquisarStyles.fotoPerfil}
                      />
                    )}
                    <View>
                      <Text style={pesquisarStyles.nomeUsuario}>
                        {" "}
                        {item.nome || "Usuário"}{" "}
                      </Text>
                      <Text style={pesquisarStyles.nickname}>
                        {" "}
                        @{item.nickname || "usuário"}{" "}
                      </Text>
                      <Text style={pesquisarStyles.textoResultado}>
                        <FontAwesome
                          name="leaf"
                          style={{
                            color: "#67b26f",
                            fontSize: 20,
                            marginRight: 8,
                          }}
                        />
                        {item.tp_user || "Público"}{" "}
                      </Text>
                    </View>
                  </View>
                </View>
              ) : (
                <CardPostagem postagem={item} />
              )}
            </Pressable>
          )}
          showsVerticalScrollIndicator={false}

        />
      </View>
    </View>
  );
};

export default PesquisaGeral;
