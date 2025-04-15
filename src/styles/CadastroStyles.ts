import { StyleSheet } from "react-native";

export const CadastroStyles = StyleSheet.create({
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
    backgroundColor: "#fffcf4",
    borderRadius: 8,
    marginBottom: 15,
    borderColor: "#DDD",
    padding: 5,
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
  error: {
    color: "red",
    fontSize: 14,
    marginTop: 10,
    textAlign: "center",
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
});
