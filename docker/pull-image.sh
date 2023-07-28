# Pull image
sudo docker pull bsfranca2/spk-api:latest

# Recreate
sudo docker-compose -f docker-compose.prod.yml up --force-recreate -d