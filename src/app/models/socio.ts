import { Dependente } from "./dependente";

export interface Socio {
  id: string;
  nome: string;
  telefone: string;
  sexo: string;
  cpf: string;
  dtNascimento: Date;
  endereco: string;
  dependentes: Dependente[];
  estahAtivo: string
}
