import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  TextInput,
} from "react-native";
import { useRouter } from "expo-router";
import { useEffect, useState } from "react";
import axios from "axios";
import feedStyles from "../../src/styles/FeedStyles";
import Sidebar from "../../src/components/Sidebar";
import { API_URL } from "@/config/api";
import AsyncStorage from "@react-native-async-storage/async-storage";

type Postagem = {
  autor: { nome: string };
  tp_post: string;
  createdAt: string;
  id: number;
  titulo: string;
  conteudo: string;
};

export default function Feed() {
  const router = useRouter();
  const [postagens, setPostagens] = useState<Postagem[]>([]);
  const [mostrarCriacao, setMostrarCriacao] = useState(false);

  async function carregarPostagens() {
    try {
      const token = await AsyncStorage.getItem("@token");

      if (!token) {
        console.error("🔒 Token ausente.");
        return;
      }

      const response = await axios.get(`${API_URL}/usuario/postagens`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setPostagens(response.data);
    } catch (error) {
      console.error("Erro ao carregar postagens:", error);
    }
  }

  return (
    <View style={feedStyles.container}>
      <Sidebar onPostPress={() => setMostrarCriacao(!mostrarCriacao)} />

      <View style={feedStyles.mainContent}>
        {mostrarCriacao && (
          <View style={feedStyles.cardCriarPost}>
            <View style={feedStyles.headerUsuario}>
              <View style={feedStyles.avatar} />
              <View>
                <Text style={feedStyles.nomeUsuario}>Kamala da Silva</Text>
                <Text style={feedStyles.tipoUsuario}>Público</Text>
              </View>
            </View>

            <TextInput
              placeholder="Sobre o que você quer falar?"
              placeholderTextColor="#888"
              style={feedStyles.inputPost}
            />

            <Text style={feedStyles.ouLabel}>ou</Text>

            <View style={feedStyles.botoesTipoPostagem}>
              {["Receita", "Evento", "Comércio", "Promoção"].map((tipo) => (
                <TouchableOpacity key={tipo} style={feedStyles.botaoTipo}>
                  <Text style={feedStyles.textoBotaoTipo}>{tipo}</Text>
                </TouchableOpacity>
              ))}
            </View>

            <View style={feedStyles.iconesAcoes}>
              <Text style={feedStyles.iconeFake}>🖼️</Text>
              <Text style={feedStyles.iconeFake}>👥</Text>
              <Text style={feedStyles.iconeFake}>➕</Text>
            </View>

            <TouchableOpacity style={feedStyles.botaoPublicar}>
              <Text style={feedStyles.textoBotaoPublicar}>Publicar</Text>
            </TouchableOpacity>
          </View>
        )}

        <FlatList
          data={postagens}
          keyExtractor={(item) => item.id.toString()}
          renderItem={({ item }) => (
            <TouchableOpacity
              onPress={() => router.push(`/postagem/${item.id}`)}
            >
              <View style={feedStyles.cardPost}>
                <Text style={feedStyles.titulo}>{item.titulo}</Text>
                <Text style={feedStyles.tipoLabel}>
                  {item.tp_post.charAt(0).toUpperCase() + item.tp_post.slice(1)}
                </Text>
                <Text style={feedStyles.conteudo}>{item.conteudo}</Text>
                <View style={feedStyles.rodapePost}>
                  <Text style={feedStyles.autor}>{item.autor?.nome}</Text>
                  <Text style={feedStyles.data}>
                    {new Date(item.createdAt).toLocaleDateString("pt-BR")}
                  </Text>
                </View>
              </View>
            </TouchableOpacity>
          )}
        />
      </View>
    </View>
  );
}
