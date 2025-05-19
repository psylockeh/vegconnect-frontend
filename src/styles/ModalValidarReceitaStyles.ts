import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.6)",
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },
  modal: {
    backgroundColor: "#fff",
    borderRadius: 12,
    padding: 20,
    width: "100%",
    maxHeight: "90%",
  },
  titulo: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 16,
    textAlign: "center",
  },
  textArea: {
    borderColor: "#ccc",
    borderWidth: 1,
    borderRadius: 8,
    padding: 10,
    minHeight: 100,
    marginBottom: 16,
    textAlignVertical: "top",
  },
  botao: {
    backgroundColor: "#4CAF50",
    padding: 10,
    borderRadius: 8,
    marginBottom: 12,
  },
  botaoTexto: {
    color: "#fff",
    fontWeight: "bold",
    textAlign: "center",
  },
  preview: {
    width: 100,
    height: 100,
    borderRadius: 8,
    marginRight: 10,
  },
  botoesAprovacao: {
    flexDirection: "row",
    justifyContent: "space-around",
    marginVertical: 12,
  },
  aprovar: {
    backgroundColor: "#4CAF50",
    padding: 10,
    borderRadius: 8,
    flex: 1,
    marginRight: 5,
  },
  reprovar: {
    backgroundColor: "#F44336",
    padding: 10,
    borderRadius: 8,
    flex: 1,
    marginLeft: 5,
  },
  textoAprovacao: {
    color: "#fff",
    textAlign: "center",
    fontWeight: "bold",
  },
  enviar: {
    backgroundColor: "#2196F3",
    padding: 12,
    borderRadius: 8,
    marginTop: 16,
  },
  enviarTexto: {
    color: "#fff",
    textAlign: "center",
    fontWeight: "bold",
  },
  fechar: {
    textAlign: "center",
    marginTop: 16,
    color: "#888",
    textDecorationLine: "underline",
  },
});
