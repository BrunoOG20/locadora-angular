import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Cliente } from 'src/app/models/cliente';

@Component({
  selector: 'app-clienteList-list',
  templateUrl: './clienteList-list.component.html',
  styleUrls: ['./clienteList-list.component.css']
})
export class ClienteListComponent implements OnInit{

  @Input() clientes: Cliente[] = [];

  readonly displayedColumns = ['numInscricao', 'nome', 'dtNascimento', 'sexo', 'estahAtivo']

  constructor() {
  }

  ngOnInit(): void {
  }

}
