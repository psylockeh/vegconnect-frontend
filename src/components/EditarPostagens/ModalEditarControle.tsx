import React, { useState, useEffect } from "react";
import {
  View,
  Modal,
  ActivityIndicator,
  Alert,
  Text,
  Pressable,
  ScrollView,
  StyleSheet, Keyboard, TouchableWithoutFeedback 
} from "react-native";
import axios from "axios";
import { API_URL } from "@/config/api";
import { useAuth } from "@/context/AuthContext";
import FormularioPostagem from "@/components/EditarPostagens/EditarPostagem";
import { styles } from "@/styles/ModalEditarControle";
import { Ingrediente } from "@/types";

interface ModalEditarControleProps {
  postagemId: string;
  visible: boolean;
  onClose: () => void;
  onAtualizado?: () => void;
}

export default function ModalEditarControle({
  postagemId,
  visible,
  onClose,
  onAtualizado,
}: ModalEditarControleProps) {
  const { userToken } = useAuth();

  // Estados para dados da postagem
  const [loading, setLoading] = useState(false);
  const [carregandoDados, setCarregandoDados] = useState(false);
  const [erro, setErro] = useState<string | null>(null);

  // Campos comuns
  const [titulo, setTitulo] = useState("");
  const [conteudo, setConteudo] = useState("");
  const [tag, setTag] = useState("");
  const [midiaUrls, setMidiaUrls] = useState("");
  const [descricaoResumida, setDescricaoResumida] = useState("");
  const [tipoPostagem, setTipoPostagem] = useState<
    "recado" | "receita" | "evento" | "comercio" | "promocao"
  >("recado");

  // Campos receita
  const [nomeReceita, setNomeReceita] = useState("");
  const [ingredientes, setIngredientes] = useState<Ingrediente[]>([]);
  const [instrucoes, setInstrucoes] = useState<{ texto: string; secao: string }[]>([]);
  const [tempPrep, setTempPrep] = useState("");
  const [calorias, setCalorias] = useState("");
  const [dificuldade, setDificuldade] = useState("");
  const [rendimentoQuantidade, setRendimentoQuantidade] = useState("");
  const [tipoRendimento, setTipoRendimento] = useState("");
  const [categoria, setCategoria] = useState<string[]>([]);

  // Campos evento
  const [data, setData] = useState("");
  const [localizacao, setLocalizacao] = useState("");
  const [valor, setValor] = useState("");
  const [links, setLinks] = useState("");
  const [tpEvento, setTpEvento] = useState("");
  const [categoriaEvento, setCategoriaEvento] = useState("");
  const [modalidadeEvento, setModalidadeEvento] = useState<string[]>([]);

  // Campos comercio
  const [nomeComercio, setNomeComercio] = useState("");
  const [descricaoComercio, setDescricaoComercio] = useState("");
  const [tpComida, setTpComida] = useState("");
  const [horaAbertura, setHoraAbertura] = useState("");
  const [horaFechamento, setHoraFechamento] = useState("");
  const [cep, setCep] = useState("");
  const [endereco, setEndereco] = useState("");
  const [tipoComercio, setTipoComercio] = useState("");
  const [tipoProduto, setTipoProduto] = useState("");
  const [tipoServico, setTipoServico] = useState("");

  // Campos promoção
  const [dataInicio, setDataInicio] = useState("");
  const [dataFim, setDataFim] = useState("");
  const [valorDesconto, setValorDesconto] = useState("");
  const [codigoPromocional, setCodigoPromocional] = useState("");

  useEffect(() => {
    if (visible) {
      buscarPostagem();
    } else {
      limparCampos();
      setErro(null);
    }
  }, [visible]);

  async function buscarPostagem() {
    setCarregandoDados(true);
    setErro(null);

    try {
      const res = await axios.get(`${API_URL}/usuario/postagens/${postagemId}`, {
        headers: { Authorization: `Bearer ${userToken}` },
      });
      const p = res.data;

      // Campos comuns
      setTitulo(p.titulo || "");
      setConteudo(p.conteudo || "");
      setCategoria(p.categoria || "");
      setTag(p.tag || "");
      setMidiaUrls(p.midiaUrls || "");
      setDescricaoResumida(p.descricaoResumida || "");

      // Corrigido aqui: pegar tipo da postagem pelo campo tp_post do backend
      setTipoPostagem(p.tp_post || "recado");

      // Receita
      setNomeReceita(p.nomeReceita || "");
      setTempPrep(p.tempPrep || "");
      setCalorias(p.calorias || "");
      setDificuldade(p.dificuldade || "");
      setRendimentoQuantidade(p.rendimentoQuantidade || "");
      setTipoRendimento(p.tipoRendimento || "");
      setIngredientes(
        Array.isArray(p.ingredientes) ? p.ingredientes : []
      ); setInstrucoes(p.instrucoes || []);

      // Evento
      setData(p.data || "");
      setLocalizacao(p.localizacao || "");
      setValor(p.valor || "");
      setLinks(p.links || "");
      setTpEvento(p.tpEvento || "");
      setCategoriaEvento(p.categoriaEvento || "");
      setModalidadeEvento(p.modalidadeEvento || []);

      // Comércio
      setNomeComercio(p.nomeComercio || "");
      setDescricaoComercio(p.descricaoComercio || "");
      setTpComida(p.tpComida || "");
      setHoraAbertura(p.horaAbertura || "");
      setHoraFechamento(p.horaFechamento || "");
      setCep(p.cep || "");
      setEndereco(p.endereco || "");
      setTipoComercio(p.tipoComercio || "");
      setTipoProduto(p.tipoProduto || "");
      setTipoServico(p.tipoServico || "");

      // Promoção
      setDataInicio(p.dataInicio || "");
      setDataFim(p.dataFim || "");
      setValorDesconto(p.valorDesconto || "");
      setCodigoPromocional(p.codigoPromocional || "");
    } catch (error) {
      setErro("Falha ao carregar dados da postagem.");
    } finally {
      setCarregandoDados(false);
    }
  }

  function limparCampos() {
    setTitulo("");
    setConteudo("");
    setCategoria([]);
    setTag("");
    setMidiaUrls("");
    setDescricaoResumida("");
    setTipoPostagem("recado");

    setNomeReceita("");
    setIngredientes([]);
    setInstrucoes([]);
    setTempPrep("");
    setCalorias("");
    setDificuldade("");
    setRendimentoQuantidade("");
    setTipoRendimento("");

    setData("");
    setLocalizacao("");
    setValor("");
    setLinks("");
    setTpEvento("");
    setCategoriaEvento("");
    setModalidadeEvento([]);

    setNomeComercio("");
    setDescricaoComercio("");
    setTpComida("");
    setHoraAbertura("");
    setHoraFechamento("");
    setCep("");
    setEndereco("");
    setTipoComercio("");
    setTipoProduto("");
    setTipoServico("");

    setDataInicio("");
    setDataFim("");
    setValorDesconto("");
    setCodigoPromocional("");
  }

  async function atualizarPostagem() {
    if (!titulo.trim() || !conteudo.trim()) {
      Alert.alert("Erro", "Título e conteúdo são obrigatórios.");
      return;
    }

    setLoading(true);
    setErro(null);
    try {
      await axios.put(
        `${API_URL}/usuario/atualizarpostagem/${postagemId}`,
        {
          // Campos comuns
          titulo,
          conteudo,
          categoria,
          tag,
          midiaUrls,
          descricaoResumida,
          tp_post: tipoPostagem,

          // Receita
          nomeReceita,
          ingredientes,
          instrucoes,
          tempPrep,
          calorias,
          dificuldade,
          rendimentoQuantidade,
          tipoRendimento,

          // Evento
          data,
          localizacao,
          valor,
          links,
          tpEvento,
          categoriaEvento,
          modalidadeEvento,

          // Comércio
          nomeComercio,
          descricaoComercio,
          tpComida,
          horaAbertura,
          horaFechamento,
          cep,
          endereco,
          tipoComercio,
          tipoProduto,
          tipoServico,

          // Promoção
          dataInicio,
          dataFim,
          valorDesconto,
          codigoPromocional,
        },
        {
          headers: {
            Authorization: `Bearer ${userToken}`,
            "Content-Type": "application/json",
          },
        }
      );

      Alert.alert("Sucesso", "Postagem atualizada com sucesso!");
      onAtualizado && onAtualizado();
      onClose();
    } catch (error) {
      console.error(error);
      Alert.alert("Erro", "Não foi possível atualizar a postagem.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <Modal visible={visible} transparent animationType="fade" onRequestClose={onClose}>
       <TouchableWithoutFeedback onPress={() => {}}>
      <View style={styles.overlay}>
        <View style={styles.modal}>
          <Text style={styles.titulo}>
            Editar{" "}
            {tipoPostagem ? tipoPostagem[0].toUpperCase() + tipoPostagem.slice(1) : "Postagem"}
          </Text>
          {carregandoDados ? (
            <ActivityIndicator size="large" color="#025E3D" />
          ) : erro ? (
            <View style={styles.erroContainer}>
              <Text style={styles.erro}>{erro}</Text>
              <Pressable onPress={onClose} style={styles.botaoAcao}>
                <Text style={styles.textoBotao}>Fechar</Text>
              </Pressable>
            </View>
          ) : (
            <>
              <FormularioPostagem
                // Campos comuns
                titulo={titulo}
                setTitulo={setTitulo}
                conteudo={conteudo}
                setConteudo={setConteudo}
                categoria={categoria}
                setCategoria={setCategoria}
                tag={tag}
                setTag={setTag}
                midiaUrls={midiaUrls}
                setMidiaUrls={setMidiaUrls}
                descricao_resumida={descricaoResumida}
                setDescricaoResumida={setDescricaoResumida}
                tipoPostagem={tipoPostagem}

                // Receita
                nomeReceita={nomeReceita}
                setNomeReceita={setNomeReceita}
                ingredientes={ingredientes}
                setIngredientes={setIngredientes}
                instrucoes={instrucoes}
                setInstrucoes={setInstrucoes}
                tempPrep={tempPrep}
                setTempPrep={setTempPrep}
                calorias={calorias}
                setCalorias={setCalorias}
                dificuldade={dificuldade}
                setDificuldade={setDificuldade}
                rendimentoQuantidade={rendimentoQuantidade}
                setRendimentoQuantidade={setRendimentoQuantidade}
                tipoRendimento={tipoRendimento}
                setTipoRendimento={setTipoRendimento}

                // Evento
                data={data}
                setData={setData}
                localizacao={localizacao}
                setLocalizacao={setLocalizacao}
                valor={valor}
                setValor={setValor}
                links={links}
                setLinks={setLinks}
                tpEvento={tpEvento}
                setTpEvento={setTpEvento}
                categoriaEvento={categoriaEvento}
                setCategoriaEvento={setCategoriaEvento}
                modalidadeEvento={modalidadeEvento}
                setModalidadeEvento={setModalidadeEvento}

                // Comércio
                nomeComercio={nomeComercio}
                setNomeComercio={setNomeComercio}
                descricaoComercio={descricaoComercio}
                setDescricaoComercio={setDescricaoComercio}
                tpComida={tpComida}
                setTpComida={setTpComida}
                horarioAbertura={horaAbertura}
                setHorarioAbertura={setHoraAbertura}
                horarioFechamento={horaFechamento}
                setHorarioFechamento={setHoraFechamento}
                cep={cep}
                setCep={setCep}
                endereco={endereco}
                setEndereco={setEndereco}
                tipoComercio={tipoComercio}
                setTipoComercio={setTipoComercio}
                tpProduto={tipoProduto}
                setTpProduto={setTipoProduto}
                tpServico={tipoServico}
                setTpServico={setTipoServico}

                // Promoção
                dataInicio={dataInicio}
                setDataInicio={setDataInicio}
                dataFim={dataFim}
                setDataFim={setDataFim}
                valorDesconto={valorDesconto}
                setValorDesconto={setValorDesconto}
                codigoPromocional={codigoPromocional}
                setCodigoPromocional={setCodigoPromocional}
              />

              <Pressable
                onPress={atualizarPostagem}
                style={[styles.botaoAtualizar, loading && { opacity: 0.7 }]}
                disabled={loading}
              >
                {loading ? (
                  <ActivityIndicator color="#fff" />
                ) : (
                  <Text style={styles.atualizarBotaoTexto}>Atualizar Postagem</Text>
                )}
              </Pressable>

              <Pressable onPress={onClose} style={[styles.botaoCancelar]}>
                <Text style={styles.cancelarTexto}>Cancelar</Text>
              </Pressable>
            </>
          )}
        </View>
      </View>
      </TouchableWithoutFeedback>
    </Modal>
  );
}
