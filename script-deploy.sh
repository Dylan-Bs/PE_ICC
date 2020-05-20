 #/bin/sh -x

# Vérification si un docker-compose est déjà lancé
if [ -f dockercompose.lock ]; then
  echo "Arret du précédant docker-compose"
  docker-compose stop
  rm dockercompose.lock
fi
echo "Lancement docker compose"
docker-compose up -d --build --remove-orphans