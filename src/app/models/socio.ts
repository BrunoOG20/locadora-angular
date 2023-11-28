import { Dependente } from "./dependente";
import { Locacao } from "./locacao";

export interface Socio {
  id: string;
  nome: string;
  telefone: string;
  sexo: string;
  cpf: string;
  dtNascimento: Date;
  endereco: string;
  dependentes: Dependente[];
  locacoes: Locacao[];
}
