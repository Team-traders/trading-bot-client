# TradingBot

Commencez par :

```bash
npm install
npm run dev
```

## Description

**`trading-bot-client`** est une application frontend développée pour fournir une interface utilisateur intuitive permettant de gérer un bot de trading automatisé. Ce projet adopte une **Clean Architecture** pour assurer la maintenabilité et l'évolutivité. L'architecture est divisée en couches :

### 1. Couche de Présentation
- **components** : Composants UI stateless responsables de l'affichage.
- **containers** : Gèrent la récupération des données et les passent aux composants.
- **routes** : Gèrent le routage de l'application.

### 2. Couche Applicative
- **services** : Gèrent la logique métier et les interactions API.
- **userCases** : Définissent les actions spécifiques de l'application.

### 3. Couche Domaine
- **entities** : Objets métier principaux.
- **repositories** : Gèrent les interactions avec les données persistantes.
- **interfaces** : Définissent les contrats entre les couches.

### 4. Couche Infrastructure
- **API** : Implémentent les interactions avec les API externes.
- **adapters** : Adaptent les données externes au format de l'application.

### Structure du projet :

```
src/
├── application/
├── domain/
├── infrastructure/
├── presentation/
└── assets/
```

## Fonctionnalités

- **Interface conviviale** : Une expérience utilisateur fluide pour interagir avec le bot de trading.
- **Suivi des données en temps réel** : Affiche les mises à jour des marchés et des transactions via des WebSockets.
- **Configuration des stratégies de trading** : Permet de définir, modifier et surveiller les stratégies.
- **Visualisation des portefeuilles** : Graphiques et tableaux pour suivre les actifs et leur performance.

## Technologies utilisées

- **Framework** : React.js
- **Gestion des états** : Redux ou Context API (si applicable)
- **Styles** : CSS, SCSS ou bibliothèque de composants (par exemple, Material-UI, Tailwind CSS)
- **API** : Connexion avec un backend via REST API et WebSockets.

## Prérequis

Avant de commencer, assurez-vous d'avoir installé :

- **Node.js** (v14 ou supérieur)
- **npm** ou **yarn**
- Un serveur backend compatible pour l'API et les WebSockets.

## Installation

1. **Cloner le dépôt** :

   ```bash
   git clone https://github.com/Team-traders/trading-bot-client.git
   cd trading-bot-client
   ```

2. **Installer les dépendances** :

   ```bash
   npm install
   # ou
   yarn install
   ```

## Configuration

1. **Fichier `.env`**
   À la racine du projet, créez un fichier `.env` pour configurer les variables d'environnement nécessaires :

   ```env
   REACT_APP_API_URL=http://localhost:5000/api
   REACT_APP_WEBSOCKET_URL=ws://localhost:5000/ws
   ```

   Ajustez les valeurs en fonction de l'URL de votre backend et de vos WebSockets.

## Lancement de l'application

1. **Démarrer en mode développement** :

   ```bash
   npm run dev
   ```

   Cela démarre l'application sur [http://localhost:3000](http://localhost:3000).

2. **Construire pour la production** :

   ```bash
   npm run build
   ```

   Les fichiers optimisés pour la production seront générés dans le dossier `build`.

## Maquette

### Dashboard

<img width="848" alt="Capture d’écran 2024-10-15 à 14 33 17" src="https://github.com/user-attachments/assets/3101964f-4304-4296-8c53-55d0c3d2d3ca">

### Connect wallet

<img width="844" alt="Capture d’écran 2024-10-15 à 14 34 26" src="https://github.com/user-attachments/assets/24722ec1-92d8-4652-aa13-c11173716812">

### Orders

<img width="457" alt="Capture d’écran 2024-10-15 à 14 35 29" src="https://github.com/user-attachments/assets/740c7034-a09a-4c6c-8b09-f4a67ca270ba">

### History

<img width="457" alt="Capture d’écran 2024-10-15 à 14 35 48" src="https://github.com/user-attachments/assets/a8c1f448-d631-4fba-bef1-658584822a39">

### Settings

<img width="456" alt="Capture d’écran 2024-10-15 à 14 37 35" src="https://github.com/user-attachments/assets/86248b50-529d-43bb-95e2-f5251f08dd94">

### Navbar (wallet)

<img width="153" alt="Capture d’écran 2024-10-15 à 14 38 49" src="https://github.com/user-attachments/assets/faa15de9-2a95-4e25-813e-f10cb2133754">

### Navbar (invit)

<img width="150" alt="Capture d’écran 2024-10-15 à 14 42 08" src="https://github.com/user-attachments/assets/7e6c421c-90f0-415e-b836-ce76c32531f4">

## Scripts disponibles

- **Lancer l'application en mode développement** :

  ```bash
  npm run dev
  ```

- **Construire pour la production** :

  ```bash
  npm run build
  ```

- **Exécuter les tests** :

  ```bash
  npm test
  ```

- **Analyser le bundle** :

  ```bash
  npm run analyze
  ```

## Contribution

Les contributions sont les bienvenues ! Voici comment participer :

1. **Forker le dépôt**.
2. **Créer une branche** : `git checkout -b feature/nom-fonctionnalite`.
3. **Faire vos modifications**.
4. **Commiter vos changements** : `git commit -m "Ajout d'une nouvelle fonctionnalité"`.
5. **Pousser la branche** : `git push origin feature/nom-fonctionnalite`.
6. **Ouvrir une Pull Request** sur GitHub.

## Licence

Ce projet est sous licence **MIT**. Consultez le fichier [LICENSE](LICENSE) pour plus de détails.



