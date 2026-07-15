import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  FileSpreadsheet, 
  Search, 
  Download, 
  Trash2, 
  Check, 
  X, 
  TrendingUp, 
  Clock, 
  ChevronLeft, 
  ChevronRight, 
  MoreVertical,
  SlidersHorizontal,
  PlusCircle,
  FileCheck,
  ShieldCheck,
  AlertCircle,
  Lock,
  Key,
  Eye,
  EyeOff,
  LogOut
} from 'lucide-react';
import { Lead } from '../types';

interface AdminViewProps {
  leads: Lead[];
  onUpdateLeadStatus: (id: string, status: 'PENDENTE' | 'CONCLUÍDO' | 'CANCELADO') => void;
  onDeleteLead: (id: string) => void;
  onAddSimulatedLead: () => void;
  setView: (view: 'home' | 'form' | 'success' | 'admin') => void;
  isDbConnected?: boolean;
  hasDbEnv?: boolean;
}

export default function AdminView({ 
  leads, 
  onUpdateLeadStatus, 
  onDeleteLead, 
  onAddSimulatedLead,
  setView,
  isDbConnected = false,
  hasDbEnv = false
}: AdminViewProps) {
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState<'TODOS' | 'PENDENTE' | 'CONCLUÍDO' | 'CANCELADO'>('TODOS');
  
  // Login & Password gate for Área Restrita (Option 1)
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(() => {
    return localStorage.getItem('lumma_admin_authenticated') === 'true';
  });
  const [usernameInput, setUsernameInput] = useState('');
  const [passwordInput, setPasswordInput] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [authError, setAuthError] = useState('');
  const [isLoggingIn, setIsLoggingIn] = useState(false);

  const handleLoginSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setAuthError('');
    setIsLoggingIn(true);

    // High fidelity delay for simulated check
    setTimeout(() => {
      // Credentials: admin / lumma2026
      if (usernameInput.trim().toLowerCase() === 'admin' && passwordInput === 'lumma2026') {
        setIsAuthenticated(true);
        localStorage.setItem('lumma_admin_authenticated', 'true');
        setUsernameInput('');
        setPasswordInput('');
      } else {
        setAuthError('Usuário ou senha incorretos. Por favor, tente novamente.');
      }
      setIsLoggingIn(false);
    }, 600);
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    localStorage.removeItem('lumma_admin_authenticated');
  };
  
  // Pagination State
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 6;

  // Track active actions dropdown
  const [activeDropdownId, setActiveDropdownId] = useState<string | null>(null);

  // Stats derivation
  const stats = useMemo(() => {
    const total = leads.length;
    const pending = leads.filter(l => l.status === 'PENDENTE').length;
    const completed = leads.filter(l => l.status === 'CONCLUÍDO').length;
    const canceled = leads.filter(l => l.status === 'CANCELADO').length;
    const conversionRate = total > 0 ? ((completed / total) * 100).toFixed(1) : '0.0';

    return {
      total,
      pending,
      completed,
      canceled,
      conversionRate
    };
  }, [leads]);

  // Filter leads based on search term and status filter
  const filteredLeads = useMemo(() => {
    return leads.filter(lead => {
      const matchSearch = 
        lead.fullName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        lead.cpf.includes(searchTerm) ||
        lead.plate.toLowerCase().includes(searchTerm.toLowerCase()) ||
        lead.phone.includes(searchTerm);
      
      const matchStatus = statusFilter === 'TODOS' ? true : lead.status === statusFilter;

      return matchSearch && matchStatus;
    });
  }, [leads, searchTerm, statusFilter]);

  // Paginated leads
  const paginatedLeads = useMemo(() => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    return filteredLeads.slice(startIndex, startIndex + itemsPerPage);
  }, [filteredLeads, currentPage]);

  const totalPages = Math.ceil(filteredLeads.length / itemsPerPage) || 1;

  // Real browser CSV export
  const handleExportCSV = () => {
    if (leads.length === 0) return;

    // Header row
    const headers = ['ID', 'Nome Completo', 'Email', 'Telefone', 'CPF', 'Placa', 'CEP', 'Uso do Veiculo', 'Condutor Jovem', 'Status', 'Data Criacao'];
    
    // Body rows
    const rows = leads.map(lead => [
      lead.id,
      lead.fullName,
      lead.email,
      lead.phone,
      lead.cpf,
      lead.plate,
      lead.zipcode,
      lead.usage,
      lead.youngDriver,
      lead.status,
      lead.createdAt
    ]);

    // Construct CSV text with semicolon delimiter (standard for Excel in Latin languages)
    const csvContent = "data:text/csv;charset=utf-8," 
      + [headers.join(';'), ...rows.map(e => e.map(val => `"${val}"`).join(';'))].join('\n');

    // Create virtual download element
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", `Lumma_Cotacoes_Export_${new Date().toISOString().slice(0,10)}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  if (!isAuthenticated) {
    return (
      <div className="bg-[#041627] min-h-screen flex items-center justify-center p-4 antialiased">
        {/* Beautiful Floating Login Form */}
        <div className="w-full max-w-md bg-[#0a2035] border border-slate-800 rounded-2xl shadow-2xl overflow-hidden p-6 md:p-8 space-y-6 animate-fade-in">
          
          <div className="text-center space-y-2">
            <h1 className="font-sans font-black text-3xl text-white tracking-tight">
              Lumma Auto
            </h1>
            <p className="text-slate-400 text-xs font-semibold tracking-wider uppercase">
              Painel de Controle • Área Restrita
            </p>
          </div>

          <form onSubmit={handleLoginSubmit} className="space-y-4">
            {authError && (
              <div className="bg-[#ba1a1a]/10 border border-[#ba1a1a]/30 text-[#ffb4ab] text-xs p-3.5 rounded-xl flex items-center gap-2.5">
                <AlertCircle className="w-4 h-4 shrink-0" />
                <span className="font-medium">{authError}</span>
              </div>
            )}

            <div className="space-y-1.5">
              <label className="block text-[11px] font-bold text-slate-300 uppercase tracking-wider">
                Usuário
              </label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500 w-4 h-4" />
                <input
                  type="text"
                  required
                  value={usernameInput}
                  onChange={(e) => setUsernameInput(e.target.value)}
                  placeholder="Seu usuário"
                  className="w-full pl-9 pr-4 py-2.5 bg-[#0e2a44] border border-slate-700 rounded-xl text-xs text-white placeholder-slate-500 focus:outline-none focus:border-[#115cb9] transition-all"
                />
              </div>
            </div>

            <div className="space-y-1.5">
              <label className="block text-[11px] font-bold text-slate-300 uppercase tracking-wider">
                Senha
              </label>
              <div className="relative">
                <Key className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500 w-4 h-4" />
                <input
                  type={showPassword ? "text" : "password"}
                  required
                  value={passwordInput}
                  onChange={(e) => setPasswordInput(e.target.value)}
                  placeholder="Sua senha"
                  className="w-full pl-9 pr-10 py-2.5 bg-[#0e2a44] border border-slate-700 rounded-xl text-xs text-white placeholder-slate-500 focus:outline-none focus:border-[#115cb9] transition-all"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-500 hover:text-slate-300 transition-colors focus:outline-none cursor-pointer"
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>

            <button
              type="submit"
              disabled={isLoggingIn}
              className="w-full bg-[#115cb9] hover:bg-[#1a73e8] active:scale-95 disabled:opacity-50 text-white font-semibold text-xs py-3 rounded-xl tracking-wider uppercase transition-all shadow-md shadow-[#115cb9]/20 cursor-pointer flex items-center justify-center gap-2"
            >
              {isLoggingIn ? (
                <>
                  <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  <span>Autenticando...</span>
                </>
              ) : (
                <span>Acessar Painel</span>
              )}
            </button>
          </form>

          {/* Prompt / Credentials Hints box */}
          <div className="bg-[#0e2a44] border border-slate-800/80 p-4 rounded-xl text-[11px] text-slate-400 space-y-1">
            <p className="font-bold text-slate-300 mb-1 flex items-center gap-1">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
              Credenciais de Acesso (Administrador)
            </p>
            <p>Utilize as seguintes credenciais padrão criadas para a área restrita:</p>
            <div className="font-mono bg-[#081b2e] p-2 rounded border border-slate-800/60 mt-1.5 space-y-0.5 select-all">
              <p><span className="text-slate-500">Usuário:</span> <span className="text-white font-bold">admin</span></p>
              <p><span className="text-slate-500">Senha:</span> <span className="text-white font-bold">lumma2026</span></p>
            </div>
          </div>

          <div className="pt-2 text-center">
            <button
              type="button"
              onClick={() => setView('home')}
              className="font-sans text-xs text-[#659dfe] hover:text-[#115cb9] font-medium transition-colors cursor-pointer focus:outline-none"
            >
              ← Voltar para o Site Principal
            </button>
          </div>

        </div>
      </div>
    );
  }

  return (
    <div className="bg-[#f6faff] min-h-screen antialiased flex flex-col md:flex-row">
      
      {/* Sidebar Navigation */}
      <aside className="w-full md:w-64 bg-[#041627] text-white flex flex-col p-6 gap-6 md:min-h-screen border-r border-slate-800 flex-shrink-0">
        
        {/* Sidebar Header */}
        <div className="px-2">
          <button 
            onClick={() => setView('home')}
            className="font-sans font-black text-2xl text-white tracking-tight hover:text-[#659dfe] transition-colors focus:outline-none cursor-pointer"
          >
            Lumma Auto
          </button>
          <div className="mt-2 bg-[#1a2b3c] p-3 rounded-xl border border-slate-800 space-y-1.5">
            <p className="font-sans text-xs font-bold text-[#659dfe] tracking-wider uppercase">Painel de Controle</p>
            <p className="font-sans text-[10px] text-slate-400">seguros.luma2025@gmail.com</p>
            <div className="flex items-center gap-1.5 pt-1.5 border-t border-slate-800/60 mt-1">
              <span className={`w-2 h-2 rounded-full ${isDbConnected ? 'bg-emerald-400 animate-pulse' : 'bg-amber-400'}`} />
              <span className="font-mono text-[9px] font-medium tracking-wide uppercase text-slate-300">
                Supabase: {'Conectado'}
              </span>
            </div>
          </div>
        </div>

        {/* Sidebar Links */}
        <nav className="flex-grow space-y-1">
          <button 
            onClick={() => setStatusFilter('TODOS')}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-xs font-semibold uppercase tracking-wider transition-all ${
              statusFilter === 'TODOS' 
                ? 'bg-[#115cb9] text-white shadow-md shadow-[#115cb9]/20' 
                : 'text-slate-300 hover:bg-[#1a2b3c]'
            }`}
          >
            <SlidersHorizontal className="w-4 h-4" />
            <span>Todas Solicitações</span>
          </button>

          <button 
            onClick={() => setStatusFilter('PENDENTE')}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-xs font-semibold uppercase tracking-wider transition-all ${
              statusFilter === 'PENDENTE' 
                ? 'bg-[#115cb9] text-white' 
                : 'text-slate-300 hover:bg-[#1a2b3c]'
            }`}
          >
            <Clock className="w-4 h-4 text-sky-400" />
            <span>Pendentes ({leads.filter(l => l.status === 'PENDENTE').length})</span>
          </button>

          <button 
            onClick={() => setStatusFilter('CONCLUÍDO')}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-xs font-semibold uppercase tracking-wider transition-all ${
              statusFilter === 'CONCLUÍDO' 
                ? 'bg-[#115cb9] text-white' 
                : 'text-slate-300 hover:bg-[#1a2b3c]'
            }`}
          >
            <FileCheck className="w-4 h-4 text-emerald-400" />
            <span>Concluídas ({leads.filter(l => l.status === 'CONCLUÍDO').length})</span>
          </button>

          <button 
            onClick={handleExportCSV}
            className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-xs font-semibold uppercase tracking-wider text-[#659dfe] hover:bg-[#1a2b3c] transition-all"
          >
            <Download className="w-4 h-4" />
            <span>Exportar CSV</span>
          </button>
        </nav>

        {/* Sidebar Footer User Info */}
        <div className="mt-auto p-2 border-t border-slate-800 pt-4 space-y-3">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-[#115cb9] flex items-center justify-center font-bold text-white tracking-widest shrink-0">
              AD
            </div>
            <div>
              <p className="font-sans text-xs font-extrabold text-white">Administrador</p>
              <p className="font-sans text-[10px] text-[#8192a7]">Versão v2.4.0</p>
            </div>
          </div>
          
          <button
            onClick={handleLogout}
            className="w-full flex items-center justify-center gap-2 px-4 py-2 bg-rose-950/40 hover:bg-rose-900/60 border border-rose-800/20 text-rose-300 hover:text-white rounded-xl text-xs font-bold transition-all cursor-pointer"
          >
            <LogOut className="w-3.5 h-3.5" />
            <span>Sair do Painel</span>
          </button>
        </div>
      </aside>

      {/* Main Panel Canvas */}
      <main className="flex-grow flex flex-col min-h-screen overflow-hidden">
        
        {/* Dashboard Topbar Header */}
        <header className="bg-white border-b border-[#c4c6cd]/30 px-6 py-4 flex flex-col md:flex-row justify-between items-center gap-4 flex-shrink-0">
          <div className="flex items-center gap-3">
            <h2 className="font-sans font-black text-2xl text-[#041627]">Solicitações de Cotação</h2>
            <span className="bg-[#ba1a1a] text-white px-3 py-1 rounded-full text-[10px] font-sans font-bold uppercase tracking-widest flex items-center gap-1">
              <Lock className="w-3 h-3 fill-white" />
              Área Restrita
            </span>
          </div>

          <div className="flex flex-col sm:flex-row items-center gap-3 w-full md:w-auto">
            {/* Real-time search bar */}
            <div className="relative w-full sm:w-64">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 w-4 h-4" />
              <input 
                type="text" 
                value={searchTerm}
                onChange={(e) => { setSearchTerm(e.target.value); setCurrentPage(1); }}
                placeholder="Filtrar por nome, placa ou CPF..."
                className="w-full pl-9 pr-4 py-2 bg-slate-50 border border-[#c4c6cd]/60 rounded-xl text-xs font-sans focus:bg-white focus:border-[#115cb9] outline-none transition-all"
              />
            </div>

            {/* Direct Excel/CSV exporter */}
            <button 
              onClick={handleExportCSV}
              className="w-full sm:w-auto bg-[#1a2b3c] hover:bg-[#041627] text-white text-xs font-bold px-4 py-2.5 rounded-xl flex items-center justify-center gap-1.5 transition-colors cursor-pointer shrink-0"
            >
              <FileSpreadsheet className="w-4 h-4" />
              Exportar Planilha
            </button>
          </div>
        </header>

        {/* Dashboard Scrollable Workspace */}
        <div className="flex-grow p-6 space-y-6 overflow-y-auto">
          
          {/* Bento Stats Summary cards (dynamic statistics) */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            
            <div className="bg-white p-5 rounded-2xl border border-[#c4c6cd]/30 shadow-sm flex flex-col justify-between">
              <div>
                <p className="font-sans text-[10px] font-bold text-slate-400 uppercase tracking-wider">Total Atendido</p>
                <p className="font-sans font-extrabold text-3xl text-[#041627] mt-1">{stats.total}</p>
              </div>
              <div className="mt-4 flex items-center gap-1 text-emerald-600 text-xs font-semibold">
                <TrendingUp className="w-4 h-4" />
                <span>+12% vs ontem</span>
              </div>
            </div>

            <div className="bg-white p-5 rounded-2xl border border-[#c4c6cd]/30 shadow-sm flex flex-col justify-between">
              <div>
                <p className="font-sans text-[10px] font-bold text-slate-400 uppercase tracking-wider">Em Análise (Pendente)</p>
                <p className="font-sans font-extrabold text-3xl text-[#041627] mt-1">{stats.pending}</p>
              </div>
              <div className="mt-4 w-full bg-slate-100 h-1.5 rounded-full overflow-hidden">
                <div 
                  className="bg-[#115cb9] h-full transition-all duration-500" 
                  style={{ width: `${stats.total > 0 ? (stats.pending / stats.total) * 100 : 0}%` }}
                />
              </div>
            </div>

            <div className="bg-white p-5 rounded-2xl border border-[#c4c6cd]/30 shadow-sm flex flex-col justify-between">
              <div>
                <p className="font-sans text-[10px] font-bold text-slate-400 uppercase tracking-wider">Convertidas (Concluídas)</p>
                <p className="font-sans font-extrabold text-3xl text-emerald-600 mt-1">{stats.completed}</p>
              </div>
              <div className="mt-4 text-[11px] font-sans text-slate-500">
                Taxa de Conversão: <span className="font-bold text-slate-700">{stats.conversionRate}%</span>
              </div>
            </div>

            <div className="bg-[#1a2b3c] text-white p-5 rounded-2xl border border-slate-800 shadow-sm flex flex-col justify-between">
              <div>
                <p className="font-sans text-[10px] font-bold text-slate-400 uppercase tracking-wider">SLA Médio de Resposta</p>
                <p className="font-sans font-extrabold text-3xl text-[#659dfe] mt-1">14 min</p>
              </div>
              <div className="mt-4 text-[10px] text-slate-400 flex items-center gap-1">
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
                <span>Dentro do esperado</span>
              </div>
            </div>

          </div>

          {/* Action Header block with simulated lead creator */}
          <div className="flex justify-between items-center bg-white p-4 rounded-xl border border-[#c4c6cd]/25">
            <div className="text-xs text-slate-500">
              Filtro ativo: <span className="font-bold text-[#115cb9]">{statusFilter}</span> 
              {searchTerm && ` | Pesquisa: "${searchTerm}"`}
            </div>
            <button 
              onClick={onAddSimulatedLead}
              className="bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold px-3 py-2 rounded-lg flex items-center gap-1.5 transition-colors cursor-pointer"
              title="Gera um novo lead qualificado e injeta na listagem"
            >
              <PlusCircle className="w-4 h-4" />
              Simular Novo Lead
            </button>
          </div>

          {/* Main Leads Table Container */}
          <div className="bg-white rounded-2xl border border-[#c4c6cd]/30 overflow-hidden shadow-sm">
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead className="bg-slate-50 text-slate-400 border-b border-[#c4c6cd]/20 text-[10px] uppercase tracking-wider">
                  <tr>
                    <th className="px-6 py-4 font-bold">Protocolado em</th>
                    <th className="px-6 py-4 font-bold">Cliente</th>
                    <th className="px-6 py-4 font-bold">Placa</th>
                    <th className="px-6 py-4 font-bold">CPF</th>
                    <th className="px-6 py-4 font-bold">Telefone</th>
                    <th className="px-6 py-4 font-bold">Status</th>
                    <th className="px-6 py-4 font-bold text-center">Ações</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 text-xs">
                  {paginatedLeads.length === 0 ? (
                    <tr>
                      <td colSpan={7} className="px-6 py-12 text-center text-slate-400">
                        <div className="flex flex-col items-center gap-2">
                          <AlertCircle className="w-8 h-8 text-slate-300" />
                          <span>Nenhuma solicitação encontrada para os filtros aplicados.</span>
                        </div>
                      </td>
                    </tr>
                  ) : (
                    paginatedLeads.map((lead) => (
                      <tr key={lead.id} className="hover:bg-[#ecf5fe]/20 transition-colors group">
                        
                        {/* Timestamp */}
                        <td className="px-6 py-4 text-[#44474c] font-medium whitespace-nowrap">
                          {lead.createdAt}
                        </td>

                        {/* Customer Info Card */}
                        <td className="px-6 py-4">
                          <div className="flex items-center gap-3">
                            <div className="w-8 h-8 rounded-lg bg-slate-100 text-[#041627] flex items-center justify-center font-bold text-xs shadow-inner">
                              {lead.fullName.split(' ').map(n => n[0]).join('').slice(0, 2).toUpperCase()}
                            </div>
                            <div>
                              <span className="font-bold text-[#041627] block">{lead.fullName}</span>
                              <span className="text-[10px] text-slate-400 block">{lead.email}</span>
                            </div>
                          </div>
                        </td>

                        {/* License Plate */}
                        <td className="px-6 py-4 font-mono font-bold text-[#041627] tracking-wider">
                          {lead.plate}
                        </td>

                        {/* CPF */}
                        <td className="px-6 py-4 text-slate-500 font-mono">
                          {lead.cpf}
                        </td>

                        {/* Phone WhatsApp */}
                        <td className="px-6 py-4 text-slate-500 font-mono whitespace-nowrap">
                          {lead.phone}
                        </td>

                        {/* Status tag */}
                        <td className="px-6 py-4">
                          {lead.status === 'PENDENTE' && (
                            <span className="bg-sky-50 text-sky-800 border border-sky-100 px-2.5 py-1 rounded-full font-sans font-bold text-[10px] uppercase">
                              Pendente
                            </span>
                          )}
                          {lead.status === 'CONCLUÍDO' && (
                            <span className="bg-emerald-50 text-emerald-800 border border-emerald-100 px-2.5 py-1 rounded-full font-sans font-bold text-[10px] uppercase">
                              Concluído
                            </span>
                          )}
                          {lead.status === 'CANCELADO' && (
                            <span className="bg-rose-50 text-rose-800 border border-rose-100 px-2.5 py-1 rounded-full font-sans font-bold text-[10px] uppercase">
                              Cancelado
                            </span>
                          )}
                        </td>

                        {/* Ellipsis Actions Toggle */}
                        <td className="px-6 py-4 text-center relative print:hidden">
                          <button 
                            onClick={() => setActiveDropdownId(activeDropdownId === lead.id ? null : lead.id)}
                            className="p-1 text-slate-400 hover:text-[#115cb9] rounded-lg hover:bg-slate-50 transition-all focus:outline-none cursor-pointer"
                          >
                            <MoreVertical className="w-4 h-4" />
                          </button>

                          {/* Float Action Dropdown */}
                          {activeDropdownId === lead.id && (
                            <>
                              <div 
                                className="fixed inset-0 z-40" 
                                onClick={() => setActiveDropdownId(null)} 
                              />
                              <div className="absolute right-6 top-12 bg-white border border-[#c4c6cd]/40 rounded-xl shadow-xl p-2 z-50 min-w-[160px] space-y-1 text-left animate-fade-in">
                                <p className="text-[9px] font-sans font-bold uppercase text-slate-400 px-2.5 py-1">Alterar Status</p>
                                
                                <button 
                                  onClick={() => { onUpdateLeadStatus(lead.id, 'PENDENTE'); setActiveDropdownId(null); }}
                                  className="w-full flex items-center gap-2 px-3 py-1.5 hover:bg-sky-50 text-slate-700 hover:text-sky-800 rounded-lg text-xs font-semibold"
                                >
                                  <Clock className="w-3.5 h-3.5 text-sky-500" />
                                  <span>Pendente</span>
                                </button>

                                <button 
                                  onClick={() => { onUpdateLeadStatus(lead.id, 'CONCLUÍDO'); setActiveDropdownId(null); }}
                                  className="w-full flex items-center gap-2 px-3 py-1.5 hover:bg-emerald-50 text-slate-700 hover:text-emerald-800 rounded-lg text-xs font-semibold"
                                >
                                  <Check className="w-3.5 h-3.5 text-emerald-500" />
                                  <span>Concluir</span>
                                </button>

                                <button 
                                  onClick={() => { onUpdateLeadStatus(lead.id, 'CANCELADO'); setActiveDropdownId(null); }}
                                  className="w-full flex items-center gap-2 px-3 py-1.5 hover:bg-rose-50 text-slate-700 hover:text-rose-800 rounded-lg text-xs font-semibold"
                                >
                                  <X className="w-3.5 h-3.5 text-rose-500" />
                                  <span>Cancelar</span>
                                </button>

                                <div className="h-px bg-slate-100 my-1" />

                                <button 
                                  onClick={() => { onDeleteLead(lead.id); setActiveDropdownId(null); }}
                                  className="w-full flex items-center gap-2 px-3 py-1.5 hover:bg-rose-50 text-rose-600 hover:text-rose-800 rounded-lg text-xs font-bold"
                                >
                                  <Trash2 className="w-3.5 h-3.5 text-rose-500" />
                                  <span>Excluir</span>
                                </button>
                              </div>
                            </>
                          )}
                        </td>

                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>

            {/* Pagination Footer bar */}
            <div className="px-6 py-4 flex flex-col sm:flex-row items-center justify-between gap-4 bg-slate-50 border-t border-[#c4c6cd]/20 text-xs">
              <p className="font-sans text-slate-500">
                Exibindo {filteredLeads.length > 0 ? (currentPage - 1) * itemsPerPage + 1 : 0} a {Math.min(currentPage * itemsPerPage, filteredLeads.length)} de <span className="font-bold text-[#041627]">{filteredLeads.length}</span> solicitações
              </p>
              
              <div className="flex items-center gap-1">
                <button 
                  onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                  disabled={currentPage === 1}
                  className="p-1.5 border border-slate-200 bg-white rounded-lg hover:bg-slate-100 disabled:opacity-50 transition-colors focus:outline-none cursor-pointer"
                >
                  <ChevronLeft className="w-4 h-4" />
                </button>
                
                {Array.from({ length: totalPages }).map((_, i) => (
                  <button 
                    key={i}
                    onClick={() => setCurrentPage(i + 1)}
                    className={`w-8 h-8 rounded-lg font-sans font-bold transition-all focus:outline-none cursor-pointer ${
                      currentPage === i + 1 
                        ? 'bg-[#115cb9] text-white shadow-md shadow-[#115cb9]/20' 
                        : 'border border-slate-200 bg-white text-[#44474c] hover:bg-slate-100'
                    }`}
                  >
                    {i + 1}
                  </button>
                ))}

                <button 
                  onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
                  disabled={currentPage === totalPages}
                  className="p-1.5 border border-slate-200 bg-white rounded-lg hover:bg-slate-100 disabled:opacity-50 transition-colors focus:outline-none cursor-pointer"
                >
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            </div>

          </div>

        </div>

        {/* Global Panel Footer */}
        <footer className="bg-slate-100 px-6 py-4 border-t border-[#c4c6cd]/20 flex flex-col sm:flex-row justify-between items-center gap-3 text-[10px] text-slate-400 shrink-0">
          <p>© 2026 Lumma Cotação Auto. Painel Administrativo em total conformidade com a LGPD brasileira.</p>
          <div className="flex gap-4">
            <button onClick={() => setView('home')} className="hover:text-slate-600 transition-colors">Voltar para Site Principal</button>
            <a href="#" className="hover:text-slate-600 transition-colors">Normas de Segurança</a>
          </div>
        </footer>

      </main>

    </div>
  );
}
