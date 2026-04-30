/*
  Warnings:

  - You are about to drop the column `chapterNumber` on the `Chapter` table. All the data in the column will be lost.
  - You are about to drop the column `coverImage` on the `Novel` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Chapter" DROP COLUMN "chapterNumber";

-- AlterTable
ALTER TABLE "Novel" DROP COLUMN "coverImage";
