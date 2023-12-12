import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { first, tap } from 'rxjs/operators';
import { Cliente } from 'src/app/models/cliente';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})

export class ClienteService {

  private readonly API = 'api/cliente';

  constructor(private httpClient: HttpClient) { }

  list() {
    return this.httpClient.get<Cliente[]>(this.API)
      .pipe(
        first(),
        tap(cliente => console.log(cliente))
      );
  }

  getClienteAtivos(): Observable<Cliente[]> {
    return this.httpClient.get<Cliente[]>(`${this.API}/ativos`);
  }
}
