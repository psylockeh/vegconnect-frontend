import React from "react";
import { View, Text, Image, ScrollView } from "react-native";
import { styles } from "@/styles/CardEstabelecimentoStyles";

interface Props {
  postagem: any;
}

export default function VisualizacaoEstabelecimento({ postagem }: Props) {
  const midias: string[] = Array.isArray(postagem.midia_urls)
    ? postagem.midia_urls
    : JSON.parse(postagem.midia_urls || "[]");

  return (
    <View style={styles.container}>
      <View style={styles.bloco}>
        <Text style={styles.titulo}>🏪 Nome do Comércio</Text>
        <Text style={styles.texto}>{postagem.nome_comercio}</Text>
      </View>

      <View style={styles.bloco}>
        <Text style={styles.titulo}>📝 Descrição</Text>
        <Text style={styles.texto}>{postagem.descricao_comercio}</Text>
      </View>

      <View style={styles.bloco}>
        <Text style={styles.titulo}>🍴 Tipo de Comida</Text>
        <Text style={styles.texto}>{postagem.tp_comida}</Text>
      </View>

      <View style={styles.bloco}>
        <Text style={styles.titulo}>⏰ Horário de Funcionamento</Text>
        <Text style={styles.texto}>
          {postagem.hora_abertura} às {postagem.hora_fechamento}
        </Text>
      </View>

      <View style={styles.bloco}>
        <Text style={styles.titulo}>📍 Endereço</Text>
        <Text style={styles.texto}>
          {postagem.endereco}, CEP {postagem.cep}
        </Text>
      </View>

      {midias.length > 0 && (
        <View style={styles.bloco}>
          <Text style={styles.titulo}>🖼️ Fotos do Local</Text>
          <ScrollView horizontal>
            {midias.map((url, index) => (
              <Image key={index} source={{ uri: url }} style={styles.imagem} />
            ))}
          </ScrollView>
        </View>
      )}
    </View>
  );
}
