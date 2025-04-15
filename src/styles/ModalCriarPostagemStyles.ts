import { StyleSheet } from "react-native";

export const ModalCriarPostagemStyles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.4)",
    justifyContent: "center",
    alignItems: "center",
  },
  modal: {
    width: "90%",
    backgroundColor: "#fff",
    borderRadius: 12,
    padding: 20,
  },
  titulo: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 12,
  },
  input: {
    backgroundColor: "#f5f5f5",
    padding: 10,
    marginVertical: 6,
    borderRadius: 8,
  },
  botaoFechar: {
    marginTop: 20,
    alignSelf: "flex-end",
  },
  textoBotao: {
    color: "#D33",
    fontWeight: "bold",
  },
});

export default ModalCriarPostagemStyles;
