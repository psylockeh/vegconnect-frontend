import { StyleSheet } from "react-native";

const FeedStyles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "row",
    backgroundColor: "#FFF6DA",
  },
  sidebar: {
    width: 80,
    backgroundColor: "#023D2E",
    alignItems: "center",
    paddingVertical: 20,
  },
  mainContent: {
    flex: 1,
    padding: 16,
  },
  botaoCriar: {
    paddingVertical: 10,
    paddingHorizontal: 24,
    borderRadius: 30,
    alignSelf: "flex-start",
    marginBottom: 16,
    overflow: "hidden",
  },

  textoBotao: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 15,
  },

  filtro: {
    marginBottom: 12,
    backgroundColor: "#fff",
    borderRadius: 8,
    paddingHorizontal: 8,
    height: 40,
    justifyContent: "center",
  },
  cardPost: {
    backgroundColor: "#FFF3C9",
    borderRadius: 16,
    padding: 16,
    marginBottom: 16,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  titulo: {
    fontWeight: "bold",
    fontSize: 16,
    color: "#333",
  },
  subtitulo: {
    color: "#666",
    fontSize: 14,
    marginTop: 4,
  },
  conteudo: {
    marginTop: 8,
    fontSize: 14,
    color: "#333",
  },
  data: {
    fontSize: 12,
    color: "#999",
    marginTop: 8,
  },

  tipoLabel: {
    backgroundColor: "#FFE66D",
    alignSelf: "flex-start",
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 6,
    fontWeight: "bold",
    fontSize: 13,
    marginTop: 8,
  },
  rodapePost: {
    marginTop: 16,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  autor: {
    fontSize: 14,
    color: "#555",
    fontWeight: "500",
  },
  cardCriacao: {
    backgroundColor: "#FFF3C9",
    borderRadius: 20,
    padding: 16,
    marginBottom: 16,
  },
  headerUsuario: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 12,
  },
  fotoPerfilPlaceholder: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: "#FFD23F",
    marginRight: 12,
  },
  nomeUsuario: {
    fontWeight: "bold",
    fontSize: 16,
  },
  tipoUsuario: {
    color: "#555",
  },
  inputFake: {
    fontSize: 16,
    color: "#999",
    borderBottomWidth: 1,
    borderBottomColor: "#ccc",
    paddingVertical: 8,
  },
  ou: {
    textAlign: "center",
    marginVertical: 8,
    color: "#666",
  },
  botoesTipos: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 10,
    justifyContent: "space-between",
    marginVertical: 10,
  },
  botaoTipo: {
    backgroundColor: "#FF5E3A",
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 30,
  },
  textoTipo: {
    color: "#fff",
    fontWeight: "bold",
  },
  rodape: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: 16,
  },
  iconesAnexo: {
    flexDirection: "row",
    gap: 12,
  },
  botaoPublicar: {
    backgroundColor: "#ddd",
    paddingHorizontal: 20,
    paddingVertical: 8,
    borderRadius: 16,
  },
  textoPublicar: {
    color: "#555",
    fontWeight: "bold",
  },

  headerCriacao: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 12,
  },

  avatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: "#FFD233",
    marginRight: 12,
  },

  inputCriacao: {
    borderBottomWidth: 1,
    borderBottomColor: "#ccc",
    fontSize: 16,
    paddingVertical: 8,
    color: "#444",
    marginBottom: 16,
  },

  linhaOu: {
    alignSelf: "center",
    color: "#666",
    marginVertical: 8,
  },

  botoesTiposContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
    marginBottom: 16,
  },

  botoesMidiaContainer: {
    flexDirection: "row",
    marginTop: 4,
    marginBottom: 20,
    gap: 16,
  },

  botaoMidia: {
    padding: 6,
  },

  rodapeCriacao: {
    flexDirection: "row",
    justifyContent: "flex-end",
    alignItems: "center",
  },

  cardCriarPost: {
    backgroundColor: "#FFF3C9",
    borderRadius: 16,
    padding: 16,
    marginBottom: 20,
    width: "92%",
    alignSelf: "center",
    maxWidth: 600,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },

  inputPost: {
    borderBottomWidth: 1,
    borderBottomColor: "#ccc",
    paddingVertical: 8,
    marginTop: 8,
    marginBottom: 12,
    fontSize: 16,
    color: "#444",
  },

  ouLabel: {
    textAlign: "center",
    color: "#777",
    marginVertical: 6,
    fontSize: 14,
  },

  botoesTipoPostagem: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
    gap: 8,
    marginBottom: 12,
  },

  textoBotaoTipo: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 14,
  },

  iconeFake: {
    fontSize: 20,
    marginRight: 12,
  },

  textoBotaoPublicar: {
    fontWeight: "bold",
    color: "#444",
    fontSize: 14,
  },

  iconesAcoes: {
    flexDirection: "row",
    justifyContent: "flex-start",
    alignItems: "center",
    gap: 16,
    marginVertical: 12,
  },
});

export default FeedStyles;
