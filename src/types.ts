// Tipo comum a todas as postagens
export interface BasePost {
  tp_post: "receita" | "evento" | "promocao" | "estabelecimento";
  titulo?: string;
  conteudo?: string;
  midia_urls?: string[];
  createdAt?: string;
}

// ---------- RECEITA ----------
export interface Ingrediente {
  nome: string;
  quantidade: string;
  medida: string;
  secao: string;
}
export interface Instrucao {
  texto: string;
  secao: string;
}

export interface ReceitaPost extends BasePost {
  tp_post: "receita";
  nome_receita: string;
  descricao_resumida: string;
  temp_prep: string;
  dificuldade: string;
  rendimento_quantidade: string;
  tipo_rendimento: string;
  categoria: string[];
  calorias: string;
  ingredientes: Ingrediente[];
  instrucoes: string[];
}

// ---------- EVENTO ----------
export interface EventoPost extends BasePost {
  tp_post: "evento";
  data: string;
  localizacao: string;
  valor: string;
  links?: string;
  tp_evento: string;
  categoria_evento: string;
  modalidade_evento: string; // pode ser "online, presencial"
}

// ---------- PROMOÇÃO ----------
export interface PromocaoPost extends BasePost {
  tp_post: "promocao";
  nome_comercio?: string;
  descricao_resumida: string;
  links?: string;
  endereco?: string;
  data: string; // validade ou período
}

// ---------- ESTABELECIMENTO ----------
export interface EstabelecimentoPost extends BasePost {
  tp_post: "estabelecimento";
  nome_comercio: string;
  descricao_comercio: string;
  tp_comida: string;
  horario_abertura: string;
  horario_fechamento: string;
  cep: string;
  endereco: string;
}

// ---------- Tipo união de todas as postagens ----------
export type Postagem =
  | ReceitaPost
  | EventoPost
  | PromocaoPost
  | EstabelecimentoPost;
