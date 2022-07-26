import { prisma } from "../src/database.js";

async function main() {
  await prisma.$executeRaw`TRUNCATE TABLE recommendations`;
}

main()
  .catch((e) => {
    console.log(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
