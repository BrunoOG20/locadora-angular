import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from '@angular/router';
import { Observable, of } from 'rxjs';

import { SocioService } from '../services/socio.service';
import { Socio } from 'src/app/models/socio';
import { Locacao } from 'src/app/models/locacao';
import { Dependente } from 'src/app/models/dependente';
import { Cliente } from 'src/app/models/cliente';
import { Item } from 'src/app/models/item';
import { Titulo } from 'src/app/models/titulo';
import { Ator } from 'src/app/models/ator';
import { Classe } from 'src/app/models/classe';
import { Diretor } from 'src/app/models/diretor';

@Injectable({
  providedIn: 'root'
})
export class SocioResolver implements Resolve<Socio> {

  constructor(private service: SocioService) { }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<Socio> {
    if (route.params && route.params['id']) {
      return this.service.loadById(route.params['id']);
    }

    return of({} as Socio);
  }
}
