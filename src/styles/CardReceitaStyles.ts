import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  imagemCapa: {
    width: "100%",
    height: 200,
    borderRadius: 12,
    marginBottom: 12,
  },
  topicos: {
    flexDirection: "row",
    justifyContent: "space-between",
    backgroundColor: "#E6F1EB",
    borderRadius: 8,
    padding: 12,
    marginBottom: 16,
  },
  itemTopico: {
    alignItems: "center",
    flex: 1,
  },
  tituloTopico: {
    fontSize: 12,
    fontWeight: "bold",
    color: "#3C6E47",
    marginBottom: 4,
  },
  valorTopico: {
    fontSize: 14,
    color: "#222",
  },
  tituloSessao: {
    fontWeight: "bold",
    fontSize: 16,
    marginTop: 20,
    marginBottom: 8,
    color: "#3C6E47",
  },
  itemTexto: {
    fontSize: 14,
    marginBottom: 6,
    color: "#444",
    lineHeight: 22,
  },
  tituloSubSessao: {
    fontWeight: "bold",
    fontSize: 16,
    marginTop: 20,
    marginBottom: 8,
    color: "#3C6E47",
  },
  carrosselImagem: {
    width: 320,
    height: 200,
    borderRadius: 8,
    marginRight: 10,
  },
});
