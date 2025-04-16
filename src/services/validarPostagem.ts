// src/components/ModalCriarPostagem.tsx
// ... (conteúdo atual do componente ModalCriarPostagem)

const validarPostagem = (tp_post: string, dados: any): string | null => {
  if (!dados.titulo || !dados.conteudo)
    return "Título e conteúdo são obrigatórios.";

  if (tp_post === "evento") {
    if (!dados.data || !dados.localizacao)
      return "Data e local são obrigatórios.";
  }

  if (tp_post === "receita") {
    if (
      !dados.nome_receita ||
      !dados.ingredientes ||
      !dados.instrucoes ||
      !dados.tempo_preparo
    ) {
      return "Todos os campos da receita são obrigatórios.";
    }
  }

  if (tp_post === "promocao") {
    if (!dados.valor || !dados.data) {
      return "Valor e validade são obrigatórios na promoção.";
    }
  }

  if (tp_post === "estabelecimento") {
    if (
      !dados.tipo_comida ||
      !dados.horario_abertura ||
      !dados.horario_fechamento ||
      !dados.cep ||
      !dados.localizacao
    ) {
      return "Todos os campos de estabelecimento são obrigatórios.";
    }
  }

  return null;
};

export default validarPostagem;
