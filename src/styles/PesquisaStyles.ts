import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  container: {
    padding: 16,
    maxWidth: '100%',
    alignItems: 'center',
    justifyContent: 'flex-start',
  },
  input: {
    width: '100%',
    padding: 12,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#ccc',
    marginBottom: 16,
    fontSize: 16,
  },
  menuFiltro: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 10,
    marginBottom: 16,
  },
  botaoFiltro: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 25,
    borderWidth: 1,
    borderColor: '#ccc',
    backgroundColor: '#f0f0f0',
  },
  botaoFiltroSelecionado: {
    backgroundColor: '#4CAF50',
    borderColor: '#4CAF50',
  },
  textoBotao: {
    fontSize: 14,
    color: '#333',
  },
  carregando: {
    marginVertical: 16,
  },
  erro: {
    color: 'red',
    fontSize: 16,
    marginVertical: 16,
  },
  cardResultado: {
    padding: 16,
    backgroundColor: '#fff',
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#ddd',
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  textoResultado: {
    fontSize: 14,
    color: '#333',
  },
  semResultado: {
    fontSize: 16,
    color: '#666',
    textAlign: 'center',
  },
});


