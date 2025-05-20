import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AluguelService } from '../../services/aluguel.service';
import { Aluguel } from '../../models/aluguel.model';

@Component({
  selector: 'app-aluguel-list',
  standalone: true,
  imports: [CommonModule],
  template: `
    <h3>Aluguéis Ativos</h3>
    <table>
      <tr>
        <th>ID</th>
        <th>Cliente</th>
        <th>Veículo</th>
        <th>Data Início</th>
        <th>Data Fim</th>
        <th>Ação</th>
      </tr>
      <tr *ngFor="let a of alugueis">
        <td>{{a.id}}</td>
        <td>{{a.cliente.nome}}</td>
        <td>{{a.veiculo.modelo}}</td>
        <td>{{a.dataInicio}}</td>
        <td>{{a.dataFim}}</td>
        <td>
          <button (click)="a.id !== undefined && devolver(a.id)">Devolver</button>
        </td>
      </tr>
    </table>
  `
})
export class AluguelListComponent implements OnInit {
  alugueis: Aluguel[] = [];

  constructor(private aluguelService: AluguelService) {
  }

  ngOnInit() {
    this.carregar();
  }

  carregar() {
    this.aluguelService.listarAtivos().subscribe(a => this.alugueis = a);
  }

  devolver(id: number) {
    this.aluguelService.devolver(id).subscribe(() => {
      alert('Veículo devolvido!');
      this.carregar();
    });
  }
}