import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
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
    message: {
        color: "red",
        fontSize: 14,
        marginTop: 10,
        textAlign: "center",
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
});
