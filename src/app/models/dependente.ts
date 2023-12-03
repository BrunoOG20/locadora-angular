import { Socio } from "./socio";

export interface Dependente {
  id: string;
  nome: string;
  sexo: string;
  dtNascimento: Date;
  socio: Socio
  estahAtivo: boolean
}
