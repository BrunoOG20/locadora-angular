import {Component, OnInit} from '@angular/core';
import {Ator} from "../../../models/ator";
import {catchError, config, Observable, of} from "rxjs";
import {MatDialog} from "@angular/material/dialog";
import {ErrorDialogComponent} from "../../../shared/components/error-dialog/error-dialog.component";
import {ActivatedRoute, Router} from "@angular/router";
import {MatSnackBar} from "@angular/material/snack-bar";
import {
  ConfirmationDialogComponent
} from "../../../shared/components/confirmation-dialog/confirmation-dialog.component";
import { Dependente } from 'src/app/models/dependente';
import { ClienteService } from '../../services/clienteList.service';
import { Cliente } from 'src/app/models/cliente';

@Component({
  selector: 'app-clienteList-component',
  templateUrl: './clienteList-component.component.html',
  styleUrls: ['./clienteList-component.component.css']
})
export class ClienteComponent implements OnInit {

  clientes$: Observable<Cliente[]> | null = null;

  constructor(
    private clienteService: ClienteService,
    public dialog: MatDialog,
    private router: Router,
    private route: ActivatedRoute,
    private snackBar: MatSnackBar
    ) {
    this.refresh();
  }

  refresh(){
    this.clientes$ = this.clienteService.list()
      .pipe(
        catchError(error => {
          this.onError('Erro ao carregar clientes!')
          return of([])
        })
      )
  }

  onError(errorMsg: string){
    this.dialog.open(ErrorDialogComponent, {
      data: errorMsg
    });
  }

  ngOnInit() {

  }

}
