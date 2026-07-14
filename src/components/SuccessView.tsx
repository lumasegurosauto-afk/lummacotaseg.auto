import React, { useState } from 'react';
import { motion } from 'motion/react';
import { 
  CheckCircle, 
  ShieldCheck, 
  Zap, 
  MessageSquare, 
  ArrowLeft, 
  Printer, 
  X, 
  FileText,
  Copy,
  Check
} from 'lucide-react';
import { Lead } from '../types';
import { formatLeadDate } from '../utils/date';

interface SuccessViewProps {
  latestLead: Lead | null;
  setView: (view: 'home' | 'form' | 'success' | 'admin') => void;
}

export default function SuccessView({ latestLead, setView }: SuccessViewProps) {
  const [showReceipt, setShowReceipt] = useState(false);
  const [copied, setCopied] = useState(false);

  // Fallback defaults if no lead was submitted directly
  const displayLead = latestLead || {
    id: 'LUM-1099',
    fullName: 'Visitante Lumma',
    email: 'cliente@lumma.com.br',
    phone: '(11) 99999-8888',
    cpf: 'XXX.XXX.XXX-XX',
    plate: 'LUM-2026',
    zipcode: '01311-200',
    usage: 'Particular/Lazer',
    youngDriver: 'Não',
    createdAt: formatLeadDate(new Date()),
  };

  const handleCopyCode = () => {
    navigator.clipboard.writeText(displayLead.id);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="bg-[#f6faff] min-h-screen flex flex-col justify-between print:bg-white print:min-h-0">
      
      {/* Main Content Area */}
      <main className="flex-grow flex items-center justify-center px-6 md:px-16 py-16 print:hidden">
        <div className="max-w-[900px] w-full grid grid-cols-1 md:grid-cols-12 gap-10 items-center">
          
          {/* Left Side: Visual Success Indicator (Asymmetric Bento-ish Style) */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="md:col-span-5 flex flex-col gap-4"
          >
            {/* Main Success Card */}
            <div className="bg-[#ecf5fe] p-8 rounded-2xl flex flex-col items-center justify-center text-center border border-[#c4c6cd]/30 shadow-sm">
              <div className="w-24 h-24 bg-white rounded-full flex items-center justify-center text-[#115cb9] shadow-lg shadow-[#115cb9]/15 mb-6">
                <CheckCircle className="w-16 h-16" strokeWidth={1.5} />
              </div>
              <h2 className="font-sans font-extrabold text-2xl text-[#041627] mb-2">Tudo pronto!</h2>
              <p className="font-sans text-xs text-[#74777d] uppercase tracking-wider font-bold">
                Sua segurança é nossa prioridade.
              </p>
            </div>

            {/* Side Grid Items */}
            <div className="grid grid-cols-2 gap-3">
              <div className="bg-[#e6eff8]/60 backdrop-blur-sm p-4 rounded-xl flex flex-col items-center text-center justify-center border border-[#c4c6cd]/20">
                <ShieldCheck className="w-6 h-6 text-[#115cb9] mb-2" />
                <span className="font-sans text-xs font-semibold text-[#44474c]">Dados Protegidos</span>
              </div>
              <div className="bg-[#e6eff8]/60 backdrop-blur-sm p-4 rounded-xl flex flex-col items-center text-center justify-center border border-[#c4c6cd]/20">
                <Zap className="w-6 h-6 text-[#115cb9] mb-2 animate-bounce" />
                <span className="font-sans text-xs font-semibold text-[#44474c]">Análise Rápida</span>
              </div>
            </div>
          </motion.div>

          {/* Right Side: Success Confirmation & Next Steps */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.15 }}
            className="md:col-span-7 flex flex-col gap-6"
          >
            <div className="space-y-4">
              <h1 className="font-sans font-black text-3xl md:text-4xl text-[#041627] leading-tight tracking-tight">
                Obrigado! Sua solicitação foi recebida com sucesso.
              </h1>
              
              {/* WhatsApp Callout Message */}
              <div className="flex items-start gap-4 bg-white p-5 rounded-xl border-l-4 border-[#115cb9] shadow-sm">
                <MessageSquare className="w-6 h-6 text-[#115cb9] shrink-0 mt-0.5" />
                <div>
                  <h4 className="font-sans font-bold text-sm text-[#041627]">Próximo passo:</h4>
                  <p className="font-sans text-xs md:text-sm text-[#44474c] mt-0.5 leading-relaxed">
                    Nossos corretores especialistas já iniciaram a busca pelas melhores ofertas. Entraremos em contato no seu WhatsApp <span className="font-bold text-[#115cb9]">{displayLead.phone}</span> em breve.
                  </p>
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-3 pt-4">
              <button
                onClick={() => setView('home')}
                className="bg-[#1a2b3c] hover:bg-[#041627] text-white px-5 py-3 rounded-xl font-sans font-bold text-xs flex items-center justify-center gap-1.5 transition-all cursor-pointer whitespace-nowrap"
              >
                <ArrowLeft className="w-3.5 h-3.5" />
                Voltar para o Início
              </button>
              
              <button
                onClick={() => setShowReceipt(true)}
                className="border-2 border-[#1a2b3c] text-[#1a2b3c] hover:bg-slate-100 px-5 py-3 rounded-xl font-sans font-bold text-xs flex items-center justify-center gap-1.5 transition-all cursor-pointer whitespace-nowrap"
              >
                <FileText className="w-3.5 h-3.5" />
                Visualizar Comprovante
              </button>

              <button
                onClick={handlePrint}
                className="bg-[#115cb9] hover:bg-[#0b3c74] text-white px-5 py-3 rounded-xl font-sans font-bold text-xs flex items-center justify-center gap-1.5 transition-all cursor-pointer shadow-md shadow-[#115cb9]/15 whitespace-nowrap"
              >
                <Printer className="w-3.5 h-3.5" />
                Salvar em PDF
              </button>
            </div>

            {/* Decorative Mockup Dashboard Preview Image */}
            <div className="hidden md:block mt-4 opacity-75">
              <div className="w-48 h-16 rounded-xl overflow-hidden shadow-inner border border-slate-200">
                <img 
                  className="w-full h-full object-cover grayscale opacity-80" 
                  alt="Lumma Car Dashboard Preview" 
                  referrerPolicy="no-referrer"
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuAr5yklL3gJNSevmqPxLHAF8NZVMJPvunTFcW5Yg0Hx3c4g6Eg37w0eqwFGJwboVCSHVdmMUtQiHpXdUTmMeoYx3C_BJ7t14p6-vbfB4wB8vhAP7toD1dOjv9CaLWKoxbmrXJrPkBrNiYusCSqoPH5hRTikcqVQD_goGe92f4QT23EU7_5BzqDPTl2YzBkgqUdweChSjJW6q2tEpma6cjRJsyINrPnF5E0_IcuZYmp-IKFUC2kpl_PCeDmfJ-Fl7vmso8VORIiIV84" 
                />
              </div>
            </div>

          </motion.div>
        </div>
      </main>

      {/* Comprovante / Receipt Modal (Micro-interaction) */}
      {showReceipt && (
        <div className="fixed inset-0 bg-black/70 backdrop-blur-sm z-[100] flex items-center justify-center p-4">
          <motion.div 
            initial={{ scale: 0.95, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="bg-white rounded-2xl shadow-2xl max-w-lg w-full overflow-hidden print:p-0 print:shadow-none"
          >
            {/* Modal Header */}
            <div className="bg-[#041627] text-white p-6 flex justify-between items-center print:hidden">
              <div className="flex items-center gap-2">
                <FileText className="w-5 h-5 text-[#659dfe]" />
                <span className="font-sans font-bold text-sm uppercase tracking-wider">Comprovante de Solicitação</span>
              </div>
              <button 
                onClick={() => setShowReceipt(false)}
                className="text-slate-400 hover:text-white transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Receipt Printable Area */}
            <div className="p-8 space-y-6 text-slate-800" id="receipt-print-area">
              
              {/* Receipt Branding Logo */}
              <div className="flex justify-between items-start border-b border-dashed border-slate-200 pb-4">
                <div>
                  <h3 className="font-sans font-extrabold text-xl text-[#041627]">LUMMA COTAÇÃO AUTO</h3>
                  <p className="text-xs text-slate-400">Seguros Automotivos Confiáveis</p>
                </div>
                <div className="bg-[#e6eff8] text-[#115cb9] px-3 py-1.5 rounded-lg text-xs font-mono font-bold flex items-center gap-1.5">
                  <span>ID: {displayLead.id}</span>
                  <button 
                    onClick={handleCopyCode} 
                    className="text-[#115cb9] hover:text-[#041627] print:hidden focus:outline-none"
                    title="Copiar ID da Solicitação"
                  >
                    {copied ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
                  </button>
                </div>
              </div>

              {/* Status Header */}
              <div className="text-center py-2 bg-emerald-50 rounded-lg text-emerald-800 border border-emerald-100 font-sans font-bold text-xs">
                SITUAÇÃO: AGUARDANDO ANÁLISE DE CORRETORA (PENDENTE)
              </div>

              {/* Lead Details Grid */}
              <div className="space-y-3.5 text-xs">
                <div className="grid grid-cols-3 py-1.5 border-b border-slate-100">
                  <span className="text-slate-400 font-medium">Cliente:</span>
                  <span className="col-span-2 text-[#041627] font-bold">{displayLead.fullName}</span>
                </div>
                <div className="grid grid-cols-3 py-1.5 border-b border-slate-100">
                  <span className="text-slate-400 font-medium">CPF:</span>
                  <span className="col-span-2 text-[#041627] font-semibold">{displayLead.cpf}</span>
                </div>
                <div className="grid grid-cols-3 py-1.5 border-b border-slate-100">
                  <span className="text-slate-400 font-medium">WhatsApp:</span>
                  <span className="col-span-2 text-[#041627] font-semibold">{displayLead.phone}</span>
                </div>
                <div className="grid grid-cols-3 py-1.5 border-b border-slate-100">
                  <span className="text-slate-400 font-medium">Placa do Carro:</span>
                  <span className="col-span-2 text-[#115cb9] font-black tracking-wider">{displayLead.plate}</span>
                </div>
                <div className="grid grid-cols-3 py-1.5 border-b border-slate-100">
                  <span className="text-slate-400 font-medium">CEP de Pernoite:</span>
                  <span className="col-span-2 text-[#041627] font-medium">{displayLead.zipcode}</span>
                </div>
                <div className="grid grid-cols-3 py-1.5 border-b border-slate-100">
                  <span className="text-slate-400 font-medium">Uso do Carro:</span>
                  <span className="col-span-2 text-[#041627] font-medium">{displayLead.usage}</span>
                </div>
                <div className="grid grid-cols-3 py-1.5 border-b border-slate-100">
                  <span className="text-slate-400 font-medium">Condutor Jovem:</span>
                  <span className="col-span-2 text-[#041627] font-medium">{displayLead.youngDriver}</span>
                </div>
                <div className="grid grid-cols-3 py-1.5 border-b border-slate-100">
                  <span className="text-slate-400 font-medium">Protocolado em:</span>
                  <span className="col-span-2 text-slate-500">{displayLead.createdAt}</span>
                </div>
              </div>

              {/* Security confirmation notice */}
              <div className="bg-slate-50 p-4 rounded-xl text-[10px] text-slate-400 leading-relaxed text-center border border-slate-100">
                Este documento serve como protocolo oficial de intenção de cotação de seguros Lumma. Em conformidade absoluta com a Lei Geral de Proteção de Dados (LGPD), as informações inseridas foram criptografadas e enviadas de forma segura.
              </div>

            </div>

            {/* Modal Actions */}
            <div className="bg-slate-50 px-6 py-4 flex justify-end gap-3 print:hidden">
              <button 
                onClick={() => setShowReceipt(false)}
                className="bg-slate-200 hover:bg-slate-300 text-slate-700 px-4 py-2.5 rounded-lg text-xs font-bold transition-colors cursor-pointer"
              >
                Fechar
              </button>
              <button 
                onClick={handlePrint}
                className="bg-[#115cb9] hover:bg-[#041627] text-white px-5 py-2.5 rounded-lg text-xs font-bold flex items-center gap-1.5 transition-colors cursor-pointer"
              >
                <Printer className="w-4 h-4" />
                Imprimir / PDF
              </button>
            </div>

          </motion.div>
        </div>
      )}

      {/* Styles for printing only the receipt */}
      <style>{`
        @media print {
          body {
            background: white !important;
            color: black !important;
          }
          /* Ocultar tudo por padrão no print */
          body * {
            visibility: hidden;
            height: auto;
          }
          /* Mostrar apenas a área do comprovante e seus filhos */
          #print-receipt-container, #print-receipt-container * {
            visibility: visible;
          }
          #print-receipt-container {
            position: absolute;
            left: 0;
            top: 0;
            width: 100%;
            padding: 0 !important;
            margin: 0 !important;
            border: none !important;
            box-shadow: none !important;
          }
        }
      `}</style>

      {/* Printable version of the receipt (always in DOM, but visible only during print) */}
      <div id="print-receipt-container" className="hidden print:block bg-white p-8 space-y-6 text-slate-800 w-full max-w-lg mx-auto">
        {/* Receipt Branding Logo */}
        <div className="flex justify-between items-start border-b border-dashed border-slate-200 pb-4">
          <div>
            <h3 className="font-sans font-extrabold text-xl text-[#041627]">LUMMA COTAÇÃO AUTO</h3>
            <p className="text-xs text-slate-400">Seguros Automotivos Confiáveis</p>
          </div>
          <div className="bg-[#e6eff8] text-[#115cb9] px-3 py-1.5 rounded-lg text-xs font-mono font-bold">
            <span>ID: {displayLead.id}</span>
          </div>
        </div>

        {/* Status Header */}
        <div className="text-center py-2 bg-emerald-50 rounded-lg text-emerald-800 border border-emerald-100 font-sans font-bold text-xs">
          SITUAÇÃO: AGUARDANDO ANÁLISE DE CORRETORA (PENDENTE)
        </div>

        {/* Lead Details Grid */}
        <div className="space-y-3.5 text-xs">
          <div className="grid grid-cols-3 py-1.5 border-b border-slate-100">
            <span className="text-slate-400 font-medium">Cliente:</span>
            <span className="col-span-2 text-[#041627] font-bold">{displayLead.fullName}</span>
          </div>
          <div className="grid grid-cols-3 py-1.5 border-b border-slate-100">
            <span className="text-slate-400 font-medium">CPF:</span>
            <span className="col-span-2 text-[#041627] font-semibold">{displayLead.cpf}</span>
          </div>
          <div className="grid grid-cols-3 py-1.5 border-b border-slate-100">
            <span className="text-slate-400 font-medium">WhatsApp:</span>
            <span className="col-span-2 text-[#041627] font-semibold">{displayLead.phone}</span>
          </div>
          <div className="grid grid-cols-3 py-1.5 border-b border-slate-100">
            <span className="text-slate-400 font-medium">Placa do Carro:</span>
            <span className="col-span-2 text-[#115cb9] font-black tracking-wider">{displayLead.plate}</span>
          </div>
          <div className="grid grid-cols-3 py-1.5 border-b border-slate-100">
            <span className="text-slate-400 font-medium">CEP de Pernoite:</span>
            <span className="col-span-2 text-[#041627] font-medium">{displayLead.zipcode}</span>
          </div>
          <div className="grid grid-cols-3 py-1.5 border-b border-slate-100">
            <span className="text-slate-400 font-medium">Uso do Carro:</span>
            <span className="col-span-2 text-[#041627] font-medium">{displayLead.usage}</span>
          </div>
          <div className="grid grid-cols-3 py-1.5 border-b border-slate-100">
            <span className="text-slate-400 font-medium">Condutor Jovem:</span>
            <span className="col-span-2 text-[#041627] font-medium">{displayLead.youngDriver}</span>
          </div>
          <div className="grid grid-cols-3 py-1.5 border-b border-slate-100">
            <span className="text-slate-400 font-medium">Protocolado em:</span>
            <span className="col-span-2 text-slate-500">{displayLead.createdAt}</span>
          </div>
        </div>

        {/* Security confirmation notice */}
        <div className="bg-slate-50 p-4 rounded-xl text-[10px] text-slate-400 leading-relaxed text-center border border-slate-100">
          Este documento serve como protocolo oficial de intenção de cotação de seguros Lumma. Em conformidade absoluta com a Lei Geral de Proteção de Dados (LGPD), as informações inseridas foram criptografadas e enviadas de forma segura.
        </div>
      </div>

    </div>
  );
}
