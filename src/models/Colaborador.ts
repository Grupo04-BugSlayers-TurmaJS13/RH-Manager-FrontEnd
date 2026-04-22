export interface Endereco {
  logradouro: string;
  numero: string;
  complemento?: string;
  bairro: string;
  cidade: string;
  estado: string;
  cep: string;
}

export default interface Colaborador {
  id: number;
  nome: string;
  email: string;
  telefone: string;
  dataNascimento: Date;
  cargo: string;
  foto: string;
  salario: number;
  dataAdimissao: Date;
  status: "Ativo" | "Férias" | "Afastado";
  endereco?: Endereco;
  ferias?: {
    inicio: Date;
    fim: Date;
    diasConcedidos: 30 | 20 | 15 | 14 | 10 | 5;
  };
  periodoConcessivoFim?: Date;
}
