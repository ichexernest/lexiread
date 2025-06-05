/*
  Warnings:

  - You are about to drop the column `content` on the `PublicArticle` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[contentId]` on the table `PublicArticle` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE "PublicArticle" DROP COLUMN "content",
ADD COLUMN     "contentId" TEXT;

-- CreateTable
CREATE TABLE "ArticleContent" (
    "id" TEXT NOT NULL,
    "content" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "ArticleContent_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "PublicArticle_contentId_key" ON "PublicArticle"("contentId");

-- AddForeignKey
ALTER TABLE "PublicArticle" ADD CONSTRAINT "PublicArticle_contentId_fkey" FOREIGN KEY ("contentId") REFERENCES "ArticleContent"("id") ON DELETE SET NULL ON UPDATE CASCADE;
