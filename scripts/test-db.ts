import "dotenv/config";
import { PrismaPg } from "@prisma/adapter-pg";
import { PrismaClient } from "../src/generated/prisma/client";

const adapter = new PrismaPg({ connectionString: process.env.DATABASE_URL });
const prisma = new PrismaClient({ adapter });

async function main() {
  const [{ now }] = await prisma.$queryRaw<{ now: Date }[]>`SELECT NOW() as now`;
  console.log("Database connected. Server time:", now);

  const userCount = await prisma.user.count();
  console.log("User count:", userCount);

  const demoUser = await prisma.user.findUnique({
    where: { email: "benmorgiewicz@gmail.com" },
    include: {
      collections: {
        include: {
          items: {
            include: { item: { include: { itemType: true } } },
          },
        },
      },
    },
  });

  if (!demoUser) {
    console.log("Demo user not found. Run `npm run db:seed` first.");
    return;
  }

  console.log(`\nDemo user: ${demoUser.name} <${demoUser.email}> (isPro: ${demoUser.isPro})`);

  const itemTypeCount = await prisma.itemType.count({ where: { isSystem: true } });
  console.log(`System item types: ${itemTypeCount}`);

  console.log(`\nCollections (${demoUser.collections.length}):`);
  for (const collection of demoUser.collections) {
    console.log(`- ${collection.name} (${collection.items.length} items)`);
    for (const { item } of collection.items) {
      console.log(`    [${item.itemType.name}] ${item.title}`);
    }
  }
}

main()
  .catch((error) => {
    console.error("Database connection failed:", error);
    process.exitCode = 1;
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
