import React from "react";
import { View, Text, Image, ScrollView } from "react-native";
import { styles } from "@/styles/CardPromocaoStyles";

interface Props {
  postagem: any;
}

export default function VisualizacaoPromocao({ postagem }: Props) {
  const midias: string[] = Array.isArray(postagem.midia_urls)
    ? postagem.midia_urls
    : JSON.parse(postagem.midia_urls || "[]");

  return (
    <View style={styles.container}>
      <View style={styles.bloco}>
        <Text style={styles.titulo}>🏪 Estabelecimento</Text>
        <Text style={styles.texto}>{postagem.nome_comercio}</Text>
      </View>

      <View style={styles.bloco}>
        <Text style={styles.titulo}>📅 Validade da Promoção</Text>
        <Text style={styles.texto}>
          {postagem.valor || "Até durar o estoque"}
        </Text>
      </View>

      <View style={styles.bloco}>
        <Text style={styles.titulo}>📝 Como Participar</Text>
        <Text style={styles.texto}>{postagem.descricao_comercio}</Text>
      </View>

      {midias.length > 0 && (
        <View style={styles.bloco}>
          <Text style={styles.titulo}>🖼️ Mídias</Text>
          <ScrollView horizontal>
            {midias.map((url, index) => (
              <Image key={index} source={{ uri: url }} style={styles.imagem} />
            ))}
          </ScrollView>
        </View>
      )}

      {postagem.links && (
        <View style={styles.bloco}>
          <Text style={styles.titulo}>🔗 Link</Text>
          <Text style={styles.link}>{postagem.links}</Text>
        </View>
      )}

      <View style={styles.bloco}>
        <Text style={styles.titulo}>📍 Endereço</Text>
        <Text style={styles.texto}>
          {postagem.endereco}, CEP {postagem.cep}
        </Text>
        <Text style={styles.texto}>
          {postagem.hora_abertura} às {postagem.hora_fechamento}
        </Text>
      </View>
    </View>
  );
}
