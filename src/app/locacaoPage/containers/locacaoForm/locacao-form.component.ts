import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, NonNullableFormBuilder, Validators } from "@angular/forms";
import { Location } from '@angular/common'
import { MatSnackBar } from "@angular/material/snack-bar";
import { ActivatedRoute } from "@angular/router";
import { FormUtilsService } from 'src/app/shared/form/form-utils.service';
import { Locacao } from 'src/app/models/locacao';
import { LocacaoService } from '../../services/locacao.service';
import { Socio } from 'src/app/models/socio';
import { SocioService } from 'src/app/socioPage/services/socio.service';
import { Dependente } from 'src/app/models/dependente';
import { DependenteService } from 'src/app/dependentePage/services/dependente.service';
import { Item } from 'src/app/models/item';
import { ItemService } from 'src/app/itemPage/services/item.service';

@Component({
  selector: 'app-locacao-form',
  templateUrl: './locacao-form.component.html',
  styleUrls: ['./locacao-form.component.css']
})
export class LocacaoFormComponent implements OnInit{
  socioData: Socio[] = [];
  dependenteData: Dependente[] = [];
  itemData: Item[] = [];

  form!: FormGroup;

  locacao: Locacao = {} as Locacao

  constructor(private formBuilder: NonNullableFormBuilder,
    private socioService: SocioService,
    private dependenteService: DependenteService,
    private itemService: ItemService,
    private service: LocacaoService,
    private snackBar: MatSnackBar,
    private location: Location,
    private route: ActivatedRoute,
    public formUtils: FormUtilsService
  ) {
  }


  ngOnInit() {
    this.locacao = this.route.snapshot.data['item'];

    this.preencherSocio();
    this.preencherDependente();
    this.preencherItem();

    this.form = this.formBuilder.group({
      id: [''],
      dtLocacao: ['', [
        Validators.required,
        Validators.minLength(3),
        Validators.maxLength(100)]],
      dtDevolucaoPrevista: ['', [
        Validators.required,
        Validators.minLength(1),
        Validators.maxLength(10)]],
      dtDevolucaoEfetiva: ['', [
        Validators.minLength(1),
        Validators.maxLength(100)]],
      valorCobrado: ['', [
        Validators.required,
        Validators.minLength(1),
        Validators.maxLength(100)]],
       multaCobrada: ['', [
        Validators.minLength(1),
        Validators.maxLength(100)]],
      cliente: new FormControl(''),
      item: new FormControl('')

    });

    if(this.locacao) this.form.patchValue(this.locacao);
  }

  private preencherSocio() {
    this.socioService.list().subscribe({
      next: (socio: Socio[]) => {
        this.socioData.push(...socio)
        let value: Socio = {} as Socio
        this.socioData.forEach(socio => {
          const add = this.locacao.cliente = socio;
          if (add) value = add;
        })
        this.form.controls['socio'].setValue(value)
      },
    })
  }

  private preencherDependente() {
    this.dependenteService.list().subscribe({
      next: (dependente: Dependente[]) => {
        this.dependenteData.push(...dependente)
        let value: Dependente = {} as Dependente
        this.dependenteData.forEach(dependente => {
          const add = this.locacao.cliente = dependente;
          if (add) value = add;
        })
        this.form.controls['dependente'].setValue(value)
      },
    })
  }

  private preencherItem() {
    this.itemService.list().subscribe({
      next: (item: Item[]) => {
        this.itemData.push(...item)
        let value: Item = {} as Item
        this.itemData.forEach(item => {
          const add = this.locacao.item = item;
          if (add) value = add;
        })
        this.form.controls['item'].setValue(value)
      },
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
