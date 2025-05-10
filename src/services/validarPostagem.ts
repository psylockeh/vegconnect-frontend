import { Instrucao } from "@/types";

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
    endereco,
    descricao_resumida,
    tipo_comercio,
    tipo_produto,
    tipo_servico,
  } = dados;

  console.log("🧪 Validação em execução para tipo:", tp_post);
  console.log("📦 Dados recebidos:", dados);

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
      !localizacao?.trim() ||
      !descricao_resumida?.trim()
    ) {
      return "Título, conteúdo, data, local e a descrição são obrigatórios para eventos.";
    }
  }

  if (tp_post === "receita") {
    if (!descricao_resumida?.trim()) {
      return "Por favor, escreva um resumo para a sua postagem.";
    }

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

    const temInstrucaoValida = instrucoes.some(
      (i: Instrucao) => i.texto.trim() !== "" && i.secao.trim() !== ""
    );

    if (!temInstrucaoValida) {
      alert("Adicione pelo menos uma instrução.");
    }

    if (!temp_prep || temp_prep.trim() === "") {
      return "Informe o tempo de preparo (formato HH:MM).";
    }
  }

  if (tp_post === "estabelecimento") {
    const {
      tipo_comercio,
      tp_comida,
      tipo_produto,
      tipo_servico,
      horario_abertura,
      horario_fechamento,
      cep,
      endereco,
      titulo,
      conteudo,
      descricao_resumida,
    } = dados;

    if (!tipo_comercio) return "Informe o tipo de comércio.";

    const baseObrigatorios = [
      titulo?.trim(),
      conteudo?.trim(),
      descricao_resumida?.trim(),
      cep?.trim(),
      endereco?.trim(),
    ];

    const obrigatoriosPorTipo: Record<string, (string | undefined)[]> = {
      restaurante: [
        tp_comida?.trim(),
        horario_abertura?.trim(),
        horario_fechamento?.trim(),
      ],
      feira: [tp_comida?.trim()],
      loja: [tipo_produto?.trim()],
      servico: [tipo_servico?.trim()],
    };

    const extras = obrigatoriosPorTipo[tipo_comercio] || [];

    const algumVazio = [...baseObrigatorios, ...extras].some((campo) => !campo);

    if (algumVazio) {
      return "Preencha todos os campos obrigatórios conforme o tipo de comércio.";
    }
  }

  if (tp_post === "promocao") {
    if (
      !titulo?.trim() ||
      !conteudo?.trim() ||
      !data?.trim() ||
      !descricao_resumida?.trim()
    ) {
      return "Título, conteúdo, data e a descrição são obrigatórios para promoções.";
    }
  }

  return null;
};

export default validarPostagem;
