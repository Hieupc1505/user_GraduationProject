FROM node:current-alpine3.20 as build
WORKDIR /app
COPY package.json .
RUN npm install
COPY . .
RUN npm run build
EXPOSE 5731


### Server with Nginx 
FROM nginx:1.23-alpine 
WORKDIR /usr/share/nginx/html
RUN rm -rf *
COPY --from=build /app/build .
EXPOSE 80 
ENTRYPOINT ["nginx", "-g", "daemon off;"]
