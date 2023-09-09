-- CreateTable
CREATE TABLE "ShortUrl" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "shortCode" TEXT NOT NULL,
    "longUrl" TEXT NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
);

-- CreateIndex
CREATE UNIQUE INDEX "ShortUrl_shortCode_key" ON "ShortUrl"("shortCode");
