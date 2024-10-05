# Nokotan Backend

## Description

[Nest](https://github.com/nestjs/nest) framework TypeScript starter repository.

## Project setup

```shell
pnpm i
```

## Compile and run the project

```shell
# development
pnpm run start

# watch mode
pnpm run start:dev

# production mode
pnpm run start:prod
```

## Run tests

```shell
# unit tests
pnpm run test

# e2e tests
pnpm run test:e2e

# test coverage
pnpm run test:cov
```

## Update All Dependencies

```shell
pnpm install -g npm-check-updates
npx ncu -u
```

## Prisma New Migration

```shell
npx prisma migrate dev --name init
```
