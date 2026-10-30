import { useEffect, useRef } from 'react';

/**
 * Fond de page "dynamique" : canvas plein écran avec
 * - une grille perspective,
 * - des particules (flux de données) qui dérivent,
 * - un léger balayage radar.
 * Dessiné sur requestAnimationFrame, léger en CPU.
 */
export function DynamicBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);
    let frame = 0;
    let raf = 0;

    interface Particle {
      x: number; y: number; vx: number; vy: number; size: number; alpha: number;
    }
    const particles: Particle[] = Array.from({ length: 60 }, () => ({
      x: Math.random() * width,
      y: Math.random() * height,
      vx: (Math.random() - 0.5) * 0.4,
      vy: (Math.random() - 0.5) * 0.4,
      size: Math.random() * 1.8 + 0.4,
      alpha: Math.random() * 0.5 + 0.1,
    }));

    const onResize = () => {
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };
    window.addEventListener('resize', onResize);

    const draw = () => {
      frame += 1;
      ctx.clearRect(0, 0, width, height);

      // Grille
      ctx.strokeStyle = 'rgba(45, 212, 191, 0.05)';
      ctx.lineWidth = 1;
      const gap = 48;
      const offset = (frame * 0.25) % gap;
      for (let x = -gap + offset; x < width + gap; x += gap) {
        ctx.beginPath();
        ctx.moveTo(x, 0);
        ctx.lineTo(x, height);
        ctx.stroke();
      }
      for (let y = -gap + offset; y < height + gap; y += gap) {
        ctx.beginPath();
        ctx.moveTo(0, y);
        ctx.lineTo(width, y);
        ctx.stroke();
      }

      // Particules (flux de données)
      particles.forEach((p) => {
        p.x += p.vx;
        p.y += p.vy;
        if (p.x < 0 || p.x > width) p.vx *= -1;
        if (p.y < 0 || p.y > height) p.vy *= -1;
        ctx.fillStyle = `rgba(94, 234, 212, ${p.alpha})`;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fill();
      });

      // Balayage vertical (scintillement type radar)
      const sweepY = ((frame * 2) % (height + 200)) - 100;
      const gradient = ctx.createLinearGradient(0, sweepY - 100, 0, sweepY + 100);
      gradient.addColorStop(0, 'rgba(45, 212, 191, 0)');
      gradient.addColorStop(0.5, 'rgba(45, 212, 191, 0.035)');
      gradient.addColorStop(1, 'rgba(45, 212, 191, 0)');
      ctx.fillStyle = gradient;
      ctx.fillRect(0, sweepY - 100, width, 200);

      raf = requestAnimationFrame(draw);
    };

    draw();
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener('resize', onResize);
    };
  }, []);

  return <canvas ref={canvasRef} className="bg-dynamic" aria-hidden="true" />;
}
