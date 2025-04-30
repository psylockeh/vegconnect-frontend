import { View, Text, TextInput, StyleSheet } from "react-native";
import React from "react";
import { formatarData, formatarValor, validarLink } from "@/utils/formatadores";
import { Picker } from "@react-native-picker/picker";
import styles from "@/styles/FormularioEventoStyles";
import Checkbox from "expo-checkbox";

interface Props {
  titulo: string;
  setTitulo: (val: string) => void;
  conteudo: string;
  setConteudo: (val: string) => void;
  data: string;
  setData: (val: string) => void;
  localizacao: string;
  setLocalizacao: (val: string) => void;
  valor: string;
  setValor: (val: string) => void;
  links: string;
  setLinks: (val: string) => void;
  descricao_resumida: string;
  setDescricaoResumida: (val: string) => void;
  tpEvento: string;
  setTpEvento: (val: string) => void;
  categoriaEvento: string;
  setCategoriaEvento: (val: string) => void;
  modalidadeEvento: string[];
  setModalidadeEvento: (val: string[]) => void;
}

export default function FormularioEvento({
  titulo,
  setTitulo,
  conteudo,
  setConteudo,
  data,
  setData,
  localizacao,
  setLocalizacao,
  valor,
  setValor,
  links,
  setLinks,
  descricao_resumida,
  setDescricaoResumida,
  tpEvento,
  setTpEvento,
  categoriaEvento,
  setCategoriaEvento,
  modalidadeEvento,
  setModalidadeEvento,
}: Props) {
  return (
    <>
      <View style={styles.blocoPadrao}>
        <Text style={styles.tituloBloco}>📝 Resumo do Evento</Text>
        <TextInput
          placeholder="Este resumo aparece no feed"
          value={descricao_resumida}
          onChangeText={setDescricaoResumida}
          style={styles.inputPadrao}
        />
      </View>

      <View style={styles.blocoPadrao}>
        <Text style={styles.tituloBloco}>📛 Título</Text>
        <TextInput
          placeholder="Título"
          value={titulo}
          onChangeText={setTitulo}
          style={styles.inputPadrao}
        />
      </View>

      <View style={styles.blocoPadrao}>
        <Text style={styles.tituloBloco}>📣 Descrição do Evento</Text>
        <TextInput
          placeholder="Detalhe o que vai rolar"
          value={conteudo}
          onChangeText={setConteudo}
          multiline
          style={styles.inputPadrao}
        />
      </View>

      <View style={styles.blocoPadrao}>
        <Text style={styles.tituloBloco}>📅 Quando vai ser?</Text>
        <TextInput
          placeholder="DD/MM/AAAA"
          value={data}
          onChangeText={(val) => setData(formatarData(val))}
          keyboardType="numeric"
          style={styles.inputPadrao}
        />
      </View>

      <View style={styles.blocoPadrao}>
        <Text style={styles.tituloBloco}>📍 Onde vai ser?</Text>
        <TextInput
          placeholder="Localização do Evento"
          value={localizacao}
          onChangeText={setLocalizacao}
          style={styles.inputPadrao}
        />
      </View>

      <View style={styles.blocoPadrao}>
        <Text style={styles.tituloBloco}>💰 Valor</Text>
        <TextInput
          placeholder="Ex: R$ 25,00"
          value={valor}
          onChangeText={(val) => setValor(formatarValor(val))}
          keyboardType="numeric"
          style={styles.inputPadrao}
        />
      </View>

      <View style={styles.blocoPadrao}>
        <Text style={styles.tituloBloco}>🔗 Link do Evento</Text>
        <TextInput
          placeholder="https://meuevento.com"
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

      <View style={styles.blocoPadrao}>
        <Text style={styles.tituloBloco}>🎭 Tipo de Evento</Text>
        <Picker
          selectedValue={tpEvento}
          onValueChange={setTpEvento}
          style={styles.inputPadrao}
        >
          <Picker.Item label="Selecione o tipo de evento" value="" />
          <Picker.Item label="Feira" value="feira" />
          <Picker.Item label="Palestra" value="palestra" />
          <Picker.Item label="Workshop" value="workshop" />
          <Picker.Item label="Oficina" value="oficina" />
          <Picker.Item label="Conferência" value="conferencia" />
          <Picker.Item label="Ativismo" value="ativismo" />
          <Picker.Item label="Outro" value="outro" />
        </Picker>
      </View>

      <View style={styles.blocoPadrao}>
        <Text style={styles.tituloBloco}>🏷️ Qual a vibe do evento?</Text>
        <Picker
          selectedValue={categoriaEvento}
          onValueChange={setCategoriaEvento}
          style={styles.inputPadrao}
        >
          <Picker.Item label="Escolha a categoria principal" value="" />
          <Picker.Item label="Culinária Vegana" value="culinaria" />
          <Picker.Item label="Saúde e Bem-estar" value="saude" />
          <Picker.Item label="Meio Ambiente" value="meio_ambiente" />
          <Picker.Item label="Direitos dos Animais" value="animais" />
          <Picker.Item label="Sustentabilidade" value="sustentabilidade" />
          <Picker.Item
            label="Empreendedorismo Verde"
            value="empreendedorismo"
          />
          <Picker.Item label="Outro" value="outro" />
        </Picker>
      </View>

      <View style={styles.blocoPadrao}>
        <Text style={styles.tituloBloco}>🌐 Como esse evento acontece?</Text>
        {["Presencial", "Online", "Híbrido"].map((modo) => (
          <View
            key={modo}
            style={{
              flexDirection: "row",
              alignItems: "center",
              marginBottom: 6,
            }}
          >
            <Checkbox
              value={modalidadeEvento.includes(modo)}
              onValueChange={(checked) => {
                if (checked) {
                  setModalidadeEvento([...modalidadeEvento, modo]);
                } else {
                  setModalidadeEvento(
                    modalidadeEvento.filter((m) => m !== modo)
                  );
                }
              }}
              color="#025E3D"
            />
            <Text style={{ marginLeft: 8, color: "#333" }}>{modo}</Text>
          </View>
        ))}
      </View>
    </>
  );
}
