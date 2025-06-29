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
  createdAt: string;
  usuarioId: number;
  onPostagemAtualizada?: () => void;
  onPostagemExcluida?: () => void;
}

const OpcoesPostagem = ({
  postagemId,
  createdAt,
  usuarioId,
  onPostagemAtualizada,
  onPostagemExcluida,
}: OpcoesPostagemProps) => {
  const [mostrarOpcoes, setMostrarOpcoes] = useState(false);
  const { userToken, perfilUsuario } = useAuth();
  const [modalEditarVisivel, setModalEditarVisivel] = useState(false);

  const excluirPostagem = async () => {
    try {
      const config = {
        headers: {
          Authorization: `Bearer ${userToken}`,
        },
      };

      await axios.delete(
        `${API_URL}/usuario/deletarPostagem/${postagemId}`,
        config
      );

      if (onPostagemExcluida) {
        onPostagemExcluida();
      }
    } catch (error) {
      console.error("Erro ao excluir postagem:", error);
    }
  };

  const dentroDoPrazo =
    new Date().getTime() - new Date(createdAt).getTime() < 48 * 60 * 60 * 1000;

  return (
    <View>
      {perfilUsuario?.id_user === usuarioId && dentroDoPrazo && (
        <>
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
              <Pressable
                style={styles.exibirOpcoes}
                onPress={() => {
                  setMostrarOpcoes(false);
                  setModalEditarVisivel(true);
                }}
              >
                <MaterialIcons name="edit" size={18} color="#555" />
                <Text style={styles.textoInteracao}>Editar</Text>
              </Pressable>

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
        </>
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