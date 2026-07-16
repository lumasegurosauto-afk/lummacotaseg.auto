import React, { useState, useEffect } from 'react';
import Header from './components/Header';
import HomeView from './components/HomeView';
import FormView from './components/FormView';
import SuccessView from './components/SuccessView';
import AdminView from './components/AdminView';
import { Lead } from './types';
import { supabase } from './supabase';

export default function App() {
  const [view, setView] = useState<'home' | 'form' | 'success' | 'admin'>('home');
  const [leads, setLeads] = useState<Lead[]>([]);
  const [loading, setLoading] = useState(true);

  // Puxa as cotações do banco de dados online assim que o site carrega
  const fetchLeads = async () => {
    try {
      setLoading(true);
      const { data, error } = await supabase
        .from('leads')
        .select('*')
        .order('createdAt', { ascending: false });

      if (error) throw error;
      if (data) setLeads(data);
    } catch (error) {
      console.error('Erro ao buscar cotações do Supabase:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchLeads();

    // Cria um canal em tempo real: se alguém preencher, o painel atualiza na hora
    const channel = supabase
      .channel('schema-db-changes')
      .on(
        'postgres_changes',
        { event: 'INSERT', schema: 'public', table: 'leads' },
        () => {
          fetchLeads();
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, []);

  // Função disparada ao adicionar um lead localmente (mantida por compatibilidade)
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
          <AdminView 
            leads={leads} 
            setView={setView} 
            onRefresh={fetchLeads}
            isLoading={loading}
          />
        )}
      </main>
    </div>
  );
}
