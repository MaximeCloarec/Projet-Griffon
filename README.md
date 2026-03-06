## Installation

1. Cloner le projet
2. `npm install`
3. Copier `.env.example` en `.env` et remplir les valeurs
4. `npm run generate`
5. `npm run migrate:dev`
6. `npm run dev`

## Variables d'environnement

- `PORT` : Port du serveur (défaut: 3000)
- `DATABASE_URL` : URL de connexion PostgreSQL
- `JWT_SECRET` : Clé secrète pour les tokens