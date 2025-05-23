import React, { useEffect, useState } from "react";
import { View, Text, Pressable } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import { styles } from "@/styles/GerenciamentoMural";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { API_URL } from "@/config/api";
import axios from "axios";
import { Postagem } from "@/types";

type TipoUsuario = "comum" | "chef" | "comerciante";
type Props = {
  filtroSelecionado: string;
  setFiltroSelecionado: (filtro: string) => void;
  tipoUsuario: TipoUsuario;
};

// const [postagens, setPostagens] = useState<Postagem[]>([]);
// const [carregandoPostagens, setCarregandoPostagens] = useState(true);

// Função para carregar postagens com base no filtro
// const carregarPostagens = async () => {
//   try {
//     const token = await AsyncStorage.getItem("@token");

//     if (!token) {
//       console.error("Token não encontrado!");
//       return;
//     }

//     const response = await axios.get(`${API_URL}/usuario/postagens`, {
//       headers: {
//         Authorization: `Bearer ${token}`,
//       },
//     });
//     setPostagens(response.data);
//   } catch (error) {
//     console.error("Erro ao carregar postagens:", error);
//   } finally {
//     setCarregandoPostagens(false);
//   }
// };

// // Carregar postagens sempre que o filtro for alterado
// useEffect(() => {
//   carregarPostagens();
// }, []);

const GerenciamentoMural = ({
  filtroSelecionado,
  setFiltroSelecionado,
  tipoUsuario,
}: Props) => {
  const todasOpcoes = [
    "receita",
    "recado",
    "estabelecimento",
    "evento",
    "promoção",
  ];

  const opcoesFiltradas =
    tipoUsuario === "comerciante"
      ? todasOpcoes
      : todasOpcoes.filter(
          (item) => item !== "estabelecimento" && item !== "promoção"
        );

  return (
    <View style={styles.gerenciarMural}>
      {opcoesFiltradas.map((item) => (
        <Pressable
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
        </Pressable>
      ))}
    </View>
  );
};

export default GerenciamentoMural;
