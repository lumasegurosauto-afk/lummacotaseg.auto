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

  const fetchLeads = async () => {
    try {
      setLoading(true);
      const { data, error } = await supabase.from('leads').select('*');
      if (error) throw error;
      if (data) setLeads(data);
    } catch (error) {
      console.error('Erro ao buscar cotações:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (isAuthenticated) {
      fetchLeads();
    }
  }, [isAuthenticated]);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    // DEFINE A SENHA DO PAINEL (Mude 'admin123' para a sua senha de preferência)
    if (adminPassword === 'admin123') {
      setIsAuthenticated(true);
      setLoginError('');
    } else {
      setLoginError('Senha incorreta. Tente novamente.');
    }
  };

  const handleAddLead = (newLeadData: Omit<Lead, 'id' | 'createdAt' | 'status'>) => {
    const newLead: Lead = {
      ...newLeadData,
      id: Math.random().toString(36).substring(7),
      status: 'Novo',
      createdAt: new Date().toISOString(),
    };
    setLeads((prev) => [newLead, ...prev]);
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
            /* PAINEL DE LEADS LOGADO */
            <AdminView 
              leads={leads} 
              setView={setView} 
              onRefresh={fetchLeads}
              isLoading={loading}
            />
          )
        )}
      </main>
    </div>
  );
}
