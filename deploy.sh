#!/bin/bash

docker save -o ~/Desktop/gitmap team01_web
sudo scp -i "$HOME/Gitmap.pem" ~/Desktop/gitmap ec2-user@ec2-3-87-7-156.compute-1.amazonaws.com:~

ssh -i "$HOME/Gitmap.pem" ~/Desktop/gitmap ec2-user@ec2-3-87-7-156.compute-1.amazonaws.com 'bash -s' < payload.sh