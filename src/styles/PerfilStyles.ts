import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  containerPrincipal: {
    flex: 1,
    backgroundColor: "#F5FAF6",
    flexDirection: "row",
  },
  containerConteudo: {
    flexGrow: 1,
    padding: 20,
    paddingTop: 40,
    alignItems: "center",
  },
  input: {
    width: "100%",
    height: 50,
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 8,
    paddingHorizontal: 12,
    marginBottom: 12,
  },
  button: {
    backgroundColor: "#4CAF50",
    padding: 15,
    borderRadius: 8,
    marginTop: 10,
    width: "100%",
    alignItems: "center",
  },
  buttonText: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 16,
  },
  avatar: {
    width: 120,
    height: 120,
    borderRadius: 60,
    marginBottom: 20,
  },
  avatarPlaceholder: {
    width: 120,
    height: 120,
    borderRadius: 60,
    backgroundColor: "#D9E9DE",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 20,
  },
  avatarText: {
    color: "#888",
    fontSize: 14,
  },
  bio: {
    fontStyle: "italic",
    color: "#555",
    marginBottom: 10,
    textAlign: "center",
  },
  info: {
    fontSize: 16,
    marginVertical: 4,
    color: "#333",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 10,
    color: "#2E4F36",
  },
  nickname: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#2E4F36",
    marginBottom: 6,
    textAlign: "center",
  },
});