// import { PrismaClient } from "@prisma/client";

// const prisma = new PrismaClient();

// export default prisma;


import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

process.on("SIGINT", async () => {
  try {
    await prisma.$disconnect();
    // eslint-disable-next-line no-process-exit
    process.exit(0);
  } catch {
    // eslint-disable-next-line no-process-exit
    process.exit(1);
  }
});

export default prisma;