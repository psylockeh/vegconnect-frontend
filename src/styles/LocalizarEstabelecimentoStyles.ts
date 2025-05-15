import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "row",
  },
  sidebar: {
    width: "35%",
    backgroundColor: "#043927",
    padding: 16,
  },
  logo: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#fff",
    marginBottom: 12,
  },
  input: {
    backgroundColor: "#1a1a1a",
    color: "#fff",
    padding: 10,
    borderRadius: 8,
    fontSize: 14,
    marginBottom: 12,
  },
  filtroContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 8,
    marginBottom: 12,
  },
  filtroBotao: {
    backgroundColor: "#116b45",
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 20,
    marginRight: 6,
    marginBottom: 6,
  },
  filtroAtivo: {
    backgroundColor: "#5aff91",
  },
  filtroTexto: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 12,
    textTransform: "capitalize",
  },
  resultadosLista: {
    flex: 1,
  },
  listItem: {
    backgroundColor: "#1a1a1a",
    padding: 10,
    borderRadius: 6,
    marginBottom: 8,
  },
  itemTitle: {
    color: "#fff",
    fontWeight: "bold",
  },
  itemTipo: {
    color: "#b5ffcb",
    fontSize: 12,
  },
  mapContainer: {
    width: "65%",
    height: "100%",
    borderLeftWidth: 2,
    borderLeftColor: "#065c41",
  },
  map: {
    width: "100%",
    height: "100%",
  },
  card: {
    position: "absolute",
    bottom: 30,
    right: 30,
    backgroundColor: "#fff",
    padding: 16,
    borderRadius: 10,
    width: 280,
    elevation: 5,
  },
  cardTitle: {
    fontWeight: "bold",
    fontSize: 16,
    marginBottom: 4,
  },
  cardTipo: {
    color: "#116b45",
    marginBottom: 4,
  },
  cardDesc: {
    color: "#444",
    fontSize: 13,
  },
  btn: {
    marginTop: 10,
    color: "#007bff",
    textDecorationLine: "underline",
  },
});
