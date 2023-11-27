import {Component, OnInit} from '@angular/core';
import {Titulo} from "../../../models/titulo";
import { TituloService } from "../../services/titulo.service";
import {catchError, config, Observable, of} from "rxjs";
import {MatDialog} from "@angular/material/dialog";
import {ErrorDialogComponent} from "../../../shared/components/error-dialog/error-dialog.component";
import {ActivatedRoute, Router} from "@angular/router";
import {MatSnackBar} from "@angular/material/snack-bar";

import {
  ConfirmationDialogComponent
} from "../../../shared/components/confirmation-dialog/confirmation-dialog.component";

@Component({
  selector: 'app-titulo-component',
  templateUrl: './titulo-component.component.html',
  styleUrls: ['./titulo-component.component.css']
})
export class TituloComponent implements OnInit {

  titulos$: Observable<Titulo[]> | null = null;

  constructor(
    private tituloService: TituloService,
    public dialog: MatDialog,
    private router: Router,
    private route: ActivatedRoute,
    private snackBar: MatSnackBar
    ) {
    this.refresh();
  }

  refresh(){
  
    this.titulos$ = this.tituloService.list()
      .pipe(
        catchError(error => {
          this.onError('Erro ao carregar titulos!')
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

  onEdit(titulo: Titulo){
    this.router.navigate(['editar' , titulo.id], { relativeTo: this.route });
  }

  onRemove(titulo: Titulo){
    const dialogRef = this.dialog.open(ConfirmationDialogComponent, {
      data: 'Tem certeza que deseja remover esse Titulo?'
    })

    dialogRef.afterClosed().subscribe((result: boolean) => {
      if (result){
        this.tituloService.remove(titulo.id).subscribe(
          () => {
            this.refresh();
            this.snackBar.open('Titulo removido com sucesso.', 'X', {
              duration: 5000,
              verticalPosition: 'top',
              horizontalPosition: 'center'
            });
          },
          (error) => {
            if (error.status === 409) {
              this.onError(error.error.message);
            } else {
              () => this.onError('Erro ao tentar remover Titulo.')
            }
          }
        )
      }
    })
    
  }




}
