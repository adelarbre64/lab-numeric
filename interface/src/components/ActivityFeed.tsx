import { useEffect, useState } from 'react';

const SITES = ['PARIS', 'BERLIN', 'TOKYO', 'GENÈVE', 'NAIROBI', 'QUITO', 'OSLO', 'TUNIS'];
const EVENTS = [
  'Handshake TLS établi — nœud relay-7',
  'Paquet intercepté — analyse heuristique OK',
  'Rotation des clés effectuée',
  'Beacon source détecté — canal furtif',
  'Mise à jour des règles IDS poussée',
  'Tunnel chiffré renégocié',
  'Sync miroir inter-agences terminée',
  'Scan de ports silencieux bloqué',
];

/** Flux d'activité réseau, mis à jour périodiquement. */
export function ActivityFeed() {
  const [feed, setFeed] = useState<{ id: number; site: string; event: string }[]>(() =>
    Array.from({ length: 6 }, (_, i) => ({
      id: i,
      site: SITES[i % SITES.length],
      event: EVENTS[i % EVENTS.length],
    })),
  );

  useEffect(() => {
    let next = 6;
    const id = window.setInterval(() => {
      setFeed((prev) => {
        const entry = {
          id: next++,
          site: SITES[next % SITES.length],
          event: EVENTS[next % EVENTS.length],
        };
        return [entry, ...prev].slice(0, 6);
      });
    }, 2500);
    return () => window.clearInterval(id);
  }, []);

  return (
    <section className="panel">
      <h2 className="panel__title">Flux d’activité</h2>
      <ul className="feed">
        {feed.map((f) => (
          <li key={f.id} className="feed__item">
            <span className="feed__site">[{f.site}]</span> {f.event}
          </li>
        ))}
      </ul>
    </section>
  );
}
