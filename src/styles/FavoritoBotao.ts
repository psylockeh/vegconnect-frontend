import { StyleSheet } from 'react-native';

export default StyleSheet.create({
  botao: {
    padding: 8,
    alignSelf: 'flex-end',
  },
  sobrePosicao: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.4)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  containerModal: {
    width: '90%',
    backgroundColor: 'white',
    padding: 20,
    borderRadius: 12,
    elevation: 4,
  },
  titulo: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 12,
  },
  itemLista: {
    padding: 10,
    borderBottomWidth: 1,
    borderColor: '#eee',
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 10,
    borderRadius: 6,
    marginVertical: 10,
  },
  criarBotao: {
    backgroundColor: '#4CAF50',
    padding: 12,
    borderRadius: 8,
    alignItems: 'center',
  },
  criarBotaoTexto: {
    color: 'white',
    fontWeight: 'bold',
  },
  cancelar: {
    marginTop: 10,
    alignItems: 'center',
  },
  cancelarTexto: {
    color: 'red',
  },
  textoVazio: {
    textAlign: 'center',
    marginTop: 10,
    color: '#888',
  },
});
