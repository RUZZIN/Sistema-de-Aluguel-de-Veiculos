import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, Validators } from '@angular/forms';
import { AluguelService } from '../../services/aluguel.service';
import { ClienteService } from '../../services/cliente.service';
import { VeiculoService } from '../../services/veiculo.service';
import { Cliente } from '../../models/cliente.model';
import { Veiculo } from '../../models/veiculo.model';

@Component({
  selector: 'app-aluguel-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  template: `
    <form [formGroup]="form" (ngSubmit)="onSubmit()" style="margin-bottom:20px;">
      <label>Cliente:
        <select formControlName="cliente">
          <option *ngFor="let c of clientes" [ngValue]="c">{{c.nome}} ({{c.cpf}})</option>
        </select>
      </label>
      <label>Veículo:
        <select formControlName="veiculo">
          <option *ngFor="let v of veiculos" [ngValue]="v" [disabled]="!v.disponivel">{{v.modelo}} - {{v.tipo}} ({{v.disponivel ? 'Disponível' : 'Indisponível'}})</option>
        </select>
      </label>
      <label>Data início: <input type="date" formControlName="dataInicio"></label>
      <label>Data fim: <input type="date" formControlName="dataFim"></label>
      <button type="submit" [disabled]="form.invalid">Registrar Aluguel</button>
    </form>
  `
})
export class AluguelFormComponent implements OnInit {
  clientes: Cliente[] = [];
  veiculos: Veiculo[] = [];

  form: ReturnType<FormBuilder['group']>;

  constructor(
    private fb: FormBuilder,
    private aluguelService: AluguelService,
    private clienteService: ClienteService,
    private veiculoService: VeiculoService
  ) {
    this.form = this.fb.group({
      cliente: [null, Validators.required],
      veiculo: [null, Validators.required],
      dataInicio: ['', Validators.required],
      dataFim: ['', Validators.required]
    });
  }

  ngOnInit() {
    this.clienteService.listar().subscribe(c => this.clientes = c);
    this.veiculoService.listar().subscribe(v => this.veiculos = v);
  }

  onSubmit() {
    if (this.form.valid) {
      this.aluguelService.registrar(this.form.value).subscribe({
        next: () => {
          alert('Aluguel registrado!');
          this.form.reset();
        },
        error: (err) => alert(err?.error?.message || 'Erro ao registrar aluguel')
      });
    }
  }
}