'use client';

import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown, AlertCircle } from 'lucide-react';
import CV from '@/components/CV';
import clsx from 'clsx';
import { twMerge } from 'tailwind-merge';

function cn(...inputs: (string | undefined | null | false)[]) {
  return twMerge(clsx(inputs));
}

export default function Home() {
  const [status, setStatus] = useState<'puzzle' | 'decrypting' | 'cv'>('puzzle');
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const handleWrongAnswer = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3000);
  };

  const handleCorrectAnswer = () => {
    setStatus('decrypting');
    setToastMessage(null);
  };

  return (
    <main className="min-h-screen bg-slate-50 text-slate-900 flex flex-col justify-center font-sans overflow-x-hidden p-4">
      <AnimatePresence mode="wait">
        {status === 'puzzle' && (
          <PuzzleScreen 
            key="puzzle" 
            onWrongAnswer={handleWrongAnswer} 
            onCorrectAnswer={handleCorrectAnswer} 
          />
        )}
        
        {status === 'decrypting' && (
          <DecryptingScreen 
            key="decrypting" 
            onComplete={() => setStatus('cv')} 
          />
        )}
        
        {status === 'cv' && (
          <motion.div
            key="cv"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="w-full py-12"
          >
            <CV />
          </motion.div>
        )}
      </AnimatePresence>

      {/* Toast Notification */}
      <AnimatePresence>
        {toastMessage && (
          <motion.div
            initial={{ opacity: 0, y: 50, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 50, scale: 0.95 }}
            className="fixed bottom-6 left-1/2 -translate-x-1/2 bg-slate-900 text-white px-6 py-3 rounded-xl shadow-2xl flex items-center gap-3 z-50 border border-slate-700"
          >
            <AlertCircle className="w-5 h-5 text-red-400" />
            <span className="font-medium">{toastMessage}</span>
          </motion.div>
        )}
      </AnimatePresence>
    </main>
  );
}

// --- PUZZLE SCREEN COMPONENT ---
function PuzzleScreen({ onWrongAnswer, onCorrectAnswer }: { onWrongAnswer: (msg: string) => void, onCorrectAnswer: () => void }) {
  const hints = [
    "İpucu 1: Havuza giren kodlar Go ve Mid-Level, havuzu boşaltan ise Stajyer'in teknik borcudur.",
    "İpucu 2: Denklem (Senior + Mid - Stajyer) * 2 şeklindedir.",
    "İpucu 3: Çıkan sonuç, aradığın bir sayfayı bulamadığında karşına çıkan hatadır."
  ];

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0, filter: "blur(10px)" }}
      transition={{ duration: 0.5 }}
      className="max-w-2xl w-full mx-auto"
    >
      <div className="bg-white p-8 md:p-10 rounded-3xl shadow-xl border border-slate-200">
        <div className="flex items-center gap-3 mb-6">
          <div className="w-3 h-3 rounded-full bg-red-400"></div>
          <div className="w-3 h-3 rounded-full bg-amber-400"></div>
          <div className="w-3 h-3 rounded-full bg-green-400"></div>
          <span className="ml-2 font-mono text-sm text-slate-400">terminal // auth_required</span>
        </div>

        <h1 className="text-2xl md:text-3xl font-bold mb-6 text-slate-800 leading-snug">
          Yetkilendirme Gerekli
        </h1>
        
        <div className="prose prose-slate mb-8 bg-slate-50 p-6 rounded-2xl border border-slate-100 font-medium text-slate-700 leading-relaxed text-lg">
          Bir e-ticaret projesinin backend'ini bir Senior Developer tek başına Go kullanarak saatte 150 satır kod yazarak doldurabiliyor. Mid-Level Developer ise saatte 100 satır kod ekleyebiliyor. Ancak stajyer, sürekli hatalı commit'ler atarak sisteme saatte 48 satırlık teknik borç ekliyor ve bu kodların silinmesi gerekiyor. Bu üçlü aynı anda projeye oturup tam 2 saat boyunca çalışırlarsa, ortaya çıkan net kod satırı sayısı hangi HTTP durum koduna eşit olur?
        </div>

        <div className="space-y-3 mb-10">
          {hints.map((hint, index) => (
            <Accordion key={index} title={`İpucu ${index + 1}`}>
              {hint.replace(`İpucu ${index + 1}: `, '')}
            </Accordion>
          ))}
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <button 
            onClick={() => onWrongAnswer('Fazla iyimsersin, stajyerin kodlarını unuttun.')}
            className="group relative p-4 bg-slate-50 border-2 border-slate-200 hover:border-indigo-600 hover:bg-indigo-50 rounded-xl font-mono font-medium transition-all text-slate-700 hover:text-indigo-700 text-left"
          >
            A) 200 OK
          </button>
          
          <button 
            onClick={() => onWrongAnswer('Çay molası bitti, koda dön!')}
            className="group relative p-4 bg-slate-50 border-2 border-slate-200 hover:border-indigo-600 hover:bg-indigo-50 rounded-xl font-mono font-medium transition-all text-slate-700 hover:text-indigo-700 text-left"
          >
            B) 418 I&apos;m a teapot
          </button>
          
          <button 
            onClick={() => onWrongAnswer('Sunucu hala ayakta, tekrar hesapla.')}
            className="group relative p-4 bg-slate-50 border-2 border-slate-200 hover:border-indigo-600 hover:bg-indigo-50 rounded-xl font-mono font-medium transition-all text-slate-700 hover:text-indigo-700 text-left"
          >
            C) 500 Internal Server Error
          </button>
          
          <button 
            onClick={onCorrectAnswer}
            className="group relative p-4 bg-slate-50 border-2 border-slate-200 hover:border-indigo-600 hover:bg-indigo-50 rounded-xl font-mono font-medium transition-all text-slate-700 hover:text-indigo-700 text-left"
          >
            D) 404 Not Found
          </button>
        </div>
      </div>
    </motion.div>
  );
}

// --- ACCORDION COMPONENT ---
function Accordion({ title, children }: { title: string, children: React.ReactNode }) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="border border-slate-200 rounded-xl overflow-hidden bg-white">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full flex justify-between items-center p-4 bg-slate-50 hover:bg-slate-100 transition-colors text-slate-800 font-medium"
      >
        <span>{title}</span>
        <ChevronDown className={cn("w-5 h-5 text-slate-500 transition-transform duration-300", isOpen && "rotate-180")} />
      </button>
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="overflow-hidden"
          >
            <div className="p-4 bg-white text-slate-600 border-t border-slate-100">
              {children}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

// --- DECRYPTING SCREEN COMPONENT ---
function DecryptingScreen({ onComplete }: { onComplete: () => void }) {
  useEffect(() => {
    const timer = setTimeout(() => {
      onComplete();
    }, 3000);
    return () => clearTimeout(timer);
  }, [onComplete]);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 bg-slate-100 flex flex-col items-center justify-center z-50 overflow-hidden"
    >
      <div className="z-10 bg-white/80 backdrop-blur-md px-8 py-4 rounded-2xl shadow-sm border border-slate-200 mb-8">
        <h2 className="text-xl md:text-2xl font-mono text-indigo-700 font-bold tracking-tight">
          Status: 200 OK (Decrypting...)
        </h2>
      </div>
      
      {/* Background Data Flow */}
      <div className="absolute inset-0 opacity-20 pointer-events-none select-none flex overflow-hidden">
        {Array.from({ length: 40 }).map((_, i) => (
          <ScrambleColumn key={i} delay={Math.random() * 2} speed={0.5 + Math.random() * 1.5} />
        ))}
      </div>
    </motion.div>
  );
}

function ScrambleColumn({ delay, speed }: { delay: number, speed: number }) {
  const [chars, setChars] = useState<string>('');

  useEffect(() => {
    const generateChars = () => {
      let str = '';
      for (let i = 0; i < 30; i++) {
        str += Math.random() > 0.5 ? '1' : '0';
        str += '\n';
      }
      return str;
    };

    setChars(generateChars());
    const interval = setInterval(() => {
      setChars(generateChars());
    }, 100);

    return () => clearInterval(interval);
  }, []);

  return (
    <motion.div
      initial={{ y: '-100%' }}
      animate={{ y: '100%' }}
      transition={{ 
        repeat: Infinity, 
        duration: speed * 3, 
        ease: "linear",
        delay: delay
      }}
      className="flex-1 text-center font-mono text-lg md:text-xl font-bold text-slate-800 whitespace-pre"
      style={{ writingMode: 'vertical-rl', textOrientation: 'upright' }}
    >
      {chars}
    </motion.div>
  );
}
