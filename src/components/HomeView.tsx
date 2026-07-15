import React, { useState } from 'react';
import { Shield, Car, Clock, CheckCircle2, ChevronRight, Menu, X, Instagram, Facebook } from 'lucide-react';

interface HomeViewProps {
  setView: (view: string) => void;
}

export default function HomeView({ setView }: HomeViewProps) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <div className="min-h-screen bg-slate-50 font-sans text-slate-900 selection:bg-blue-500 selection:text-white">
      {/* Navbar */}
      <nav className="fixed top-0 left-0 right-0 bg-white/80 backdrop-blur-md border-b border-slate-200/80 z-50">
        <div className="max-w-7xl mx-auto px-6 md:px-16 h-20 flex items-center justify-between">
          <div className="flex items-center gap-3 cursor-pointer" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>
            <div className="w-10 h-10 bg-blue-600 rounded-xl flex items-center justify-between p-2.5 shadow-lg shadow-blue-600/20">
              <Car className="w-full h-full text-white" />
            </div>
            <div>
              <span className="text-lg font-black tracking-tight text-slate-900 block leading-none">Lumma Cotação</span>
              <span className="text-[10px] font-bold tracking-widest text-blue-600 uppercase">Seguro Automotivo</span>
            </div>
          </div>

          <div className="hidden md:flex items-center gap-8">
            <a href="#inicio" className="text-sm font-semibold text-slate-600 hover:text-blue-600 transition-colors">Início</a>
            <a href="#beneficios" className="text-sm font-semibold text-slate-600 hover:text-blue-600 transition-colors">Benefícios</a>
            <button onClick={() => setView('admin')} className="text-sm font-bold text-slate-500 hover:text-slate-900 bg-slate-100 px-3 py-1.5 rounded-lg transition-all">Área Restrita</button>
            <button onClick={() => window.scrollTo({ top: document.body.scrollHeight, behavior: 'smooth' })} className="bg-blue-600 hover:bg-blue-500 text-white text-sm font-bold px-6 py-3 rounded-xl transition-all shadow-lg shadow-blue-600/20 hover:shadow-blue-600/30 hover:-translate-y-0.5 active:translate-y-0">Solicitar Cotação</button>
          </div>

          <button onClick={() => setIsMenuOpen(!isMenuOpen)} className="md:hidden p-2 text-slate-600 hover:text-slate-900 transition-colors">
            {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </nav>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="fixed inset-0 top-20 bg-white z-40 md:hidden p-6 border-t border-slate-100 animate-in fade-in slide-in-from-top-5 duration-200">
          <div className="flex flex-col gap-5">
            <a href="#inicio" onClick={() => setIsMenuOpen(false)} className="text-lg font-semibold text-slate-900 py-2 border-b border-slate-50">Início</a>
            <a href="#beneficios" onClick={() => setIsMenuOpen(false)} className="text-lg font-semibold text-slate-900 py-2 border-b border-slate-50">Benefícios</a>
            <button onClick={() => { setView('admin'); setIsMenuOpen(false); }} className="w-full bg-slate-100 text-slate-900 font-bold py-3 rounded-xl text-center">Área Restrita</button>
            <button onClick={() => { setIsMenuOpen(false); window.scrollTo({ top: document.body.scrollHeight, behavior: 'smooth' }); }} className="w-full bg-blue-600 text-white font-bold py-3 rounded-xl text-center shadow-lg shadow-blue-600/20">Solicitar Cotação</button>
          </div>
        </div>
      )}

      {/* Hero Section */}
      <section id="inicio" className="pt-40 pb-20 md:pt-48 md:pb-32 overflow-hidden bg-gradient-to-b from-blue-50/50 via-transparent to-transparent">
        <div className="max-w-7xl mx-auto px-6 md:px-16 text-center relative">
          <div className="inline-flex items-center gap-2 bg-blue-50 border border-blue-100 rounded-full px-4 py-1.5 mb-8 animate-in fade-in slide-in-from-bottom-3 duration-500">
            <Shield className="w-4 h-4 text-blue-600" />
            <span className="text-xs font-bold text-blue-700 tracking-wide uppercase">Sua proteção é nossa prioridade</span>
          </div>
          
          <h1 className="text-4xl md:text-6xl font-black tracking-tight text-slate-900 max-w-4xl mx-auto leading-[1.1] mb-6 animate-in fade-in slide-in-from-bottom-4 duration-600 delay-100">
            Cotação Completa <br />
            <span className="bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">em apenas alguns instantes</span>
          </h1>
          
          <p className="text-lg md:text-xl text-slate-600 max-w-2xl mx-auto mb-10 leading-relaxed animate-in fade-in slide-in-from-bottom-4 duration-600 delay-200">
            Receba as melhores propostas de seguro auto direto na sua tela. Simples, rápido e 100% seguro.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center animate-in fade-in slide-in-from-bottom-4 duration-600 delay-300">
            <button onClick={() => window.scrollTo({ top: document.body.scrollHeight, behavior: 'smooth' })} className="w-full sm:w-auto bg-blue-600 hover:bg-blue-500 text-white font-bold px-8 py-4 rounded-xl transition-all shadow-xl shadow-blue-600/25 hover:shadow-blue-600/35 hover:-translate-y-0.5 active:translate-y-0 flex items-center justify-center gap-2群">
              Iniciar Cotação Grátis <ChevronRight className="w-5 h-5" />
            </button>
          </div>
        </div>
      </section>

      {/* Benefits Grid */}
      <section id="beneficios" className="py-20 md:py-28 bg-white border-y border-slate-100">
        <div className="max-w-7xl mx-auto px-6 md:px-16">
          <div className="text-center max-w-3xl mx-auto mb-16 md:mb-24">
            <h2 className="text-3xl md:text-4xl font-black tracking-tight text-slate-900 mb-4">Por que cotar conosco?</h2>
            <p className="text-slate-600">Unimos tecnologia avançada e atendimento humanizado para encontrar a proteção perfeita.</p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-slate-50 border border-slate-100 rounded-2xl p-8 transition-all hover:shadow-xl hover:shadow-slate-200/50 hover:-translate-y-1">
              <div className="w-12 h-12 bg-blue-50 rounded-xl flex items-center justify-center mb-6 text-blue-600"><Clock className="w-6 h-6" /></div>
              <h3 className="text-xl font-bold text-slate-900 mb-3">Ultra Rápido</h3>
              <p className="text-slate-600 text-sm leading-relaxed">Chega de formulários intermináveis. Preencha os dados essenciais e nossa inteligência faz o resto em poucos segundos.</p>
            </div>
            <div className="bg-slate-50 border border-slate-100 rounded-2xl p-8 transition-all hover:shadow-xl hover:shadow-slate-200/50 hover:-translate-y-1">
              <div className="w-12 h-12 bg-emerald-50 rounded-xl flex items-center justify-center mb-6 text-emerald-600"><Shield className="w-6 h-6" /></div>
              <h3 className="text-xl font-bold text-slate-900 mb-3">As Maiores Seguradoras</h3>
              <p className="text-slate-600 text-sm leading-relaxed">Comparamos simultaneamente preços e coberturas na Porto Seguro, Azul, Allianz, Tokio Marine e muito mais.</p>
            </div>
            <div className="bg-slate-50 border border-slate-100 rounded-2xl p-8 transition-all hover:shadow-xl hover:shadow-slate-200/50 hover:-translate-y-1">
              <div className="w-12 h-12 bg-indigo-50 rounded-xl flex items-center justify-center mb-6 text-indigo-600"><CheckCircle2 className="w-6 h-6" /></div>
              <h3 className="text-xl font-bold text-slate-900 mb-3">100% Personalizado</h3>
              <p className="text-slate-600 text-sm leading-relaxed">Seu seguro sob medida para o seu bolso, com as coberturas exatas que você precisa para o seu dia a dia.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-slate-900 text-slate-400 py-12 border-t border-slate-800">
        <div className="max-w-7xl mx-auto px-6 md:px-16 text-center space-y-6">
          <p className="text-sm">© {new Date().getFullYear()} Lumma Cotação Seguro Automotivo. Todos os direitos reservados.</p>
          <div className="flex justify-center gap-6 pt-2">
            <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="text-slate-400 hover:text-pink-500 font-medium transition-colors flex items-center gap-1.5"><Instagram className="w-4 h-4" /> Instagram</a>
            <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="text-slate-400 hover:text-blue-500 font-medium transition-colors flex items-center gap-1.5"><Facebook className="w-4 h-4" /> Facebook</a>
          </div>
        </div>
      </footer>
    </div>
  );
}
