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
    const response = await fetch("http:// 172.20.10.11:3000/upload", {
      method: "POST",
      body: formData,
    });

    const data = await response.json();
    return data.urls;
  } catch (error) {
    console.error("Erro no upload de arquivos:", error);
    throw error;
  }
};
