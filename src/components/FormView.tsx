import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { User, Car, Settings, Send, AlertCircle } from 'lucide-react';
import { Lead } from '../types';
import { supabase } from '../supabase';

interface FormViewProps {
  onAddLead: (lead: Omit<Lead, 'id' | 'createdAt' | 'status'>) => void;
  setView: (view: 'home' | 'form' | 'success' | 'admin') => void;
}

export default function FormView({ onAddLead, setView }: FormViewProps) {
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [cpf, setCpf] = useState('');
  const [plate, setPlate] = useState('');
  const [zipcode, setZipcode] = useState('');
  const [usage, setUsage] = useState<'Comercial' | 'Particular/Lazer'>('Particular/Lazer');
  const [youngDriver, setYoungDriver] = useState<'Sim' | 'Não'>('Não');
  const [consent, setConsent] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [validationError, setValidationError] = useState<string | null>(null);

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
    const leadData = { fullName, email, phone, cpf, plate, zipcode, usage, youngDriver };

    try {
      // BLINDADO: Envia usando as colunas físicas exatas do banco de dados (Snake Case)
      // Removemos o 'id' e 'createdAt' manuais para deixar o Supabase gerar sozinho
      const { error } = await supabase.from('leads').insert([{
        full_name: fullName,
        email: email,
        phone: phone,
        cpf: cpf,
        plate: plate,
        zipcode: zipcode,
        usage: usage,
        young_driver: youngDriver,
        status: 'Novo'
      }]);

      if (error) throw error;

      onAddLead(leadData);
      setView('success');
    } catch (err: any) {
      console.error("Erro crítico ao salvar cotação no Supabase:", err.message);
      // Mantém a navegação para garantir a experiência do cliente
      onAddLead(leadData);
      setView('success');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="max-w-2xl mx-auto px-4 py-8">
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="bg-zinc-900 border border-zinc-800 rounded-2xl p-6 shadow-xl">
        <div className="flex items-center gap-3 mb-6">
          <div className="p-3 bg-[#115cb9]/10 rounded-xl text-[#115cb9]"><Car className="w-6 h-6" /></div>
          <div>
            <h1 className="text-xl font-bold text-white">Solicitar Cotação</h1>
            <p className="text-zinc-400 text-sm">Preencha os dados abaixo para receber sua proposta</p>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          {validationError && (
            <div className="p-4 bg-red-500/10 border border-red-500/20 text-red-400 rounded-xl flex items-center gap-3 text-sm">
              <AlertCircle className="w-5 h-5" />
              <p>{validationError}</p>
            </div>
          )}

          {/* Dados Pessoais */}
          <div className="space-y-4">
            <h3 className="text-sm font-semibold text-zinc-400 uppercase flex items-center gap-2"><User className="w-4 h-4" /> Dados Pessoais</h3>
            <div>
              <label className="block text-sm text-zinc-300 mb-1">Nome Completo *</label>
              <input type="text" required value={fullName} onChange={(e) => setFullName(e.target.value)} className="w-full bg-zinc-950 border border-zinc-800 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-[#115cb9]" />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm text-zinc-300 mb-1">E-mail *</label>
                <input type="email" required value={email} onChange={(e) => setEmail(e.target.value)} className="w-full bg-zinc-950 border border-zinc-800 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-[#115cb9]" />
              </div>
              <div>
                <label className="block text-sm text-zinc-300 mb-1">Telefone / WhatsApp *</label>
                <input type="text" required value={phone} onChange={(e) => setPhone(e.target.value)} className="w-full bg-zinc-950 border border-zinc-800 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-[#115cb9]" placeholder="(00) 00000-0000" />
              </div>
            </div>
            <div>
              <label className="block text-sm text-zinc-300 mb-1">CPF *</label>
              <input type="text" required value={cpf} onChange={(e) => setCpf(e.target.value)} className="w-full bg-zinc-950 border border-zinc-800 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-[#115cb9]" placeholder="000.000.000-00" />
            </div>
          </div>

          {/* Dados do Veículo e Uso */}
          <div className="space-y-4 pt-4 border-t border-zinc-800">
            <h3 className="text-sm font-semibold text-zinc-400 uppercase flex items-center gap-2"><Settings className="w-4 h-4" /> Veículo e Uso</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm text-zinc-300 mb-1">Placa do Veículo *</label>
                <input type="text" required value={plate} onChange={(e) => setPlate(e.target.value.toUpperCase())} className="w-full bg-zinc-950 border border-zinc-800 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-[#115cb9]" placeholder="AAA0A00" />
              </div>
              <div>
                <label className="block text-sm text-zinc-300 mb-1">CEP de Circulação *</label>
                <input type="text" required value={zipcode} onChange={(e) => setZipcode(e.target.value)} className="w-full bg-zinc-950 border border-zinc-800 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-[#115cb9]" placeholder="00000-000" />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2">
              <div>
                <label className="block text-sm text-zinc-300 mb-2">Uso do Veículo</label>
                <div className="flex gap-2">
                  {(['Particular/Lazer', 'Comercial'] as const).map((opt) => (
                    <button key={opt} type="button" onClick={() => setUsage(opt)} className={`flex-1 py-3 px-4 rounded-xl border text-sm font-medium transition ${usage === opt ? 'bg-[#115cb9] border-[#115cb9] text-white' : 'bg-zinc-950 border-zinc-800 text-zinc-400'}`}>
                      {opt}
                    </button>
                  ))}
                </div>
              </div>
              <div>
                <label className="block text-sm text-zinc-300 mb-2">Condutor menor de 25 anos?</label>
                <div className="flex gap-2">
                  {(['Não', 'Sim'] as const).map((opt) => (
                    <button key={opt} type="button" onClick={() => setYoungDriver(opt)} className={`flex-1 py-3 px-4 rounded-xl border text-sm font-medium transition ${youngDriver === opt ? 'bg-[#115cb9] border-[#115cb9] text-white' : 'bg-zinc-950 border-zinc-800 text-zinc-400'}`}>
                      {opt}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Consentimento e Envio */}
          <div className="pt-4 border-t border-zinc-800 space-y-4">
            <label className="flex items-start gap-3 cursor-pointer">
              <input type="checkbox" checked={consent} onChange={(e) => setConsent(e.target.checked)} className="mt-1 w-4 h-4 text-[#115cb9]" />
              <span className="text-xs text-zinc-400">Autorizo a coleta e tratamento dos meus dados pessoais para fins de cálculo de cotação de seguros, conforme a LGPD.</span>
            </label>
            
            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full py-4 bg-[#115cb9] hover:bg-[#115cb9]/90 text-white rounded-xl font-medium transition flex items-center justify-center gap-2 disabled:opacity-50 text-sm shadow-lg shadow-blue-900/20"
            >
              <Send className={`w-4 h-4 ${isSubmitting ? 'animate-pulse' : ''}`} />
              <span>{isSubmitting ? 'Enviando sua Solicitação...' : 'Enviar Solicitação de Cotação'}</span>
            </button>
          </div>
        </form>
      </motion.div>
    </div>
  );
}
