import { API_URL } from "@/config/api";
import { uploadArquivosParaBackend } from "@/services/uploadArquivosBackend";
import * as ImagePicker from "expo-image-picker";

const handleEnviarPostagem = async () => {
  try {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsMultipleSelection: true,
    });

    if (result.canceled) return;

    const arquivosSelecionados = result.assets.map((file) => ({
      uri: file.uri,
      type: file.type ?? "image/jpeg",
      name: file.fileName ?? "upload.jpg",
    }));

    const midiaUrls = await uploadArquivosParaBackend(arquivosSelecionados);

    const novaPostagem = {
      tp_post: "evento",
      titulo: "Feira Vegana",
      conteudo: "Vai rolar uma feira vegana no SESC",
      data: "2025-04-27",
      localizacao: "SESC Vila Mariana",
      valor: "20.00",
      links: "https://sescsp.org.br/evento",
      midia_urls: midiaUrls,
    };

    const response = await fetch(`${API_URL}/usuario/postagens`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(novaPostagem),
    });

    const data = await response.json();
    console.log("✅ Postagem criada:", data);
  } catch (error) {
    console.error("❌ Erro ao criar postagem:", error);
  }
};
