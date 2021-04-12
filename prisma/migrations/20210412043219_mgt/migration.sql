-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Motorcycle" (
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
    "motorcycleTypeId" TEXT NOT NULL,
    "motorcycleBrandId" TEXT NOT NULL,
    "motorcycleLinksId" TEXT,
    FOREIGN KEY ("motorcycleTypeId") REFERENCES "MotorcycleType" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
    FOREIGN KEY ("motorcycleBrandId") REFERENCES "MotorcycleBrand" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
    FOREIGN KEY ("motorcycleLinksId") REFERENCES "MotorcycleLinks" ("id") ON DELETE SET NULL ON UPDATE CASCADE
);
INSERT INTO "new_Motorcycle" ("id", "name", "anotherName", "description", "createdAt", "updatedAt", "published", "viewCount", "engine", "weight", "compressionRatio", "powerHP", "powerKW", "powerRPM", "torque", "transmission", "seatHeight", "fuelCapacity", "production", "maxSpeed", "modelYear", "active", "motorcycleTypeId", "motorcycleBrandId", "motorcycleLinksId") SELECT "id", "name", "anotherName", "description", "createdAt", "updatedAt", "published", "viewCount", "engine", "weight", "compressionRatio", "powerHP", "powerKW", "powerRPM", "torque", "transmission", "seatHeight", "fuelCapacity", "production", "maxSpeed", "modelYear", "active", "motorcycleTypeId", "motorcycleBrandId", "motorcycleLinksId" FROM "Motorcycle";
DROP TABLE "Motorcycle";
ALTER TABLE "new_Motorcycle" RENAME TO "Motorcycle";
CREATE UNIQUE INDEX "Motorcycle.name_unique" ON "Motorcycle"("name");
CREATE INDEX "Motorcycle.name_anotherName_index" ON "Motorcycle"("name", "anotherName");
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
