import { SocioService } from './../../../socioPage/services/socio.service';
import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup, NonNullableFormBuilder, Validators} from "@angular/forms";
import { Location } from '@angular/common'
import { DependenteService } from "../../services/dependente.service";
import { MatSnackBar } from "@angular/material/snack-bar";
import { ActivatedRoute } from "@angular/router";
import { FormUtilsService } from 'src/app/shared/form/form-utils.service';
import { Dependente } from 'src/app/models/dependente';
import { Locacao } from 'src/app/models/locacao';
import { Socio } from 'src/app/models/socio';
import { LocacaoService } from 'src/app/locacaoPage/services/locacao.service';

@Component({
  selector: 'app-dependente-form',
  templateUrl: './dependente-form.component.html',
  styleUrls: ['./dependente-form.component.css']
})
export class DependenteFormComponent implements OnInit{

  locacaoData: Locacao[] = [];
  socioData: Socio[] = [];

  form!: FormGroup;

  dependente: Dependente = {} as Dependente;

  constructor(private formBuilder: NonNullableFormBuilder,
    private socioService: SocioService,
    private locacaoService: LocacaoService,
    private service: DependenteService,
    private snackBar: MatSnackBar,
    private location: Location,
    private route: ActivatedRoute,
    public formUtils: FormUtilsService
  ) {
  }

  ngOnInit() {
    this.dependente = this.route.snapshot.data['dependente'];

    this.preencherSocio();
    this.preencherLocacao();

    this.form = this.formBuilder.group({
      id: [''],
      nome: ['', [
        Validators.required,
        Validators.minLength(3),
        Validators.maxLength(100)]],
      dtNascimento: ['', [
        Validators.required,
        Validators.minLength(1),
        Validators.maxLength(10)]],
      sexo: ['', [
        Validators.required,
        Validators.minLength(1),
        Validators.maxLength(100)]],
      socio: new FormControl(''),
      locacoes: new FormControl(''),

    });

    if(this.dependente) this.form.patchValue(this.dependente);

  }

  private preencherSocio() {
    this.socioService.list().subscribe({
      next: (socio: Socio[]) => {
        this.socioData.push(...socio)
        let value: Socio = {} as Socio
        this.socioData.forEach(socio => {
          const add = this.dependente.socio = socio;
          if (add) value = add;
        })
        this.form.controls['socio'].setValue(value)
      },
    })
  }

  private preencherLocacao(){
    this.locacaoService.list().subscribe({
      next: (locacoes: Locacao[]) => {
        const values: Locacao[] = [];
        this.locacaoData.push(...locacoes);
        this.dependente.locacoes.forEach(locacao => {
          const add = this.locacaoData.find(a2 => a2.id === locacao.id);
          if (add) values.push(add);
        })
        this.form.controls['locacoes'].setValue(values);
      }
    })
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
    this.snackBar.open('Dependente salvo com sucesso', '', {duration: 5000});
    this.onCancel()
  }

  private onError(){
    this.snackBar.open('Erro ao salvar Dependente', '', {duration: 5000});
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
