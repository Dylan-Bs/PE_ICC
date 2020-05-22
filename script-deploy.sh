 #/bin/sh -x

# Vérification si un docker-compose est déjà lancé
isUp=$(docker-compose ps front | grep Up)
if [ -n "$isUp" ]; then
  echo "Arret du précédant docker-compose"
  docker-compose down --rmi all --volumes --remove-orphans
fi
echo "Lancement docker compose"
docker-compose up -d --build --remove-orphans
