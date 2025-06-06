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
  botaoValidar: {
    backgroundColor: "#4CAF50",
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 12,
    alignSelf: "center",
    marginTop: 16,
    marginBottom: 24,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 3,
  },

  botaoTexto: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
    textAlign: "center",
  },

  seloContainer: {
    backgroundColor: "#E9C46A",
    padding: 10,
    borderRadius: 6,
    marginVertical: 12,
    alignItems: "center",
  },
  seloTexto: {
    fontWeight: "bold",
    color: "#264653",
    fontSize: 16,
  },
  verificadoPor: {
    fontSize: 12,
    color: "#666",
    marginTop: 2,
    fontStyle: "italic",
  },
  verificadoPorTexto: {
    fontSize: 14,
    color: "#355E3B",
    fontWeight: "600",
  },
  tagWrapper: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 8,
    gap: 6,
  },

  verificadoWrapper: {
    flexDirection: "row",
    alignItems: "center",
    marginLeft: 8,
  },

  verificadoIcon: {
    width: 18,
    height: 18,
    marginRight: 4,
  },

  verificadoTexto: {
    fontSize: 13,
    color: "#444",
    fontStyle: "italic",
  },

  tagTipoPost: {
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 12,
    alignSelf: "flex-start",
    marginTop: 8,
    backgroundColor: "#2E7D32",
  },

  tagTipoText: {
    fontSize: 13,
    fontWeight: "bold",
    color: "#fff",
  },
});
