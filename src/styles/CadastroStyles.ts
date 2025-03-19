import { StyleSheet } from "react-native";

export const CadastroStyles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#F5F5F5",
    paddingHorizontal: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
    color: "#333",
  },
  input: {
    width: "100%",
    height: 50,
    backgroundColor: "#FFF",
    borderRadius: 8,
    paddingHorizontal: 15,
    marginBottom: 15,
    fontSize: 16,
    borderWidth: 1,
    borderColor: "#DDD",
  },
  picker: {
    width: "100%",
    height: 50,
    backgroundColor: "#FFF",
    borderRadius: 8,
    marginBottom: 15,
  },
  button: {
    width: "100%",
    height: 50,
    backgroundColor: "#2f95dc",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 8,
  },
  buttonText: {
    color: "#FFF",
    fontSize: 18,
    fontWeight: "bold",
  },
  link: {
    marginTop: 15,
    fontSize: 16,
    color: "#2f95dc",
    textDecorationLine: "underline",
  },
  error: {
    color: "red",
    marginBottom: 10,
  },
  dateButton: {
    width: "100%",
    height: 50,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#FFF",
    borderRadius: 8,
    marginBottom: 15,
    borderWidth: 1,
    borderColor: "#DDD",
  },
  dateButtonText: {
    fontSize: 16,
    color: "#333",
  },

  infoText: {
    fontSize: 14,
    textAlign: "center",
    marginBottom: 10,
    color: "#555",
  },
  label: {
    fontSize: 16,
    fontWeight: "500",
    marginBottom: 10,
    color: "#555",
  },
  success: {
    fontSize: 16,
    color: "green",
    marginVertical: 10,
  },
});
