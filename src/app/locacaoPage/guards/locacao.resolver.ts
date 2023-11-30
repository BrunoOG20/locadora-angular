
import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from '@angular/router';
import { Observable, of } from 'rxjs';

import { LocacaoService } from '../services/locacao.service';
import { Locacao } from 'src/app/models/locacao';
import { Cliente } from 'src/app/models/cliente';
import { Item } from 'src/app/models/item';
import { Titulo } from 'src/app/models/titulo';
import { Classe } from 'src/app/models/classe';
import { Ator } from 'src/app/models/ator';
import { Diretor } from 'src/app/models/diretor';

@Injectable({
  providedIn: 'root'
})
export class LocacaoResolver implements Resolve<Locacao> {

  constructor(private service: LocacaoService) { }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<Locacao> {
    if (route.params && route.params['id']) {
      return this.service.loadById(route.params['id']);
    }

    return of({} as Locacao);
  }
}
