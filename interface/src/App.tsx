import { useMemo, useState } from 'react';
import { MISSIONS, MISSION_COMPLETE_LINES } from './data/missions';
import { DynamicBackground } from './components/DynamicBackground';
import { StatusBar } from './components/StatusBar';
import { SystemStatus } from './components/SystemStatus';
import { ActivityFeed } from './components/ActivityFeed';
import { ClockPanel } from './components/ClockPanel';
import { WorldMap } from './components/WorldMap';
import { NetworkTraffic } from './components/NetworkTraffic';
import { Terminal } from './components/Terminal';
import { CodeInput } from './components/CodeInput';

/**
 * Écran de commandement : l'apprenti y lit les consignes de sa mission
 * et saisit les codes débloqués dans l'environnement Linux.
 */
export default function App() {
  const mission = MISSIONS[0];
  const [stepIndex, setStepIndex] = useState(-1); // -1 = briefing
  const [completed, setCompleted] = useState(false);

  const step = stepIndex >= 0 && stepIndex < mission.steps.length ? mission.steps[stepIndex] : null;
  const intro = useMemo(
    () =>
      completed
        ? MISSION_COMPLETE_LINES
        : stepIndex === -1
          ? [...mission.briefing, 'Saisissez « DÉBUT » pour accepter la mission.']
          : null,
    [completed, stepIndex, mission.briefing],
  );

  const handleCode = (code: string): boolean => {
    const normalized = code.trim().toLowerCase();

    // Briefing : la mission démarre
    if (stepIndex === -1) {
      if (normalized === 'début' || normalized === 'debut') {
        setStepIndex(0);
        return true;
      }
      return false;
    }

    // Fin de mission déjà atteinte
    if (completed) return false;

    const current = mission.steps[stepIndex];
    if (!current) return false;

    if (normalized === current.expectedCode.toLowerCase()) {
      if (stepIndex + 1 < mission.steps.length) {
        setStepIndex(stepIndex + 1);
      } else {
        setCompleted(true);
      }
      return true;
    }
    return false;
  };

  return (
    <div className="app">
      <DynamicBackground />
      <StatusBar agent="ADELARBE-64" mission={mission.codename} />

      <main className="layout">
        <aside className="layout__side layout__side--left">
          <SystemStatus />
          <ActivityFeed />
        </aside>

        <div className="layout__center">
          <Terminal step={step} intro={intro} stepIndex={stepIndex} totalSteps={mission.steps.length} />
          <CodeInput onCode={handleCode} disabled={completed} />
        </div>

        <aside className="layout__side layout__side--right">
          <ClockPanel />
          <WorldMap />
          <NetworkTraffic />
        </aside>
      </main>

      <footer className="footer">
        LAB-NUMÉRIC — Système d’entraînement interne. Toute ressemblance avec une agence
        existante serait fortuite.
      </footer>
    </div>
  );
}
