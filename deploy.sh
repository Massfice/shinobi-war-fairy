eval `ssh-agent`

ssh-add ../.ssh/sw-f-prod

git pull

docker-compose -f docker-compose-prod.yml up -d --build