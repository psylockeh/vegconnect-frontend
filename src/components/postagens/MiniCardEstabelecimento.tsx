import React from "react";
import { View, Text, Image, StyleSheet, Pressable } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";

interface Props {
  fotos?: string[];
  nome: string;
  tipo: string;
  endereco: string;
  rating?: number;
  horario?: string[];
  preco?: number;
  onClose?: () => void;
}

const formatarFaixaPreco = (preco?: number) => {
  switch (preco) {
    case 0:
      return "Gratuito";
    case 1:
      return "$";
    case 2:
      return "$$";
    case 3:
      return "$$$";
    case 4:
      return "$$$$";
    default:
      return "Não informado";
  }
};

const MiniCardEstabelecimento = ({
  fotos = [],
  nome,
  tipo,
  endereco,
  rating = 0,
  horario = [],
  preco,
  onClose,
}: Props) => {
  const imagem = fotos[0]
    ? { uri: fotos[0] }
    : require("../../../assets/img/sem-imagem.jpg");

  return (
    <View style={styles.card}>
      <View style={styles.header}>
        <Text style={styles.nome}>{nome}</Text>
        {onClose && (
          <Pressable onPress={onClose}>
            <MaterialIcons name="close" size={20} color="#666" />
          </Pressable>
        )}
      </View>

      <Image source={imagem} style={styles.imagem} />

      <Text style={styles.tipo}>{tipo}</Text>

      <View style={styles.estrelas}>
        {Array.from({ length: 5 }).map((_, i) => (
          <MaterialIcons
            key={i}
            name={i < Math.round(rating) ? "star" : "star-border"}
            size={16}
            color="#FFD700"
          />
        ))}
      </View>

      <Text style={styles.endereco}>{endereco}</Text>
      <Text style={styles.horario}>
        🕒 {horario?.[0] || "Horário não informado"}
      </Text>
      <Text style={styles.preco}>💸 {formatarFaixaPreco(preco)}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: "#fff",
    borderRadius: 12,
    padding: 12,
    width: 320,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 4,
    elevation: 4,
    alignItems: "flex-start",
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "100%",
  },
  nome: {
    fontWeight: "bold",
    fontSize: 16,
    color: "#333",
    flex: 1,
  },
  imagem: {
    width: "100%",
    height: 160,
    borderRadius: 10,
    resizeMode: "cover",
    marginVertical: 10,
  },
  tipo: {
    fontSize: 13,
    color: "#666",
    marginBottom: 4,
  },
  estrelas: {
    flexDirection: "row",
    marginBottom: 4,
  },
  endereco: {
    fontSize: 12,
    color: "#444",
    marginBottom: 4,
  },
  horario: {
    fontSize: 12,
    color: "#444",
    marginBottom: 4,
  },
  preco: {
    fontSize: 12,
    color: "#444",
  },
});

export default MiniCardEstabelecimento;
