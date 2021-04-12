-- CreateTable
CREATE TABLE "Motorcycle" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT NOT NULL,
    "anotherName" TEXT,
    "description" TEXT,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "published" BOOLEAN NOT NULL DEFAULT false,
    "viewCount" BIGINT NOT NULL DEFAULT 0,
    "engine" REAL NOT NULL DEFAULT 0,
    "weight" REAL NOT NULL,
    "compressionRatio" TEXT NOT NULL,
    "powerHP" REAL NOT NULL,
    "powerKW" REAL NOT NULL,
    "powerRPM" REAL NOT NULL,
    "torque" REAL NOT NULL,
    "transmission" INTEGER NOT NULL,
    "seatHeight" REAL NOT NULL,
    "fuelCapacity" REAL NOT NULL,
    "production" TEXT,
    "maxSpeed" INTEGER,
    "modelYear" INTEGER,
    "active" BOOLEAN NOT NULL DEFAULT true,
    "motorcycleTypeId" TEXT,
    "motorcycleBrandId" TEXT,
    "motorcycleLinksId" TEXT,
    FOREIGN KEY ("motorcycleTypeId") REFERENCES "MotorcycleType" ("id") ON DELETE SET NULL ON UPDATE CASCADE,
    FOREIGN KEY ("motorcycleBrandId") REFERENCES "MotorcycleBrand" ("id") ON DELETE SET NULL ON UPDATE CASCADE,
    FOREIGN KEY ("motorcycleLinksId") REFERENCES "MotorcycleLinks" ("id") ON DELETE SET NULL ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "MotorcycleLinks" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "link" TEXT NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL
);

-- CreateTable
CREATE TABLE "MotorcycleBrand" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL
);

-- CreateTable
CREATE TABLE "MotorcycleType" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL
);

-- CreateIndex
CREATE INDEX "Motorcycle.name_anotherName_index" ON "Motorcycle"("name", "anotherName");

-- CreateIndex
CREATE UNIQUE INDEX "MotorcycleLinks.link_unique" ON "MotorcycleLinks"("link");

-- CreateIndex
CREATE UNIQUE INDEX "MotorcycleBrand.name_unique" ON "MotorcycleBrand"("name");

-- CreateIndex
CREATE UNIQUE INDEX "MotorcycleType.name_unique" ON "MotorcycleType"("name");
