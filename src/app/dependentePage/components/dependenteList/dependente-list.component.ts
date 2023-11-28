import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Dependente } from 'src/app/models/dependente';
import { Locacao } from 'src/app/models/locacao';

@Component({
  selector: 'app-dependente-list',
  templateUrl: './dependente-list.component.html',
  styleUrls: ['./dependente-list.component.css']
})
export class DependenteListComponent implements OnInit{

  @Input() dependentes: Dependente[] = [];
  @Output() add = new EventEmitter(false)
  @Output() edit = new EventEmitter(false);
  @Output() remove = new EventEmitter(false);

  readonly displayedColumns = ['id', 'nome', 'telefone', 'sexo', 'dtNascimento', 'acoes']

  constructor() {
  }

  ngOnInit(): void {
  }

  onAdd(){
    this.add.emit(true)
  }

  onEdit(dependente: Dependente){
    this.edit.emit(dependente);
  }

  onDelete(dependente: Dependente){
    this.remove.emit(dependente)
  }

}
