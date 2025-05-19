import { API_URL } from "../config/api";

export async function uploadArquivosParaBackend(
  arquivos: any[]
): Promise<string[]> {
  const formData = new FormData();

  arquivos.forEach((arquivo, index) => {
    formData.append("arquivos", {
      uri: arquivo.uri,
      name: arquivo.name || `arquivo-${index}.png`,
      type: arquivo.type || "image/jpeg",
    } as any);
  });

  const response = await fetch(`${API_URL}/upload`, {
    method: "POST",
    body: formData,
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });

  if (!response.ok) {
    throw new Error("Erro ao fazer upload das mídias.");
  }

  const resultado = await response.json();
  return resultado.urls;
}
