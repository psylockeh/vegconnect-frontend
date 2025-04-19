import React, { useState } from 'react';
import { View, TextInput, Button, Text, FlatList } from 'react-native';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

interface Usuario {
  id_user: number;
  nome: string;
  nickname: string;
  tp_user: string;
}

const API_URL = 'http://localhost:28147'; 

const BuscarUsuarios = () => {
  const [query, setQuery] = useState('');
  const [usuarios, setUsuarios] = useState<Usuario[]>([]);
  const [error, setError] = useState('');

  const buscarUsuarios = async () => {
    try {
      const token = await AsyncStorage.getItem('@token');
      if (!token) {
        setError('Token não encontrado!');
        return;
      }
  
      const url = `${API_URL}/usuario/pesquisarUsuarios?novoUsuario=${encodeURIComponent(query)}`;
      console.log('URL da API:', url);
  
      const response = await axios.get(url, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
  
      console.log('Dados da API:', response.data);
  
      if (Array.isArray(response.data)) {
        if (response.data.length > 0) {
          setUsuarios(response.data);
          setError('');
        } else {
          setUsuarios([]);
          setError('Nenhum usuário encontrado com esse termo.');
        }
      } else {
        setError('Resposta inesperada da API.');
      }
    } catch (err) {
      console.error('Erro ao buscar usuários:', err);
      setError('Erro ao buscar usuários.');
    }
  };

  return (
    <View style={{ padding: 20 }}>
      <TextInput
        value={query}
        onChangeText={setQuery}
        placeholder="Buscar por nome, nickname ou tipo de usuário"
        style={{
          borderBottomWidth: 1,
          marginBottom: 20,
          fontSize: 16,
          padding: 8,
        }}
      />
      <Button title="Buscar" onPress={buscarUsuarios} />

      {error ? <Text style={{ color: 'red', marginTop: 10 }}>{error}</Text> : null}

      <FlatList
        data={usuarios}
        keyExtractor={(item) => item.id_user.toString()}
        renderItem={({ item }) => (
          <View
            style={{
              marginVertical: 10,
              padding: 10,
              backgroundColor: '#f2f2f2',
              borderRadius: 8,
            }}
          >
            <Text style={{ fontWeight: 'bold' }}>{item.nome}</Text>
            <Text>Nickname: {item.nickname}</Text>
            <Text>Tipo: {item.tp_user}</Text>
          </View>
        )}
      />
    </View>
  );
};

export default BuscarUsuarios;
