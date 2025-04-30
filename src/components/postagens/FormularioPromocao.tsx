import { View, Text, TextInput } from "react-native";
import React from "react";
import { styles } from "@/styles/FormularioPromocaoStyles";
import { formatarData, validarLink } from "@/utils/formatadores";

interface Props {
  titulo: string;
  setTitulo: (val: string) => void;
  conteudo: string;
  setConteudo: (val: string) => void;
  data: string;
  setData: (val: string) => void;
  links: string;
  setLinks: (val: string) => void;
  descricao_resumida: string;
  setDescricaoResumida: (val: string) => void;
}

export default function FormularioPromocao({
  titulo,
  setTitulo,
  conteudo,
  setConteudo,
  data,
  setData,
  links,
  setLinks,
  descricao_resumida,
  setDescricaoResumida,
}: Props) {
  return (
    <>
      <View style={styles.blocoPadrao}>
        <Text style={styles.tituloBloco}>📝 Resumo para o Feed</Text>
        <TextInput
          placeholder="Escreva algo chamativo para atrair cliques"
          value={descricao_resumida}
          onChangeText={setDescricaoResumida}
          style={styles.inputPadrao}
        />
      </View>

      <View style={styles.blocoPadrao}>
        <Text style={styles.tituloBloco}>🎁 Título da Promoção</Text>
        <TextInput
          placeholder="Ex: 10% de desconto para Vegs!"
          value={titulo}
          onChangeText={setTitulo}
          style={styles.inputPadrao}
        />
      </View>

      <View style={styles.blocoPadrao}>
        <Text style={styles.tituloBloco}>🛍️ Detalhes da Oferta</Text>
        <TextInput
          placeholder="Descreva as condições da promoção"
          value={conteudo}
          onChangeText={setConteudo}
          multiline
          style={styles.inputPadrao}
        />
      </View>

      <View style={styles.blocoPadrao}>
        <Text style={styles.tituloBloco}>📅 Validade</Text>
        <TextInput
          placeholder="DD/MM/AAAA"
          value={data}
          onChangeText={(val) => setData(formatarData(val))}
          keyboardType="numeric"
          style={styles.inputPadrao}
        />
      </View>

      <View style={styles.blocoPadrao}>
        <Text style={styles.tituloBloco}>🔗 Link da Promoção</Text>
        <TextInput
          placeholder="https://meuproduto.com/desconto"
          value={links}
          onChangeText={setLinks}
          style={styles.inputPadrao}
        />
        {links.length > 0 && (
          <Text
            style={{
              color: validarLink(links) ? "green" : "red",
              marginTop: 4,
            }}
          >
            {validarLink(links) ? "Link válido" : "Link inválido"}
          </Text>
        )}
      </View>
    </>
  );
}
