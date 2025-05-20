import { Cliente } from './cliente.model';
import { Veiculo } from './veiculo.model';

export interface Aluguel {
  id?: number;
  cliente: Cliente;
  veiculo: Veiculo;
  dataInicio: string; 
  dataFim: string;  
}