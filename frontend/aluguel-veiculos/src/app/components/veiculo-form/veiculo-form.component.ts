import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, Validators } from '@angular/forms';
import { VeiculoService } from '../../services/veiculo.service';
import { TipoVeiculo } from '../../models/veiculo.model';

@Component({
  selector: 'app-veiculo-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  template: `
      <form [formGroup]="form" (ngSubmit)="onSubmit()">
        <label>Modelo:
          <input formControlName="modelo" />
        </label>
        <label>Tipo:
          <select formControlName="tipo">
            <option [value]="TipoVeiculo.CARRO">Carro</option>
            <option [value]="TipoVeiculo.MOTO">Moto</option>
          </select>
        </label>
        <button type="submit" [disabled]="form.invalid">Cadastrar</button>
      </form>
  `
})
export class VeiculoFormComponent {
  TipoVeiculo = TipoVeiculo;
  form;

  constructor(private fb: FormBuilder, private veiculoService: VeiculoService) {
    this.form = this.fb.group({
      modelo: ['', Validators.required],
      tipo: [TipoVeiculo.CARRO, Validators.required]
    });
  }

  onSubmit() {
    if (this.form.valid) {
      const { modelo, tipo } = this.form.value;
      this.veiculoService.cadastrar({
        modelo: modelo ?? '',
        tipo: tipo ?? TipoVeiculo.CARRO,
        disponivel: true
      }).subscribe({
        next: () => {
          alert('Veículo cadastrado com sucesso!');
          this.form.reset({ tipo: TipoVeiculo.CARRO });
        }
      });
    }
  }
}