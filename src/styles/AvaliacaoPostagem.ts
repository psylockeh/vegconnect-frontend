import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  container: {
    padding: 8,
  },
  label: {
    fontSize: 16,
    fontWeight: "bold",
    marginTop: 15,
    marginBottom: 5,
  },
  containerEstrela: {
    flexDirection: "row",
    justifyContent: "flex-start",
    gap: 6,
  },
  media: {
    marginTop: 2,
    marginLeft: 8,
    fontSize: 14,
    color: "#333",
    minWidth: 30,
    textAlign: "left",
    fontWeight: "bold",
  },
  input: {
    borderWidth: 1,
    borderColor: "#B7B7A4",
    backgroundColor: "#F9F9F9",
    padding: 12,
    borderRadius: 8,
    marginBottom: 14,
    marginTop: 10,
    color: "#023D2E",
  },
  modalBackground: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.4)",
    justifyContent: "center",
    padding: 16,
  },
  modalContainer: {
    backgroundColor: "white",
    borderRadius: 8,
    padding: 20,
  },
  avaliacaoItem: {
    marginBottom: 12,
    padding: 12,
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 6,
    backgroundColor: '#f9f9f9',
  },
  textoBotao: {
    color: "#fff",
    fontSize: 15,
    fontWeight: "bold",
  },
  botaoAvaliacao: {
    backgroundColor: "#3C6E47",
    paddingVertical: 12,
    borderRadius: 10,
    alignItems: "center",
    height: 48,
    justifyContent: "center",
    width: "100%",
  },
  botaoCancelar: {
    marginTop: 10,
    alignItems: "center",
    backgroundColor: "#E8EFE8",
    paddingVertical: 10,
    borderRadius: 10,
  },
  textoBotaoCancelar: {
    color: "#2E4F36",
    fontWeight: "600",
    fontSize: 15,
  },

  avaliadorNome: {
    fontWeight: "bold",
    marginLeft: 6,
  },
  comentario: {
    fontSize: 14,
    color: "#333",
    marginTop: 4,
  },
  textoVazio: {
  textAlign: "center",
  color: "#888",
  marginTop: 10,
},
});

export default styles;
