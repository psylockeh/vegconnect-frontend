import React from "react";
import { View, Text, Image } from "react-native";
import { styles } from "@/styles/CardReceitaStyles";

interface Props {
  postagem: any;
}

export default function VisualizacaoReceita({ postagem }: Props) {
  const ingredientes = Array.isArray(postagem.ingredientes)
    ? postagem.ingredientes
    : JSON.parse(postagem.ingredientes || "[]");

  const instrucoes = Array.isArray(postagem.instrucoes)
    ? postagem.instrucoes
    : JSON.parse(postagem.instrucoes || "[]");

  return (
    <View>
      {postagem.midia_urls?.length > 0 && (
        <Image
          source={{ uri: postagem.midia_urls[0] }}
          style={styles.imagemCapa}
        />
      )}

      <View style={styles.topicos}>
        <View style={styles.itemTopico}>
          <Text style={styles.tituloTopico}>⏱ PREPARO</Text>
          <Text style={styles.valorTopico}>{postagem.temp_prep}</Text>
        </View>
        <View style={styles.itemTopico}>
          <Text style={styles.tituloTopico}>⚙️ DIFICULDADE</Text>
          <Text style={styles.valorTopico}>{postagem.dificuldade || "-"}</Text>
        </View>
        <View style={styles.itemTopico}>
          <Text style={styles.tituloTopico}>👥 RENDIMENTO</Text>
          <Text style={styles.valorTopico}>
            {postagem.rendimento_quantidade || "--"}{" "}
            {postagem.tipo_rendimento || "porções"}
          </Text>
        </View>
        <View style={styles.itemTopico}>
          <Text style={styles.tituloTopico}>🔥 CALORIAS</Text>
          <Text style={styles.valorTopico}>{postagem.calorias || "0"}</Text>
        </View>
      </View>

      <Text style={styles.tituloSessao}>INGREDIENTES</Text>
      {ingredientes.map((item: any, idx: number) => (
        <Text key={idx} style={styles.itemTexto}>
          • {item.quantidade} {item.medida} de {item.nome}
        </Text>
      ))}

      <Text style={styles.tituloSessao}>MODO DE PREPARO</Text>
      {instrucoes.map((passo: string, idx: number) => (
        <Text key={idx} style={styles.itemTexto}>
          {idx + 1}. {passo}
        </Text>
      ))}
    </View>
  );
}
