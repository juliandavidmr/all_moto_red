import prisma from "../client";
import motorcycleBrands from "./brands-data";
import motorcycleTypes from "./types-data";
import motorcycles from "./motos-data";

async function main() {
  console.log("Start seeding...");

  for (const b of motorcycleBrands) {
    const exists = await prisma.motorcycleBrand.findUnique({
      where: b,
    });

    if (!exists) {
      const brand = await prisma.motorcycleBrand.create({
        data: b
      });

      console.log("Brand created:", brand.id);
    } else {
      console.log("[Brand] Already exists:", b.name);
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

      console.log("Brand created:", type.id);
    } else {
      console.log("[Type] Already exists:", t.name);
    }
  }

  for (const m of motorcycles) {
    const temp = {
      ...m,
      motorcycleLinks: []
    };

    delete temp.motorcycleLinks;

    const motorcycle = await prisma.motorcycle.create({
      data: temp
    });

    await prisma.$transaction(
      m.motorcycleLinks.connect.map(link =>
        prisma.motorcycleLinks.create({
          data: {
            ...link,
            motorcycle: {
              connect: {
                id: motorcycle.id
              }
            }
          }
        })
      ),
    );

    console.log("Moto created:", motorcycle.id);
  }

  console.log("Finished seed.");
}

module.exports = main;