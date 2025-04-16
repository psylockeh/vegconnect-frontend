const validarPostagem = (tp_post: string, dados: any): string | null => {
  if (tp_post === "recado") {
    if (!dados.conteudo) {
      return "O conteúdo é obrigatório para o recado.";
    }
  }

  if (tp_post === "evento") {
    if (!dados.titulo || !dados.conteudo || !dados.data || !dados.localizacao) {
      return "Título, conteúdo, data e local são obrigatórios para eventos.";
    }
  }

  if (tp_post === "receita") {
    if (
      !dados.titulo ||
      !dados.nome_receita ||
      !dados.ingredientes ||
      !dados.instrucoes ||
      !dados.temp_prep
    ) {
      return "Preencha todos os campos obrigatórios da receita.";
    }
  }

  if (tp_post === "estabelecimento") {
    if (
      !dados.titulo ||
      !dados.conteudo ||
      !dados.tipo_comida ||
      !dados.horario_abertura ||
      !dados.horario_fechamento ||
      !dados.cep ||
      !dados.localizacao
    ) {
      return "Preencha todos os dados do estabelecimento.";
    }
  }

  if (tp_post === "promocao") {
    if (!dados.titulo || !dados.conteudo || !dados.data) {
      return "Título, conteúdo e validade são obrigatórios na promoção.";
    }
  }

  return null;
};

export default validarPostagem;
