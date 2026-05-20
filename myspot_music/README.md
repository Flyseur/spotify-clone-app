# MySpot Music - Application de Streaming Musical Personnel

## 🎵 Présentation

**MySpot Music** est une application mobile de lecture musicale inspirée de Spotify, conçue pour la lecture de musique locale depuis votre téléphone.

### Fonctionnalités principales

- **Importation de musique locale** - Scan automatique de votre bibliothèque musicale
- **Lecteur audio avancé** - Contrôle complet de lecture avec notifications
- **Playlists personnalisées** - Créez et gérez vos playlists
- **Système de favoris** - Likez vos chansons préférées
- **Design moderne** - Interface sombre inspirée de Spotify
- **Lecture en arrière-plan** - Continuez d'écouter avec l'écran verrouillé
- **Mini-player** - Contrôle rapide depuis n'importe quel écran

## 🚀 Technologies

- **React Native** + **Expo** (SDK 52)
- **TypeScript** pour le typage
- **Zustand** pour la gestion d'état
- **react-native-track-player** pour la lecture audio
- **expo-media-library** pour l'accès à la bibliothèque musicale
- **expo-sqlite** pour le stockage local

## 📁 Structure du projet

```
myspot_music/
├── src/
│   ├── assets/          # Images, fonts, etc.
│   ├── components/      # Composants réutilisables
│   │   ├── SongCard.tsx
│   │   ├── MiniPlayer.tsx
│   │   ├── PlaylistCard.tsx
│   │   └── SectionHeader.tsx
│   ├── screens/         # Écrans de l'application
│   │   ├── Splashscreen.tsx
│   │   ├── HomeScreen.tsx
│   │   └── ...
│   ├── services/        # Services et logique métier
│   │   ├── musicStore.ts
│   │   ├── musicLibrary.ts
│   │   └── playerService.ts
│   ├── types/           # Types TypeScript
│   ├── utils/           # Utilitaires et constantes
│   └── AppContent.tsx
├── App.tsx
├── app.json
├── package.json
└── tsconfig.json
```

## 🔧 Installation

### Prérequis

- Node.js (v18 ou supérieur)
- npm ou yarn
- Expo CLI
- Android Studio (pour Android) ou Xcode (pour iOS)

### Étapes d'installation

1. **Installer les dépendances**
```bash
cd myspot_music
npm install
```

2. **Démarrer le serveur de développement**
```bash
npm start
```

3. **Lancer sur un appareil**
   - **Android**: Appuyez sur `a` dans le terminal ou scannez le QR code avec l'app Expo Go
   - **iOS**: Appuyez sur `i` dans le terminal (nécessite macOS)

## 📱 Permissions

### Android
L'application demande les permissions suivantes:
- `READ_EXTERNAL_STORAGE` - Lire les fichiers musicaux
- `WRITE_EXTERNAL_STORAGE` - Modifier les métadonnées
- `ACCESS_MEDIA_LOCATION` - Accéder aux médias

### iOS
- `NSAppleMusicUsageDescription` - Accès à la bibliothèque musicale
- `NSPhotoLibraryUsageDescription` - Accès aux images pour les pochettes

## 🎨 Design System

### Couleurs principales
- **Fond**: `#121212` (Noir profond)
- **Surface**: `#1E1E1E`
- **Accent**: `#1DB954` (Vert Spotify)
- **Texte**: `#FFFFFF`

### Typographie
- Tailles: 10px, 12px, 14px, 16px, 20px, 24px, 32px
- Poids: Regular, Medium, Bold, Black

## 📋 Fonctionnalités MVP

- [x] Import musique locale
- [x] Player audio de base
- [x] Playlists (structure)
- [x] Favoris (structure)
- [x] Recherche (à implémenter)
- [x] Design moderne
- [x] Lecture arrière-plan (configuration)
- [ ] Lecteur plein écran
- [ ] Equalizer audio
- [ ] Paroles synchronisées
- [ ] Statistiques personnelles

## 🔮 Fonctionnalités futures

- Synchronisation cloud
- IA de recommandation
- Partage de playlist
- Import YouTube
- Podcasts
- Mode karaoké
- Visualiseur audio

## 📝 Notes de développement

### Architecture
- **State Management**: Zustand pour un état global simple et efficace
- **Navigation**: Expo Router pour la navigation native
- **Audio**: react-native-track-player pour la lecture avancée

### Bonnes pratiques
- Code modulaire et réutilisable
- Typage TypeScript strict
- Séparation claire UI / Logique métier
- Composants fonctionnels avec hooks

## 🐛 Dépannage

### Problèmes courants

**Erreur de permissions Android:**
```bash
# Nettoyer le cache
npx expo start -c
```

**Problèmes de build:**
```bash
# Réinstaller les dépendances
rm -rf node_modules
npm install
```

## 📄 Licence

Projet personnel - Usage non commercial

---

**Développé avec ❤️ pour les amoureux de la musique**
