import React from "react";
import {
  Pressable,
  Text,
  View,
  StyleSheet,
  GestureResponderEvent,
  ViewStyle,
  TextStyle,
} from "react-native";
import LottieView from "lottie-react-native";

interface Props {
  onPress: (event: GestureResponderEvent) => void;
  texto: string;
  loading: boolean;
  estiloBotao?: ViewStyle;
  estiloTexto?: TextStyle;
  disabled?: boolean;
}

export default function BotaoComLoader({
  onPress,
  texto,
  loading,
  estiloBotao,
  estiloTexto,
  disabled,
}: Props) {
  return (
    <Pressable
      onPress={onPress}
      disabled={loading || disabled}
      style={[styles.botao, estiloBotao]}
    >
      {loading ? (
        <View style={styles.wrapperLoading}>
          <LottieView
            source={require("@/assets/animations/loading_anim.json")}
            autoPlay
            loop
            style={styles.loadingAnimacao}
          />
        </View>
      ) : (
        <Text style={[styles.textoBotao, estiloTexto]}>{texto}</Text>
      )}
    </Pressable>
  );
}

const styles = StyleSheet.create({
  botao: {
    backgroundColor: "#54C6A5",
    height: 48,
    borderRadius: 12,
    justifyContent: "center",
    alignItems: "center",
    width: "100%",
  },
  textoBotao: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
  wrapperLoading: {
    justifyContent: "center",
    alignItems: "center",
    height: "100%",
    width: "100%",
  },
  loadingAnimacao: {
    width: 28,
    height: 28,
  },
});
