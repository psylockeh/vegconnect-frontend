import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
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
  titulo: {
    fontSize: 22,
    fontWeight: "bold",
    marginBottom: 12,
    color: "#3C6E47",
    textAlign: "center",
  },
  itemLista: {
    backgroundColor: "rgba(60, 110, 71, 0.3)",
    padding: 14,
    borderRadius: 12,
    marginVertical: 6,
    shadowColor: "#000",
    shadowOpacity: 0.05,
    shadowOffset: { width: 0, height: 3 },
    shadowRadius: 5,
    elevation: 3,
  },
  listaNome: {
    fontSize: 20,
    color: "#333",
    fontWeight: "bold",
    marginBottom: 10,
    marginTop: 3,
    marginLeft: 15,
  },
  input: {
    backgroundColor: "#F0F4F2",
    padding: 12,
    borderRadius: 10,
    marginBottom: 10,
    fontSize: 14,
    borderWidth: 1,
    borderColor: "#D7E2DA",
    color: "#333",
  },
  botaoCriarSalvar: {
    backgroundColor: "#3C6E47",
    paddingVertical: 12,
    borderRadius: 10,
    alignItems: "center",
    height: 48,
    justifyContent: "center",
    width: "100%",
  },
  botaoTexto: {
    color: "#fff",
    fontSize: 15,
    fontWeight: "bold",
  },
  textoVazio: {
    color: "#D32F2F",
    fontSize: 14,
    textAlign: "center",
    marginTop: 8,
    marginBottom: 8,
  },
  containerModal: {
    flex: 1,
    backgroundColor: "#fff",
    padding: 16,
  },
  tituloModal: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 12,
    textAlign: "center",
    color: "#3C6E47",
  },
  postagem: {
    backgroundColor: "#f1f8e9",
    padding: 14,
    marginBottom: 10,
    borderRadius: 10,
  },
  postagemTitulo: {
    fontWeight: "bold",
    marginBottom: 4,
    fontSize: 16,
    color: "#33691e",
  },
  botaoFecharExcluir: {
    marginTop: 16,
    backgroundColor: "#e53935",
    paddingVertical: 12,
    borderRadius: 10,
    alignItems: "center",
    height: 48,
    justifyContent: "center",
    width: "100%",
  },


  alterarExcluir: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },

  modalAlterarExcluir: {
    width: "85%",
    backgroundColor: "#fff",
    borderRadius: 12,
    padding: 20,
    elevation: 5,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 4,
  },
});

export default styles;
