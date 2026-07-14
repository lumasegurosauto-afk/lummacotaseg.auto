import React from 'react';
import { Car, Menu, X, ShieldCheck } from 'lucide-react';

interface HeaderProps {
  currentView: 'home' | 'form' | 'success' | 'admin';
  setView: (view: 'home' | 'form' | 'success' | 'admin') => void;
}

export default function Header({ currentView, setView }: HeaderProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = React.useState(false);

  return (
    <header className="w-full sticky top-0 bg-white/90 backdrop-blur-md border-b border-[#c4c6cd]/30 z-50 transition-all print:hidden">
      <div className="max-w-7xl mx-auto px-6 md:px-16 py-4 flex justify-between items-center">
        {/* Logo */}
        <button 
          onClick={() => { setView('home'); setMobileMenuOpen(false); }}
          className="flex items-center gap-2 group text-left cursor-pointer focus:outline-none"
        >
          <div className="w-10 h-10 bg-[#115cb9] rounded-lg flex items-center justify-center text-white shadow-md shadow-[#115cb9]/20 group-hover:scale-105 transition-transform">
            <Car className="w-5 h-5" />
          </div>
          <div>
            <span className="font-sans font-extrabold text-xl tracking-tight text-[#041627] block">
              Lumma <span className="text-[#115cb9]">Cotação</span>
            </span>
            <span className="text-[10px] font-sans font-bold tracking-wider text-[#74777d] uppercase block -mt-1">
              Seguro Automotivo
            </span>
          </div>
        </button>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-8">
          <button
            onClick={() => setView('home')}
            className={`font-sans text-sm font-medium transition-colors cursor-pointer hover:text-[#115cb9] ${
              currentView === 'home' ? 'text-[#115cb9] font-semibold' : 'text-[#44474c]'
            }`}
          >
            Início
          </button>
          <a
            href="#beneficios"
            onClick={(e) => {
              if (currentView !== 'home') {
                setView('home');
                // delay slightly to allow component to render
                setTimeout(() => {
                  document.getElementById('beneficios')?.scrollIntoView({ behavior: 'smooth' });
                }, 100);
              } else {
                e.preventDefault();
                document.getElementById('beneficios')?.scrollIntoView({ behavior: 'smooth' });
              }
            }}
            className="font-sans text-sm font-medium text-[#44474c] hover:text-[#115cb9] transition-colors"
          >
            Sobre Nós
          </a>
          <a
            href="#como-funciona"
            onClick={(e) => {
              if (currentView !== 'home') {
                setView('home');
                setTimeout(() => {
                  document.getElementById('como-funciona')?.scrollIntoView({ behavior: 'smooth' });
                }, 100);
              } else {
                e.preventDefault();
                document.getElementById('como-funciona')?.scrollIntoView({ behavior: 'smooth' });
              }
            }}
            className="font-sans text-sm font-medium text-[#44474c] hover:text-[#115cb9] transition-colors"
          >
            Como Funciona
          </a>
          <button
            onClick={() => setView('admin')}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full border text-xs font-semibold uppercase tracking-wider transition-all ${
              currentView === 'admin'
                ? 'bg-[#1a2b3c] border-[#1a2b3c] text-white'
                : 'border-[#ba1a1a]/20 bg-[#ba1a1a]/5 text-[#ba1a1a] hover:bg-[#ba1a1a]/10'
            }`}
          >
            Área Restrita
          </button>
        </nav>

        {/* Action Button & Mobile Toggle */}
        <div className="flex items-center gap-3">
          <button
            onClick={() => setView('form')}
            className="hidden sm:inline-flex bg-[#115cb9] text-white px-5 py-2.5 rounded-lg font-sans text-sm font-semibold hover:bg-[#041627] active:scale-95 transition-all shadow-md shadow-[#115cb9]/15 hover:shadow-lg"
          >
            Solicitar Cotação
          </button>

          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-2 md:hidden text-[#44474c] hover:bg-slate-100 rounded-lg transition-colors"
            aria-label="Toggle Menu"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden border-t border-[#c4c6cd]/20 bg-white px-6 py-4 flex flex-col gap-4 shadow-lg animate-fade-in">
          <button
            onClick={() => { setView('home'); setMobileMenuOpen(false); }}
            className="text-left py-2 font-sans font-medium text-base text-[#44474c] border-b border-slate-100"
          >
            Início
          </button>
          <a
            href="#beneficios"
            onClick={(e) => {
              setMobileMenuOpen(false);
              if (currentView !== 'home') {
                setView('home');
                setTimeout(() => {
                  document.getElementById('beneficios')?.scrollIntoView({ behavior: 'smooth' });
                }, 100);
              } else {
                e.preventDefault();
                document.getElementById('beneficios')?.scrollIntoView({ behavior: 'smooth' });
              }
            }}
            className="text-left py-2 font-sans font-medium text-base text-[#44474c] border-b border-slate-100"
          >
            Sobre Nós
          </a>
          <a
            href="#como-funciona"
            onClick={(e) => {
              setMobileMenuOpen(false);
              if (currentView !== 'home') {
                setView('home');
                setTimeout(() => {
                  document.getElementById('como-funciona')?.scrollIntoView({ behavior: 'smooth' });
                }, 100);
              } else {
                e.preventDefault();
                document.getElementById('como-funciona')?.scrollIntoView({ behavior: 'smooth' });
              }
            }}
            className="text-left py-2 font-sans font-medium text-base text-[#44474c] border-b border-slate-100"
          >
            Como Funciona
          </a>
          <button
            onClick={() => { setView('admin'); setMobileMenuOpen(false); }}
            className="flex items-center gap-2 py-2 font-sans font-semibold text-base text-[#ba1a1a]"
          >
            Área Restrita (Admin)
          </button>
          <button
            onClick={() => { setView('form'); setMobileMenuOpen(false); }}
            className="w-full bg-[#115cb9] text-white py-3 rounded-lg font-sans font-semibold text-center mt-2 shadow-md shadow-[#115cb9]/10"
          >
            Solicitar Cotação
          </button>
        </div>
      )}
    </header>
  );
}
