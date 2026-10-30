import { useEffect, useRef } from 'react';

/**
 * Trafic réseau planétaire : graphe animé (débit entrant/sortant),
 * dessiné sur un canvas.
 */
export function NetworkTraffic() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let raf = 0;
    const history: number[] = Array.from({ length: 80 }, () => Math.random() * 0.4 + 0.2);

    const draw = () => {
      history.push(Math.min(1, Math.random() * 0.7 + 0.25));
      history.shift();

      const { width, height } = canvas;
      ctx.clearRect(0, 0, width, height);

      ctx.strokeStyle = 'rgba(94, 234, 212, 0.9)';
      ctx.lineWidth = 1.5;
      ctx.beginPath();
      history.forEach((v, i) => {
        const x = (i / (history.length - 1)) * width;
        const y = height - v * height;
        if (i === 0) ctx.moveTo(x, y);
        else ctx.lineTo(x, y);
      });
      ctx.stroke();

      // Grille horizontale
      ctx.strokeStyle = 'rgba(94, 234, 212, 0.12)';
      [0.25, 0.5, 0.75].forEach((r) => {
        ctx.beginPath();
        ctx.moveTo(0, height * r);
        ctx.lineTo(width, height * r);
        ctx.stroke();
      });

      raf = requestAnimationFrame(draw);
    };
    draw();
    return () => cancelAnimationFrame(raf);
  }, []);

  return (
    <section className="panel">
      <h2 className="panel__title">Trafic réseau planétaire</h2>
      <canvas ref={canvasRef} className="traffic" width={280} height={90} />
      <p className="traffic__legend">▼ entrant &nbsp;&nbsp; ▲ sortant</p>
    </section>
  );
}
