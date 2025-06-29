import { StyleSheet } from "react-native";

const feedStyles = StyleSheet.create({
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
  cardCriarPost: {
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
  avatar: {
    width: 50,
    height: 50,
    borderRadius: 30,
    marginRight: 30,
    backgroundColor: "#E6F1EB",
  },
  nomeUsuario: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#023D2E",
  },
  tipoUsuario: {
    fontSize: 13,
    color: "#6C8A72",
    marginTop: 5,
  },
  inputPost: {
    backgroundColor: "#F0F4F2",
    padding: 12,
    borderRadius: 10,
    marginBottom: 10,
    fontSize: 14,
    borderWidth: 1,
    borderColor: "#D7E2DA",
    color: "#333",
  },
  ouLabel: {
    textAlign: "center",
    fontSize: 14,
    color: "#6B6B6B",
    marginVertical: 6,
  },
  botoesTipoPostagem: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
    gap: 10,
    marginVertical: 8,
  },
  botaoTipo: {
    backgroundColor: "#E8F5E9",
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 6,
  },
  textoBotaoTipo: {
    color: "#2E7D32",
    fontWeight: "500",
  },
  iconesAcoes: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 12,
    paddingHorizontal: 10,
  },
  botaoPublicar: {
    paddingVertical: 6,
    paddingHorizontal: 26,
    borderRadius: 6,
    backgroundColor: "#3C6E47",
    alignSelf: "flex-end",
    marginTop: 12,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 2,
  },

  textoBotaoPublicar: {
    color: "#fff",
    fontWeight: "600",
    fontSize: 14,
    textAlign: "center",
  },

  cardPost: {
    backgroundColor: "#fff",
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    shadowColor: "#000",
    shadowOpacity: 0.03,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 3,
    elevation: 2,
  },
  titulo: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#2E4F36",
    marginBottom: 4,
  },
  tipoLabel: {
    fontSize: 12,
    color: "#6C8A72",
    marginBottom: 6,
  },
  conteudo: {
    fontSize: 14,
    color: "#333",
    marginBottom: 10,
  },
  rodapePost: {
    flexDirection: "row",
    justifyContent: "space-between",
    borderTopWidth: 1,
    borderTopColor: "#EEE",
    paddingTop: 8,
  },
  autor: {
    fontSize: 12,
    color: "#6B6B6B",
  },
  data: {
    fontSize: 12,
    color: "#6B6B6B",
  },

  cardLinhaPostagem: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 8,
  },
  input: {
    color: "#333",
    width: "100%",
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 8,
    padding: 12,
    fontSize: 16,
    backgroundColor: "#fff",
    minHeight: 100,
    textAlignVertical: "top",
  },
  inputRecado: {
    borderColor: "#ccc",
    borderWidth: 1,
    borderRadius: 10,
    padding: 10,
    fontSize: 14,
    minHeight: 100,
    textAlignVertical: "top",
    backgroundColor: "#fff",
    marginTop: 12,
  },
});

export default feedStyles;
