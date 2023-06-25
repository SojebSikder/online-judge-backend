## Description

Online judge backend system

## Installation

```bash
pnpm install
```

Go to docker directory, run following command:
```bash
docker build -t 'online-judge' .
```

## Running the app

```bash
# development
pnpm run start

# watch mode
pnpm run start:dev

# production mode
pnpm run start:prod
```

## Test

```bash
# unit tests
$ pnpm run test

# e2e tests
$ pnpm run test:e2e

# test coverage
$ pnpm run test:cov
```
