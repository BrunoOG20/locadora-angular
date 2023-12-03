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


    return of({} as Dependente);

  }
}
