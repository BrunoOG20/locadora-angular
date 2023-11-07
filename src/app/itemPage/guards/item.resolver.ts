
import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from '@angular/router';
import { Observable, of } from 'rxjs';
import { Titulo } from '../../models/titulo';

import { Diretor } from 'src/app/models/diretor';
import { Classe } from 'src/app/models/classe';
import { Ator } from 'src/app/models/ator';
import { Item } from 'src/app/models/item';
import { ItemService } from '../services/item.service';

@Injectable({
  providedIn: 'root'
})
export class ItemResolver implements Resolve<Item> {

  constructor(private service: ItemService) { }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<Item> {
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

    return of({
      id: '',
      numSerie: '',
      tipoItem: '',
      dtAquisicao: new Date(),
      titulo: titulo
      });
  }
}
