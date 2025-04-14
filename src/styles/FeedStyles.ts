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
});

export default FeedStyles;
