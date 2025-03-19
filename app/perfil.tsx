import { useEffect, useState } from "react";
import { View, Text, TextInput, Button } from "react-native";
import { useRouter } from "expo-router";
import { useAuth } from "@/context/AuthContext";
import { styles } from "@/styles/PerfilStyles"; // Importando estilos

export default function PerfilScreen() {
  const router = useRouter();
  const { isAuthenticated, perfilUsuario, editarPerfil, carregarPerfil } =
    useAuth();
  const [nome, setNome] = useState(perfilUsuario?.nome || "");
  const [prefAlim, setPrefAlim] = useState(perfilUsuario?.pref_alim || "");

  useEffect(() => {
    if (!isAuthenticated) {
      router.replace("/login");
    } else {
      carregarPerfil();
    }
  }, [isAuthenticated, router]);

  useEffect(() => {
    if (perfilUsuario) {
      setNome(perfilUsuario.nome);
      setPrefAlim(perfilUsuario.pref_alim);
    }
  }, [perfilUsuario]);

  const handleSalvar = async () => {
    await editarPerfil({ nome, pref_alim: prefAlim });
  };

  if (!isAuthenticated) {
    return null;
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>👤 Meu Perfil</Text>

      <Text style={styles.label}>Nome:</Text>
      <TextInput style={styles.input} value={nome} onChangeText={setNome} />

      <Text style={styles.label}>Preferência Alimentar:</Text>
      <TextInput
        style={styles.input}
        value={prefAlim}
        onChangeText={setPrefAlim}
      />

      <Button title="Salvar" onPress={handleSalvar} />
    </View>
  );
}
