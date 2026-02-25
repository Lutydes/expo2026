import React from 'react';
import Link from 'next/link';

export const metadata = {
  title: 'UNIFECAF - Nova Home Modelo',
};

export default function ReplicaHome() {
  return (
    <div className="min-h-screen bg-white text-gray-800">
      {/* header simples */}
      <header className="w-full bg-[#0d1117] text-white">
        <div className="container mx-auto flex items-center justify-between py-4 px-6">
          <div className="text-2xl font-bold">UNIFECAF</div>
          <nav className="space-x-6">
            <Link href="#about">
              <a className="hover:text-[#00f3ff]">Sobre</a>
            </Link>
            <Link href="#cursos">
              <a className="hover:text-[#00f3ff]">Cursos</a>
            </Link>
            <Link href="#contato">
              <a className="hover:text-[#00f3ff]">Contato</a>
            </Link>
          </nav>
        </div>
      </header>

      {/* hero */}
      <section className="relative bg-cover bg-center" style={{ backgroundImage: "url('/hero-bg.jpg')" }}>
        <div className="absolute inset-0 bg-black opacity-50" />
        <div className="container mx-auto relative z-10 py-32 text-center text-white">
          <h1 className="text-5xl font-extrabold mb-4">Defesa Cibernética</h1>
          <p className="text-xl mb-8 max-w-2xl mx-auto">
            Construa sua carreira na área mais estratégica da tecnologia com o curso de
            Graduação EAD em Defesa Cibernética.
          </p>
          <Link href="/inscricao">
            <a className="inline-block bg-[#00f3ff] text-black font-bold py-3 px-8 rounded-lg hover:bg-[#00d4e8] transition-all">
              Inscreva-se agora
            </a>
          </Link>
        </div>
      </section>

      {/* features */}
      <section id="about" className="py-20">
        <div className="container mx-auto text-center">
          <h2 className="text-3xl font-bold mb-6">Por que escolher este curso?</h2>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="p-6 border rounded-lg hover:shadow-lg transition-shadow">
              <svg className="w-12 h-12 mx-auto text-[#00f3ff]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
              <h3 className="mt-4 font-semibold">Professores qualificados</h3>
              <p className="mt-2 text-gray-600">
                Corpo docente com experiência de mercado e formação acadêmica sólida.
              </p>
            </div>
            <div className="p-6 border rounded-lg hover:shadow-lg transition-shadow">
              <svg className="w-12 h-12 mx-auto text-[#00f3ff]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4" />
              </svg>
              <h3 className="mt-4 font-semibold">100% EAD</h3>
              <p className="mt-2 text-gray-600">
                Flexibilidade para estudar de onde estiver, com material atualizado.
              </p>
            </div>
            <div className="p-6 border rounded-lg hover:shadow-lg transition-shadow">
              <svg className="w-12 h-12 mx-auto text-[#00f3ff]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-3.313 0-6 2.687-6 6s2.687 6 6 6 6-2.687 6-6-2.687-6-6-6z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6l4 2" />
              </svg>
              <h3 className="mt-4 font-semibold">Mercado aquecido</h3>
              <p className="mt-2 text-gray-600">
                Demanda crescente por profissionais de segurança digital e cibernética.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* chamada de contato */}
      <section id="contato" className="py-20 bg-gray-50">
        <div className="container mx-auto text-center">
          <h2 className="text-3xl font-bold mb-6">Fale conosco</h2>
          <p className="mb-8">Quer saber mais? Entre em contato e tire suas dúvidas com nossa equipe.</p>
          <a href="mailto:contato@unifecaf.com.br" className="text-[#00f3ff] font-semibold">contato@unifecaf.com.br</a>
        </div>
      </section>

      <footer className="py-8 text-center text-gray-500 text-sm">
        © 2026 UNIFECAF. Todos os direitos reservados.
      </footer>
    </div>
  );
}
