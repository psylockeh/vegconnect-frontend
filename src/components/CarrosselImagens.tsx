import React from "react";
import { ScrollView, Image, Dimensions, StyleSheet } from "react-native";

interface Props {
  fotos: string[];
}

const CarrosselImagens = ({ fotos }: Props) => {
  if (!fotos || fotos.length === 0) return null;
  const largura = Dimensions.get("window").width - 40;
  return (
    <ScrollView
      horizontal
      pagingEnabled
      showsHorizontalScrollIndicator={false}
      style={{ width: largura }}
    >
      {fotos.map((url, index) => (
        <Image key={index} source={{ uri: url }} style={[styles.imagem, { width: largura }]} />
      ))}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  imagem: {
    height: 200,
    resizeMode: "cover",
  },
});

export default CarrosselImagens;
