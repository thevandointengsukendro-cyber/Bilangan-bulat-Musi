import React, { useState } from 'react';
import { Navbar } from './components/Navbar';
import { ContextStage } from './components/ContextStage';
import { SimulationStage } from './components/SimulationStage';
import { SymbolicStage } from './components/SymbolicStage';
import { ComparisonStage } from './components/ComparisonStage';
import { ChallengeQuiz } from './components/ChallengeQuiz';
import { GuideModal } from './components/GuideModal';
import { LearningStage } from './types';
import { sound } from './utils/audio';

export default function App() {
  const [currentStage, setCurrentStage] = useState<LearningStage>('context');
  const [soundEnabled, setSoundEnabled] = useState<boolean>(true);
  const [isGuideOpen, setIsGuideOpen] = useState<boolean>(false);

  const handleToggleSound = () => {
    const newState = !soundEnabled;
    setSoundEnabled(newState);
    sound.enabled = newState;
    if (newState) {
      sound.playWaterSplash();
    }
  };

  const handleStageChange = (stage: LearningStage) => {
    sound.playClick();
    setCurrentStage(stage);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col font-sans selection:bg-red-500 selection:text-white">
      {/* Navigation Header */}
      <Navbar
        currentStage={currentStage}
        onSelectStage={handleStageChange}
        soundEnabled={soundEnabled}
        onToggleSound={handleToggleSound}
        onOpenGuide={() => setIsGuideOpen(true)}
      />

      {/* Main Learning Stage Container */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 py-6 sm:py-8">
        {currentStage === 'context' && (
          <ContextStage onContinue={() => handleStageChange('simulation')} />
        )}

        {currentStage === 'simulation' && (
          <SimulationStage onContinue={() => handleStageChange('symbolic')} />
        )}

        {currentStage === 'symbolic' && (
          <SymbolicStage onContinue={() => handleStageChange('comparison')} />
        )}

        {currentStage === 'comparison' && (
          <ComparisonStage onContinue={() => handleStageChange('quiz')} />
        )}

        {currentStage === 'quiz' && (
          <ChallengeQuiz />
        )}
      </main>

      {/* Pedagogical & Context Guide Modal */}
      <GuideModal
        isOpen={isGuideOpen}
        onClose={() => setIsGuideOpen(false)}
      />

      {/* Footer */}
      <footer className="border-t border-slate-900 bg-slate-950/80 py-6 px-4 sm:px-6 mt-auto">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-slate-400">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-red-600" />
            <span className="font-medium text-slate-300">
              Media Pembelajaran Interaktif Bilangan Bulat · Konteks Sungai Musi Palembang
            </span>
          </div>

          <div className="flex items-center gap-4 text-slate-400">
            <span>Jembatan Ampera · Peil Schaal · Benteng Kuto Besak</span>
          </div>
        </div>
      </footer>
    </div>
  );
}
