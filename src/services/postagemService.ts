import AsyncStorage from "@react-native-async-storage/async-storage";
import { API_URL } from "@/config/api";

export async function enviarPostagem(dados: any) {
  console.log("✅ Dados enviados:", dados);

  const token = await AsyncStorage.getItem("@token");
  if (!token) throw new Error("Token não encontrado.");

  const response = await fetch(`${API_URL}/usuario/postagens`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },

    body: JSON.stringify(dados),
  });

  if (!response.ok) {
    const erro = await response.json();
    throw new Error(erro.message || "Erro ao criar a postagem");
  }

  return await response.json();
}
