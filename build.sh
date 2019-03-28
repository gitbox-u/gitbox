#!/bin/bash

docker system prune -f
docker rmi team01_web
docker-compose up