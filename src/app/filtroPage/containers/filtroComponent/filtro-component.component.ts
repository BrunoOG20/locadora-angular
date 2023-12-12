import { LocacaoService } from './../../../locacaoPage/services/locacao.service';
import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {Ator} from "../../../models/ator";
import {catchError, config, Observable, of} from "rxjs";
import {MatDialog} from "@angular/material/dialog";
import {ErrorDialogComponent} from "../../../shared/components/error-dialog/error-dialog.component";
import {ActivatedRoute, Router} from "@angular/router";
import {MatSnackBar} from "@angular/material/snack-bar";
import { ClienteService } from '../../services/clienteList.service';
import { MatTableDataSource } from '@angular/material/table';
import { Locacao } from 'src/app/models/locacao';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-filtro-component',
  templateUrl: './filtro-component.component.html',
  styleUrls: ['./filtro-component.component.css']
})
export class FiltroComponent implements OnInit {

  displayedColumns = ['cliente', 'item', 'valor', 'dtLocacao', 'categoria', 'atores'];
  locacoes!: MatTableDataSource<Locacao>;
  filterControl: FormControl = new FormControl();
  @ViewChild('inputElement') inputElement!: ElementRef;

  constructor(
    private clienteService: ClienteService,
    private locacaoService: LocacaoService,
    public dialog: MatDialog,
    private router: Router,
    private route: ActivatedRoute,
    private snackBar: MatSnackBar
    ) {  }


  ngOnInit(): void {
    this.getLocacaoList();
  }

  getLocacaoList() {
    this.locacaoService.list().subscribe({
      next: (loc) => {
        this.locacoes = new MatTableDataSource(loc as Locacao[]);
      },
      error: (error) => { this.onError(error.error.error) }
    })
  }

  onError(errorMsg: string){
    this.dialog.open(ErrorDialogComponent, {
      data: errorMsg
    });
  }

  mostrarAtores(atores: Ator[]) {
    console.log(atores)
    return atores.map((ator: Ator) => ator.nome).join(', ');
  }

  testFilter() {
    const option = this.filterControl.value;
    const filterValue = this.inputElement.nativeElement.value;
    console.log(option)
    if (option === 'titulo') {
      this.locacoes.filterPredicate = (locacao: Locacao, filter: string) => {
        return locacao.titulo.nome.toLowerCase().includes(filter);
      }
    } else if (option === 'categoria') {
      this.locacoes.filterPredicate = (locacao: Locacao, filter: string) => {
        console.log(locacao)
        return locacao.titulo.categoria.toLowerCase().includes(filter);
      }
    } else if (option === 'ator') {
      this.locacoes.filterPredicate = (locacao: Locacao, filter: string) => {
        return locacao.atores
          .some(ator => ator.nome.toLowerCase().includes(filter.toLowerCase()));
      };
    } else {
      this.locacoes.filterPredicate = (locacao: Locacao, filter: string) => {
        return locacao.cliente.nome.toLowerCase().includes(filter);
      }
    }

    this.locacoes.filter = filterValue.trim().toLowerCase();
  }

  applyFilter(event: Event) {
    this.testFilter();
  }


}
