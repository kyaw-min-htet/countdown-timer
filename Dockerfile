# Stage 1: Base
FROM node:18-alpine as base
WORKDIR /app
COPY package*.json ./
RUN npm install

# Stage 2: Development
FROM base as development
COPY . .
CMD ["npm", "run", "dev", "--", "--host"]

# Stage 3: Build
FROM base as build
COPY . .
RUN npm run build

# Stage 4: Production
FROM nginx:alpine as production
COPY --from=build /app/dist /usr/share/nginx/html
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
