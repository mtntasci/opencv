'use client';

import { useEffect, useRef } from 'react';
import { Mail, MapPin } from 'lucide-react';

const GithubIcon = ({ className }: { className?: string }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4" />
    <path d="M9 18c-4.51 2-5-2-7-2" />
  </svg>
);

const LinkedinIcon = ({ className }: { className?: string }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
    <rect width="4" height="12" x="2" y="9" />
    <circle cx="4" cy="4" r="2" />
  </svg>
);

export default function CV() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current) return;

    const textNodes: { node: Node; originalText: string }[] = [];

    const walk = (n: Node) => {
      if (n.nodeType === Node.TEXT_NODE) {
        const text = n.textContent || '';
        if (text.trim().length > 0) {
          textNodes.push({ node: n, originalText: text });
        }
      } else {
        n.childNodes.forEach(walk);
      }
    };

    walk(containerRef.current);

    // Initial scramble
    textNodes.forEach((tn) => {
      tn.node.textContent = tn.originalText.replace(/\S/g, () => Math.floor(Math.random() * 10).toString());
    });

    const totalDuration = 9000;
    const start = performance.now();
    let animationFrameId: number;

    const tick = (now: number) => {
      const elapsed = now - start;
      const progress = Math.min(elapsed / totalDuration, 1);

      textNodes.forEach((tn, index) => {
        const nodeThreshold = (index / textNodes.length) * 0.7; // staggering threshold

        if (progress >= nodeThreshold) {
          const nodeProgress = Math.min((progress - nodeThreshold) * 4, 1);

          let newText = '';
          for (let i = 0; i < tn.originalText.length; i++) {
            const char = tn.originalText[i];
            if (char.trim() === '') {
              newText += char;
            } else {
              if (Math.random() < nodeProgress || nodeProgress === 1) {
                newText += char;
              } else {
                newText += Math.floor(Math.random() * 10).toString();
              }
            }
          }
          tn.node.textContent = newText;
        } else {
          tn.node.textContent = tn.originalText.replace(/\S/g, () => Math.floor(Math.random() * 10).toString());
        }
      });

      if (progress < 1) {
        animationFrameId = requestAnimationFrame(tick);
      } else {
        textNodes.forEach(tn => { tn.node.textContent = tn.originalText; });
      }
    };

    animationFrameId = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(animationFrameId);
  }, []);

  const skills = [
    "Go", "C++", "Shell", "SQL", "Linux Kernel", "Docker", "Kubernetes", "CGO",
    "gRPC", "TCP/UDP Socket Programlama", "Kriptografi", "Low-Level Programlama", "Concurrency"
  ];

  return (
    <div ref={containerRef} className="max-w-4xl mx-auto p-8 sm:p-12 md:p-16 bg-white shadow-xl rounded-2xl border border-slate-100">
      {/* Header */}
      <header className="border-b border-slate-200 pb-8 mb-10">
        <h1 className="text-4xl md:text-5xl font-bold text-slate-900 tracking-tight mb-2">Hazal Sarıkaya</h1>
        <h2 className="text-xl md:text-2xl text-indigo-600 font-medium mb-6">Yazılım Geliştirici | Jr. System Software Developer</h2>

        <div className="flex flex-col sm:flex-row sm:items-center gap-4 text-slate-600 font-mono text-sm">
          <div className="flex items-center gap-2">
            <Mail className="w-4 h-4 text-slate-400" />
            <a href="mailto:hazalsarikaya@gmail.com" className="hover:text-indigo-600 transition-colors">hazalsarikaya@gmail.com</a>
          </div>
          <span className="hidden sm:inline text-slate-300">|</span>
          <div className="flex items-center gap-2">
            <MapPin className="w-4 h-4 text-slate-400" />
            <span>Antalya, Türkiye</span>
          </div>
          <span className="hidden sm:inline text-slate-300">|</span>
          <div className="flex items-center gap-4">
            <a href="https://github.com/hazalsarikaya" target="_blank" rel="noopener noreferrer" className="flex items-center gap-1.5 hover:text-indigo-600 transition-colors">
              <GithubIcon className="w-4 h-4 text-slate-400" />
              <span>GitHub</span>
            </a>
            <a href="https://www.linkedin.com/in/hazalsarikaya" target="_blank" rel="noopener noreferrer" className="flex items-center gap-1.5 hover:text-indigo-600 transition-colors">
              <LinkedinIcon className="w-4 h-4 text-slate-400" />
              <span>LinkedIn</span>
            </a>
          </div>
        </div>
      </header>

      {/* Summary */}
      <section className="mb-10">
        <h3 className="text-lg font-semibold text-slate-900 mb-4 uppercase tracking-wider text-sm">Özet</h3>
        <p className="text-slate-700 leading-relaxed">
          ODTÜ Matematik mezunu, analitik düşünce yapısını yazılım mimarisiyle birleştiren geliştirici. Savunma sanayisinde düşük seviyeli (low-level) servislerin Go ve C++ ile geliştirilmesi konusunda deneyimli. Matematiksel prensipleri; kriptografi, ağ optimizasyonu ve yüksek performanslı sistemler tasarlamak için kullanır.
        </p>
      </section>

      {/* Experience */}
      <section className="mb-10">
        <h3 className="text-lg font-semibold text-slate-900 mb-6 uppercase tracking-wider text-sm">Deneyim</h3>

        <div className="relative border-l border-slate-200 pl-6 pb-2">
          <div className="absolute w-3 h-3 bg-indigo-600 rounded-full -left-[6.5px] top-1.5 ring-4 ring-white"></div>
          <div className="mb-1 flex flex-col sm:flex-row sm:justify-between sm:items-baseline">
            <h4 className="text-lg font-semibold text-slate-900">Yazılım Geliştirici</h4>
            <span className="text-slate-500 font-mono text-sm mt-1 sm:mt-0">2025 - Günümüz</span>
          </div>
          <div className="text-indigo-600 font-medium mb-4">DM Savunma Sanayi</div>
          <ul className="list-disc list-inside text-slate-700 space-y-2 marker:text-slate-400 leading-relaxed">
            <li>Kriptolama süreçlerinde optimizasyonlar yapılarak low-level Go servislerinin veri işleme hızı ve güvenliği artırıldı.</li>
            <li>gRPC ve TCP/UDP socket programlama kullanılarak donanım-yazılım arası düşük gecikmeli haberleşme mimarisi kuruldu.</li>
            <li>CGO ve Linux Kernel seviyesinde yapılandırmalar ile sistem performansı iyileştirildi.</li>
            <li>Docker ve Kubernetes (K8s) kullanılarak mikroservis mimarisindeki uygulamaların dağıtımı ve izolasyonu sağlandı.</li>
          </ul>
        </div>
      </section>

      {/* Education */}
      <section className="mb-10">
        <h3 className="text-lg font-semibold text-slate-900 mb-6 uppercase tracking-wider text-sm">Eğitim ve Araştırma</h3>

        <div className="relative border-l border-slate-200 pl-6">
          <div className="absolute w-3 h-3 bg-slate-400 rounded-full -left-[6.5px] top-1.5 ring-4 ring-white"></div>
          <div className="mb-1 flex flex-col sm:flex-row sm:justify-between sm:items-baseline">
            <h4 className="text-lg font-semibold text-slate-900">Lisans, Matematik</h4>
            <span className="text-slate-500 font-mono text-sm mt-1 sm:mt-0">Mezuniyet: 2025</span>
          </div>
          <div className="text-indigo-600 font-medium mb-3">Orta Doğu Teknik Üniversitesi (ODTÜ)</div>
          <p className="text-slate-700 leading-relaxed">
            <strong className="text-slate-900 font-medium">Akademik Odak & Projeler:</strong> Kriptografik anahtar optimizasyonu, Blokzincir ağ optimizasyonu ve Kuşatma/Saldırı dirençli şifreleme algoritmaları.
          </p>
        </div>
      </section>

      {/* Skills */}
      <section>
        <h3 className="text-lg font-semibold text-slate-900 mb-6 uppercase tracking-wider text-sm">Yetenekler ve Teknolojiler</h3>
        <div className="flex flex-wrap gap-2.5">
          {skills.map((skill) => (
            <span
              key={skill}
              className="bg-slate-100 text-slate-700 px-3 py-1.5 rounded-md text-sm font-mono border border-slate-200 shadow-sm transition-colors hover:bg-indigo-50 hover:text-indigo-700 hover:border-indigo-100"
            >
              {skill}
            </span>
          ))}
        </div>
      </section>
    </div>
  );
}
