# Nokotan Backend

## Description

[Nest](https://github.com/nestjs/nest) framework TypeScript starter repository.

## ports available

- OpenAPI with Scalar UI [localhost:3000/api/scalar](http://localhost:3000/api/scalar)
- OpenAPI with YAML format [localhost:3000/api/v1/openapi.yaml](http://localhost:3000/api/v1/openapi.yaml)
- OpenAPI with JSON format [localhost:3000/api/v1/openapi.json](http://localhost:3000/api/v1/openapi.json)

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
