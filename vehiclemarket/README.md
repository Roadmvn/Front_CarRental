# VehicleMarket

VehicleMarket est une plateforme de vente et de location de véhicules entre particuliers.

## Prérequis

- Node.js (v14 ou supérieur)
- npm (v6 ou supérieur)

## Installation

1. Clonez le dépôt :

   ```
   git clone https://github.com/votre-username/vehiclemarket.git
   cd vehiclemarket
   ```

2. Installez les dépendances :

   ```
   npm install
   ```

3. Créez un fichier `.env` à la racine du projet et configurez les variables d'environnement nécessaires :
   ```
   VUE_APP_API_BASE_URL=http://localhost:3000/api
   ```

## Développement

Pour lancer le serveur de développement :

```
npm run dev
```

L'application sera accessible à l'adresse `http://localhost:5173`.

## Tests

Pour exécuter les tests unitaires :

```
npm run test:unit
```

## Build

Pour construire l'application pour la production :

```
npm run build
```

## Structure du projet

- `src/components`: Composants Vue réutilisables
- `src/views`: Composants Vue représentant des pages
- `src/stores`: Stores Pinia pour la gestion de l'état
- `src/router`: Configuration du routeur Vue
- `src/core`: Utilitaires, types et services centraux
- `tests`: Tests unitaires et d'intégration

## Contribuer

1. Forkez le projet
2. Créez votre branche de fonctionnalité (`git checkout -b feature/AmazingFeature`)
3. Committez vos changements (`git commit -m 'Add some AmazingFeature'`)
4. Poussez vers la branche (`git push origin feature/AmazingFeature`)
5. Ouvrez une Pull Request

## Licence

Distribué sous la licence MIT. Voir `LICENSE` pour plus d'informations.

npx tailwindcss init -p
npm install -D tailwindcss@latest postcss@latest autoprefixer@latest
npx tailwindcss -i ./src/style.css -o ./dist/output.css
