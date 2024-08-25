FROM node:20.10.0

WORKDIR /usr/src/app

COPY package*.json ./

RUN npm install

COPY prisma ./prisma

COPY .env ./

COPY . .

RUN npx prisma generate

EXPOSE 3000

CMD ["npm", "start"]

