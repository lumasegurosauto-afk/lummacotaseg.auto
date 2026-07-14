import React, { useState, useEffect } from 'react';
import Header from './components/Header';
import Footer from './components/Footer';
import HomeView from './components/HomeView';
import FormView from './components/FormView';
import SuccessView from './components/SuccessView';
import AdminView from './components/AdminView';
import { Lead } from './types';
import { INITIAL_LEADS } from './mockData';
import { CheckCircle2, Trash2, Edit3, ShieldAlert } from 'lucide-react';
import { formatLeadDate } from './utils/date';

export default function App() {
  // Navigation State
  const [currentView, setView] = useState<'home' | 'form' | 'success' | 'admin'>('home');

  // Leads State with localStorage persistence as local fallback
  const [leads, setLeads] = useState<Lead[]>(() => {
    const saved = localStorage.getItem('lumma_leads');
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch (e) {
        console.error('Erro ao decodificar leads salvos, usando mockData', e);
      }
    }
    return INITIAL_LEADS;
  });

  // DB Connection and configuration states
  const [isDbConnected, setIsDbConnected] = useState<boolean>(false);
  const [hasDbEnv, setHasDbEnv] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(true);

  // Keep track of the last submitted lead for receipt generation
  const [latestLead, setLatestLead] = useState<Lead | null>(null);

  // Dynamic system toast messages
  const [toast, setToast] = useState<{ message: string; type: 'success' | 'delete' | 'info' } | null>(null);

  // Synchronize leads from backend API on mount
  useEffect(() => {
    async function loadData() {
      try {
        setLoading(true);
        // Check DB status
        const statusRes = await fetch('/api/db-status');
        if (statusRes.ok) {
          const statusData = await statusRes.json();
          setIsDbConnected(statusData.connected);
          setHasDbEnv(statusData.hasEnv);
        }

        // Fetch leads
        const res = await fetch('/api/leads');
        if (res.ok) {
          const data = await res.json();
          setLeads(data.leadsList);
          if (data.isOffline) {
            setIsDbConnected(false);
          } else {
            setIsDbConnected(true);
          }
        }
      } catch (err) {
        console.error('Error fetching leads from API, using local storage state:', err);
      } finally {
        setLoading(false);
      }
    }
    loadData();
  }, []);

  // Synchronize leads with localStorage as a backup
  useEffect(() => {
    localStorage.setItem('lumma_leads', JSON.stringify(leads));
  }, [leads]);

  // Show auto-dismissing toast
  const showToast = (message: string, type: 'success' | 'delete' | 'info' = 'success') => {
    setToast({ message, type });
    setTimeout(() => setToast(null), 3500);
  };

  // Add a brand new lead from the quoting form
  const handleAddLead = async (newLeadData: Omit<Lead, 'id' | 'createdAt' | 'status'>) => {
    const nextIdNumber = Math.max(...leads.map(l => parseInt(l.id.replace('LUM-', '')) || 1000)) + 1;
    const generatedId = `LUM-${nextIdNumber}`;

    const now = new Date();
    const formattedDate = formatLeadDate(now);

    const newLead: Lead = {
      ...newLeadData,
      id: generatedId,
      status: 'PENDENTE',
      createdAt: formattedDate,
    };

    // Update local state immediately for fast micro-interaction
    setLeads(prev => [newLead, ...prev]);
    setLatestLead(newLead);
    showToast(`Solicitação ${generatedId} enviada com sucesso!`);

    try {
      const res = await fetch('/api/leads', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newLead),
      });
      if (res.ok) {
        const data = await res.json();
        if (data.isOffline) {
          setIsDbConnected(false);
        } else {
          setIsDbConnected(true);
        }
      }
    } catch (err) {
      console.error('Failed to sync lead creation with server:', err);
    }
  };

  // Update lead status in Admin panel
  const handleUpdateLeadStatus = async (id: string, status: 'PENDENTE' | 'CONCLUÍDO' | 'CANCELADO') => {
    setLeads(prev => prev.map(lead => {
      if (lead.id === id) {
        return { ...lead, status };
      }
      return lead;
    }));
    showToast(`Status da cotação ${id} atualizado para ${status}.`, 'info');

    try {
      const res = await fetch(`/api/leads/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status }),
      });
      if (res.ok) {
        const data = await res.json();
        if (data.isOffline) {
          setIsDbConnected(false);
        } else {
          setIsDbConnected(true);
        }
      }
    } catch (err) {
      console.error('Failed to sync lead status update with server:', err);
    }
  };

  // Delete lead in Admin panel
  const handleDeleteLead = async (id: string) => {
    setLeads(prev => prev.filter(lead => lead.id !== id));
    showToast(`Cotação ${id} foi excluída permanentemente.`, 'delete');

    try {
      const res = await fetch(`/api/leads/${id}`, {
        method: 'DELETE',
      });
      if (res.ok) {
        const data = await res.json();
        if (data.isOffline) {
          setIsDbConnected(false);
        } else {
          setIsDbConnected(true);
        }
      }
    } catch (err) {
      console.error('Failed to sync lead deletion with server:', err);
    }
  };

  // Simulate incoming real-time lead ingestion
  const handleAddSimulatedLead = async () => {
    const firstNames = ['Camila', 'Gisele', 'Bruno', 'Rodrigo', 'Juliana', 'Felipe', 'Aline', 'Jefferson', 'Larissa', 'Thiago'];
    const lastNames = ['Bündchen', 'Oliveira', 'Macedo', 'Alencar', 'Gagliasso', 'Menezes', 'Prado', 'Barreto', 'Nakamura', 'Vargas'];
    const emails = ['gisele.b@model.com', 'bruno.oli@provedor.com', 'juliana.macedo@uol.com', 'rodrigo.alencar@gmail.com', 'aline.m@yahoo.com'];
    const phoneDDD = ['(11)', '(21)', '(31)', '(19)', '(41)', '(85)'];
    const plates = ['LUM-2026', 'ABC-9H21', 'BRA-3C98', 'XYZ-5432', 'KAP-1049', 'JKM-3298'];
    const zipcodes = ['01311-200', '22040-010', '30130-010', '13010-001', '80010-010', '60010-010'];
    const usages = ['Particular/Lazer', 'Comercial'] as const;
    const youngDrivers = ['Sim', 'Não'] as const;

    const randomName = `${firstNames[Math.floor(Math.random() * firstNames.length)]} ${lastNames[Math.floor(Math.random() * lastNames.length)]}`;
    const randomEmail = emails[Math.floor(Math.random() * emails.length)];
    const randomDDD = phoneDDD[Math.floor(Math.random() * phoneDDD.length)];
    const randomPhone = `${randomDDD} 9${Math.floor(1000 + Math.random() * 9000)}-${Math.floor(1000 + Math.random() * 9000)}`;
    const randomCpf = `${Math.floor(100 + Math.random() * 900)}.${Math.floor(100 + Math.random() * 900)}.${Math.floor(100 + Math.random() * 900)}-${Math.floor(10 + Math.random() * 90)}`;
    const randomPlate = plates[Math.floor(Math.random() * plates.length)];
    const randomZip = zipcodes[Math.floor(Math.random() * zipcodes.length)];
    const randomUsage = usages[Math.floor(Math.random() * usages.length)];
    const randomYoung = youngDrivers[Math.floor(Math.random() * youngDrivers.length)];

    const nextIdNumber = Math.max(...leads.map(l => parseInt(l.id.replace('LUM-', '')) || 1000)) + 1;
    const generatedId = `LUM-${nextIdNumber}`;

    const formattedDate = formatLeadDate(new Date());

    const simulatedLead: Lead = {
      id: generatedId,
      fullName: randomName,
      email: randomEmail,
      phone: randomPhone,
      cpf: randomCpf,
      plate: randomPlate,
      zipcode: randomZip,
      usage: randomUsage,
      youngDriver: randomYoung,
      status: 'PENDENTE',
      createdAt: formattedDate
    };

    setLeads(prev => [simulatedLead, ...prev]);
    showToast(`Novo lead simulado: ${randomName} (${generatedId})!`, 'success');

    try {
      const res = await fetch('/api/leads', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(simulatedLead),
      });
      if (res.ok) {
        const data = await res.json();
        if (data.isOffline) {
          setIsDbConnected(false);
        } else {
          setIsDbConnected(true);
        }
      }
    } catch (err) {
      console.error('Failed to sync simulated lead creation with server:', err);
    }
  };

  return (
    <div className="flex flex-col min-h-screen bg-[#f6faff]">
      
      {/* Dynamic View Swapper */}
      {currentView === 'admin' ? (
        // Restricted Area dashboard (has its own specialized sidebar layout)
        <AdminView 
          leads={leads}
          onUpdateLeadStatus={handleUpdateLeadStatus}
          onDeleteLead={handleDeleteLead}
          onAddSimulatedLead={handleAddSimulatedLead}
          setView={setView}
          isDbConnected={isDbConnected}
          hasDbEnv={hasDbEnv}
        />
      ) : (
        // Public marketing client area
        <>
          <Header currentView={currentView} setView={setView} />
          
          <div className="flex-grow">
            {currentView === 'home' && (
              <HomeView setView={setView} />
            )}
            
            {currentView === 'form' && (
              <FormView onAddLead={handleAddLead} setView={setView} />
            )}
            
            {currentView === 'success' && (
              <SuccessView latestLead={latestLead} setView={setView} />
            )}
          </div>
          
          <Footer setView={setView} />
        </>
      )}

      {/* Floating System Toasts feedback (Micro-interaction) */}
      {toast && (
        <div className="fixed bottom-6 right-6 z-[200] max-w-sm w-full bg-white border border-[#c4c6cd]/30 shadow-2xl p-4 rounded-xl flex items-center gap-3 animate-slide-in">
          <div className={`w-10 h-10 rounded-full flex items-center justify-center shrink-0 ${
            toast.type === 'success' ? 'bg-emerald-50 text-emerald-600' :
            toast.type === 'delete' ? 'bg-rose-50 text-rose-600' :
            'bg-sky-50 text-sky-600'
          }`}>
            {toast.type === 'success' && <CheckCircle2 className="w-5 h-5" />}
            {toast.type === 'delete' && <Trash2 className="w-5 h-5" />}
            {toast.type === 'info' && <Edit3 className="w-5 h-5" />}
          </div>
          <div className="flex-grow">
            <h5 className="font-sans font-bold text-xs text-[#041627] uppercase tracking-wider">
              {toast.type === 'success' ? 'Sucesso' :
               toast.type === 'delete' ? 'Excluído' :
               'Informação'}
            </h5>
            <p className="font-sans text-[11px] text-[#44474c] mt-0.5 leading-snug">{toast.message}</p>
          </div>
        </div>
      )}

    </div>
  );
}
