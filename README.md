## Description

Online judge backend system

## Installation

```bash
pnpm install
```

Go to docker directory, run following command:

```bash
docker build -t 'sojeboj' .
```

## Running the app

```bash
# development
pnpm run start

# watch mode
pnpm run start:dev

# production mode
pnpm run start:prod

# with swc compiler (faster)
nest start -b swc -w
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
