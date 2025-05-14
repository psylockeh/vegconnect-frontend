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
    marginBottom: -10,
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
    backgroundColor: '#F5FAF6',
    paddingVertical: 5,
    borderRadius: 10,
    shadowColor: "#000",
    shadowOpacity: 0.05,
    shadowOffset: { width: 0, height: 3 },
    shadowRadius: 5,
    elevation: 3,
  },
  botaoFiltro: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#F5FAF6",
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 8,
    marginHorizontal: 5,
    marginVertical: 4,
    marginLeft: 10,
  },
  botaoFiltroSelecionado: {
    backgroundColor: "#3C6E47",
  },
  textoBotao: {
    color: "#333",
    fontWeight: "600",
  },
  textoBotaoSelecionado: {
    color: "#fff",
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
    borderWidth: 2,
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
    color: "#023D2E",
  },
  nickname: {
    color: "#666",
    fontSize: 14,
  },
  
});


export default pesquisarStyles;