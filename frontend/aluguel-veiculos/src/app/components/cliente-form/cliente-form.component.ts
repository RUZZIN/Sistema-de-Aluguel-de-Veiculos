import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, Validators } from '@angular/forms';
import { ClienteService } from '../../services/cliente.service';

@Component({
  selector: 'app-cliente-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  template: `
    <form [formGroup]="form" (ngSubmit)="onSubmit()" style="margin-bottom:20px;">
      <label>Nome: <input formControlName="nome"></label>
      <label>CPF: <input formControlName="cpf"></label>
      <button type="submit" [disabled]="form.invalid">Cadastrar Cliente</button>
    </form>
  `
})
export class ClienteFormComponent {
  form;

  constructor(private fb: FormBuilder, private clienteService: ClienteService) {
    this.form = this.fb.group({
      nome: ['', Validators.required],
      cpf: ['', Validators.required]
    });
  }

  onSubmit() {
    if (this.form.valid) {
      this.clienteService.cadastrar({
        nome: this.form.value.nome ?? '',
        cpf: this.form.value.cpf ?? ''
      }).subscribe(() => {
        alert('Cliente cadastrado!');
        this.form.reset();
      });
    }
  }
}