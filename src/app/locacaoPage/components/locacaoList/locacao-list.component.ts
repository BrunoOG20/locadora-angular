import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import { Dependente } from 'src/app/models/dependente';
import { Locacao } from 'src/app/models/locacao';

@Component({
  selector: 'app-locacao-list',
  templateUrl: './locacao-list.component.html',
  styleUrls: ['./locacao-list.component.css']
})
export class LocacaoListComponent implements OnInit{

  @Input() locacoes: Locacao[] = [];
  @Output() add = new EventEmitter(false)
  @Output() edit = new EventEmitter(false);
  @Output() remove = new EventEmitter(false);
  @Output() efetuarPagamento = new EventEmitter(false);

  readonly displayedColumns = ['id', 'dtLocacao', 'dtDevolucaoPrevista', 'dtDevolucaoEfetiva', 'valorCobrado', 'multaCobrada', 'cliente', 'item', 'pago', 'acoes']

  semPagamento = "Pagar Locação";
  comPagamento = "Locação Paga";

  devolucaoEfetuada: boolean | undefined;

  constructor() {
  }

  ngOnInit(): void {
  }

  onAdd(){
    this.add.emit(true)
  }

  onEdit(locacao: Locacao){
    this.edit.emit(locacao);
  }

  onDelete(locacao: Locacao){
    this.remove.emit(locacao)
  }

  checarDevolucao(locacao: Locacao){
    if (locacao.dtDevolucaoEfetiva == null){
      return true;
    }
    return false;
  }

  pagarLocacao(locacao: Locacao){
    locacao.pago = true;
    this.efetuarPagamento.emit(locacao);
  }

}
