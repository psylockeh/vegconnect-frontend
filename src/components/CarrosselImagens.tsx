import React from "react";
import {
  ScrollView,
  Image,
  StyleSheet,
  View,
  ViewStyle,
  Dimensions,
} from "react-native";

interface Props {
  fotos: string[];
  altura?: number;
  bordaRadius?: number;
  styleContainer?: ViewStyle;
}

const CarrosselImagens = ({
  fotos,
  altura = 180,
  bordaRadius = 12,
  styleContainer,
}: Props) => {
  if (!fotos || fotos.length === 0) return null;

  const screenWidth = Dimensions.get("window").width;
  const largura = screenWidth - 80; // Reduz um pouco para encaixar melhor

  return (
    <View
      style={[
        {
          alignSelf: "center",
          width: largura,
          height: altura,
          borderRadius: bordaRadius,
          overflow: "hidden",
          marginBottom: 12,
        },
        styleContainer,
      ]}
    >
      <ScrollView
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
      >
        {fotos.map((url, index) => (
          <Image
            key={index}
            source={{ uri: url }}
            style={{
              width: largura,
              height: altura,
              resizeMode: "cover",
            }}
          />
        ))}
      </ScrollView>
    </View>
  );
};

export default CarrosselImagens;
