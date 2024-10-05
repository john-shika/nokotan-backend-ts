const uuid = require('uuid');
const { PrismaClient } = require('@prisma/client');
const { Logger } = require('@nestjs/common');

const prisma = new PrismaClient();
const logger = new Logger('Database\\Dummy');

async function createUser(data) {
  logger.log(`Checking '${data.username}' user...`);

  const check = await prisma.user.findFirst({
    where: {
      username: data.username,
    },
  });

  if (!check) {
    logger.log(`Creating '${data.username}' user...`);

    const user = await prisma.user.create({
      data,
    });

    if (!user) throw new Error(`Failed to create '${data.username}' user`);
  }
}

async function main() {
  await prisma.$connect();

  logger.log('Creating dummy users...');

  await createUser({
    uuid: uuid.v7(),
    username: 'admin',
    password: 'Admin@1234',
    admin: true,
    created_at: new Date(),
    updated_at: new Date(),
  });

  await createUser({
    uuid: uuid.v7(),
    username: 'user',
    password: 'User@1234',
    admin: false,
    created_at: new Date(),
    updated_at: new Date(),
  });

  await prisma.$disconnect();
}

main().catch((e) => {
  logger.error(e);
  prisma.$disconnect();
});
