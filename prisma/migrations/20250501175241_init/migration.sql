-- CreateEnum
CREATE TYPE "UserRole" AS ENUM ('FREE', 'PREMIUM', 'ADMIN');

-- CreateEnum
CREATE TYPE "MangaStatus" AS ENUM ('ONGOING', 'COMPLETED', 'COMING_SOON', 'ON_HIATUS', 'CANCELLED');

-- CreateEnum
CREATE TYPE "ChapterStatus" AS ENUM ('DRAFT', 'PUBLISHED', 'SCHEDULED');

-- CreateEnum
CREATE TYPE "BookmarkStatus" AS ENUM ('READING', 'ON_HOLD', 'COMPLETED', 'PLAN_TO_READ', 'DROPPED');

-- CreateEnum
CREATE TYPE "ReadingDirection" AS ENUM ('LTR', 'RTL', 'VERTICAL');

-- CreateEnum
CREATE TYPE "PageLayout" AS ENUM ('SINGLE', 'DOUBLE', 'CONTINUOUS', 'WEBTOON');

-- CreateEnum
CREATE TYPE "BackgroundColor" AS ENUM ('BLACK', 'DARK_GRAY', 'SEPIA', 'WHITE');

-- CreateEnum
CREATE TYPE "ImageQuality" AS ENUM ('LOW', 'MEDIUM', 'HIGH', 'AUTO');

-- CreateEnum
CREATE TYPE "PageTransition" AS ENUM ('SLIDE', 'FADE', 'INSTANT');

-- CreateTable
CREATE TABLE "users" (
    "id" TEXT NOT NULL,
    "username" TEXT NOT NULL,
    "name" TEXT,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "bio" TEXT,
    "location" TEXT,
    "website" TEXT,
    "joinDate" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "avatar" TEXT,
    "role" "UserRole" NOT NULL DEFAULT 'FREE',

    CONSTRAINT "users_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "manga" (
    "id" TEXT NOT NULL,
    "slug" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "originalTitle" TEXT,
    "coverImage" TEXT NOT NULL,
    "authorId" TEXT NOT NULL,
    "status" "MangaStatus" NOT NULL,
    "rating" DOUBLE PRECISION NOT NULL DEFAULT 0,
    "year" TEXT,
    "ageRating" TEXT,
    "publisher" TEXT,
    "description" TEXT NOT NULL,
    "featured" BOOLEAN NOT NULL DEFAULT false,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "viewCount" INTEGER NOT NULL DEFAULT 0,
    "lastUpdated" TIMESTAMP(3),
    "nextUpdate" TIMESTAMP(3),
    "volumeCount" INTEGER,
    "readingDirection" TEXT,

    CONSTRAINT "manga_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "chapters" (
    "id" TEXT NOT NULL,
    "number" INTEGER NOT NULL,
    "title" TEXT NOT NULL,
    "date" TIMESTAMP(3) NOT NULL,
    "pages" TEXT[],
    "mangaId" TEXT NOT NULL,
    "status" "ChapterStatus" NOT NULL DEFAULT 'PUBLISHED',

    CONSTRAINT "chapters_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "authors" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "bio" TEXT,
    "avatar" TEXT,

    CONSTRAINT "authors_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "genres" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "genres_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "manga_genres" (
    "mangaId" TEXT NOT NULL,
    "genreId" TEXT NOT NULL,

    CONSTRAINT "manga_genres_pkey" PRIMARY KEY ("mangaId","genreId")
);

-- CreateTable
CREATE TABLE "tags" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "tags_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "manga_tags" (
    "mangaId" TEXT NOT NULL,
    "tagId" TEXT NOT NULL,

    CONSTRAINT "manga_tags_pkey" PRIMARY KEY ("mangaId","tagId")
);

-- CreateTable
CREATE TABLE "themes" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "themes_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "manga_themes" (
    "mangaId" TEXT NOT NULL,
    "themeId" TEXT NOT NULL,

    CONSTRAINT "manga_themes_pkey" PRIMARY KEY ("mangaId","themeId")
);

-- CreateTable
CREATE TABLE "reviews" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "mangaId" TEXT NOT NULL,
    "rating" DOUBLE PRECISION NOT NULL,
    "content" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "likes" INTEGER NOT NULL DEFAULT 0,
    "isVerifiedPurchase" BOOLEAN NOT NULL DEFAULT false,

    CONSTRAINT "reviews_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "review_likes" (
    "userId" TEXT NOT NULL,
    "reviewId" TEXT NOT NULL,

    CONSTRAINT "review_likes_pkey" PRIMARY KEY ("userId","reviewId")
);

-- CreateTable
CREATE TABLE "bookmarks" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "mangaId" TEXT NOT NULL,
    "savedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "notes" TEXT,
    "status" "BookmarkStatus" NOT NULL DEFAULT 'READING',

    CONSTRAINT "bookmarks_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "comic_collections" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT,
    "coverImage" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "userId" TEXT NOT NULL,

    CONSTRAINT "comic_collections_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "bookmark_collections" (
    "bookmarkId" TEXT NOT NULL,
    "comicCollectionId" TEXT NOT NULL,

    CONSTRAINT "bookmark_collections_pkey" PRIMARY KEY ("bookmarkId","comicCollectionId")
);

-- CreateTable
CREATE TABLE "reading_progress" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "mangaId" TEXT NOT NULL,
    "chapterId" TEXT NOT NULL,
    "currentPage" INTEGER NOT NULL DEFAULT 0,
    "totalPages" INTEGER NOT NULL,
    "lastReadAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "reading_progress_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "reading_preferences" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "direction" "ReadingDirection" NOT NULL DEFAULT 'VERTICAL',
    "pageLayout" "PageLayout" NOT NULL DEFAULT 'CONTINUOUS',
    "backgroundColor" "BackgroundColor" NOT NULL DEFAULT 'BLACK',
    "brightness" INTEGER NOT NULL DEFAULT 100,
    "contrast" INTEGER NOT NULL DEFAULT 100,
    "imageQuality" "ImageQuality" NOT NULL DEFAULT 'AUTO',
    "pageTransition" "PageTransition" NOT NULL DEFAULT 'SLIDE',
    "autoAdvanceTime" INTEGER NOT NULL DEFAULT 0,
    "showPageNumber" BOOLEAN NOT NULL DEFAULT true,
    "rememberLastRead" BOOLEAN NOT NULL DEFAULT true,
    "fullscreenOnOpen" BOOLEAN NOT NULL DEFAULT false,

    CONSTRAINT "reading_preferences_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "comments" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "content" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "likes" INTEGER NOT NULL DEFAULT 0,
    "mangaId" TEXT,
    "chapterId" TEXT,

    CONSTRAINT "comments_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "replies" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "commentId" TEXT NOT NULL,
    "content" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "likes" INTEGER NOT NULL DEFAULT 0,

    CONSTRAINT "replies_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "comment_likes" (
    "userId" TEXT NOT NULL,
    "commentId" TEXT NOT NULL,

    CONSTRAINT "comment_likes_pkey" PRIMARY KEY ("userId","commentId")
);

-- CreateTable
CREATE TABLE "reply_likes" (
    "userId" TEXT NOT NULL,
    "replyId" TEXT NOT NULL,

    CONSTRAINT "reply_likes_pkey" PRIMARY KEY ("userId","replyId")
);

-- CreateIndex
CREATE UNIQUE INDEX "users_username_key" ON "users"("username");

-- CreateIndex
CREATE UNIQUE INDEX "users_email_key" ON "users"("email");

-- CreateIndex
CREATE UNIQUE INDEX "manga_slug_key" ON "manga"("slug");

-- CreateIndex
CREATE UNIQUE INDEX "chapters_mangaId_number_key" ON "chapters"("mangaId", "number");

-- CreateIndex
CREATE UNIQUE INDEX "genres_name_key" ON "genres"("name");

-- CreateIndex
CREATE UNIQUE INDEX "tags_name_key" ON "tags"("name");

-- CreateIndex
CREATE UNIQUE INDEX "themes_name_key" ON "themes"("name");

-- CreateIndex
CREATE UNIQUE INDEX "reviews_userId_mangaId_key" ON "reviews"("userId", "mangaId");

-- CreateIndex
CREATE UNIQUE INDEX "bookmarks_userId_mangaId_key" ON "bookmarks"("userId", "mangaId");

-- CreateIndex
CREATE UNIQUE INDEX "reading_progress_userId_mangaId_chapterId_key" ON "reading_progress"("userId", "mangaId", "chapterId");

-- CreateIndex
CREATE UNIQUE INDEX "reading_preferences_userId_key" ON "reading_preferences"("userId");

-- AddForeignKey
ALTER TABLE "manga" ADD CONSTRAINT "manga_authorId_fkey" FOREIGN KEY ("authorId") REFERENCES "authors"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "chapters" ADD CONSTRAINT "chapters_mangaId_fkey" FOREIGN KEY ("mangaId") REFERENCES "manga"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "manga_genres" ADD CONSTRAINT "manga_genres_mangaId_fkey" FOREIGN KEY ("mangaId") REFERENCES "manga"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "manga_genres" ADD CONSTRAINT "manga_genres_genreId_fkey" FOREIGN KEY ("genreId") REFERENCES "genres"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "manga_tags" ADD CONSTRAINT "manga_tags_mangaId_fkey" FOREIGN KEY ("mangaId") REFERENCES "manga"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "manga_tags" ADD CONSTRAINT "manga_tags_tagId_fkey" FOREIGN KEY ("tagId") REFERENCES "tags"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "manga_themes" ADD CONSTRAINT "manga_themes_mangaId_fkey" FOREIGN KEY ("mangaId") REFERENCES "manga"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "manga_themes" ADD CONSTRAINT "manga_themes_themeId_fkey" FOREIGN KEY ("themeId") REFERENCES "themes"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "reviews" ADD CONSTRAINT "reviews_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "reviews" ADD CONSTRAINT "reviews_mangaId_fkey" FOREIGN KEY ("mangaId") REFERENCES "manga"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "review_likes" ADD CONSTRAINT "review_likes_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "review_likes" ADD CONSTRAINT "review_likes_reviewId_fkey" FOREIGN KEY ("reviewId") REFERENCES "reviews"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "bookmarks" ADD CONSTRAINT "bookmarks_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "bookmarks" ADD CONSTRAINT "bookmarks_mangaId_fkey" FOREIGN KEY ("mangaId") REFERENCES "manga"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "comic_collections" ADD CONSTRAINT "comic_collections_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "bookmark_collections" ADD CONSTRAINT "bookmark_collections_bookmarkId_fkey" FOREIGN KEY ("bookmarkId") REFERENCES "bookmarks"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "bookmark_collections" ADD CONSTRAINT "bookmark_collections_comicCollectionId_fkey" FOREIGN KEY ("comicCollectionId") REFERENCES "comic_collections"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "reading_progress" ADD CONSTRAINT "reading_progress_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "reading_progress" ADD CONSTRAINT "reading_progress_mangaId_fkey" FOREIGN KEY ("mangaId") REFERENCES "manga"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "reading_progress" ADD CONSTRAINT "reading_progress_chapterId_fkey" FOREIGN KEY ("chapterId") REFERENCES "chapters"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "reading_preferences" ADD CONSTRAINT "reading_preferences_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "comments" ADD CONSTRAINT "comments_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "replies" ADD CONSTRAINT "replies_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "replies" ADD CONSTRAINT "replies_commentId_fkey" FOREIGN KEY ("commentId") REFERENCES "comments"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "comment_likes" ADD CONSTRAINT "comment_likes_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "comment_likes" ADD CONSTRAINT "comment_likes_commentId_fkey" FOREIGN KEY ("commentId") REFERENCES "comments"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "reply_likes" ADD CONSTRAINT "reply_likes_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "reply_likes" ADD CONSTRAINT "reply_likes_replyId_fkey" FOREIGN KEY ("replyId") REFERENCES "replies"("id") ON DELETE CASCADE ON UPDATE CASCADE;
