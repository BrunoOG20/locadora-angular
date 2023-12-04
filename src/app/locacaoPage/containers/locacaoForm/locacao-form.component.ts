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
    this.locacao = this.route.snapshot.data['locacao'];

    this.preencherClientes();
    this.preencherItem();

    this.form = this.formBuilder.group({
      id: new FormControl(''),
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
    this.clienteService.getClienteAtivos().subscribe({
      next: (cliente: Cliente[]) => {
        this.clienteData.push(...cliente);
        if(this.locacao.id) {
          let value: Cliente = {} as Cliente;
          const add = this.clienteData.find(
            c => c.numInscricao === this.locacao.cliente.numInscricao
          );
          if(add) value = add;
          this.form.controls['cliente'].setValue(value);
        }
      },
      error: error => {
        this.onError("Erro ao carregar Clientes");
      }
    });
  }

  private preencherItem() {
    console.log(this.itemService.getItensAtivos())
    this.itemService.getItensAtivos().subscribe({
      next: (item: Item[]) => {
        this.itemData.push(...item);
        if(this.locacao.id) {
          let value: Item = {} as Item;
          const add = this.itemData.find(
            item => item.id === this.locacao.item.id
          );
          if(add) value = add;
          this.form.controls['item'].setValue(value);
        }
      },
      error: error => {
        this.onError("Erro ao carregar Itens");
      }
    });
  }

  private carregarDados(currentDate: Date) {
    let valorCobrado = this.form.value.item.classe.valor;
    let dtDevolucaoPrevista = new Date(currentDate.setDate(currentDate.getDate() + this.form.value.item.classe.dataDevolucao));
    this.locacao.dtDevolucaoPrevista = dtDevolucaoPrevista;
    this.locacao.valorCobrado = valorCobrado;
    this.locacao.pago = true;
  }

  devolverLocacao(){
    const dataDevolucao = new Date();
    let dataDevolucaoPrevista = new Date(this.locacao.dtDevolucaoPrevista);
    let multa = 0

    if (dataDevolucao.getTime() > dataDevolucaoPrevista.getTime()){
      multa = this.form.value.valorCobrado + this.form.value.item.classe.valor;
    }

    this.locacao.dtDevolucaoEfetiva = dataDevolucao;

    this.form.patchValue(this.locacao);
    this.onSubmit();
  }

  onSalvarForm(){
    this.carregarDados(new Date);
    this.form.patchValue(this.locacao);
    this.onSubmit();
  }


  onSubmit(){
    if (this.form.valid) {
      this.service.save(this.form.value)
        .subscribe(() => {this.onSuccess()},
        (error) => {
            if (error.status === 409) {
              this.onError(error.error.message);
            } else {
              () => this.onError('Erro ao salvar Locacao')
            }
          }
        );

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

  private onError(message: string){
    this.snackBar.open(message, '', {duration: 5000});
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
