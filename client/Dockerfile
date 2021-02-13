FROM node
RUN npm install -g serve
WORKDIR /usr/app/client
COPY package*.json ./
RUN npm install
COPY . ./
RUN npm run build
EXPOSE 3000
CMD ["serve", "-s", "build", "-p", "3000"]
