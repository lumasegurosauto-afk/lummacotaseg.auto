import React from 'react';

export default function HomeView({ setView }: { setView: (view: string) => void }) {
  return (
    <div style={{ minHeight: '100vh', backgroundColor: '#f8fafc', fontFamily: 'sans-serif' }}>
      <header style={{ backgroundColor: '#ffffff', boxShadow: '0 1px 2px rgba(0,0,0,0.05)', padding: '16px 24px' }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <span style={{ fontSize: '20px', fontWeight: 'bold', color: '#1e293b' }}>Lumma Cotação Auto</span>
          <button 
            onClick={() => setView('admin')} 
            style={{ backgroundColor: '#f1f5f9', border: 'none', padding: '8px 16px', borderRadius: '8px', cursor: 'pointer', fontSize: '14px', color: '#475569' }}
          >
            Área Restrita
          </button>
        </div>
      </header>

      <main style={{ maxWidth: '800px', margin: '80px auto px', padding: '0 24px', textAlign: 'center' }}>
        <h1 style={{ fontSize: '42px', fontWeight: '800', color: '#0f172a', marginBottom: '16px', lineHeight: '1.2' }}>
          Cotação Completa <br />
          <span style={{ color: '#2563eb' }}>em apenas alguns instantes</span>
        </h1>
        <p style={{ fontSize: '18px', color: '#475569', marginBottom: '32px' }}>
          Receba as melhores propostas de seguro auto direto na sua tela. Simple, rápido e seguro.
        </p>
        <button 
          style={{ backgroundColor: '#2563eb', color: '#ffffff', border: 'none', padding: '16px 32px', borderRadius: '12px', fontSize: '16px', fontWeight: '600', cursor: 'pointer', boxShadow: '0 4px 6px -1px rgba(37,99,235,0.2)' }}
        >
          Iniciar Cotação Grátis
        </button>
      </main>
    </div>
  );
}
