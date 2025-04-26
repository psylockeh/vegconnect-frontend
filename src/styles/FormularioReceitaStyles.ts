import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  inputPadrao: {
    borderWidth: 1,
    borderColor: "#ccc",
    padding: 10,
    borderRadius: 6,
    backgroundColor: "#f9f9f9",
    marginBottom: 10,
  },
  tituloBloco: {
    fontWeight: "bold",
    fontSize: 16,
    marginBottom: 8,
    marginTop: 16,
    color: "#3C6E47",
  },
  listaIngrediente: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
    marginBottom: 10,
  },
  secoesContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 8,
    marginBottom: 16,
  },
  botaoSecao: {
    backgroundColor: "#eee",
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: "#ccc",
  },
  botaoSecaoAtivo: {
    backgroundColor: "#3C6E47",
    borderColor: "#3C6E47",
  },
  textoSecao: {
    fontSize: 13,
    color: "#333",
  },
  textoSecaoAtivo: {
    color: "#fff",
    fontWeight: "bold",
  },
  botaoAdicionar: {
    backgroundColor: "#3C6E47",
    paddingVertical: 10,
    paddingHorizontal: 16,
    borderRadius: 6,
    marginBottom: 12,
    alignItems: "center",
  },
  textoBotao: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 14,
  },
  secaoTitulo: {
    fontSize: 15,
    fontWeight: "bold",
    color: "#3C6E47",
    marginTop: 10,
    marginBottom: 4,
  },
  listaItemTexto: {
    fontSize: 14,
    marginLeft: 8,
    marginBottom: 4,
  },
  pickerHora: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 6,
    padding: 10,
    backgroundColor: "#f9f9f9",
    marginBottom: 16,
  },
  categoriaContainer: {
    marginBottom: 20,
  },
  tagCategoria: {
    backgroundColor: "#DDB892",
    borderRadius: 20,
    paddingVertical: 6,
    paddingHorizontal: 12,
    marginRight: 6,
    marginBottom: 6,
  },
  tagCategoriaSelecionada: {
    backgroundColor: "#3C6E47",
  },
  tagCategoriaTexto: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 13,
  },
});
