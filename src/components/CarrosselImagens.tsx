import React from "react";
import {
  FlatList,
  Image,
  View,
  Dimensions,
  StyleSheet,
  ViewStyle,
} from "react-native";

interface Props {
  fotos: string[];
  styleContainer?: ViewStyle;
}

const screenWidth = Dimensions.get("window").width;
const larguraCard = screenWidth * 0.85;

const CarrosselImagens = ({ fotos, styleContainer }: Props) => {
  if (!fotos || fotos.length === 0) return null;

  return (
    <View style={[styles.container, styleContainer]}>
      <FlatList
        data={fotos}
        keyExtractor={(_, index) => index.toString()}
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={{ paddingHorizontal: 16 }}
        renderItem={({ item }) => (
          <View style={styles.card}>
            <Image
              source={{ uri: item }}
              style={styles.imagem}
              resizeMode="contain"
            />
          </View>
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginBottom: 16,
  },
  card: {
    width: larguraCard,
    aspectRatio: 4 / 3,
    borderRadius: 12,
    overflow: "hidden",
    backgroundColor: "#f0f0f0",
    marginRight: 16,
    alignItems: "center",
    justifyContent: "center",
  },
  imagem: {
    width: "100%",
    height: "100%",
  },
});

export default CarrosselImagens;
