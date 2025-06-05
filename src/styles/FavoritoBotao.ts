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
    fontSize: 22,
    fontWeight: "bold",
    marginBottom: 12,
    color: "#3C6E47",
    textAlign: "center",
  },
  itemLista: {
    backgroundColor: "rgba(60, 110, 71, 0.3)",
    padding: 14,
    borderRadius: 12,
    marginVertical: 6,
    shadowColor: "#000",
    shadowOpacity: 0.05,
    shadowOffset: { width: 0, height: 3 },
    shadowRadius: 5,
    elevation: 3,
  },
  listaNome: {
    fontSize: 15,
    color: "#333",
    fontWeight: "bold",
  },
  input: {
    borderWidth: 1,
    borderColor: "#B7B7A4",
    backgroundColor: "#F9F9F9",
    padding: 12,
    borderRadius: 8,
    marginBottom: 14,
    marginTop: 10,
    color: "#023D2E",
  },
  criarBotao: {
    backgroundColor: "#3C6E47",
    paddingVertical: 12,
    borderRadius: 10,
    alignItems: "center",
    height: 48,
    justifyContent: "center",
    width: "100%",
  },
  criarBotaoTexto: {
    color: 'white',
    fontWeight: 'bold',
  },
  cancelar: {
    marginTop: 10,
    alignItems: "center",
    backgroundColor: "#E8EFE8",
    paddingVertical: 10,
    borderRadius: 10,
  },
  cancelarTexto: {
    color: "#2E4F36",
    fontWeight: "600",
    fontSize: 15,
  },
  textoVazio: {
    textAlign: 'center',
    marginTop: 10,
    color: '#888',
  },
});
