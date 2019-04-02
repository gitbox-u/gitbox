#!/bin/bash

sudo ssh -i "$HOME/Gitmap.pem" ec2-user@ec2-3-87-7-156.compute-1.amazonaws.com 'bash -s' < stop_payload.sh