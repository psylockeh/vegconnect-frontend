import axios from "axios";
import { API_URL } from "@/config/api";
import AsyncStorage from "@react-native-async-storage/async-storage";

const getAuthHeader = async () => {
  const token = await AsyncStorage.getItem("@token");
  return {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
};

export const comentarPostagem = async (postagemId: number, texto: string) => {
  const config = await getAuthHeader();
  return axios.post(
    `${API_URL}/postagens/${postagemId}/comentar`,
    { conteudo: texto },
    config
  );
};

export const curtirPostagem = async (postagemId: number) => {
  const config = await getAuthHeader();
  return axios.post(`${API_URL}/postagens/${postagemId}/curtir`, {}, config);
};

export const repostarPostagem = async (postagemId: number) => {
  const config = await getAuthHeader();
  return axios.post(`${API_URL}/postagens/${postagemId}/repostar`, {}, config);
};
