import { API_URL } from "@/config/api";

export interface DetalhesGoogle {
  fotos: string[];
  rating: number;
  preco?: number;
  horario?: string[];
}

export async function buscarDetalhes(placeId: string): Promise<DetalhesGoogle> {
  try {
    const response = await fetch(
      `${API_URL}/externo/google/places/details?place_id=${placeId}`
    );
    if (!response.ok) throw new Error("Erro na API de detalhes do Google");
    const data = await response.json();

    return {
      fotos: data.fotos || [],
      rating: data.rating || 0,
      preco: data.preco ?? undefined,
      horario: Array.isArray(data.horario) ? data.horario : [],
    };
  } catch (error) {
    console.error("Erro ao buscar detalhes do Google:", error);
    return { fotos: [], rating: 0 };
  }
}
