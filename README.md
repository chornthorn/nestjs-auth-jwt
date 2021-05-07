## Start Commands for docker-compose file and information
Builds, (re)creates, starts, and attaches to containers for a service.  
`docker-compose up`  
Information:   
- Database can be accessed with PG-Admin via `localhost:5050` and then connect your database (see youtube playlist)
- NestJS Api can be accessed on `localhost:8080/api` (see youtube playlist)
  
# Concept of the series:

With every series we clone/fork the last project, so that the code is always up to date with the according project.

List in Order with all Youtube Playlists and Repository Links:

## NestJs document in Postman
Document-link: https://documenter.getpostman.com/view/12703278/TzJrBJZG

# You need the installed tools
- NPM
- Node.js
- NestJS
- Docker

# Basic Commands for Docker
Basic Docker Commands:  
List your docker images: `docker images`  
List your running containers: `docker ps`  
List also stopped containers: `docker ps -a`
Kill a running container: `docker kill <id of container from docker ps (first 3 letters)>`, eg `docker kill fea`  
