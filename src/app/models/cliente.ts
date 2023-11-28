import { Locacao } from "./locacao";

export interface Cliente {
  id: string;
  nome: string;
  telefone: string;
  sexo: string;
  cpf: string;
  dtNascimento: Date;
  endereco: string;
  locacoes: Locacao[];
}
