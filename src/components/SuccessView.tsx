import React, { useState } from 'react';
import { motion } from 'framer-motion';
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

interface SuccessViewProps {
  latestLead: Lead | null;
  setView: (view: 'home' | 'form' | 'success' | 'admin') => void;
}

export default function SuccessView({ latestLead, setView }: SuccessViewProps) {
  const [showReceipt, setShowReceipt] = useState(false);
  const [copied, setCopied] = useState(false);

  // 📞 Seu número de WhatsApp real configurado com código do país (55) e DDD (61)
  const MEU_WHATSAPP_REAL = "5561992776903"; 

  // Fallback defaults se nenhum dado for enviado diretamente
  const displayLead = latestLead || {
    id: 'LUM-1099',
    fullName: 'Visitante Lumma',
    email: 'cliente@lumma.com.br',
    phone: '(61) 99277-6903',
    cpf: 'XXX.XXX.XXX-XX',
    plate: 'LUM-2026',
    zipcode: '70000-000',
    usage: 'Particular/Lazer',
    youngDriver: 'Não',
    createdAt: new Date().toLocaleDateString('pt-BR'),
  };

  const handleCopyCode = () => {
    navigator.clipboard.writeText(displayLead.id);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleOpenWhatsApp = () => {
    const textoMensagem = encodeURIComponent(`Olá! Acabei de enviar minha solicitação de cotação de seguro automóvel no site. Meu código identificador é: ${displayLead.id}. Aguardo minha proposta!`);
    window.open(`https://wa.me{MEU_WHATSAPP_REAL}?text=${textoMensagem}`, '_blank');
  };

  return (
    <div className="bg-zinc-950 min-h-screen flex flex-col justify-between text-white print:bg-white print:text-black">
      
      {/* Main Content Area */}
      <main className="flex-grow flex items-center justify-center px-6 md:px-16 py-16 print:hidden">
        <div className="max-w-[900px] w-full grid grid-cols-1 md:grid-cols-12 gap-10 items-center">
          
          {/* Left Side: Visual Success Indicator */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="md:col-span-5 flex flex-col gap-4"
          >
            {/* Main Success Card */}
            <div className="bg-zinc-900 p-8 rounded-2xl flex flex-col items-center justify-center text-center border border-zinc-800 shadow-xl">
              <div className="w-24 h-24 bg-[#115cb9]/10 rounded-full flex items-center justify-center text-[#115cb9] mb-6">
                <CheckCircle className="w-16 h-16" strokeWidth={1.5} />
              </div>
              <h2 className="font-sans font-extrabold text-2xl text-white mb-2">Tudo pronto!</h2>
              <p className="font-sans text-xs text-zinc-400 uppercase tracking-wider font-bold">
                Sua segurança é nossa prioridade.
              </p>
            </div>

            {/* Side Grid Items */}
            <div className="grid grid-cols-2 gap-3">
              <div className="bg-zinc-900 p-4 rounded-xl flex flex-col items-center text-center justify-center border border-zinc-800">
                <ShieldCheck className="w-6 h-6 text-[#115cb9] mb-2" />
                <span className="font-sans text-xs font-semibold text-zinc-300">Dados Protegidos</span>
              </div>
              <div className="bg-zinc-900 p-4 rounded-xl flex flex-col items-center text-center justify-center border border-zinc-800">
                <Zap className="w-6 h-6 text-[#115cb9] mb-2 animate-pulse" />
                <span className="font-sans text-xs font-semibold text-zinc-300">Análise Rápida</span>
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
              <h1 className="font-sans font-black text-3xl md:text-4xl text-white leading-tight tracking-tight">
                Obrigado! Sua solicitação foi recebida com sucesso.
              </h1>
              
              {/* WhatsApp Callout Message (Letras escuras no fundo claro) */}
              <div className="flex items-start gap-4 bg-white p-5 rounded-xl border-l-4 border-[#115cb9] shadow-md">
                <MessageSquare className="w-6 h-6 text-[#115cb9] shrink-0 mt-0.5" />
                <div>
                  <h4 className="font-sans font-bold text-sm text-zinc-900">Próximo passo:</h4>
                  <p className="font-sans text-xs md:text-sm text-zinc-700 mt-0.5 leading-relaxed">
                    Nossos corretores especialistas já iniciaram a busca pelas melhores ofertas. Se quiser agilizar seu atendimento, clique no botão verde abaixo para nos enviar uma mensagem direta ou aguarde nosso contato no seu número informado: <span className="font-bold text-[#115cb9]">{displayLead.phone}</span>.
                  </p>
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-3 pt-4">
              <button
                onClick={handleOpenWhatsApp}
                className="bg-green-600 hover:bg-green-700 text-white px-5 py-3 rounded-xl font-sans font-bold text-xs flex items-center justify-center gap-1.5 transition-all cursor-pointer whitespace-nowrap shadow-lg shadow-green-900/20"
              >
                <MessageSquare className="w-4 h-4" />
                Falar no WhatsApp
              </button>

              <button
                onClick={() => setShowReceipt(true)}
                className="border-2 border-zinc-800 text-zinc-300 hover:bg-zinc-900 px-5 py-3 rounded-xl font-sans font-bold text-xs flex items-center justify-center gap-1.5 transition-all cursor-pointer whitespace-nowrap"
              >
                <FileText className="w-3.5 h-3.5" />
                Visualizar Código
              </button>
              
              <button
                onClick={() => setView('home')}
                className="bg-zinc-900 hover:bg-zinc-800 text-white px-5 py-3 rounded-xl font-sans font-bold text-xs flex items-center justify-center gap-1.5 transition-all cursor-pointer whitespace-nowrap border border-zinc-800"
              >
                <ArrowLeft className="w-3.5 h-3.5" />
                Voltar ao Início
              </button>
            </div>

            {/* Car Interior Decorative Element */}
            <div className="hidden md:block mt-4 opacity-50">
              <div className="w-48 h-20 rounded-xl overflow-hidden border border-zinc-800 shadow-2xl">
                <img 
                  className="w-full h-full object-cover" 
                  alt="Lumma Car Interior Dashboard" 
                  src="https://googleusercontent.com" 
                />
              </div>
            </div>

          </motion.div>
        </div>
      </main>

      {/* Comprovante / Receipt Modal */}
      {showReceipt && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-[100] flex items-center justify-center p-4">
          <motion.div 
            initial={{ scale: 0.95, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="bg-zinc-900 border border-zinc-800 rounded-2xl shadow-2xl max-w-md w-full overflow-hidden text-white"
          >
            <div className="bg-zinc-950 p-6 flex justify-between items-center border-b border-zinc-800">
              <div className="flex items-center gap-2">
                <FileText className="w-5 h-5 text-[#115cb9]" />
                <span className="font-sans font-bold text-sm uppercase tracking-wider">Código identificador</span>
              </div>
              <button 
                onClick={() => setShowReceipt(false)}
                className="text-zinc-400 hover:text-white transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            <div className="p-6 space-y-4">
              <div className="bg-zinc-950 p-4 rounded-xl border border-zinc-800 flex items-center justify-between">
                <div>
                  <p className="text-xs text-zinc-500 font-mono">ID DA SOLICITAÇÃO</p>
                  <p className="text-lg font-mono font-bold text-[#115cb9]">{displayLead.id}</p>
                </div>
                <button 
                  onClick={handleCopyCode}
                  className="p-2 bg-zinc-900 hover:bg-zinc-800 rounded-lg text-zinc-400 hover:text-white border border-zinc-800 transition"
                >
                  {copied ? <Check className="w-4 h-4 text-green-400" /> : <Copy className="w-4 h-4" />}
                </button>
              </div>
              <div className="text-xs text-zinc-400 space-y-1.5 font-sans">
                <p><strong>Nome:</strong> {displayLead.fullName}</p>
                <p><strong>Placa:</strong> {displayLead.plate}</p>
                <p><strong>Uso:</strong> {displayLead.usage}</p>
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </div>
  );
}
