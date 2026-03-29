import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  const products = await prisma.product.findMany({
    include: { category: true }
  });

  console.log(`Total products seeded: ${products.length}`);

  const requiredIds = [
    '1', 'revamp-1', 'shoes-1', '5', 
    'school-1', 'small-biz-1', 'home-ess-1', 
    'bestseller-1', 'live-1'
  ];

  console.log('\nChecking for required IDs:');
  for (const id of requiredIds) {
    const p = products.find(prod => prod.id === id);
    if (p) {
      console.log(`✅ ID: ${id.padEnd(15)} | Name: ${p.name.padEnd(30)} | Category: ${p.category.name}`);
    } else {
      console.log(`❌ ID: ${id.padEnd(15)} | NOT FOUND`);
    }
  }

  const categoryCounts = {};
  products.forEach(p => {
    categoryCounts[p.category.name] = (categoryCounts[p.category.name] || 0) + 1;
  });

  console.log('\nCategory counts:');
  Object.entries(categoryCounts).forEach(([cat, count]) => {
    console.log(`- ${cat}: ${count}`);
  });
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
