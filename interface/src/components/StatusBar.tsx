import { useUtcClock } from '../hooks/useUtcClock';

/** Barre supérieure : identité du poste et statut de connexion. */
export function StatusBar({ agent, mission }: { agent: string; mission: string }) {
  const { time, date } = useUtcClock();

  return (
    <header className="status-bar">
      <div className="status-bar__brand">
        <span className="status-bar__logo">◈</span>
        <span className="status-bar__title">LAB-NUMÉRIC // PC-01</span>
        <span className="status-bar__badge">SECRET — DIFFUSION RESTREINTE</span>
      </div>
      <div className="status-bar__info">
        <span>AGENT : <b>{agent}</b></span>
        <span>MISSION : <b>{mission}</b></span>
        <span className="status-bar__clock">
          {date} — {time} UTC
        </span>
      </div>
    </header>
  );
}
