import { StyleSheet } from "react-native";

export const LoginStyles = StyleSheet.create({
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
  bemVindo: {
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

  forgotPasswordText: {
    color: "#166534",
    textAlign: "right",
    fontSize: 15,
    fontWeight: "bold",
  },

  error: {
    color: "#D32F2F",
    fontSize: 14,
    textAlign: "center",
    marginTop: 8,
    marginBottom: 8,
  },

  checkboxContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 12,
  },

  checkbox: {
    width: 20,
    height: 20,
    borderWidth: 2,
    borderColor: "#3C6E47",
    borderRadius: 4,
    justifyContent: "center",
    alignItems: "center",
    marginRight: 8,
  },
  checkboxMark: {
    fontSize: 14,
    color: "#3C6E47",
    fontWeight: "bold",
  },
  checkboxLabel: {
    fontSize: 16,
    color: "#166534",
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
