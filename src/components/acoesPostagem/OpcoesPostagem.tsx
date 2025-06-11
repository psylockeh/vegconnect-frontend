import React, { useState } from "react";
import { View, Text, Pressable } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import { styles } from "@/styles/OpcoesPostagem";
import axios from "axios";
import { API_URL } from "@/config/api";
import { useAuth } from "@/context/AuthContext";

interface OpcoesPostagemProps {
  postagemId: number;
  onEditar: () => void;
  onPostagemExcluida?: () => void;
}

const OpcoesPostagem = ({ postagemId, onEditar, onPostagemExcluida }: OpcoesPostagemProps) => {
  const [mostrarOpcoes, setMostrarOpcoes] = useState(false);
  const { userToken } = useAuth();

  const excluirPostagem = async () => {
    try {
      const config = {
        headers: {
          Authorization: `Bearer ${userToken}`,
        },
      };

      await axios.delete(`${API_URL}/usuario/deletarPostagem/${postagemId}`, config);

      // Aguarda 10 segundos e chama o callback
      if (onPostagemExcluida) {
        setTimeout(() => {
          onPostagemExcluida();
        }, 1000); // 10 segundos
      }
    } catch (error) {
      console.error("Erro ao excluir postagem:", error);
    }
  };

  return (
    <View>
      <Pressable
        onPress={(e) => {
          e.stopPropagation();
          setMostrarOpcoes(!mostrarOpcoes);
        }}
        style={styles.botaoInteracao}
      >
        <MaterialIcons name="more-vert" size={18} color="#555" />
        <Text style={styles.textoInteracao}>Opções</Text>
      </Pressable>

      {mostrarOpcoes && (
        <View style={styles.opcoesBotao}>

          {/* Editar Postagem */}
          <Pressable
            style={styles.exibirOpcoes}
            onPress={() => {
              setMostrarOpcoes(false);
              onEditar();
            }}
          >
            <MaterialIcons name="edit" size={18} color="#555" />
            <Text style={styles.textoInteracao}>Editar</Text>
          </Pressable>

          {/* Excluir Postagem */}
          <Pressable
            style={styles.exibirOpcoes}
            onPress={(e) => {
              e.stopPropagation();
              excluirPostagem();
            }}
          >
            <MaterialIcons name="delete" size={18} color="#555" />
            <Text style={styles.textoInteracao}>Excluir</Text>
          </Pressable>
        </View>
      )}
    </View>
  );
};

export default OpcoesPostagem;
