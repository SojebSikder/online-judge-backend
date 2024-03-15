## Description

Online judge backend system

Frontend part: https://github.com/SojebSikder/online-judge-frontend

## Installation

```bash
pnpm install
```

Go to docker directory, run following command:

```bash
docker build -t 'sojeboj' .
```

## Installing

```bash
pnpm install
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
pnpm start

# watch mode
pnpm start:dev

# production mode
pnpm start:prod

# watch mode with swc compiler (faster)
pnpm start:dev-swc
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