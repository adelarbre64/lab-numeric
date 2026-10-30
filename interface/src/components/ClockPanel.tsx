import { useUtcClock } from '../hooks/useUtcClock';

/** Horloge UTC + coordonnées fictives, panneau de droite. */
export function ClockPanel() {
  const { time, date } = useUtcClock();
  return (
    <section className="panel">
      <h2 className="panel__title">Horloge opérationnelle</h2>
      <p className="clock">
        <span className="clock__time">{time}</span>
        <span className="clock__tz">UTC</span>
      </p>
      <p className="clock__date">{date}</p>
    </section>
  );
}
