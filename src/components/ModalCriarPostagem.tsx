import {
  View,
  Text,
  Modal,
  TextInput,
  Pressable,
  ScrollView,
  Image,
} from "react-native";
import React, { useState } from "react";
import ModalStyles from "@/styles/ModalCriarPostagemStyles";
import validarPostagem from "@/services/validarPostagem";
import { enviarPostagem } from "@/services/postagemService";
import { uploadImageToCloudinary } from "@/utils/cloudinary";
import * as ImagePicker from "expo-image-picker";
import Toast from "react-native-toast-message";
import { useAuth } from "@/context/AuthContext";
import FormularioReceita from "./postagens/FormularioReceita";
import FormularioEvento from "@/components/postagens/FormularioEventos";
import FormularioEstabelecimento from "./postagens/FormularioEstabelecimento";
import FormularioPromocao from "./postagens/FormularioPromocao";
import { Ingrediente } from "@/types";
import { Instrucao } from "@/types";

type Props = {
  visivel: boolean;
  fechar: () => void;
  tp_post: string;
  onPostagemCriada?: () => void;
};

export default function ModalCriarPostagem({
  visivel,
  fechar,
  tp_post,
  onPostagemCriada,
}: Props) {
  const [titulo, setTitulo] = useState("");
  const [conteudo, setConteudo] = useState("");
  const [data, setData] = useState("");
  const [localizacao, setLocalizacao] = useState("");
  const [valor, setValor] = useState("");
  const [links, setLinks] = useState("");
  const [nomeReceita, setNomeReceita] = useState("");
  const [ingredientes, setIngredientes] = useState<Ingrediente[]>([]);
  const [instrucoes, setInstrucoes] = useState<Instrucao[]>([]);
  const [tempoPreparo, setTempoPreparo] = useState("");
  const [categoria, setCategoria] = useState<string[]>([]);
  const [tipoComida, setTipoComida] = useState("");
  const [horarioAbertura, setHorarioAbertura] = useState("");
  const [horarioFechamento, setHorarioFechamento] = useState("");
  const [cep, setCep] = useState("");
  const [midiasSelecionadas, setMidiasSelecionadas] = useState<string[]>([]);
  const [nomeComercio, setNomeComercio] = useState("");
  const [descricaoComercio, setDescricaoComercio] = useState("");
  const [endereco, setEndereco] = useState("");
  const [descricaoResumida, setDescricaoResumida] = useState("");
  const [calorias, setCalorias] = useState("");
  const [dificuldade, setDificuldade] = useState("");
  const [rendimentoQuantidade, setRendimentoQuantidade] = useState("");
  const [tipoRendimento, setTipoRendimento] = useState("porções");
  const [tpEvento, setTpEvento] = useState("");
  const [categoriaEvento, setCategoriaEvento] = useState("");
  const [modalidadeEvento, setModalidadeEvento] = useState<string[]>([]);
  const [medidaAtual, setMedidaAtual] = useState("unidade");
  const [tpComida, setTpComida] = useState("");
  const [tpProduto, setTpProduto] = useState("");
  const [tpServico, setTpServico] = useState("");
  const [tipoComercio, setTipoComercio] = useState("");

  const { perfilUsuario } = useAuth();

  const [erroImagem, setErroImagem] = useState(false);

  const fotoPerfilFinal =
    perfilUsuario?.foto_perfil?.startsWith("http") && !erroImagem
      ? { uri: perfilUsuario.foto_perfil }
      : {
          uri: "https://res.cloudinary.com/dyhzz5baz/image/upload/v1746917561/default-avatar_jvqpsg.png",
        };

  const selecionarImagens = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsMultipleSelection: true,
      quality: 0.7,
    });

    if (!result.canceled) {
      const novas = result.assets.map((a) => a.uri);
      const total = midiasSelecionadas.length + novas.length;

      if (total > 4) {
        Toast.show({
          type: "error",
          text1: "Limite de imagens atingido",
          text2: "Você só pode enviar até 4 imagens por publicação.",
        });
        return;
      }

      setMidiasSelecionadas((prev) => [...prev, ...novas]);
    }
  };

  const removerImagem = (uri: string) => {
    setMidiasSelecionadas((prev) => prev.filter((m) => m !== uri));
  };

  const handleSubmitPostagem = async () => {
    let conteudoFormatado = conteudo?.trim();

    if (tp_post === "receita" && !conteudoFormatado && instrucoes.length > 0) {
      conteudoFormatado = instrucoes
        .map((i) => i.texto)
        .join("\n")
        .trim();
    }

    type NovaPostagem = {
      tp_post: string;
      titulo?: string;
      conteudo: string;
      data?: string;
      localizacao?: string;
      valor?: string;
      links?: string;
      nome_receita?: string;
      ingredientes?: string;
      instrucoes?: Instrucao[];
      temp_prep?: string;
      categoria?: string;
      calorias?: string;
      dificuldade?: string;
      rendimento_quantidade?: string;
      tipo_rendimento?: string;
      tp_evento?: string;
      categoria_evento?: string;
      modalidade_evento?: string | string[];
      descricao_resumida?: string;
      nome_comercio?: string;
      descricao_comercio?: string;
      tp_comida?: string;
      hora_abertura?: string;
      hora_fechamento?: string;
      cep?: string;
      endereco?: string;
      midia_urls?: string[];
      tipo_comercio?: string;
      tipo_produto?: string;
      tipo_servico?: string;
    };
    const novaPostagem: NovaPostagem = {
      tp_post,
      conteudo: conteudoFormatado,
    };

    // RECEITA
    if (tp_post === "receita") {
      Object.assign(novaPostagem, {
        titulo: nomeReceita,
        nome_receita: nomeReceita,
        calorias,
        dificuldade,
        rendimento_quantidade: rendimentoQuantidade,
        tipo_rendimento: tipoRendimento,
        descricao_resumida: descricaoResumida,
        ingredientes,
        instrucoes,
        temp_prep: tempoPreparo,
        categoria,
        localizacao,
        valor,
      });
    }

    // PROMOÇÃO
    if (tp_post === "promocao") {
      Object.assign(novaPostagem, {
        titulo,
        descricao_resumida: descricaoResumida,
        conteudo: conteudoFormatado,
        data,
        links,
      });
    }

    // EVENTO
    if (tp_post === "evento") {
      Object.assign(novaPostagem, {
        titulo,
        descricao_resumida: descricaoResumida,
        conteudo: conteudoFormatado,
        data,
        localizacao,
        tp_evento: tpEvento,
        categoria_evento: categoriaEvento,
        modalidade_evento: Array.isArray(modalidadeEvento)
          ? modalidadeEvento
          : [modalidadeEvento],
      });
    }

    // ESTABELECIMENTO
    if (tp_post === "estabelecimento") {
      const conteudoEstabelecimento = descricaoComercio?.trim();
      conteudoFormatado = descricaoComercio; // garante que conteudo não venha vazio

      Object.assign(novaPostagem, {
        conteudo: conteudoEstabelecimento,
        titulo: nomeComercio,
        nome_comercio: nomeComercio,
        descricao_comercio: descricaoComercio,
        tp_comida: tpComida,
        hora_abertura: horarioAbertura,
        hora_fechamento: horarioFechamento,
        cep,
        endereco,
        descricao_resumida: descricaoResumida,
        tipo_comercio: tipoComercio,
        tipo_produto: tpProduto,
        tipo_servico: tpServico,
      });
    }

    const erro = validarPostagem(tp_post, novaPostagem);
    if (erro) return alert(`⚠️ ${erro}`);

    try {
      const midia_urls = [];
      for (const uri of midiasSelecionadas) {
        const uploadedUrl = await uploadImageToCloudinary(uri);
        if (uploadedUrl) midia_urls.push(uploadedUrl);
      }

      novaPostagem.ingredientes = JSON.stringify(ingredientes);
      novaPostagem.instrucoes = instrucoes;
      novaPostagem.categoria = JSON.stringify(categoria);

      novaPostagem.midia_urls = midia_urls;

      console.log("📦 Payload final da postagem:", novaPostagem);

      await enviarPostagem(novaPostagem);
      onPostagemCriada?.();

      Toast.show({
        type: "success",
        text1: "Postagem publicada!",
        text2: "Sua publicação foi enviada com sucesso. 🌱",
      });

      fechar();
      resetarCampos();
    } catch (err) {
      Toast.show({
        type: "error",
        text1: "Erro ao publicar",
        text2: "Verifique sua conexão ou tente novamente.",
      });
    }
  };

  const resetarCampos = () => {
    setTitulo("");
    setConteudo("");
    setData("");
    setLocalizacao("");
    setValor("");
    setLinks("");
    setNomeReceita("");
    setIngredientes([]);
    setInstrucoes([]);
    setTempoPreparo("");
    setCategoria([]);
    setTipoComida("");
    setHorarioAbertura("");
    setHorarioFechamento("");
    setCep("");
    setMidiasSelecionadas([]);
    setNomeComercio("");
    setDescricaoComercio("");
    setEndereco("");
    setDescricaoResumida("");
    setCalorias("");
    setDificuldade("");
    setRendimentoQuantidade("");
    setTipoRendimento("porções");
    setTpEvento("");
    setCategoriaEvento("");
    setModalidadeEvento([]);
    setMedidaAtual("unidade");
    setTpComida("");
    setTpProduto("");
    setTpServico("");
    setTipoComercio("");
  };

  const fecharModal = () => {
    resetarCampos();
    fechar();
  };

  const renderHeaderUsuario = () => (
    <View style={ModalStyles.headerUsuario}>
      {perfilUsuario?.foto_perfil?.startsWith("http") ? (
        <Image
          source={fotoPerfilFinal}
          style={ModalStyles.avatar}
          onError={() => setErroImagem(true)}
        />
      ) : (
        <Image
          source={{
            uri: perfilUsuario.foto_perfil?.startsWith("http")
              ? perfilUsuario.foto_perfil
              : "https://res.cloudinary.com/dyhzz5baz/image/upload/v1746917561/default-avatar_jvqpsg.png",
          }}
          style={ModalStyles.avatar}
        />
      )}

      <View>
        <Text style={ModalStyles.nomeUsuario}>
          {perfilUsuario?.nome || "Usuário"}
        </Text>
        <Text style={ModalStyles.tipoUsuario}>
          {perfilUsuario?.tp_user || "Público"}
        </Text>
      </View>
    </View>
  );

  const renderFormulario = () => {
    switch (tp_post) {
      default:
        return (
          <Text style={{ padding: 12, textAlign: "center", color: "#999" }}>
            Selecione um tipo de postagem para continuar.
          </Text>
        );

      case "receita":
        return (
          <>
            <FormularioReceita
              nomeReceita={nomeReceita}
              setNomeReceita={setNomeReceita}
              ingredientes={ingredientes}
              setIngredientes={setIngredientes}
              instrucoes={instrucoes}
              setInstrucoes={setInstrucoes}
              tempoPreparo={tempoPreparo}
              setTempoPreparo={setTempoPreparo}
              categoria={categoria}
              setCategoria={setCategoria}
              calorias={calorias}
              setCalorias={setCalorias}
              dificuldade={dificuldade}
              setDificuldade={setDificuldade}
              rendimentoQuantidade={rendimentoQuantidade}
              setRendimentoQuantidade={setRendimentoQuantidade}
              tipoRendimento={tipoRendimento}
              setTipoRendimento={setTipoRendimento}
              descricao_resumida={descricaoResumida}
              setDescricaoResumida={setDescricaoResumida}
              medidaAtual={medidaAtual}
              setMedidaAtual={setMedidaAtual}
            />
          </>
        );

      case "evento":
        return (
          <FormularioEvento
            descricao_resumida={descricaoResumida}
            setDescricaoResumida={setDescricaoResumida}
            titulo={titulo}
            setTitulo={setTitulo}
            conteudo={conteudo}
            setConteudo={setConteudo}
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
          />
        );

      case "estabelecimento":
        return (
          <FormularioEstabelecimento
            nomeComercio={nomeComercio}
            setNomeComercio={setNomeComercio}
            descricaoComercio={descricaoComercio}
            setDescricaoComercio={setDescricaoComercio}
            tipoComercio={tipoComercio}
            setTipoComercio={setTipoComercio}
            tpComida={tpComida}
            setTpComida={setTpComida}
            tpProduto={tpProduto}
            setTpProduto={setTpProduto}
            tpServico={tpServico}
            setTpServico={setTpServico}
            horarioAbertura={horarioAbertura}
            setHorarioAbertura={setHorarioAbertura}
            horarioFechamento={horarioFechamento}
            setHorarioFechamento={setHorarioFechamento}
            cep={cep}
            setCep={setCep}
            endereco={endereco}
            setEndereco={setEndereco}
            descricao_resumida={descricaoResumida}
            setDescricaoResumida={setDescricaoResumida}
          />
        );
      case "promocao":
        return (
          <FormularioPromocao
            titulo={titulo}
            setTitulo={setTitulo}
            conteudo={conteudo}
            setConteudo={setConteudo}
            data={data}
            setData={setData}
            links={links}
            setLinks={setLinks}
            descricao_resumida={descricaoResumida}
            setDescricaoResumida={setDescricaoResumida}
          />
        );
    }
  };

  return (
    <Modal animationType="fade" transparent visible={visivel}>
      <View style={ModalStyles.overlay}>
        <View style={ModalStyles.modal}>
          <Text style={ModalStyles.titulo}>
            Criar{" "}
            {tp_post ? tp_post[0].toUpperCase() + tp_post.slice(1) : "Postagem"}
          </Text>
          <ScrollView style={{ flex: 1 }}>
            {renderHeaderUsuario()}
            {renderFormulario()}
          </ScrollView>

          <View style={{ marginTop: 15, marginBottom: -5 }}>
            {midiasSelecionadas.length > 0 && (
              <ScrollView horizontal>
                {midiasSelecionadas.map((uri, index) => (
                  <View
                    key={index}
                    style={{ position: "relative", marginRight: 8 }}
                  >
                    <Image
                      source={{ uri }}
                      style={{ width: 70, height: 70, borderRadius: 8 }}
                    />
                    <Pressable
                      onPress={() => removerImagem(uri)}
                      style={{
                        position: "absolute",
                        top: -2,
                        right: -2,
                        backgroundColor: "#f32",
                        width: 15,
                        height: 15,
                        borderRadius: 10,
                        justifyContent: "center",
                        alignItems: "center",
                      }}
                    >
                      <Text style={{ color: "#fff", fontSize: 12 }}>X</Text>
                    </Pressable>
                  </View>
                ))}
              </ScrollView>
            )}
          </View>
          <Pressable
            onPress={selecionarImagens}
            style={ModalStyles.botaoFechar}
          >
            <Text style={ModalStyles.textoBotao}>Selecionar Imagem</Text>
          </Pressable>
          <Pressable
            onPress={handleSubmitPostagem}
            style={ModalStyles.botaoPublicar}
          >
            <Text style={ModalStyles.textoBotaoPublicar}>Publicar</Text>
          </Pressable>
          <Pressable onPress={fecharModal} style={ModalStyles.botaoFechar}>
            <Text style={ModalStyles.textoBotao}>Fechar</Text>
          </Pressable>
        </View>
      </View>
    </Modal>
  );
}
