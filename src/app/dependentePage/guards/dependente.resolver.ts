import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from '@angular/router';
import { Observable, of } from 'rxjs';

import { DependenteService } from '../services/dependente.service';
import { Dependente } from 'src/app/models/dependente';
import { Socio } from 'src/app/models/socio';
import { Locacao } from 'src/app/models/locacao';

@Injectable({
  providedIn: 'root'
})
export class DependenteResolver implements Resolve<Dependente> {

  constructor(private service: DependenteService) { }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<Dependente> {
    if (route.params && route.params['id']) {
      return this.service.loadById(route.params['id']);
    }

    const locacao: Locacao[] = [{
      id: '',
      dtLocacao: new Date(),
      dtDevolucaoPrevista: new Date(),
      dtDevolucaoEfetiva: new Date(),
      valorCobrado: 0,
      multaCobrada: 0
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
    }

    const dependente: Dependente = {
      id: '',
      nome: '',
      sexo: '',
      dtNascimento: new Date(),
      socio: socio,
      locacoes: locacao
    }

    socio.dependentes.push(dependente);

    return of({
      id: '',
      nome: '',
      sexo: '',
      dtNascimento: new Date(),
      socio: socio,
      locacoes: locacao,
    });

  }
}
