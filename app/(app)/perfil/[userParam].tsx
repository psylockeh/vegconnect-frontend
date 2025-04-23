import React, { useEffect, useState } from "react";
import { View, Text, Image, TouchableOpacity, ScrollView } from "react-native";
import { useRouter, useLocalSearchParams } from "expo-router";
import { useAuth } from "@/context/AuthContext";
import { styles } from "@/styles/PerfilStyles";
import Sidebar from "@/components/Sidebar";
import { FontAwesome } from "@expo/vector-icons";

export default function PerfilScreen() {
  const router = useRouter();
  const { isAuthenticated, perfilUsuario, carregarPerfil } = useAuth();
  const { userParam } = useLocalSearchParams();
  const [idPerfil, setIdPerfil] = useState<string | null>(null);
  const [nicknamePerfil, setNicknamePerfil] = useState<string | null>(null);

  useEffect(() => {
    if (!isAuthenticated) {
      router.replace("/login");
    } else {
      carregarPerfil();
    }
  }, [isAuthenticated]);

  useEffect(() => {
    if (typeof userParam === "string") {
      const [nick, id] = userParam.split("-");
      setNicknamePerfil(nick);
      setIdPerfil(id);
    }
  }, [userParam]);

  if (!perfilUsuario || !idPerfil) return null;

  const isMeuPerfil = perfilUsuario.id_user?.toString() === idPerfil;

  return (
    <View style={styles.container}>
      <Sidebar onPostPress={() => { }} />
      <View style={styles.mainContent}>
        <ScrollView showsVerticalScrollIndicator={false}>
          <View style={styles.cardPerfil}>
            <View style={styles.headerUsuario}>
              {perfilUsuario?.foto_perfil ? (
                <Image
                  source={{ uri: perfilUsuario.foto_perfil }}
                  style={styles.avatar}
                />
              ) : (
                <View style={styles.avatar}>
                  <Text style={{ color: "#000", fontSize: 16, textAlign: "center", marginTop: 35 }}>Sem foto</Text>
                </View>
              )}

              <View>
                <Text style={styles.nomeUsuario}>{perfilUsuario.nome || "Usuário"}</Text>
                <Text style={styles.nickname}>@{perfilUsuario.nickname || "usuário"}</Text>
                <Text style={styles.tpUser}>
                  <FontAwesome name="leaf" style={{ color: "#67b26f", fontSize: 20, marginRight: 8 }} />
                  {perfilUsuario.tp_user || "Público"}
                </Text>

                {perfilUsuario.tp_user === "Comerciante" && (
                  <>
                    <Text style={styles.info}>Comércio: {perfilUsuario.nome_com}</Text>
                    <Text style={styles.info}>Tel: {perfilUsuario.telefone}</Text>
                  </>
                )}

                {perfilUsuario.tp_user === "Chef" && (
                  <Text style={styles.info}>Especialidade: {perfilUsuario.especialidade}</Text>
                )}

                {perfilUsuario.tp_user === "Comum" && (
                  <Text style={styles.info}>Preferência alimentar: {perfilUsuario.pref_alim}</Text>
                )}
              </View>
            </View>

            <Text style={styles.bio}>{perfilUsuario.bio}</Text>

            {isMeuPerfil && (
              <TouchableOpacity
                onPress={() => router.push("/editar-perfil")}
                style={styles.botaoAlterarPerfil}
              >
                <Text style={styles.textoBotaoAlterar}>Editar Perfil</Text>
              </TouchableOpacity>
            )}
          </View>
        </ScrollView>
      </View>
    </View>
  );
}
