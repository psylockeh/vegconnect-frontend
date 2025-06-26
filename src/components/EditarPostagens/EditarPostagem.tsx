import React, { useState } from "react";
import { View, Text, TextInput, Pressable, ScrollView } from "react-native";
import { Picker } from "@react-native-picker/picker";
import Checkbox from "expo-checkbox";
import { formatarData, formatarValor, validarLink, formatarCEP, formatarHora } from "@/utils/formatadores";
import { styles } from "@/styles/EditarPostagem";
import { Ingrediente } from "@/types";
import { Instrucao } from "@/types";
import { useRef } from "react";

const inputIngredienteRef = useRef<TextInput>(null);

interface Props {
  // Campos comuns
  titulo: string;
  setTitulo: (val: string) => void;
  conteudo: string;
  setConteudo: (val: string) => void;

  tag: string;
  setTag: (val: string) => void;
  midiaUrls: string;
  setMidiaUrls: (val: string) => void;
  descricao_resumida: string;
  setDescricaoResumida: (val: string) => void;

  // Campos receita
  nomeReceita?: string;
  setNomeReceita?: (val: string) => void;
  ingredientes: Ingrediente[];
  setIngredientes: (value: Ingrediente[]) => void;
  instrucoes: Instrucao[];
  setInstrucoes: (value: Instrucao[]) => void;
  categoria: string[];
  setCategoria: (value: string[]) => void;
  tempPrep?: string;
  setTempPrep?: (val: string) => void;
  calorias?: string;
  setCalorias?: (val: string) => void;
  dificuldade?: string;
  setDificuldade?: (val: string) => void;
  rendimentoQuantidade?: string;
  setRendimentoQuantidade?: (val: string) => void;
  tipoRendimento?: string;
  setTipoRendimento?: (val: string) => void;

  // Campos evento
  data: string;
  setData: (val: string) => void;
  localizacao?: string;
  setLocalizacao?: (val: string) => void;
  valor: string;
  setValor: (val: string) => void;
  links: string;
  setLinks: (val: string) => void;
  tpEvento: string;
  setTpEvento: (val: string) => void;
  categoriaEvento: string;
  setCategoriaEvento: (val: string) => void;
  modalidadeEvento: string[];
  setModalidadeEvento: (val: string[]) => void;

  // Campos comercio
  nomeComercio?: string;
  setNomeComercio?: (val: string) => void;
  descricaoComercio?: string;
  setDescricaoComercio?: (val: string) => void;
  tpComida?: string;
  setTpComida?: (val: string) => void;
  horarioAbertura: string;
  setHorarioAbertura: (val: string) => void;
  horarioFechamento: string;
  setHorarioFechamento: (val: string) => void;
  cep: string;
  setCep: (val: string) => void;
  endereco?: string;
  setEndereco?: (val: string) => void;
  tipoComercio?: string;
  setTipoComercio?: (val: string) => void;
  tpProduto: string;
  setTpProduto: (val: string) => void;
  tpServico: string;
  setTpServico: (val: string) => void;

  // Campos promoção
  dataInicio?: string;
  setDataInicio?: (val: string) => void;
  dataFim?: string;
  setDataFim?: (val: string) => void;
  valorDesconto?: string;
  setValorDesconto?: (val: string) => void;
  codigoPromocional?: string;
  setCodigoPromocional?: (val: string) => void;

  tipoPostagem: "recado" | "receita" | "evento" | "comercio" | "promocao";
}

const tiposComercio = ["Restaurante", "Loja", "Serviço", "Mercado", "Café"];

const opcoesComida = ["Vegano", "Vegetariano", "Orgânico"];
const opcoesProduto = ["Cosméticos", "Higiene", "Roupas", "Alimentos"];
const opcoesServico = ["Nutrição", "Terapia", "Delivery", "Consultoria"];

export default function FormularioPostagem({
  // 🔄 Comuns a todas as postagens
  titulo,
  setTitulo,
  conteudo,
  setConteudo,
  categoria,
  setCategoria,
  tag,
  setTag,
  midiaUrls,
  setMidiaUrls,
  descricao_resumida,
  setDescricaoResumida,
  tipoPostagem,

  // 🥗 Campos da postagem do tipo: receita
  nomeReceita,
  setNomeReceita,
  ingredientes,
  setIngredientes,
  instrucoes,
  setInstrucoes,
  tempPrep,
  setTempPrep,
  calorias,
  setCalorias,
  dificuldade,
  setDificuldade,
  rendimentoQuantidade,
  setRendimentoQuantidade,
  tipoRendimento,
  setTipoRendimento,

  // 📅 Campos da postagem do tipo: evento
  data,
  setData,
  localizacao,
  setLocalizacao,
  valor,
  setValor,
  links,
  setLinks,
  tpEvento,
  setTpEvento,
  categoriaEvento,
  setCategoriaEvento,
  modalidadeEvento,
  setModalidadeEvento,

  // 🏪 Campos da postagem do tipo: comercio
  nomeComercio,
  setNomeComercio,
  descricaoComercio,
  setDescricaoComercio,
  tpComida,
  setTpComida,
  horarioAbertura,
  setHorarioAbertura,
  horarioFechamento,
  setHorarioFechamento,
  cep,
  setCep,
  endereco,
  setEndereco,
  tipoComercio,
  setTipoComercio,
  tpProduto,
  setTpProduto,
  tpServico,
  setTpServico,

  // 💸 Campos da postagem do tipo: promocao
  dataInicio,
  setDataInicio,
  dataFim,
  setDataFim,
  valorDesconto,
  setValorDesconto,
  codigoPromocional,
  setCodigoPromocional,
}: Props) {

  // RECEITA
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

    setTempPrep && setTempPrep(resultado);
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

  // FORMULARIO
  return (
    <ScrollView style={styles.formularioContainer}>

      {/* RECADO */}
      {tipoPostagem === "recado" && (
        <>
          <View style={styles.blocoPadrao}>
            <Text style={styles.tituloBloco}>💬 Escreva seu recado</Text>
            <TextInput
              placeholder="Digite aqui seu recado, ideia, desabafo, inspiração..."
              value={conteudo}
              onChangeText={setConteudo}
              multiline
              style={[styles.inputPadrao, { height: 120, textAlignVertical: "top" }]}
            />
          </View>
        </>
      )}

      {/* RECEITA */}
      {tipoPostagem === "receita" && (
        <>
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
            <Pressable
              style={styles.botaoAdicionar}
              onPress={handleAdicionarIngrediente}
            >
              <Text style={styles.textoBotao}>Adicionar Ingrediente</Text>
            </Pressable>

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
                      <Pressable
                        onPress={() => {
                          const novos = ingredientes.filter((_, i) => i !== idx);
                          setIngredientes(novos);
                        }}
                        style={styles.botaoExcluir}
                      >
                        <Text style={styles.textoBotaoExcluir}>🗑️</Text>
                      </Pressable>
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
                      <Pressable
                        onPress={() => {
                          const novas = instrucoes.filter((i) => i !== inst);
                          setInstrucoes(novas);
                        }}
                        style={styles.botaoExcluir}
                      >
                        <Text style={styles.textoBotaoExcluir}>🗑️</Text>
                      </Pressable>
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

            <Pressable
              style={styles.botaoAdicionar}
              onPress={handleAdicionarInstrucao}
            >
              <Text style={styles.textoBotao}>Adicionar Instrução</Text>
            </Pressable>
          </View>

          <View style={styles.blocoPadrao}>
            <View style={{ marginBottom: 16 }}>
              <Text style={styles.tituloBloco}>
                🕒 Quanto tempo leva para fazer essa delícia?
              </Text>
              <TextInput
                placeholder="Ex: 01:30"
                value={tempPrep}
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
                    <Pressable
                      key={tag}
                      style={[
                        styles.tagCategoria,
                        categoria.includes(tag) && styles.tagCategoriaSelecionada,
                      ]}
                      onPress={() => toggleCategoria(tag)}
                    >
                      <Text style={styles.tagCategoriaTexto}>{tag}</Text>
                    </Pressable>
                  ))}
                </View>
              </View>
            ))}
          </View>
        </>
      )}

      {/* EVENTO */}
      {tipoPostagem === "evento" && (
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
      )}

      {/* COMERCIO */}
      {tipoPostagem === "comercio" && (
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
      )}

      {/* PROMOÇAO */}
      {tipoPostagem === "promocao" && (
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
      )}
    </ScrollView>
  );
}
