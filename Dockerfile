# BUILD
FROM node:alpine as build

WORKDIR /gitmap
COPY ./client/src ./client/src
COPY ./client/public ./client/public
COPY ./client/package*.json ./client/
COPY ./server ./server

RUN cd /gitmap/client && npm install && npm run build
RUN cd /gitmap/server && npm install

# EXECUTE
FROM node:alpine

WORKDIR /gitmap
COPY --from=build /gitmap/client/build ./build
COPY --from=build /gitmap/server .

EXPOSE 3000
ENTRYPOINT [ "npm", "start" ]