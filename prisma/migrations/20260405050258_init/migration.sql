-- CreateTable
CREATE TABLE "PlayerBoard" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "timeTakenMs" INTEGER NOT NULL,

    CONSTRAINT "PlayerBoard_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "PlayerBoard_name_key" ON "PlayerBoard"("name");
