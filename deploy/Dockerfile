FROM node:alpine as build

# BUILD
WORKDIR /gitmap
COPY ./client/src ./client/src
COPY ./client/public ./client/public
COPY ./client/package*.json ./client/
COPY ./server ./server

RUN cd /gitmap/client && npm install && npm run-script build
RUN cd /gitmap/server && npm install

# EXECUTE
FROM node:alpine

WORKDIR /gitmap
COPY --from=build /gitmap/client/* ./client/
COPY --from=build /gitmap/server/* ./server/
RUN cd ./server

EXPOSE 3000
CMD [ 'npm', 'start' ]

# cd .. && docker build -t gitmap -f ./deploy/Dockerfile .