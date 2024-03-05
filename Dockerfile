# Utilisez une image de base Node.js
FROM node:20-alpine AS build

# Définissez le répertoire de travail dans le conteneur
WORKDIR /app

# Copiez les fichiers package.json et package-lock.json dans le répertoire de travail
COPY package*.json ./

# Installez les dépendances
RUN npm install --force

# Copiez tous les fichiers de l'application dans le répertoire de travail
COPY . .

# Exécutez la commande "npm run build" dans un shell
RUN npm run build --prod

# Étape 2 : Utilisez une image Nginx pour servir l'application
FROM nginx:alpine

# Supprimez les fichiers par défaut de Nginx
RUN rm -rf /usr/share/nginx/html/*

# Copiez les fichiers de l'application Angular depuis l'étape précédente
COPY --from=build /app/dist/* /usr/share/nginx/html/

# Exposez le port 80 pour accéder à l'application
EXPOSE 80

# Commande pour démarrer le serveur Nginx
CMD ["nginx", "-g", "daemon off;"]

# il faut crée un docker compose