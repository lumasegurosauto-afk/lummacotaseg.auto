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
    
    // Mask (XX) XXXXX-XXXX
    if (value.length > 6) {
      value = `(${value.slice(0, 2)}) ${value.slice(2, 7)}-${value.slice(7)}`;
    } else if (value.length > 2) {
      value = `(${value.slice(0, 2)}) ${value.slice(2)}`;
    } else if (value.length > 0) {
      value = `(${value}`;
    }
    setPhone(value);
  };

  const handleCpfChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let value = e.target.value.replace(/\D/g, '');
    if (value.length > 11) value = value.slice(0, 11);

    // Mask XXX.XXX.XXX-XX
    if (value.length > 9) {
      value = `${value.slice(0, 3)}.${value.slice(3, 6)}.${value.slice(6, 9)}-${value.slice(9)}`;
    } else if (value.length > 6) {
      value = `${value.slice(0, 3)}.${value.slice(3, 6)}.${value.slice(6)}`;
    } else if (value.length > 3) {
      value = `${value.slice(0, 3)}.${value.slice(3)}`;
    }
    setCpf(value);
  };

  const handleZipcodeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let value = e.target.value.replace(/\D/g, '');
    if (value.length > 8) value = value.slice(0, 8);

    // Mask XXXXX-XXX
    if (value.length > 5) {
      value = `${value.slice(0, 5)}-${value.slice(5)}`;
    }
    setZipcode(value);
  };

  const handlePlateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    // Alphanumeric, max 7, capitalized
    let value = e.target.value.replace(/[^a-zA-Z0-9]/g, '').toUpperCase();
    if (value.length > 7) value = value.slice(0, 7);
    setPlate(value);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setValidationError(null);

    // Basic Validation
    if (!fullName || !email || !phone || !cpf || !plate || !zipcode) {
      setValidationError('Por favor, preencha todos os campos obrigatórios.');
      return;
    }

    if (cpf.length < 14) {
      setValidationError('CPF inválido. Certifique-se de preencher todos os 11 números.');
      return;
    }

    if (phone.length < 14) {
      setValidationError('Telefone inválido. Utilize o formato (XX) XXXXX-XXXX.');
      return;
    }

    if (zipcode.length < 9) {
      setValidationError('CEP inválido. Deve possuir 8 números.');
      return;
    }

    if (plate.length < 7) {
      setValidationError('Placa inválida. Deve possuir 7 caracteres (ex: ABC1D23 ou ABC1234).');
      return;
    }

    if (!consent) {
      setValidationError('Você deve concordar com os termos de consentimento e privacidade da LGPD.');
      return;
    }

    // Submit Action
    setIsSubmitting(true);
    
    // Simulate real database submission delay
    setTimeout(() => {
      onAddLead({
        fullName,
        email,
        phone,
        cpf,
        plate,
        zipcode,
        usage,
        youngDriver,
      });
      setIsSubmitting(false);
      setView('success');
    }, 1500);
  };

  return (
    <div className="bg-[#f6faff] min-h-screen">
      
      {/* Mini Hero Header */}
      <section className="bg-[#1a2b3c] text-white py-12 md:py-16">
        <div className="max-w-7xl mx-auto px-6 md:px-16 text-center lg:text-left">
          <div className="max-w-3xl">
            <h1 className="font-sans font-extrabold text-3xl md:text-4xl lg:text-5xl tracking-tight leading-tight mb-4">
              Sua segurança é nossa prioridade.
            </h1>
            <p className="font-sans text-sm md:text-base text-slate-300">
              Obtenha uma cotação personalizada em poucos minutos e garanta a proteção que seu veículo merece com a Lumma.
            </p>
          </div>
        </div>
      </section>

      {/* Quote Form Container */}
      <section className="py-12 max-w-7xl mx-auto px-6 md:px-16 -mt-10 relative z-20">
        <div className="bg-white border border-[#c4c6cd]/30 rounded-2xl shadow-xl p-6 md:p-12">
          
          <form onSubmit={handleSubmit} className="space-y-10">
            
            {validationError && (
              <div className="bg-rose-50 border border-rose-100 rounded-xl p-4 flex gap-3 items-start text-rose-800 text-xs animate-shake">
                <AlertCircle className="w-5 h-5 shrink-0 text-rose-500" />
                <div>
                  <span className="font-bold">Atenção:</span> {validationError}
                </div>
              </div>
            )}

            {/* Section 1: Personal */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
              <div className="lg:col-span-4 space-y-2">
                <h2 className="font-sans font-bold text-lg md:text-xl text-[#041627] flex items-center gap-2">
                  <User className="w-5 h-5 text-[#115cb9]" />
                  Dados Pessoais
                </h2>
                <p className="font-sans text-xs text-[#74777d]">
                  Informações básicas do condutor principal do veículo.
                </p>
              </div>
              
              <div className="lg:col-span-8 grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="flex flex-col gap-1.5">
                  <label className="font-sans text-xs font-bold text-[#44474c]" htmlFor="fullName">Nome completo</label>
                  <input 
                    type="text" 
                    id="fullName"
                    required
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    placeholder="Ex: João Silva Santos"
                    className="w-full p-3.5 border border-[#c4c6cd]/60 rounded-xl bg-slate-50 focus:bg-white focus:border-[#115cb9] focus:ring-1 focus:ring-[#115cb9] outline-none text-sm text-[#041627] transition-all"
                  />
                </div>
                
                <div className="flex flex-col gap-1.5">
                  <label className="font-sans text-xs font-bold text-[#44474c]" htmlFor="email">E-mail</label>
                  <input 
                    type="email" 
                    id="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="joao@exemplo.com"
                    className="w-full p-3.5 border border-[#c4c6cd]/60 rounded-xl bg-slate-50 focus:bg-white focus:border-[#115cb9] focus:ring-1 focus:ring-[#115cb9] outline-none text-sm text-[#041627] transition-all"
                  />
                </div>
                
                <div className="flex flex-col gap-1.5">
                  <label className="font-sans text-xs font-bold text-[#44474c]" htmlFor="phone">Telefone (WhatsApp)</label>
                  <input 
                    type="tel" 
                    id="phone"
                    required
                    value={phone}
                    onChange={handlePhoneChange}
                    placeholder="(11) 99999-9999"
                    className="w-full p-3.5 border border-[#c4c6cd]/60 rounded-xl bg-slate-50 focus:bg-white focus:border-[#115cb9] focus:ring-1 focus:ring-[#115cb9] outline-none text-sm text-[#041627] transition-all"
                  />
                </div>
                
                <div className="flex flex-col gap-1.5">
                  <label className="font-sans text-xs font-bold text-[#44474c]" htmlFor="cpf">CPF do principal condutor</label>
                  <input 
                    type="text" 
                    id="cpf"
                    required
                    value={cpf}
                    onChange={handleCpfChange}
                    placeholder="000.000.000-00"
                    className="w-full p-3.5 border border-[#c4c6cd]/60 rounded-xl bg-slate-50 focus:bg-white focus:border-[#115cb9] focus:ring-1 focus:ring-[#115cb9] outline-none text-sm text-[#041627] transition-all"
                  />
                </div>
              </div>
            </div>

            <div className="h-px bg-[#c4c6cd]/30" />

            {/* Section 2: Vehicle */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
              <div className="lg:col-span-4 space-y-2">
                <h2 className="font-sans font-bold text-lg md:text-xl text-[#041627] flex items-center gap-2">
                  <Car className="w-5 h-5 text-[#115cb9]" />
                  Veículo &amp; Localização
                </h2>
                <p className="font-sans text-xs text-[#74777d]">
                  Onde seu carro dorme e qual a identificação do modelo.
                </p>
              </div>

              <div className="lg:col-span-8 grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="flex flex-col gap-1.5">
                  <label className="font-sans text-xs font-bold text-[#44474c]" htmlFor="plate">Placa do veículo</label>
                  <input 
                    type="text" 
                    id="plate"
                    required
                    value={plate}
                    onChange={handlePlateChange}
                    placeholder="ABC1D23"
                    className="w-full p-3.5 border border-[#c4c6cd]/60 rounded-xl bg-slate-50 focus:bg-white focus:border-[#115cb9] focus:ring-1 focus:ring-[#115cb9] outline-none text-sm text-[#041627] tracking-wider font-semibold uppercase transition-all"
                  />
                </div>

                <div className="flex flex-col gap-1.5">
                  <label className="font-sans text-xs font-bold text-[#44474c]" htmlFor="zipcode">CEP de pernoite</label>
                  <input 
                    type="text" 
                    id="zipcode"
                    required
                    value={zipcode}
                    onChange={handleZipcodeChange}
                    placeholder="00000-000"
                    className="w-full p-3.5 border border-[#c4c6cd]/60 rounded-xl bg-slate-50 focus:bg-white focus:border-[#115cb9] focus:ring-1 focus:ring-[#115cb9] outline-none text-sm text-[#041627] transition-all"
                  />
                </div>
              </div>
            </div>

            <div className="h-px bg-[#c4c6cd]/30" />

            {/* Section 3: Profile */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
              <div className="lg:col-span-4 space-y-2">
                <h2 className="font-sans font-bold text-lg md:text-xl text-[#041627] flex items-center gap-2">
                  <Settings className="w-5 h-5 text-[#115cb9]" />
                  Perfil de Uso
                </h2>
                <p className="font-sans text-xs text-[#74777d]">
                  Como o veículo é utilizado no dia a dia.
                </p>
              </div>

              <div className="lg:col-span-8 grid grid-cols-1 md:grid-cols-2 gap-6">
                
                {/* Usage field */}
                <div className="flex flex-col gap-2">
                  <span className="font-sans text-xs font-bold text-[#44474c]">Uso do veículo</span>
                  <div className="flex gap-4">
                    <label className="flex items-center gap-2 bg-slate-50 border border-slate-200 hover:border-[#115cb9]/40 p-3 rounded-xl cursor-pointer flex-1 transition-all">
                      <input 
                        type="radio" 
                        name="usage" 
                        value="Particular"
                        checked={usage === 'Particular/Lazer'}
                        onChange={() => setUsage('Particular/Lazer')}
                        className="w-4 h-4 text-[#115cb9] focus:ring-[#115cb9]"
                      />
                      <span className="font-sans text-xs font-semibold text-[#041627]">Particular/Lazer</span>
                    </label>
                    
                    <label className="flex items-center gap-2 bg-slate-50 border border-slate-200 hover:border-[#115cb9]/40 p-3 rounded-xl cursor-pointer flex-1 transition-all">
                      <input 
                        type="radio" 
                        name="usage" 
                        value="Comercial"
                        checked={usage === 'Comercial'}
                        onChange={() => setUsage('Comercial')}
                        className="w-4 h-4 text-[#115cb9] focus:ring-[#115cb9]"
                      />
                      <span className="font-sans text-xs font-semibold text-[#041627]">Comercial / App</span>
                    </label>
                  </div>
                </div>

                {/* Young driver field */}
                <div className="flex flex-col gap-2">
                  <span className="font-sans text-xs font-bold text-[#44474c]">Condutores entre 18-25 anos?</span>
                  <div className="flex gap-4">
                    <label className="flex items-center gap-2 bg-slate-50 border border-slate-200 hover:border-[#115cb9]/40 p-3 rounded-xl cursor-pointer flex-1 transition-all">
                      <input 
                        type="radio" 
                        name="youngDriver" 
                        value="Não"
                        checked={youngDriver === 'Não'}
                        onChange={() => setYoungDriver('Não')}
                        className="w-4 h-4 text-[#115cb9] focus:ring-[#115cb9]"
                      />
                      <span className="font-sans text-xs font-semibold text-[#041627]">Não</span>
                    </label>

                    <label className="flex items-center gap-2 bg-slate-50 border border-slate-200 hover:border-[#115cb9]/40 p-3 rounded-xl cursor-pointer flex-1 transition-all">
                      <input 
                        type="radio" 
                        name="youngDriver" 
                        value="Sim"
                        checked={youngDriver === 'Sim'}
                        onChange={() => setYoungDriver('Sim')}
                        className="w-4 h-4 text-[#115cb9] focus:ring-[#115cb9]"
                      />
                      <span className="font-sans text-xs font-semibold text-[#041627]">Sim</span>
                    </label>
                  </div>
                </div>

              </div>
            </div>

            {/* Compliance & Submit footer */}
            <div className="mt-8 pt-8 border-t border-[#c4c6cd]/40">
              <div className="flex flex-col lg:flex-row items-center justify-between gap-6">
                
                <div className="flex items-start gap-3 max-w-2xl">
                  <input 
                    type="checkbox" 
                    id="consent"
                    checked={consent}
                    onChange={(e) => setConsent(e.target.checked)}
                    className="w-5 h-5 text-[#115cb9] border-[#c4c6cd] rounded focus:ring-[#115cb9] cursor-pointer mt-0.5"
                  />
                  <label htmlFor="consent" className="font-sans text-xs text-[#74777d] leading-relaxed cursor-pointer select-none">
                    Li e concordo com o <span className="text-[#115cb9] font-bold underline hover:text-[#041627] transition-colors">Termo de Consentimento para tratamento de dados pessoais</span> e com as Políticas de Privacidade da Lumma Cotação Auto, em total conformidade com a Lei Geral de Proteção de Dados (LGPD).
                  </label>
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full lg:w-auto bg-[#115cb9] text-white hover:bg-[#041627] px-8 py-4 rounded-xl font-sans font-bold text-base flex items-center justify-center gap-2 disabled:opacity-75 active:scale-[0.98] transition-all shadow-lg shadow-[#115cb9]/15 shrink-0 cursor-pointer"
                >
                  {isSubmitting ? (
                    <>
                      <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white" />
                      Enviando Cotação...
                    </>
                  ) : (
                    <>
                      Enviar Solicitação
                      <Send className="w-4 h-4" />
                    </>
                  )}
                </button>

              </div>
            </div>

            {/* Secure Badges Grid */}
            <div className="flex flex-wrap justify-center lg:justify-start gap-4 mt-8 pt-4 border-t border-slate-100 opacity-60">
              <div className="flex items-center gap-1.5 border border-[#c4c6cd] px-4 py-1.5 rounded-full text-[10px] font-sans font-black tracking-wider text-[#44474c] uppercase">
                <Lock className="w-3.5 h-3.5 text-[#115cb9]" />
                Conexão Segura HTTPS
              </div>
              <div className="flex items-center gap-1.5 border border-[#c4c6cd] px-4 py-1.5 rounded-full text-[10px] font-sans font-black tracking-wider text-[#44474c] uppercase">
                <Gavel className="w-3.5 h-3.5 text-[#115cb9]" />
                Conforme LGPD
              </div>
              <div className="flex items-center gap-1.5 border border-[#c4c6cd] px-4 py-1.5 rounded-full text-[10px] font-sans font-black tracking-wider text-[#44474c] uppercase">
                <Shield className="w-3.5 h-3.5 text-[#115cb9]" />
                Dados Criptografados
              </div>
            </div>

          </form>

        </div>
      </section>

    </div>
  );
}
