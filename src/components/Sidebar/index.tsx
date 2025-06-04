import { View, Pressable, Text, Animated } from "react-native";
import { useState, useRef } from "react";
import { FontAwesome, MaterialIcons } from "@expo/vector-icons";
import styles from "./styles";
import { useRouter } from "expo-router";
import { useAuth } from "@/context/AuthContext";

type Props = {
  onPostPress: () => void;
};

export default function Sidebar({ onPostPress }: Props) {
  const [open, setOpen] = useState(true);
  const { logout, perfilUsuario } = useAuth();
  const router = useRouter();

  const slideAnim = useRef(new Animated.Value(0)).current;

  const toggleSidebar = () => {
    Animated.timing(slideAnim, {
      toValue: open ? -80 : 0,
      duration: 300,
      useNativeDriver: true,
    }).start();
    setOpen(!open);
  };

  return (
    <>
      {/* Sidebar principal com  */}
      <Animated.View
        style={[styles.sidebar, { transform: [{ translateX: slideAnim }] }]}
      >
        <Pressable style={styles.toggleBtn} onPress={toggleSidebar}>
          <MaterialIcons name="menu" size={40} color="#FFF" />
        </Pressable>

        {open && (
          <View style={styles.menu}>
            {/* Rota Post */}
            <Pressable
              style={styles.menuItem}
              onPress={() => router.push("/feed")}
            >
              <Text style={styles.labelPost}>+ Post</Text>
            </Pressable>

            <Pressable
              style={styles.menuItem}
            // onPress={() => router.push("/menu")}
            >
              <FontAwesome name="bars" size={20} color="#023D2E" />
              <Text style={styles.labelMenu}>Menu</Text>
            </Pressable>

            <Pressable
              style={styles.menuItem}
              onPress={() => router.push("/pesquisa")}
            >
              <MaterialIcons name="search" size={20} color="#FFF" />
              <Text style={styles.label}>Pesquisa</Text>
            </Pressable>

            <Pressable
              style={styles.menuItem}
              onPress={() => router.push("/indicadores")}
            >
              <MaterialIcons name="auto-graph" size={20} color="#FFF" />
              <Text style={styles.label}>Indicadores</Text>
            </Pressable>

            <Pressable
              style={styles.menuItem}
              onPress={() => router.push("/localizar")}
            >
              <MaterialIcons name="location-on" size={20} color="#FFF" />
              <Text style={styles.label}>Mapa</Text>
            </Pressable>

            <Pressable
              style={styles.menuItem}
              onPress={() => router.push("/chat")}
            >
              <MaterialIcons name="try" size={20} color="#FFF" />
              <Text style={styles.label}>IA</Text>
            </Pressable>

            <Pressable
              style={styles.menuItem}
              onPress={() => router.push(`/perfil/${perfilUsuario.id_user}`)}
            >
              <MaterialIcons
                name="person"
                size={25}
                color="#FFF"
                style={{
                  textAlign: "center",
                  borderTopWidth: 2,
                  width: 65,
                  borderTopColor: "#ccc",
                  paddingTop: 5,
                }}
              />
              <Text style={styles.labelPerson}>Perfil</Text>
            </Pressable>

            <Pressable style={styles.menuItem}>
              <FontAwesome name="leaf" size={20} color="#67b26f" />
              <Text style={styles.label}>{perfilUsuario.tp_user}</Text>
            </Pressable>

            {/* Botão Sair */}
            <View
              style={{
                flex: 1,
                justifyContent: "center",
                marginTop: 50,
                padding: 8,
              }}
            >
              <Pressable
                onPress={logout}
                style={({ pressed }) => [
                  {
                    backgroundColor: pressed ? "#D33" : "#ff4d4d", // vermelho mais claro
                    paddingHorizontal: 8,
                    paddingVertical: 4,
                    borderRadius: 6,
                    shadowColor: "#000",
                    shadowOffset: { width: 0, height: 2 },
                    shadowOpacity: 0.2,
                    shadowRadius: 4,
                    elevation: 3,
                  },
                ]}
              >
                <Text style={{ color: "#fff", fontWeight: "bold", fontSize: 12 }}>
                  Sair
                </Text>
              </Pressable>
            </View>
          </View>
        )}
      </Animated.View>

      {/* Botão para reabrir a sidebar quando minimizada */}
      {!open && (
        <Pressable style={styles.reabrirBtn} onPress={toggleSidebar}>
          <MaterialIcons name="menu" size={35} color="#FFF" />
        </Pressable>
      )}
    </>
  );
}
