import React, { useState } from 'react';
import { motion } from 'motion/react';
import { 
  User, 
  Car, 
  Settings, 
  Send, 
  Shield, 
  Lock, 
  Gavel, 
  HelpCircle,
  AlertCircle
} from 'lucide-react';
import { Lead } from '../types';
import { supabase } from '../supabase';

interface FormViewProps {
  onAddLead: (lead: Omit<Lead, 'id' | 'createdAt' | 'status'>) => void;
  setView: (view: 'home' | 'form' | 'success' | 'admin') => void;
}

export default function FormView({ onAddLead, setView }: FormViewProps) {
  // Form State
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [cpf, setCpf] = useState('');
  const [plate, setPlate] = useState('');
  const [zipcode, setZipcode] = useState('');
  const [usage, setUsage] = useState<'Comercial' | 'Particular/Lazer'>('Particular/Lazer');
  const [youngDriver, setYoungDriver] = useState<'Sim' | 'Não'>('Não');
  const [consent, setConsent] = useState(false);

  // Loading/Feedback
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [validationError, setValidationError] = useState<string | null>(null);

  // Masking helpers
  const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let value = e.target.value.replace(/\D/g, '');
    if (value.length > 11) value = value.slice(0, 11);
    if (value.length > 2) value = `(${value.slice(0, 2)}) ${value.slice(2)}`;
    if (value.length > 9) value = `${value.slice(0, 10)}-${value.slice(10)}`;
    setPhone(value);
  };

  const handleCpfChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let value = e.target.value.replace(/\D/g, '');
    if (value.length > 11) value = value.slice(0, 11);
    if (value.length > 3) value = `${value.slice(0, 3)}.${value.slice(3)}`;
    if (value.length > 7) value = `${value.slice(0, 7)}.${value.slice(7)}`;
    if (value.length > 11) value = `${value.slice(0, 11)}-${value.slice(11)}`;
    setCpf(value);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!fullName || !email || !phone || !cpf || !plate || !zipcode) {
      setValidationError('Por favor, preencha todos os campos obrigatórios.');
      return;
    }
    if (!consent) {
      setValidationError('Você precisa aceitar os termos de privacidade.');
      return;
    }
    
    setIsSubmitting(true);
    setValidationError(null);

    const leadData = {
      fullName,
      email,
      phone,
      cpf,
      plate,
      zipcode,
      usage,
      youngDriver,
    };

    try {
      // Salva no banco de dados online do Supabase
      const { error } = await supabase
        .from('leads')
        .insert([{
          ...leadData,
          status: 'Novo',
          createdAt: new Date().toISOString()
        }]);

      if (error) throw error;

      // Executa a função local e muda de tela
      onAddLead(leadData);
      setView('success');
    } catch (error: any) {
      console.error('Erro ao salvar cotação:', error);
      setValidationError('Erro ao enviar dados para o servidor central. Tente novamente.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="max-w-2xl mx-auto px-4 py-8">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-zinc-900 border border-zinc-800 rounded-2xl p-6 md:p-8 shadow-xl"
      >
        <div className="flex items-center gap-3 mb-6">
          <div className="p-3 bg-[#115cb9]/10 rounded-xl text-[#115cb9]">
            <Car className="w-6 h-6" />
          </div>
          <div>
            <h1 className="text-xl md:text-2xl font-bold text-white">Solicitar Cotação</h1>
            <p className="text-zinc-400 text-sm">Preencha os dados abaixo para receber sua proposta</p>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          {validationError && (
            <div className="p-4 bg-red-500/10 border border-red-500/20 text-red-400 rounded-xl flex items-center gap-3 text-sm">
              <AlertCircle className="w-5 h-5 shrink-0" />
              <p>{validationError}</p>
            </div>
          )}

          {/* Dados Pessoais */}
          <div className="space-y-4">
            <h3 className="text-sm font-semibold text-zinc-400 uppercase tracking-wider flex items-center gap-2">
              <User className="w-4 h-4" /> Dados Pessoais
            </h3>
            
            <div>
              <label className="block text-sm font-medium text-zinc-300 mb-1">Nome Completo *</label>
              <input 
                type="text" 
                required
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                className="w-full bg-zinc-950 border border-zinc-800 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-[#115cb9] transition"
                placeholder="Seu nome completo"
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-zinc-300 mb-1">E-mail *</label>
                <input 
                  type="email" 
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full bg-zinc-950 border border-zinc-800 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-[#115cb9] transition"
                  placeholder="seu@email.com"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-zinc-300 mb-1">Telefone / WhatsApp *</label>
                <input 
                  type="text" 
                  required
                  value={phone}
                  onChange={handlePhoneChange}
                  className="w-full bg-zinc-950 border border-zinc-800 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-[#115cb9] transition"
                  placeholder="(00) 00000-0000"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-zinc-300 mb-1">CPF *</label>
              <input 
                type="text" 
                required
                value={cpf}
                onChange={handleCpfChange}
                className="w-full bg-zinc-950 border border-zinc-800 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-[#115cb9] transition"
                placeholder="000.000.000-00"
              />
            </div>
          </div>

          {/* Dados do Veículo */}
          <div className="space-y-4 pt-4 border-t border-zinc-800">
            <h3 className="text-sm font-semibold text-zinc-400 uppercase tracking-wider flex items-center gap-2">
              <Settings className="w-4 h-4" /> Dados do Veículo e Uso
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-zinc-300 mb-1">Placa do Veículo *</label>
                <input 
                  type="text" 
                  required
                  value={plate}
                  onChange={(e) => setPlate(e.target.value.toUpperCase())}
                  className="w-full bg-zinc-950 border border-zinc-800 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-[#115cb9] transition"
                  placeholder="AAA0A00"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-zinc-300 mb-1">CEP de Circulação *</label>
                <input 
                  type="text" 
                  required
                  value={zipcode}
                  onChange={(e) => setZipcode(e.target.value.replace(/\D/g, ''))}
                  className="w-full bg-zinc-950 border border-zinc-800 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-[#115cb9] transition"
                  placeholder="00000000"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-zinc-300 mb-2">Uso do Veículo</label>
                <div className="flex gap-2">
                  {(['Particular/Lazer', 'Comercial'] as const).map((opt) => (
                    <button
                      key={opt}
                      type="button"
                      onClick={() => setUsage(opt)}
                      className={`flex-1 py-3 px-4 rounded-xl border text-sm font-medium transition ${
                        usage === opt 
                          ? 'bg-[#115cb9] border-[#115cb9] text-white' 
                          : 'bg-zinc-950 border-zinc-800 text-zinc-400 hover:border-zinc-700'
                      }`}
                    >
                      {opt}
                    </button>
                  ))}
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-zinc-300 mb-2">Condutor menor de 25 anos?</label>
                <div className="flex gap-2">
                  {(['Não', 'Sim'] as const).map((opt) => (
                    <button
                      key={opt}
                      type="button"
                      onClick={() => setYoungDriver(opt)}
                      className={`flex-1 py-3 px-4 rounded-xl border text-sm font-medium transition ${
                        youngDriver === opt 
                          ? 'bg-[#115cb9] border-[#115cb9] text-white' 
                          : 'bg-zinc-950 border-zinc-800 text-zinc-400 hover:border-zinc-700'
                      }`}
                    >
                      {opt}
                    </button>
                  ))}
