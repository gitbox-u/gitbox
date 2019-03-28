#!/bin/bash

rm ~/Desktop/gitmap
docker save -o ~/Desktop/gitmap team01_web
sudo scp -i "$HOME/Gitmap.pem" ~/Desktop/gitmap ec2-user@ec2-3-85-142-144.compute-1.amazonaws.com:~