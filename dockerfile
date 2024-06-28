# Stage 1: Build the Node.js application
FROM node:current-alpine3.20 as build
# Set the working directory inside the container
WORKDIR /app

# Copy package.json and package-lock.json to the container
COPY package*.json ./

# Install the dependencies
RUN npm install

# Copy the rest of the application files
COPY . .

# Build the application
RUN npm run build




FROM nginx:1.23-alpine as production-build
COPY nginx.conf /etc/nginx/conf.d/default.conf
## Remove default nginx index page
RUN rm -rf /usr/share/nginx/html/*
# Copy from the stage 1
COPY --from=build /app/dist /usr/share/nginx/html


EXPOSE 80
ENTRYPOINT ["nginx", "-g", "daemon off;"]