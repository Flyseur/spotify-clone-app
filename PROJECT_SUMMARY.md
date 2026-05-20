# MySpot Music - Projet d'application de streaming musical personnel

## ✅ Ce qui a été créé

### Structure du projet React Native + Expo

```
myspot_music/
├── src/
│   ├── assets/
│   │   └── images/          # Placeholders pour les icônes
│   ├── components/          # Composants UI réutilisables
│   │   ├── SongCard.tsx     # Carte de chanson
│   │   ├── MiniPlayer.tsx   # Mini lecteur flottant
│   │   ├── PlaylistCard.tsx # Carte de playlist
│   │   ├── SectionHeader.tsx# En-tête de section
│   │   └── index.ts
│   ├── screens/             # Écrans principaux
│   │   ├── Splashscreen.tsx # Écran de chargement
│   │   ├── HomeScreen.tsx   # Page d'accueil
│   │   └── index.ts
│   ├── services/            # Services et logique métier
│   │   ├── musicStore.ts    # Store Zustand (état global)
│   │   ├── musicLibrary.ts  # Service de bibliothèque musicale
│   │   └── playerService.ts # Service de lecture audio
│   ├── types/               # Types TypeScript
│   │   └── index.ts
│   ├── utils/               # Utilitaires
│   │   ├── constants.ts     # Couleurs, spacing, etc.
│   │   └── theme.ts         # Configuration du thème
│   └── AppContent.tsx       # Composant principal
├── App.tsx                  # Point d'entrée
├── app.json                 # Configuration Expo
├── package.json             # Dépendances
├── tsconfig.json            # Configuration TypeScript
├── babel.config.js          # Configuration Babel
└── README.md                # Documentation
```

### Technologies utilisées

- **React Native** avec **Expo SDK 52**
- **TypeScript** pour le typage statique
- **Zustand** pour la gestion d'état global
- **react-native-track-player** pour la lecture audio avancée
- **expo-media-library** pour l'accès à la bibliothèque musicale locale

### Fonctionnalités implémentées

#### 1. **Types et Interfaces** (`src/types/index.ts`)
- `Song`, `Album`, `Artist`, `Playlist`
- `PlayerState` avec tous les états du lecteur
- `RepeatMode` pour les modes de répétition

#### 2. **Design System** (`src/utils/constants.ts`)
- Couleurs inspirées de Spotify (#121212, #1DB954)
- Système de spacing cohérent
- Rayons de bordure standardisés
- Tailles de police définies

#### 3. **Gestion d'état** (`src/services/musicStore.ts`)
- Store Zustand complet
- Actions pour le lecteur (play, pause, next, previous)
- Gestion de la file de lecture
- Système de favoris
- CRUD complet pour les playlists

#### 4. **Service de bibliothèque musicale** (`src/services/musicLibrary.ts`)
- Demande de permissions
- Scan automatique des fichiers audio locaux
- Regroupement par album et artiste
- Extraction des métadonnées (titre, artiste, album, durée)

#### 5. **Service de lecture audio** (`src/services/playerService.ts`)
- Configuration de react-native-track-player
- Contrôles de lecture (play, pause, skip, seek)
- Gestion des notifications et contrôles écran verrouillé
- Hook personnalisé pour l'état de lecture

#### 6. **Composants UI**

**SongCard** - Affiche une chanson avec:
- Pochette d'album (ou placeholder)
- Titre et artiste
- Durée
- Indicateur de lecture en cours
- Animation equalizer

**MiniPlayer** - Lecteur flottant avec:
- Barre de progression
- Pochette miniature
- Boutons play/pause et skip
- Design similaire à Spotify

**PlaylistCard** - Carte de playlist avec:
- Image de couverture
- Titre et description
- Nombre de titres

**SectionHeader** - En-têtes de section avec:
- Titre
- Bouton "Voir tout" optionnel

#### 7. **Écrans**

**Splashscreen**:
- Logo animé
- Chargement de la bibliothèque musicale
- Transition fluide vers l'app

**HomeScreen**:
- Salutation contextuelle (matin/après-midi/soir)
- Grille de sélection rapide
- Sections: Récemment écouté, Playlists, Artistes
- Liste complète des chansons
- État vide si aucune musique

### Architecture

```
┌─────────────────────────────────────────┐
│           AppContent.tsx                │
│  (Gère l'état de chargement & layout)   │
└──────────────┬──────────────────────────┘
               │
    ┌──────────┴──────────┐
    │                     │
┌───▼────┐          ┌────▼─────┐
│Splash  │          │HomeScreen│
│Screen  │          │          │
└────────┘          └────┬─────┘
                         │
              ┌──────────┼──────────┐
              │          │          │
         ┌────▼───┐ ┌───▼────┐ ┌───▼────┐
         │Songs  │ │Playlists│ │Artists │
         │       │ │         │ │        │
         └───────┘ └─────────┘ └────────┘
                         │
              ┌──────────▼──────────┐
              │    MiniPlayer       │
              │  (flottant en bas)  │
              └─────────────────────┘
```

### Prochaines étapes recommandées

1. **Installation des dépendances**
   ```bash
   cd myspot_music
   npm install
   ```

2. **Ajouter les ressources graphiques**
   - Icone de l'app (1024x1024)
   - Splash screen (2048x2048)
   - Adaptive icon pour Android

3. **Implémenter les écrans manquants**
   - Lecteur plein écran
   - Écran de recherche
   - Détails des playlists
   - Bibliothèque
   - Paramètres

4. **Améliorer le lecteur**
   - Waveform visuel
   - Equalizer audio
   - Mode de répétition
   - Lecture aléatoire

5. **Fonctionnalités avancées**
   - Paroles synchronisées
   - Statistiques d'écoute
   - Thèmes personnalisés
   - Synchronisation cloud optionnelle

### Permissions à configurer

Pour Android, les permissions sont déjà configurées dans `app.json`:
- `READ_EXTERNAL_STORAGE`
- `WRITE_EXTERNAL_STORAGE`
- `ACCESS_MEDIA_LOCATION`

Pour iOS, les descriptions de permissions sont configurées:
- `NSAppleMusicUsageDescription`
- `NSPhotoLibraryUsageDescription`

### Notes importantes

⚠️ **Espace disque insuffisant**: L'environnement actuel manque d'espace disque pour installer les dépendances npm. Le projet est prêt mais nécessitera:
- Soit plus d'espace disque dans l'environnement
- Soit être exécuté sur une machine locale avec suffisamment d'espace

📱 **Test requis**: Pour tester l'application, vous aurez besoin:
- D'un appareil physique ou émulateur Android/iOS
- De l'application Expo Go (pour le développement)
- Ou de builds natifs pour la production

---

**Le projet est structuré et prêt pour le développement !** 🎵
