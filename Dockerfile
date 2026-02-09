FROM node:16-bullseye AS build

WORKDIR /app

COPY package.json package-lock.json ./
RUN npm ci --ignore-scripts

COPY . .
RUN npm run build
RUN npm run copy-templates

FROM node:16-bullseye-slim

WORKDIR /app

ENV NODE_ENV=production

COPY --from=build /app/package.json /app/package-lock.json ./
COPY --from=build /app/node_modules ./node_modules
COPY --from=build /app/dist ./dist
COPY --from=build /app/ormconfig.js ./ormconfig.js

EXPOSE 8083

CMD ["node", "dist/index.js"]
