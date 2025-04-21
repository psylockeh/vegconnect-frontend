import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Toast from "react-native-toast-message";
import { API_URL } from "@/config/api";
import { logoutUsuario } from "@/utils/logoutHelper";

const api = axios.create({
  baseURL: API_URL,
});

// Intercepta requisições e adiciona token
api.interceptors.request.use(async (config) => {
  const token = await AsyncStorage.getItem("@token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Intercepta respostas para verificar token expirado
api.interceptors.response.use(
  (response) => response,
  async (error) => {
    if (
      error.response?.data?.erro?.includes("jwt expired") ||
      error.response?.data?.msg?.includes("jwt expired")
    ) {
      Toast.show({
        type: "error",
        text1: "Sessão expirada",
        text2: "Faça login novamente.",
        visibilityTime: 4000,
      });

      await logoutUsuario(); // Lógica de logout centralizada
    }

    return Promise.reject(error);
  }
);

export default api;
