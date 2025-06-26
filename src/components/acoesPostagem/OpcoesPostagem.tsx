import React, { useState } from "react";
import { View, Text, Pressable } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import { styles } from "@/styles/OpcoesPostagem";
import axios from "axios";
import { API_URL } from "@/config/api";
import { useAuth } from "@/context/AuthContext";
import ModalEditarControle from "@/components/EditarPostagens/ModalEditarControle";

interface OpcoesPostagemProps {
  postagemId: number;
  onPostagemExcluida?: () => void;
  onPostagemAtualizada?: () => void;
}

const OpcoesPostagem = ({ postagemId, onPostagemExcluida, onPostagemAtualizada  }: OpcoesPostagemProps) => {
  const [mostrarOpcoes, setMostrarOpcoes] = useState(false);
  const [modalEditarVisivel, setModalEditarVisivel] = useState(false);
  const { userToken } = useAuth();

  const excluirPostagem = async () => {
    try {
      const config = {
        headers: {
          Authorization: `Bearer ${userToken}`,
        },
      };

      await axios.delete(`${API_URL}/usuario/deletarPostagem/${postagemId}`, config);

      // Pode chamar callback para atualizar lista depois
      if (onPostagemExcluida) {
        setTimeout(() => {
          onPostagemExcluida();
        }, 1000);
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
              setModalEditarVisivel(true); // Abre modal aqui
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

      {/* Modal Interno */}
      <ModalEditarControle
        postagemId={postagemId.toString()}
        visible={modalEditarVisivel}
        onClose={() => setModalEditarVisivel(false)}
        onAtualizado={() => {
          setModalEditarVisivel(false);
          // Opcional: Atualizar lista no pai, se quiser
           if (onPostagemAtualizada) onPostagemAtualizada();
        }}
      />
    </View>
  );
};

export default OpcoesPostagem;
