# Stage 1: Build the Node.js application
FROM node:current-alpine3.20 as build
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build

FROM nginx:1.23-alpine as production-build
COPY nginx.conf /etc/nginx/conf.d/default.conf
RUN rm -rf /usr/share/nginx/html/*
COPY --from=build /app/dist /usr/share/nginx/html
RUN mkdir -p /var/www/certbot
EXPOSE 80 443
ENTRYPOINT ["nginx", "-g", "daemon off;"]
