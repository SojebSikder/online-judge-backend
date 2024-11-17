## Description

Online judge backend system

Frontend part: https://github.com/SojebSikder/online-judge-frontend

## Installation

```bash
yarn install
```

Go to docker directory, run following command:

```bash
docker build -t 'sojeboj' .
```

## Installing

```bash
yarn install
```

## Config
Copy .env.example to .env and config according to your needs.

Migrate database:
```bash
npx prisma migrate dev
```

## Running the app

```bash
# development
yarn start

# watch mode
yarn start:dev

# production mode
yarn start:prod

# watch mode with swc compiler (faster)
yarn start:dev-swc
```

## Used technology
- Typescript
- Nest.js
- Prisma
- Mysql
- Socket.io
- Bullmq
- Redis
- Docker
- Bash
- etc