import { useEffect, useMemo, useState } from 'react';
import { useTypewriter } from '../hooks/useTypewriter';
import type { MissionStep } from '../types/mission';

interface TerminalProps {
  step: MissionStep | null;
  /** Message spécial (fin de mission, briefing…) ou null */
  intro: string[] | null;
  stepIndex: number;
  totalSteps: number;
}

/**
 * Terminal central : raconte l'enquête et affiche les consignes
 * étape par étape, avec un effet de frappe.
 */
export function Terminal({ step, intro, stepIndex, totalSteps }: TerminalProps) {
  const [showHint, setShowHint] = useState(false);

  // Réinitialise l'indice à chaque changement d'étape
  useEffect(() => setShowHint(false), [step?.id, intro]);

  const lines = useMemo(() => {
    if (intro) return intro;
    if (!step) return [];
    return [
      `┌─ ÉTAPE ${step.id} / ${String(totalSteps).padStart(2, '0')} — ${step.title}`,
      ...step.prompt.map((p) => `│ ${p}`),
      '└─ Fin des consignes. Reportez le code obtenu dans le champ ci-dessous.',
    ];
  }, [intro, step, totalSteps]);

  const { visible, done } = useTypewriter(lines);

  return (
    <section className="terminal" aria-live="polite">
      <div className="terminal__head">
        <span className="terminal__dot terminal__dot--red" />
        <span className="terminal__dot terminal__dot--yellow" />
        <span className="terminal__dot terminal__dot--green" />
        <span className="terminal__title">
          agent@dgse-lab: ~/mission{step ? `/${step.id}` : ''}
        </span>
        {step && (
          <span className="terminal__progress">
            ÉTAPE {stepIndex + 1}/{totalSteps}
          </span>
        )}
      </div>
      <div className="terminal__body">
        {lines.map((line, i) => {
          const shown = visible[i] ?? '';
          return (
            <p key={i} className="terminal__line">
              {shown}
              {shown.length < line.length && <span className="terminal__cursor" />}
            </p>
          );
        })}
        {done && (
          <p className="terminal__line terminal__line--ready">
            <span className="terminal__prompt">$</span> En attente de votre code, agent…
          </p>
        )}
        {done && step && !showHint && (
          <button type="button" className="terminal__hint-btn" onClick={() => setShowHint(true)}>
            [ Demander un indice ]
          </button>
        )}
        {showHint && step && <p className="terminal__line terminal__line--hint">{step.hint}</p>}
      </div>
    </section>
  );
}
