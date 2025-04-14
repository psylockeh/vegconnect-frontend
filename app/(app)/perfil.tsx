import React, { useEffect } from "react";
import { View, Text, Image, Button, ScrollView } from "react-native";
import { useRouter } from "expo-router";
import { useAuth } from "@/context/AuthContext";
import { styles } from "@/styles/PerfilStyles";

export default function PerfilScreen() {
  const router = useRouter();
  const { isAuthenticated, perfilUsuario, carregarPerfil } = useAuth();

  useEffect(() => {
    if (!isAuthenticated) {
      router.replace("/login");
    } else {
      carregarPerfil();
    }
  }, [isAuthenticated]);

  if (!perfilUsuario) return null;

  return (
    <ScrollView contentContainerStyle={styles.container}>
      {perfilUsuario.foto_perfil ? (
        <Image
          source={{ uri: perfilUsuario.foto_perfil }}
          style={styles.avatar}
        />
      ) : (
        <View style={styles.avatarPlaceholder}>
          <Text style={styles.avatarText}>Sem foto</Text>
        </View>
      )}

      <Text style={styles.title}>{perfilUsuario.nome}</Text>
      <Text style={styles.nickname}>@{perfilUsuario.nickname}</Text>
      <Text style={styles.bio}>{perfilUsuario.bio}</Text>

      {perfilUsuario.tp_user === "Comerciante" && (
        <>
          <Text style={styles.info}>
            Comércio: {perfilUsuario.nome_comercio}
          </Text>
          <Text style={styles.info}>Tel: {perfilUsuario.tel_com}</Text>
        </>
      )}

      {perfilUsuario.tp_user === "Chef" && (
        <Text style={styles.info}>
          Especialidade: {perfilUsuario.especialidade}
        </Text>
      )}

      {perfilUsuario.tp_user === "Comum" && (
        <Text style={styles.info}>
          Preferência alimentar: {perfilUsuario.pref_alim}
        </Text>
      )}

      <Button
        title="Editar Perfil"
        onPress={() => router.push("/editar-perfil")}
      />
    </ScrollView>
  );
}
