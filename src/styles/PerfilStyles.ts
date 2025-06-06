import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F5FAF6",
    flexDirection: "row",
  },
  mainContent: {
    flex: 1,
    padding: 16,
    marginTop: -10,
    marginBottom: -10,
  },
  cardPerfil: {
    backgroundColor: "#FAFDFB",
    padding: 16,
    borderRadius: 16,
    marginBottom: 20,
    shadowColor: "#000",
    shadowOpacity: 0.05,
    shadowOffset: { width: 0, height: 3 },
    shadowRadius: 5,
    elevation: 3,
  },
  headerUsuario: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 12,
  },
  containerBotoes: {
    flexDirection: 'row',
    width: '100%',
    marginTop: 15,
  },
  botaoAlterarPerfil: {
    flex: 1,
    alignItems: "center",
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 10,
    marginRight: 10,
    borderWidth: 3,
    borderColor: '#3C6E47',
  },
  botaoGerenciarFavoritos: {
    flex: 1,
    alignItems: "center",
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 10,
    borderWidth: 3,
    borderColor: '#3C6E47',
  },
  botaoPressionado: {
    backgroundColor: '#94cca0',
    opacity: 0.9,
  },
  textoBotaoAlterar: {
    color: "#3C6E47",
    fontSize: 15,
    fontWeight: "bold",
  },
  avatar: {
    width: 110,
    height: 110,
    borderRadius: 60,
    marginTop: 10,
    marginBottom: 20,
    marginRight: 25,
    backgroundColor: "#E6F1EB",
  },
  nomeUsuario: {
    fontSize: 19,
    fontWeight: "bold",
    color: "#023D2E",
  },
  nickname: {
    color: "#666",
    fontSize: 15,
  },
  tpUser: {
    fontSize: 14,
    color: '#333',
    marginTop: 5,
  },

  info: {
    fontSize: 16,
    color: "#666",
    fontWeight: "bold",
    marginLeft: 3,
    marginTop: 15,
  },

  bio: {
    fontSize: 14,
    fontStyle: "italic",
    color: "#666",
    textAlign: "center",
    backgroundColor: "#F0F4F2",
    paddingVertical: 12,
    borderRadius: 10,
  },

  contInfoComercio: {
    textAlign: "center",
    backgroundColor: "#F0F4F2",
    paddingVertical: 12,
    borderRadius: 10,
    marginBottom: 15,
    paddingLeft: 20,
  },

  infoComer: {
    backgroundColor: "#F5FAF6",
    padding: 10,
    borderRadius: 10,
    fontSize: 16,
    marginRight: "5%",
    margin: 1,
    marginLeft: 10,
    borderWidth: 1,
    borderColor: "#D7E2DA",
    color: "#666",
    fontWeight: "bold",
  },

  infoContainer: {
    flexDirection: "row",
    alignItems: "center",
  },

  iconInfoCom: {
    fontSize: 25,
    color: "#666",
    marginRight: 1,
    marginTop: 15,
  },

  posteOpSelecionado: {
    borderBottomWidth: 2,
    borderBottomColor: "#3C6E47",
    color: "#3C6E47",
  },
});