import React from "react";
import { View, Text, Linking, TouchableOpacity } from "react-native";
import { styles } from "@/styles/CardEventoStyles";

interface Props {
  postagem: any;
}

export default function VisualizacaoEvento({ postagem }: Props) {
  return (
    <View style={styles.container}>
      {/* Seção de detalhes principais */}
      <View style={styles.bloco}>
        <Text style={styles.titulo}>📍 Localização</Text>
        <Text style={styles.texto}>{postagem.localizacao}</Text>
      </View>

      <View style={styles.bloco}>
        <Text style={styles.titulo}>📅 Data</Text>
        <Text style={styles.texto}>
          {new Date(postagem.data).toLocaleDateString("pt-BR")}
        </Text>
      </View>

      <View style={styles.bloco}>
        <Text style={styles.titulo}>💰 Valor</Text>
        <Text style={styles.texto}>R$ {postagem.valor}</Text>
      </View>

      <View style={styles.bloco}>
        <Text style={styles.titulo}>🎭 Tipo de Evento</Text>
        <Text style={styles.texto}>{postagem.tp_evento}</Text>
      </View>

      <View style={styles.bloco}>
        <Text style={styles.titulo}>📌 Modalidade</Text>
        <Text style={styles.texto}>{postagem.modalidade_evento}</Text>
      </View>

      <View style={styles.bloco}>
        <Text style={styles.titulo}>🔗 Link do Evento</Text>
        <TouchableOpacity onPress={() => Linking.openURL(postagem.links)}>
          <Text style={styles.link}>{postagem.links}</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}
