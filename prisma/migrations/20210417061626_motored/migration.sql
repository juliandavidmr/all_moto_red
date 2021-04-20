-- CreateTable
CREATE TABLE "Motorcycle" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "anotherName" TEXT,
    "description" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "published" BOOLEAN NOT NULL DEFAULT false,
    "viewCount" BIGINT NOT NULL DEFAULT 0,
    "engine" DOUBLE PRECISION NOT NULL DEFAULT 0,
    "weight" DOUBLE PRECISION NOT NULL,
    "compressionRatio" TEXT NOT NULL,
    "powerHP" DOUBLE PRECISION NOT NULL,
    "powerKW" DOUBLE PRECISION NOT NULL,
    "powerRPM" DOUBLE PRECISION NOT NULL,
    "torque" DOUBLE PRECISION NOT NULL,
    "transmission" INTEGER NOT NULL,
    "seatHeight" DOUBLE PRECISION NOT NULL,
    "fuelCapacity" DOUBLE PRECISION NOT NULL,
    "production" TEXT,
    "maxSpeed" INTEGER,
    "modelYear" INTEGER,
    "active" BOOLEAN NOT NULL DEFAULT true,
    "motorcycleTypeId" TEXT NOT NULL,
    "motorcycleBrandId" TEXT NOT NULL,
    "motorcycleLinksId" TEXT,

    PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "MotorcycleLinks" (
    "id" TEXT NOT NULL,
    "link" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "MotorcycleBrand" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "MotorcycleType" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Motorcycle.name_unique" ON "Motorcycle"("name");

-- CreateIndex
CREATE INDEX "Motorcycle.name_anotherName_index" ON "Motorcycle"("name", "anotherName");

-- CreateIndex
CREATE UNIQUE INDEX "MotorcycleBrand.name_unique" ON "MotorcycleBrand"("name");

-- CreateIndex
CREATE UNIQUE INDEX "MotorcycleType.name_unique" ON "MotorcycleType"("name");

-- AddForeignKey
ALTER TABLE "Motorcycle" ADD FOREIGN KEY ("motorcycleTypeId") REFERENCES "MotorcycleType"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Motorcycle" ADD FOREIGN KEY ("motorcycleBrandId") REFERENCES "MotorcycleBrand"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Motorcycle" ADD FOREIGN KEY ("motorcycleLinksId") REFERENCES "MotorcycleLinks"("id") ON DELETE SET NULL ON UPDATE CASCADE;
