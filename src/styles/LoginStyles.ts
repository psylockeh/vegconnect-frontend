import { StyleSheet } from "react-native";

export const LoginStyles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
    backgroundColor: "#fff6da",
  },

  box: {
    width: "100%",
    maxWidth: 400,
    padding: 20,
    borderRadius: 8,
    backgroundColor: "#fffcf4",
    elevation: 3,
  },

  logoContainer: {
    marginLeft: -20,
    marginTop: -20,
    flexDirection: "row", 
    alignItems: "center",  
  },

  logo: {
    width: 100,
    height: 100,
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
    color: "#166534",
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
