import React, {
  createContext,
  useContext,
  useEffect,
  useState,
  ReactNode,
} from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Toast from "react-native-toast-message";
import axios from "../utils/axiosInstance";
import { API_URL } from "../config/api";
import { isAxiosError } from "axios";

type UsuarioLogado = {
  nome: string;
  tp_user: "Comum" | "Chef" | "Comerciante";
  email: string;
  id_user: number;
};

export interface AuthContextProps {
  userToken: string | null;
  perfilUsuario: any;
  usuario: UsuarioLogado | null;
  login: (
    email: string,
    senha: string,
    manterConectado: boolean
  ) => Promise<void>;
  logout: () => Promise<void>;
  carregarPerfil: () => Promise<void>;
  isAuthenticated: boolean;
  editarPerfil: (dadosAtualizados: {
    nome?: string;
    pref_alim?: string;
    senha?: string;
    tp_user?: string;
    telefone?: string;
    nickname?: string;
  }) => Promise<void>;
  isLoading: boolean;
  register: (
    nome: string,
    email: string,
    senha: string,
    tp_user: string,
    data_nascimento: string,
    pref_alim: string,
    nickname: string,
    telefone: string,
    especialidade: string,
    certificacoes: string,
    tipo_prod: string,
    tipo_com: string,
    nome_com: string,
    cnpj: string,
    cep_com: string,
    tel_com: string,
    ender_com: string
  ) => Promise<void>;
  forgotPassword: (email: string) => Promise<void>;
  resetPassword: (token: string, novaSenha: string) => Promise<void>;
}

export const AuthContext = createContext<AuthContextProps>(
  {} as AuthContextProps
);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [usuario, setUsuario] = useState<UsuarioLogado | null>(null);
  const [userToken, setUserToken] = useState<string | null>(null);
  const [perfilUsuario, setPerfilUsuario] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const carregarToken = async () => {
      const tokenSalvo = await AsyncStorage.getItem("@token");

      if (tokenSalvo) {
        setUserToken(tokenSalvo);
        setIsAuthenticated(true);
        await carregarPerfil();
      } else {
        setIsAuthenticated(false);
      }

      setIsLoading(false);
    };

    carregarToken();
  }, []);

  const login = async (
    email: string,
    senha: string,
    manterConectado: boolean
  ) => {
    try {
      const response = await axios.post(`/auth/signin`, {
        email,
        senha,
      });

      const { token, usuario } = response.data;

      await AsyncStorage.setItem("@token", token);
      setUserToken(token);
      setIsAuthenticated(true);
      setPerfilUsuario(usuario);

      if (manterConectado) {
        await AsyncStorage.setItem("@token", token);
      }

      setTimeout(() => {
        carregarPerfil();
      }, 300);
    } catch (error: any) {
      console.error(
        "Erro ao fazer login:",
        error.response?.data || error.message
      );
      setIsAuthenticated(false);
      throw new Error("Credenciais inválidas");
    }
  };

  const carregarPerfil = async () => {
    try {
      const token = userToken || (await AsyncStorage.getItem("@token"));

      if (!token) {
        console.error("Token não encontrado");
        return;
      }

      const response = await axios.get(`/usuario/perfil`);
      const dados = response.data;
      setPerfilUsuario(dados);
      setUsuario({
        nome: dados.nome,
        tp_user: dados.tp_user,
        email: dados.email,
        id_user: dados.id_user,
      });
    } catch (error: any) {
      console.error("Erro ao carregar perfil:", error);

      if (
        error.response?.status === 401 &&
        error.response?.data?.message?.toLowerCase()?.includes("jwt")
      ) {
        await logout();
        Toast.show({
          type: "error",
          text1: "Sessão expirada",
          text2: "Faça login novamente.",
        });
      }
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
    telefone?: string;
    nickname?: string;
    bio?: string;
  }) => {
    try {
      const response = await axios.put(`/usuario/perfil`, dadosAtualizados);

      if (response.status === 200) {
        setPerfilUsuario(response.data);
        console.log("Perfil atualizado com sucesso!");
      }
    } catch (error: unknown) {
      if (isAxiosError(error)) {
        console.error("Erro:", error.response?.data || error.message);
      } else {
        console.error("Erro desconhecido:", error);
      }
    }
  };

  const register = async (
    nome: string,
    email: string,
    senha: string,
    tp_user: string,
    data_nascimento: string,
    pref_alim: string,
    nickname: string,
    telefone: string,
    especialidade: string,
    certificacoes: string,
    tipo_prod: string,
    tipo_com: string,
    nome_comercio: string,
    cnpj: string,
    cep_comercio: string,
    telefone_comercio: string
  ): Promise<void> => {
    try {
      const response = await axios.post(`/auth/signup`, {
        nome,
        email,
        senha,
        tp_user,
        data_nascimento,
        pref_alim,
        nickname,
        telefone,
        especialidade,
        certificacoes,
        tipo_prod,
        tipo_com,
        nome_comercio,
        cnpj,
        cep_comercio,
        telefone_comercio,
      });

      if (response.status === 201) {
        console.log("✅ Cadastro realizado com sucesso!");
      }
    } catch (error: any) {
      console.error(
        "❌ Erro ao cadastrar usuário:",
        error.response?.data || error.message
      );
      throw new Error(
        "Erro ao cadastrar usuário. Verifique os dados e tente novamente."
      );
    }
  };

  const forgotPassword = async (email: string) => {
    try {
      await axios.post(`/auth/recuperar-senha`, { email });
      console.log("✅ E-mail de recuperação enviado com sucesso!");
    } catch (error) {
      console.error("❌ Erro ao solicitar recuperação de senha:", error);
      throw new Error("Erro ao enviar e-mail. Tente novamente.");
    }
  };

  const resetPassword = async (token: string, novaSenha: string) => {
    try {
      const response = await axios.post(`/auth/redefinir-senha`, {
        token,
        novaSenha,
      });

      if (response.status === 200) {
        console.log("✅ Senha redefinida com sucesso.");
      }
    } catch (error: any) {
      console.error(
        "❌ Erro ao redefinir senha:",
        error.response?.data || error.message
      );
      throw new Error("Erro ao redefinir senha.");
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
        isLoading,
        editarPerfil,
        register,
        forgotPassword,
        resetPassword,
        usuario,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
