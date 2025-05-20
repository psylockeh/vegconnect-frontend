import React from "react";
import { View, Text, Image } from "react-native";
import { styles } from "@/styles/CardReceitaStyles";
import { ScrollView, TouchableOpacity } from "react-native-gesture-handler";

interface Props {
  postagem: any;
  perfilUsuario: any;
  autor: any;
  verificadoPor: any;
  setModalVisivel: (v: boolean) => void;
}

export default function VisualizacaoReceita({
  postagem,
  perfilUsuario,
  autor,
  verificadoPor,
  setModalVisivel,
}: Props) {
  let ingredientes = [];
  let instrucoes = [];

  try {
    ingredientes = Array.isArray(postagem.ingredientes)
      ? postagem.ingredientes
      : JSON.parse(postagem.ingredientes || "[]");
  } catch (err) {
    console.warn("❌ Erro ao processar ingredientes:", err);
  }

  try {
    instrucoes = Array.isArray(postagem.instrucoes)
      ? postagem.instrucoes
      : JSON.parse(postagem.instrucoes || "[]");
  } catch (err) {
    console.warn("❌ Erro ao processar instruções:", err);
  }

  const secoes = ["Geral", "Massa", "Recheio", "Cobertura", "Molho"];

  return (
    <View>
      {/* Carrossel de mídias */}
      {postagem.midia_urls?.length > 0 && (
        <ScrollView
          horizontal
          pagingEnabled
          showsHorizontalScrollIndicator={false}
          style={styles.carrosselImagem}
        >
          {postagem.midia_urls.map((url: string, index: number) => (
            <Image
              key={index}
              source={{ uri: url }}
              style={{
                width: 320,
                height: 200,
                borderRadius: 8,
                marginRight: 10,
              }}
              resizeMode="cover"
            />
          ))}
        </ScrollView>
      )}

      {/* Tag + Selo */}
      <View style={styles.tagWrapper}>
        <View style={[styles.tagTipoPost, { backgroundColor: "#CB997E" }]}>
          <Text style={styles.tagTipoText}>Receita</Text>
        </View>

        {postagem.selo_confianca && (
          <View style={styles.verificadoWrapper}>
            <Image
              source={{
                uri: "https://res.cloudinary.com/dyhzz5baz/image/upload/v1747699449/verified_30dp_314D1C_FILL0_wght400_GRAD0_opsz24_mvxkh2.png",
              }}
              style={styles.verificadoIcon}
            />
            <Text style={styles.verificadoTexto}>
              {verificadoPor?.id_user === autor?.id_user
                ? `Criada e verificada por @${autor.nickname}`
                : `Verificada por @${verificadoPor?.nickname}`}
            </Text>
          </View>
        )}
      </View>

      {/* Metadados da receita */}
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

      {/* Ingredientes */}
      <Text style={styles.tituloSessao}>INGREDIENTES</Text>
      {ingredientes.map((item: any, idx: number) => (
        <Text key={idx} style={styles.itemTexto}>
          • {item.quantidade} {item.medida} de {item.nome}
        </Text>
      ))}

      {/* Modo de Preparo */}
      <Text style={styles.tituloSessao}>MODO DE PREPARO</Text>
      {secoes.map((secao) => {
        const passosDaSecao = instrucoes.filter((p: any) => p.secao === secao);
        if (passosDaSecao.length === 0) return null;

        return (
          <View key={secao} style={{ marginBottom: 12 }}>
            <Text style={[styles.tituloSubSessao, { marginBottom: 4 }]}>
              {secao}
            </Text>
            {passosDaSecao.map((p: any, idx: number) => (
              <Text key={idx} style={styles.itemTexto}>
                {idx + 1}. {p.texto}
              </Text>
            ))}
          </View>
        );
      })}

      {/* Botão de validação */}
      {perfilUsuario?.tp_user === "Chef" &&
        postagem.tp_post === "receita" &&
        !postagem.selo_confianca && (
          <TouchableOpacity
            style={styles.botaoValidar}
            onPress={() => setModalVisivel(true)}
          >
            <Text style={styles.botaoTexto}>✅ Validar Receita</Text>
          </TouchableOpacity>
        )}
    </View>
  );
}
