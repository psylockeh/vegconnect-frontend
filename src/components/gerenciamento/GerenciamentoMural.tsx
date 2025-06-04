import React, { useEffect, useState } from "react";
import axios from "axios";
import { View, Text, TouchableOpacity, FlatList, ActivityIndicator } from "react-native";  // <-- importado ActivityIndicator
import { MaterialIcons } from "@expo/vector-icons";
import { styles } from "@/styles/GerenciamentoMural";
import { API_URL } from "@/config/api";
import { useAuth } from "@/context/AuthContext";
import { Postagem } from "@/types";
import CardPostagem from "@/components/CardPostagem";

type TipoUsuario = "comum" | "chef" | "comerciante";

type Props = {
  idUser: number;
  tipoUsuario: TipoUsuario;
};

const GerenciamentoMural: React.FC<Props> = ({ idUser, tipoUsuario }) => {
  const { userToken } = useAuth();

  const todasOpcoes = ["receita", "recado", "estabelecimento", "evento", "promoção"];
  const opcoesFiltradas =
    tipoUsuario === "comerciante"
      ? todasOpcoes
      : todasOpcoes.filter((item) => item !== "estabelecimento" && item !== "promoção");

  const [filtroSelecionado, setFiltroSelecionado] = useState<string>(opcoesFiltradas[0]);
  const [postagens, setPostagens] = useState<Postagem[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [mensagemAlerta, setMensagemAlerta] = useState("");

  useEffect(() => {
    if (!userToken) {
      setError("Usuário não autenticado");
      setLoading(false);
      return;
    }

    const fetchPostagens = async () => {
      setLoading(true);
      setError(null);
      setMensagemAlerta("");

      try {
        const response = await axios.get<Postagem[]>(
          `${API_URL}/usuario/${idUser}/postagens`,
          {
            headers: { Authorization: `Bearer ${userToken}` },
          }
        );

        const postagensFiltradas = response.data.filter(
          (post) => post.tp_post === filtroSelecionado
        );

        setPostagens(postagensFiltradas);
        if (postagensFiltradas.length === 0) {
          setMensagemAlerta("🌱 Nenhuma postagem encontrada!!");
        } else {
          setMensagemAlerta("");
        }
      } catch (err: any) {
        console.error("Erro ao buscar postagens do usuário:", err);
        setError("🌱 Nenhuma postagem encontrada!!");
      } finally {
        setLoading(false);
      }
    };

    fetchPostagens();
  }, [idUser, userToken, filtroSelecionado]);

  return (
    <View>
      {/* Selecionar filtros */}
      <View style={styles.gerenciarMural}>
        {opcoesFiltradas.map((item) => (
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
                item === "receita"
                  ? "restaurant-menu"
                  : item === "recado"
                    ? "message"
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

      {/* Conteúdo das postagens */}
      {loading ? (
        <ActivityIndicator size={20} color="#3C6E47" />
      ) : error ? (
        <Text style={styles.textoMensagem}>{error}</Text>
      ) : postagens.length === 0 ? (
        <Text style={styles.textoMensagem}>{mensagemAlerta}</Text>
      ) : (
        <FlatList
          data={postagens}
          keyExtractor={(item) => item.id.toString()}
          renderItem={({ item }) => <CardPostagem postagem={item} />}
          contentContainerStyle={{ paddingBottom: 15 }}
        />
      )}
    </View>
  );
};

export default GerenciamentoMural;
