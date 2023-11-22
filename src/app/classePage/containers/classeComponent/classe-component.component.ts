import {Component, OnInit} from '@angular/core';
import {Classe} from "../../../models/classe";
import { ClasseService } from "../../services/classe.service";
import {catchError, config, Observable, of} from "rxjs";
import {MatDialog} from "@angular/material/dialog";
import {ErrorDialogComponent} from "../../../shared/components/error-dialog/error-dialog.component";
import {ActivatedRoute, Router} from "@angular/router";
import {MatSnackBar} from "@angular/material/snack-bar";
import {error} from "@angular/compiler-cli/src/transformers/util";
import {
  ConfirmationDialogComponent
} from "../../../shared/components/confirmation-dialog/confirmation-dialog.component";

@Component({
  selector: 'app-classe-component',
  templateUrl: './classe-component.component.html',
  styleUrls: ['./classe-component.component.css']
})
export class ClasseComponent implements OnInit {

  classes$: Observable<Classe[]> | null = null;

  constructor(
    private classeService: ClasseService,
    public dialog: MatDialog,
    private router: Router,
    private route: ActivatedRoute,
    private snackBar: MatSnackBar
    ) {
    this.refresh();
  }

  refresh(){
    this.classes$ = this.classeService.list()
      .pipe(
        catchError(error => {
          this.onError('Erro ao carregar classes!')
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

  onEdit(classe: Classe){
    this.router.navigate(['editar' , classe.id], { relativeTo: this.route });
  }

  onRemove(classe: Classe){
    const dialogRef = this.dialog.open(ConfirmationDialogComponent, {
      data: 'Tem certeza que deseja remover essa Classe?'
    })

    dialogRef.afterClosed().subscribe((result: boolean) => {
      if (result){
        this.classeService.remove(classe.id).subscribe(
          () => {
            this.refresh();
            this.snackBar.open('Classe removida com sucesso.', 'X', {
              duration: 5000,
              verticalPosition: 'top',
              horizontalPosition: 'center'
            });
          },
          (error) => {
            if (error.status === 409) {
              this.onError(error.error.message);
            } else {
              () => this.onError('Erro ao tentar remover Classe.')
            }
          }
        )
      }
    })
    
  }




}
