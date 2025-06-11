import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  container: {
    padding: 8,
  },
  formularioContainer: {
    flex: 1,
    backgroundColor: "#F5FAF6",
    padding: 16,
    borderRadius: 8,
  },
  label: {
    fontSize: 16,
    fontWeight: "bold",
    marginTop: 15,
    marginBottom: 5,
  },
  labelTitulo: {
    fontSize: 22,
    fontWeight: "bold",
    marginBottom: 12,
    color: "#3C6E47",
    textAlign: "center",
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
  headerUsuario: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 10,
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
    marginLeft: 10,
  },
  nickname: {
    color: "#666",
    fontSize: 14,
    marginLeft: 10,
  },
  avatar: {
    width: 42,
    height: 42,
    borderRadius: 21,
    backgroundColor: "#ccc",
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
  sobrePosicao: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.4)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContainer: {
    width: '90%',
    backgroundColor: 'white',
    padding: 20,
    borderRadius: 12,
    elevation: 4,
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
    marginTop: 15,
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
    marginTop: 10,
  },
  textoVazio: {
    color: "#D32F2F",
    fontSize: 16,
    textAlign: "center",
    marginTop: 10,
    marginBottom: 8,
  },
});

export default styles;
