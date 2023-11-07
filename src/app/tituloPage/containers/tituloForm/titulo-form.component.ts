import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, NonNullableFormBuilder, Validators } from "@angular/forms";
import { Location } from '@angular/common'
import { TituloService } from "../../services/titulo.service";
import { AtorService } from 'src/app/atorPage/services/ator.service';
import { MatSnackBar } from "@angular/material/snack-bar";
import { ActivatedRoute } from "@angular/router";

import { Titulo } from "../../../models/titulo";
import { Ator } from 'src/app/models/ator';
import { ClasseService } from 'src/app/classePage/services/classe.service';
import { DiretorService } from 'src/app/diretorPage/services/diretor.service';
import { Diretor } from 'src/app/models/diretor';
import { Classe } from 'src/app/models/classe';
import { FormUtilsService } from 'src/app/shared/form/form-utils.service';

@Component({
  selector: 'app-titulo-form',
  templateUrl: './titulo-form.component.html',
  styleUrls: ['./titulo-form.component.css']
})
export class TituloFormComponent implements OnInit{
  atorData: Ator[] = [];
  diretorData: Diretor[] = [];
  classeData: Classe[] = [];

  form!: FormGroup;

  atores = new FormControl('');

  titulo: Titulo = {} as Titulo

  constructor(private formBuilder: NonNullableFormBuilder,
    private service: TituloService,
    private atorService: AtorService,
    private classeService: ClasseService,
    private diretorService: DiretorService,
    private snackBar: MatSnackBar,
    private location: Location,
    private route: ActivatedRoute,
    public formUtils: FormUtilsService
  ) {
  }


  ngOnInit() {
    this.titulo = this.route.snapshot.data['titulo'];

    this.preencherAtor();
    this.preencherClasse();
    this.preencherDiretor();

    this.form = this.formBuilder.group({
      id: [''],
      nome: ['', [
        Validators.required,
        Validators.minLength(3),
        Validators.maxLength(100)]],
      ano: ['', [
        Validators.required,
        Validators.minLength(1),
        Validators.maxLength(100)]],
      sinopse: ['', [
        Validators.required,
        Validators.minLength(1),
        Validators.maxLength(250)]],
      categoria: ['', [
        Validators.required,
        Validators.minLength(1),
        Validators.maxLength(100)]],
      diretor: new FormControl(''),
      classe: new FormControl(''),
      atores: new FormControl(''),

    });

    if(this.titulo) this.form.patchValue(this.titulo);

    console.log(this.form.value);

  }

  private preencherClasse() {
    this.classeService.list().subscribe({
      next: (classe: Classe[]) => {
        this.classeData.push(...classe)
        let value: Classe = {} as Classe
        this.classeData.forEach(classe => {
          const add = this.titulo.classe = classe;
          if (add) value = add;
        })
        this.form.controls['classe'].setValue(value)
      },
    })
  }

  private preencherDiretor() {
    this.diretorService.list().subscribe({
      next: (diretor: Diretor[]) => {
        this.diretorData.push(...diretor)
        let value: Diretor = {} as Diretor
        this.diretorData.forEach(diretor => {
          const add = this.titulo.diretor = diretor;
          if (add) value = add;
        })
        this.form.controls['diretor'].setValue(value)
      },
    })
  }

  private preencherAtor(){
    this.atorService.list().subscribe({
      next: (atores: Ator[]) => {
        const values: Ator[] = [];
        this.atorData.push(...atores);
        this.titulo.atores.forEach(ator => {
          const add = this.atorData.find(a2 => a2.id === ator.id);
          if (add) values.push(add);
        })
        this.form.controls['atores'].setValue(values);
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
    this.snackBar.open('Titulo salvo com sucesso', '', {duration: 5000});
    this.onCancel()
  }

  private onError(){
    this.snackBar.open('Erro ao salvar Titulo', '', {duration: 5000});
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
