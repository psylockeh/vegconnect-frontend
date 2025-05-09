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
import { useRef } from "react";
import { Ingrediente } from "@/types";
import { Instrucao } from "@/types";

const inputIngredienteRef = useRef<TextInput>(null);

type Props = {
  nomeReceita: string;
  setNomeReceita: (value: string) => void;
  ingredientes: Ingrediente[];
  setIngredientes: (value: Ingrediente[]) => void;
  instrucoes: Instrucao[];
  setInstrucoes: (value: Instrucao[]) => void;
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
  medidaAtual: string;
  setMedidaAtual: (value: string) => void;
};

export default function FormularioReceita({
  nomeReceita,
  setNomeReceita,
  ingredientes,
  setIngredientes,
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
  instrucoes,
  setInstrucoes,
}: Props) {
  const [ingredienteAtual, setIngredienteAtual] = useState("");
  const [quantidadeAtual, setQuantidadeAtual] = useState("");
  const [secaoAtual, setSecaoAtual] = useState("Geral");
  const [medidaAtual, setMedidaAtual] = useState("unidade");
  const [secaoInstrucaoAtual, setSecaoInstrucaoAtual] = useState("Geral");

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

  const opcoesMedidas = [
    "unidade",
    "xícara",
    "colher de sopa",
    "colher de chá",
    "grama",
    "quilo",
    "litro",
    "mililitro",
    "pitada",
  ];

  const handleAdicionarIngrediente = () => {
    if (!ingredienteAtual || !quantidadeAtual) return;

    // Pluralização da medida
    const quantidadeNumero = parseFloat(quantidadeAtual);
    let medidaFormatada = medidaAtual;

    if (quantidadeNumero > 1) {
      if (medidaAtual === "xícara") medidaFormatada = "xícaras";
      else if (medidaAtual === "colher de sopa")
        medidaFormatada = "colheres de sopa";
      else if (medidaAtual === "colher de chá")
        medidaFormatada = "colheres de chá";
      else if (medidaAtual === "unidade") medidaFormatada = "unidades";
      else if (medidaAtual === "grama") medidaFormatada = "gramas";
      else if (medidaAtual === "quilo") medidaFormatada = "quilos";
      else if (medidaAtual === "litro") medidaFormatada = "litros";
      else if (medidaAtual === "mililitro") medidaFormatada = "mililitros";
      else if (medidaAtual === "pitada") medidaFormatada = "pitadas";
    }

    setIngredientes([
      ...ingredientes,
      {
        nome: ingredienteAtual.trim(),
        quantidade: quantidadeAtual.trim(),
        medida: medidaFormatada,
        secao: secaoAtual,
      },
    ]);

    setIngredienteAtual("");
    setQuantidadeAtual("");
    setMedidaAtual("unidade");

    setTimeout(() => {
      inputIngredienteRef.current?.focus();
    }, 100);
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
    setInstrucoes([...instrucoes, { texto: "", secao: secaoInstrucaoAtual }]);
  };

  const handleAlterarInstrucao = (index: number, texto: string) => {
    const novas = [...instrucoes];
    novas[index] = { ...novas[index], texto };
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

        {/* Nome do Ingrediente */}
        <TextInput
          placeholder="Ingrediente"
          value={ingredienteAtual}
          onChangeText={setIngredienteAtual}
          style={[styles.inputPadrao, { marginBottom: 8 }]}
        />

        {/* Quantidade e Unidade */}
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            marginBottom: 8,
          }}
        >
          <TextInput
            placeholder="Qtd"
            value={quantidadeAtual}
            onChangeText={setQuantidadeAtual}
            keyboardType="numeric"
            style={[styles.inputPadrao, { width: 80, marginRight: 8 }]}
          />

          <Picker
            selectedValue={medidaAtual}
            onValueChange={(itemValue) => setMedidaAtual(itemValue)}
            style={[styles.inputPadrao, { flex: 1 }]}
          >
            {opcoesMedidas.map((medida) => (
              <Picker.Item key={medida} label={medida} value={medida} />
            ))}
          </Picker>
        </View>

        {/* Botão Adicionar Ingrediente */}
        <TouchableOpacity
          style={styles.botaoAdicionar}
          onPress={handleAdicionarIngrediente}
        >
          <Text style={styles.textoBotao}>Adicionar Ingrediente</Text>
        </TouchableOpacity>

        {/* Lista de Ingredientes já adicionados */}
        <View style={{ marginTop: 16 }}>
          {ingredientes.length > 0 && (
            <>
              {ingredientes.map((item, idx) => (
                <View
                  key={idx}
                  style={{
                    flexDirection: "row",
                    alignItems: "center",
                    justifyContent: "space-between",
                    marginBottom: 8,
                  }}
                >
                  <Text style={styles.listaItemTexto}>
                    • {item.quantidade} {item.medida} de {item.nome}
                  </Text>
                  <TouchableOpacity
                    onPress={() => {
                      const novos = ingredientes.filter((_, i) => i !== idx);
                      setIngredientes(novos);
                    }}
                    style={styles.botaoExcluir}
                  >
                    <Text style={styles.textoBotaoExcluir}>🗑️</Text>
                  </TouchableOpacity>
                </View>
              ))}
            </>
          )}
        </View>
      </View>

      <View style={styles.blocoPadrao}>
        <Text style={styles.tituloBloco}>👩‍🍳 Modo de Preparo</Text>

        {secoes.map((secao) => {
          const instrucoesDaSecao = instrucoes.filter((i) => i.secao === secao);
          if (instrucoesDaSecao.length === 0) return null;

          return (
            <View key={secao}>
              <Text style={styles.tituloSessao}>{secao}</Text>
              {instrucoesDaSecao.map((inst, idx) => (
                <View
                  key={idx}
                  style={{ flexDirection: "row", alignItems: "center" }}
                >
                  <TextInput
                    value={inst.texto}
                    onChangeText={(texto) => {
                      const novas = [...instrucoes];
                      const index = instrucoes.findIndex((i) => i === inst);
                      novas[index] = { ...inst, texto };
                      setInstrucoes(novas);
                    }}
                    placeholder={`Passo ${idx + 1}`}
                    style={[styles.inputPadrao, { flex: 1, marginRight: 8 }]}
                  />
                  <TouchableOpacity
                    onPress={() => {
                      const novas = instrucoes.filter((i) => i !== inst);
                      setInstrucoes(novas);
                    }}
                    style={styles.botaoExcluir}
                  >
                    <Text style={styles.textoBotaoExcluir}>🗑️</Text>
                  </TouchableOpacity>
                </View>
              ))}
            </View>
          );
        })}

        <View style={{ marginTop: 16 }}>
          <Text style={styles.tituloBloco}>Escolha a seção da instrução:</Text>
          <Picker
            selectedValue={secaoInstrucaoAtual}
            onValueChange={(itemValue) => setSecaoInstrucaoAtual(itemValue)}
            style={styles.input}
          >
            {secoes.map((secao) => (
              <Picker.Item key={secao} label={secao} value={secao} />
            ))}
          </Picker>
        </View>

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
