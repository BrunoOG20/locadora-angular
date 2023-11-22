import {Component, OnInit} from '@angular/core';
import {Ator} from "../../../models/ator";
import {AtorService} from "../../services/ator.service";
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
  templateUrl: './ator-component.component.html',
  styleUrls: ['./ator-component.component.css']
})
export class AtorComponent implements OnInit {

  atores$: Observable<Ator[]> | null = null;

  constructor(
    private atorService: AtorService,
    public dialog: MatDialog,
    private router: Router,
    private route: ActivatedRoute,
    private snackBar: MatSnackBar
    ) {
    this.refresh();
  }

  refresh(){
    this.atores$ = this.atorService.list()
      .pipe(
        catchError(error => {
          this.onError('Erro ao carregar atores!')
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

  onEdit(ator: Ator){
    this.router.navigate(['editar' , ator.id], { relativeTo: this.route });
  }

  onRemove(ator: Ator){
    const dialogRef = this.dialog.open(ConfirmationDialogComponent, {
      data: 'Tem certeza que deseja remover esse Ator?'
    })

    dialogRef.afterClosed().subscribe((result: boolean) => {
      if (result){
        this.atorService.remove(ator.id).subscribe(
          () => {
            this.refresh();
            this.snackBar.open('Ator removido com sucesso.', 'X', {
              duration: 5000,
              verticalPosition: 'top',
              horizontalPosition: 'center'
            });
          },
          (error) => {
            if (error.status === 409) {
              this.onError(error.error.message);
          () => this.onError('Erro ao tentar remover Ator.')
            }
          }
        )
      }
    })
    
  }

}
