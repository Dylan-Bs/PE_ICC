 #/bin/sh -x

# Vérification si un docker-compose est déjà lancé
if [ -f dockercompose.lock ]; then
  docker-compose stop
  rm dockercompose.lock
fi

docker-compose up -d --build --remove-orphans