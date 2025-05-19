export enum TipoVeiculo {
  CARRO = 'CARRO',
  MOTO = 'MOTO'
}

export interface Veiculo {
  id?: number;
  modelo: string;
  tipo: TipoVeiculo;
  disponivel: boolean;
}