import { Locacao } from "./locacao";

export interface Cliente {
  id: string;
  nome: string;
  sexo: string;
  dtNascimento: Date;
  locacoes: Locacao[];
}
