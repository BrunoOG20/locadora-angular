import { Locacao } from "./locacao";

export interface Cliente {
  id: string;
  numInscricao: string;
  nome: string;
  sexo: string;
  dtNascimento: Date;
  locacoes: Locacao[];
}
