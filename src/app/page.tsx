'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Lightbulb, Terminal } from 'lucide-react';
import CV from '@/components/CV';
import clsx from 'clsx';
import { twMerge } from 'tailwind-merge';

function cn(...inputs: (string | undefined | null | false)[]) {
  return twMerge(clsx(inputs));
}

export default function Home() {
  const [status, setStatus] = useState<'puzzle' | 'decrypting' | 'cv'>('puzzle');
  const [popup, setPopup] = useState<{ message: string, id: number } | null>(null);

  const showPopupMessage = (msg: string) => {
    setPopup({ message: msg, id: Date.now() });
    setTimeout(() => {
      setPopup((prev) => (prev?.id === prev?.id ? null : prev));
    }, 4000);
  };

  const handleCorrectAnswer = () => {
    setStatus('decrypting');
    setPopup(null);
  };

  return (
    <main className="min-h-screen bg-slate-50 text-slate-900 flex flex-col justify-center font-sans overflow-x-hidden p-4">
      <AnimatePresence mode="wait">
        {status === 'puzzle' && (
          <PuzzleScreen 
            key="puzzle" 
            onWrongAnswer={showPopupMessage} 
            onCorrectAnswer={handleCorrectAnswer} 
            onShowHint={showPopupMessage}
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
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0 }}
            className="w-full py-12"
          >
            <CV />
          </motion.div>
        )}
      </AnimatePresence>

      {/* Center Popup Notification */}
      <AnimatePresence>
        {popup && (
          <motion.div
            key={popup.id}
            initial={{ opacity: 0, scale: 0.9, y: 10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 10 }}
            className="fixed inset-0 pointer-events-none flex items-center justify-center z-50 px-4"
          >
            <div className="bg-slate-900/95 backdrop-blur-md text-white px-8 py-6 rounded-2xl shadow-2xl max-w-md w-full text-center border border-slate-700/50 relative overflow-hidden">
              <div className="absolute top-0 left-0 w-full h-1 bg-indigo-500 opacity-50"></div>
              <Terminal className="w-6 h-6 text-indigo-400 mx-auto mb-3" />
              <p className="font-medium text-lg leading-relaxed text-slate-100">{popup.message}</p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </main>
  );
}

// --- PUZZLE SCREEN COMPONENT ---
function PuzzleScreen({ 
  onWrongAnswer, 
  onCorrectAnswer, 
  onShowHint 
}: { 
  onWrongAnswer: (msg: string) => void, 
  onCorrectAnswer: () => void,
  onShowHint: (msg: string) => void 
}) {
  const hints = [
    "Havuza giren kodlar Go ve Mid-Level, havuzu boşaltan ise Stajyer'in teknik borcudur.",
    "Denklem (Senior + Mid - Stajyer) * 2 şeklindedir.",
    "Çıkan sonuç, aradığın bir sayfayı bulamadığında karşına çıkan hatadır."
  ];

  const [activeHint, setActiveHint] = useState<number | null>(null);

  const handleHintClick = (index: number) => {
    setActiveHint(index);
    onShowHint(`İpucu ${index + 1}: ${hints[index]}`);
    setTimeout(() => {
      setActiveHint((prev) => (prev === index ? null : prev));
    }, 4000);
  };

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

        <h1 className="text-xl font-medium mb-6 text-slate-500 uppercase tracking-wide">
          Benimle çalışmak ister misiniz ?
        </h1>
        
        <div className="prose prose-slate mb-8 bg-slate-50 p-6 rounded-2xl border border-slate-100 font-medium text-slate-700 leading-relaxed text-lg">
          Bir e-ticaret projesinin backend'ini bir Senior Developer tek başına Go kullanarak saatte 150 satır kod yazarak doldurabiliyor. Mid-Level Developer ise saatte 100 satır kod ekleyebiliyor. Ancak stajyer, sürekli hatalı commit'ler atarak sisteme saatte 48 satırlık teknik borç ekliyor ve bu kodların silinmesi gerekiyor. Bu üçlü aynı anda projeye oturup tam 2 saat boyunca çalışırlarsa, ortaya çıkan net kod satırı sayısı hangi HTTP durum koduna eşit olur?
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-10">
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

        {/* Hints Section */}
        <div className="flex flex-col items-center">
          <span className="text-sm font-medium text-slate-400 mb-4 uppercase tracking-wider">İpuçları</span>
          <div className="flex gap-6 justify-center">
            {hints.map((_, index) => (
              <button 
                key={index}
                onClick={() => handleHintClick(index)}
                className="group flex flex-col items-center gap-2 focus:outline-none"
              >
                <div className={cn(
                  "p-3 rounded-full transition-all duration-300",
                  activeHint === index 
                    ? "bg-yellow-100 text-yellow-500 shadow-[0_0_15px_rgba(234,179,8,0.5)]" 
                    : "bg-slate-100 text-slate-400 hover:bg-slate-200 hover:text-slate-600"
                )}>
                  <Lightbulb className="w-6 h-6" />
                </div>
                <span className={cn(
                  "text-xs font-semibold transition-colors duration-300",
                  activeHint === index ? "text-yellow-600" : "text-slate-400"
                )}>
                  İpucu {index + 1}
                </span>
              </button>
            ))}
          </div>
        </div>

      </div>
    </motion.div>
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
