import { error } from "console";
import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  gerenciarMural: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginTop: 15,
    backgroundColor: '#F5FAF6',
    paddingVertical: 5,
    borderRadius: 10,
    marginHorizontal: 10,
    shadowColor: "#000",
    shadowOpacity: 0.05,
    shadowOffset: { width: 0, height: 3 },
    shadowRadius: 5,
    elevation: 3,
  },
  posteOpTexto: {
    color: '#333',
    marginLeft: 6,
    fontWeight: '600',
  },
  posteOpRow: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#F5FAF6",
    padding: 10,
    marginVertical: 5,
    borderRadius: 8,
    gap: 8,
  },
  posteOpSelecionadoRow: {
    backgroundColor: "#3C6E47",
  },
  textoMensagem: {
    color: "#D32F2F",
    fontSize: 16,
    textAlign: "center",
    marginTop: 15,
    marginBottom: 8,
  },
});
