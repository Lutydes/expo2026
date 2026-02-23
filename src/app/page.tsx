'use client';

import React, { useState, useEffect, useRef } from 'react';

// Componente de Contador Animado
function AnimatedCounter({ value, suffix = '', duration = 2000 }: { value: number, suffix?: string, duration?: number }) {
  const [count, setCount] = useState(0);
  const [isVisible, setIsVisible] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.1 }
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!isVisible) return;

    let startTime: number;
    let animationFrame: number;

    const animate = (timestamp: number) => {
      if (!startTime) startTime = timestamp;
      const progress = Math.min((timestamp - startTime) / duration, 1);

      // Easing function: easeOutQuart
      const easeOutQuart = (t: number) => 1 - Math.pow(1 - t, 4);
      const easedProgress = easeOutQuart(progress);

      setCount(Math.floor(easedProgress * value));

      if (progress < 1) {
        animationFrame = requestAnimationFrame(animate);
      }
    };

    animationFrame = requestAnimationFrame(animate);

    return () => cancelAnimationFrame(animationFrame);
  }, [isVisible, value, duration]);

  return (
    <div ref={ref}>
      {count}{suffix}
    </div>
  );
}

// Componente de Animação ao Scroll (Fade In)
function FadeInSection({ children, delay = 0, className = '' }: { children: React.ReactNode, delay?: number, className?: string }) {
  const [isVisible, setIsVisible] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.1 }
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      className={`${className} transition-all duration-1000 ease-out ${
        isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
      }`}
      style={{ transitionDelay: `${delay}ms` }}
    >
      {children}
    </div>
  );
}

// Componente de Contagem Regressiva
function CountdownTimer({ targetDate, isDark }: { targetDate: Date, isDark: boolean }) {
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });

  useEffect(() => {
    const calculateTimeLeft = () => {
      const difference = targetDate.getTime() - new Date().getTime();

      if (difference > 0) {
        setTimeLeft({
          days: Math.floor(difference / (1000 * 60 * 60 * 24)),
          hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
          minutes: Math.floor((difference / 1000 / 60) % 60),
          seconds: Math.floor((difference / 1000) % 60),
        });
      }
    };

    calculateTimeLeft();
    const interval = setInterval(calculateTimeLeft, 1000);

    return () => clearInterval(interval);
  }, [targetDate]);

  const timeBox = (value: number, label: string, color: string) => (
    <div className="flex flex-col items-center">
      <div className={`text-3xl md:text-4xl font-black ${color} drop-shadow-[0_0_15px_rgba(0,243,255,0.5)]`}>
        {String(value).padStart(2, '0')}
      </div>
      <div className={`text-xs md:text-sm uppercase tracking-wider ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
        {label}
      </div>
    </div>
  );

  return (
    <div className={`max-w-7xl mx-auto ${isDark ? 'bg-[#0a0f1d]/95' : 'bg-white/95'} backdrop-blur-lg rounded-2xl border ${isDark ? 'border-[#00f3ff]/30' : 'border-gray-200'} py-6 px-4 mb-8`}>
      <div className="flex items-center justify-center gap-4 md:gap-8">
        <div className={`${isDark ? 'text-white' : 'text-gray-900'} font-bold text-sm md:text-base mr-4`}>
          ⏰ ExpoTech 2026 em:
        </div>
        {timeBox(timeLeft.days, 'Dias', 'text-[#00f3ff]')}
        {timeBox(timeLeft.hours, 'Horas', 'text-[#a855f7]')}
        {timeBox(timeLeft.minutes, 'Min', 'text-[#ec4899]')}
        {timeBox(timeLeft.seconds, 'Seg', 'text-[#00f3ff]')}
      </div>
    </div>
  );
}

export default function ExpoTech2026() {
  const [currentSemester, setCurrentSemester] = useState<string | null>(null);
  const [openAccordion, setOpenAccordion] = useState<string | null>(null);
  const [isDark, setIsDark] = useState(true);

  // Data do evento: 13 de Junho de 2026 às 08:00
  const eventDate = new Date('2026-06-13T08:00:00');

  const toggleAccordion = (id: string) => {
    setOpenAccordion(openAccordion === id ? null : id);
  };

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const toggleTheme = () => {
    setIsDark(!isDark);
  };

  // Cores dinâmicas baseadas no tema
  const bgPrimary = isDark ? 'bg-[#0a0f1d]' : 'bg-gray-50';
  const textPrimary = isDark ? 'text-white' : 'text-gray-900';
  const textSecondary = isDark ? 'text-gray-300' : 'text-gray-600';
  const cardBg = isDark ? 'from-[#1a1f2e] to-[#0d1117]' : 'from-white to-gray-100';
  const borderColor = isDark ? 'border-[#00f3ff]/20' : 'border-gray-200';

  return (
    <div className={`min-h-screen ${bgPrimary} ${textPrimary} font-sans transition-colors duration-500`}>
      {/* Navigation */}
      <nav className={`fixed top-0 left-0 right-0 z-50 ${isDark ? 'bg-[#0a0f1d]/90' : 'bg-white/90'} backdrop-blur-md border-b ${borderColor}`} role="navigation" aria-label="Navegação principal">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-gradient-to-r from-[#00f3ff] to-[#a855f7] rounded-lg flex items-center justify-center">
                <svg className="w-5 h-5 text-black" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 3v2m6-2v2M9 19v2m6-2v2M5 9H3m2 6H3m18-6h-2m2 6h-2M7 19h10a2 2 0 002-2V7a2 2 0 00-2-2H7a2 2 0 00-2 2v10a2 2 0 002 2zM9 9h6v6H9V9z" />
                </svg>
              </div>
              <span className="text-xl font-bold bg-gradient-to-r from-[#00f3ff] to-[#a855f7] bg-clip-text text-transparent">
                ExpoTech 2026
              </span>
            </div>
            <div className="hidden md:flex items-center space-x-8">
              <button onClick={() => scrollToSection('sobre')} className={`${textSecondary} hover:text-[#00f3ff] transition-colors relative group`} aria-label="Ir para seção Sobre">
                Sobre
                <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-[#00f3ff] transition-all duration-300 group-hover:w-full"></span>
              </button>
              <button onClick={() => scrollToSection('trilhas')} className={`${textSecondary} hover:text-[#00f3ff] transition-colors relative group`} aria-label="Ir para seção Trilhas">
                Trilhas
                <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-[#00f3ff] transition-all duration-300 group-hover:w-full"></span>
              </button>
              <button onClick={() => scrollToSection('regras')} className={`${textSecondary} hover:text-[#00f3ff] transition-colors relative group`} aria-label="Ir para seção Regras">
                Regras
                <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-[#00f3ff] transition-all duration-300 group-hover:w-full"></span>
              </button>
              <button onClick={() => scrollToSection('prazos')} className={`${textSecondary} hover:text-[#00f3ff] transition-colors relative group`} aria-label="Ir para seção Prazos">
                Prazos
                <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-[#00f3ff] transition-all duration-300 group-hover:w-full"></span>
              </button>
              <button onClick={() => scrollToSection('faq')} className={`${textSecondary} hover:text-[#00f3ff] transition-colors relative group`} aria-label="Ir para seção FAQ">
                FAQ
                <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-[#00f3ff] transition-all duration-300 group-hover:w-full"></span>
              </button>
              <button
                onClick={toggleTheme}
                className="p-2 rounded-lg bg-[#00f3ff]/10 hover:bg-[#00f3ff]/20 transition-all duration-300 hover:scale-110"
                aria-label="Alternar tema"
              >
                {isDark ? (
                  <svg className="w-5 h-5 text-[#00f3ff]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
                  </svg>
                ) : (
                  <svg className="w-5 h-5 text-[#00f3ff]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
                  </svg>
                )}
              </button>
              <a
                href="https://forms.gle/mh3GX4FpsHroyDHE8"
                target="_blank"
                rel="noopener noreferrer"
                className="bg-gradient-to-r from-[#00f3ff] to-[#00d4e8] text-black font-bold px-6 py-2 rounded-lg hover:shadow-[0_0_30px_rgba(0,243,255,0.6)] hover:scale-105 active:scale-95 transition-all duration-300"
              >
                Inscrever-se
              </a>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden pt-16" aria-label="Seção principal - ExpoTech 2026">
        {/* Background Effects */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(0,243,255,0.1),transparent_50%)]"></div>
        <div className="absolute top-20 left-10 w-72 h-72 bg-[#00f3ff]/20 rounded-full blur-[100px]"></div>
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-[#a855f7]/20 rounded-full blur-[120px]"></div>

        <div className="relative z-10 text-center px-4 max-w-5xl mx-auto">
          <h1 className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-black mb-4 leading-tight">
            <span className={`block ${textPrimary}`}>EXPO</span>
            <span className="block bg-gradient-to-r from-[#00f3ff] via-[#a855f7] to-[#ec4899] bg-clip-text text-transparent drop-shadow-[0_0_30px_rgba(0,243,255,0.5)]">
              TECH 2026
            </span>
          </h1>
          <div className="mb-6 inline-block">
            <span className="px-4 py-2 bg-[#00f3ff]/10 border border-[#00f3ff]/30 rounded-full text-[#00f3ff] text-sm font-medium">
              13 de Junho de 2026 • UniFECAF
            </span>
          </div>
          <p className={`text-xl md:text-2xl ${textSecondary} mb-8 max-w-3xl mx-auto`}>
            O maior evento de tecnologia e inovação da UniFECAF.
            <span className="block mt-2 text-[#00f3ff]">Smart Building & Tecnologias Disruptivas</span>
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <a
              href="https://forms.gle/mh3GX4FpsHroyDHE8"
              target="_blank"
              rel="noopener noreferrer"
              className="w-full sm:w-auto bg-gradient-to-r from-[#00f3ff] to-[#00d4e8] text-black font-bold px-8 py-4 rounded-lg text-lg hover:shadow-[0_0_30px_rgba(0,243,255,0.6)] hover:scale-105 transition-all duration-300"
              aria-label="Inscrever seu projeto no ExpoTech 2026 - abre em nova aba"
            >
              🚀 Inscrever Seu Projeto
            </a>
            <button
              onClick={() => scrollToSection('trilhas')}
              className="w-full sm:w-auto border-2 border-[#a855f7] text-[#a855f7] font-bold px-8 py-4 rounded-lg text-lg hover:bg-[#a855f7]/10 hover:shadow-[0_0_30px_rgba(168,85,247,0.5)] transition-all duration-300"
              aria-label="Ir para seção de trilhas de projetos"
            >
              Ver Trilhas
            </button>
          </div>
          <div className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
            <div className="p-4">
              <div className="text-3xl font-bold text-[#00f3ff] drop-shadow-[0_0_10px_rgba(0,243,255,0.8)]">
                <AnimatedCounter value={70} suffix="+" duration={2000} />
              </div>
              <div className={`${textSecondary} text-sm`}>Projetos</div>
            </div>
            <div className="p-4">
              <div className="text-3xl font-bold text-[#a855f7] drop-shadow-[0_0_10px_rgba(168,85,247,0.8)]">
                <AnimatedCounter value={4} suffix="h" duration={2500} />
              </div>
              <div className={`${textSecondary} text-sm`}>de Inovação</div>
            </div>
            <div className="p-4">
              <div className="text-3xl font-bold text-[#ec4899] drop-shadow-[0_0_10px_rgba(236,72,153,0.8)]">
                <AnimatedCounter value={7} duration={1800} />
              </div>
              <div className={`${textSecondary} text-sm`}>Cursos</div>
            </div>
            <div className="p-4">
              <div className="text-3xl font-bold text-[#00f3ff] drop-shadow-[0_0_10px_rgba(0,243,255,0.8)]">∞</div>
              <div className={`${textSecondary} text-sm`}>Oportunidades</div>
            </div>
          </div>
        </div>
      </section>

      {/* Sobre o Evento */}
      <section id="sobre" className="py-20 px-4 relative">
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[#00f3ff]/5 to-transparent"></div>
        <div className="max-w-7xl mx-auto relative z-10">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-4">
              <span className="bg-gradient-to-r from-[#00f3ff] to-[#a855f7] bg-clip-text text-transparent drop-shadow-[0_0_20px_rgba(0,243,255,0.4)]">
                Sobre o Evento
              </span>
            </h2>
            <p className="text-gray-400 text-lg max-w-2xl mx-auto">
              Fechamento dos Projetos Integradores onde alunos apresentam protótipos e soluções para problemas reais
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            <FadeInSection delay={0}>
              <div className="group bg-gradient-to-br from-[#1a1f2e] to-[#0d1117] p-8 rounded-2xl border border-[#00f3ff]/20 hover:border-[#00f3ff]/50 transition-all duration-300 hover:shadow-[0_0_30px_rgba(0,243,255,0.3)] hover:-translate-y-2">
                <div className="w-14 h-14 bg-[#00f3ff]/20 rounded-xl flex items-center justify-center mb-6 group-hover:bg-[#00f3ff]/30 transition-colors">
                  <svg className="w-7 h-7 text-[#00f3ff]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" />
                  </svg>
                </div>
                <h3 className="text-2xl font-bold mb-3 text-[#00f3ff]">Protótipos Reais</h3>
                <p className="text-gray-400">
                  Alunos desenvolvem soluções concretas para problemas do mundo real, aplicando conhecimento técnico e criatividade.
                </p>
              </div>
            </FadeInSection>

            <FadeInSection delay={100}>
              <div className="group bg-gradient-to-br from-[#1a1f2e] to-[#0d1117] p-8 rounded-2xl border border-[#a855f7]/20 hover:border-[#a855f7]/50 transition-all duration-300 hover:shadow-[0_0_30px_rgba(168,85,247,0.3)] hover:-translate-y-2">
                <div className="w-14 h-14 bg-[#a855f7]/20 rounded-xl flex items-center justify-center mb-6 group-hover:bg-[#a855f7]/30 transition-colors">
                  <svg className="w-7 h-7 text-[#a855f7]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <h3 className="text-2xl font-bold mb-3 text-[#a855f7]">Banca de Avaliação</h3>
                <p className="text-gray-400">
                  Profissionais experientes de TI avaliam os projetos, oferecendo feedback valioso e reconhecendo o trabalho das equipes.
                </p>
              </div>
            </FadeInSection>

            <FadeInSection delay={200}>
              <div className="group bg-gradient-to-br from-[#1a1f2e] to-[#0d1117] p-8 rounded-2xl border border-[#ec4899]/20 hover:border-[#ec4899]/50 transition-all duration-300 hover:shadow-[0_0_30px_rgba(236,72,153,0.3)] hover:-translate-y-2">
                <div className="w-14 h-14 bg-[#ec4899]/20 rounded-xl flex items-center justify-center mb-6 group-hover:bg-[#ec4899]/30 transition-colors">
                  <svg className="w-7 h-7 text-[#ec4899]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                  </svg>
                </div>
                <h3 className="text-2xl font-bold mb-3 text-[#ec4899]">Networking</h3>
                <p className="text-gray-400">
                  Espaço de conexão entre estudantes, professores e empresas parceiras, abrindo portas para o mercado de trabalho.
                </p>
              </div>
            </FadeInSection>

            <FadeInSection delay={300}>
              <div className="group bg-gradient-to-br from-[#1a1f2e] to-[#0d1117] p-8 rounded-2xl border border-[#00f3ff]/20 hover:border-[#00f3ff]/50 transition-all duration-300 hover:shadow-[0_0_30px_rgba(0,243,255,0.3)] hover:-translate-y-2">
                <div className="w-14 h-14 bg-[#00f3ff]/20 rounded-xl flex items-center justify-center mb-6 group-hover:bg-[#00f3ff]/30 transition-colors">
                  <svg className="w-7 h-7 text-[#00f3ff]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                  </svg>
                </div>
                <h3 className="text-2xl font-bold mb-3 text-[#00f3ff]">Smart Building</h3>
                <p className="text-gray-400">
                  Foco especial em tecnologias para edifícios inteligentes, unindo IoT, automação e sustentabilidade.
                </p>
              </div>
            </FadeInSection>

            <FadeInSection delay={400}>
              <div className="group bg-gradient-to-br from-[#1a1f2e] to-[#0d1117] p-8 rounded-2xl border border-[#a855f7]/20 hover:border-[#a855f7]/50 transition-all duration-300 hover:shadow-[0_0_30px_rgba(168,85,247,0.3)] hover:-translate-y-2">
                <div className="w-14 h-14 bg-[#a855f7]/20 rounded-xl flex items-center justify-center mb-6 group-hover:bg-[#a855f7]/30 transition-colors">
                  <svg className="w-7 h-7 text-[#a855f7]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                  </svg>
                </div>
                <h3 className="text-2xl font-bold mb-3 text-[#a855f7]">Tecnologias Disruptivas</h3>
                <p className="text-gray-400">
                  Projetos que exploram o futuro: IA, blockchain, realidade aumentada, machine learning e muito mais.
                </p>
              </div>
            </FadeInSection>

            <FadeInSection delay={500}>
              <div className="group bg-gradient-to-br from-[#1a1f2e] to-[#0d1117] p-8 rounded-2xl border border-[#ec4899]/20 hover:border-[#ec4899]/50 transition-all duration-300 hover:shadow-[0_0_30px_rgba(236,72,153,0.3)] hover:-translate-y-2">
                <div className="w-14 h-14 bg-[#ec4899]/20 rounded-xl flex items-center justify-center mb-6 group-hover:bg-[#ec4899]/30 transition-colors">
                  <svg className="w-7 h-7 text-[#ec4899]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <h3 className="text-2xl font-bold mb-3 text-[#ec4899]">Prêmios Exclusivos</h3>
                <p className="text-gray-400">
                  Os melhores projetos de cada categoria são premiados, reconhecendo a excelência e inovação das equipes.
                </p>
              </div>
            </FadeInSection>
          </div>
        </div>
      </section>

      {/* Trilhas de Projetos */}
      <section id="trilhas" className="py-20 px-4 relative">
        <div className="absolute inset-0 bg-gradient-to-b from-[#00f3ff]/5 via-transparent to-[#a855f7]/5"></div>
        <div className="max-w-7xl mx-auto relative z-10">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-4">
              <span className="bg-gradient-to-r from-[#00f3ff] via-[#a855f7] to-[#ec4899] bg-clip-text text-transparent drop-shadow-[0_0_20px_rgba(0,243,255,0.4)]">
                Trilhas de Projetos
              </span>
            </h2>
            <p className="text-gray-400 text-lg max-w-2xl mx-auto">
              Explore os desafios por semestre e baixe os roteiros detalhados
            </p>
          </div>

          {/* 1º Semestre */}
          <FadeInSection delay={0}>
            <div className="mb-12">
            <div className="bg-gradient-to-br from-[#1a1f2e] to-[#0d1117] rounded-2xl border border-[#00f3ff]/30 overflow-hidden hover:shadow-[0_0_40px_rgba(0,243,255,0.3)] transition-all duration-300">
              <div className="p-8">
                <div className="flex items-center gap-4 mb-6">
                  <div className="w-16 h-16 bg-gradient-to-br from-[#00f3ff] to-[#00d4e8] rounded-xl flex items-center justify-center text-black font-black text-2xl">
                    1º
                  </div>
                  <div>
                    <h3 className="text-2xl font-bold text-[#00f3ff]">Primeiro Semestre</h3>
                    <p className="text-gray-400">Todos os cursos</p>
                  </div>
                </div>
                <div className="space-y-4 mb-8">
                  <div className="flex items-start gap-3">
                    <span className="text-[#00f3ff] mt-1">●</span>
                    <p className="text-gray-300">
                      <strong className="text-white">Sistemas Funcionais:</strong> Desenvolvimento completo em Python com banco de dados MySQL
                    </p>
                  </div>
                  <div className="flex items-start gap-3">
                    <span className="text-[#00f3ff] mt-1">●</span>
                    <p className="text-gray-300">
                      <strong className="text-white">Lógica Computacional:</strong> Estruturas de controle, algoritmos e manipulação de dados
                    </p>
                  </div>
                  <div className="flex items-start gap-3">
                    <span className="text-[#00f3ff] mt-1">●</span>
                    <p className="text-gray-300">
                      <strong className="text-white">Modelagem de Banco de Dados:</strong> MER, DER e operações CRUD
                    </p>
                  </div>
                  <div className="flex items-start gap-3">
                    <span className="text-[#00f3ff] mt-1">●</span>
                    <p className="text-gray-300">
                      <strong className="text-white">Metodologias Ágeis:</strong> SCRUM com backlog, sprints e ferramentas de gestão
                    </p>
                  </div>
                </div>
                <a
                  href="https://drive.google.com/file/d/1u4QoVOa_UBOmMMiapoczUYmRqXS1ve-l/view?usp=sharing"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 bg-gradient-to-r from-[#00f3ff] to-[#00d4e8] text-black font-bold px-8 py-3 rounded-lg hover:shadow-[0_0_25px_rgba(0,243,255,0.6)] transition-all duration-300"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                  </svg>
                  Baixar Roteiro Geral
                </a>
              </div>
            </div>
          </div>
          </FadeInSection>

          {/* 2º Semestre */}
          <FadeInSection delay={100}>
          <div className="mb-12">
            <div className="bg-gradient-to-br from-[#1a1f2e] to-[#0d1117] rounded-2xl border border-[#a855f7]/30 overflow-hidden hover:shadow-[0_0_40px_rgba(168,85,247,0.3)] transition-all duration-300">
              <div className="p-8">
                <div className="flex items-center gap-4 mb-6">
                  <div className="w-16 h-16 bg-gradient-to-br from-[#a855f7] to-[#9333ea] rounded-xl flex items-center justify-center text-white font-black text-2xl">
                    2º
                  </div>
                  <div>
                    <h3 className="text-2xl font-bold text-[#a855f7]">Segundo Semestre</h3>
                    <p className="text-gray-400">Todos os cursos</p>
                  </div>
                </div>
                <div className="grid md:grid-cols-2 gap-6 mb-8">
                  <div className="space-y-4">
                    <div className="flex items-start gap-3">
                      <span className="text-[#a855f7] mt-1">●</span>
                      <p className="text-gray-300">
                        <strong className="text-white">Arquitetura de Computadores:</strong> Configuração de hardware, BIOS, dual boot
                      </p>
                    </div>
                    <div className="flex items-start gap-3">
                      <span className="text-[#a855f7] mt-1">●</span>
                      <p className="text-gray-300">
                        <strong className="text-white">Virtualização:</strong> Hyper-V, VirtualBox, VMware e Windows Server
                      </p>
                    </div>
                    <div className="flex items-start gap-3">
                      <span className="text-[#a855f7] mt-1">●</span>
                      <p className="text-gray-300">
                        <strong className="text-white">Redes:</strong> Cabeamento, RDP, SSH, firewall e conectividade
                      </p>
                    </div>
                  </div>
                  <div className="space-y-4">
                    <div className="flex items-start gap-3">
                      <span className="text-[#a855f7] mt-1">●</span>
                      <p className="text-gray-300">
                        <strong className="text-white">Cyber Security:</strong> DNS, VPN, Nmap, OpenVAS, Kali Linux
                      </p>
                    </div>
                    <div className="flex items-start gap-3">
                      <span className="text-[#a855f7] mt-1">●</span>
                      <p className="text-gray-300">
                        <strong className="text-white">OOP & Algoritmos:</strong> Python/Java orientado a objetos
                      </p>
                    </div>
                    <div className="flex items-start gap-3">
                      <span className="text-[#a855f7] mt-1">●</span>
                      <p className="text-gray-300">
                        <strong className="text-white">Cloud Computing:</strong> Git, GitHub, AWS, Azure, GCP
                      </p>
                    </div>
                  </div>
                </div>
                <a
                  href="https://drive.google.com/file/d/1B7XXgFunzKEidTsSbxc10suPv-2tw-EY/view?usp=sharing"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 bg-gradient-to-r from-[#a855f7] to-[#9333ea] text-white font-bold px-8 py-3 rounded-lg hover:shadow-[0_0_25px_rgba(168,85,247,0.6)] transition-all duration-300"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                  </svg>
                  Baixar Roteiro Geral
                </a>
              </div>
            </div>
          </div>
          </FadeInSection>

          <FadeInSection delay={200}>
          {/* 3º Semestre */}
          <div className="mb-12">
            <div className="bg-gradient-to-br from-[#1a1f2e] to-[#0d1117] rounded-2xl border border-[#ec4899]/30 overflow-hidden hover:shadow-[0_0_40px_rgba(236,72,153,0.3)] transition-all duration-300">
              <div className="p-8">
                <div className="flex items-center gap-4 mb-6">
                  <div className="w-16 h-16 bg-gradient-to-br from-[#ec4899] to-[#db2777] rounded-xl flex items-center justify-center text-white font-black text-2xl">
                    3º
                  </div>
                  <div>
                    <h3 className="text-2xl font-bold text-[#ec4899]">Terceiro Semestre</h3>
                    <p className="text-gray-400">Trilhas especializadas por curso</p>
                  </div>
                </div>
                <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                  {/* ADS */}
                  <div className="bg-[#0a0f1d]/50 p-6 rounded-xl border border-[#00f3ff]/20 hover:border-[#00f3ff]/50 transition-colors">
                    <h4 className="text-xl font-bold text-[#00f3ff] mb-3">ADS</h4>
                    <p className="text-gray-400 text-sm mb-4">
                      Aplicações modernas em Rust/Python/Java com UX/UI. Design ágil, OOP e estruturas de dados.
                    </p>
                    <a
                      href="https://drive.google.com/file/d/1yuTE5OIbk9RJcMa51w9SukwIHw1nvUOk/view?usp=sharing"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-[#00f3ff] hover:text-[#00d4e8] font-semibold flex items-center gap-2 text-sm group"
                    >
                      Roteiro ADS
                      <svg className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                      </svg>
                    </a>
                  </div>

                  {/* CDC */}
                  <div className="bg-[#0a0f1d]/50 p-6 rounded-xl border border-[#a855f7]/20 hover:border-[#a855f7]/50 transition-colors">
                    <h4 className="text-xl font-bold text-[#a855f7] mb-3">CDC</h4>
                    <p className="text-gray-400 text-sm mb-4">
                      Modelagem matemática, otimização (Operations Research) e Python. Geometria Analítica, Álgebra Linear e Cálculo.
                    </p>
                    <a
                      href="https://drive.google.com/file/d/1Jd1kYsY2xRRhM_uXqW7HZRdETuBiVzQy/view?usp=sharing"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-[#a855f7] hover:text-[#9333ea] font-semibold flex items-center gap-2 text-sm"
                    >
                      Roteiro CDC
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                      </svg>
                    </a>
                  </div>

                  {/* ECO */}
                  <div className="bg-[#0a0f1d]/50 p-6 rounded-xl border border-[#ec4899]/20 hover:border-[#ec4899]/50 transition-colors">
                    <h4 className="text-xl font-bold text-[#ec4899] mb-3">ECO</h4>
                    <p className="text-gray-400 text-sm mb-4">
                      Aplicação OOP explorando estruturas de dados complexas e modelagem algébrica. Engenharia de software.
                    </p>
                    <a
                      href="https://drive.google.com/file/d/1nVJ4NrqYYtycMvV6NCqD8B7H8TRi9ttw/view?usp=sharing"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-[#ec4899] hover:text-[#db2777] font-semibold flex items-center gap-2 text-sm"
                    >
                      Roteiro ECO
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                      </svg>
                    </a>
                  </div>

                  {/* GTI */}
                  <div className="bg-[#0a0f1d]/50 p-6 rounded-xl border border-[#00f3ff]/20 hover:border-[#00f3ff]/50 transition-colors">
                    <h4 className="text-xl font-bold text-[#00f3ff] mb-3">GTI</h4>
                    <p className="text-gray-400 text-sm mb-4">
                      IA unindo Machine Learning, NLP e Prompt Engineering. Sistemas inteligentes com Deep Learning.
                    </p>
                    <a
                      href="https://drive.google.com/file/d/1L7rlD_v5kBZTQIeEdoJb0VPxy6xZAzPl/view?usp=sharing"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-[#00f3ff] hover:text-[#00d4e8] font-semibold flex items-center gap-2 text-sm"
                    >
                      Roteiro GTI
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                      </svg>
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
          </FadeInSection>

          <FadeInSection delay={300}>
          {/* 4º Semestre */}
          <div className="mb-12">
            <div className="bg-gradient-to-br from-[#1a1f2e] to-[#0d1117] rounded-2xl border border-[#00f3ff]/30 overflow-hidden hover:shadow-[0_0_40px_rgba(0,243,255,0.3)] transition-all duration-300">
              <div className="p-8">
                <div className="flex items-center gap-4 mb-6">
                  <div className="w-16 h-16 bg-gradient-to-br from-[#00f3ff] to-[#a855f7] rounded-xl flex items-center justify-center text-black font-black text-2xl">
                    4º
                  </div>
                  <div>
                    <h3 className="text-2xl font-bold text-white">Quarto Semestre</h3>
                    <p className="text-gray-400">Trilhas especializadas por curso</p>
                  </div>
                </div>
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
                  {/* ADS */}
                  <div className="bg-[#0a0f1d]/50 p-6 rounded-xl border border-[#00f3ff]/20 hover:border-[#00f3ff]/50 transition-colors">
                    <h4 className="text-xl font-bold text-[#00f3ff] mb-3">ADS</h4>
                    <p className="text-gray-400 text-sm mb-4">
                      Web Apps completos com Front/Back-end em Node.js/TypeScript e integração de IA/Chatbots.
                    </p>
                    <a
                      href="https://drive.google.com/file/d/1xiJJWq_n8IE2Hc3IDiNiLRG07ckLsErc/view?usp=sharing"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-[#00f3ff] hover:text-[#00d4e8] font-semibold flex items-center gap-2 text-sm"
                    >
                      Roteiro ADS
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                      </svg>
                    </a>
                  </div>

                  {/* CDC */}
                  <div className="bg-[#0a0f1d]/50 p-6 rounded-xl border border-[#a855f7]/20 hover:border-[#a855f7]/50 transition-colors">
                    <h4 className="text-xl font-bold text-[#a855f7] mb-3">CDC</h4>
                    <p className="text-gray-400 text-sm mb-4">
                      Sistema funcional moderno com design de software ágil em Rust/Python/Java.
                    </p>
                    <a
                      href="https://drive.google.com/file/d/1qaDnHK4gqE_bPnp6l_P1SIL4d_pqi3Wx/view?usp=sharing"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-[#a855f7] hover:text-[#9333ea] font-semibold flex items-center gap-2 text-sm"
                    >
                      Roteiro CDC
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                      </svg>
                    </a>
                  </div>

                  {/* GTI */}
                  <div className="bg-[#0a0f1d]/50 p-6 rounded-xl border border-[#00f3ff]/20 hover:border-[#00f3ff]/50 transition-colors">
                    <h4 className="text-xl font-bold text-[#00f3ff] mb-3">GTI</h4>
                    <p className="text-gray-400 text-sm mb-4">
                      Sistema inteligente de IA aplicando Deep Learning e Processamento de Linguagem Natural.
                    </p>
                    <a
                      href="https://drive.google.com/file/d/16Wo_rL2tS-ffpGBFvqrCL3amVFSjt6KY/view?usp=sharing"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-[#00f3ff] hover:text-[#00d4e8] font-semibold flex items-center gap-2 text-sm"
                    >
                      Roteiro GTI
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                      </svg>
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
          </FadeInSection>

          <FadeInSection delay={400}>
          {/* 5º Semestre */}
          <div className="mb-12">
            <div className="bg-gradient-to-br from-[#1a1f2e] to-[#0d1117] rounded-2xl border border-[#a855f7]/30 overflow-hidden hover:shadow-[0_0_40px_rgba(168,85,247,0.3)] transition-all duration-300">
              <div className="p-8">
                <div className="flex items-center gap-4 mb-6">
                  <div className="w-16 h-16 bg-gradient-to-br from-[#a855f7] to-[#ec4899] rounded-xl flex items-center justify-center text-white font-black text-2xl">
                    5º
                  </div>
                  <div>
                    <h3 className="text-2xl font-bold text-white">Quinto Semestre</h3>
                    <p className="text-gray-400">Trilhas especializadas por curso</p>
                  </div>
                </div>
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
                  {/* ADS */}
                  <div className="bg-[#0a0f1d]/50 p-6 rounded-xl border border-[#00f3ff]/20 hover:border-[#00f3ff]/50 transition-colors">
                    <h4 className="text-xl font-bold text-[#00f3ff] mb-3">ADS</h4>
                    <p className="text-gray-400 text-sm mb-4">
                      Mobile Development (React Native + IoT) ou Game Development (Unity/Godot + AR) com CI/CD.
                    </p>
                    <a
                      href="https://drive.google.com/file/d/1sMXFTdBjMkVJpLu8BdZCbQNopCp6oNHE/view?usp=sharing"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-[#00f3ff] hover:text-[#00d4e8] font-semibold flex items-center gap-2 text-sm"
                    >
                      Roteiro ADS
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                      </svg>
                    </a>
                  </div>

                  {/* CDC */}
                  <div className="bg-[#0a0f1d]/50 p-6 rounded-xl border border-[#a855f7]/20 hover:border-[#a855f7]/50 transition-colors">
                    <h4 className="text-xl font-bold text-[#a855f7] mb-3">CDC</h4>
                    <p className="text-gray-400 text-sm mb-4">
                      Mobile Development (React Native + IoT) ou Game Development (Unity/Godot + AR) com CI/CD.
                    </p>
                    <a
                      href="https://drive.google.com/file/d/1WOHzPGJgIulzNdjQQbsIicpaKPkgmwcu/view?usp=sharing"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-[#a855f7] hover:text-[#9333ea] font-semibold flex items-center gap-2 text-sm"
                    >
                      Roteiro CDC
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                      </svg>
                    </a>
                  </div>

                  {/* GTI */}
                  <div className="bg-[#0a0f1d]/50 p-6 rounded-xl border border-[#00f3ff]/20 hover:border-[#00f3ff]/50 transition-colors">
                    <h4 className="text-xl font-bold text-[#00f3ff] mb-3">GTI</h4>
                    <p className="text-gray-400 text-sm mb-4">
                      Frameworks de Governança de TI e Soluções de BI/Transformação Digital com Dashboards.
                    </p>
                    <a
                      href="https://drive.google.com/file/d/1hg83VpxwPl0hglM8y4F9hAmeQ2qjV4LP/view?usp=sharing"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-[#00f3ff] hover:text-[#00d4e8] font-semibold flex items-center gap-2 text-sm"
                    >
                      Roteiro GTI
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                      </svg>
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
          </FadeInSection>

          <FadeInSection delay={500}>
          {/* Projeto Integrador em Engenharias - 4º ao 8º e 6º ao 9º Semestres */}
          <div className="mb-12">
            <div className="bg-gradient-to-br from-[#1a1f2e] via-[#1a1f2e] to-[#0d1117] rounded-2xl border-2 border-[#a855f7]/30 overflow-hidden hover:shadow-[0_0_50px_rgba(168,85,247,0.4)] transition-all duration-300">
              <div className="bg-gradient-to-r from-[#00f3ff]/10 via-[#a855f7]/10 to-[#ec4899]/10 p-8">
                <div className="flex items-center gap-4 mb-6">
                  <div className="w-20 h-20 bg-gradient-to-br from-[#00f3ff] via-[#a855f7] to-[#ec4899] rounded-xl flex items-center justify-center text-black font-black text-2xl">
                    PI
                  </div>
                  <div>
                    <div className="inline-block px-3 py-1 bg-[#a855f7]/30 border border-[#a855f7]/50 rounded-full text-[#a855f7] text-xs font-bold mb-2">
                      INTEGRADOR
                    </div>
                    <h3 className="text-2xl md:text-3xl font-bold bg-gradient-to-r from-[#00f3ff] via-[#a855f7] to-[#ec4899] bg-clip-text text-transparent">
                      Projeto Integrador em Engenharias
                    </h3>
                    <p className="text-gray-400 text-lg">ECO (4º ao 8º) • Eng. Civil, Elétrica e Produção (6º ao 9º)</p>
                  </div>
                </div>
                <div className="grid md:grid-cols-2 gap-8 mb-8">
                  <div>
                    <h4 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
                      <span className="text-[#00f3ff]">▸</span> Sobre o Projeto
                    </h4>
                    <p className="text-gray-300 leading-relaxed mb-4">
                      O Projeto Integrador em Engenharias segue os elementos do roteiro, desafiando alunos do 4º ao 8º da Engenharia da Computação e do 6º ao 9º das Engenharias Civil, Elétrica e Produção a desenvolverem sistemas robustos que integram conceitos avançados e metodologias científicas.
                    </p>
                    <p className="text-gray-300 leading-relaxed">
                      Os projetos aplicam elementos do roteiro na prática, englobando engenharia de software, otimização matemática e validação de desempenho, demonstrando maturidade técnica.
                    </p>
                  </div>
                  <div>
                    <h4 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
                      <span className="text-[#a855f7]">▸</span> Áreas de Foco
                    </h4>
                    <div className="space-y-3">
                      <div className="flex items-start gap-3">
                        <span className="text-[#00f3ff] mt-1">●</span>
                        <p className="text-gray-300"><strong className="text-white">OOP & Estruturas de Dados:</strong> Classes, herança, polimorfismo e algoritmos eficientes</p>
                      </div>
                      <div className="flex items-start gap-3">
                        <span className="text-[#a855f7] mt-1">●</span>
                        <p className="text-gray-300"><strong className="text-white">Pesquisa Operacional:</strong> Otimização linear, alocação de recursos e simulações matemáticas</p>
                      </div>
                      <div className="flex items-start gap-3">
                        <span className="text-[#ec4899] mt-1">●</span>
                        <p className="text-gray-300"><strong className="text-white">Física Aplicada:</strong> Simulações, energia, eficiência e tempo de resposta</p>
                      </div>
                      <div className="flex items-start gap-3">
                        <span className="text-[#00f3ff] mt-1">●</span>
                        <p className="text-gray-300"><strong className="text-white">UX/UI & Design Thinking:</strong> Prototipagem, interfaces intuitivas e experiência do usuário</p>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="bg-[#0a0f1d]/50 rounded-xl p-6 border border-[#a855f7]/20 mb-8">
                  <h4 className="text-xl font-bold text-white mb-4">Requisitos do Projeto</h4>
                  <div className="grid md:grid-cols-2 gap-4">
                    <div className="flex items-start gap-3">
                      <span className="text-[#00f3ff] font-bold">01</span>
                      <p className="text-gray-300">Equipes de 10 a 12 alunos de todas as engenharias</p>
                    </div>
                    <div className="flex items-start gap-3">
                      <span className="text-[#a855f7] font-bold">02</span>
                      <p className="text-gray-300">Protótipo funcional ou prova de conceito implementada</p>
                    </div>
                    <div className="flex items-start gap-3">
                      <span className="text-[#ec4899] font-bold">03</span>
                      <p className="text-gray-300">Documentação técnica completa e relatório de pesquisa</p>
                    </div>
                    <div className="flex items-start gap-3">
                      <span className="text-[#00f3ff] font-bold">04</span>
                      <p className="text-gray-300">Aplicação de metodologias de pesquisa científica</p>
                    </div>
                    <div className="flex items-start gap-3">
                      <span className="text-[#a855f7] font-bold">05</span>
                      <p className="text-gray-300">Integração de pelo menos 3 áreas do conhecimento</p>
                    </div>
                    <div className="flex items-start gap-3">
                      <span className="text-[#ec4899] font-bold">06</span>
                      <p className="text-gray-300">Vídeo pitch e apresentação técnica detalhada</p>
                    </div>
                  </div>
                </div>

                <div className="flex flex-col sm:flex-row gap-4">
                  <a
                    href="https://drive.google.com/file/d/10UCWfeV8-NWUMZkXThJM-EFoueGNc170/view?usp=sharing"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center justify-center gap-2 bg-gradient-to-r from-[#00f3ff] via-[#a855f7] to-[#ec4899] text-black font-bold px-8 py-4 rounded-lg hover:shadow-[0_0_30px_rgba(168,85,247,0.6)] hover:scale-105 transition-all duration-300"
                  >
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                    </svg>
                    Baixar Roteiro Completo
                  </a>
                </div>
              </div>
            </div>
          </div>
          </FadeInSection>
        </div>
      </section>

      {/* Regras e Premiação */}
      <section id="regras" className="py-20 px-4 relative">
        <div className="absolute inset-0 bg-gradient-to-b from-[#a855f7]/5 via-transparent to-[#00f3ff]/5"></div>
        <div className="max-w-7xl mx-auto relative z-10">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-4">
              <span className="bg-gradient-to-r from-[#a855f7] to-[#00f3ff] bg-clip-text text-transparent drop-shadow-[0_0_20px_rgba(168,85,247,0.4)]">
                Regras e Premiação
              </span>
            </h2>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            {/* Regras do Evento */}
            <div className="bg-gradient-to-br from-[#1a1f2e] to-[#0d1117] p-8 rounded-2xl border border-[#a855f7]/30">
              <h3 className="text-2xl font-bold mb-6 text-[#a855f7] flex items-center gap-3">
                <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                </svg>
                Regras do Evento
              </h3>
              <div className="space-y-3">
                <div className="flex items-start gap-4 p-4 bg-[#0a0f1d]/50 rounded-xl border border-[#a855f7]/10 hover:border-[#a855f7]/30 transition-colors">
                  <span className="flex-shrink-0 w-8 h-8 bg-[#a855f7]/20 rounded-lg flex items-center justify-center text-[#a855f7] font-bold text-base">
                    1
                  </span>
                  <div className="flex-1">
                    <p className="text-gray-200 font-semibold text-base mb-1">Composição dos Grupos</p>
                    <p className="text-gray-400 text-sm">3 a 5 pessoas da mesma turma, com papéis definidos</p>
                  </div>
                </div>
                <div className="flex items-start gap-4 p-4 bg-[#0a0f1d]/50 rounded-xl border border-[#a855f7]/10 hover:border-[#a855f7]/30 transition-colors">
                  <span className="flex-shrink-0 w-8 h-8 bg-[#a855f7]/20 rounded-lg flex items-center justify-center text-[#a855f7] font-bold text-base">
                    2
                  </span>
                  <div className="flex-1">
                    <p className="text-gray-200 font-semibold text-base mb-1">Avaliação Prévia</p>
                    <p className="text-gray-400 text-sm">Apresentação em sala, apenas selecionados expõem no evento</p>
                  </div>
                </div>
                <div className="flex items-start gap-4 p-4 bg-[#0a0f1d]/50 rounded-xl border border-[#a855f7]/10 hover:border-[#a855f7]/30 transition-colors">
                  <span className="flex-shrink-0 w-8 h-8 bg-[#a855f7]/20 rounded-lg flex items-center justify-center text-[#a855f7] font-bold text-base">
                    3
                  </span>
                  <div className="flex-1">
                    <p className="text-gray-200 font-semibold text-base mb-1">Entregas Obrigatórias</p>
                    <p className="text-gray-400 text-sm">Vídeo pitch, GitHub com código e documentação completa</p>
                  </div>
                </div>
                <div className="flex items-start gap-4 p-4 bg-[#0a0f1d]/50 rounded-xl border border-[#a855f7]/10 hover:border-[#a855f7]/30 transition-colors">
                  <span className="flex-shrink-0 w-8 h-8 bg-[#a855f7]/20 rounded-lg flex items-center justify-center text-[#a855f7] font-bold text-base">
                    4
                  </span>
                  <div className="flex-1">
                    <p className="text-gray-200 font-semibold text-base mb-1">Apresentação no Evento</p>
                    <p className="text-gray-400 text-sm">Protótipo funcional + pitch de 5 minutos para banca avaliadora</p>
                  </div>
                </div>
                <div className="flex items-start gap-4 p-4 bg-[#0a0f1d]/50 rounded-xl border border-[#a855f7]/10 hover:border-[#a855f7]/30 transition-colors">
                  <span className="flex-shrink-0 w-8 h-8 bg-[#a855f7]/20 rounded-lg flex items-center justify-center text-[#a855f7] font-bold text-base">
                    5
                  </span>
                  <div className="flex-1">
                    <p className="text-gray-200 font-semibold text-base mb-1">Critérios de Avaliação</p>
                    <p className="text-gray-400 text-sm">Inovação, funcionalidade, design técnico, apresentação e documentação</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Premiação por Categoria */}
            <div className="bg-gradient-to-br from-[#1a1f2e] to-[#0d1117] p-8 rounded-2xl border border-[#00f3ff]/30">
              <h3 className="text-2xl font-bold mb-6 text-[#00f3ff] flex items-center gap-3">
                <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />
                </svg>
                Premiação por Categoria
              </h3>
              <div className="space-y-3">
                {/* 1º Semestre - Categoria Start */}
                <div className="bg-[#0a0f1d]/50 rounded-xl border border-[#00f3ff]/20 overflow-hidden">
                  <button
                    onClick={() => toggleAccordion('start')}
                    className="w-full p-4 flex items-center justify-between hover:bg-[#00f3ff]/5 transition-colors"
                  >
                    <div className="text-left">
                      <h4 className="font-bold text-[#00f3ff] text-base">1º Semestre - Categoria START</h4>
                      <p className="text-gray-400 text-xs mt-1">Clique para ver os prêmios</p>
                    </div>
                    <svg
                      className={`w-5 h-5 text-[#00f3ff] transition-transform duration-300 ${
                        openAccordion === 'start' ? 'rotate-180' : ''
                      }`}
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                  </button>
                  {openAccordion === 'start' && (
                    <div className="p-4 pt-0 border-t border-[#00f3ff]/10">
                      <div className="grid grid-cols-3 gap-3 text-center">
                        <div className="bg-[#FFD700]/20 rounded-lg p-4">
                          <div className="text-yellow-400 font-bold text-lg">1º</div>
                          <div className="text-white font-bold text-base">R$ 1.000</div>
                        </div>
                        <div className="bg-[#C0C0C0]/20 rounded-lg p-4">
                          <div className="text-gray-300 font-bold text-lg">2º</div>
                          <div className="text-white font-bold text-base">R$ 800</div>
                        </div>
                        <div className="bg-[#CD7F32]/20 rounded-lg p-4">
                          <div className="text-orange-400 font-bold text-lg">3º</div>
                          <div className="text-white font-bold text-base">R$ 500</div>
                        </div>
                      </div>
                    </div>
                  )}
                </div>

                {/* 2º Semestre - Categoria Foundation */}
                <div className="bg-[#0a0f1d]/50 rounded-xl border border-[#a855f7]/20 overflow-hidden">
                  <button
                    onClick={() => toggleAccordion('foundation')}
                    className="w-full p-4 flex items-center justify-between hover:bg-[#a855f7]/5 transition-colors"
                  >
                    <div className="text-left">
                      <h4 className="font-bold text-[#a855f7] text-base">2º Semestre - Categoria FOUNDATION</h4>
                      <p className="text-gray-400 text-xs mt-1">Clique para ver os prêmios</p>
                    </div>
                    <svg
                      className={`w-5 h-5 text-[#a855f7] transition-transform duration-300 ${
                        openAccordion === 'foundation' ? 'rotate-180' : ''
                      }`}
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                  </button>
                  {openAccordion === 'foundation' && (
                    <div className="p-4 pt-0 border-t border-[#a855f7]/10">
                      <div className="grid grid-cols-3 gap-3 text-center">
                        <div className="bg-[#FFD700]/20 rounded-lg p-4">
                          <div className="text-yellow-400 font-bold text-lg">1º</div>
                          <div className="text-white font-bold text-base">R$ 1.400</div>
                        </div>
                        <div className="bg-[#C0C0C0]/20 rounded-lg p-4">
                          <div className="text-gray-300 font-bold text-lg">2º</div>
                          <div className="text-white font-bold text-base">R$ 1.000</div>
                        </div>
                        <div className="bg-[#CD7F32]/20 rounded-lg p-4">
                          <div className="text-orange-400 font-bold text-lg">3º</div>
                          <div className="text-white font-bold text-base">R$ 600</div>
                        </div>
                      </div>
                    </div>
                  )}
                </div>

                {/* GTI 3º ao 5º - Build-Data & Gestão */}
                <div className="bg-[#0a0f1d]/50 rounded-xl border border-[#ec4899]/20 overflow-hidden">
                  <button
                    onClick={() => toggleAccordion('gti')}
                    className="w-full p-4 flex items-center justify-between hover:bg-[#ec4899]/5 transition-colors"
                  >
                    <div className="text-left">
                      <h4 className="font-bold text-[#ec4899] text-base">GTI (3º ao 5º) - Categoria BUILD-DATA & GESTÃO</h4>
                      <p className="text-gray-400 text-xs mt-1">Clique para ver os prêmios</p>
                    </div>
                    <svg
                      className={`w-5 h-5 text-[#ec4899] transition-transform duration-300 ${
                        openAccordion === 'gti' ? 'rotate-180' : ''
                      }`}
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                  </button>
                  {openAccordion === 'gti' && (
                    <div className="p-4 pt-0 border-t border-[#ec4899]/10">
                      <div className="grid grid-cols-3 gap-3 text-center">
                        <div className="bg-[#FFD700]/20 rounded-lg p-4">
                          <div className="text-yellow-400 font-bold text-lg">1º</div>
                          <div className="text-white font-bold text-base">R$ 2.000</div>
                        </div>
                        <div className="bg-[#C0C0C0]/20 rounded-lg p-4">
                          <div className="text-gray-300 font-bold text-lg">2º</div>
                          <div className="text-white font-bold text-base">R$ 1.300</div>
                        </div>
                        <div className="bg-[#CD7F32]/20 rounded-lg p-4">
                          <div className="text-orange-400 font-bold text-lg">3º</div>
                          <div className="text-white font-bold text-base">R$ 700</div>
                        </div>
                      </div>
                    </div>
                  )}
                </div>

                {/* CDC + ADS 3º ao 5º - Software & Computação */}
                <div className="bg-[#0a0f1d]/50 rounded-xl border border-[#00f3ff]/20 overflow-hidden">
                  <button
                    onClick={() => toggleAccordion('software')}
                    className="w-full p-4 flex items-center justify-between hover:bg-[#00f3ff]/5 transition-colors"
                  >
                    <div className="text-left">
                      <h4 className="font-bold text-[#00f3ff] text-base">CDC + ADS (3º ao 5º) - Categoria SOFTWARE & COMPUTAÇÃO</h4>
                      <p className="text-gray-400 text-xs mt-1">Clique para ver os prêmios</p>
                    </div>
                    <svg
                      className={`w-5 h-5 text-[#00f3ff] transition-transform duration-300 ${
                        openAccordion === 'software' ? 'rotate-180' : ''
                      }`}
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                  </button>
                  {openAccordion === 'software' && (
                    <div className="p-4 pt-0 border-t border-[#00f3ff]/10">
                      <div className="grid grid-cols-3 gap-3 text-center">
                        <div className="bg-[#FFD700]/20 rounded-lg p-4">
                          <div className="text-yellow-400 font-bold text-lg">1º</div>
                          <div className="text-white font-bold text-base">R$ 2.000</div>
                        </div>
                        <div className="bg-[#C0C0C0]/20 rounded-lg p-4">
                          <div className="text-gray-300 font-bold text-lg">2º</div>
                          <div className="text-white font-bold text-base">R$ 1.300</div>
                        </div>
                        <div className="bg-[#CD7F32]/20 rounded-lg p-4">
                          <div className="text-orange-400 font-bold text-lg">3º</div>
                          <div className="text-white font-bold text-base">R$ 700</div>
                        </div>
                      </div>
                    </div>
                  )}
                </div>

                {/* Projeto Integrador em Engenharias - PRO/SCALE */}
                <div className="bg-gradient-to-r from-[#00f3ff]/10 via-[#a855f7]/10 to-[#ec4899]/10 rounded-xl border-2 border-[#a855f7]/30 overflow-hidden">
                  <button
                    onClick={() => toggleAccordion('proscale')}
                    className="w-full p-4 flex items-center justify-between hover:bg-[#a855f7]/10 transition-colors"
                  >
                    <div className="text-left">
                      <h4 className="font-bold bg-gradient-to-r from-[#00f3ff] via-[#a855f7] to-[#ec4899] bg-clip-text text-transparent text-base">
                        Projeto Integrador em Engenharias - Categoria PRO/SCALE
                      </h4>
                      <p className="text-gray-400 text-xs mt-1">Clique para ver os prêmios</p>
                    </div>
                    <svg
                      className={`w-5 h-5 text-[#a855f7] transition-transform duration-300 ${
                        openAccordion === 'proscale' ? 'rotate-180' : ''
                      }`}
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                  </button>
                  {openAccordion === 'proscale' && (
                    <div className="p-4 pt-0 border-t border-[#a855f7]/20">
                      <div className="grid grid-cols-3 gap-3 text-center">
                        <div className="bg-gradient-to-br from-[#FFD700]/30 to-[#FFD700]/10 rounded-lg p-5 border border-[#FFD700]/40">
                          <div className="text-yellow-400 font-black text-xl">1º</div>
                          <div className="text-white font-black text-base">R$ 6.000</div>
                        </div>
                        <div className="bg-gradient-to-br from-[#C0C0C0]/30 to-[#C0C0C0]/10 rounded-lg p-5 border border-[#C0C0C0]/40">
                          <div className="text-gray-300 font-black text-xl">2º</div>
                          <div className="text-white font-black text-base">R$ 3.000</div>
                        </div>
                        <div className="bg-gradient-to-br from-[#CD7F32]/30 to-[#CD7F32]/10 rounded-lg p-5 border border-[#CD7F32]/40">
                          <div className="text-orange-400 font-black text-xl">3º</div>
                          <div className="text-white font-black text-base">R$ 1.000</div>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Prazos */}
      <section id="prazos" className="py-20 px-4 relative mb-20">
        <div className="absolute inset-0 bg-gradient-to-b from-[#ec4899]/5 via-transparent to-[#a855f7]/5"></div>
        <div className="max-w-4xl mx-auto relative z-10">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-4">
              <span className="bg-gradient-to-r from-[#ec4899] via-[#a855f7] to-[#00f3ff] bg-clip-text text-transparent drop-shadow-[0_0_20px_rgba(236,72,153,0.4)]">
                Prazos Importantes
              </span>
            </h2>
            <p className="text-gray-400 text-lg">
              Fique atento às datas e não perca os prazos!
            </p>
          </div>

          <div className="space-y-6">
            <div className="bg-gradient-to-r from-[#00f3ff]/10 to-[#00f3ff]/5 p-8 rounded-2xl border-2 border-[#00f3ff]/30 hover:shadow-[0_0_40px_rgba(0,243,255,0.3)] transition-all duration-300">
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                  <h3 className="text-2xl font-bold text-[#00f3ff] mb-2">Inscrições</h3>
                  <p className="text-gray-400">Preencha o formulário com os dados da equipe, proposta do projeto e links necessários</p>
                </div>
                <div className="flex flex-col items-start md:items-end gap-2">
                  <div className="text-3xl font-black text-white">
                    20 MAR
                  </div>
                  <div className="text-gray-400">2026</div>
                </div>
              </div>
              <div className="mt-6">
                <a
                  href="https://forms.gle/mh3GX4FpsHroyDHE8"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 bg-gradient-to-r from-[#00f3ff] to-[#00d4e8] text-black font-bold px-6 py-3 rounded-lg hover:shadow-[0_0_25px_rgba(0,243,255,0.6)] transition-all duration-300"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                  </svg>
                  Realizar Inscrição
                </a>
              </div>
            </div>

            <div className="bg-gradient-to-r from-[#ec4899]/10 to-[#ec4899]/5 p-8 rounded-2xl border-2 border-[#ec4899]/30 hover:shadow-[0_0_40px_rgba(236,72,153,0.3)] transition-all duration-300">
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                  <h3 className="text-2xl font-bold text-[#ec4899] mb-2">Entrega Final</h3>
                  <p className="text-gray-400">Submeta o projeto final com toda a documentação, código e materiais de apresentação</p>
                </div>
                <div className="flex flex-col items-start md:items-end gap-2">
                  <div className="text-3xl font-black text-white">
                    22 MAI
                  </div>
                  <div className="text-gray-400">2026</div>
                </div>
              </div>
              <div className="mt-6">
                <a
                  href="https://forms.gle/apt1wVXWuxsW5Mph6"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 bg-gradient-to-r from-[#ec4899] to-[#db2777] text-white font-bold px-6 py-3 rounded-lg hover:shadow-[0_0_25px_rgba(236,72,153,0.6)] transition-all duration-300"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12" />
                  </svg>
                  Submeter Projeto
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ - Perguntas Frequentes */}
      <FadeInSection delay={0}>
        <section id="faq" className="py-20 px-4 relative">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-4xl md:text-5xl font-bold mb-4">
                <span className="bg-gradient-to-r from-[#00f3ff] via-[#a855f7] to-[#ec4899] bg-clip-text text-transparent drop-shadow-[0_0_20px_rgba(0,243,255,0.4)]">
                  Perguntas Frequentes
                </span>
              </h2>
              <p className={`${textSecondary} text-lg`}>
                Tire suas dúvidas sobre o ExpoTech 2026
              </p>
            </div>

            <div className="space-y-4">
              {/* Pergunta 1 */}
              <div className={`${isDark ? 'bg-[#0a0f1d]/50' : 'bg-gray-50'} rounded-xl border ${borderColor} overflow-hidden`}>
                <button
                  onClick={() => toggleAccordion('faq1')}
                  className="w-full p-5 flex items-center justify-between hover:bg-[#00f3ff]/5 transition-colors"
                >
                  <span className="text-left font-semibold text-base">O que é o ExpoTech 2026?</span>
                  <svg className={`w-5 h-5 text-[#00f3ff] transition-transform duration-300 ${openAccordion === 'faq1' ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </button>
                {openAccordion === 'faq1' && (
                  <div className="p-5 pt-0 border-t border-[#00f3ff]/10">
                    <p className={textSecondary}>O ExpoTech 2026 é o maior evento de tecnologia e inovação da UniFECAF, onde alunos apresentam seus Projetos Integradores com foco em Smart Building e Tecnologias Disruptivas.</p>
                  </div>
                )}
              </div>

              {/* Pergunta 2 */}
              <div className={`${isDark ? 'bg-[#0a0f1d]/50' : 'bg-gray-50'} rounded-xl border ${borderColor} overflow-hidden`}>
                <button
                  onClick={() => toggleAccordion('faq2')}
                  className="w-full p-5 flex items-center justify-between hover:bg-[#00f3ff]/5 transition-colors"
                >
                  <span className="text-left font-semibold text-base">Quando e onde vai acontecer?</span>
                  <svg className={`w-5 h-5 text-[#a855f7] transition-transform duration-300 ${openAccordion === 'faq2' ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </button>
                {openAccordion === 'faq2' && (
                  <div className="p-5 pt-0 border-t border-[#a855f7]/10">
                    <p className={textSecondary}><strong>Data:</strong> 13 de Junho de 2026<br/><strong>Horário:</strong> 08h às 12h<br/><strong>Local:</strong> UniFECAF</p>
                  </div>
                )}
              </div>

              {/* Pergunta 3 */}
              <div className={`${isDark ? 'bg-[#0a0f1d]/50' : 'bg-gray-50'} rounded-xl border ${borderColor} overflow-hidden`}>
                <button
                  onClick={() => toggleAccordion('faq3')}
                  className="w-full p-5 flex items-center justify-between hover:bg-[#00f3ff]/5 transition-colors"
                >
                  <span className="text-left font-semibold text-base">Quem pode participar?</span>
                  <svg className={`w-5 h-5 text-[#ec4899] transition-transform duration-300 ${openAccordion === 'faq3' ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </button>
                {openAccordion === 'faq3' && (
                  <div className="p-5 pt-0 border-t border-[#ec4899]/10">
                    <p className={textSecondary}>Estudantes de todos os cursos da área de tecnologia e engenharias (ADS, CDC, ECO, GTI, Eng. Civil, Eng. Elétrica e Eng. de Produção), do 1º ao 9º semestre.</p>
                  </div>
                )}
              </div>

              {/* Pergunta 4 */}
              <div className={`${isDark ? 'bg-[#0a0f1d]/50' : 'bg-gray-50'} rounded-xl border ${borderColor} overflow-hidden`}>
                <button
                  onClick={() => toggleAccordion('faq4')}
                  className="w-full p-5 flex items-center justify-between hover:bg-[#00f3ff]/5 transition-colors"
                >
                  <span className="text-left font-semibold text-base">Como faço para me inscrever?</span>
                  <svg className={`w-5 h-5 text-[#00f3ff] transition-transform duration-300 ${openAccordion === 'faq4' ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </button>
                {openAccordion === 'faq4' && (
                  <div className="p-5 pt-0 border-t border-[#00f3ff]/10">
                    <p className={textSecondary}>Preencha o formulário de inscrição até <strong>20 de Março de 2026</strong>. O link está disponível na seção de navegação e no Hero do site.</p>
                  </div>
                )}
              </div>

              {/* Pergunta 5 */}
              <div className={`${isDark ? 'bg-[#0a0f1d]/50' : 'bg-gray-50'} rounded-xl border ${borderColor} overflow-hidden`}>
                <button
                  onClick={() => toggleAccordion('faq5')}
                  className="w-full p-5 flex items-center justify-between hover:bg-[#00f3ff]/5 transition-colors"
                >
                  <span className="text-left font-semibold text-base">O evento é aberto ao público?</span>
                  <svg className={`w-5 h-5 text-[#a855f7] transition-transform duration-300 ${openAccordion === 'faq5' ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </button>
                {openAccordion === 'faq5' && (
                  <div className="p-5 pt-0 border-t border-[#a855f7]/10">
                    <p className={textSecondary}>Sim! O ExpoTech 2026 é aberto ao público em geral e empresas interessadas em conhecer os projetos, networking e oportunidades de parceria.</p>
                  </div>
                )}
              </div>

              {/* Pergunta 6 */}
              <div className={`${isDark ? 'bg-[#0a0f1d]/50' : 'bg-gray-50'} rounded-xl border ${borderColor} overflow-hidden`}>
                <button
                  onClick={() => toggleAccordion('faq6')}
                  className="w-full p-5 flex items-center justify-between hover:bg-[#00f3ff]/5 transition-colors"
                >
                  <span className="text-left font-semibold text-base">Existem prêmios?</span>
                  <svg className={`w-5 h-5 text-[#ec4899] transition-transform duration-300 ${openAccordion === 'faq6' ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </button>
                {openAccordion === 'faq6' && (
                  <div className="p-5 pt-0 border-t border-[#ec4899]/10">
                    <p className={textSecondary}>Sim! Cada categoria premia os 3 melhores projetos com valores que variam de R$ 300 a R$ 6.000, dependendo da categoria. Consulte a seção de Premiação para mais detalhes.</p>
                  </div>
                )}
              </div>

              {/* Pergunta 7 - Dúvidas Gerais */}
              <div className={`${isDark ? 'bg-[#0a0f1d]/50' : 'bg-gray-50'} rounded-xl border ${borderColor} overflow-hidden`}>
                <button
                  onClick={() => toggleAccordion('faq7')}
                  className="w-full p-5 flex items-center justify-between hover:bg-[#00f3ff]/5 transition-colors"
                >
                  <span className="text-left font-semibold text-base">Outras dúvidas? Entre em contato!</span>
                  <svg className={`w-5 h-5 text-[#00f3ff] transition-transform duration-300 ${openAccordion === 'faq7' ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </button>
                {openAccordion === 'faq7' && (
                  <div className="p-5 pt-0 border-t border-[#00f3ff]/10">
                    <p className={textSecondary}>Para dúvidas gerais sobre o evento, envie um email para:<br/><a href="mailto:luis.pires@fecaf.com.br" className="text-[#00f3ff] hover:text-[#00d4e8] font-semibold">luis.pires@fecaf.com.br</a></p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </section>
      </FadeInSection>

      {/* Seja Parceiro */}
      <FadeInSection delay={100}>
        <section className="py-16 px-4 relative">
          <div className="max-w-4xl mx-auto">
            <div className={`bg-gradient-to-br from-[#1a1f2e] to-[#0d1117] rounded-2xl border-2 border-[#00f3ff]/30 p-8 md:p-12 text-center ${isDark ? '' : 'shadow-xl'}`}>
              <div className="w-20 h-20 bg-gradient-to-br from-[#00f3ff] via-[#a855f7] to-[#ec4899] rounded-full flex items-center justify-center mx-auto mb-6">
                <svg className="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
              </div>
              <h3 className="text-3xl md:text-4xl font-bold mb-4 bg-gradient-to-r from-[#00f3ff] via-[#a855f7] to-[#ec4899] bg-clip-text text-transparent">
                Seja uma Empresa Parceira!
              </h3>
              <p className={`${textSecondary} text-lg mb-8 max-w-2xl mx-auto`}>
                Apoie a inovação e conheça novos talentos em tecnologia. Parceiros do ExpoTech 2026 terão visibilidade, networking e acesso aos melhores projetos da região.
              </p>
              <a
                href="mailto:luis.pires@fecaf.com.br?subject=Interesse%20em%20Parceria%20-%20ExpoTech%202026&body=Olá%2C%20gostaria%20de%20saber%20mais%20sobre%20como%20ser%20uma%20empresa%20parceira%20do%20ExpoTech%202026.%0D%0A%0D%0ANome%20da%20Empresa%3A%20%5BSeu%20Nome%5D%0D%0ANome%20do%20Contato%3A%20%5BSeu%20Nome%5D%0D%0ACargo%2FFunção%3A%20%5BSeu%20Cargo%5D%0D%0ATelefone%3A%20%5BSeu%20Telefone%5D%0D%0ATipo%20de%20Parceria%20de%20interesse%3A%20%5BPatrocinador%2F%20Apoiador%2F%20Jurado%2F%20Outro%5D%0D%0AMensagem%20adicional%3A%20%5BDesejo%20conhecer%20melhores%20projetos%20e%20talentos...%5D%0D%0A%0D%0AAguardo%20seu%20retorno!"
                className="inline-flex items-center gap-3 bg-gradient-to-r from-[#00f3ff] via-[#a855f7] to-[#ec4899] text-white font-bold px-8 py-4 rounded-xl text-lg hover:shadow-[0_0_40px_rgba(168,85,247,0.6)] hover:scale-105 transition-all duration-300"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
                Seja parceiro
              </a>
            </div>
          </div>
        </section>
      </FadeInSection>

      {/* Contagem Regressiva */}
      <FadeInSection delay={0}>
        <div className="max-w-4xl mx-auto px-4">
          <CountdownTimer targetDate={eventDate} isDark={isDark} />
        </div>
      </FadeInSection>

      {/* Footer */}
      <footer className={`${isDark ? 'bg-[#0a0f1d]' : 'bg-white'} border-t ${borderColor} py-12 px-4`}>
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-3 gap-8 mb-8">
            <div>
              <div className="flex items-center space-x-2 mb-4">
                <div className="w-10 h-10 bg-gradient-to-r from-[#00f3ff] to-[#a855f7] rounded-lg flex items-center justify-center">
                  <svg className="w-6 h-6 text-black" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 3v2m6-2v2M9 19v2m6-2v2M5 9H3m2 6H3m18-6h-2m2 6h-2M7 19h10a2 2 0 002-2V7a2 2 0 00-2-2H7a2 2 0 00-2 2v10a2 2 0 002 2zM9 9h6v6H9V9z" />
                  </svg>
                </div>
                <span className="text-2xl font-bold bg-gradient-to-r from-[#00f3ff] to-[#a855f7] bg-clip-text text-transparent">
                  ExpoTech 2026
                </span>
              </div>
              <p className="text-gray-400 mb-4">
                O maior evento de tecnologia e inovação da UniFECAF. Conectando estudantes, professores e empresas.
              </p>
            </div>
            <div>
              <h4 className="text-lg font-bold text-white mb-4">Links Rápidos</h4>
              <ul className="space-y-2">
                <li>
                  <button onClick={() => scrollToSection('sobre')} className="text-gray-400 hover:text-[#00f3ff] transition-colors">
                    Sobre
                  </button>
                </li>
                <li>
                  <button onClick={() => scrollToSection('trilhas')} className="text-gray-400 hover:text-[#00f3ff] transition-colors">
                    Trilhas
                  </button>
                </li>
                <li>
                  <button onClick={() => scrollToSection('regras')} className="text-gray-400 hover:text-[#00f3ff] transition-colors">
                    Regras
                  </button>
                </li>
                <li>
                  <button onClick={() => scrollToSection('prazos')} className="text-gray-400 hover:text-[#00f3ff] transition-colors">
                    Prazos
                  </button>
                </li>
              </ul>
            </div>
            <div>
              <h4 className={`text-lg font-bold ${textPrimary} mb-4`}>Contato</h4>
              <ul className={`space-y-2 ${textSecondary}`}>
                <li className="flex items-center gap-2">
                  <svg className="w-5 h-5 text-[#00f3ff]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                  <a href="https://www.unifecaf.com.br/" target="_blank" rel="noopener noreferrer" className="hover:text-[#00f3ff] transition-colors">
                    UniFECAF
                  </a>
                </li>
                <li className="flex items-center gap-2">
                  <svg className="w-5 h-5 text-[#a855f7]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                  13 de Junho de 2026
                </li>
                <li className="flex items-center gap-2">
                  <svg className="w-5 h-5 text-[#ec4899]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  08h às 12h
                </li>
              </ul>
            </div>
          </div>
          <div className={`border-t ${borderColor} pt-8 text-center`}>
            <p className={textSecondary}>
              © 2026 Centro Universitário UniFECAF. Núcleo de Tecnologias e Engenharias. Todos os direitos reservados.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
