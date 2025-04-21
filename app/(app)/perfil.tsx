import React, { useEffect } from "react";
import { View, Text, Image, TouchableOpacity, ScrollView } from "react-native";
import { useRouter } from "expo-router";
import { useAuth } from "@/context/AuthContext";
import { styles } from "@/styles/PerfilStyles";
import Sidebar from "@/components/Sidebar";

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
                  <Text style={{ color: "#black", fontSize: 16, textAlign: "center", marginTop: 35 }}>Sem foto</Text>
                </View>
              )}
              <View>
                <Text style={styles.nomeUsuario}> {perfilUsuario.nome || "Usuárioid_user"} </Text>
                <Text style={styles.nickname}> @{perfilUsuario.nickname || "usuário"} </Text>
                <Text style={styles.tpUser}> {perfilUsuario.tp_user || "Público"} </Text>

                {perfilUsuario.tp_user === "Comerciante" && (
                  <>
                    <Text style={styles.info}>
                      Comércio: {perfilUsuario.nome_comercio}
                    </Text>
                    <Text style={styles.info}>Tel: {perfilUsuario.telefone}</Text>
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
                
              </View>
            </View>
            <Text style={styles.bio} >{perfilUsuario.bio}</Text>
            <TouchableOpacity
              onPress={() => router.push("/editar-perfil")}
              style={[
                styles.botaoAlterarPerfil,
              ]}
            >
              <Text style={styles.textoBotaoAlterar}>Editar Perfil</Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </View >
    </View >
  );
}