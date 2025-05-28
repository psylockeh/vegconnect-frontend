import React, { useState } from "react";
import { View, Text, Pressable } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import { styles } from "@/styles/OpcoesPostagem";

interface OpcoesPostagemProps {
  onEditar: () => void;
  onExcluir: () => void;
}

const OpcoesPostagem = ({ onEditar, onExcluir }: OpcoesPostagemProps) => {
  const [mostrarOpcoes, setMostrarOpcoes] = useState(false);

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
            onPress={() => {
              setMostrarOpcoes(false);
              onExcluir();
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
