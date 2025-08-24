# Projet-Griffon
CDA projet fil rouge

## Structure du projet 

* Projet-Griffon/
* ├── backend/
* |   ├── config/ # Ensemble de fichiers liés a la configuration MongoDB
* |   ├── controllers/ # Ensemble de fichiers liés a la logique métier des routes
* |   ├── middleware/ # Ensemble de fichiers liés a la vérification de token/authorisation
* |   ├── models/ # Ensemble de fichiers liés au modèle Mongoose
* |   ├── routes/ # Ensemble de fichiers liés aux routes faisant appel aux controllers
* |   ├── sockets/ # Ensemble de fichiers liés a la logique socket.io
* |   ├── utils/ # Ensemble de fichier liés aux fonctions utilitaires
* ├── app.js # Initialisation de Express, gestion des routes et du CORS
* ├── server.js # Création du serveur HTTP, initialisation de Socket.io et démarrage du serveur

## Installation

1. **Cloner le dépôt :**
   ```bash
   git clone https://github.com/MaximeCloarec/Projet-Griffon.git
   cd Projet-Griffon

2. **Installer les dépendances :**
    ```bash
    npm install

## API Documentation
 1. **User Endpoints:**
    - `POST /api/register` : Register a new user.
    - `POST /api/login` : Login and receive a JWT token.
    - `GET /api/users` : Get all users (admin only).
    - `DELETE /api/user/:id` : Delete a user by ID (admin only).
    - `GET /api/user/:id/` : Get a user by ID (admin only).
   
2. **Game Endpoints:**
    - `POST /api/game` : Create a new game
    - `DELETE /api/game/:id` :  Delete a game by ID (admin only).
    - `GET /api/games` : Get all games. (admin only).