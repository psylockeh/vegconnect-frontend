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

  cardEditarPerfil: {
    backgroundColor: "#FAFDFB",
    padding: 10,
    borderRadius: 16,
    shadowColor: "#000",
    shadowOpacity: 0.05,
    shadowOffset: { width: 0, height: 3 },
    shadowRadius: 5,
    elevation: 3,
  },
  headerUsuario: {
    flexDirection: "column",
    marginBottom: 12,
  },
  avatarContainer: {
    alignSelf: "center",
    position: "relative",
    marginBottom: 10,
  },
  avatar: {
    width: 120,
    height: 120,
    borderRadius: 60,
    marginBottom: 15,
    backgroundColor: "#E6F1EB",
  },
  label: {
    fontSize: 16,
    fontWeight: "bold",
    marginTop: 10,
    marginBottom: 5,
    color: "#333",
  },
  inputEditarPerfil: {
    backgroundColor: "#F0F4F2",
    padding: 12,
    borderRadius: 10,
    marginBottom: 10,
    fontSize: 14,
    borderWidth: 1,
    borderColor: "#D7E2DA",
    color: "#333",
  },
  botaoSalvarPerfil: {
    marginTop: 16,
    backgroundColor: "#3C6E47",
    paddingVertical: 12,
    borderRadius: 10,
    alignItems: "center",
  },
  textoBotaoSalvar: {
    color: "#fff",
    fontSize: 15,
    fontWeight: "bold",
  },
});