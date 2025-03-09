FROM node:20 as build
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build

# Stage 2: Serve the built files in production
FROM node:20-slim
WORKDIR /usr/app
COPY --from=build /app/dist ./dist
RUN npm install -g serve
EXPOSE 4173
CMD ["serve", "-s", "dist"]
