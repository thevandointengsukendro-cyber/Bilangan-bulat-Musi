import React from 'react';
import { Volume2, VolumeX, HelpCircle, BookOpen, Waves, Calculator, GitCompare, Award } from 'lucide-react';
import { LearningStage } from '../types';

interface NavbarProps {
  currentStage: LearningStage;
  onSelectStage: (stage: LearningStage) => void;
  soundEnabled: boolean;
  onToggleSound: () => void;
  onOpenGuide: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  currentStage,
  onSelectStage,
  soundEnabled,
  onToggleSound,
  onOpenGuide,
}) => {
  const stages: { id: LearningStage; label: string; icon: React.ReactNode; step: number }[] = [
    { id: 'context', label: '1. Konteks Musi', icon: <BookOpen className="w-3.5 h-3.5" />, step: 1 },
    { id: 'simulation', label: '2. Simulasi Pasang Surut', icon: <Waves className="w-3.5 h-3.5" />, step: 2 },
    { id: 'symbolic', label: '3. Simbolik Matematika', icon: <Calculator className="w-3.5 h-3.5" />, step: 3 },
    { id: 'comparison', label: '4. Bandingkan Ketinggian', icon: <GitCompare className="w-3.5 h-3.5" />, step: 4 },
    { id: 'quiz', label: '5. Tantangan Mandiri', icon: <Award className="w-3.5 h-3.5" />, step: 5 },
  ];

  return (
    <header className="sticky top-0 z-40 w-full border-b border-slate-800 bg-slate-950/90 backdrop-blur-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-2.5 flex flex-col md:flex-row items-center justify-between gap-3">
        {/* Brand & Context */}
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-lg bg-gradient-to-br from-red-600 to-rose-700 flex items-center justify-center shadow-lg shadow-red-950/50 border border-red-400/30">
            <span className="font-extrabold text-white text-base font-serif">M</span>
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-base font-bold text-slate-100 tracking-tight leading-none">
                Pasang Surut Sungai Musi
              </h1>
              <span className="text-[10px] font-semibold text-rose-400 border border-rose-500/30 rounded px-1.5 py-0.2 bg-rose-950/40">
                Palembang
              </span>
            </div>
            <p className="text-xs text-slate-400">
              Media Pembelajaran Interaktif Bilangan Bulat Berbasis Garis Bilangan Vertikal (Peil Schaal)
            </p>
          </div>
        </div>

        {/* Action icons right */}
        <div className="flex items-center gap-2">
          {/* Sound Toggle */}
          <button
            onClick={onToggleSound}
            aria-label={soundEnabled ? 'Matikan Suara' : 'Nyalakan Suara'}
            className="p-2 rounded-lg bg-slate-900 border border-slate-700 text-slate-300 hover:text-white hover:bg-slate-800 transition-colors"
            title={soundEnabled ? 'Efek Suara Aktif (Klik untuk Mematikan)' : 'Efek Suara Mati (Klik untuk Menyalakan)'}
          >
            {soundEnabled ? (
              <Volume2 className="w-4 h-4 text-emerald-400" />
            ) : (
              <VolumeX className="w-4 h-4 text-slate-500" />
            )}
          </button>

          {/* Guide Modal Button */}
          <button
            onClick={onOpenGuide}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-900 border border-slate-700 text-xs font-medium text-slate-200 hover:bg-slate-800 hover:text-white transition-colors"
          >
            <HelpCircle className="w-3.5 h-3.5 text-amber-400" />
            <span>Panduan & Info</span>
          </button>
        </div>
      </div>

      {/* Stage Navigation Tabs */}
      <div className="border-t border-slate-800/80 bg-slate-900/50 px-4 sm:px-6 py-1.5 overflow-x-auto">
        <div className="max-w-7xl mx-auto flex items-center justify-start sm:justify-center gap-1 min-w-max">
          {stages.map((stage) => {
            const isActive = currentStage === stage.id;
            return (
              <button
                key={stage.id}
                onClick={() => onSelectStage(stage.id)}
                className={`flex items-center gap-2 px-3 py-1.5 text-xs font-semibold rounded-lg transition-all ${
                  isActive
                    ? 'bg-red-600 text-white shadow-md shadow-red-950/40'
                    : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/60'
                }`}
              >
                {stage.icon}
                <span>{stage.label}</span>
              </button>
            );
          })}
        </div>
      </div>
    </header>
  );
};
