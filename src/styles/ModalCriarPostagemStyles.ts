import { StyleSheet } from "react-native";

const ModalCriarPostagemStyles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.35)", // fundo levemente escurecido
    justifyContent: "center",
    alignItems: "center",
  },
  modal: {
    width: "92%",
    maxHeight: "92%",
    backgroundColor: "#FAFDFB", // tom claro vegetal
    borderRadius: 20,
    padding: 22,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 6,
    elevation: 8, // Android shadow
  },
  titulo: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#2E4F36", // verde escuro elegante
    marginBottom: 14,
    textAlign: "center",
  },
  input: {
    backgroundColor: "#F0F4F2",
    paddingVertical: 10,
    paddingHorizontal: 14,
    borderRadius: 10,
    marginBottom: 10,
    fontSize: 15,
    borderWidth: 1,
    borderColor: "#D8E4DC",
    color: "#333",
  },
  botaoPublicar: {
    backgroundColor: "#3C6E47", // verde principal do projeto
    paddingVertical: 14,
    borderRadius: 10,
    marginTop: 16,
    alignItems: "center",
  },
  textoBotaoPublicar: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 16,
    textAlign: "center",
  },
  botaoFechar: {
    marginTop: 10,
    alignItems: "center",
    backgroundColor: "#E8EFE8",
    paddingVertical: 10,
    borderRadius: 10,
  },
  textoBotao: {
    color: "#2E4F36",
    fontWeight: "600",
    fontSize: 15,
  },
});

export default ModalCriarPostagemStyles;
