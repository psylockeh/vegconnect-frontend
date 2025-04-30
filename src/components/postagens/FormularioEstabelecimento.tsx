import { View, Text, TextInput, StyleSheet, Platform } from "react-native";
import React from "react";
import { Picker } from "@react-native-picker/picker";
import { formatarCEP, formatarHora } from "@/utils/formatadores";
import { styles } from "@/styles/FormularioEstabelecimentoStyles";

interface Props {
  nomeComercio: string;
  setNomeComercio: (val: string) => void;
  descricaoComercio: string;
  setDescricaoComercio: (val: string) => void;
  tipoComercio: string;
  setTipoComercio: (val: string) => void;
  tpComida: string;
  setTpComida: (val: string) => void;
  tpProduto: string;
  setTpProduto: (val: string) => void;
  tpServico: string;
  setTpServico: (val: string) => void;
  horarioAbertura: string;
  setHorarioAbertura: (val: string) => void;
  horarioFechamento: string;
  setHorarioFechamento: (val: string) => void;
  cep: string;
  setCep: (val: string) => void;
  endereco: string;
  setEndereco: (val: string) => void;
  descricao_resumida: string;
  setDescricaoResumida: (val: string) => void;
}

const tiposComercio = ["Restaurante", "Loja", "Serviço", "Mercado", "Café"];

const opcoesComida = ["Vegano", "Vegetariano", "Orgânico"];
const opcoesProduto = ["Cosméticos", "Higiene", "Roupas", "Alimentos"];
const opcoesServico = ["Nutrição", "Terapia", "Delivery", "Consultoria"];

export default function FormularioEstabelecimento({
  nomeComercio,
  setNomeComercio,
  descricaoComercio,
  setDescricaoComercio,
  tipoComercio,
  setTipoComercio,
  tpComida,
  setTpComida,
  tpProduto,
  setTpProduto,
  tpServico,
  setTpServico,
  horarioAbertura,
  setHorarioAbertura,
  horarioFechamento,
  setHorarioFechamento,
  cep,
  setCep,
  endereco,
  setEndereco,
  descricao_resumida,
  setDescricaoResumida,
}: Props) {
  return (
    <>
      <View style={styles.blocoPadrao}>
        <Text style={styles.tituloBloco}>📝 Resumo para o Feed</Text>
        <TextInput
          placeholder="Escreva algo atrativo sobre seu comércio"
          value={descricao_resumida}
          onChangeText={setDescricaoResumida}
          style={styles.inputPadrao}
        />
      </View>

      <View style={styles.blocoPadrao}>
        <Text style={styles.tituloBloco}>🏪 Nome do Comércio</Text>
        <TextInput
          placeholder="Nome Fantasia ou Comercial"
          value={nomeComercio}
          onChangeText={setNomeComercio}
          style={styles.inputPadrao}
        />
      </View>

      <View style={styles.blocoPadrao}>
        <Text style={styles.tituloBloco}>🧾 Descrição</Text>
        <TextInput
          placeholder="Fale sobre sua proposta e diferenciais"
          value={descricaoComercio}
          onChangeText={setDescricaoComercio}
          multiline
          style={styles.inputPadrao}
        />
      </View>

      <View style={styles.blocoPadrao}>
        <Text style={styles.tituloBloco}>🔖 Tipo de Comércio</Text>
        <Picker
          selectedValue={tipoComercio}
          onValueChange={setTipoComercio}
          style={styles.inputPadrao}
        >
          <Picker.Item label="Selecione..." value="" />
          {tiposComercio.map((tipo) => (
            <Picker.Item key={tipo} label={tipo} value={tipo} />
          ))}
        </Picker>

        {tipoComercio === "Restaurante" || tipoComercio === "Café" ? (
          <Picker
            selectedValue={tpComida}
            onValueChange={setTpComida}
            style={styles.inputPadrao}
          >
            <Picker.Item label="Tipo de comida" value="" />
            {opcoesComida.map((opt) => (
              <Picker.Item key={opt} label={opt} value={opt} />
            ))}
          </Picker>
        ) : null}

        {tipoComercio === "Loja" || tipoComercio === "Mercado" ? (
          <Picker
            selectedValue={tpProduto}
            onValueChange={setTpProduto}
            style={styles.inputPadrao}
          >
            <Picker.Item label="Tipo de produto" value="" />
            {opcoesProduto.map((opt) => (
              <Picker.Item key={opt} label={opt} value={opt} />
            ))}
          </Picker>
        ) : null}

        {tipoComercio === "Serviço" ? (
          <Picker
            selectedValue={tpServico}
            onValueChange={setTpServico}
            style={styles.inputPadrao}
          >
            <Picker.Item label="Tipo de serviço" value="" />
            {opcoesServico.map((opt) => (
              <Picker.Item key={opt} label={opt} value={opt} />
            ))}
          </Picker>
        ) : null}
      </View>

      <View style={styles.blocoPadrao}>
        <Text style={styles.tituloBloco}>⏰ Horário de Funcionamento</Text>
        <TextInput
          placeholder="Abertura (ex: 09:00)"
          value={horarioAbertura}
          onChangeText={(v) => setHorarioAbertura(formatarHora(v))}
          style={styles.inputPadrao}
          keyboardType="numeric"
        />
        <TextInput
          placeholder="Fechamento (ex: 18:00)"
          value={horarioFechamento}
          onChangeText={(v) => setHorarioFechamento(formatarHora(v))}
          style={styles.inputPadrao}
          keyboardType="numeric"
        />
      </View>

      <View style={styles.blocoPadrao}>
        <Text style={styles.tituloBloco}>📍 Endereço</Text>
        <TextInput
          placeholder="CEP"
          value={cep}
          onChangeText={(v) => setCep(formatarCEP(v))}
          style={styles.inputPadrao}
          keyboardType="numeric"
          maxLength={9}
        />
        <TextInput
          placeholder="Rua, Número, Bairro"
          value={endereco}
          onChangeText={setEndereco}
          style={styles.inputPadrao}
        />
      </View>
    </>
  );
}
