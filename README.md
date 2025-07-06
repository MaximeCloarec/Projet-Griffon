# Projet-Griffon
CDA projet fil rouge

Projet-Griffon/
├── backend/
|   ├── config/ # Ensemble de fichiers liés a la configuration MongoDB
|   ├── controllers/ # Ensemble de fichiers liés a la logique métier des routes
|   ├── middleware/ # Ensemble de fichiers liés a la vérification de token/authorisation
|   ├── models/ # Ensemble de fichiers liés au modèle Mongoose
|   ├── routes/ # Ensemble de fichiers liés aux routes faisant appel aux controllers
|   ├── sockets/ # Ensemble de fichiers liés a la logique socket.io
|   ├── utils/ # Ensemble de fichier liés aux fonctions utilitaires
├── app.js # Initialisation de Express, gestion des routes et du CORS
├── server.js # Création du serveur HTTP, initialisation de Socket.io et démarrage du serveur