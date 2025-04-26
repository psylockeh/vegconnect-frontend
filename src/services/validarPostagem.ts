const validarPostagem = (tp_post: string, dados: any): string | null => {
  const {
    titulo,
    conteudo,
    nome_receita,
    ingredientes,
    instrucoes,
    temp_prep,
    data,
    localizacao,
    tipo_comida,
    horario_abertura,
    horario_fechamento,
    cep,
  } = dados;

  if (tp_post === "recado") {
    if (!conteudo || typeof conteudo !== "string" || conteudo.trim() === "") {
      return "O conteúdo é obrigatório para o recado.";
    }
  }

  if (tp_post === "evento") {
    if (
      !titulo?.trim() ||
      !conteudo?.trim() ||
      !data?.trim() ||
      !localizacao?.trim()
    ) {
      return "Título, conteúdo, data e local são obrigatórios para eventos.";
    }
  }

  if (tp_post === "receita") {
    if (!nome_receita || nome_receita.trim() === "") {
      return "Nome da receita é obrigatório.";
    }

    if (!Array.isArray(ingredientes) || ingredientes.length === 0) {
      return "Adicione pelo menos um ingrediente.";
    }

    const ingredientesInvalidos = ingredientes.some(
      (i) =>
        !i ||
        typeof i.nome !== "string" ||
        i.nome.trim() === "" ||
        typeof i.quantidade !== "string" ||
        i.quantidade.trim() === ""
    );
    if (ingredientesInvalidos) {
      return "Todos os ingredientes precisam ter nome e quantidade.";
    }

    if (!Array.isArray(instrucoes) || instrucoes.length === 0) {
      return "Adicione pelo menos uma instrução.";
    }

    const instrucoesInvalidas = instrucoes.some(
      (i) => typeof i !== "string" || i.trim() === ""
    );
    if (instrucoesInvalidas) {
      return "Nenhuma instrução pode estar vazia.";
    }

    if (!temp_prep || temp_prep.trim() === "") {
      return "Informe o tempo de preparo (formato HH:MM).";
    }
  }

  if (tp_post === "estabelecimento") {
    if (
      !titulo?.trim() ||
      !conteudo?.trim() ||
      !tipo_comida?.trim() ||
      !horario_abertura?.trim() ||
      !horario_fechamento?.trim() ||
      !cep?.trim() ||
      !localizacao?.trim()
    ) {
      return "Preencha todos os dados obrigatórios do estabelecimento.";
    }
  }

  if (tp_post === "promocao") {
    if (!titulo?.trim() || !conteudo?.trim() || !data?.trim()) {
      return "Título, conteúdo e validade são obrigatórios na promoção.";
    }
  }

  return null;
};

export default validarPostagem;
