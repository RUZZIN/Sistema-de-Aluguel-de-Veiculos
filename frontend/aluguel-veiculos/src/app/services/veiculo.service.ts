import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Veiculo } from '../models/veiculo.model';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class VeiculoService {
  private API = 'http://localhost:8080/veiculos';

  constructor(private http: HttpClient) {}

  listar(): Observable<Veiculo[]> {
    return this.http.get<Veiculo[]>(this.API);
  }

  cadastrar(veiculo: Veiculo): Observable<Veiculo> {
    return this.http.post<Veiculo>(this.API, veiculo);
  }
}