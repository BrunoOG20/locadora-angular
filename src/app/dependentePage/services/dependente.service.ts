import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { first, tap } from 'rxjs/operators';
import { Dependente } from 'src/app/models/dependente';

@Injectable({
  providedIn: 'root'
})

export class DependenteService {

  private readonly API = 'api/dependente';

  constructor(private httpClient: HttpClient) { }

  list() {
    return this.httpClient.get<Dependente[]>(this.API)
      .pipe(
        first(),
        tap(dependente => console.log(dependente))
      );
  }

  loadById(id: string) {
    return this.httpClient.get<Dependente>(`${this.API}/${id}`);
  }

  save(record: Partial<Dependente>) {
    if (record.id) {
      return this.update(record);
    }
    return this.create(record);
  }

  private create(record: Partial<Dependente>) {
    return this.httpClient.post<Dependente>(this.API, record).pipe(first());
  }

  private update(record: Partial<Dependente>) {
    return this.httpClient.put<Dependente>(`${this.API}/${record.id}`, record).pipe(first());
  }

  remove(id: string) {
    return this.httpClient.delete(`${this.API}/${id}`).pipe(first());
  }
}
