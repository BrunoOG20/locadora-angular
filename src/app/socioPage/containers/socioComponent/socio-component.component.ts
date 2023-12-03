import {Component, OnInit} from '@angular/core';
import {SocioService} from "../../services/socio.service";
import {catchError, config, Observable, of} from "rxjs";
import {MatDialog} from "@angular/material/dialog";
import {ErrorDialogComponent} from "../../../shared/components/error-dialog/error-dialog.component";
import {ActivatedRoute, Router} from "@angular/router";
import {MatSnackBar} from "@angular/material/snack-bar";
import {
  ConfirmationDialogComponent
} from "../../../shared/components/confirmation-dialog/confirmation-dialog.component";
import { Socio } from 'src/app/models/socio';

@Component({
  selector: 'app-socio-component',
  templateUrl: './socio-component.component.html',
  styleUrls: ['./socio-component.component.css']
})
export class SocioComponent implements OnInit {

  socios$: Observable<Socio[]> | null = null;

  constructor(
    private socioService: SocioService,
    public dialog: MatDialog,
    private router: Router,
    private route: ActivatedRoute,
    private snackBar: MatSnackBar
    ) {
    this.refresh();
  }

  refresh(){
    this.socios$ = this.socioService.list()
      .pipe(
        catchError(error => {
          this.onError('Erro ao carregar socios!')
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

  onEdit(socio: Socio){
    this.router.navigate(['editar' , socio.id], { relativeTo: this.route });
  }

  onRemove(socio: Socio){
    const dialogRef = this.dialog.open(ConfirmationDialogComponent, {
      data: 'Tem certeza que deseja remover esse Socio?'
    })

    dialogRef.afterClosed().subscribe((result: boolean) => {
      if (result){
        this.socioService.remove(socio.id).subscribe(
          () => {
            this.refresh();
            this.snackBar.open('Socio removido com sucesso.', 'X', {
              duration: 5000,
              verticalPosition: 'top',
              horizontalPosition: 'center'
            });
          },
          (error) => {
            if (error.status === 409) {
              this.onError(error.error.message);
            } else {
              () => this.onError('Erro ao tentar remover Socio.')
            }
          }
        )
      }
    })

  }

  onChangeStatus(socio: Socio){
    const dialogRef = this.dialog.open(ConfirmationDialogComponent, {
      data: socio.estahAtivo ? "Tem certeza que deseja ativar o(a): " + socio.nome : "Tem certeza que deseja desativar o(a): " + socio.nome
    });

    dialogRef.afterClosed().subscribe((result: boolean) => {
      if (result) {
        this.socioService.changeStatus(socio.estahAtivo, socio.id).subscribe({
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
