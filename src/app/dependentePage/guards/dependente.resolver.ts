import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from '@angular/router';
import { Observable, of } from 'rxjs';

import { DependenteService } from '../services/dependente.service';
import { Dependente } from 'src/app/models/dependente';
import { Socio } from 'src/app/models/socio';
import { Locacao } from 'src/app/models/locacao';
import { Cliente } from 'src/app/models/cliente';
import { Diretor } from 'src/app/models/diretor';
import { Classe } from 'src/app/models/classe';
import { Ator } from 'src/app/models/ator';
import { Titulo } from 'src/app/models/titulo';
import { Item } from 'src/app/models/item';

@Injectable({
  providedIn: 'root'
})
export class DependenteResolver implements Resolve<Dependente> {

  constructor(private service: DependenteService) { }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<Dependente> {
    if (route.params && route.params['id']) {
      return this.service.loadById(route.params['id']);
    }

    const diretor: Diretor = {
      id: '',
      nome: '',
    };

    const classe: Classe = {
      id: '',
      nome: '',
      dataDevolucao: '',
      valor: ''
    };

    const atores: Ator[]= [{
      id: '',
      nome: '',
    }];

    const titulo: Titulo = {
      id: '',
      nome: '',
      atores: atores,
      diretor: diretor,
      ano: '',
      sinopse: '',
      categoria: '',
      classe: classe
    };

    const cliente: Cliente =  {
      id: '',
      nome: '',
      sexo: '',
      dtNascimento: new Date(),
      locacoes: []
    }

    const item: Item = {
      id: '',
      numSerie: '',
      tipoItem: '',
      dtAquisicao: new Date(),
      titulo: titulo
    }

    const locacao: Locacao[] = [{
      id: '',
      dtLocacao: new Date(),
      dtDevolucaoPrevista: new Date(),
      dtDevolucaoEfetiva: new Date(),
      valorCobrado: 0,
      multaCobrada: 0,
      cliente: cliente,
      item: item
    }]

    const socio: Socio =  {
      id: '',
      nome: '',
      telefone: '',
      sexo: '',
      cpf: '',
      dtNascimento: new Date(),
      endereco: '',
      dependentes: [],
      locacoes: locacao,
      estahAtivo: ''
    }

    const dependente: Dependente = {
      id: '',
      nome: '',
      sexo: '',
      dtNascimento: new Date(),
      socio: socio,
      locacoes: locacao,
      estahAtivo: ''
    }

    socio.dependentes.push(dependente);

    return of({
      id: '',
      nome: '',
      sexo: '',
      dtNascimento: new Date(),
      socio: socio,
      locacoes: locacao,
      estahAtivo: ''
    });

  }
}
