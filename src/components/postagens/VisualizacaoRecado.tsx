import { View, Text, StyleSheet, Image } from "react-native";
import CarrosselImagens from "@/components/CarrosselImagens";

type Postagem = {
  midia_urls?: string[];
  conteudo: string;
};

interface Props {
  postagem: Postagem;
}

export default function VisualizacaoRecado({ postagem }: Props) {
  return (
    <View style={styles.container}>
      {/* Tag tipo de post */}
      <View style={styles.tagWrapper}>
        <View style={[styles.tagTipoPost, { backgroundColor: "#558B2F" }]}>
          <Text style={styles.tagTipoText}>Recado</Text>
        </View>
      </View>
      {/* Carrossel de mídias */}
      {Array.isArray(postagem.midia_urls) && postagem.midia_urls.length > 0 && (
        <CarrosselImagens fotos={postagem.midia_urls} />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 16,
    backgroundColor: "#fff",
    borderRadius: 12,
    marginVertical: 8,
    shadowColor: "#000",
    shadowOpacity: 0.05,
    shadowOffset: { width: 0, height: 2 },
  },
  tagWrapper: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 12,
  },
  tagTipoPost: {
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 20,
  },
  tagTipoText: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 12,
  },
  conteudoTexto: {
    fontSize: 15,
    color: "#333",
    lineHeight: 22,
  },
  itemTexto: {
    fontSize: 15,
    lineHeight: 22,
    color: "#333",
    marginTop: 12,
    paddingHorizontal: 4,
  },
});
