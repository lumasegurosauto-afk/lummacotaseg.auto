import React, { useState, useEffect } from 'react';
import { 
  Shield, 
  Users, 
  Clock, 
  CheckCircle, 
  Search, 
  RefreshCw, 
  FileText, 
  Calendar,
  User,
  Car,
  Phone,
  Mail,
  Download
} from 'lucide-react';
import { Lead } from '../types';

interface AdminViewProps {
  leads: Lead[];
  setView: (view: 'home' | 'form' | 'success' | 'admin') => void;
  onRefresh?: () => void;
  isLoading?: boolean;
}

export default function AdminView({ setView }: AdminViewProps) {
  const [onlineLeads, setOnlineLeads] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [currentTab, setCurrentTab] = useState<'Todos' | 'Novo' | 'Em Atendimento' | 'Finalizado'>('Todos');

  // Busca os dados da nossa nova API local integrada ao Drizzle ORM
  const loadOnlineLeads = async () => {
    try {
      setLoading(true);
      const response = await fetch('/api/leads');
      if (!response.ok) throw new Error('Falha ao buscar os leads na API');
      
      const result = await response.json();
      const data = result.leadsList || [];
      
      const formatted = data.map((item: any) => ({
        id: item.id || String(Math.random()),
        fullName: item.fullName || item.full_name || 'Não informado',
        email: item.email || 'Não informado',
        phone: item.phone || 'Não informado',
        cpf: item.cpf || 'Não informado',
        plate: item.plate || 'Não informado',
        zipcode: item.zipcode || 'Não informado',
        usage: item.usage || 'Particular/Lazer',
        youngDriver: item.youngDriver || item.young_driver || 'Não',
        status: item.status === 'PENDENTE' || item.status === 'Novo' ? 'Novo' : 
                item.status === 'CANCELADO' || item.status === 'Em Atendimento' ? 'Em Atendimento' : 'Finalizado',
        createdAt: item.createdAt || item.created_at || new Date().toISOString()
      }));
      
      setOnlineLeads(formatted);
    } catch (err) {
      console.error('Erro ao ler dados da API local:', err);
    } finally {
      setLoading(false);
    }
  };

  // Função para atualizar o status do Lead diretamente no Banco via API
  const handleUpdateStatus = async (id: string, newStatus: 'Novo' | 'Em Atendimento' | 'Finalizado') => {
    try {
      // Mapeia de volta para o padrão esperado pelo Drizzle schema
      const apiStatus = newStatus === 'Novo' ? 'PENDENTE' : 
                        newStatus === 'Em Atendimento' ? 'CANCELADO' : 'CONCLUÍDO';

      const response = await fetch(`/api/leads/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status: apiStatus })
      });

      if (!response.ok) throw new Error('Falha ao salvar alteração');

      // Atualiza o estado visual imediatamente
      setOnlineLeads(prev => prev.map(lead => lead.id === id ? { ...lead, status: newStatus } : lead));
    } catch (err) {
      console.error('Erro ao atualizar status:', err);
      alert('Não foi possível salvar o novo status.');
    }
  };

  // Função para exportar e baixar o arquivo Excel/CSV no PC ou Celular
  const handleExportCSV = () => {
    if (filteredLeads.length === 0) {
      alert('Nenhum lead disponível para exportação.');
      return;
    }

    // Define o cabeçalho das colunas do arquivo
    const headers = ['ID', 'Nome Completo', 'E-mail', 'Telefone', 'CPF', 'Placa', 'CEP', 'Uso do Veiculo', 'Condutor Jovem', 'Status', 'Data de Criacao'];
    
    // Converte as linhas de cotação para o formato de texto separado por ponto e vírgula
    const rows = filteredLeads.map(lead => [
      lead.id,
      `"${lead.fullName.replace(/"/g, '""')}"`,
      lead.email,
      lead.phone,
      lead.cpf,
      lead.plate,
      lead.zipcode,
      lead.usage,
      lead.youngDriver,
      lead.status,
      new Date(lead.createdAt).toLocaleDateString('pt-BR')
    ]);

    const csvContent = [headers.join(';'), ...rows.map(r => r.join(';'))].join('\n');
    
    // Adiciona o BOM (\uFEFF) para forçar o Excel do celular/PC ler em UTF-8 sem quebrar acentos
    const blob = new Blob(['\uFEFF' + csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    
    // Cria um link temporário na tela e simula o clique para iniciar o download
    const link = document.createElement('a');
    link.setAttribute('href', url);
    link.setAttribute('download', `cotacoes_lumma_${new Date().toISOString().slice(0,10)}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  useEffect(() => {
    loadOnlineLeads();
  }, []);

  const countByStatus = (status: string) => onlineLeads.filter(l => l.status === status).length;

  const filteredLeads = onlineLeads.filter(lead => {
    const matchesSearch = 
      lead.fullName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      lead.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      lead.cpf.includes(searchTerm) ||
      lead.plate.toLowerCase().includes(searchTerm.toLowerCase());
      
    const matchesTab = currentTab === 'Todos' || lead.status === currentTab;
    
    return matchesSearch && matchesTab;
  });

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      {/* Cabeçalho */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
        <div className="flex items-center gap-3">
          <div className="p-3 bg-[#115cb9]/10 rounded-xl text-[#115cb9]">
            <Shield className="w-6 h-6" />
          </div>
          <div>
            <h1 className="text-2xl font-bold text-white">Painel do Administrador</h1>
            <p className="text-zinc-400 text-sm">Gerenciamento de Leads e Cotações em tempo real</p>
          </div>
        </div>
        <div className="flex flex-wrap gap-2">
          <button 
            onClick={handleExportCSV}
            className="flex items-center gap-2 px-4 py-2.5 bg-green-700 hover:bg-green-600 text-white rounded-xl text-sm font-medium transition"
          >
            <Download className="w-4 h-4" />
            <span>Exportar Planilha</span>
          </button>
          <button 
            onClick={loadOnlineLeads}
            disabled={loading}
            className="flex items-center gap-2 px-4 py-2.5 bg-zinc-900 hover:bg-zinc-800 border border-zinc-800 text-zinc-300 rounded-xl text-sm font-medium transition"
          >
            <RefreshCw className={`w-4 h-4 ${loading ? 'animate-spin' : ''}`} />
            <span>Atualizar</span>
          </button>
          <button 
            onClick={() => setView('home')}
            className="px-4 py-2.5 bg-[#115cb9] hover:bg-[#115cb9]/90 text-white rounded-xl text-sm font-medium transition"
          >
            Sair do Painel
          </button>
        </div>
      </div>

      {/* Abas e Contadores */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
        {[
          { id: 'Todos', label: 'Todos Leads', icon: Users, color: 'text-blue-400', count: onlineLeads.length },
          { id: 'Novo', label: 'Novos', icon: Clock, color: 'text-yellow-500', count: countByStatus('Novo') },
          { id: 'Em Atendimento', label: 'Em Atendimento', icon: RefreshCw, color: 'text-purple-400', count: countByStatus('Em Atendimento') },
          { id: 'Finalizado', label: 'Finalizados', icon: CheckCircle, color: 'text-green-400', count: countByStatus('Finalizado') },
        ].map((tab) => (
          <button
            key={tab.id}
            onClick={() => setCurrentTab(tab.id as any)}
            className={`p-4 rounded-2xl border text-left transition ${
              currentTab === tab.id 
                ? 'bg-zinc-900 border-[#115cb9]' 
                : 'bg-zinc-900/50 border-zinc-800 hover:border-zinc-700'
            }`}
          >
            <div className="flex items-center justify-between mb-2">
              <tab.icon className={`w-5 h-5 ${tab.color}`} />
              <span className="text-2xl font-bold text-white">{tab.count}</span>
            </div>
            <p className="text-zinc-400 text-xs font-medium">{tab.label}</p>
          </button>
        ))}
      </div>

      {/* Busca */}
      <div className="relative mb-6">
        <Search className="absolute left-4 top-3.5 w-4 h-4 text-zinc-500" />
        <input 
          type="text"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          placeholder="Buscar por nome, e-mail, CPF ou placa do veículo..."
          className="w-full bg-zinc-900 border border-zinc-800 rounded-xl pl-11 pr-4 py-3 text-white focus:outline-none focus:border-[#115cb9] transition text-sm"
        />
      </div>

      {/* Lista de Cards */}
      {loading ? (
        <div className="flex flex-col items-center justify-center py-12 bg-zinc-900/50 border border-zinc-800 rounded-2xl">
          <RefreshCw className="w-8 h-8 text-[#115cb9] animate-spin mb-3" />
          <p className="text-zinc-400 text-sm">Buscando cotações no banco de dados...</p>
        </div>
      ) : filteredLeads.length === 0 ? (
        <div className="text-center py-12 bg-zinc-900/50 border border-zinc-800 rounded-2xl">
          <FileText className="w-12 h-12 text-zinc-600 mx-auto mb-3" />
          <p className="text-zinc-400 text-sm">Nenhuma cotação encontrada nesta categoria.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-4">
          {filteredLeads.map((lead) => (
            <div key={lead.id} className="bg-zinc-900 border border-zinc-800 rounded-2xl p-5 hover:border-zinc-700 transition">
              <div className="flex flex-col lg:flex-row justify-between gap-4">
                <div className="space-y-3 flex-1">
                  <div className="flex flex-wrap items-center gap-3">
                    <h3 className="text-base font-semibold text-white flex items-center gap-2">
