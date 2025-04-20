import React, { useState } from 'react';
import { View, TextInput, Text, TouchableOpacity, FlatList, ActivityIndicator, StyleSheet } from 'react-native';
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { API_URL } from "@/config/api";
import { styles } from "@/styles/PesquisaStyles"

const PesquisaGeral = () => {
  const [termo, setTermo] = useState('');
  const [tipo, setTipo] = useState('usuario');
  const [resultados, setResultados] = useState<any[]>([]);
  const [carregando, setCarregando] = useState(false);
  const [erro, setErro] = useState('');

  const opcoes = [
    { label: 'Perfil', valor: 'usuario' },
    { label: 'Post', valor: 'recado' },
    { label: 'Receita', valor: 'receita' },
    { label: 'Estabelecimento', valor: 'estabelecimento' },
    { label: 'Evento', valor: 'evento' },
    { label: 'Promoção', valor: 'promocao' },
  ];

  const pesquisar = async (tipoSelecionado: string = tipo) => {
    if (!termo.trim()) {
      setErro('Digite o que deseja pesquisar!!');
      return;
    }

    setErro('');
    setCarregando(true);
    setResultados([]);

    try {
      const token = await AsyncStorage.getItem('@token');
      if (!token) {
        setErro('Token não encontrado!');
        return;
      }

      const response = await axios.get(`${API_URL}/usuario/pesquisaGeral?tipo=${tipoSelecionado}&pesquisa=${encodeURIComponent(termo)}`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      setResultados(response.data);
    } catch (err: any) {
      setErro(err.response?.data?.msg || err.message || '❌ Erro ao realizar pesquisa!!');
    } finally {
      setCarregando(false);
    }
  };

  const handleFiltroClick = (novoTipo: string) => {
    setTipo(novoTipo);
    pesquisar(novoTipo);
  };

  return (
    <View style={styles.container}>
      {/* Campo de texto para pesquisa */}
      <TextInput
        value={termo}
        onChangeText={setTermo}
        placeholder="Pesquisar..."
        onSubmitEditing={() => pesquisar()}  // A pesquisa é iniciada quando o usuário pressionar Enter/Return
        style={styles.input}
      />

      {/* Menu de filtros */}
      <View style={styles.menuFiltro}>
        {opcoes.map((opcao) => (
          <TouchableOpacity
            key={opcao.valor}
            onPress={() => handleFiltroClick(opcao.valor)}  // Define o filtro
            style={[
              styles.botaoFiltro,
              tipo === opcao.valor ? styles.botaoFiltroSelecionado : null
            ]}
          >
            <Text style={styles.textoBotao}>{opcao.label}</Text>
          </TouchableOpacity>
        ))}
      </View>


      {carregando && <ActivityIndicator size="large" color="#00f" style={styles.carregando} />}

      {erro && <Text style={styles.erro}>{erro}</Text>}

      {/* Exibição dos resultados da pesquisa */}
      <FlatList
        data={resultados}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item }) => (
          <View style={styles.cardResultado}>
            <Text style={styles.textoResultado}>{item.nome}</Text>
            <Text style={styles.textoResultado}>{item.descricao}</Text>
          </View>
        )}
        ListEmptyComponent={<Text style={styles.semResultado}>🌱 Nenhum resultado encontrado.</Text>}
      />
    </View>
  );
};

export default PesquisaGeral;