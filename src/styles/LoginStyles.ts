import { StyleSheet } from "react-native";

export const LoginStyles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },
  box: {
    width: "100%",
    maxWidth: 400,
    padding: 20,
    borderRadius: 8,
    backgroundColor: "#fff",
    elevation: 3,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold", // Corrigido
    textAlign: "center",
  },
  bemVindo: {
    fontSize: 16,
    textAlign: "center",
    marginBottom: 20,
  },
  textFieldLabel: {
    color: "#191d23",
    fontSize: 18,
  },
  input: {
    width: "100%",
    padding: 12,
    marginBottom: 10,
    borderRadius: 5,
    borderWidth: 1,
    borderColor: "#ccc",
  },
  forgotPasswordText: {
    color: "#166534",
    textAlign: "center",
    fontSize: 15,
    fontWeight: "bold",
  },
  error: {
    color: "red",
    fontSize: 14,
    marginTop: 10,
    textAlign: "center",
  },
  checkboxContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 20,
  },
  checkbox: {
    width: 20,
    height: 20,
    borderWidth: 2,
    borderColor: "#ccc",
    borderRadius: 4,
    justifyContent: "center",
    alignItems: "center",
  },
  checkboxMark: {
    fontSize: 18,
    color: "#166534",
  },
  checkboxLabel: {
    marginLeft: 10,
    fontSize: 16,
  },
  button: {
    marginTop: 20,
    padding: 15,
    backgroundColor: "#166534",
    borderRadius: 5,
    justifyContent: "center",
    alignItems: "center",
  },
  buttonText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "bold",
  },
  link: {
    marginTop: 20,
    textAlign: "center",
    color: "#166534",
    fontSize: 16,
  },
  loadingAnimation: {
    width: 50,
    height: 50,
  },
  footer: {
    position: "absolute",
    bottom: 10,
    left: 0,
    right: 0,
    flexDirection: "row",
    justifyContent: "space-around",
    backgroundColor: "#fff",
    paddingVertical: 10,
    borderTopWidth: 1,
    borderTopColor: "#ccc",
  },
  footerText: {
    fontSize: 16,
    color: "#166534",
  },
});
