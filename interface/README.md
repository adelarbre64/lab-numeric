# lab-numeric — Interface (Vite + React)

Interface web de l'escape game numérique **Lab-Numéric**.
Thème : un apprenti agent informatique à la DGSE découvre les
commandes de base Linux (`cd`, `cat`, `find`, `which`, `chown`, `chmod`, `su`…)
au travers d'une enquête pas à pas.

## Écran

- **Panneaux périphériques** : état des systèmes, flux d'activité réseau,
  horloge UTC, carte avec localisation fictive, trafic réseau planétaire.
- **Centre** : un terminal animé (effet machine à écrire) qui raconte
  l'enquête et affiche les consignes étape par étape.
- **Bas du terminal** : champ de saisie du code obtenu dans l'environnement
  Linux pour débloquer l'étape suivante.
- **Fond dynamique** : grille, particules et balayage radar dessinés sur canvas.

## Structure du projet

```
interface/
├── Dockerfile          # build multi-stage (Node -> nginx)
├── nginx.conf           # service web de l'image finale
├── index.html
├── package.json
├── vite.config.ts
└── src/
    ├── App.tsx                      # écran de commandement (état de la mission)
    ├── main.tsx                     # point d'entrée React
    ├── styles/global.css            # thème "poste de commandement"
    ├── types/mission.ts            # types Mission / MissionStep
    ├── data/missions.ts             # contenus des missions (briefing, étapes, codes)
    ├── hooks/
    │   ├── useTypewriter.ts        # effet machine à écrire
    │   └── useUtcClock.ts          # horloge UTC
    └── components/
        ├── DynamicBackground.tsx   # fond animé (canvas)
        ├── StatusBar.tsx           # barre supérieure
        ├── SystemStatus.tsx        # état des systèmes
        ├── ActivityFeed.tsx        # flux d'activité
        ├── ClockPanel.tsx          # horloge
        ├── WorldMap.tsx            # carte + localisation fictive
        ├── NetworkTraffic.tsx      # trafic réseau (canvas)
        ├── Terminal.tsx            # terminal central
        └── CodeInput.tsx           # saisie du code
```

## Développement local

```bash
cd interface
npm install
npm run dev        # http://localhost:5173
```

## Build et exécution avec Docker

L'image copie les sources, les compile, puis sert le site compilé
avec nginx : au lancement du conteneur, le site est accessible localement.

```bash
docker build -t lab-numeric-interface ./interface
docker run --rm -p 8080:80 lab-numeric-interface
# -> http://localhost:8080
```

## Missions

Les missions sont définies dans `src/data/missions.ts` :
chaque étape possède une consigne, un indice et le code attendu
(insensible à la casse). Ajouter une mission = ajouter un objet `Mission`.

**Mission 01 — « La note cryptée »** : l'apprenti se connecte en `root`,
localise le document chiffré (`find`), constate qu'il est illisible (`cat`),
retrouve le script derrière la commande personnalisée `decrypt-note` (`which`),
trouve les logs, diagnostique un problème de permissions, corrige avec
`chown` et `chmod`, relance le décryptage en tant qu'`agent` (`su`)
et lit le code final dans la note décryptée.

> L'environnement Linux (conteneur avec les users `root`/`agent`, le document,
> le script et les logs) sera fourni par une seconde image, à venir.
