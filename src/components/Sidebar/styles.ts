import { StyleSheet } from "react-native";

export default StyleSheet.create({
  sidebar: {
    width: 80,
    backgroundColor: "#023D2E",
    paddingTop: 10,
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

  labelPost: {
    color: "black",
    fontSize: 12,
    marginTop: 4,
  
    padding: 10,
    textAlign: "center",
    fontWeight: "bold",
    backgroundColor: "#fff6da",
    borderRadius: 5,
    borderWidth: 1,
    borderColor: "#ccc",
  },

  labelPerson: {
    color: "#FFF",
    fontSize: 12,
    marginTop: 0,
    padding: 5,
    borderBottomWidth: 2,
    borderColor: "#ccc",
    width: 65,
    textAlign: "center",
  },

  labelMenu: {
    color: "#FFF",
    padding: 5,
    borderBottomWidth: 2,
    borderColor: "#ccc",
    width: 65,
    textAlign: "center",

  },

  label: {
    color: "#FFF",
    fontSize: 12,
    marginTop: 2,
    textAlign: "center",
  },
  reabrirBtn: {
    position: "absolute",
    left: 0,
    top: 0,
    backgroundColor: "#023D2E",
    borderTopRightRadius: 5,
    borderBottomRightRadius: 5,
    width: 50,
    height: 50,
    justifyContent: "center",
    alignItems: "center",
    zIndex: 10,
  },
});
