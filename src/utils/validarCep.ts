import axios from "axios";

export async function validarCepExiste(cep: string): Promise<boolean> {
  try {
    const cepFormatado = cep.replace(/\D/g, "");
    const { data } = await axios.get(
      `https://viacep.com.br/ws/${cepFormatado}/json`
    );
    return !data.erro;
  } catch {
    return false;
  }
}
