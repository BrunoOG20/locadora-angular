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
import { DependenteService } from '../../services/dependente.service';

@Component({
  selector: 'app-dependente-component',
  templateUrl: './dependente-component.component.html',
  styleUrls: ['./dependente-component.component.css']
})
export class DependenteComponent implements OnInit {

  dependentes$: Observable<Dependente[]> | null = null;

  constructor(
    private dependenteService: DependenteService,
    public dialog: MatDialog,
    private router: Router,
    private route: ActivatedRoute,
    private snackBar: MatSnackBar
    ) {
    this.refresh();
  }

  refresh(){
    this.dependentes$ = this.dependenteService.list()
      .pipe(
        catchError(error => {
          this.onError('Erro ao carregar dependentes!')
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

  onEdit(dependente: Dependente){
    this.router.navigate(['editar' , dependente.id], { relativeTo: this.route });
  }

  onRemove(dependente: Dependente){
    const dialogRef = this.dialog.open(ConfirmationDialogComponent, {
      data: 'Tem certeza que deseja remover esse Dependente?'
    })

    dialogRef.afterClosed().subscribe((result: boolean) => {
      if (result){
        this.dependenteService.remove(dependente.id).subscribe(
          () => {
            this.refresh();
            this.snackBar.open('Dependente removido com sucesso.', 'X', {
              duration: 5000,
              verticalPosition: 'top',
              horizontalPosition: 'center'
            });
          },
          (error) => {
            if (error.status === 409) {
              this.onError(error.error.message);
            } else {
              () => this.onError('Erro ao tentar remover Dependente.')
            }
          }
        )
      }
    })

  }

  onChangeStatus(dependente: Dependente){
    const dialogRef = this.dialog.open(ConfirmationDialogComponent, {
      data: dependente.estahAtivo ? "Tem certeza que deseja ativar o(a): " + dependente.nome : "Tem certeza que deseja desativar o(a): " + dependente.nome
    });

    dialogRef.afterClosed().subscribe((result: boolean) => {
      if (result) {
        this.dependenteService.changeStatus(dependente.estahAtivo, dependente.id).subscribe({
          next: () =>  this.refresh(),
          error: (error: any) => {
            this.onError(error.error);
            this.refresh();
        }});
      } else {
         this.refresh();
      }
    })


    }

}
