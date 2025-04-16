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
    const novaPostagem: any = {
      tp_post,
      titulo,
      conteudo,
      data,
      localizacao,
      valor,
      links,
      nome_receita: nomeReceita,
      ingredientes,
      instrucoes,
      tempo_preparo: tempoPreparo,
      categoria,
      tipo_comida: tipoComida,
      horario_abertura: horarioAbertura,
      horario_fechamento: horarioFechamento,
      cep,
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

  const renderFormulario = () => {
    switch (tp_post) {
      case "receita":
        return (
          <View>
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
          </View>
        );

      case "evento":
        return (
          <View>
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
          </View>
        );

      case "estabelecimento":
        return (
          <View>
            <TextInput
              placeholder="Título"
              value={titulo}
              onChangeText={setTitulo}
              style={ModalStyles.input}
            />
            <TextInput
              placeholder="Descrição"
              value={conteudo}
              onChangeText={setConteudo}
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
              value={localizacao}
              onChangeText={setLocalizacao}
              style={ModalStyles.input}
            />
          </View>
        );

      case "promocao":
        return (
          <View>
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
          </View>
        );

      default:
        return (
          <View>
            <Text style={{ color: "#555" }}>
              Selecione um tipo de postagem para iniciar.
            </Text>
          </View>
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
            {renderFormulario()}

            {/* Miniaturas das imagens selecionadas */}
            <View
              style={{
                flexDirection: "row",
                flexWrap: "wrap",
                gap: 10,
                marginTop: 10,
                marginBottom: 16,
              }}
            >
              {midiasSelecionadas.map((uri, index) => (
                <View key={index} style={{ position: "relative" }}>
                  <Image
                    source={{ uri }}
                    style={{
                      width: 80,
                      height: 80,
                      borderRadius: 8,
                      borderWidth: 1,
                      borderColor: "#D6E4DD",
                    }}
                  />
                  <TouchableOpacity
                    style={{
                      position: "absolute",
                      top: -6,
                      right: -6,
                      backgroundColor: "#fff",
                      borderRadius: 10,
                      borderWidth: 1,
                      borderColor: "#ccc",
                      paddingHorizontal: 4,
                      paddingVertical: 2,
                      zIndex: 2,
                    }}
                    onPress={() =>
                      setMidiasSelecionadas((prev) =>
                        prev.filter((_, i) => i !== index)
                      )
                    }
                  >
                    <Text
                      style={{
                        fontSize: 12,
                        fontWeight: "bold",
                        color: "#D33",
                      }}
                    >
                      X
                    </Text>
                  </TouchableOpacity>
                </View>
              ))}
            </View>
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
