import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
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
  Mail
} from 'lucide-react';
import { Lead } from '../types';
import { supabase } from '../supabase';

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

  const loadOnlineLeads = async () => {
    try {
      setLoading(true);
      const { data, error } = await supabase.from('leads').select('*');
      if (error) throw error;
      
      if (data) {
        const formatted = data.map((item: any) => ({
          id: item.id || String(Math.random()),
          fullName: item.full_name || item.fullName || 'Não informado',
          email: item.email || 'Não informado',
          phone: item.phone || 'Não informado',
          cpf: item.cpf || 'Não informado',
          plate: item.plate || 'Não informado',
          zipcode: item.zipcode || 'Não informado',
          usage: item.usage || 'Particular/Lazer',
          youngDriver: item.young_driver || item.youngDriver || 'Não',
          status: item.status || 'Novo',
          createdAt: item.created_at || item.createdAt || new Date().toISOString()
        }));
        
        formatted.sort((a: any, b: any) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
        setOnlineLeads(formatted);
      }
    } catch (err) {
      console.error('Erro ao ler dados do Supabase:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadOnlineLeads();
  }, []);

  // Contadores para as abas do topo
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
        <div className="flex gap-2">
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

      {/* ABAS DO TOPOOOO (Métricas e Status) */}
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
                ? 'bg-zinc-900 border-[#115cb9] shadow-lg shadow-[#115cb9]/5' 
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

      {/* Campo de Busca */}
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

      {/* Conteúdo da Tabela / Cards */}
      {loading ? (
        <div className="flex flex-col items-center justify-center py-12 bg-zinc-900/50 border border-zinc-800 rounded-2xl">
          <RefreshCw className="w-8 h-8 text-[#115cb9] animate-spin mb-3" />
          <p className="text-zinc-400 text-sm">Buscando cotações no Supabase...</p>
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
                      <User className="w-4 h-4 text-[#115cb9]" /> {lead.fullName}
                    </h3>
                    <span className={`px-2.5 py-0.5 text-xs font-medium rounded-full border ${
                      lead.status === 'Novo' ? 'bg-yellow-500/10 text-yellow-500 border-yellow-500/20' :
                      lead.status === 'Em Atendimento' ? 'bg-purple-500/10 text-purple-400 border-purple-500/20' :
                      'bg-green-500/10 text-green-400 border-green-500/20'
                    }`}>
                      {lead.status}
                    </span>
                    <span className="text-zinc-500 text-xs flex items-center gap-1">
                      <Calendar className="w-3.5 h-3.5" /> {new Date(lead.createdAt).toLocaleDateString('pt-BR')}
                    </span>
                  </div>
                  
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-6 gap-y-1.5 text-sm text-zinc-400">
                    <p className="flex items-center gap-1.5"><Mail className="w-3.5 h-3.5 text-zinc-600" /> {lead.email}</p>
                    <p className="flex items-center gap-1.5"><Phone className="w-3.5 h-3.5 text-zinc-600" /> {lead.phone}</p>
                    <p><span className="text-zinc-500 font-medium">CPF:</span> {lead.cpf}</p>
                  </div>
                </div>

                <div className="bg-zinc-950/40 border border-zinc-800 rounded-xl p-3 lg:w-72 flex flex-col justify-center space-y-1 text-sm text-zinc-400">
                  <p className="flex items-center gap-2 font-medium text-zinc-300">
                    <Car className="w-4 h-4 text-zinc-500" /> Placa: <span className="text-[#115cb9] font-bold">{lead.plate}</span>
                  </p>
                  <p><span className="text-zinc-500">CEP:</span> {lead.zipcode}</p>
                  <p><span className="text-zinc-500">Uso:</span> {lead.usage}</p>
                  <p><span className="text-zinc-500">Menor 25 anos:</span> {lead.youngDriver}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
