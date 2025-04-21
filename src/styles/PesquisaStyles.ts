import { StyleSheet } from "react-native";

export const pesquisarStyles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F5FAF6",
    flexDirection: "row",
  },
  mainContent: {
    flex: 1,
    padding: 16,
    marginBottom: -10,
  },
  inputPesquisar: {
    width: '100%',
    backgroundColor: "#F0F4F2",
    padding: 12,
    borderRadius: 10,
    marginBottom: 10,
    fontSize: 14,
    borderWidth: 1,
    borderColor: "#D7E2DA",
    color: "#333",
  },

  cardPesquisa: {
    backgroundColor: "#FAFDFB",
    padding: 16,
    marginTop: -10,
    marginBottom: 20,
    borderRadius: 16,
    shadowColor: "#000",
    shadowOpacity: 0.05,
    shadowOffset: { width: 0, height: 3 },
    shadowRadius: 5,
    elevation: 3,
  },
  menuFiltro: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 5,
    marginBottom: 2,
  },
  botaoFiltro: {
    backgroundColor: "#E6F1EB",
    paddingVertical: 8,
    paddingHorizontal: 10,
    borderRadius: 8,
  },
  botaoFiltroSelecionado: {
    backgroundColor: '#4CAF50',
    borderColor: '#4CAF50',
    color: "#FFF"
  },
  textoBotao: {
    fontSize: 14,
    fontWeight: "500",
    color: "#2E4F36",
  },
  carregando: {
    marginVertical: 16,
  },
  erro: {
    color: "#D32F2F",
    fontSize: 16,
    textAlign: "center",
    marginTop: 10,
    marginBottom: 8,
  },
  cardResultado: {
    padding: 16,
    backgroundColor: '#fff',
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#ddd',
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  textoResultado: {
    fontSize: 14,
    color: 'black',
    marginTop: 15,
  },
  headerUsuario: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 12,
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
  },
  nickname: {
    color: "#666",
    fontSize: 14,
  },
});


export default pesquisarStyles;