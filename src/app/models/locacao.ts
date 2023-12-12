import { Ator } from "./ator";
import { Classe } from "./classe";
import { Cliente } from "./cliente";
import { Item } from "./item";
import { Titulo } from "./titulo";

export interface Locacao {
  id: string;
  dtLocacao: Date;
  dtDevolucaoPrevista: Date;
  dtDevolucaoEfetiva: Date;
  valorCobrado: number;
  multaCobrada: number;
  pago: boolean;
  cliente: Cliente;
  item: Item;
  classe: Classe;
  titulo: Titulo;
  atores: Ator[];

}
