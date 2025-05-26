import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fdfdfd",
    padding: 16,
  },
  titulo: {
    fontSize: 22,
    fontWeight: "bold",
    marginBottom: 12,
    color: "#333",
    textAlign: "center",
  },
  itemLista: {
    backgroundColor: "#e0f7fa",
    padding: 14,
    borderRadius: 12,
    marginVertical: 6,
  },
  listaNome: {
    fontSize: 16,
    color: "#00796b",
    fontWeight: "bold",
  },
  input: {
    borderWidth: 1,
    borderColor: "#bbb",
    borderRadius: 10,
    paddingHorizontal: 12,
    paddingVertical: 8,
    marginTop: 14,
    fontSize: 16,
  },
  botaoCriar: {
    backgroundColor: "#00796b",
    padding: 12,
    borderRadius: 10,
    marginTop: 10,
    alignItems: "center",
  },
  botaoTexto: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 16,
  },
  textoVazio: {
    marginTop: 20,
    fontSize: 16,
    color: "#888",
    textAlign: "center",
  },
  containerModal: {
    flex: 1,
    backgroundColor: "#fff",
    padding: 16,
  },
  tituloModal: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 12,
    textAlign: "center",
    color: "#00796b",
  },
  postagem: {
    backgroundColor: "#f1f8e9",
    padding: 14,
    marginBottom: 10,
    borderRadius: 10,
  },
  postagemTitulo: {
    fontWeight: "bold",
    marginBottom: 4,
    fontSize: 16,
    color: "#33691e",
  },
  botaoFechar: {
    backgroundColor: "#b71c1c",
    padding: 12,
    borderRadius: 10,
    marginTop: 20,
    alignItems: "center",
  },
});

export default styles;
