/** Une étape d'une mission, à valider avec un code obtenu dans le terminal Linux. */
export interface MissionStep {
  /** Identifiant court, affiché dans le terminal (ex: "01") */
  id: string;
  /** Titre de l'étape affiché en en-tête */
  title: string;
  /** Consigne racontée à l'apprenti, affichée ligne par ligne */
  prompt: string[];
  /** Indice complémentaire dévoilable */
  hint: string;
  /** Code attendu pour débloquer l'étape suivante (insensible à la casse) */
  expectedCode: string;
}

/** Une mission complète de l'escape game. */
export interface Mission {
  /** Identifiant de la mission (ex: "M01") */
  id: string;
  /** Nom de code de la mission */
  codename: string;
  /** Titre affiché */
  title: string;
  /** Briefing initial (lignes racontées par le terminal) */
  briefing: string[];
  /** Étapes successives */
  steps: MissionStep[];
}
