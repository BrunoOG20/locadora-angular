
import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from '@angular/router';
import { Observable, of } from 'rxjs';

import { LocacaoService } from '../services/locacao.service';
import { Locacao } from 'src/app/models/locacao';

@Injectable({
  providedIn: 'root'
})
export class LocacaoResolver implements Resolve<Locacao> {

  constructor(private service: LocacaoService) { }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<Locacao> {
    if (route.params && route.params['id']) {
      return this.service.loadById(route.params['id']);
    }

    return of({
      id: '',
      dtLocacao: new Date(),
      dtDevolucaoPrevista: new Date(),
      dtDevolucaoEfetiva: new Date(),
      valorCobrado: 0,
      multaCobrada: 0
    });
  }
}
