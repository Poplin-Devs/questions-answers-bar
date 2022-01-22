from node:latest
WORKDIR /app
COPY package*.json ./
RUN npm install
copy . .
EXPOSE 8080
cmd npm run server