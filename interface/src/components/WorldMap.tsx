import { useEffect, useState } from 'react';

/** Localisation fictive qui change périodiquement (position "de la source"). */
export function WorldMap() {
  const [pin, setPin] = useState({ x: 46, y: 38 });
  const [label, setLabel] = useState('SECTEUR 04 — CONTACT ÉTABLI');

  useEffect(() => {
    const id = window.setInterval(() => {
      setPin({ x: 15 + Math.random() * 70, y: 20 + Math.random() * 50 });
      setLabel('RELOCALISATION — SOURCES MULTIPLES');
    }, 9000);
    return () => window.clearInterval(id);
  }, []);

  return (
    <section className="panel">
      <h2 className="panel__title">Géolocalisation</h2>
      <div className="map">
        {/* Carte du monde simplifiée en pointillés */}
        <svg viewBox="0 0 100 60" className="map__svg" role="img" aria-label="Carte du monde">
          <defs>
            <pattern id="dots" width="2.2" height="2.2" patternUnits="userSpaceOnUse">
              <circle cx="1.1" cy="1.1" r="0.45" fill="rgba(94, 234, 212, 0.35)" />
            </pattern>
          </defs>
          {/* Silhouettes très approximatives des continents */}
          <ellipse cx="20" cy="22" rx="14" ry="11" fill="url(#dots)" />
          <ellipse cx="30" cy="42" rx="8" ry="12" fill="url(#dots)" />
          <ellipse cx="52" cy="18" rx="16" ry="9" fill="url(#dots)" />
          <ellipse cx="55" cy="38" rx="10" ry="13" fill="url(#dots)" />
          <ellipse cx="78" cy="24" rx="14" ry="10" fill="url(#dots)" />
          <ellipse cx="84" cy="44" rx="6" ry="5" fill="url(#dots)" />
        </svg>
        <span
          className="map__pin"
          style={{ left: `${pin.x}%`, top: `${pin.y}%` }}
          aria-hidden="true"
        />
      </div>
      <p className="map__label">{label}</p>
    </section>
  );
}
