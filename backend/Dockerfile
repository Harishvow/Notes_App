FROM node:20

WORKDIR /notesapp

COPY package*.json .

RUN npm ci --omit=dev && npm cache clean --force

COPY . .

EXPOSE 5000

CMD ["node","server.js"]