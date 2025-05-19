import { Component } from '@angular/core';
import { VeiculoFormComponent } from './components/veiculo-form/veiculo-form.component';
import { VeiculoListComponent } from './components/veiculo-list/veiculo-list.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [VeiculoFormComponent, VeiculoListComponent],
  template: `
    <h1>Sistema de Aluguel de Veículos</h1>
    <app-veiculo-form></app-veiculo-form>
    <app-veiculo-list></app-veiculo-list>
  `
})
export class AppComponent {}