import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, NonNullableFormBuilder, Validators } from "@angular/forms";
import { Location } from '@angular/common'
import { MatSnackBar } from "@angular/material/snack-bar";
import { ActivatedRoute } from "@angular/router";

import { Titulo } from "../../../models/titulo";
import { FormUtilsService } from 'src/app/shared/form/form-utils.service';
import { Locacao } from 'src/app/models/locacao';
import { LocacaoService } from '../../services/locacao.service';

@Component({
  selector: 'app-locacao-form',
  templateUrl: './locacao-form.component.html',
  styleUrls: ['./locacao-form.component.css']
})
export class LocacaoFormComponent implements OnInit{
  tituloData: Titulo[] = [];

  form!: FormGroup;

  locacao: Locacao = {} as Locacao

  constructor(private formBuilder: NonNullableFormBuilder,
    private service: LocacaoService,
    private snackBar: MatSnackBar,
    private location: Location,
    private route: ActivatedRoute,
    public formUtils: FormUtilsService
  ) {
  }


  ngOnInit() {
    this.locacao = this.route.snapshot.data['item'];


    this.form = this.formBuilder.group({
      id: [''],
      numSerie: ['', [
        Validators.required,
        Validators.minLength(1),
        Validators.maxLength(100)]],
    });

    if(this.locacao) this.form.patchValue(this.locacao);
  }


  onSubmit(){
      if (this.form.valid) {
        this.service.save(this.form.value)
          .subscribe(result => this.onSuccess(), error => this.onError());
      } else {
        this.formUtils.validateAllFormFields(this.form);
      }
    }

  onCancel(){
    this.location.back();
  }

  private onSuccess(){
    this.snackBar.open('Locacao salva com sucesso', '', {duration: 5000});
    this.onCancel()
  }

  private onError(){
    this.snackBar.open('Erro ao salvar Locacao', '', {duration: 5000});
  }

  getErrorMessage(fieldName: string){
    const field = this.form.get(fieldName);

    if (field?.hasError('required')){
      return 'Campo obrigatório';
    }

    if (field?.hasError('minlength')){
      const requiredLength = field.errors ? field.errors['minlength']['requiredLength'] : 3;
      return `Tamanho mínimo precisa ser de ${requiredLength} caracteres`;
    }

    if (field?.hasError('maxlength')){
      const requiredLength = field.errors ? field.errors['maxlength']['requiredLength'] : 100;
      return `Tamanho maximo excedido de ${requiredLength} caracteres`;
    }

    return 'Campo inválido';
  }

}
