import { uploadArquivosParaBackend } from "../../src/services/uploadArquivosBackend";

const handleEnviarPostagem = async () => {
  try {
    const arquivosSelecionados: { uri: string; type: string; name: string }[] =
      [];

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

    const response = await fetch("http://localhost:3000/usuario/postagens", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(novaPostagem),
    });

    const data = await response.json();
    console.log("Postagem criada:", data);
  } catch (error) {
    console.error("Erro ao criar postagem:", error);
  }
};
