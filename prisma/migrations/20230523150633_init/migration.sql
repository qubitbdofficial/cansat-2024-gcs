-- CreateTable
CREATE TABLE "Temperature" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "body" INTEGER NOT NULL,
    "core" INTEGER NOT NULL,
    "paylaod" INTEGER NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
);