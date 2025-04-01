import { useEffect } from "react";
import { View, Text, TouchableOpacity, Image } from "react-native";
import { useRouter } from "expo-router";
import { styles } from "@/styles/IndexStyles";

export default function Index() {
  const router = useRouter();

  return (
    <View style={styles.container}>
      <View style={styles.card}>
        <Image source={require("../../assets/logo.png")} style={styles.logo} />
        <Text style={styles.title}>Bem-vindo ao VegConnect</Text>

        <TouchableOpacity
          style={styles.buttonLogin}
          onPress={() => router.push("/login")}
        >
          <Text style={styles.buttonText}>Fazer Login</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.buttonCadastro}
          onPress={() => router.push("/cadastro")}
        >
          <Text style={styles.buttonText}>Cadastrar-se</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}
