import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Titulo } from '../../models/titulo';
import { first, tap } from 'rxjs/operators';
import { Item } from 'src/app/models/item';

@Injectable({
  providedIn: 'root'
})

export class ItemService {

  private readonly API = 'api/item';

  constructor(private httpClient: HttpClient) { }

  list() {
    return this.httpClient.get<Item[]>(this.API)
      .pipe(
        first(),
        tap(item => console.log(item))
      );
  }

  loadById(id: string) {
    return this.httpClient.get<Item>(`${this.API}/${id}`);
  }

  save(record: Partial<Item>) {
    if (record.id) {
      return this.update(record);
    }
    return this.create(record);
  }

  private create(record: Partial<Item>) {
    return this.httpClient.post<Item>(this.API, record).pipe(first());
  }

  private update(record: Partial<Item>) {
    return this.httpClient.put<Item>(`${this.API}/${record.id}`, record).pipe(first());
  }

  remove(id: string) {
    return this.httpClient.delete(`${this.API}/${id}`).pipe(first());
  }

  getItensAtivos() {
    return this.httpClient.get<Item[]>(`${this.API}/ativos`);
  }
}
