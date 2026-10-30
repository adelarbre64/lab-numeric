# lab-numeric — Environnement Linux (mission 01)

Image de l'environnement de manipulation de l'apprenti.
Elle contient tout le décor de la mission « La note cryptée » :

| Élément | Emplacement | Permissions initiales |
|---|---|---|
| Utilisateur `root` | — | le compte de connexion de l'apprenti |
| Utilisateur `agent` | uid 1001, `/home/agent` | décrypteur habilité |
| Note cryptée | `/srv/datas/note_1773.dat` | `root:root` **600** (illisible par agent) |
| Commande personnalisée | `/usr/local/bin/decrypt-note` | 755 |
| Journal de décryptage | `/var/log/decrypt/note.log` | `root:root` **600** |
| Message décrypté (après mission) | `/srv/datas/note_1773.dec` | créé par `decrypt-note` |

## Comportements clés (scénario)

- La bannière de connexion **root** affiche le code d'activation `ROOT-DSI`.
- `decrypt-note` reste **silencieux** : il n'affiche jamais rien sur la console,
  tout est journalisé dans `/var/log/decrypt/note.log`.
- Lancé en tant que `root` → journalise `[PERM-DENIED]` (politique de moindre privilège).
- Lancé en tant que `agent` sans droits de lecture sur la note → journalise
  `[PERM-DENIED]`.
- Une fois `chown agent:agent` + `chmod 640` effectués et relancé en tant que
  `agent` → décrypte la note dans `/srv/datas/note_1773.dec` et journalise
  `[DEC-OK]`.

## Build et utilisation

```bash
# Depuis la racine du dépôt, avec docker compose :
docker compose build lab
docker compose run --rm lab

# Ou en direct :
docker build -t lab-numeric-env ./env
docker run -it --rm lab-numeric-env
```

L'apprenti arrive sur un shell **root**. Il travaille dedans avec
`find`, `cat`, `which`, `chown`, `chmod`, `su`, puis le code final
(`DGSE-2468`) est saisi dans l'interface web (conteneur `interface`).
