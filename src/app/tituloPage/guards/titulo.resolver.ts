
import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from '@angular/router';
import { Observable, of } from 'rxjs';
import { Titulo } from '../../models/titulo';


import { TituloService } from '../services/titulo.service';
import { Diretor } from 'src/app/models/diretor';
import { Classe } from 'src/app/models/classe';
import { Ator } from 'src/app/models/ator';

@Injectable({
  providedIn: 'root'
})
export class TituloResolver implements Resolve<Titulo> {

  constructor(private service: TituloService) { }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<Titulo> {
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

    return of({
      id: '',
      nome: '',
      atores: atores,
      diretor: diretor ,
      ano: '',
      sinopse: '',
      categoria: '',
      classe: classe
      });
  }
}
