/*
  Warnings:

  - The primary key for the `PublicArticle` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The primary key for the `PublicVocabulary` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The primary key for the `User` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The primary key for the `UserArticle` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The primary key for the `UserVocabulary` table will be changed. If it partially fails, the table could be left without primary key constraint.

*/
-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_PublicArticle" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "slug" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "content" TEXT NOT NULL,
    "publishedAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    "author" TEXT,
    "coverImage" TEXT
);
INSERT INTO "new_PublicArticle" ("author", "content", "coverImage", "id", "publishedAt", "slug", "title", "updatedAt") SELECT "author", "content", "coverImage", "id", "publishedAt", "slug", "title", "updatedAt" FROM "PublicArticle";
DROP TABLE "PublicArticle";
ALTER TABLE "new_PublicArticle" RENAME TO "PublicArticle";
CREATE UNIQUE INDEX "PublicArticle_slug_key" ON "PublicArticle"("slug");
CREATE TABLE "new_PublicVocabulary" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "word" TEXT NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    "partOfSpeech" TEXT NOT NULL,
    "definition" TEXT NOT NULL,
    "localDefinition" TEXT,
    "example" TEXT,
    "exampleTranslation" TEXT,
    "pronunciation" TEXT,
    "synonyms" TEXT,
    "antonyms" TEXT
);
INSERT INTO "new_PublicVocabulary" ("antonyms", "createdAt", "definition", "example", "exampleTranslation", "id", "localDefinition", "partOfSpeech", "pronunciation", "synonyms", "updatedAt", "word") SELECT "antonyms", "createdAt", "definition", "example", "exampleTranslation", "id", "localDefinition", "partOfSpeech", "pronunciation", "synonyms", "updatedAt", "word" FROM "PublicVocabulary";
DROP TABLE "PublicVocabulary";
ALTER TABLE "new_PublicVocabulary" RENAME TO "PublicVocabulary";
CREATE UNIQUE INDEX "PublicVocabulary_word_key" ON "PublicVocabulary"("word");
CREATE TABLE "new_User" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "name" TEXT,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    "nativeLanguage" TEXT,
    "emailVerified" BOOLEAN NOT NULL DEFAULT false,
    "verificationToken" TEXT,
    "resetPasswordToken" TEXT,
    "resetPasswordExpires" DATETIME
);
INSERT INTO "new_User" ("createdAt", "email", "emailVerified", "id", "name", "nativeLanguage", "password", "resetPasswordExpires", "resetPasswordToken", "updatedAt", "verificationToken") SELECT "createdAt", "email", "emailVerified", "id", "name", "nativeLanguage", "password", "resetPasswordExpires", "resetPasswordToken", "updatedAt", "verificationToken" FROM "User";
DROP TABLE "User";
ALTER TABLE "new_User" RENAME TO "User";
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");
CREATE TABLE "new_UserArticle" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "userId" TEXT NOT NULL,
    "publicArticleId" TEXT NOT NULL,
    "savedAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT "UserArticle_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT "UserArticle_publicArticleId_fkey" FOREIGN KEY ("publicArticleId") REFERENCES "PublicArticle" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);
INSERT INTO "new_UserArticle" ("id", "publicArticleId", "savedAt", "userId") SELECT "id", "publicArticleId", "savedAt", "userId" FROM "UserArticle";
DROP TABLE "UserArticle";
ALTER TABLE "new_UserArticle" RENAME TO "UserArticle";
CREATE UNIQUE INDEX "UserArticle_userId_publicArticleId_key" ON "UserArticle"("userId", "publicArticleId");
CREATE TABLE "new_UserVocabulary" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "userId" TEXT NOT NULL,
    "publicVocabularyId" TEXT NOT NULL,
    "addedAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "familiarity" INTEGER NOT NULL DEFAULT 0,
    "personalNote" TEXT,
    "customDefinition" TEXT,
    "customExample" TEXT,
    CONSTRAINT "UserVocabulary_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT "UserVocabulary_publicVocabularyId_fkey" FOREIGN KEY ("publicVocabularyId") REFERENCES "PublicVocabulary" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);
INSERT INTO "new_UserVocabulary" ("addedAt", "customDefinition", "customExample", "familiarity", "id", "personalNote", "publicVocabularyId", "userId") SELECT "addedAt", "customDefinition", "customExample", "familiarity", "id", "personalNote", "publicVocabularyId", "userId" FROM "UserVocabulary";
DROP TABLE "UserVocabulary";
ALTER TABLE "new_UserVocabulary" RENAME TO "UserVocabulary";
CREATE UNIQUE INDEX "UserVocabulary_userId_publicVocabularyId_key" ON "UserVocabulary"("userId", "publicVocabularyId");
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
