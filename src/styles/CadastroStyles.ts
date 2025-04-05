import { StyleSheet } from "react-native";

export const CadastroStyles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#f3f4f6",
    padding: 20,
    flexGrow: 1,
  },
  box: {
    backgroundColor: "white",
    padding: 30,
    borderRadius: 10,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    width: "100%",
    maxWidth: 400,
  },

  logo: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#166534",
  },

  title: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#166534",
  },

  textoInicio: {
    fontSize: 15,
    color: "#166534",
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
    borderColor: "#DDD",
  },

  button: {
    backgroundColor: "#166534",
    padding: 15,
    borderRadius: 8,
    alignItems: "center",
    marginTop: 10,
    width: "100%",
  },
  buttonText: {
    color: "#FFF",
    fontSize: 18,
  },
  link: {
    color: "#166534",
    fontSize: 18,
    textAlign: "center",
    marginTop: 10,
  },
  error: {
    color: "red",
    fontSize: 14,
    textAlign: "center",
    marginBottom: 10,
  },
  dateButton: {
    width: "100%",
    height: 50,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#166534",
    borderRadius: 8,
    marginBottom: 15,
    borderWidth: 1,
    borderColor: "#DDD",
  },
  dateButtonText: {
    color: "#191d23",
    fontSize: 18,
  },

  infoText: {
    fontSize: 18,
    color: "#191d23",
  },
  label: {
    fontSize: 18,
    color: "#191d23",
  },
  success: {
    fontSize: 16,
    color: "green",
    marginVertical: 10,
  },
  scrollViewContent: {
    flexGrow: 1,
    justifyContent: "center",
    padding: 20,
  },
});
