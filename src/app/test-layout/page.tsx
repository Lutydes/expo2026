import React from 'react';
import Link from 'next/link';

export const metadata = {
  title: 'UNIFECAF - Teste Layout Defesa Cibernética',
};

export default function TestLayout() {
  return (
    <div className="min-h-screen bg-white text-gray-800 antialiased">
      {/* top bar semelhante ao site de modelo */}
      <div className="w-full bg-[#112240] text-white text-sm py-1">
        <div className="container mx-auto flex justify-between px-6">
          <div>Vagas limitadas</div>
          <div>Email: contato@unifecaf.com.br | Tel: (11) 99470-3282</div>
        </div>
      </div>
      <header className="w-full bg-white shadow">
        <div className="container mx-auto flex items-center justify-between py-4 px-6">
          <div className="text-2xl font-bold text-[#112240]">UNIFECAF</div>
          <nav className="space-x-6 text-[#112240] font-medium">
            <Link href="#sobre"><a className="hover:text-[#00f3ff]">Sobre</a></Link>
            <Link href="#conteudo"><a className="hover:text-[#00f3ff]">Conteúdo</a></Link>
            <Link href="#docentes"><a className="hover:text-[#00f3ff]">Docentes</a></Link>
            <Link href="#inscrição"><a className="hover:text-[#00f3ff]">Inscrição</a></Link>
          </nav>
        </div>
      </header>

      {/* hero similar ao layout referenciado */}
      <section className="relative bg-gray-50">
        <div className="container mx-auto flex flex-col lg:flex-row items-center py-20 px-6">
          <div className="lg:w-1/2 mb-10 lg:mb-0">
            <h1 className="text-4xl lg:text-5xl font-extrabold text-[#112240] mb-4">
              Defesa Cibernética
            </h1>
            <p className="text-lg text-gray-700 mb-6">
              Curso de Graduação EAD com foco em segurança digital e proteção de
              ativos em ambientes corporativos e governamentais.
            </p>
            <Link href="/inscricao">
              <a className="inline-block bg-[#00f3ff] text-black font-bold py-3 px-8 rounded-lg hover:bg-[#00d4e8] transition-all">
                Inscrever-se
              </a>
            </Link>
          </div>
          <div className="lg:w-1/2">
            <img src="/defesa-cibernetica-hero.jpg" alt="Defesa Cibernética" className="w-full rounded-lg shadow-lg" />
          </div>
        </div>
      </section>

      {/* sections brief */}
      <section id="sobre" className="py-20">
        <div className="container mx-auto px-6">
          <h2 className="text-3xl font-bold text-center text-[#112240] mb-8">Por que escolher o curso?</h2>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="p-6 bg-white border rounded-lg hover:shadow-lg transition-shadow">
              <h3 className="font-semibold text-lg mb-2">Flexibilidade EAD</h3>
              <p className="text-gray-600">Estude no seu ritmo com suporte total online.</p>
            </div>
            <div className="p-6 bg-white border rounded-lg hover:shadow-lg transition-shadow">
              <h3 className="font-semibold text-lg mb-2">Laboratórios virtuais</h3>
              <p className="text-gray-600">Prática em ambientes simulados de ataque e defesa.</p>
            </div>
            <div className="p-6 bg-white border rounded-lg hover:shadow-lg transition-shadow">
              <h3 className="font-semibold text-lg mb-2">Carreira promissora</h3>
              <p className="text-gray-600">Demanda crescente em empresas públicas e privadas.</p>
            </div>
          </div>
        </div>
      </section>

      <footer className="py-8 text-center text-gray-500 text-sm">
        © 2026 UNIFECAF. Todos os direitos reservados.
      </footer>
    </div>
  );
}
