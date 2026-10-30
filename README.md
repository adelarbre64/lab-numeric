# lab-numeric

Escape game numérique pour apprenti agent informatique à la DGSE.
Deux images Docker :

- **`interface/`** — écran de commandement web (Vite + React) : terminal animé
  avec les consignes étape par étape + champ de saisie des codes.
  Voir [interface/README.md](interface/README.md).
- **`env/`** — environnement Linux de manipulation (users `root`/`agent`,
  note cryptée, commande `decrypt-note`, logs) pour la mission 01.
  Voir [env/README.md](env/README.md).

## Lancer l'escape game complet

```bash
docker compose up -d interface      # écran de commandement -> http://localhost:8080
docker compose run --rm lab         # terminal Linux de l'apprenti (shell root)
```

## Déroulé de la mission 01 — « La note cryptée »

1. Connexion en `root` → code d'activation dans la bannière (`ROOT-DSI`).
2. `find` → localiser `/srv/datas/note_1773.dat`.
3. `cat` → note illisible, marqueur `[CRYPT-ERR]`.
4. `which decrypt-note` → `/usr/local/bin/decrypt-note`.
5. `cat` du script → découvrir le fichier de logs `/var/log/decrypt/note.log`.
6. `cat` des logs → `[PERM-DENIED]` : problème de permissions silencieux.
7. `chown agent:agent` → vérifier le nouveau propriétaire (`stat -c '%U'`).
8. `chmod 640` → vérifier les droits (`stat -c '%a'`).
9. `su agent` puis relancer `decrypt-note` → `[DEC-OK]` dans les logs.
10. `cat /srv/datas/note_1773.dec` → message de la source + code `DGSE-2468`,
    à saisir dans l'interface pour valider la mission.

## Ajouter une mission

1. Ajouter un objet `Mission` dans `interface/src/data/missions.ts`
   (briefing, étapes, indices, codes attendus).
2. Préparer le décor correspondant dans une nouvelle image ou dans `env/`.
