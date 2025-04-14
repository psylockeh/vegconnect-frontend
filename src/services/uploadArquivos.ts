export const uploadArquivosParaBackend = async (arquivos: any[]) => {
  const formData = new FormData();

  arquivos.forEach((arquivo, index) => {
    formData.append("arquivos", {
      uri: arquivo.uri,
      type: arquivo.type || "application/octet-stream",
      name: `arquivo_${index}`,
    } as any);
  });

  try {
    const response = await fetch("http://localhost:3000/upload", {
      method: "POST",
      body: formData,
    });

    const data = await response.json();
    return data.urls;
  } catch (error) {
    console.error("Erro ao fazer upload múltiplo:", error);
    throw error;
  }
};
