import { StyleSheet } from "react-native";

const FeedStyles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "row",
    backgroundColor: "#FFF6DA",
  },

  // SIDEBAR
  sidebar: {
    width: 80,
    backgroundColor: "#023D2E",
    alignItems: "center",
    paddingVertical: 20,
    justifyContent: "space-between",
  },
  botaoSidebar: {
    backgroundColor: "#fff",
    width: 50,
    height: 50,
    borderRadius: 12,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 24,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  textoSidebar: {
    color: "#FFF",
    fontSize: 12,
    marginTop: 4,
    textAlign: "center",
  },
  iconeSidebar: {
    alignItems: "center",
    marginVertical: 16,
  },

  // CONTEÚDO PRINCIPAL
  mainContent: {
    flex: 1,
    padding: 16,
  },
  botaoCriar: {
    backgroundColor: "#049352",
    borderRadius: 8,
    padding: 12,
    alignItems: "center",
    marginBottom: 12,
  },
  textoBotao: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 16,
  },

  // CARD DE CRIAÇÃO
  cardCriarPost: {
    backgroundColor: "#FFF3C9",
    borderRadius: 16,
    padding: 16,
    marginBottom: 16,
  },
  headerUsuario: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 12,
  },
  avatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: "#ccc",
    marginRight: 12,
  },
  nomeUsuario: {
    fontWeight: "bold",
    fontSize: 14,
  },
  tipoUsuario: {
    fontSize: 12,
    color: "#666",
  },
  inputPost: {
    backgroundColor: "#fff",
    borderRadius: 8,
    padding: 12,
    marginBottom: 8,
  },
  ouLabel: {
    alignSelf: "center",
    color: "#999",
    marginVertical: 8,
  },
  botoesTipoPostagem: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 8,
    marginBottom: 12,
  },
  botaoTipo: {
    backgroundColor: "#f76d57",
    paddingVertical: 6,
    paddingHorizontal: 14,
    borderRadius: 20,
  },
  textoBotaoTipo: {
    color: "#fff",
    fontWeight: "bold",
  },
  iconesAcoes: {
    flexDirection: "row",
    justifyContent: "space-around",
    marginVertical: 12,
  },
  iconeFake: {
    fontSize: 20,
  },
  botaoPublicar: {
    backgroundColor: "#FFD700",
    padding: 10,
    borderRadius: 10,
    alignItems: "center",
  },
  textoBotaoPublicar: {
    color: "#000",
    fontWeight: "bold",
  },

  // CARD DE POSTAGEM
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
  tipoLabel: {
    color: "#000",
    fontWeight: "bold",
    fontSize: 13,
    marginVertical: 4,
    backgroundColor: "#ffeb3b",
    alignSelf: "flex-start",
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 4,
  },
  conteudo: {
    marginTop: 8,
    fontSize: 14,
    color: "#333",
  },
  rodapePost: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 10,
  },
  autor: {
    fontWeight: "600",
    fontSize: 13,
  },
  data: {
    fontSize: 12,
    color: "#999",
  },
});

export default FeedStyles;
