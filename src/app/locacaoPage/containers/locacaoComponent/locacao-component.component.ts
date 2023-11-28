import {Component, OnInit} from '@angular/core';
import {catchError, config, Observable, of} from "rxjs";
import {MatDialog} from "@angular/material/dialog";
import {ErrorDialogComponent} from "../../../shared/components/error-dialog/error-dialog.component";
import {ActivatedRoute, Router} from "@angular/router";
import {MatSnackBar} from "@angular/material/snack-bar";

import {
  ConfirmationDialogComponent
} from "../../../shared/components/confirmation-dialog/confirmation-dialog.component";
import { Item } from 'src/app/models/item';
import { LocacaoService } from '../../services/locacao.service';
import { Locacao } from 'src/app/models/locacao';

@Component({
  selector: 'app-locacao-component',
  templateUrl: './locacao-component.component.html',
  styleUrls: ['./locacao-component.component.css']
})
export class LocacaoComponent implements OnInit {

  locacoes$: Observable<Locacao[]> | null = null;

  constructor(
    private locacaoSevice: LocacaoService,
    public dialog: MatDialog,
    private router: Router,
    private route: ActivatedRoute,
    private snackBar: MatSnackBar
    ) {
    this.refresh();
  }

  refresh(){

    this.locacoes$ = this.locacaoSevice.list()
      .pipe(
        catchError(error => {
          this.onError('Erro ao carregar locacoes!')
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

  onAdd(){
    this.router.navigate(['novo'], {relativeTo: this.route});
  }

  onEdit(item: Item){
    this.router.navigate(['editar' , item.id], { relativeTo: this.route });
  }

  onRemove(item: Item){
    const dialogRef = this.dialog.open(ConfirmationDialogComponent, {
      data: 'Tem certeza que deseja remover essa Locacao?'
    })

    dialogRef.afterClosed().subscribe((result: boolean) => {
      if (result){
        this.locacaoSevice.remove(item.id).subscribe(
          () => {
            this.refresh();
            this.snackBar.open('Locacao removida com sucesso.', 'X', {
              duration: 5000,
              verticalPosition: 'top',
              horizontalPosition: 'center'
            });
          },
          () => this.onError('Erro ao tentar remover Locacao.')
        )
      }
    })
  }




}
