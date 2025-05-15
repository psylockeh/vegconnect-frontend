export const formatarValor = (texto: string) => {
  let somenteNumeros = texto.replace(/[^\d]/g, "");
  if (somenteNumeros.length === 0) return "";
  let valorFormatado = (parseInt(somenteNumeros) / 100).toFixed(2);
  return "R$ " + valorFormatado.replace(".", ",");
};

export const formatarData = (texto: string) => {
  const numeros = texto.replace(/\D/g, "").slice(0, 8);
  const dia = numeros.slice(0, 2);
  const mes = numeros.slice(2, 4);
  const ano = numeros.slice(4, 8);

  let formatado = dia;
  if (mes) formatado += "/" + mes;
  if (ano) formatado += "/" + ano;
  return formatado;
};

export const validarLink = (texto: string) => {
  const regex = /^(https?:\/\/)?([\w\d-]+\.){1,}[a-z]{2,}(:\d+)?(\/.*)?$/i;
  return regex.test(texto.trim());
};

export const formatarHora = (texto: string) => {
  const numeros = texto.replace(/\D/g, "").slice(0, 4);
  const hora = numeros.slice(0, 2);
  const minuto = numeros.slice(2, 4);

  let formatado = hora;
  if (minuto) formatado += ":" + minuto;
  return formatado;
};

export const formatarCEP = (texto: string) => {
  const numeros = texto.replace(/\D/g, "").slice(0, 8);
  const parte1 = numeros.slice(0, 5);
  const parte2 = numeros.slice(5, 8);
  return parte2 ? `${parte1}-${parte2}` : parte1;
};

type TipoComercio = "restaurante" | "feira" | "loja" | "servico";

interface DadosEstabelecimento {
  titulo: string;
  conteudo: string;
  descricao_resumida: string;
  cep: string;
  endereco: string;
  tipo_comercio: TipoComercio;
  tp_comida?: string;
  tipo_produto?: string;
  tipo_servico?: string;
  hora_abertura?: string;
  hora_fechamento?: string;
}

export function validarFormatoCep(cep: string) {
  return /^[0-9]{5}-?[0-9]{3}$/.test(cep);
}

export function validarCamposEstabelecimento(dados: DadosEstabelecimento) {
  const camposComuns = [
    "titulo",
    "conteudo",
    "descricao_resumida",
    "cep",
    "endereco",
  ];

  const obrigatorios: Record<TipoComercio, string[]> = {
    restaurante: ["tp_comida", "hora_abertura", "hora_fechamento"],
    feira: ["tp_comida"],
    loja: ["tipo_produto"],
    servico: ["tipo_servico"],
  };

  const campos = [
    ...camposComuns,
    ...(obrigatorios[dados.tipo_comercio] || []),
  ];

  const faltando = campos.filter((c) => {
    const valor = dados[c as keyof DadosEstabelecimento];
    return !valor || valor.toString().trim() === "";
  });

  return {
    valido: faltando.length === 0,
    faltando,
  };
}
