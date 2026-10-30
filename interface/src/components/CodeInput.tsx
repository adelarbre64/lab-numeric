import { useState } from 'react';
import type { FormEvent } from 'react';

interface CodeInputProps {
  onCode: (code: string) => void;
  disabled?: boolean;
}

/**
 * Champ de saisie du code de validation d'étape.
 * Affiche un retour visuel en cas de code refusé.
 */
export function CodeInput({ onCode, disabled = false }: CodeInputProps) {
  const [value, setValue] = useState('');
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (!value.trim()) return;
    const ok = onCode(value.trim());
    if (ok) {
      setValue('');
      setError(null);
    } else {
      setError('CODE REFUSÉ — Accès non autorisé. Vérifiez votre manipulation.');
    }
  };

  return (
    <form className="code-input" onSubmit={handleSubmit}>
      <label className="code-input__label" htmlFor="mission-code">
        &gt; Code d’accès :
      </label>
      <input
        id="mission-code"
        className="code-input__field"
        type="text"
        autoComplete="off"
        spellCheck={false}
        placeholder="SAISIR LE CODE ICI"
        value={value}
        disabled={disabled}
        onChange={(e) => {
          setValue(e.target.value);
          setError(null);
        }}
      />
      <button className="code-input__submit" type="submit" disabled={disabled}>
        VALIDER
      </button>
      {error && <p className="code-input__error" role="alert">{error}</p>}
    </form>
  );
}
