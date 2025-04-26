import { View, TouchableOpacity, Text, Animated } from "react-native";
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
  const {perfilUsuario } = useAuth();
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
        <TouchableOpacity style={styles.toggleBtn} onPress={toggleSidebar}>
          <MaterialIcons name="menu" size={40} color="#FFF" />
        </TouchableOpacity>

        {open && (
          <View style={styles.menu}>
            {/* Rota Post */}
            <TouchableOpacity style={styles.menuItem} onPress={() => router.push("/feed")}>
              <Text style={styles.labelPost}>+ Post</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.menuItem}
              // onPress={() => router.push("/menu")}
            >
              <FontAwesome name="bars" size={20} color="#023D2E" />
              <Text style={styles.labelMenu}>Menu</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.menuItem}
              onPress={() => router.push("/pesquisa")}
            >
              <MaterialIcons name="search" size={20} color="#FFF" />
              <Text style={styles.label}>Pesquisa</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.menuItem}
              onPress={() => router.push("/indicadores")}
            >
              <MaterialIcons name="auto-graph" size={20} color="#FFF" />
              <Text style={styles.label}>Indicadores</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.menuItem}
              onPress={() => router.push("/localizar")}
            >
              <MaterialIcons name="location-on" size={20} color="#FFF" />
              <Text style={styles.label}>Mapa</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.menuItem}
              onPress={() => router.push("/chat")}
            >
              <MaterialIcons name="try" size={20} color="#FFF" />
              <Text style={styles.label}>IA</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.menuItem}
              onPress={() => router.push(`/perfil/${perfilUsuario.nickname}-${perfilUsuario.id_user}`)}
            >
              <MaterialIcons name="person" size={25} color="#FFF" style={{ textAlign: "center", borderTopWidth: 2, width: 65, borderTopColor: "#ccc", paddingTop: 5 }} />
              <Text style={styles.labelPerson}>Perfil</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.menuItem}>
              <FontAwesome name="leaf" size={20} color="#67b26f" />
              <Text style={styles.label}>{perfilUsuario.tp_user}</Text>
            </TouchableOpacity>
          </View>
        )}
      </Animated.View>

      {/* Botão para reabrir a sidebar quando minimizada */}
      {!open && (
        <TouchableOpacity style={styles.reabrirBtn} onPress={toggleSidebar}>
          <MaterialIcons name="menu" size={35} color="#FFF" />
        </TouchableOpacity>
      )}
    </>
  );
}
