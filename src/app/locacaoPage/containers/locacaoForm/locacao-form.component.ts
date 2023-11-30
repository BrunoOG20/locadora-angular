import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, NonNullableFormBuilder, Validators } from "@angular/forms";
import { Location } from '@angular/common'
import { MatSnackBar } from "@angular/material/snack-bar";
import { ActivatedRoute } from "@angular/router";
import { FormUtilsService } from 'src/app/shared/form/form-utils.service';
import { Locacao } from 'src/app/models/locacao';
import { LocacaoService } from '../../services/locacao.service';
import { Item } from 'src/app/models/item';
import { ItemService } from 'src/app/itemPage/services/item.service';
import { Cliente } from 'src/app/models/cliente';
import { ClienteService } from 'src/app/clienteListPage/services/clienteList.service';

@Component({
  selector: 'app-locacao-form',
  templateUrl: './locacao-form.component.html',
  styleUrls: ['./locacao-form.component.css']
})
export class LocacaoFormComponent implements OnInit{
  itemData: Item[] = [];
  clienteData: Cliente[] = [];

  form!: FormGroup;

  locacao: Locacao = {} as Locacao
  isPaginaEdicao: boolean | undefined;


  constructor(private formBuilder: NonNullableFormBuilder,
    private clienteService: ClienteService,
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

    this.preencherClientes();
    this.preencherItem();

    this.form = this.formBuilder.group({
      id: [''],
      dtLocacao: new FormControl(new Date()),
      dtDevolucaoPrevista: new FormControl(''),
      dtDevolucaoEfetiva: new FormControl(''),
      valorCobrado: new FormControl(''),
      multaCobrada: new FormControl(''),
      item: new FormControl(''),
      cliente: new FormControl('')
    });    

    if(this.locacao) this.form.patchValue(this.locacao);

    this.route.url.subscribe(urlSegments => {
      this.isPaginaEdicao = urlSegments.some(segment => segment.path === 'editar');
    });
  }

  
  private preencherClientes() {
    this.clienteService.list().subscribe({
      next: (cliente: Cliente[]) => {
        this.clienteData.push(...cliente)
        let value: Cliente = {} as Cliente
        this.clienteData.forEach(cliente => {
          const add = this.locacao.cliente = cliente;
          if (add) value = add;
        })
        this.form.controls['cliente'].setValue(value)
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

  private carregarDados(currentDate: Date) {
    let valorCobrado = this.form.value.item.classe.valor;
    let dtDevolucaoPrevista = new Date(currentDate.setDate(currentDate.getDate() + this.form.value.item.classe.dataDevolucao));
    this.locacao.dtDevolucaoPrevista = dtDevolucaoPrevista;
    this.locacao.valorCobrado = valorCobrado;
  }


  onSubmit(){
    this.carregarDados(new Date);
    this.form.patchValue(this.locacao);

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
