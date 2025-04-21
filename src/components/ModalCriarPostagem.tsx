import {
  View,
  Text,
  Modal,
  TextInput,
  TouchableOpacity,
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

type Props = {
  visivel: boolean;
  fechar: () => void;
  tp_post: string;
};

export default function ModalCriarPostagem({
  visivel,
  fechar,
  tp_post,
}: Props) {
  const [titulo, setTitulo] = useState("");
  const [conteudo, setConteudo] = useState("");
  const [data, setData] = useState("");
  const [localizacao, setLocalizacao] = useState("");
  const [valor, setValor] = useState("");
  const [links, setLinks] = useState("");
  const [nomeReceita, setNomeReceita] = useState("");
  const [ingredientes, setIngredientes] = useState("");
  const [instrucoes, setInstrucoes] = useState("");
  const [tempoPreparo, setTempoPreparo] = useState("");
  const [categoria, setCategoria] = useState("");
  const [tipoComida, setTipoComida] = useState("");
  const [horarioAbertura, setHorarioAbertura] = useState("");
  const [horarioFechamento, setHorarioFechamento] = useState("");
  const [cep, setCep] = useState("");
  const [midiasSelecionadas, setMidiasSelecionadas] = useState<string[]>([]);
  const [nomeComercio, setNomeComercio] = useState("");
  const [descricaoComercio, setDescricaoComercio] = useState("");
  const [endereco, setEndereco] = useState("");

  const { perfilUsuario } = useAuth();

  const selecionarImagens = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images as any,
      allowsMultipleSelection: true,
      quality: 0.7,
    });

    if (!result.canceled) {
      const uris = result.assets.map((asset) => asset.uri);
      setMidiasSelecionadas((prev) => [...prev, ...uris]);
    }
  };

  const handleSubmitPostagem = async () => {
    let conteudoFormatado = conteudo?.trim();

    if (tp_post === "receita" && !conteudoFormatado && instrucoes?.trim()) {
      conteudoFormatado = instrucoes.trim();
    }

    const novaPostagem: any = {
      tp_post,
      titulo,
      conteudo: conteudoFormatado,
      data,
      localizacao,
      valor,
      links,
      nome_receita: nomeReceita,
      ingredientes,
      instrucoes,
      temp_prep: tempoPreparo,
      categoria,
      tipo_comida: tipoComida,
      horario_abertura: horarioAbertura,
      horario_fechamento: horarioFechamento,
      cep,
      endereco,
      nome_comercio: nomeComercio,
      descricao_comercio: descricaoComercio,
    };

    const erro = validarPostagem(tp_post, novaPostagem);
    if (erro) return alert(`⚠️ ${erro}`);

    try {
      const midia_urls: string[] = [];

      for (const uri of midiasSelecionadas) {
        const uploadedUrl = await uploadImageToCloudinary(uri);
        if (uploadedUrl) midia_urls.push(uploadedUrl);
      }

      novaPostagem.midia_urls = midia_urls;

      await enviarPostagem(novaPostagem);
      Toast.show({
        type: "success",
        text1: "Postagem publicada!",
        text2: "Sua publicação foi enviada com sucesso. 🌱",
      });
      fechar();
      resetarCampos();
    } catch (err: any) {
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
    setIngredientes("");
    setInstrucoes("");
    setTempoPreparo("");
    setCategoria("");
    setTipoComida("");
    setHorarioAbertura("");
    setHorarioFechamento("");
    setCep("");
    setMidiasSelecionadas([]);
  };

  const fecharModal = () => {
    resetarCampos();
    fechar();
  };

  const renderHeaderUsuario = () => (
    <View style={ModalStyles.headerUsuario}>
      <Image
        source={{
          uri:
            perfilUsuario?.foto_perfil?.startsWith("http") &&
            perfilUsuario.foto_perfil
              ? perfilUsuario.foto_perfil
              : "https://res.cloudinary.com/demo/image/upload/v1682620184/default-profile.png",
        }}
        style={ModalStyles.avatar}
      />
      <View>
        <Text style={ModalStyles.nomeUsuario}>{perfilUsuario?.nome}</Text>
        <Text style={ModalStyles.tipoUsuario}>{perfilUsuario?.tp_user}</Text>
      </View>
    </View>
  );

  const renderFormulario = () => {
    switch (tp_post) {
      case "receita":
        return (
          <>
            <TextInput
              placeholder="Título"
              value={titulo}
              onChangeText={setTitulo}
              style={ModalStyles.input}
            />
            <TextInput
              placeholder="Nome da Receita"
              value={nomeReceita}
              onChangeText={setNomeReceita}
              style={ModalStyles.input}
            />
            <TextInput
              placeholder="Ingredientes"
              value={ingredientes}
              onChangeText={setIngredientes}
              multiline
              style={ModalStyles.input}
            />
            <TextInput
              placeholder="Instruções"
              value={instrucoes}
              onChangeText={setInstrucoes}
              multiline
              style={ModalStyles.input}
            />
            <TextInput
              placeholder="Tempo de Preparo"
              value={tempoPreparo}
              onChangeText={setTempoPreparo}
              style={ModalStyles.input}
            />
            <TextInput
              placeholder="Categoria"
              value={categoria}
              onChangeText={setCategoria}
              style={ModalStyles.input}
            />
          </>
        );

      case "evento":
        return (
          <>
            <TextInput
              placeholder="Título"
              value={titulo}
              onChangeText={setTitulo}
              style={ModalStyles.input}
            />
            <TextInput
              placeholder="Descrição do Evento"
              value={conteudo}
              onChangeText={setConteudo}
              multiline
              style={ModalStyles.input}
            />
            <TextInput
              placeholder="Data"
              value={data}
              onChangeText={setData}
              style={ModalStyles.input}
            />
            <TextInput
              placeholder="Localização"
              value={localizacao}
              onChangeText={setLocalizacao}
              style={ModalStyles.input}
            />
            <TextInput
              placeholder="Valor"
              value={valor}
              onChangeText={setValor}
              style={ModalStyles.input}
            />
            <TextInput
              placeholder="Links"
              value={links}
              onChangeText={setLinks}
              style={ModalStyles.input}
            />
          </>
        );

      case "estabelecimento":
        return (
          <>
            <TextInput
              placeholder="Nome do Comércio"
              value={nomeComercio}
              onChangeText={setNomeComercio}
              style={ModalStyles.input}
            />
            <TextInput
              placeholder="Descrição"
              value={descricaoComercio}
              onChangeText={setDescricaoComercio}
              multiline
              style={ModalStyles.input}
            />
            <TextInput
              placeholder="Tipo de Comida"
              value={tipoComida}
              onChangeText={setTipoComida}
              style={ModalStyles.input}
            />
            <TextInput
              placeholder="Horário de Abertura"
              value={horarioAbertura}
              onChangeText={setHorarioAbertura}
              style={ModalStyles.input}
            />
            <TextInput
              placeholder="Horário de Fechamento"
              value={horarioFechamento}
              onChangeText={setHorarioFechamento}
              style={ModalStyles.input}
            />
            <TextInput
              placeholder="CEP"
              value={cep}
              onChangeText={setCep}
              style={ModalStyles.input}
            />
            <TextInput
              placeholder="Endereço"
              value={endereco}
              onChangeText={setEndereco}
              style={ModalStyles.input}
            />
          </>
        );

      case "promocao":
        return (
          <>
            <TextInput
              placeholder="Título"
              value={titulo}
              onChangeText={setTitulo}
              style={ModalStyles.input}
            />
            <TextInput
              placeholder="Conteúdo da Promoção"
              value={conteudo}
              onChangeText={setConteudo}
              multiline
              style={ModalStyles.input}
            />
            <TextInput
              placeholder="Validade"
              value={data}
              onChangeText={setData}
              style={ModalStyles.input}
            />
            <TextInput
              placeholder="Link da Promoção"
              value={links}
              onChangeText={setLinks}
              style={ModalStyles.input}
            />
          </>
        );

      case "recado":
      default:
        return (
          <>
            <TextInput
              placeholder="Digite seu recado"
              value={conteudo}
              onChangeText={setConteudo}
              multiline
              style={ModalStyles.input}
            />
          </>
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

          <TouchableOpacity
            onPress={selecionarImagens}
            style={ModalStyles.botaoFechar}
          >
            <Text style={ModalStyles.textoBotao}>Selecionar Imagem</Text>
          </TouchableOpacity>

          <TouchableOpacity
            onPress={handleSubmitPostagem}
            style={ModalStyles.botaoPublicar}
          >
            <Text style={ModalStyles.textoBotaoPublicar}>Publicar</Text>
          </TouchableOpacity>

          <TouchableOpacity
            onPress={fecharModal}
            style={ModalStyles.botaoFechar}
          >
            <Text style={ModalStyles.textoBotao}>Fechar</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
}
