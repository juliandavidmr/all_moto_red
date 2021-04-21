import main from "./seeds/seed";
import { prismaClient } from "./client";

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prismaClient.$disconnect();
    process.exit(1);
  });