import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  card: {
    borderWidth: 2,
    borderRadius: 12,
    padding: 14,
    marginVertical: 10,
    backgroundColor: "#fff",
    elevation: 2,
  },
  headerUsuario: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 10,
  },
  fotoPerfil: {
    width: 50,
    height: 50,
    borderRadius: 30,
    marginRight: 30,
    backgroundColor: "#E6F1EB",
  },
  nomeUsuario: {
    fontWeight: "bold",
    fontSize: 16,
    color: "#023D2E",
    marginLeft: 10,
  },
  nickname: {
    color: "#666",
    fontSize: 14,
    marginLeft: 10,
  },
  tpUser: {
    fontSize: 14,
    color: "black",
    marginTop: 10,
  },
  tagTipoPost: {
    alignSelf: "flex-start",
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 20,
    marginBottom: 8,
  },
  tagTipoText: {
    color: "#fff",
    fontSize: 12,
    fontWeight: "bold",
  },
  titulo: {
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 6,
    color: "#333",
  },
  subTitulo: {
    fontSize: 15,
    fontWeight: "600",
    marginVertical: 4,
    color: "#444",
  },
  conteudo: {
    fontSize: 14,
    marginBottom: 6,
    color: "#555",
  },
  campo: {
    fontSize: 13,
    color: "#444",
    marginBottom: 4,
  },
  data: {
    fontSize: 12,
    color: "#888",
    marginTop: 8,
  },
  interacoes: {
    flexDirection: "row",
    justifyContent: "space-around",
    marginTop: 10,
    borderTopWidth: 1,
    borderTopColor: "#eee",
    paddingTop: 10,
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
  localizacao: {
    fontSize: 13,
    color: "#444",
    marginTop: 4,
  },
  valor: {
    fontSize: 13,
    color: "#444",
    marginTop: 2,
  },
  links: {
    fontSize: 13,
    color: "#2563eb",
    marginTop: 2,
    textDecorationLine: "underline",
  },
  listaItemTexto: {
    fontSize: 13,
    color: "#444",
    marginBottom: 4,
  },
  descricaoResumida: {
    fontSize: 14,
    color: "#555",
    marginBottom: 6,
  },
  verificadoPor: {
    fontSize: 12,
    color: "#666",
    marginTop: 2,
    fontStyle: "italic",
  },
  tagWrapper: {
    flexDirection: "row",
    alignItems: "center",
    flexWrap: "wrap",
    marginTop: 4,
    marginBottom: 4,
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
    fontSize: 12,
    color: "#4B4B4B",
    fontStyle: "italic",
  },
});
