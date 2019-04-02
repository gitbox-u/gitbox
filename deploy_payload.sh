#!/bin/bash

sudo docker load -i gitmap
sudo docker system prune -f
cd team01 && sudo docker-compose up