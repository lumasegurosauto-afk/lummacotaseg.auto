import React, { useState, useEffect } from 'react';
import { Shield, Users, Clock, CheckCircle, Search, RefreshCw, Calendar, User, Car, Phone, Mail, Download } from 'lucide-react';
import { Lead } from '../types';

interface AdminViewProps {
  leads: Lead[];
  setView: (view: 'home' | 'form' | 'success' | 'admin') => void;
  onRefresh?: () => void;
  isLoading?: boolean;
  onUpdateStatus?: (id: string, newStatus: string) => Promise<void>;
}

export default function AdminView({ setView }: AdminViewProps) {
  const [onlineLeads, setOnlineLeads] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [currentTab, setCurrentTab] = useState<'Todos' | 'Novo' | 'Em Atendimento' | 'Finalizado'>('Todos');

  const loadOnlineLeads = async () => {
    try {
      setLoading(true);
      const response = await fetch('/api/leads');
      if (!response.ok) throw new Error('Erro API');
      const result = await response.json();
      const data = result.leadsList || [];
      
      const formatted = data.map((item: any) => {
        let visualStatus = 'Novo';
        if (item.status === 'CANCELADO' || item.status === 'Em Atendimento') visualStatus = 'Em Atendimento';
        if (item.status === 'CONCLUÍDO' || item.status === 'Finalizado') visualStatus = 'Finalizado';
        return {
          id: item.id || String(Math.random()),
          fullName: item.fullName || item.full_name || 'Não informado',
          email: item.email || 'Não informado',
          phone: item.phone || 'Não informado',
          cpf: item.cpf || 'Não informado',
          plate: item.plate || 'Não informado',
          zipcode: item.zipcode || 'Não informado',
          usage: item.usage || 'Particular/Lazer',
          youngDriver: item.youngDriver || item.young_driver || 'Não',
          status: visualStatus,
          createdAt: item.createdAt || item.created_at || new Date().toISOString()
        };
      });
      setOnlineLeads(formatted);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleUpdateStatus = async (id: string, newStatus: 'Novo' | 'Em Atendimento' | 'Finalizado') => {
    try {
      let apiStatus: 'PENDENTE' | 'CONCLUÍDO' | 'CANCELADO' = 'PENDENTE';
      if (newStatus === 'Em Atendimento') apiStatus = 'CANCELADO';
      if (newStatus === 'Finalizado') apiStatus = 'CONCLUÍDO';

      const response = await fetch(`/api/leads/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status: apiStatus })
      });
      if (!response.ok) throw new Error('Erro salvar');
      setOnlineLeads(prev => prev.map(lead => lead.id === id ? { ...lead, status: newStatus } : lead));
    } catch (err) {
      alert('Erro ao atualizar status');
    }
  };

  const handleExportCSV = () => {
    if (filteredLeads.length === 0) return;
    const headers = ['ID', 'Nome', 'E-mail', 'Telefone', 'Status'];
    const rows = filteredLeads.map(l => [l.id, l.fullName, l.email, l.phone, l.status]);
    const csv = [headers.join(';'), ...rows.map(r => r.join(';'))].join('\n');
    const blob = new Blob(['\uFEFF' + csv], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = `cotacoes.csv`;
    link.click();
  };

  useEffect(() => { loadOnlineLeads(); }, []);

  const filteredLeads = onlineLeads.filter(lead => {
    const matchesSearch = lead.fullName.toLowerCase().includes(searchTerm.toLowerCase()) || lead.plate.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesTab = currentTab === 'Todos' || lead.status === currentTab;
    return matchesSearch && matchesTab;
  });

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <div className="flex flex-col md:flex-row justify-between gap-4 mb-8">
        <div className="flex items-center gap-3">
          <Shield className="w-6 h-6 text-[#115cb9]" />
          <div>
            <h1 className="text-2xl font-bold">Painel Admin</h1>
            <p className="text-zinc-400 text-sm">Controle de cotações ativo</p>
          </div>
        </div>
        <div className="flex gap-2">
          <button onClick={handleExportCSV} className="px-4 py-2 bg-green-700 rounded-xl text-sm">Exportar</button>
          <button onClick={loadOnlineLeads} className="px-4 py-2 bg-zinc-900 rounded-xl text-sm">Atualizar</button>
          <button onClick={() => setView('home')} className="px-4 py-2 bg-[#115cb9] rounded-xl text-sm">Sair</button>
        </div>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
        {['Todos', 'Novo', 'Em Atendimento', 'Finalizado'].map(t => (
          <button key={t} onClick={() => setCurrentTab(t as any)} className={`p-4 rounded-2xl border text-left ${currentTab === t ? 'bg-zinc-900 border-[#115cb9]' : 'bg-zinc-900/50 border-zinc-800'}`}>
            <p className="text-xl font-bold">{t === 'Todos' ? onlineLeads.length : onlineLeads.filter(l => l.status === t).length}</p>
            <p className="text-zinc-400 text-xs">{t}</p>
          </button>
        ))}
      </div>

      <div className="mb-6">
        <input type="text" placeholder="Buscar por nome ou placa..." value={searchTerm} onChange={e => setSearchTerm(e.target.value)} className="w-full bg-zinc-900 border border-zinc-800 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-[#115cb9]" />
      </div>

      {loading ? (
        <p className="text-center text-zinc-500">Carregando dados...</p>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          {filteredLeads.map(lead => (
            <div key={lead.id} className="bg-zinc-900 border border-zinc-800 rounded-2xl p-5 flex flex-col justify-between">
              <div className="flex justify-between items-center mb-4 border-b border-zinc-800 pb-2">
                <span className="text-xs font-mono text-zinc-400">{lead.id}</span>
                <select value={lead.status} onChange={e => handleUpdateStatus(lead.id, e.target.value as any)} className="text-xs bg-zinc-950 text-white border border-zinc-800 rounded px-2 py-1">
                  <option value="Novo">Novo</option>
                  <option value="Em Atendimento">Em Atendimento</option>
                  <option value="Finalizado">Finalizado</option>
                </select>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                <div>
                  <p className="font-bold text-white">{lead.fullName}</p>
                  <p className="text-xs text-zinc-400">{lead.email}</p>
                  <p className="text-xs text-zinc-400">{lead.phone}</p>
                </div>
                <div className="bg-zinc-950 p-3 rounded-xl border border-zinc-800 text-xs space-y-1">
                  <p>Placa: <span className="font-mono text-white">{lead.plate}</span></p>
                  <p>CEP: {lead.zipcode}</p>
                  <p>Uso: {lead.usage}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
