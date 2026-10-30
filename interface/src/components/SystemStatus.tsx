import { useEffect, useState } from 'react';

interface System {
  name: string;
  load: number;
}

const SYSTEMS: System[] = [
  { name: 'SATCOM-1', load: 0.62 },
  { name: 'SATCOM-2', load: 0.41 },
  { name: 'FIREWALL-DMZ', load: 0.73 },
  { name: 'VPN-INTERNE', load: 0.35 },
  { name: 'ARCHIVES', load: 0.28 },
];

/** Panneau d'état des systèmes : charge simulée légèrement fluctuante. */
export function SystemStatus() {
  const [loads, setLoads] = useState<number[]>(SYSTEMS.map((s) => s.load));

  useEffect(() => {
    const id = window.setInterval(() => {
      setLoads((prev) =>
        prev.map((l) => Math.min(0.98, Math.max(0.05, l + (Math.random() - 0.5) * 0.08))),
      );
    }, 1500);
    return () => window.clearInterval(id);
  }, []);

  return (
    <section className="panel">
      <h2 className="panel__title">État des systèmes</h2>
      <ul className="system-list">
        {SYSTEMS.map((s, i) => (
          <li key={s.name} className="system-list__item">
            <span className="system-list__name">{s.name}</span>
            <span className="system-list__bar">
              <span
                className="system-list__fill"
                style={{ width: `${loads[i] * 100}%` }}
              />
            </span>
            <span className="system-list__value">{Math.round(loads[i] * 100)}%</span>
          </li>
        ))}
      </ul>
    </section>
  );
}
