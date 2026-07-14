export interface Lead {
  id: string;
  fullName: string;
  email: string;
  phone: string;
  cpf: string;
  plate: string;
  zipcode: string;
  usage: 'Comercial' | 'Particular/Lazer';
  youngDriver: 'Sim' | 'Não';
  status: 'PENDENTE' | 'CONCLUÍDO' | 'CANCELADO';
  createdAt: string;
}

export interface Stats {
  totalToday: number;
  inAnalysis: number;
  converted: number;
  slaMinutes: number;
}
