# syntax=docker/dockerfile:1

############################################################
# lab-numeric — Interface de l'escape game DGSE
# Image multi-stage : compilation Vite/React puis service nginx
############################################################

# ---------- Étape 1 : compilation ----------
FROM node:20-alpine AS build

WORKDIR /app

# Installation des dépendances (couche cachée si package*.json inchangés)
COPY package.json package-lock.json* ./
RUN if [ -f package-lock.json ]; then npm ci --no-audit --no-fund; else npm install --no-audit --no-fund; fi

# Copie des sources et compilation de production
COPY . .
RUN npm run build

# ---------- Étape 2 : image finale (service web) ----------
FROM nginx:1.27-alpine AS production

# Configuration nginx (SPA + gzip + cache)
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Site compilé servi directement au lancement du conteneur
COPY --from=build /app/dist /usr/share/nginx/html

EXPOSE 80

HEALTHCHECK --interval=30s --timeout=3s --start-period=5s \
  CMD wget -q --spider http://localhost/ || exit 1

CMD ["nginx", "-g", "daemon off;"]
