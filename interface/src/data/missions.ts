import type { Mission } from '../types/mission';

/**
 * Données de mission.
 * Mission 01 : découverte des commandes de base Linux
 * (find, cat, which, chown, chmod, su) au travers de l'enquête
 * sur la note cryptée.
 *
 * Chaque étape est validée par un code que l'apprenti obtient
 * en manipulant le conteneur Linux (à venir : image "environnement").
 */
export const MISSIONS: Mission[] = [
  {
    id: 'M01',
    codename: 'OPÉRATION NERVI',
    title: 'La note cryptée',
    briefing: [
      'POSTE DE COMMANDEMENT — DGSE / DIRECTION TECHNIQUE',
      'Agent, bienvenue sur votre poste.',
      'Une de nos sources vous a transmis une note sur un canal sécurisé.',
      'Elle est arrivée CHIFFRÉE. Notre outil interne "decrypt-note" est '
        + 'censé la décoder automatiquement.',
      'Problème : le décryptage ne répond plus. Aucun message, aucune erreur.',
      'À vous de mener l’enquête. Suivez les étapes, une par une.',
    ],
    steps: [
      {
        id: '01',
        title: 'Prise de poste',
        prompt: [
          'Ouvrez votre terminal Linux et connectez-vous en tant que ROOT.',
          "Le message d'accueil du système affiche un code d'activation.",
          'Saisissez-le ci-dessous pour commencer la mission.',
        ],
        hint: 'Indice : le message de bienvenue de root commence par "ROOT-"…',
        expectedCode: 'ROOT-DSI',
      },
      {
        id: '02',
        title: 'Localiser la note',
        prompt: [
          'La note est stockée quelque part dans le système de fichiers.',
          'Utilisez la commande FIND pour localiser le document reçu de la source.',
          'Le fichier porte une extension ".dat".',
          'Validez avec le nom exact du fichier trouvé.',
        ],
        hint: 'Indice : find / -name "*.dat" 2>/dev/null',
        expectedCode: 'note_1773.dat',
      },
      {
        id: '03',
        title: 'Ouvrir la note',
        prompt: [
          'Affichez le contenu du document avec CAT.',
          'Constatez par vous-même : il est illisible, entièrement chiffré.',
          'Le terminal affiche alors un marqueur d’erreur cryptographique.',
          'Reportez ce marqueur ci-dessous.',
        ],
        hint: 'Indice : cat <chemin du fichier> — cherchez une ligne [CRYPT-…]',
        expectedCode: 'CRYPT-ERR',
      },
      {
        id: '04',
        title: 'Trouver le script de décryptage',
        prompt: [
          'La commande DECRYPT-NOTE est une commande personnalisée : '
            + 'c’est un script installé sur le système.',
          'Utilisez WHICH pour savoir où ce script est stocké.',
          'Validez avec son chemin complet.',
        ],
        hint: 'Indice : which decrypt-note',
        expectedCode: '/usr/local/bin/decrypt-note',
      },
      {
        id: '05',
        title: 'Lire le script',
        prompt: [
          'Ouvrez le script avec CAT pour comprendre son fonctionnement.',
          'Vous y découvrirez où le script écrit ses JOURNALISATIONS (logs).',
          'Validez avec le chemin complet du fichier de logs.',
        ],
        hint: 'Indice : cat /usr/local/bin/decrypt-note — cherchez la variable LOG_FILE',
        expectedCode: '/var/log/decrypt/note.log',
      },
      {
        id: '06',
        title: 'Consulter les logs',
        prompt: [
          'Affichez les logs du décryptage avec CAT.',
          'Surprise : "Permission denied". Le décryptage échoue silencieusement '
            + 'à cause d’un problème de PERMISSIONS.',
          'Notez le marqueur affiché par le système pour refus d’accès.',
        ],
        hint: 'Indice : cat /var/log/decrypt/note.log — lisez le message d’erreur',
        expectedCode: 'PERM-DENIED',
      },
      {
        id: '07',
        title: 'Rendre le fichier au bon propriétaire',
        prompt: [
          'Le document appartient à root, alors que l’agent décrypteur AGENT '
            + 'doit pouvoir y accéder.',
          'Utilisez CHOWN pour donner la propriété du document à l’utilisateur agent.',
          'Validez avec le marqueur de confirmation affiché dans les logs.',
        ],
        hint: 'Indice : chown agent:agent <chemin du document>',
        expectedCode: 'CHOWN-OK',
      },
      {
        id: '08',
        title: 'Ajuster les droits',
        prompt: [
          'Le propriétaire peut maintenant lire, mais il manque le droit '
            + 'd’écriture pour la journalisation.',
          'Utilisez CHMOD pour positionner les droits : lecture + écriture '
            + 'pour le propriétaire, lecture pour le groupe.',
          'Validez avec le marqueur de confirmation des logs.',
        ],
        hint: 'Indice : chmod 640 <chemin du document>',
        expectedCode: 'CHMOD-OK',
      },
      {
        id: '09',
        title: 'Changer d’identité',
        prompt: [
          'Le décryptage doit être lancé par l’utilisateur AGENT, pas par root.',
          'Utilisez SU pour prendre l’identité de l’agent, puis relancez DECRYPT-NOTE.',
          'Validez avec le marqueur de succès affiché.',
        ],
        hint: 'Indice : su agent -c decrypt-note',
        expectedCode: 'DEC-OK',
      },
      {
        id: '10',
        title: 'Lecture finale',
        prompt: [
          'Le document est désormais lisible : affichez-le une dernière fois avec CAT.',
          'La source vous y livre un message… et surtout UN CODE D’ACCÈS.',
          'Saisissez ce code ci-dessous : la mission sera validée.',
        ],
        hint: 'Indice : le code de la note est au format DGSE-XXXX',
        expectedCode: 'DGSE-2468',
      },
    ],
  },
];

/** Message de félicitations après validation d'une mission. */
export const MISSION_COMPLETE_LINES = [
  '╔══════════════════════════════════════════╗',
  '║   MISSION ACCOMPLIE — FÉLICITATIONS !    ║',
  '╚══════════════════════════════════════════╝',
  'Direction générale vous note favorablement, agent.',
  'Prochaine mission en cours de préparation…',
];
