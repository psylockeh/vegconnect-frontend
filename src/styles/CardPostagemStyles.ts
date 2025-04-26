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
    width: 40,
    height: 40,
    borderRadius: 20,
    marginRight: 10,
  },
  nomeUsuario: {
    fontWeight: "bold",
    fontSize: 16,
  },
  nickname: {
    color: "#666",
    fontSize: 14,
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
  listaItemTexto: {
    fontSize: 14,
    color: "#333",
    lineHeight: 20,
    marginLeft: 8,
    marginBottom: 4,
  },
  tipoUsuario: {
    fontSize: 12,
    color: "#777",
    marginBottom: 4,
  },

  categoriaContainer: {
    marginTop: 8,
    flexWrap: "wrap",
    flexDirection: "row",
    gap: 4,
  },

  categoriaTags: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 6,
    marginTop: 4,
  },

  tag: {
    backgroundColor: "#3C6E47",
    color: "#fff",
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 16,
    fontSize: 12,
    marginRight: 4,
    marginBottom: 4,
  },
  tagsContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 6,
    marginTop: 4,
    marginBottom: 8,
  },
});
