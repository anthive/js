FROM node:14.7
COPY . .
ENTRYPOINT ["node","run.js"]
EXPOSE 7070
