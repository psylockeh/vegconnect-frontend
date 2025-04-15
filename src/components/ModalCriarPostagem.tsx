import {
  View,
  Text,
  Modal,
  TextInput,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import React from "react";
import ModalStyles from "@/styles/ModalCriarPostagemStyles";

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
  const renderFormulario = () => {
    switch (tp_post) {
      case "receita":
        return (
          <View>
            <TextInput placeholder="Título" style={ModalStyles.input} />
            <TextInput
              placeholder="Nome da Receita"
              style={ModalStyles.input}
            />
            <TextInput
              placeholder="Ingredientes"
              style={ModalStyles.input}
              multiline
            />
            <TextInput
              placeholder="Instruções"
              style={ModalStyles.input}
              multiline
            />
            <TextInput
              placeholder="Tempo de Preparo"
              style={ModalStyles.input}
            />
            <TextInput placeholder="Categoria" style={ModalStyles.input} />
          </View>
        );

      case "evento":
        return (
          <View>
            <TextInput placeholder="Título" style={ModalStyles.input} />
            <TextInput
              placeholder="Descrição do Evento"
              style={ModalStyles.input}
              multiline
            />
            <TextInput placeholder="Data" style={ModalStyles.input} />
            <TextInput placeholder="Localização" style={ModalStyles.input} />
            <TextInput placeholder="Valor" style={ModalStyles.input} />
            <TextInput placeholder="Links" style={ModalStyles.input} />
          </View>
        );

      case "estabelecimento":
        return (
          <View>
            <TextInput
              placeholder="Nome do Comércio"
              style={ModalStyles.input}
            />
            <TextInput
              placeholder="Descrição"
              style={ModalStyles.input}
              multiline
            />
            <TextInput placeholder="Tipo de Comida" style={ModalStyles.input} />
            <TextInput
              placeholder="Horário de Abertura"
              style={ModalStyles.input}
            />
            <TextInput
              placeholder="Horário de Fechamento"
              style={ModalStyles.input}
            />
            <TextInput placeholder="CEP" style={ModalStyles.input} />
            <TextInput placeholder="Endereço" style={ModalStyles.input} />
          </View>
        );

      case "promocao":
        return (
          <View>
            <TextInput placeholder="Título" style={ModalStyles.input} />
            <TextInput
              placeholder="Conteúdo da Promoção"
              style={ModalStyles.input}
              multiline
            />
            <TextInput placeholder="Validade" style={ModalStyles.input} />
            <TextInput
              placeholder="Link da Promoção"
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

          <ScrollView style={{ flex: 1 }}>{renderFormulario()}</ScrollView>

          <TouchableOpacity onPress={fechar} style={ModalStyles.botaoFechar}>
            <Text style={ModalStyles.textoBotao}>Fechar</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
}
