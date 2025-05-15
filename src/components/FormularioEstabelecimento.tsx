import { useState } from "react";
import {
  validarCamposEstabelecimento,
  validarFormatoCep,
} from "../utils/formatadores";
import { validarCepExiste } from "../utils/validarCep";

const [dados, setDados] = useState({
  titulo: "",
  conteudo: "",
  descricao_resumida: "",
  cep: "",
  endereco: "",
  tipo_comercio: "" as "restaurante" | "feira" | "loja" | "servico",
  tp_comida: "",
  tipo_produto: "",
  tipo_servico: "",
  hora_abertura: "",
  hora_fechamento: "",
});
