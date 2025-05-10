import AsyncStorage from "@react-native-async-storage/async-storage";
import { router } from "expo-router";

export async function logoutUsuario() {
  await AsyncStorage.removeItem("@token");
  router.replace("/login");
}
