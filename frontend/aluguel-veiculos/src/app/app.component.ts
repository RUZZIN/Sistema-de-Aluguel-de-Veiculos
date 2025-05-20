import { Component } from '@angular/core';
import { VeiculoFormComponent } from './components/veiculo-form/veiculo-form.component';
import { VeiculoListComponent } from './components/veiculo-list/veiculo-list.component';
import { ClienteFormComponent } from './components/cliente-form/cliente-form.component';
import { AluguelFormComponent } from './components/aluguel-form/aluguel-form.component';
import { AluguelListComponent } from './components/aluguel-list/aluguel-list.component';
@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    VeiculoFormComponent,
    VeiculoListComponent,
    ClienteFormComponent,
    AluguelFormComponent,
    AluguelListComponent
  ],
  template: `
    <h1>Sistema de Aluguel de Veículos</h1>
    <app-veiculo-form></app-veiculo-form>
    <app-veiculo-list></app-veiculo-list>
    <hr>
    <app-cliente-form></app-cliente-form>
    <hr>
    <app-aluguel-form></app-aluguel-form>
    <app-aluguel-list></app-aluguel-list>
  `
})
export class AppComponent {}