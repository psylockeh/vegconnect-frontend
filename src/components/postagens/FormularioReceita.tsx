import React, { useState } from "react";
import {
  ScrollView,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { styles } from "@/styles/FormularioReceitaStyles";

type Ingrediente = {
  nome: string;
  quantidade: string;
  secao: string;
};

type Props = {
  nomeReceita: string;
  setNomeReceita: (v: string) => void;
  ingredientes: Ingrediente[];
  setIngredientes: (v: Ingrediente[]) => void;
  instrucoes: string[];
  setInstrucoes: (v: string[]) => void;
  tempoPreparo: string;
  setTempoPreparo: (v: string) => void;
  categoria: string[];
  setCategoria: (v: string[]) => void;
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
    <ScrollView>
      <TextInput
        placeholder="Nome da Receita"
        value={nomeReceita}
        onChangeText={setNomeReceita}
        style={styles.inputPadrao}
      />

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

      <Text style={styles.tituloBloco}>Instruções</Text>
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

      <Text style={styles.tituloBloco}>Tempo de Preparo (HH:MM)</Text>
      <TextInput
        placeholder="Ex: 01:30"
        value={tempoPreparo}
        onChangeText={setTempoPreparo}
        style={styles.pickerHora}
        keyboardType="numeric"
        maxLength={5}
      />

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
    </ScrollView>
  );
}
