# BUILD
FROM node:alpine as build

WORKDIR /gitmap
COPY ./client/src ./client/src
COPY ./client/public ./client/public
COPY ./client/package*.json ./client/
COPY ./server ./server
COPY ./parsers ./parsers

RUN cd /gitmap/client && npm install && REACT_APP_APIHOST=gitbox.xyz REACT_APP_APIPORT=80 npm run build
RUN cd /gitmap/server && npm install
RUN cd /gitmap/parsers && npm install

# EXECUTE
FROM node:alpine

RUN apk update && \
    apk upgrade && \
    apk add git

WORKDIR /gitmap
COPY --from=build /gitmap/client/build ./build
COPY --from=build /gitmap/server .
COPY --from=build /gitmap/parsers ./parsers

EXPOSE 80
ENTRYPOINT [ "npm", "start" ]