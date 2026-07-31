import React, { useState, useEffect } from 'react';
import Header from './components/Header';
import HomeView from './components/HomeView';
import FormView from './components/FormView';
import SuccessView from './components/SuccessView';
import AdminView from './components/AdminView';
import { Lead } from './types';
import { supabase } from './supabase';
import { Lock } from 'lucide-react';

export default function App() {
  const [view, setView] = useState<'home' | 'form' | 'success' | 'admin'>('home');
  const [leads, setLeads] = useState<Lead[]>([]);
  const [loading, setLoading] = useState(true);
  
  // Controle de Login do Administrador
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [adminPassword, setAdminPassword] = useState('');
  const [loginError, setLoginError] = useState('');

  // 🔄 Buscar Leads do Banco de Dados
  const fetchLeads = async () => {
    try {
      setLoading(true);
      const { data, error } = await supabase
        .from('leads')
        .select('*')
        .order('createdAt', { ascending: false }); // Traz os mais recentes primeiro
        
      if (error) throw error;
      if (data) setLeads(data);
    } catch (error) {
      console.error('Erro ao buscar cotações:', error);
    } finally {
      setLoading(false);
    }
  };

  // 🆙 Atualizar Status de um Lead no Banco de Dados
  const handleUpdateStatus = async (id: string, newStatus: string) => {
    try {
      const { error } = await supabase
        .from('leads')
        .update({ status: newStatus })
        .eq('id', id);

      if (error) throw error;

      // Atualiza o estado visual na tela imediatamente
      setLeads((prevLeads) =>
        prevLeads.map((lead) => (lead.id === id ? { ...lead, status: newStatus } : lead))
      );
    } catch (error) {
      console.error('Erro ao atualizar o status:', error);
      alert('Não foi possível atualizar o status no banco de dados.');
    }
  };

  useEffect(() => {
    if (isAuthenticated) {
      fetchLeads();
    }
  }, [isAuthenticated]);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (adminPassword === 'admin123') {
      setIsAuthenticated(true);
      setLoginError('');
    } else {
      setLoginError('Senha incorreta. Tente novamente.');
    }
  };

  // 📝 Criar Novo Lead salvando permanentemente no Banco de Dados
  const handleAddLead = async (newLeadData: Omit<Lead, 'id' | 'createdAt' | 'status'>) => {
    const generatedId = Math.random().toString(36).substring(7);
    const newLead: Lead = {
      ...newLeadData,
      id: generatedId,
      status: 'Novo',
      createdAt: new Date().toISOString(),
    };

    try {
      const { error } = await supabase.from('leads').insert([newLead]);
      if (error) throw error;
      
      setLeads((prev) => [newLead, ...prev]);
    } catch (error) {
      console.error('Erro ao salvar lead no Supabase:', error);
    }
  };

  return (
    <div className="min-h-screen bg-zinc-950 text-white font-sans antialiased selection:bg-[#115cb9]/30 selection:text-white">
      <Header setView={setView} currentView={view} />
      
      <main className="pt-20">
        {view === 'home' && <HomeView setView={setView} />}
        {view === 'form' && <FormView onAddLead={handleAddLead} setView={setView} />}
        {view === 'success' && <SuccessView setView={setView} />}
        
        {view === 'admin' && (
          !isAuthenticated ? (
            /* TELA DE LOGIN SEGURA */
            <div className="max-w-md mx-auto px-4 py-16">
              <div className="bg-zinc-900 border border-zinc-800 rounded-2xl p-6 md:p-8 shadow-xl text-center">
                <div className="w-12 h-12 bg-[#115cb9]/10 rounded-xl text-[#115cb9] flex items-center justify-center mx-auto mb-4">
                  <Lock className="w-6 h-6" />
                </div>
                <h2 className="text-xl font-bold text-white mb-2">Área Restrita</h2>
                <p className="text-zinc-400 text-sm mb-6">Digite a senha de administrador para acessar</p>
                
                <form onSubmit={handleLogin} className="space-y-4">
                  {loginError && <p className="text-sm text-red-400 bg-red-500/10 p-3 rounded-xl border border-red-500/20">{loginError}</p>}
                  <input 
                    type="password"
                    required
                    value={adminPassword}
                    onChange={(e) => setAdminPassword(e.target.value)}
                    placeholder="Sua senha secreta"
                    className="w-full bg-zinc-950 border border-zinc-800 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-[#115cb9] text-center text-sm"
                  />
                  <button type="submit" className="w-full py-3 bg-[#115cb9] hover:bg-[#115cb9]/90 text-white rounded-xl font-medium transition text-sm">
                    Acessar Painel
                  </button>
                </form>
              </div>
            </div>
          ) : (
            /* PAINEL DE LEADS LOGADO COM FUNÇÃO DE ATUALIZAÇÃO */
            <AdminView 
              leads={leads} 
              setView={setView} 
              onRefresh={fetchLeads}
              isLoading={loading}
              onUpdateStatus={handleUpdateStatus}
            />
          )
        )}
      </main>
    </div>
  );
}
