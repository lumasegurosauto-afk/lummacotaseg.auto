export interface Lead {
  id: string;
  fullName: string;
  email: string;
  phone: string;
  cpf: string;
  plate: string;
  zipcode: string;
  usage: string;
  youngDriver: string;
  status: 'Novo' | 'Em Atendimento' | 'Finalizado' | 'PENDENTE' | 'CONCLUÍDO' | 'CANCELADO';
  createdAt: string;
}
