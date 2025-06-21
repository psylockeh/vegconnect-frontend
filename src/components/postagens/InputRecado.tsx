import { View, TextInput, Pressable, Text } from "react-native";
import { useRef, useState } from "react";
import { MaterialIcons } from "@expo/vector-icons";
import feedStyles from "@/styles/FeedStyles";

interface Props {
  onSubmit: (texto: string) => void;
}

export default function InputRecado({ onSubmit }: Props) {
  const recadoTextoRef = useRef("");
  const [recadoTexto, setRecadoTexto] = useState("");

  const handleChangeText = (text: string) => {
    recadoTextoRef.current = text;
    setRecadoTexto(text);
  };

  return (
    <>
      <TextInput
        maxLength={500}
        multiline
        placeholder="Sobre o que você quer falar?"
        placeholderTextColor="#999"
        onChangeText={handleChangeText}
        style={[feedStyles.input, { textAlignVertical: "top" }]}
      />

      <View
        style={{
          flexDirection: "row",
          justifyContent: "flex-end",
          alignItems: "center",
          marginTop: 4,
        }}
      >
        <Text
          style={{
            color: recadoTexto.length > 450 ? "#E74C3C" : "#888",
            fontSize: 12,
            marginRight: 8,
          }}
        >
          {recadoTexto.length}/500
        </Text>
        <Pressable
          onPress={() =>
            alert("O campo de recado aceita no máximo 500 caracteres.")
          }
          hitSlop={10}
        >
          <MaterialIcons name="info-outline" size={18} color="#888" />
        </Pressable>
      </View>

      <Pressable
        onPress={() => onSubmit(recadoTextoRef.current)}
        disabled={!recadoTexto.trim()}
        style={[
          feedStyles.botaoPublicar,
          {
            backgroundColor: recadoTexto.trim() ? "#3C6E47" : "#ccc",
            alignSelf: "flex-end",
            marginTop: 10,
          },
        ]}
      >
        <Text style={feedStyles.textoBotaoPublicar}>Publicar</Text>
      </Pressable>
    </>
  );
}
