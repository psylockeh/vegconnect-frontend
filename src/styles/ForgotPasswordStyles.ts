import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
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

  message: {
    color: "#D32F2F",
    fontSize: 14,
    textAlign: "center",
    marginTop: 8,
    marginBottom: 8,
  },
  input: {
    width: "100%",
    padding: 12,
    marginBottom: 20,
    borderRadius: 5,
    borderWidth: 1,
    borderColor: "#ccc",
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
});
