import React, {
  createContext,
  useContext,
  useEffect,
  useState,
  ReactNode,
} from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
import { API_URL } from "../config/api";

interface AuthContextProps {
  userToken: string | null;
  perfilUsuario: any;
  login: (email: string, senha: string) => Promise<void>;
  logout: () => Promise<void>;
  carregarPerfil: () => Promise<void>;
  isAuthenticated: boolean;
  editarPerfil: (dadosAtualizados: {
    nome?: string;
    pref_alim?: string;
  }) => Promise<void>;
}

const AuthContext = createContext<AuthContextProps>({} as AuthContextProps);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [userToken, setUserToken] = useState<string | null>(null);
  const [perfilUsuario, setPerfilUsuario] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const carregarToken = async () => {
      const tokenSalvo = await AsyncStorage.getItem("@token");
      if (tokenSalvo) {
        setUserToken(tokenSalvo);
        setIsAuthenticated(true);
      } else {
        setIsAuthenticated(false);
      }
    };

    carregarToken();
  }, []);

  const login = async (email: string, senha: string) => {
    try {
      const response = await axios.post(`${API_URL}/auth/signin`, {
        email,
        senha,
      });
      const { token } = response.data;
      await AsyncStorage.setItem("@token", token);
      setUserToken(token);
      setIsAuthenticated(true);
    } catch (error: any) {
      console.error(
        "Erro ao fazer login:",
        error.response?.data || error.message
      );
      setIsAuthenticated(false);
    }
  };

  const carregarPerfil = async () => {
    try {
      const token = await AsyncStorage.getItem("@token");
      const response = await axios.get(`${API_URL}/auth/perfil`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setPerfilUsuario(response.data);
    } catch (error) {
      console.error("Erro ao carregar perfil:", error);
    }
  };

  const logout = async () => {
    await AsyncStorage.removeItem("@token");
    setUserToken(null);
    setPerfilUsuario(null);
    setIsAuthenticated(false);
  };

  const editarPerfil = async (dadosAtualizados: {
    nome?: string;
    pref_alim?: string;
  }) => {
    try {
      const token = await AsyncStorage.getItem("@token");

      if (!token) {
        console.error("Token não encontrado!");
        return;
      }

      const response = await axios.put(
        `${API_URL}/usuario/perfil`,
        dadosAtualizados,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      if (response.status === 200) {
        setPerfilUsuario(response.data);
        console.log("Perfil atualizado com sucesso!");
      }
    } catch (error) {
      if (axios.isAxiosError(error)) {
        console.error(
          "Erro ao atualizar perfil:",
          error.response?.data || error.message
        );
      } else {
        console.error("Erro desconhecido:", error);
      }
    }
  };

  return (
    <AuthContext.Provider
      value={{
        userToken,
        login,
        logout,
        carregarPerfil,
        perfilUsuario,
        isAuthenticated,
        editarPerfil,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
