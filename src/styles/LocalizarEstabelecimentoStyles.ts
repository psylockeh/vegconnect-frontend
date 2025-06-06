import { StyleSheet, Dimensions } from "react-native";

const windowWidth = Dimensions.get("window").width;

export const createLocalizarEstabelecimentoStyles = (
  sidebarWidth: number = windowWidth * 0.4,
  columnLayout: boolean = windowWidth < 768
) =>
  StyleSheet.create({
    container: {
      flex: 1,
      flexDirection: columnLayout ? "column" : "row",
      backgroundColor: "#003B2A",
    },
    sidebar: {
      width: columnLayout ? "100%" : sidebarWidth,
      padding: 24,
      backgroundColor: "#003B2A",
      borderRightWidth: 1,
      borderColor: "#1a1a1a",
      display: "flex",
      flexDirection: "column",
      gap: 12,
    },
  logo: {
    fontSize: 28,
    fontWeight: "700",
    color: "#fff",
    marginBottom: 16,
  },
  input: {
    backgroundColor: "#fff",
    borderRadius: 12,
    paddingHorizontal: 16,
    height: 44,
    color: "#333",
    fontSize: 14,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  filtroContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 10,
    marginBottom: 20,
  },
  filtroBotao: {
    backgroundColor: "#E0E0E0",
    paddingHorizontal: 14,
    paddingVertical: 6,
    borderRadius: 20,
  },
  filtroAtivo: {
    backgroundColor: "#2E7D32",
  },
  filtroTexto: {
    color: "#1B1B1B",
    fontWeight: "600",
    fontSize: 14,
  },
  resultadosLista: {
    flex: 1,
  },
  listItem: {
    backgroundColor: "#1e1e1e",
    padding: 14,
    borderRadius: 12,
    marginBottom: 10,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  itemTitle: {
    color: "#fff",
    fontWeight: "600",
    fontSize: 16,
    marginBottom: 4,
  },
  itemTipo: {
    color: "#8BC34A",
    fontSize: 13,
  },
  mapContainer: {
    flex: 1,
    padding: 10,
    paddingTop: 20,
    width: columnLayout ? "100%" : undefined,
    minHeight: columnLayout ? 300 : undefined,
  },
  map: {
    width: "100%",
    height: "100%",
    borderRadius: 12,
  },
  card: {
    position: "absolute",
    bottom: 20,
    left: 20,
    right: 20,
    backgroundColor: "#fff",
    borderRadius: 16,
    padding: 18,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 8,
    elevation: 5,
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: "700",
    color: "#2E7D32",
    marginBottom: 6,
  },
  cardTipo: {
    fontSize: 14,
    color: "#666",
    marginBottom: 6,
  },
  cardDesc: {
    fontSize: 14,
    color: "#444",
  },
  btn: {
    marginTop: 12,
    color: "#2E7D32",
    fontWeight: "600",
    fontSize: 14,
  },
});

export const styles = createLocalizarEstabelecimentoStyles();
