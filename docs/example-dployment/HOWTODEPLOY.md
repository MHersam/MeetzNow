# Meetznow Deployment
Deploying a Meetznow Stack is as straight forward as it can be. Everything is managed in one single docker-compose file. All required changes to the environment can be done by setting environment variables. 

### Traefik
To add even more simplicity and we use [traefik](https://traefik.io/) to handle and route all our traffic within the docker stack. This allows additional features like SSL encryption or traffic logging. It also makes it possible to deploy every single service outside of docker or even on bare metal. There are only a few requirements: 
1. every service has access to reach the to the traefik instance
2. the trafik instance has access to reach every service

Everything else can be configured within traefik. The IP/DNS to to reach traefik from a container can be set with the  "TRAEFIK_IP" environmentvariable for each service-container.

### Database
We use MongoDB as out database, and so you have to provide a instance within our outside the stack. The connection is configured thru a connection string we pass to the database-service container as environment variable "MONGODB_HOST" .
We use a instance hosted at [MongoDB atlas](https://www.mongodb.com/cloud/atlas) where you can get started for free.

### Logging
We created a custom logger service to collect all the logs produced by our services. Discord is the target we are currently logging to. This doesn't sound useful at first, but we use a discord server as our communication medium while developing, so it was just handy. To add logging to your own discord server, you have to [create an application with a bot user](https://discordapp.com/developers/applications/) in discords developer portal.

### Example docker-compose.yml

This is the docker-compose file we use to run https://example.meetznow.io/ .
All you have to do is start a docker instance in swarm mode, expose port 80 & 443 to the internet and replace following the following variables:


| Variable | Description |
| -------- | -------- | 
| ${STACK_NAME}| The name, you will deploy the stack under|
| ${YOUR_DOMAIN}| Your domain name|
| ${MONGO_DB_CONNECTION_STRING}| The connection string to the MongoDB instance|
| ${YOUR_DISCORD_TOKEN}| The token to give access to your discord bot user|
| ${YOUR_DISCORD_GUILD_ID} | The ID of the guild u want your logs to be posted |

``` yml
version: '3.3'

services:
  traefik:
    image: traefik
    command:
      - "--api"
      - "--docker"
      - "--docker.swarmmode"
      - "--docker.watch"
      - "--docker.domain=docker.localhost"
      - "--defaultentrypoints=http,https,backend"
      - "--docker.exposedbydefault=true"
      - "--entryPoints=Name:http Address::80 Redirect.EntryPoint:https"
      - "--entryPoints=Name:https Address::443 TLS"
      - "--entryPoints=Name:backend Address::3000"
      - "--logLevel=info"
    ports:
      - 80:80
      - 443:443
      - 8080
      - 3000
    networks:
      - traefik-net
    volumes:
      - access_logs:/data
      - /var/run/docker.sock:/var/run/docker.sock
    deploy:
      replicas: 1
      placement:
        constraints: [node.role==manager]
      labels:
      - "traefik.enable=true"
      - "traefik.docker.network=${STACK_NAME}_traefik-net"
      - "traefik.port=8080"
      - "traefik.frontend.rule=Host:traefik.${YOUR_DOMAIN}"
      - "traefik.backend=traefik"
      - "traefik.frontend.entryPoints=http,https"

# Add this to add portainer to your deployment stack.
#  portainer:
#    image: portainer/portainer
#    ports:
#      - 9000
#    command: -H unix:///var/run/docker.sock
#    networks:
#    - traefik-net
#    volumes:
#      - /var/run/docker.sock:/var/run/docker.sock
#      - portainer_data:/data
#   deploy:
#      placement:
#        constraints: [node.role==manager]
#      labels:
#      - "traefik.enable=true"
#      - "traefik.docker.network=${STACK_NAME}_traefik-net"
#      - "traefik.port=9000"
#      - "traefik.frontend.rule=Host:portainer.${YOUR_DOMAIN}"
#      - "traefik.backend=portainer"
#      - "traefik.frontend.entryPoints=http,https"

# FRONTEND ---------------------------------------------------

  app:
    image: meetznow/frontend:latest
    restart: always
    ports:
    - 3000
    networks:
    - traefik-net
    deploy:
      replicas: 1
      labels:
      - "traefik.enable=true"
      - "traefik.docker.network=${STACK_NAME}_traefik-net"
      - "traefik.port=3000"
      - "traefik.frontend.rule=Host:${YOUR_DOMAIN}"
      - "traefik.backend=app-master"
      - "traefik.frontend.entryPoints=http,https"


# BACKEND----------------------------------------------------

  api-master:
    image: meetznow/api:latest
    restart: always
    ports:
      - 3000
    networks:
      - traefik-net
    deploy:
      replicas: 1
      labels:
        - "traefik.enable=true"
        - "traefik.docker.network=${STACK_NAME}_traefik-net"
        - "traefik.port=3000"
        - "traefik.frontend.rule=Host:api.${YOUR_DOMAIN}"
        - "traefik.backend=api"
        - "traefik.frontend.entryPoints=http,https"
        - "traefik.backend.healthcheck.path=/health"
    environment:
      - "TRAEFIK_IP=traefik:3000"

  db-service:
    image: meetznow/db-service:latest
    restart: always
    ports:
      - 3000
    networks:
      - traefik-net
    deploy:
      replicas: 1
      labels:
        - "traefik.enable=true"
        - "traefik.docker.network=${STACK_NAME}_traefik-net"
        - "traefik.port=3000"
        - "traefik.frontend.rule=Host:traefik;PathPrefix:/DATABASE/"
        - "traefik.backend=db-service"
        - "traefik.frontend.entryPoints=backend"
        - "traefik.backend.healthcheck.path=/health"
    environment:
      - "TRAEFIK_IP=traefik:3000"
      - "MONGODB_HOST=${MONGO_DB_CONNECTION_STRING}

  poll-service:
    image: meetznow/poll:latest
    restart: always
    ports:
      - 3000
    networks:
      - traefik-net
    deploy:
      replicas: 1
      labels:
        - "traefik.enable=true"
        - "traefik.docker.network=${STACK_NAME}_traefik-net"
        - "traefik.port=3000"
        - "traefik.frontend.rule=Host:traefik;PathPrefix:/POLL/"
        - "traefik.backend=poll-service"
        - "traefik.frontend.entryPoints=backend"
        - "traefik.backend.healthcheck.path=/health"
    environment:
      - "TRAEFIK_IP=traefik:3000"

  user-service:
    image: meetznow/usermanagement:latest
    restart: always
    ports:
      - 3000
    networks:
      - traefik-net
    deploy:
      replicas: 1
      labels:
        - "traefik.enable=true"
        - "traefik.docker.network=${STACK_NAME}_traefik-net"
        - "traefik.port=3000"
        - "traefik.frontend.rule=Host:traefik;PathPrefix:/USERMANAGEMENT/"
        - "traefik.backend=user-service"
        - "traefik.frontend.entryPoints=backend"
        - "traefik.backend.healthcheck.path=/health"
    environment:
      - "TRAEFIK_IP=traefik:3000"

  logger-service:
    image: meetznow/logger:latest
    restart: always
    ports:
      - 3000
    networks:
      - traefik-net
    deploy:
      replicas: 1
      labels:
        - "traefik.enable=true"
        - "traefik.docker.network=${STACK_NAME}_traefik-net"
        - "traefik.port=3000"
        - "traefik.frontend.rule=Host:traefik;PathPrefix:/LOGGER/"
        - "traefik.backend=logger-service"
        - "traefik.frontend.entryPoints=backend"
        - "traefik.backend.healthcheck.path=/health"
    environment:
      - "TRAEFIK_IP=traefik:3000"
      - "DISCORD_TOKEN=${YOUR_DISCORD_TOKEN}"
      - "DISCORD_GUILD_ID=${YOUR_DISCORD_GUILD_ID}"

  email-service:
    image: meetznow/email:latest
    restart: always
    ports:
      - 3000
    networks:
      - traefik-net
    deploy:
      replicas: 1
      labels:
        - "traefik.enable=true"
        - "traefik.docker.network=${STACK_NAME}_traefik-net"
        - "traefik.port=3000"
        - "traefik.frontend.rule=Host:traefik;PathPrefix:/EMAIL/"
        - "traefik.backend=email-service"
        - "traefik.frontend.entryPoints=backend"
        - "traefik.backend.healthcheck.path=/health"
    environment:
      - "TRAEFIK_IP=traefik:3000"

volumes:
  portainer_data:

networks:
  traefik-net:
    driver: overlay
```


