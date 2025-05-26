import React from 'react';
import { View, Text, FlatList, Button, Alert } from 'react-native';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { API_URL } from "@/config/api";
import { styles } from "@/styles/GerenciarFavorito";

interface Postagem {
  id: number;
  titulo: string;
  conteudo: string;
  tp_post: string;
}

interface Favorito {
  id: number;              // ID do favorito (usado para DELETE)
  postagem_id: number;
  postagem: Postagem;
}

interface ListaFavoritosProps {
  favoritos: Favorito[];
  onRemoverFavorito: () => void;
}

const GerenciarFavorito: React.FC<ListaFavoritosProps> = ({ favoritos, onRemoverFavorito }) => {
  const desfavoritarPostagem = async (id: number) => {
    try {
      const token = await AsyncStorage.getItem('@token');
      if (!token) {
        Alert.alert('Erro', '❌ Token não encontrado. Faça login novamente.');
        return;
      }

      const config = {
        headers: { Authorization: `Bearer ${token}` },
      };

      await axios.delete(`${API_URL}/usuario/favoritos/${id}`, config);
      Alert.alert('Sucesso', 'Postagem desfavoritada');
      onRemoverFavorito();
    } catch (err: any) {
      Alert.alert('Erro', err.response?.data?.erro || '❌ Erro ao desfavoritar');
      console.error('❌ Erro ao desfavoritar:', err);
    }
  };

  const renderItem = ({ item }: { item: Favorito }) => (
    <View style={styles.card}>
      <Text style={styles.titulo}>{item.postagem.titulo}</Text>
      <Text>{item.postagem.conteudo}</Text>
      <Text style={styles.tipo}>Tipo: {item.postagem.tp_post}</Text>
      <Button
        title="❌ Desfavoritar"
        color="#e74c3c"
        onPress={() => desfavoritarPostagem(item.id)}  // ✅ Corrigido aqui
      />
    </View>
  );

  if (favoritos.length === 0) {
    return <Text style={styles.textoVazio}>Você ainda não tem postagens favoritadas.</Text>;
  }

  return (
    <FlatList
      data={favoritos}
      keyExtractor={(item) => item.id.toString()}
      renderItem={renderItem}
      scrollEnabled={false}
    />
  );
};

export default GerenciarFavorito;
