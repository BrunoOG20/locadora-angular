import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Ator } from '../../models/ator';
import { delay, first, tap } from 'rxjs/operators';
import { Socio } from 'src/app/models/socio';
@Injectable({
  providedIn: 'root'
})
export class SocioService {

  private readonly API = 'api/socio';

  constructor(private httpClient: HttpClient) { }

  list() {
    return this.httpClient.get<Socio[]>(this.API)
      .pipe(
        first(),
        tap(socio => console.log(socio))
      );
  }

  loadById(id: string) {
    return this.httpClient.get<Socio>(`${this.API}/${id}`);
  }

  save(record: Partial<Socio>) {
    if (record.id) {
      return this.update(record);
    }
    return this.create(record);
  }

  private create(record: Partial<Socio>) {
    return this.httpClient.post<Socio>(this.API, record).pipe(first());
  }

  private update(record: Partial<Socio>) {
    return this.httpClient.put<Socio>(`${this.API}/${record.id}`, record).pipe(first());
  }

  remove(id: string) {
    return this.httpClient.delete(`${this.API}/${id}`).pipe(first());
  }
}
