FROM node:16-alpine

WORKDIR /app

COPY yarn.lock .npmrc package.json pnpm-lock.yaml .pnpmfile.cjs /app/
RUN pnpm install

COPY . /app

EXPOSE 3000

CMD [ "pnpm", "run", "dev" ]
