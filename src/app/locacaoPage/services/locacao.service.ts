import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { first, tap } from 'rxjs/operators';
import { Locacao } from 'src/app/models/locacao';

@Injectable({
  providedIn: 'root'
})

export class LocacaoService {

  private readonly API = 'api/locacao';

  constructor(private httpClient: HttpClient) { }

  list() {
    return this.httpClient.get<Locacao[]>(this.API)
      .pipe(
        first(),
        tap(locacao => console.log(locacao))
      );
  }

  loadById(id: string) {
    return this.httpClient.get<Locacao>(`${this.API}/${id}`);
  }

  save(record: Partial<Locacao>) {
    if (record.id) {
      return this.update(record);
    }
    return this.create(record);
  }

  private create(record: Partial<Locacao>) {
    return this.httpClient.post<Locacao>(this.API, record).pipe(first());
  }

  private update(record: Partial<Locacao>) {
    return this.httpClient.put<Locacao>(`${this.API}/${record.id}`, record).pipe(first());
  }

  remove(id: string) {
    return this.httpClient.delete(`${this.API}/${id}`).pipe(first());
  }
}
