import { StyleSheet } from "react-native";

export const CadastroStyles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
    backgroundColor: "#F5FAF0",
  },
  box: {
    width: "100%",
    maxWidth: 400,
    padding: 20,
    borderRadius: 8,
    backgroundColor: "#FAFDFB",
    elevation: 3,
  },

  logoContainer: {
    marginLeft: -20,
    marginTop: -20,
    flexDirection: "row",
    alignItems: "center",
  },

  logo: {
    width: 50,
    height: 50,
    marginRight: 8,
  },

  title: {
    marginLeft: -12,
    fontSize: 24,
    fontWeight: "bold",
    color: "#166534",
  },

  instrucoesInicio: {
    fontSize: 16,
    textAlign: "center",
    marginBottom: 30,
    color: "#166534",
  },

  input: {
    width: "100%",
    padding: 12,
    marginBottom: 20,
    borderRadius: 5,
    borderWidth: 1,
    borderColor: "#ccc",
  },

  picker: {
    width: "100%",
    height: 50,
    backgroundColor: "#FAFDFB",
    borderRadius: 8,
    marginBottom: 15,
    borderColor: "#DDD",
    padding: 5,
  },

  button: {
    backgroundColor: "#3C6E47",
    height: 48,
    borderRadius: 12,
    justifyContent: "center",
    alignItems: "center",
    width: "100%", // ou algo como 240
  },

  buttonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },

  link: {
    marginTop: 20,
    textAlign: "center",
    color: "#166534",
    fontSize: 16,
  },
  error: {
    color: "#D32F2F",
    fontSize: 14,
    textAlign: "center",
    marginTop: 8,
    marginBottom: 8,
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

  label: {
    marginBottom: 10,
    fontSize: 15,
    color: "#166534",
    fontWeight: "bold",
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

  loadingAnimation: {
    width: 50,
    height: 50,
  },

  loadingWrapper: {
    justifyContent: "center",
    alignItems: "center",
    height: "100%",
    width: "100%",
  },

  loadingIcon: {
    width: 28,
    height: 28,
  },

   botaoImagem: {
    backgroundColor: "#3C6E43",
    borderRadius: 10,
    padding: 10,
    alignItems: "center",
    marginTop: -8,
    marginBottom: 10,
  },
});
