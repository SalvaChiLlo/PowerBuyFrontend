FROM node:14-bullseye

WORKDIR /usr/src/app
COPY . .
RUN ls; npm install;

EXPOSE 4200

ENTRYPOINT ["npm", "run", "start"]
