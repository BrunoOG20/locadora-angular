export interface Locacao {
  id: string;
  dtLocacao: Date;
  dtDevolucaoPrevista: Date;
  dtDevolucaoEfetiva: Date;
  valorCobrado: number;
  multaCobrada: number;
}
