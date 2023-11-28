import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup, NonNullableFormBuilder, Validators} from "@angular/forms";
import { Location } from '@angular/common'
import { MatSnackBar } from "@angular/material/snack-bar";
import { ActivatedRoute } from "@angular/router";
import { FormUtilsService } from 'src/app/shared/form/form-utils.service';
import { SocioService } from '../../services/socio.service';
import { Socio } from 'src/app/models/socio';
import { Dependente } from 'src/app/models/dependente';
import { Locacao } from 'src/app/models/locacao';
import { DependenteService } from 'src/app/dependentePage/services/dependente.service';
import { LocacaoService } from 'src/app/locacaoPage/services/locacao.service';

@Component({
  selector: 'app-socio-form',
  templateUrl: './socio-form.component.html',
  styleUrls: ['./socio-form.component.css']
})
export class SocioFormComponent implements OnInit{

  locacaoData: Locacao[] = [];
  dependenteData: Dependente[] = [];

  form!: FormGroup;

  socio: Socio = {} as Socio


  constructor(private formBuilder: NonNullableFormBuilder,
    private dependenteService: DependenteService,
    private locacaoService: LocacaoService,
    private service: SocioService,
    private snackBar: MatSnackBar,
    private location: Location,
    private route: ActivatedRoute,
    public formUtils: FormUtilsService
  ) {
  }

  ngOnInit() {
    this.socio = this.route.snapshot.data['socio'];

    this.preencherLocacao();
    this.preencherDependentes();


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
        Validators.maxLength(2)]],
      telefone: ['', [
          Validators.required,
          Validators.minLength(1),
          Validators.maxLength(11)]],
      cpf: ['', [
          Validators.required,
          Validators.minLength(1),
          Validators.maxLength(11)]],
      dependente: new FormControl(''),
      locacoes: new FormControl(''),
    });

    if(this.socio) this.form.patchValue(this.socio);
  }

  private preencherLocacao(){
    this.locacaoService.list().subscribe({
      next: (locacoes: Locacao[]) => {
        const values: Locacao[] = [];
        this.locacaoData.push(...locacoes);
        this.socio.locacoes.forEach(locacao => {
          const add = this.locacaoData.find(a2 => a2.id === locacao.id);
          if (add) values.push(add);
        })
        this.form.controls['locacoes'].setValue(values);
      }
    })
  }

  private preencherDependentes(){
    this.dependenteService.list().subscribe({
      next: (dependentes: Dependente[]) => {
        const values: Dependente[] = [];
        this.dependenteData.push(...dependentes);
        this.socio.dependentes.forEach(dependente => {
          const add = this.dependenteData.find(a2 => a2.id === dependente.id);
          if (add) values.push(add);
        })
        this.form.controls['dependentes'].setValue(values);
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
    this.snackBar.open('Socio salvo com sucesso', '', {duration: 5000});
    this.onCancel()
  }

  private onError(){
    this.snackBar.open('Erro ao salvar Socio', '', {duration: 5000});
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
