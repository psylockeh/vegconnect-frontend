import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  opcoesBotao: {
    position: "absolute",
    bottom: 30,
    right: 0,
    backgroundColor: "#fff",
    borderRadius: 5,
    padding: 5,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
    zIndex: 999,
    minWidth: 120,
  },
  exibirOpcoes: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
    paddingVertical: 5
  },
  botaoInteracao: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
  },
  textoInteracao: {
    fontSize: 13,
    color: "#555",
  },
});
