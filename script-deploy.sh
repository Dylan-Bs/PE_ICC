 #/bin/sh -x

# Vérification si un docker-compose est déjà lancé
if [ -f dockercompose.lock ]; then
  echo "Arret du précédant docker-compose"
  docker-compose down --rmi all --volumes --remove-orphans
  rm dockercompose.lock
fi
echo "Lancement docker compose"
docker-compose up -d --build --remove-orphans
