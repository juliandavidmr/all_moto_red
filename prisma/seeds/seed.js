const prisma = require('../client');
const motorcycleBrands = require('./brands-data');
const motorcycleTypes = require('./types-data');
const motorcycles = require('./motos-data');

async function main() {
  console.log('Start seeding...');

  for (const b of motorcycleBrands) {
    const exists = await prisma.motorcycleBrand.findUnique({
      where: b,
    });

    if (!exists) {
      const brand = await prisma.motorcycleBrand.create({
        data: b
      });

      console.log('Brand created:', brand.id);
    } else {
      console.log('[Brand] Already exists:', b.name);
    }
  }

  for (const t of motorcycleTypes) {
    const exists = await prisma.motorcycleType.findUnique({
      where: t,
    });

    if (!exists) {
      const type = await prisma.motorcycleType.create({
        data: t
      });

      console.log('Brand created:', type.id);
    } else {
      console.log('[Type] Already exists:', t.name);
    }
  }

  for (const m of motorcycles) {
    const moto = await prisma.motorcycle.create({
      data: m
    });

    console.log('Moto created:', moto.id);
  }

  console.log('Finished seed.');
}

module.exports = main;