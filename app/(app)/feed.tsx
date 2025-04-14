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
import { Picker } from "@react-native-picker/picker";
import { LinearGradient } from "expo-linear-gradient";
import feedStyles from "../../src/styles/FeedStyles";

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
  const [filtro, setFiltro] = useState<string>("todos");

  useEffect(() => {
    async function carregarPostagens() {
      try {
        const response = await axios.get(
          "http://localhost:3000/usuario/postagens"
        );
        setPostagens(response.data);
      } catch (error) {
        console.error("Erro ao carregar postagens:", error);
      }
    }

    carregarPostagens();
  }, []);

  const postagensFiltradas =
    filtro === "todos"
      ? postagens
      : postagens.filter((p) => p.tp_post === filtro);

  return (
    <View style={feedStyles.container}>
      <View style={feedStyles.sidebar}>
        {/* Sidebar de navegação futura */}
      </View>

      <View style={feedStyles.mainContent}>
        {/* Botão de topo */}
        <LinearGradient
          colors={["#292E49", "#536976", "#BBD2C5"]}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 0 }}
          style={feedStyles.botaoCriar}
        >
          <Text style={feedStyles.textoBotao}>+ Post</Text>
        </LinearGradient>

        {/* Card de criação de post */}
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

        {/* Filtro */}
        <Picker
          selectedValue={filtro}
          onValueChange={(valor) => setFiltro(valor)}
          style={feedStyles.filtro}
        >
          <Picker.Item label="Todos" value="todos" />
          <Picker.Item label="Receitas" value="receita" />
          <Picker.Item label="Eventos" value="evento" />
          <Picker.Item label="Recados" value="recado" />
          <Picker.Item label="Estabelecimentos" value="estabelecimento" />
          <Picker.Item label="Promoções" value="promocao" />
        </Picker>

        {/* Lista de postagens */}
        <FlatList
          data={postagensFiltradas}
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
