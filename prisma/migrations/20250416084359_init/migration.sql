-- CreateTable
CREATE TABLE "PublicVocabulary" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
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

-- CreateTable
CREATE TABLE "PublicArticle" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "slug" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "content" TEXT NOT NULL,
    "publishedAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    "author" TEXT,
    "coverImage" TEXT
);

-- CreateTable
CREATE TABLE "User" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
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

-- CreateTable
CREATE TABLE "UserVocabulary" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "userId" INTEGER NOT NULL,
    "publicVocabularyId" INTEGER NOT NULL,
    "addedAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "familiarity" INTEGER NOT NULL DEFAULT 0,
    "personalNote" TEXT,
    "customDefinition" TEXT,
    "customExample" TEXT,
    CONSTRAINT "UserVocabulary_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT "UserVocabulary_publicVocabularyId_fkey" FOREIGN KEY ("publicVocabularyId") REFERENCES "PublicVocabulary" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "UserArticle" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "userId" INTEGER NOT NULL,
    "publicArticleId" INTEGER NOT NULL,
    "savedAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT "UserArticle_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT "UserArticle_publicArticleId_fkey" FOREIGN KEY ("publicArticleId") REFERENCES "PublicArticle" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- CreateIndex
CREATE UNIQUE INDEX "PublicVocabulary_word_key" ON "PublicVocabulary"("word");

-- CreateIndex
CREATE UNIQUE INDEX "PublicArticle_slug_key" ON "PublicArticle"("slug");

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

-- CreateIndex
CREATE UNIQUE INDEX "UserVocabulary_userId_publicVocabularyId_key" ON "UserVocabulary"("userId", "publicVocabularyId");

-- CreateIndex
CREATE UNIQUE INDEX "UserArticle_userId_publicArticleId_key" ON "UserArticle"("userId", "publicArticleId");
