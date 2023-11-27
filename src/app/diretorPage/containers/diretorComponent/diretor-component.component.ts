import {Component, OnInit} from '@angular/core';
import { DiretorService} from "../../services/diretor.service";
import {catchError, config, Observable, of} from "rxjs";
import {MatDialog} from "@angular/material/dialog";
import {ErrorDialogComponent} from "../../../shared/components/error-dialog/error-dialog.component";
import {ActivatedRoute, Router} from "@angular/router";
import {MatSnackBar} from "@angular/material/snack-bar";
import {
  ConfirmationDialogComponent
} from "../../../shared/components/confirmation-dialog/confirmation-dialog.component";
import {Diretor} from "../../../models/diretor";

@Component({
  selector: 'app-diretor-component',
  templateUrl: './diretor-component.component.html',
  styleUrls: ['./diretor-component.component.css']
})
export class DiretorComponent implements OnInit {

  diretores$: Observable<Diretor[]> | null = null;

  constructor(
    private diretorService: DiretorService,
    public dialog: MatDialog,
    private router: Router,
    private route: ActivatedRoute,
    private snackBar: MatSnackBar
    ) {
    this.refresh();
  }

  refresh(){
    this.diretores$ = this.diretorService.list()
      .pipe(
        catchError(error => {
          this.onError('Erro ao carregar diretores!')
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

  onEdit(diretor: Diretor){
    this.router.navigate(['editar' , diretor.id], { relativeTo: this.route });
  }

  onRemove(diretor: Diretor){
    const dialogRef = this.dialog.open(ConfirmationDialogComponent, {
      data: 'Tem certeza que deseja remover essa Classe?'
    })

    dialogRef.afterClosed().subscribe((result: boolean) => {
      if (result){
        this.diretorService.remove(diretor.id).subscribe(
          () => {
            this.refresh();
            this.snackBar.open('Diretor removido com sucesso.', 'X', {
              duration: 5000,
              verticalPosition: 'top',
              horizontalPosition: 'center'
            });
          },
          (error) => {
            if (error.status === 409) {
              this.onError(error.error.message);
            } else {
              () => this.onError('Erro ao tentar remover Diretor.')
            }
          }
        )
      }
    })
    
  }




}
