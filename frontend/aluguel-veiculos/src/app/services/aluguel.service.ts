import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Aluguel } from '../models/aluguel.model';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class AluguelService {
  private API = 'http://localhost:8080/alugueis';

  constructor(private http: HttpClient) {}

  registrar(aluguel: Aluguel): Observable<Aluguel> {
    return this.http.post<Aluguel>(this.API, aluguel);
  }

  listarAtivos(): Observable<Aluguel[]> {
    return this.http.get<Aluguel[]>(`${this.API}/ativos`);
  }

  devolver(id: number): Observable<void> {
    return this.http.put<void>(`${this.API}/${id}/devolver`, {});
  }
}