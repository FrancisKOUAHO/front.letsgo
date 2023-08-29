# Utiliser l'image Node.js Alpine
FROM node:18-alpine

# Définir la variable d'environnement PORT
EXPOSE 3000

# Créer le répertoire de l'application
RUN mkdir -p /usr/src/app
WORKDIR /usr/src/app

# Copier les fichiers de dépendances
COPY package.json yarn.lock /usr/src/app/
RUN yarn install

# Copier les fichiers sources
COPY . /usr/src/app

# Construire l'application
RUN yarn build

# Exposer le port 3030
EXPOSE 3000

ENV NODE_ENV production  # Change to "development" for development if needed

# Utilisation de CMD pour démarrer l'application avec hot reload
CMD ["sh", "-c", "if [ \"$NODE_ENV\" = \"development\" ]; then yarn dev; else yarn start; fi"]
