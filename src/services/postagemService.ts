import AsyncStorage from "@react-native-async-storage/async-storage";
import { API_URL } from "@/config/api";
import api from "@/services/api";

export async function enviarPostagem(dados: any) {
  console.log("✅ Dados enviados:", dados);

  const token = await AsyncStorage.getItem("@token");
  if (!token) {
    console.warn("🔒 Token JWT não encontrado no AsyncStorage.");
    throw new Error("Token não encontrado.");
  }

  try {
    const response = await api.post("/usuario/postagens", dados);
    return response.data;
  } catch (error: any) {
    if (
      error.response?.status === 401 &&
      error.response?.data?.erro === "jwt expired"
    ) {
    }

    console.error("❌ Erro ao criar postagem:", error);
    throw error;
  }
}
