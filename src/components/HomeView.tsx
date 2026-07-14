import React from 'react';
import { motion } from 'motion/react';
import { 
  ShieldCheck, 
  Zap, 
  Clock, 
  Smartphone, 
  CheckCircle, 
  MessageSquare, 
  ArrowRight, 
  Shield, 
  Lock, 
  HelpCircle,
  ThumbsUp,
  X
} from 'lucide-react';

interface HomeViewProps {
  setView: (view: 'home' | 'form' | 'success' | 'admin') => void;
}

export default function HomeView({ setView }: HomeViewProps) {
  const [showWhatsappModal, setShowWhatsappModal] = React.useState(false);
  const [typedMessage, setTypedMessage] = React.useState('');
  const [chatSubmitted, setChatSubmitted] = React.useState(false);

  // Smooth scroll helper
  const scrollToSection = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
  };

  const handleSupportSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!typedMessage.trim()) return;
    setChatSubmitted(true);
    setTimeout(() => {
      // simulate opening real whatsapp link
      window.open(`https://api.whatsapp.com/send?phone=5511999999999&text=${encodeURIComponent(typedMessage)}`, '_blank');
      setChatSubmitted(false);
      setShowWhatsappModal(false);
      setTypedMessage('');
    }, 1500);
  };

  return (
    <div className="bg-[#f6faff] min-h-screen">
      
      {/* Hero Section */}
      <section className="relative py-12 md:py-24 overflow-hidden bg-gradient-to-b from-white to-[#f6faff]">
        <div className="max-w-7xl mx-auto px-6 md:px-16 w-full grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Left Column: Heading & CTAs */}
          <motion.div 
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            className="lg:col-span-6 space-y-6 text-center lg:text-left"
          >
            <div className="inline-flex items-center gap-2 bg-[#d7e2ff] text-[#004491] px-4 py-1.5 rounded-full font-sans text-xs font-bold tracking-wider uppercase">
              <ShieldCheck className="w-4 h-4" />
              Líder em confiança digital
            </div>
            
            <h1 className="font-sans font-extrabold text-4xl md:text-5xl lg:text-6xl text-[#041627] leading-tight tracking-tight">
              Sua cotação de seguro de forma <span className="text-[#115cb9]">rápida, prática e segura.</span>
            </h1>
            
            <p className="font-sans text-base md:text-lg text-[#44474c] max-w-xl mx-auto lg:mx-0 leading-relaxed">
              Proteja o seu patrimônio com a agilidade que você merece. Tecnologia de ponta para encontrar o melhor custo-benefício em segundos.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start pt-4">
              <button
                onClick={() => setView('form')}
                className="bg-[#115cb9] text-white px-8 py-4 rounded-xl font-sans font-bold text-base hover:bg-[#041627] active:scale-95 transition-all shadow-lg shadow-[#115cb9]/20 flex items-center justify-center gap-2 cursor-pointer"
              >
                Solicitar Cotação Agora
                <ArrowRight className="w-5 h-5" />
              </button>
              <button
                onClick={() => scrollToSection('beneficios')}
                className="border-2 border-[#1a2b3c] text-[#1a2b3c] px-8 py-4 rounded-xl font-sans font-bold text-base hover:bg-[#1a2b3c]/5 active:scale-95 transition-all cursor-pointer"
              >
                Saiba Mais
              </button>
            </div>
          </motion.div>
          
          {/* Right Column: Hero Graphic */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.7, delay: 0.1 }}
            className="lg:col-span-6 relative flex justify-center"
          >
            <div className="relative w-full max-w-md md:max-w-lg aspect-[4/5] rounded-2xl overflow-hidden shadow-2xl border border-white/20">
              <img 
                className="w-full h-full object-cover" 
                alt="Lumma Luxury Car Interior" 
                referrerPolicy="no-referrer"
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuAJLVwkfdiyVwWcuGH7GuqGpN7n2gpsjeMy4sPYtYEhVbW_uyeP_l1Evome3NskBNXwTIwFhS0cCw_Zlz-xwoift6Q5YxyTX_mTerw1DAcyh0hudF1z2j8Rkte_UDZ0DdUJhUKjOHXHYR2RR0ia0v6qIH7MP4Ou61Eg_Wu5lSeltUHthQvB9dcfwGng7_FYNmvb5Cf9ygy2vgWT1QxQj6w9k4U5wbMHl3NQ0sZmQYJ6ZkHOcoV-K-rIayG9MXDRklRjyQOymGMuEsY" 
              />
              
              {/* Blur backdrop accents */}
              <div className="absolute -top-12 -right-12 w-48 h-48 bg-[#659dfe]/40 rounded-full blur-3xl -z-10" />
              <div className="absolute -bottom-12 -left-12 w-48 h-48 bg-[#d7e2ff]/40 rounded-full blur-3xl -z-10" />
              
              {/* Floating Stat Card */}
              <div className="absolute bottom-6 left-6 right-6 bg-white/80 backdrop-blur-md p-4 rounded-xl shadow-xl border border-white/40 flex items-center gap-4 hover:scale-[1.02] transition-transform duration-300">
                <div className="w-12 h-12 bg-[#115cb9] rounded-full flex items-center justify-center text-white shrink-0 shadow-md">
                  <Zap className="w-6 h-6 animate-pulse" />
                </div>
                <div>
                  <p className="font-sans text-xs font-bold text-[#74777d] uppercase tracking-wider">Cotação Completa</p>
                  <p className="font-sans text-lg font-extrabold text-[#041627]">Em apenas 30 segundos</p>
                </div>
              </div>
            </div>
          </motion.div>

        </div>
      </section>

      {/* Benefits Section (Bento Grid Style) */}
      <section id="beneficios" className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-6 md:px-16">
          
          <div className="text-center max-w-2xl mx-auto mb-16">
            <h2 className="font-sans font-extrabold text-3xl md:text-4xl text-[#041627] tracking-tight">
              Por que escolher a Lumma?
            </h2>
            <p className="font-sans text-base text-[#74777d] mt-3">
              Inovação, conformidade legal e transparência no mercado de seguros automotivos.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
            
            {/* Benefit 1: Speed (Large 8-col card) */}
            <div className="lg:col-span-8 bg-[#f6faff] border border-[#c4c6cd]/30 p-8 rounded-2xl flex flex-col md:flex-row gap-8 items-center justify-between shadow-sm hover:shadow-md transition-shadow">
              <div className="flex-1 space-y-4">
                <div className="w-12 h-12 bg-[#659dfe]/20 rounded-xl flex items-center justify-center text-[#115cb9]">
                  <Zap className="w-6 h-6 font-bold" />
                </div>
                <h3 className="font-sans font-bold text-2xl text-[#041627]">Velocidade Máxima</h3>
                <p className="font-sans text-sm text-[#44474c] leading-relaxed">
                  Utilizamos inteligência de dados de última geração para processar o seu perfil de risco instantaneamente, comparando em tempo real com as melhores seguradoras parceiras do país.
                </p>
              </div>
              <div className="w-full md:w-1/2 aspect-video bg-[#ecf5fe] rounded-xl overflow-hidden shadow-inner border border-slate-200">
                <img 
                  className="w-full h-full object-cover opacity-90" 
                  alt="Data Processing Visualization" 
                  referrerPolicy="no-referrer"
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuA9erW-qQeTFoDM6mZwlwHv5aWKKFiXeWfJZiDfIssCh23U2sSIpHV2xnV6oD1gPyidzthnOIb0RCPuIYihQs6GCZCbhrNXmJTdu5f-FSYCQI3PTcn4L1OhYq7vam-AidXh-QVPxi8xDkLidDwEOUAtW3K56Ywx6GFnYDWZtUVOhwQAGUvBCJzaZbGJg7em03OI7BIqo33VMPJmQ_ditAH4Jl8dO_PxMR8iocSGT0xpwSTFzkg9d9IX8FXr4a67g025FsOgHOM2kjQ" 
                />
              </div>
            </div>

            {/* Benefit 2: Practicality (Dark 4-col card) */}
            <div className="lg:col-span-4 bg-[#041627] text-white p-8 rounded-2xl flex flex-col justify-between shadow-sm hover:shadow-lg transition-all border border-slate-800">
              <div className="space-y-4">
                <div className="w-12 h-12 bg-[#659dfe]/10 rounded-xl flex items-center justify-center text-[#659dfe]">
                  <Smartphone className="w-6 h-6" />
                </div>
                <h3 className="font-sans font-bold text-2xl text-white">Praticidade Total</h3>
                <p className="font-sans text-sm text-[#8192a7] leading-relaxed">
                  Faça toda a contratação e vistoria diretamente do seu celular ou computador. Sem assinaturas físicas, sem montanhas de papelada e com zero burocracia do início ao fim.
                </p>
              </div>
              <div className="mt-8 pt-4 border-t border-slate-800 flex items-center gap-3">
                <div className="flex -space-x-2">
                  <div className="w-8 h-8 rounded-full border-2 border-[#041627] bg-[#659dfe] flex items-center justify-center text-[10px] font-bold text-white">L</div>
                  <div className="w-8 h-8 rounded-full border-2 border-[#041627] bg-[#115cb9] flex items-center justify-center text-[10px] font-bold text-white">U</div>
                  <div className="w-8 h-8 rounded-full border-2 border-[#041627] bg-[#d7e2ff] flex items-center justify-center text-[10px] font-bold text-[#001a40]">M</div>
                </div>
                <span className="font-sans text-xs text-[#8192a7]">Atendimento 100% digital</span>
              </div>
            </div>

            {/* Benefit 3: Security (4-col card) */}
            <div className="lg:col-span-4 bg-white border border-[#c4c6cd]/40 p-8 rounded-2xl flex flex-col gap-4 shadow-sm hover:shadow-md transition-shadow">
              <div className="w-12 h-12 bg-emerald-50 rounded-xl flex items-center justify-center text-emerald-600">
                <Shield className="w-6 h-6" />
              </div>
              <h3 className="font-sans font-bold text-xl text-[#041627]">Segurança de Dados</h3>
              <p className="font-sans text-sm text-[#44474c] leading-relaxed">
                Total conformidade com a Lei Geral de Proteção de Dados (LGPD). Suas informações pessoais e de localização são criptografadas com protocolos robustos e usadas estritamente para a geração do seu orçamento de seguro.
              </p>
            </div>

            {/* Benefit 4: Support (8-col card) */}
            <div className="lg:col-span-8 bg-gradient-to-r from-[#e6eff8] to-[#ecf5fe] border border-[#c4c6cd]/30 p-8 rounded-2xl flex flex-col sm:flex-row justify-between items-start sm:items-center relative overflow-hidden shadow-sm hover:shadow-md transition-all">
              <div className="space-y-4 max-w-md z-10">
                <h3 className="font-sans font-bold text-2xl text-[#041627]">Suporte Especializado</h3>
                <p className="font-sans text-sm text-[#44474c] leading-relaxed">
                  Não gosta de falar com robôs? Nossa equipe de corretores humanos e especialistas em automóvel está a postos para esclarecer cláusulas, franquias e escolher a melhor cobertura sob medida.
                </p>
                <button 
                  onClick={() => setShowWhatsappModal(true)}
                  className="mt-4 text-[#115cb9] font-sans font-bold text-sm flex items-center gap-1 hover:text-[#041627] transition-colors focus:outline-none cursor-pointer"
                >
                  Falar com consultor agora
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
              <div className="hidden sm:block absolute right-4 bottom-0 opacity-15 pointer-events-none transform translate-y-6">
                <MessageSquare className="w-64 h-64 text-[#115cb9]" />
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section id="como-funciona" className="py-20 bg-[#f6faff]">
        <div className="max-w-7xl mx-auto px-6 md:px-16">
          
          <div className="text-center max-w-2xl mx-auto mb-16">
            <h2 className="font-sans font-extrabold text-3xl md:text-4xl text-[#041627] tracking-tight">
              Como funciona o processo
            </h2>
            <p className="font-sans text-base text-[#74777d] mt-3">
              Processo simplificado, transparente e sem letras miúdas.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 relative">
            
            {/* Step 1 */}
            <div className="bg-white p-8 rounded-2xl border border-[#c4c6cd]/20 relative shadow-sm hover:shadow-md transition-all text-center space-y-4 group">
              <div className="w-16 h-16 bg-[#e6eff8] rounded-full flex items-center justify-center mx-auto text-[#115cb9] font-sans font-black text-xl group-hover:bg-[#115cb9] group-hover:text-white transition-all duration-300 shadow-sm">
                1
              </div>
              <h4 className="font-sans font-bold text-lg text-[#041627]">Dados Básicos</h4>
              <p className="font-sans text-sm text-[#44474c] leading-relaxed">
                Preencha o formulário eletrônico simplificado com as informações fundamentais suas e do seu veículo.
              </p>
            </div>

            {/* Step 2 */}
            <div className="bg-white p-8 rounded-2xl border border-[#c4c6cd]/20 relative shadow-sm hover:shadow-md transition-all text-center space-y-4 group">
              <div className="w-16 h-16 bg-[#e6eff8] rounded-full flex items-center justify-center mx-auto text-[#115cb9] font-sans font-black text-xl group-hover:bg-[#115cb9] group-hover:text-white transition-all duration-300 shadow-sm">
                2
              </div>
              <h4 className="font-sans font-bold text-lg text-[#041627]">Análise Instantânea</h4>
              <p className="font-sans text-sm text-[#44474c] leading-relaxed">
                Nossos sistemas inteligentes consultam e organizam as cotações das seguradoras para encontrar as opções mais seguras de mercado.
              </p>
            </div>

            {/* Step 3 */}
            <div className="bg-white p-8 rounded-2xl border border-[#c4c6cd]/20 relative shadow-sm hover:shadow-md transition-all text-center space-y-4 group">
              <div className="w-16 h-16 bg-[#e6eff8] rounded-full flex items-center justify-center mx-auto text-[#115cb9] font-sans font-black text-xl group-hover:bg-[#115cb9] group-hover:text-white transition-all duration-300 shadow-sm">
                3
              </div>
              <h4 className="font-sans font-bold text-lg text-[#041627]">Escolha e Ative</h4>
              <p className="font-sans text-sm text-[#44474c] leading-relaxed">
                Compare as ofertas recomendadas de forma clara e limpa. Escolha a sua cobertura ideal e ative o seguro com comodidade.
              </p>
            </div>

          </div>

          <div className="mt-16 flex justify-center">
            <button
              onClick={() => setView('form')}
              className="bg-[#115cb9] text-white px-8 py-4 rounded-xl font-sans font-bold text-base hover:bg-[#041627] active:scale-95 transition-all shadow-lg shadow-[#115cb9]/15 cursor-pointer"
            >
              Começar Cotação Grátis
            </button>
          </div>
        </div>
      </section>

      {/* CTA Bottom Banner Section */}
      <section className="py-12 md:py-20 bg-white">
        <div className="max-w-7xl mx-auto px-6 md:px-16">
          <div className="bg-[#041627] rounded-3xl p-8 md:p-16 relative overflow-hidden flex flex-col lg:flex-row items-center justify-between gap-8 shadow-xl">
            {/* Background decoration */}
            <div className="absolute top-0 right-0 w-96 h-96 bg-[#115cb9] opacity-20 rounded-full blur-3xl pointer-events-none" />
            <div className="absolute bottom-0 left-0 w-96 h-96 bg-[#659dfe] opacity-10 rounded-full blur-3xl pointer-events-none" />

            <div className="relative z-10 flex-1 space-y-4 text-center lg:text-left">
              <h2 className="font-sans font-extrabold text-3xl md:text-4xl text-white leading-tight">
                Pronto para proteger seu veículo?
              </h2>
              <p className="font-sans text-sm md:text-base text-slate-300 max-w-xl mx-auto lg:mx-0">
                Junte-se a milhares de motoristas brasileiros que economizaram até 30% na contratação ou renovação do seguro com a Lumma.
              </p>
            </div>

            <div className="relative z-10 shrink-0">
              <button
                onClick={() => setView('form')}
                className="bg-[#115cb9] hover:bg-white hover:text-[#041627] text-white px-8 py-4 rounded-xl font-sans font-bold text-base transition-colors duration-300 shadow-md shadow-[#115cb9]/20 cursor-pointer"
              >
                Solicitar Cotação Agora
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Support WhatsApp Modal (Micro-interaction) */}
      {showWhatsappModal && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[100] flex items-center justify-center p-4">
          <motion.div 
            initial={{ scale: 0.95, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="bg-white rounded-2xl shadow-2xl max-w-md w-full overflow-hidden"
          >
            {/* Header */}
            <div className="bg-[#041627] text-white p-6 relative">
              <button 
                onClick={() => setShowWhatsappModal(false)}
                className="absolute top-4 right-4 text-slate-400 hover:text-white transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
              <h3 className="font-sans font-bold text-lg">Falar com Consultor Lumma</h3>
              <p className="text-xs text-slate-400 mt-1">Conectando você diretamente ao nosso WhatsApp empresarial</p>
            </div>

            {/* Chat Body */}
            <div className="p-6 space-y-4 bg-slate-50">
              <div className="flex gap-3">
                <div className="w-8 h-8 rounded-full bg-[#115cb9] flex items-center justify-center text-white text-xs font-bold shrink-0">
                  L
                </div>
                <div className="bg-[#e6eff8] text-[#041627] p-3 rounded-r-xl rounded-bl-xl text-xs max-w-[80%] leading-relaxed shadow-sm">
                  Olá! Sou o consultor especialista da Lumma Cotação Auto. Como posso ajudar com a cobertura do seu veículo hoje? Digite sua mensagem abaixo para abrirmos o WhatsApp.
                </div>
              </div>

              {chatSubmitted ? (
                <div className="flex justify-center py-4">
                  <div className="flex flex-col items-center gap-2">
                    <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-[#115cb9]" />
                    <p className="text-xs text-[#74777d]">Redirecionando para o WhatsApp...</p>
                  </div>
                </div>
              ) : (
                <form onSubmit={handleSupportSubmit} className="space-y-3">
                  <div>
                    <label className="block text-xs font-bold text-[#44474c] mb-1">Sua Mensagem</label>
                    <textarea
                      required
                      value={typedMessage}
                      onChange={(e) => setTypedMessage(e.target.value)}
                      placeholder="Ex: Gostaria de saber mais sobre a cobertura para motoristas de aplicativo..."
                      rows={3}
                      className="w-full p-3 border border-slate-200 rounded-lg text-xs bg-white focus:border-[#115cb9] focus:ring-1 focus:ring-[#115cb9] outline-none transition-all resize-none"
                    />
                  </div>
                  <button
                    type="submit"
                    className="w-full bg-emerald-600 hover:bg-emerald-700 text-white p-3 rounded-lg text-xs font-semibold flex items-center justify-center gap-1.5 transition-colors shadow-md"
                  >
                    <MessageSquare className="w-4 h-4" />
                    Abrir Chat no WhatsApp
                  </button>
                </form>
              )}
            </div>
          </motion.div>
        </div>
      )}

    </div>
  );
}
