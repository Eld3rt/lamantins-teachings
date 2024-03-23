/*
  Warnings:

  - You are about to drop the column `userId` on the `courses` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[slug]` on the table `courses` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE "courses" DROP COLUMN "userId",
ADD COLUMN     "slug" TEXT;

-- AlterTable
ALTER TABLE "users" ALTER COLUMN "name" DROP NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "courses_slug_key" ON "courses"("slug");
