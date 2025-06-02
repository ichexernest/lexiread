-- CreateTable
CREATE TABLE "PublicVocabulary" (
    "id" TEXT NOT NULL,
    "word" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "PublicVocabulary_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "VocabularyDefinition" (
    "id" TEXT NOT NULL,
    "vocabularyId" TEXT NOT NULL,
    "partOfSpeech" TEXT NOT NULL,
    "definition" TEXT NOT NULL,
    "localDefinition" TEXT,
    "example" TEXT,
    "exampleTranslation" TEXT,
    "pronunciation" TEXT,
    "synonyms" TEXT,
    "antonyms" TEXT,

    CONSTRAINT "VocabularyDefinition_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "PublicArticle" (
    "id" TEXT NOT NULL,
    "slug" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "content" TEXT NOT NULL,
    "publishedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "author" TEXT,
    "coverImage" TEXT,

    CONSTRAINT "PublicArticle_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "User" (
    "id" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "nativeLanguage" TEXT,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "UserVocabulary" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "publicVocabularyId" TEXT NOT NULL,
    "addedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "familiarity" INTEGER NOT NULL DEFAULT 0,
    "personalNote" TEXT,
    "customDefinition" TEXT,
    "customExample" TEXT,

    CONSTRAINT "UserVocabulary_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "UserArticle" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "publicArticleId" TEXT NOT NULL,
    "savedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "UserArticle_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "PublicVocabulary_word_key" ON "PublicVocabulary"("word");

-- CreateIndex
CREATE INDEX "VocabularyDefinition_vocabularyId_idx" ON "VocabularyDefinition"("vocabularyId");

-- CreateIndex
CREATE UNIQUE INDEX "PublicArticle_slug_key" ON "PublicArticle"("slug");

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

-- CreateIndex
CREATE UNIQUE INDEX "UserVocabulary_userId_publicVocabularyId_key" ON "UserVocabulary"("userId", "publicVocabularyId");

-- CreateIndex
CREATE UNIQUE INDEX "UserArticle_userId_publicArticleId_key" ON "UserArticle"("userId", "publicArticleId");

-- AddForeignKey
ALTER TABLE "VocabularyDefinition" ADD CONSTRAINT "VocabularyDefinition_vocabularyId_fkey" FOREIGN KEY ("vocabularyId") REFERENCES "PublicVocabulary"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UserVocabulary" ADD CONSTRAINT "UserVocabulary_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UserVocabulary" ADD CONSTRAINT "UserVocabulary_publicVocabularyId_fkey" FOREIGN KEY ("publicVocabularyId") REFERENCES "PublicVocabulary"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UserArticle" ADD CONSTRAINT "UserArticle_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UserArticle" ADD CONSTRAINT "UserArticle_publicArticleId_fkey" FOREIGN KEY ("publicArticleId") REFERENCES "PublicArticle"("id") ON DELETE CASCADE ON UPDATE CASCADE;
