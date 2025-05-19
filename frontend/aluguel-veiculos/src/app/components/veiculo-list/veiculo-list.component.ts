import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { VeiculoService } from '../../services/veiculo.service';
import { Veiculo, TipoVeiculo } from '../../models/veiculo.model';

@Component({
  selector: 'app-veiculo-list',
  standalone: true,
  imports: [CommonModule],
  template: `
    <h2>Veículos</h2>
    <table>
      <tr>
        <th>ID</th>
        <th>Modelo</th>
        <th>Tipo</th>
        <th>Disponível</th>
      </tr>
      <tr *ngFor="let v of veiculos">
        <td>{{v.id}}</td>
        <td>{{v.modelo}}</td>
        <td>{{v.tipo}}</td>
        <td>{{v.disponivel ? 'Sim' : 'Não'}}</td>
      </tr>
    </table>
  `
})
export class VeiculoListComponent implements OnInit {
  veiculos: Veiculo[] = [];

  constructor(private veiculoService: VeiculoService) {}

  ngOnInit() {
    this.veiculoService.listar().subscribe(data => this.veiculos = data);
  }
}