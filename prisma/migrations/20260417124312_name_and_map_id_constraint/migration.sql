/*
  Warnings:

  - A unique constraint covering the columns `[name,mapId]` on the table `PlayerScore` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "PlayerScore_name_mapId_key" ON "PlayerScore"("name", "mapId");
