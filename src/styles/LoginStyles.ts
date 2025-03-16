import { StyleSheet } from "react-native";

export const LoginStyles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
    backgroundColor: "white",
  },
  logo: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#008000",
    marginBottom: 10,
  },
  title: {
    fontSize: 22,
    fontWeight: "bold",
    color: "#000",
  },
  subtitle: {
    fontSize: 14,
    color: "#666",
    textAlign: "center",
    marginBottom: 20,
  },
  label: {
    alignSelf: "flex-start",
    fontSize: 14,
    fontWeight: "bold",
    color: "#333",
    marginBottom: 5,
  },
  input: {
    width: "100%",
    height: 50,
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 8,
    paddingHorizontal: 10,
    marginBottom: 15,
  },
  passwordContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "100%",
  },
  forgotPassword: {
    fontSize: 12,
    color: "#008000",
    alignSelf: "flex-end",
  },
  passwordInputContainer: {
    flexDirection: "row",
    alignItems: "center",
    width: "100%",
  },
  showPasswordButton: {
    position: "absolute",
    right: 10,
    top: 15,
  },
  errorMessage: {
    color: "red",
    fontSize: 14,
    marginBottom: 10,
  },
  checkboxContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 20,
  },
  checkbox: {
    width: 20,
    height: 20,
    borderWidth: 1,
    borderColor: "#008000",
    textAlign: "center",
    marginRight: 10,
    borderRadius: 4,
  },
  checkboxChecked: {
    backgroundColor: "#008000",
    color: "white",
  },
  checkboxLabel: {
    fontSize: 14,
    color: "#333",
  },
  loginButton: {
    backgroundColor: "#008000",
    paddingVertical: 12,
    width: "100%",
    alignItems: "center",
    borderRadius: 8,
  },
  loginButtonText: {
    color: "white",
    fontSize: 16,
    fontWeight: "bold",
  },
  orText: {
    marginVertical: 15,
    color: "#888",
  },
  socialLoginContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    width: "100%",
  },
  socialLogin: {
    padding: 10,
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 8,
    textAlign: "center",
    width: "30%",
  },
  signupText: {
    marginTop: 20,
    fontSize: 14,
    color: "#000",
  },
  signupLink: {
    color: "#008000",
    fontWeight: "bold",
  },
});
