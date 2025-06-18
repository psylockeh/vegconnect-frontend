import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.6)",
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },
  modal: {
    backgroundColor: "#fff",
    borderRadius: 20,
    padding: 24,
    width: "100%",
    maxHeight: "92%",
    elevation: 6,
  },
  titulo: {
    fontSize: 22,
    fontWeight: "bold",
    marginBottom: 20,
    textAlign: "center",
    color: "#222",
  },
  subtitulo: {
    fontSize: 16,
    fontWeight: "600",
    marginBottom: 10,
    color: "#444",
  },
  secao: {
    backgroundColor: "#F7F9FB",
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 2,
  },
  textArea: {
    borderColor: "#E0E0E0",
    borderWidth: 1,
    borderRadius: 12,
    padding: 14,
    minHeight: 100,
    fontSize: 14,
    backgroundColor: "#FBFBFB",
    textAlignVertical: "top",
  },
  botao: {
    backgroundColor: "#2ECC71",
    paddingVertical: 14,
    borderRadius: 12,
    marginBottom: 16,
  },
  botaoTexto: {
    color: "#fff",
    fontWeight: "600",
    textAlign: "center",
    fontSize: 16,
  },
  preview: {
    width: 90,
    height: 90,
    borderRadius: 10,
    marginRight: 10,
    marginVertical: 6,
  },
  botoesAprovacao: {
    flexDirection: "row",
    justifyContent: "space-between",
    gap: 12,
    marginTop: 20,
  },
  aprovar: {
    backgroundColor: "#27AE60",
    paddingVertical: 14,
    borderRadius: 12,
    flex: 1,
    alignItems: "center",
  },
  reprovar: {
    backgroundColor: "#E74C3C",
    paddingVertical: 14,
    borderRadius: 12,
    flex: 1,
    alignItems: "center",
  },
  textoAprovacao: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 15,
  },
  enviar: {
    backgroundColor: "#2ECC71",
    paddingVertical: 14,
    borderRadius: 10,
    marginTop: 16,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },

  enviarTexto: {
    color: "#fff",
    fontWeight: "600",
    textAlign: "center",
    fontSize: 16,
  },
  fechar: {
    textAlign: "center",
    marginTop: 20,
    color: "#888",
    textDecorationLine: "underline",
    fontSize: 14,
  },
  botoesLinha: {
    flexDirection: "row",
    justifyContent: "space-between",
    gap: 12,
    marginTop: 12,
  },

  toggleBotao: {
    flex: 1,
    paddingVertical: 10,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: "#ccc",
    alignItems: "center",
    backgroundColor: "#f8f8f8",
  },

  toggleAtivoVerde: {
    backgroundColor: "#DFF5E1",
    borderColor: "#27AE60",
  },

  toggleAtivoVermelho: {
    backgroundColor: "#FDE2E2",
    borderColor: "#E74C3C",
  },

  toggleTexto: {
    fontWeight: "600",
    color: "#333",
  },

  botaoPrincipal: {
    marginTop: 20,
    backgroundColor: "#3498DB",
    paddingVertical: 14,
    borderRadius: 10,
    alignItems: "center",
  },

  botaoSecundario: {
    backgroundColor: "#f0f0f0",
    paddingVertical: 10,
    borderRadius: 10,
    marginBottom: 12,
    alignItems: "center",
  },

  botaoSecundarioTexto: {
    fontWeight: "500",
    color: "#333",
  },
});
