import { StyleSheet } from "react-native";

export default StyleSheet.create({
  sidebar: {
    width: 80,
    backgroundColor: "#023D2E",
    paddingTop: 30,
    paddingBottom: 20,
    alignItems: "center",
  },
  toggleBtn: {
    marginBottom: 20,
  },
  menu: {
    flex: 1,
    alignItems: "center",
  },
  menuItem: {
    marginBottom: 20,
    alignItems: "center",
  },
  label: {
    color: "#FFF",
    fontSize: 12,
    marginTop: 4,
    textAlign: "center",
  },
  reabrirBtn: {
    position: "absolute",
    left: 0,
    top: 40,
    backgroundColor: "#023D2E",
    borderTopRightRadius: 10,
    borderBottomRightRadius: 10,
    width: 24,
    height: 60,
    justifyContent: "center",
    alignItems: "center",
    zIndex: 10,
  },
});
