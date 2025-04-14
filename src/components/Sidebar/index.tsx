import { View, TouchableOpacity, Text, Animated } from "react-native";
import { useState, useRef } from "react";
import { FontAwesome, MaterialIcons } from "@expo/vector-icons";
import styles from "./styles";
import { useRouter } from "expo-router";

type Props = {
  onPostPress: () => void;
};

export default function Sidebar({ onPostPress }: Props) {
  const [open, setOpen] = useState(true);
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
      {/* Sidebar principal com toggle */}
      <Animated.View
        style={[styles.sidebar, { transform: [{ translateX: slideAnim }] }]}
      >
        <TouchableOpacity style={styles.toggleBtn} onPress={toggleSidebar}>
          <MaterialIcons name="chevron-left" size={24} color="#FFF" />
        </TouchableOpacity>

        {open && (
          <View style={styles.menu}>
            <TouchableOpacity style={styles.menuItem} onPress={onPostPress}>
              <FontAwesome name="plus" size={20} color="#023D2E" />
              <Text style={styles.label}>+ Post</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.menuItem}
              onPress={() => router.push("/menu")}
            >
              <FontAwesome name="bars" size={20} color="#023D2E" />
              <Text style={styles.label}>Menu</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.menuItem}
              onPress={() => router.push("/indicadores")}
            >
              <FontAwesome name="line-chart" size={20} color="#023D2E" />
              <Text style={styles.label}>Indicadores</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.menuItem}
              onPress={() => router.push("/localizar")}
            >
              <FontAwesome name="map-marker" size={20} color="#023D2E" />
              <Text style={styles.label}>Mapa</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.menuItem}
              onPress={() => router.push("/chat")}
            >
              <FontAwesome name="comment" size={20} color="#023D2E" />
              <Text style={styles.label}>IA</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.menuItem}
              onPress={() => router.push("/configuracoes")}
            >
              <FontAwesome name="cog" size={20} color="#023D2E" />
              <Text style={styles.label}>Config</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.menuItem}
              onPress={() => router.push("/perfil")}
            >
              <FontAwesome name="user-circle" size={20} color="#023D2E" />
              <Text style={styles.label}>Perfil</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.menuItem}>
              <FontAwesome name="leaf" size={20} color="#67b26f" />
              <Text style={styles.label}>Comum</Text>
            </TouchableOpacity>
          </View>
        )}
      </Animated.View>

      {/* Botão para reabrir a sidebar quando minimizada */}
      {!open && (
        <TouchableOpacity style={styles.reabrirBtn} onPress={toggleSidebar}>
          <MaterialIcons name="chevron-right" size={28} color="#FFF" />
        </TouchableOpacity>
      )}
    </>
  );
}
