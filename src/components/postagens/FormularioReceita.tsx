import React, { useState } from "react";
import {
  ScrollView,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { styles } from "@/styles/FormularioReceitaStyles";
import { Picker } from "@react-native-picker/picker";
import { Platform } from "react-native";

type Ingrediente = {
  nome: string;
  quantidade: string;
  secao: string;
};

type Props = {
  nomeReceita: string;
  setNomeReceita: (value: string) => void;
  ingredientes: any[];
  setIngredientes: (value: any[]) => void;
  instrucoes: string[];
  setInstrucoes: (value: string[]) => void;
  tempoPreparo: string;
  setTempoPreparo: (value: string) => void;
  categoria: string[];
  setCategoria: (value: string[]) => void;
  calorias: string;
  setCalorias: (value: string) => void;
  dificuldade: string;
  setDificuldade: (value: string) => void;
  rendimentoQuantidade: string;
  setRendimentoQuantidade: (value: string) => void;
  tipoRendimento: string;
  setTipoRendimento: (value: string) => void;
  descricao_resumida: string;
  setDescricaoResumida: (value: string) => void;
};

export default function FormularioReceita({
  nomeReceita,
  setNomeReceita,
  ingredientes,
  setIngredientes,
  instrucoes,
  setInstrucoes,
  tempoPreparo,
  setTempoPreparo,
  categoria,
  setCategoria,
  calorias,
  setCalorias,
  dificuldade,
  setDificuldade,
  rendimentoQuantidade,
  setRendimentoQuantidade,
  tipoRendimento,
  setTipoRendimento,
  descricao_resumida,
  setDescricaoResumida,
}: Props) {
  const [ingredienteAtual, setIngredienteAtual] = useState("");
  const [quantidadeAtual, setQuantidadeAtual] = useState("");
  const [secaoAtual, setSecaoAtual] = useState("Geral");

  const secoes = ["Geral", "Massa", "Recheio", "Cobertura", "Molho"];

  const opcoesCategorias: Record<string, string[]> = {
    "Tipo de Refeição": [
      "Almoço",
      "Café da manhã",
      "Lanche da tarde",
      "Jantar",
      "Ceia",
    ],
    "Tipo de Dieta": ["Vegano", "Vegetariano", "Restrito em carne animal"],
    "Informações Nutricionais": [
      "Zero Açúcar",
      "Zero Lactose",
      "Contém Glúten",
      "Integral",
      "Sem Soja",
    ],
  };

  const handleAdicionarIngrediente = () => {
    if (!ingredienteAtual || !quantidadeAtual) return;
    setIngredientes([
      ...ingredientes,
      {
        nome: ingredienteAtual.trim(),
        quantidade: quantidadeAtual.trim(),
        secao: secaoAtual,
      },
    ]);
    setIngredienteAtual("");
    setQuantidadeAtual("");
  };

  const formatarTempo = (texto: string) => {
    const apenasNumeros = texto.replace(/\D/g, "");
    let resultado = apenasNumeros;
    if (apenasNumeros.length >= 3) {
      resultado = apenasNumeros.slice(0, 2) + ":" + apenasNumeros.slice(2, 4);
    }

    setTempoPreparo(resultado);
  };

  const handleAdicionarInstrucao = () => {
    setInstrucoes([...instrucoes, ""]);
  };

  const handleAlterarInstrucao = (index: number, texto: string) => {
    const novas = [...instrucoes];
    novas[index] = texto;
    setInstrucoes(novas);
  };

  const toggleCategoria = (tag: string) => {
    if (categoria.includes(tag)) {
      setCategoria(categoria.filter((c) => c !== tag));
    } else {
      setCategoria([...categoria, tag]);
    }
  };

  return (
    <ScrollView style={styles.formularioContainer}>
      <View style={styles.blocoResumo}>
        <Text style={styles.tituloResumo}>✨ Resumo da sua receita</Text>
        <TextInput
          placeholder="Este será o resumo que aparecerá no feed para atrair pessoas para sua postagem completa"
          value={descricao_resumida}
          onChangeText={setDescricaoResumida}
          style={styles.inputPadrao}
          multiline
        />
      </View>
      <View style={styles.blocoPadrao}>
        <Text style={styles.tituloBloco}>
          🍽️ Como essa obra-prima se chama?
        </Text>
        <TextInput
          placeholder="Nome da Receita"
          value={nomeReceita}
          onChangeText={setNomeReceita}
          style={styles.inputPadrao}
        />
      </View>

      <View style={styles.blocoPadrao}>
        <Text style={styles.tituloBloco}>Ingredientes</Text>
        <View style={styles.listaIngrediente}>
          <TextInput
            placeholder="Ingrediente"
            value={ingredienteAtual}
            onChangeText={setIngredienteAtual}
            style={[styles.inputPadrao, { flex: 1 }]}
          />
          <TextInput
            placeholder="Qtd"
            value={quantidadeAtual}
            onChangeText={setQuantidadeAtual}
            style={[styles.inputPadrao, { width: 80 }]}
          />
        </View>
      </View>

      <View style={styles.secoesContainer}>
        {secoes.map((s) => (
          <TouchableOpacity
            key={s}
            onPress={() => setSecaoAtual(s)}
            style={[
              styles.botaoSecao,
              secaoAtual === s && styles.botaoSecaoAtivo,
            ]}
          >
            <Text
              style={[
                styles.textoSecao,
                secaoAtual === s && styles.textoSecaoAtivo,
              ]}
            >
              {s}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      <TouchableOpacity
        style={styles.botaoAdicionar}
        onPress={handleAdicionarIngrediente}
      >
        <Text style={styles.textoBotao}>Adicionar Ingrediente</Text>
      </TouchableOpacity>

      {secoes.map((s) => (
        <View key={s}>
          {ingredientes.some((i) => i.secao === s) && (
            <Text style={styles.secaoTitulo}>{s}</Text>
          )}
          {ingredientes
            .filter((i) => i.secao === s)
            .map((i, idx) => (
              <Text key={idx} style={styles.listaItemTexto}>
                • {i.nome} - {i.quantidade}
              </Text>
            ))}
        </View>
      ))}

      <View style={styles.blocoPadrao}>
        <Text style={styles.tituloBloco}>👩‍🍳 Modo de Preparo</Text>

        {instrucoes.map((inst, idx) => (
          <TextInput
            key={idx}
            value={inst}
            onChangeText={(texto) => handleAlterarInstrucao(idx, texto)}
            placeholder={`Passo ${idx + 1}`}
            style={styles.inputPadrao}
          />
        ))}

        <TouchableOpacity
          style={styles.botaoAdicionar}
          onPress={handleAdicionarInstrucao}
        >
          <Text style={styles.textoBotao}>Adicionar Instrução</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.blocoPadrao}>
        <View style={{ marginBottom: 16 }}>
          <Text style={styles.tituloBloco}>
            🕒 Quanto tempo leva para fazer essa delícia?
          </Text>
          <TextInput
            placeholder="Ex: 01:30"
            value={tempoPreparo}
            onChangeText={formatarTempo}
            keyboardType="numeric"
            style={styles.inputPadrao}
            maxLength={5}
          />
        </View>
      </View>

      <View style={styles.blocoPadrao}>
        <View style={{ marginBottom: 16 }}>
          <Text style={styles.tituloBloco}>
            🍽️ Energia no prato! (Quantas calorias essa delícia tem?)
          </Text>
          <View style={{ flexDirection: "row", alignItems: "center" }}>
            <TextInput
              placeholder="Ex: 200"
              value={calorias}
              onChangeText={setCalorias}
              keyboardType="numeric"
              style={[styles.inputPadrao, { flex: 1 }]}
            />
            <Text style={{ marginLeft: 8, fontSize: 16, color: "#555" }}>
              kcal
            </Text>
          </View>
        </View>
      </View>

      <View style={styles.blocoPadrao}>
        <Text style={styles.tituloBloco}>
          🧑‍🍳 Nível de chef! (Qual o desafio dessa receita?)
        </Text>
        <Picker
          selectedValue={dificuldade}
          onValueChange={setDificuldade}
          style={styles.input}
        >
          <Picker.Item label="Selecione a Dificuldade" value="" />
          <Picker.Item label="Fácil" value="Fácil" />
          <Picker.Item label="Intermediário" value="Intermediário" />
          <Picker.Item label="Difícil" value="Difícil" />
        </Picker>
      </View>

      <View style={styles.blocoPadrao}>
        <Text style={styles.tituloBloco}>
          👨‍👩‍👧‍👦 Para quantos famintos? (Quantas pessoas ou porções?)
        </Text>
        <Picker
          selectedValue={tipoRendimento}
          onValueChange={setTipoRendimento}
          style={styles.input}
        >
          <Picker.Item label="Porções" value="porções" />
          <Picker.Item label="Pessoas" value="pessoas" />
        </Picker>
        <TextInput
          placeholder="Quantidade de rendimento (ex: 6)"
          value={rendimentoQuantidade}
          onChangeText={setRendimentoQuantidade}
          keyboardType="numeric"
          style={styles.input}
        />
      </View>

      <View style={styles.blocoPadrao}>
        <Text style={styles.tituloBloco}>Categoria</Text>
        {Object.entries(opcoesCategorias).map(([grupo, tags]) => (
          <View key={grupo} style={styles.categoriaContainer}>
            <Text style={styles.tituloBloco}>{grupo}</Text>
            <View style={styles.secoesContainer}>
              {tags.map((tag) => (
                <TouchableOpacity
                  key={tag}
                  style={[
                    styles.tagCategoria,
                    categoria.includes(tag) && styles.tagCategoriaSelecionada,
                  ]}
                  onPress={() => toggleCategoria(tag)}
                >
                  <Text style={styles.tagCategoriaTexto}>{tag}</Text>
                </TouchableOpacity>
              ))}
            </View>
          </View>
        ))}
      </View>
    </ScrollView>
  );
}
