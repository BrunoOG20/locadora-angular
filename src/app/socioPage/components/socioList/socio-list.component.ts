import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Ator} from "../../../models/ator";
import { Socio } from 'src/app/models/socio';

@Component({
  selector: 'app-socio-list',
  templateUrl: './socio-list.component.html',
  styleUrls: ['./socio-list.component.css']
})
export class SocioListComponent implements OnInit{

  @Input() socios: Socio[] = [];
  @Output() add = new EventEmitter(false)
  @Output() edit = new EventEmitter(false);
  @Output() remove = new EventEmitter(false);

  readonly displayedColumns = ['id', 'nome', 'telefone', 'sexo', 'cpf', 'dtNascimento', 'acoes']

  constructor() {
  }

  ngOnInit(): void {
  }

  onAdd(){
    this.add.emit(true)
  }

  onEdit(socio: Socio){
    this.edit.emit(socio);
  }

  onDelete(socio: Socio){
    this.remove.emit(socio)
  }

}
