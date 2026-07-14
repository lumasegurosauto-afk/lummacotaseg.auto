import React from 'react';
import { ShieldCheck, Lock, Mail, PhoneCall } from 'lucide-react';

interface FooterProps {
  setView: (view: 'home' | 'form' | 'success' | 'admin') => void;
}

export default function Footer({ setView }: FooterProps) {
  return (
    <footer className="w-full bg-[#041627] text-white/90 border-t border-slate-800 print:hidden">
      <div className="max-w-7xl mx-auto px-6 md:px-16 py-12">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-center md:items-start">
          
          {/* Logo and Tagline */}
          <div className="col-span-12 md:col-span-4 space-y-4 text-center md:text-left">
            <button 
              onClick={() => setView('home')}
              className="font-sans font-extrabold text-2xl tracking-tight text-white block mx-auto md:mx-0 cursor-pointer focus:outline-none"
            >
              Lumma <span className="text-[#659dfe]">Cotação Auto</span>
            </button>
            <p className="font-sans text-xs text-[#8192a7] max-w-sm mx-auto md:mx-0 leading-relaxed">
              Sua plataforma inteligente de cotação de seguros automotivos. Segurança, transparência e agilidade para proteger o que é mais importante.
            </p>
            
            {/* Quick Contact Badge */}
            <div className="flex flex-wrap gap-4 justify-center md:justify-start pt-2">
              <div className="flex items-center gap-1.5 text-xs text-[#8192a7]">
                <ShieldCheck className="w-4 h-4 text-[#659dfe]" />
                <span>100% Conforme LGPD</span>
              </div>
            </div>
          </div>

          {/* Navigation links */}
          <div className="col-span-12 md:col-span-4 flex flex-col items-center md:items-start space-y-3">
            <h4 className="font-sans text-xs font-bold uppercase tracking-wider text-[#8192a7]">Navegação</h4>
            <div className="flex flex-col items-center md:items-start gap-2 text-sm text-slate-300">
              <button onClick={() => setView('home')} className="hover:text-white transition-colors">Início</button>
              <button onClick={() => setView('form')} className="hover:text-white transition-colors">Solicitar Cotação</button>
              <button onClick={() => setView('admin')} className="hover:text-white transition-colors text-rose-300">Área Administrativa</button>
            </div>
          </div>

          {/* Legal / Policy links */}
          <div className="col-span-12 md:col-span-4 flex flex-col items-center md:items-end space-y-3 text-center md:text-right">
            <h4 className="font-sans text-xs font-bold uppercase tracking-wider text-[#8192a7]">Documentação</h4>
            <div className="flex flex-col items-center md:items-end gap-2 text-xs text-slate-400">
              <a href="#" className="hover:text-white transition-colors">Termos de Uso</a>
              <a href="#" className="hover:text-white transition-colors">Políticas de Privacidade</a>
              <a href="#" className="hover:text-white transition-colors">Termo de Consentimento</a>
              <a href="#" className="hover:text-white transition-colors">Políticas de Cookies</a>
            </div>
          </div>

        </div>

        {/* Bottom copyright line */}
        <div className="mt-12 pt-6 border-t border-slate-800 flex flex-col md:flex-row justify-between items-center gap-4 text-center md:text-left text-xs text-[#8192a7]">
          <p>© 2026 Lumma Cotação Auto. Todos os direitos reservados. CNPJ 12.345.678/0001-90.</p>
          <p className="flex items-center gap-1">
            <Lock className="w-3 h-3" /> Conexão protegida por criptografia SSL/TLS de ponta a ponta.
          </p>
        </div>
      </div>
    </footer>
  );
}
