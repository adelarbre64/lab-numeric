import { useEffect, useRef, useState } from 'react';

/**
 * Effet "machine à écrire" : révèle les lignes d'un tableau
 * caractère par caractère, puis passe à la ligne suivante.
 */
export function useTypewriter(
  lines: string[],
  { charDelay = 18, lineDelay = 320 }: { charDelay?: number; lineDelay?: number } = {},
) {
  const [visible, setVisible] = useState<string[]>([]);
  const [done, setDone] = useState(false);
  const timers = useRef<number[]>([]);

  useEffect(() => {
    setVisible([]);
    setDone(false);
    timers.current.forEach(clearTimeout);
    timers.current = [];

    let acc = 0;
    const schedule = (fn: () => void, delay: number) => {
      acc += delay;
      timers.current.push(window.setTimeout(fn, acc));
    };

    lines.forEach((line, i) => {
      const chars = line.split('');
      for (let c = 1; c <= chars.length; c++) {
        schedule(() => {
          setVisible((prev) => {
            const next = [...prev];
            next[i] = chars.slice(0, c).join('');
            return next;
          });
        }, charDelay);
      }
      schedule(() => {
        setVisible((prev) => {
          const next = [...prev];
          next[i] = line;
          return next;
        });
      }, 0);
    });

    schedule(() => setDone(true), lineDelay);

    return () => {
      timers.current.forEach(clearTimeout);
      timers.current = [];
    };
  }, [lines, charDelay, lineDelay]);

  return { visible, done };
}
