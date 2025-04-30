import { StyleSheet } from "react-native";

const EventoStyles = StyleSheet.create({
  inputPadrao: {
    borderWidth: 1,
    borderColor: "#ccc",
    backgroundColor: "#f8f8f8",
    borderRadius: 8,
    padding: 12,
    marginBottom: 12,
    fontSize: 14,
    color: "#023D2E",
  },
  tituloBloco: {
    fontWeight: "bold",
    fontSize: 15,
    marginBottom: 6,
    color: "#023D2E",
  },
  blocoPadrao: {
    backgroundColor: "#f1f5f2",
    padding: 12,
    borderRadius: 10,
    marginBottom: 16,
  },
  secaoResumo: {
    backgroundColor: "#fff8dc",
    padding: 10,
    borderRadius: 10,
    marginBottom: 16,
  },
  secaoResumoTexto: {
    fontWeight: "bold",
    color: "#023D2E",
    fontSize: 15,
    marginBottom: 6,
  },
  tagCategoriaTexto: {
    fontSize: 13,
    color: "#fff",
  },
  tagCategoria: {
    backgroundColor: "#89A28E",
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 16,
    margin: 4,
  },
  tagCategoriaSelecionada: {
    backgroundColor: "#4D7F63",
  },
  checkboxLinha: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 10,
  },
  checkboxTexto: {
    marginLeft: 8,
    fontSize: 14,
    color: "#023D2E",
  },
});

export default EventoStyles;
